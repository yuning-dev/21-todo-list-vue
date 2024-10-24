import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useApptStore } from '@/stores/ApptStore'
import { nextTick } from 'vue'

import ApptList from './ApptList.vue'
import ModalWindow from '@/components/modal-window/ModalWindow.vue'

describe.skip('appointments list, active appointments list and completed appointments list', () => {
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

    // function modalWindowExists(wrapper) {
    //     return wrapper.findComponent(ModalWindow)
    // }
    
    async function addSampleTasks() {
        const store = useApptStore()
        store.taskList = [activeTask1, activeTask2, completedTask1, completedTask2]
    }

    test('when a task description and due date are provided, clicking the Add list item button adds the list to the task list and displays the task', async () => {
        const wrapper = mount(ApptList, mountOptions)

        const store = useApptStore()

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
       const wrapper = mount(ApptList, mountOptions) 

       const store = useApptStore()

       const dueDate = wrapper.find('.dueDate')
       await dueDate.setValue('2030-12-31')
       
       const addItemButton = wrapper.find('.addButton')
       await addItemButton.trigger('click')
        expect(wrapper.text().includes('2030-12-31')).toBe(false)
        expect(store.taskList).length(0)
    })

    test('if no due date is provided, clicking the Add task button does not do anything', async () => {
        const wrapper = mount(ApptList, mountOptions)

        const store = useApptStore()

        const addItemField = wrapper.find('.addItemField')
        await addItemField.setValue('feed the dog')

        const addItemButton = wrapper.find('.addButton')
        await addItemButton.trigger('click')
        expect(wrapper.text().includes('feed the dog')).toBe(false)
        expect(store.taskList).length(0)
    })

    test('if there are active tasks, clicking the Delete active tasks button makes a modal window appear', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)

        let modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(false)

        const deleteActiveTaskBtn = wrapper.find('[data-testid="deleteActiveBtn"]')
        await deleteActiveTaskBtn.trigger('click')
        modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(true)
        expect(wrapper.text().includes('Are you sure you want to delete all the active tasks?')).toBe(true)
    })

    test('in the modal window triggered by clicking Delete active tasks, clicking Yes deletes the active tasks in the store', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)
        const store = useApptStore()

        expect(wrapper.text().includes('play football')).toBe(true)
        expect(wrapper.text().includes('go food shopping')).toBe(true)
        expect(wrapper.text().includes('buy gift for mum')).toBe(true)
        expect(wrapper.text().includes('water the plants')).toBe(true)

        const deleteActiveBtn = wrapper.find('[data-testid="deleteActiveBtn"]')
        await deleteActiveBtn.trigger('click')

        const yesBtn = wrapper.find('[data-testid="yesBtn"]')
        await yesBtn.trigger('click')
        expect(wrapper.text().includes('Are you sure you want to delete all the active tasks?')).toBe(false)
        expect(store.taskList).toStrictEqual([completedTask1, completedTask2])
        await nextTick()
        expect(wrapper.text().includes('play football')).toBe(false)
        expect(wrapper.text().includes('go food shopping')).toBe(false)
        expect(wrapper.text().includes('buy gift for mum')).toBe(true)
        expect(wrapper.text().includes('water the plants')).toBe(true)
    })
    
    test('in the modal window triggered by clicking Delete active tasks, clicking Cancel closes the modal without changing the task list', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)
        const store = useApptStore()
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

    test('clicking the Delete completed tasks button when there are completed tasks makes a modal window appear', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)

        const deleteCompletedBtn = wrapper.find('[data-testid="deleteCompletedBtn"]')
        await deleteCompletedBtn.trigger('click')

        let modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(true)
        expect(wrapper.text().includes('Are you sure you want to delete all the completed tasks?')).toBe(true)
    })

    test('after clicking the Delete completed tasks button: clicking yes closes the modal and deletes the completed tasks from the store and on the page', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)
        const store = useApptStore()

        const deleteCompletedBtn = wrapper.find('[data-testid="deleteCompletedBtn"]')
        await deleteCompletedBtn.trigger('click')

        const yesBtn = wrapper.find('[data-testid="yesBtn"]')
        await yesBtn.trigger('click')

        let modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(false)
        expect(store.taskList).toStrictEqual([activeTask1, activeTask2])
        expect(wrapper.text().includes('play football')).toBe(true)
        expect(wrapper.text().includes('go food shopping')).toBe(true)
        expect(wrapper.text().includes('buy gift for mum')).toBe(false)
        expect(wrapper.text().includes('water the plants')).toBe(false)
    })

    test('after clicking the Deleted completed tasks button: clicking cancel closes the modal without changing tasks on the page or the store', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)
        const store = useApptStore()

        const deleteCompletedBtn = wrapper.find('[data-testid="deleteCompletedBtn"]')
        await deleteCompletedBtn.trigger('click')

        const cancelBtn = wrapper.find('.cancelButton')
        await cancelBtn.trigger('click')
        

        let modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(false)
        expect(store.taskList).toStrictEqual([activeTask1, activeTask2, completedTask1, completedTask2])
        expect(wrapper.text().includes('play football')).toBe(true)
        expect(wrapper.text().includes('go food shopping')).toBe(true)
        expect(wrapper.text().includes('buy gift for mum')).toBe(true)
        expect(wrapper.text().includes('water the plants')).toBe(true)
    })

    test('when there are tasks, clicking Delete all tasks button makes a modal window appear', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)

        let modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(false)
        
        const deleteAllBtn = wrapper.find('.deleteAllButton')

        await deleteAllBtn.trigger('click')
        modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(true)
        expect(wrapper.text().includes('Are you sure you want to delete all the tasks?'))
    })

    test('after clicking Delete all tasks button, clicking Yes deletes all tasks from the store and the page and makes the modal window disappear', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)
        const store = useApptStore()

        const deleteAllBtn = wrapper.find('.deleteAllButton')
        await deleteAllBtn.trigger('click')
        
        const yesBtn = wrapper.find('[data-testid="yesBtn"]')
        await yesBtn.trigger('click')
        let modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(false)
        expect(store.taskList).toStrictEqual([])
        expect(wrapper.text().includes('play football')).toBe(false)
        expect(wrapper.text().includes('go food shopping')).toBe(false)
        expect(wrapper.text().includes('buy gift for mum')).toBe(false)
        expect(wrapper.text().includes('water the plants')).toBe(false)
    })

    test('after clicking Delete all tasks button, clicking Cancel closes the modal window without modifying the store or tasks being displayed', async () => {
        addSampleTasks()
        const wrapper = mount(ApptList, mountOptions)
        const store = useApptStore()

        const deleteAllBtn = wrapper.find('.deleteAllButton')
        await deleteAllBtn.trigger('click')

        const cancelBtn = wrapper.find('.cancelButton')
        await cancelBtn.trigger('click')
        let modalWindow = wrapper.findComponent(ModalWindow)
        expect(modalWindow.exists()).toBe(false)
        expect(store.taskList).toStrictEqual([activeTask1, activeTask2, completedTask1, completedTask2])
        expect(wrapper.text().includes('play football')).toBe(true)
        expect(wrapper.text().includes('go food shopping')).toBe(true)
        expect(wrapper.text().includes('buy gift for mum')).toBe(true)
        expect(wrapper.text().includes('water the plants')).toBe(true)
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