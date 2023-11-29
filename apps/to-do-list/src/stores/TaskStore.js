import { defineStore } from 'pinia'

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
    },
})