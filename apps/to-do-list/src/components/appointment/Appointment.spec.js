import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Appointment from './Appointment.vue'

describe.skip('appointment', () => {

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

    function dateOfTomorrow() {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().substring(0, 10)
    }

    it('displays the description and due date when the task is created', () => {
        const wrapper = mount(Appointment, {
            props: {
                task: exampleTask,
            }
        })

        expect(wrapper.text().includes('have a date in Osaka')).toBe(true)
        expect(wrapper.text().includes('2023-12-25')).toBe(true)
    })

    it.each([
            { dueDate: '2023-12-25', colour: 'red', tense: 'in the past' },
            { dueDate: dateOfToday(), colour: 'red', tense: 'today' },
            { dueDate: dateOfTomorrow(), colour: 'orange', tense: 'tomorrow' },
        ])('if task is due $tense, display the date in $colour', ({dueDate, colour, tense}) => {
        const wrapper = mount(Appointment, {
            props: {
                task: {
                    ...exampleTask,
                    dueDate: dueDate
                }
            }
        })
        
        const dueDateElement = wrapper.find('[data-testid="dueDate"]')
        expect(dueDateElement.classes()).toContain(colour)
    })

    it('displays the date in black if the due date is after tomorrow', () => {
        const wrapper = mount(Appointment, {
            props: {
                task: {
                    ...exampleTask,
                    dueDate: '2030-12-25'
                }
            }
        })

        const dueDate = wrapper.find('[data-testid="dueDate"]')
        expect(dueDate.classes()).toHaveLength(0)
    })

    it('deletes the task when the delete button is pressed', async () => {
        const wrapper = mount(Appointment, {
            props: {
                task: exampleTask,
            }
        })

        const deleteBtn = wrapper.find('[data-testid="deleteBtn"]')
        await deleteBtn.trigger('click')
        expect(wrapper.emitted().delete).toEqual([[1]])
    })

    it('changes the completion state when the completed button is clicked', async () => {
        const wrapper = mount(Appointment, {
            props: {
                task: {
                    ...exampleTask,
                }
            }
        })

        const completedBtn = wrapper.find('[data-testid="completedBtn"]')
        await completedBtn.trigger('click')
        expect(wrapper.emitted().moveToCompleted).toEqual([[1]])
    })

    it('makes an input field, a date picker and the edit complete button appear when the edit button is clicked', async () => {
        const wrapper = mount(Appointment, {
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

        const editCompleteBtn = wrapper.find('[data-testid="editCompleteBtn"]')
        expect(editCompleteBtn.exists()).toBe(true)
    })

    it('disables the completed and edit buttons when the edit button is clicked', async () => {
        const wrapper = mount(Appointment, {
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

    it('updates the task description and due date when the edit complete button is clicked', async () => {
        const wrapper = mount(Appointment, {
            props: {
                task: exampleTask
            }
        })

        const editBtn = wrapper.find('[data-testid="editBtn"]')
        await editBtn.trigger('click')

        const editDescriptionInput = wrapper.find('[data-testid="editDescriptionInput"]')
        await editDescriptionInput.setValue('go to fluffy fluffy')
        const editDueDate = wrapper.find('[data-testid="editDueDate"]')
        await editDueDate.setValue('2023-12-31')

        const editCompleteBtn = wrapper.find('[data-testid="editCompleteBtn"]')
        await editCompleteBtn.trigger('click')

        expect(wrapper.emitted().updateTask).toEqual([['go to fluffy fluffy', '', 1]])
    })

    it('does not display the completed button and displays the make active, edit description and delete buttons when the task is completed', () => {
        const wrapper = mount(Appointment, {
            props: {
                task: {
                    ...exampleTask,
                    completion: true
                }
            }
        })

        const completedButton = wrapper.find('[data-testid="completedBtn"]')
        expect(completedButton.exists()).toBe(false)

        const makeActiveBtn = wrapper.find('[data-testid="makeActiveBtn"]')
        expect(makeActiveBtn.exists()).toBe(true)
    })
})