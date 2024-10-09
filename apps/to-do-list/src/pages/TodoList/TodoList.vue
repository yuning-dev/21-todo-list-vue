<template>
    <div :class="$style.wrapper">
        <section :class="[$style.header, $style.card]">
            <h1 :class="$style.title">
                Snazzy Todo List
            </h1>
            <p :class="$style.intro">
                With our snazzy todo list, managing tasks has never been easier. Begin by entering your task name and deadline below.
            </p>
            <div :class="$style.addItemContainer">
                <label>
                    Task description:
                    <input type="text" :class="$style.addItemField" v-model="newTaskDescription" @keyup.enter="addListItem" ref="taskDescriptionInput" data-testid="taskDescriptionInput"/>
                </label>
                <label>
                    Due date:
                    <input type="date" :class="$style.dueDate" v-model="newTaskDueDate" :min="dateOfToday()" data-testid="dueDatePicker"/>
                </label>
                <div>
                    <button :class="[$style.addButton, $style.button]" @click="addListItem" data-testid="addItemBtn">
                        Add list item
                    </button>
                </div>
            </div>
        </section>
        <section :class="[$style.activeTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Active tasks
                </h2>
                <button :class="$style.button" @click="deleteActiveBtnClicked" data-testid="deleteActiveBtn">Delete active tasks</button>
            </div>
            <template v-for="task in activeTasksList">
                <TodoItem :task="task" @delete="deleteTaskItem" @updateTask="updateTaskDescriptionAndDueDate" @moveToCompleted="findTaskToMoveToCompleted" />
            </template>
        </section>
        <template v-if="modalDeleteActive">
            <ModalWindow @closeModal="closeModal">
                <template v-slot>
                    Are you sure you want to delete all the active tasks?
                    <div :class="$style.modalBtnContainer">
                        <button :class="$style.button" @click="deleteActiveTasks" data-testid="yesBtn">Yes</button>
                        <button :class="[$style.button, $style.cancelButton]" @click="closeModal">Cancel</button>
                    </div>
                </template>
            </ModalWindow>
        </template>
        <section :class="[$style.completedTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Completed tasks
                </h2>
                <button :class="$style.button" @click="deleteCompletedBtnClicked" data-testid="deleteCompletedBtn">Delete completed tasks</button>
            </div>
            <template v-for="task in completedTasksList">
                <TodoItem :task="task" @delete="deleteTaskItem" @updateTask="updateTaskDescriptionAndDueDate" @moveToActive="findTaskToMoveToActive"/>
            </template>
        </section>
        <template v-if="modalDeleteCompleted">
            <ModalWindow @closeModal="closeModal">
                <template v-slot>
                    Are you sure you want to delete all the completed tasks?
                    <div :class="$style.modalBtnContainer">
                        <button :class="$style.button" @click="deleteCompletedTasks" data-testid="yesBtn">Yes</button>
                        <button :class="[$style.button, $style.cancelButton]" @click="closeModal">Cancel</button>
                    </div>
                </template>
            </ModalWindow>
        </template>
        <section>
            <button :class="[$style.button, $style.deleteAllButton]" @click="deleteAllBtnClicked">Delete all tasks</button>
        </section>
        <template v-if="modalDeleteAll">
            <ModalWindow @closeModal="closeModal">
                <template v-slot>
                    Are you sure you want to delete all the tasks?
                    <div :class="$style.modalBtnContainer">
                        <button :class="$style.button" @click="deleteAllTasks" data-testid="yesBtn">Yes</button>
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

import TodoItem from '../../components/TodoItem.vue'
import ModalWindow from '../../components/ModalWindow.vue'
import axios from 'axios'

export default {
    name: 'TodoList',
    components: {
        TodoItem,
        ModalWindow,
    },
    data() {
        return {
            newTaskDescription: '',
            newTaskDueDate: '',
            isCompleted: false,
            fetchedTasks: [],
            modalDeleteAll: false,
            modalDeleteActive: false,
            modalDeleteCompleted: false,
        }
    },
    async mounted() {
        await this.fetchTodoList()
        // const response = await axios.get('/api/todo-list/')
        // let responseData = response.data
        // this.taskList = responseData.map((task) => {
        //     const formattedTask = {
        //         ...task,
        //         dueDate: task.dueDate_formatted
        //     }
        //     return formattedTask
        // })
        // console.log(this.taskList)   
    },
    computed: {
        ...mapStores(useTaskStore),
        ...mapState(useTaskStore, [ 
            'completedTasksList',
            'activeTasksList', 
        ]),
        ...mapWritableState(useTaskStore, [
            'taskList'
        ]),
    },
    methods: {
        ...mapActions(useTaskStore, [
            'dateOfToday',
            'fetchTodoList',
            'sendTodoItem',
            'deleteTodoItem',
            'updateDescriptionAndDueDate',
            'updateCompletionStatus',
            'deleteMultipleItems'
        ]),
        async addListItem(e) {
            e.preventDefault()
            if (this.newTaskDescription !== '' && this.newTaskDueDate !== '') {
                await this.sendTodoItem(this.newTaskDescription, this.newTaskDueDate, this.isCompleted)
                this.newTaskDescription = ''
            }
            this.focusAddTaskDescriptionInput()
        },
        focusAddTaskDescriptionInput() {
            this.$refs.taskDescriptionInput.focus()
        },
        async updateTaskDescriptionAndDueDate(updatedDescription, updatedDueDate, id) {
            const taskToUpdate = this.taskList.find((task) => task.id === id)
            const completion = taskToUpdate.completion
            await this.updateDescriptionAndDueDate(updatedDescription, updatedDueDate, id, completion)
        },
        async deleteTaskItem(id) {
            await this.deleteTodoItem(id)
        },
        async findTaskToMoveToCompleted(id) {
            await this.updateCompletionStatus('true', id)
        },
        async findTaskToMoveToActive(id) {
            await this.updateCompletionStatus('false', id)
        },
        deleteActiveBtnClicked() {
            if (this.activeTasksList.length > 0) {
                this.modalDeleteActive = true
            }
        },
        async deleteActiveTasks() {
            await this.deleteMultipleItems('active')
            this.closeModal()
        },
        deleteCompletedBtnClicked() {
            if (this.completedTasksList.length > 0) {
                this.modalDeleteCompleted = true
            }
        },
        async deleteCompletedTasks() {
            await this.deleteMultipleItems('completed')
            this.closeModal()
        },
        deleteAllBtnClicked() {
            if (this.taskList.length > 0) {
                this.modalDeleteAll = true
            }
        },
        async deleteAllTasks() {
            await this.deleteMultipleItems('all')
            this.closeModal()
        },
        closeModal() {
            this.modalDeleteAll = false
            this.modalDeleteActive = false
            this.modalDeleteCompleted = false
        },
    },
}
</script>

<style module src="./TodoList.css" />