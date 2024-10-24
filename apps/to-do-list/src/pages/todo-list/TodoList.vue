<template>
    <div :class="$style.wrapper">
        <section :class="[$style.header, $style.card]">
            <h1 :class="$style.title">
                Snazzy Appointments App
            </h1>
            <p :class="$style.intro">
                With our snazzy appointment app, managing appointments has never been easier. Begin by entering your appointment details below.
            </p>
            <div :class="$style.addItemContainer">
                <label>
                    Appointment title:
                    <input type="text" :class="$style.addItemField" v-model="newTitle" @keyup.enter="createAppt" ref="TitleInput" data-testid="TitleInput"/>
                </label>
                <label>
                    <!-- Not modified as the new data model will be different -->
                    Due date:
                    <input type="date" :class="$style.dueDate" v-model="newTaskDueDate" :min="dateOfToday()" data-testid="dueDatePicker"/>
                </label>
                <div>
                    <button :class="[$style.addButton, $style.button]" @click="createAppt" data-testid="addItemBtn">
                        Create appointment
                    </button>
                </div>
            </div>
        </section>
        <section :class="[$style.upcomingApptsSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Upcoming Appointments
                </h2>
                <button :class="$style.button" @click="deleteUpcomingBtnClicked" data-testid="deleteUpcomingBtn">Delete upcoming apppointments</button>
            </div>
            <template v-for="appt in upcomingApptsList">
                <TodoItem :appt="appt" @delete="findAndDeleteAppt" @updateAppt="updateTitleAndDueDate" @moveToCompleted="findApptToMoveToCompleted" />
            </template>
        </section>
        <template v-if="modalDeleteUpcoming">
            <ModalWindow @closeModal="closeModal">
                <template v-slot>
                    Are you sure you want to delete all the upcoming appointments?
                    <div :class="$style.modalBtnContainer">
                        <button :class="$style.button" @click="deleteUpcomingAppts" data-testid="yesBtn">Yes</button>
                        <button :class="[$style.button, $style.cancelButton]" @click="closeModal">Cancel</button>
                    </div>
                </template>
            </ModalWindow>
        </template>
        <section :class="[$style.completedApptsSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Done and dusted
                </h2>
                <button :class="$style.button" @click="deleteCompletedBtnClicked" data-testid="deleteCompletedBtn">Delete completed appointments</button>
            </div>
            <template v-for="appt in completedApptsList">
                <TodoItem :appt="appt" @delete="findAndDeleteAppt" @updateAppt="updateTitleAndDueDate" @moveToActive="findApptToMoveToActive"/>
            </template>
        </section>
        <template v-if="modalDeleteCompleted">
            <ModalWindow @closeModal="closeModal">
                <template v-slot>
                    Are you sure you want to delete all the completed tasks?
                    <div :class="$style.modalBtnContainer">
                        <button :class="$style.button" @click="deleteCompletedAppts" data-testid="yesBtn">Yes</button>
                        <button :class="[$style.button, $style.cancelButton]" @click="closeModal">Cancel</button>
                    </div>
                </template>
            </ModalWindow>
        </template>
        <section>
            <button :class="[$style.button, $style.deleteAllButton]" @click="deleteAllBtnClicked">Delete all appointments</button>
        </section>
        <template v-if="modalDeleteAll">
            <ModalWindow @closeModal="closeModal">
                <template v-slot>
                    Are you sure you want to delete all the appointments?
                    <div :class="$style.modalBtnContainer">
                        <button :class="$style.button" @click="deleteAllAppts" data-testid="yesBtn">Yes</button>
                        <button :class="[$style.button, $style.cancelButton]" @click="closeModal">Cancel</button>
                    </div>
                </template>                
            </ModalWindow>
        </template>
    </div>
</template>


<script>

import { mapStores } from 'pinia'
import { mapState, mapWritableState } from 'pinia'
import { mapActions } from 'pinia'
import { useTaskStore } from '@/stores/TaskStore'

import TodoItem from '../../components/todo-item/TodoItem.vue'
import ModalWindow from '../../components/modal-window/ModalWindow.vue'
import axios from 'axios'

export default {
    name: 'TodoList',
    components: {
        TodoItem,
        ModalWindow,
    },
    data() {
        return {
            newTitle: '',
            newTaskDueDate: '',
            isCompleted: false,
            modalDeleteAll: false,
            modalDeleteUpcoming: false,
            modalDeleteCompleted: false,
        }
    },
    async mounted() {
        // await this.createSession()
        await this.fetchApptList()
    },
    computed: {
        ...mapStores(useTaskStore),
        ...mapState(useTaskStore, [ 
            'completedApptsList',
            'upcomingApptsList', 
        ]),
        ...mapWritableState(useTaskStore, [
            'apptList'
        ]),
    },
    methods: {
        ...mapActions(useTaskStore, [
            'dateOfToday',
            'fetchApptList',
            'sendAppt',
            'deleteAppt',
            'updateDescriptionAndDueDate',
            'updateCompletionStatus',
            'deleteMultipleItems',
            'createSession'
        ]),
        async createAppt(e) {
            e.preventDefault()
            if (this.newTitle !== '' && this.newTaskDueDate !== '') {
                await this.sendAppt(this.newTitle, this.newTaskDueDate, this.isCompleted)
                this.newTitle = ''
            }
            this.focusAddTitleInput()
        },
        focusAddTitleInput() {
            this.$refs.TitleInput.focus()
        },
        async updateTitleAndDueDate(updatedDescription, updatedDueDate, id) {
            const apptToUpdate = this.apptList.find((appt) => appt._id === id)
            console.log(apptToUpdate)
            const completion = apptToUpdate.completion
            await this.updateDescriptionAndDueDate(updatedDescription, updatedDueDate, id, completion)
        },
        async findAndDeleteAppt(id) {
            await this.deleteAppt(id)
        },
        async findApptToMoveToCompleted(id) {
            await this.updateCompletionStatus('true', id)
        },
        async findApptToMoveToActive(id) {
            await this.updateCompletionStatus('false', id)
        },
        deleteUpcomingBtnClicked() {
            if (this.upcomingApptsList.length > 0) {
                this.modalDeleteUpcoming = true
            }
        },
        async deleteUpcomingAppts() {
            await this.deleteMultipleItems('active')
            this.closeModal()
        },
        deleteCompletedBtnClicked() {
            if (this.completedApptsList.length > 0) {
                this.modalDeleteCompleted = true
            }
        },
        async deleteCompletedAppts() {
            await this.deleteMultipleItems('completed')
            this.closeModal()
        },
        deleteAllBtnClicked() {
            if (this.apptList.length > 0) {
                this.modalDeleteAll = true
            }
        },
        async deleteAllAppts() {
            await this.deleteMultipleItems('all')
            this.closeModal()
        },
        closeModal() {
            this.modalDeleteAll = false
            this.modalDeleteUpcoming = false
            this.modalDeleteCompleted = false
        },
    },
}
</script>

<style module src="./TodoList.css" />