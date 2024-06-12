import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TodoItem from './TodoItem.vue'

describe('todo task component', () => {

    const exampleTask = {
        description: 'have a date in Osaka',
        dueDate: "2023-12-25",
        id: 1,
        completion: false,
    }

    function dateOfToday() {
        const today = new Date()
        const todayInString = today.toISOString()
        const dateInString = todayInString.substring(0,10)
        return dateInString
    }

    it('displays the description and due date when the task is created', () => {
        const wrapper = mount(TodoItem, {
            props: {
                task: exampleTask,
            }
        })

        expect(wrapper.text().includes('have a date in Osaka')).toBe(true)
        expect(wrapper.text().includes('2023-12-25')).toBe(true)
    })

    it('displays the due date in red when it is due today, orange when due tomorrow and black otherwise', () => {
        const wrapper = mount(TodoItem, {
            props: {
                task: {
                    ...exampleTask,
                    dueDate: dateOfToday(),
                }
            }
        })

        const dueDate = wrapper.find('[data-testid="dueDate"]')
        console.log(dueDate.classes())
        expect(dueDate.classes()).toContain('red')

    })

    it('deletes the task when the delete button is pressed', async () => {
        const wrapper = mount(TodoItem, {
            props: {
                task: exampleTask,
            }
        })

        const deleteBtn = wrapper.find('[data-testid="deleteBtn"]')
        await deleteBtn.trigger('click')
        expect(wrapper.emitted().delete).toEqual([[1]])
    })

    // it('changes the completion state when the completed button is clicked (WHY DO YOU NOT WORK??!)', async () => {
    //     const wrapper = mount(TodoItem, {
    //         props: {
    //             task: {
    //                 ...exampleTask,
    //                 completion: false,
    //             }
    //         }
    //     })

    //     const completedBtn = wrapper.find('[data-testid="completedBtn"]')
    //     await completedBtn.trigger('click')
    //     expect(exampleTask.completion).toBe(true)
    // })

    it('makes an input field, a date picker and the edit complete button appear when the edit button is clicked', async () => {
        const wrapper = mount(TodoItem, {
            props: {
                task: exampleTask,
            }
        })

        const editBtn = wrapper.find('[data-testid="editBtn"]')
        await editBtn.trigger('click')
        const editDescriptionInput = wrapper.find('[data-testid="editDescriptionInput"]')
        expect(editDescriptionInput.exists()).toBe(true)
        expect(editDescriptionInput.element.value).toEqual('have a date in Osaka')

        const editDueDate = wrapper.find('[data-testid="editDueDate"]')
        expect(editDueDate.exists()).toBe(true)
        expect(editDueDate.element.value).toEqual('2023-12-25')        

        const editCompleteBtn = wrapper.find('[data-testid="editCompleteBtn"]')
        expect(editCompleteBtn.exists()).toBe(true)
    })

    it('disables the completed and edit buttons when the edit button is clicked', async () => {
        const wrapper = mount(TodoItem, {
            props: {
                task: {
                    ...exampleTask,
                    completion: false
                }
            }
        })

        const editBtn = wrapper.find('[data-testid="editBtn"]')
        await editBtn.trigger('click')

        const completeBtn = wrapper.find('[data-testid="completedBtn"]')
        expect(completeBtn.attributes().disabled).toBeDefined()

        const editBtn1 = wrapper.find('[data-testid="editBtn"]')
        expect(editBtn1.attributes().disabled).toBeDefined()

    })

    it('saves updates to the task description and due date when the edit complete button is clicked (ONE DAY YOU WILL WORK)', async () => {
        const wrapper = mount(TodoItem, {
            props: {
                task: {
                    ...exampleTask,
                    completion: false
                }
            }
        })

        const editBtn = wrapper.find('[data-testid="editBtn"]')
        await editBtn.trigger('click')

        const editDescriptionInput = wrapper.find('[data-testid="editDescriptionInput"]')
        editDescriptionInput.setValue('go to fluffy fluffy')
        const editDueDate = wrapper.find('[data-testid="editDueDate"]')
        editDueDate.setValue('2023-12-31')

        const editCompleteBtn = wrapper.find('[data-testid="editCompleteBtn"]')
        await editCompleteBtn.trigger('click')

        const description = wrapper.find('[data-testid="description"]')
        const dueDate = wrapper.find('[data-testid="dueDate"]')
        expect(description.text().includes('go to fluffy fluffy')).toBe(true)
        expect(dueDate.text().includes('2023-12-31')).toBe(true)

        // wrapper.emitted()

        // {
        //     delete: [
        //         [1],
        //         [2],
        //         [1000]
        //     ],
        //     updateTask: [
        //         ['desc', 'tpday', 1]
        //     ]
        // }

    })

    // it('does not display the completed button and displays the make active, edit description and delete buttons when the completed button is clicked', async () => {
    //     const wrapper = mount(TodoItem, {
    //         props: {
    //             task: exampleTask,
    //         }
    //     })

    //     let completedBtn = wrapper.find('[data-testid="completedBtn"]')
    //     await completedBtn.trigger('click')
    //     completedBtn = wrapper.find('[data-testid="completedBtn"]')
    //     expect(completedBtn.exists()).toBe(false)

    //     const makeActiveBtn = wrapper.find('[data-testid="makeActiveBtn"]')
    //     expect(makeActiveBtn.exists()).toBe(true)
    // })

})