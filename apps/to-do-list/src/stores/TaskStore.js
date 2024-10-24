import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        apptList: [],
    }),
    getters: {
        upcomingApptsList(state) {
            return state.apptList.filter((appt) => !appt.completion)
        },
        completedApptsList(state) {
            return state.apptList.filter((appt) => appt.completion)
        },
    },
    actions: {
        dateOfToday() {
            const today = new Date()
            const todayInString = today.toISOString()
            const dateInString = todayInString.substring(0,10)
            return dateInString
        },
        // async checkSession() {
        //     const response = await axios.get('/api/session')
        //     if (!response.data.title) {
        //         return false
        //     }
        // },
        // async createSession() {
        //     const response = await axios.post('/api/session')
        // },
        async fetchApptList() {
            const response = await axios.get('/api/appointments')
            const formattedApptList = response.data.map((appt) => {
                const formattedAppt = {
                    ...appt,
                    dueDate: appt.dueDate.slice(0, 10)
                }
                return formattedAppt
            })
            this.apptList = formattedApptList
        },
        async sendAppt(newTitle, newTaskDueDate, completionStatus) {
            await axios.post('/api/appointment', {
                title: newTitle,
                dueDate: newTaskDueDate,
                completion: completionStatus,
            })
            await this.fetchApptList()
        },
        async deleteAppt(id) {
            await axios.delete('/api/appointment/' + id)
            await this.fetchApptList()
        },
        async updateDescriptionAndDueDate(updatedTitle, updatedTaskDueDate, id, completionStatus) {
            await axios.put('/api/appointment/' + id, {
                title: updatedTitle,
                dueDate: updatedTaskDueDate,
                completion: completionStatus
            })
            await this.fetchApptList()
        },
        async updateCompletionStatus(updatedCompletionStatus, id) {
            await axios.post('/api/appointment/' + id, {
                completion: updatedCompletionStatus
            })
            await this.fetchApptList()
        },
        async deleteMultipleItems(itemsType) {
            await axios.post('/api/appointments/delete-' + itemsType)
            await this.fetchApptList()
        }
    },
})