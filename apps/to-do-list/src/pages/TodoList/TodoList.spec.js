import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useTaskStore } from '@/stores/TaskStore'

import TodoList from './TodoList.vue'
import ModalWindow from '@/components/ModalWindow.vue'

describe('todo list, active tasks list and completed tasks list', () => {
    let mountOptions
    
    beforeEach(() => {
        mountOptions = {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    initialState: {
                        taskList: []
                    }
                })]
            }
        }
    })


    const activeTask1 = {
        description: 'play football',
        dueDate: '2024-09-15',
        id: 3,
        completion: false
    }

    const activeTask2 = {
        description: 'go food shopping',
        dueDate: '2024-09-14',
        id: 4,
        completion: false
    }

    const completedTask1 = {
        description: 'buy gift for mum',
        dueDate: '2024-09-11',
        id: 1,
        completion: true
    }

    const completedTask2 = {
        description: 'water the plants',
        dueDate: '2024-09-11',
        id: 2,
        completion: true
    }

    // async function modalWindowExists(wrapper) {
    //     return wrapper.findComponent(ModalWindow)
    // }
    
    test('when a task description and due date are provided, clicking the Add list item button adds the list to the task list and displays the task', async () => {
        const wrapper = mount(TodoList, mountOptions)

        const store = useTaskStore()

        const taskDescription = wrapper.find('.addItemField')
        await taskDescription.setValue('feed the dog')

        const datePicker = wrapper.find('.dueDate')
        await datePicker.setValue('2024-09-15')

        const addItemButton = wrapper.find('.addButton')
        await addItemButton.trigger('click')

        expect(wrapper.text().includes('feed the dog')).toBe(true)
        expect(wrapper.text().includes('2024-09-15')).toBe(true)
        expect(store.taskList).toStrictEqual([{
            description: 'feed the dog',
            dueDate: '2024-09-15',
            id: 0,
            completion: false
        }])
    })

    test('if no task description is provided, clicking the Add task button does not do anything', async () => {
       const wrapper = mount(TodoList, mountOptions) 

       const store = useTaskStore()

       const dueDate = wrapper.find('.dueDate')
       await dueDate.setValue('2030-12-31')
       
       const addItemButton = wrapper.find('.addButton')
       await addItemButton.trigger('click')
        expect(wrapper.text().includes('2030-12-31')).toBe(false)
        expect(store.taskList).length(0)
    })

    test('if no due date is provided, clicking the Add task button does not do anything', async () => {
        const wrapper = mount(TodoList, mountOptions)

        const store = useTaskStore()

        const addItemField = wrapper.find('.addItemField')
        await addItemField.setValue('feed the dog')

        const addItemButton = wrapper.find('.addButton')
        await addItemButton.trigger('click')
        expect(wrapper.text().includes('feed the dog')).toBe(false)
        expect(store.taskList).length(0)
    })

    test('if there are active tasks, clicking the Delete active tasks button makes a modal window appear', async () => {
        const wrapper = mount(TodoList, mountOptions)

        const store = useTaskStore()
        store.taskList = [activeTask1, activeTask2]

        const deleteActiveTaskBtn = wrapper.find('[data-testid="deleteActiveBtn"]')
        await deleteActiveTaskBtn.trigger('click')
        expect(wrapper.text().includes('Are you sure you want to delete all the active tasks?')).toBe(true)
    })

    test('in the modal window triggered by clicking Delete active tasks, clicking Yes deletes the active tasks in the store', async () => {
        const wrapper = mount(TodoList, mountOptions)
        const store = useTaskStore()
        store.taskList = [activeTask1, activeTask2, completedTask1]

        const deleteActiveBtn = wrapper.find('[data-testid="deleteActiveBtn"]')
        await deleteActiveBtn.trigger('click')

        const yesBtn = wrapper.find('[data-testid="yesBtn"]')
        await yesBtn.trigger('click')
        expect(wrapper.text().includes('Are you sure you want to delete all the active tasks?')).toBe(false)
        expect(store.taskList).toStrictEqual([completedTask1])
    })
    
    test('in the modal window triggered by clicking Delete active tasks, clicking Cancel closes the modal without changing the task list', async () => {
        const wrapper = mount(TodoList, mountOptions)
        const store = useTaskStore()
        store.taskList = [activeTask1, activeTask2, completedTask1, completedTask2]

        let modalWindow = wrapper.findComponent(ModalWindow)

        const deleteActiveBtn = wrapper.find('[data-testid="deleteActiveBtn"]')
        await deleteActiveBtn.trigger('click')
        modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(true)

        const cancelBtn = wrapper.find('.cancelButton')
        await cancelBtn.trigger('click')
        modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(false)
        expect(store.taskList).toStrictEqual([activeTask1, activeTask2, completedTask1, completedTask2])
    })
})


/* Tests

Add list item button
- clicking it adds the task to the task list, with the task description and due date
- if no due date is provided, clicking it doesn't do anything
- if no task description is provided, clicking it doesn't do anything

Delete active tasks button
- clicking it causes a modal window to appear
Modal window
- clicking cancel causes the modal window to disappear; there are no changes to the active task list
- clicking yes closes the modal window and empties the active task list

Delete completed tasks button
- clicking it causes a modal window to appear
Modal window
- clicking cancel causes the modal window to disappear; there are no changes to the completed task list
- clicking yes closes the modal window and empties the completed task list

Delete all tasks button
- clicking it causes a modal window to appear
Modal window
- clicking cancel causes the modal window to disappear; there are no changes to the active and completed task lists
- clicking yes closes the modal window and empties the active and completed task lists */