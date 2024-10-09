import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        taskList: [],
    }),
    getters: {
        activeTasksList(state) {
            return state.taskList.filter((task) => !task.completion)
        },
        completedTasksList(state) {
            return state.taskList.filter((task) => task.completion)
        },
    },
    actions: {
        dateOfToday() {
            const today = new Date()
            const todayInString = today.toISOString()
            const dateInString = todayInString.substring(0,10)
            return dateInString
        },
        async fetchTodoList() {
            const response = await axios.get('/api/todo-items')
            this.taskList = response.data
        },
        async sendTodoItem(newTaskDescription, newTaskDueDate, completionStatus) {
            await axios.post('/api/todo-item', {
                description: newTaskDescription,
                dueDate: newTaskDueDate,
                completion: completionStatus
            })
            await this.fetchTodoList()
        },
        async deleteTodoItem(id) {
            await axios.delete('/api/todo-item/' + id)
            await this.fetchTodoList()
        },
        async updateDescriptionAndDueDate(updatedTaskDescription, updatedTaskDueDate, id, completionStatus) {
            await axios.put('/api/todo-item/' + id, {
                description: updatedTaskDescription,
                dueDate: updatedTaskDueDate,
                completion: completionStatus
            })
            await this.fetchTodoList()
        },
        async updateCompletionStatus(updatedCompletionStatus, id) {
            await axios.post('/api/todo-item/' + id, {
                completion: updatedCompletionStatus
            })
            await this.fetchTodoList()
        },
        async deleteMultipleItems(itemsType) {
            console.log('I am called')
            await axios.post('/api/todo-items/delete-' + itemsType)
            await this.fetchTodoList()
        }

    },
})