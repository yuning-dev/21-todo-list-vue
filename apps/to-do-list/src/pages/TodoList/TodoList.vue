<template>
    <div :class="$style.wrapper">
        <section :class="[$style.header, $style.card]">
            <h1 :class="$style.title">
                Interactive Todo List
            </h1>
            <p :class="$style.intro">
                With our snazzy todo list, managing tasks has never been easier. Begin by entering your task name and deadline below.
            </p>
            <div :class="$style.addItemContainer">
                <label>
                    Task description:
                    <input type="text" :class="$style.addItemField" v-model="newTaskDescription" @keyup.enter="addListItem" ref="taskDescriptionInput"/>
                </label>
                <label>
                    Due date:
                    <input type="date" :class="$style.dueDate" v-model="newTaskDueDate" :min="dateOfToday()" />
                </label>
                <div>
                    <button :class="[$style.addButton, $style.button]" @click="addListItem">
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
                <button :class="$style.button" @click="deleteActiveBtnClicked">Delete active tasks</button>
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
                        <button :class="$style.button" @click="deleteActiveTasks">Yes</button>
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
                <button :class="$style.button" @click="deleteCompletedBtnClicked">Delete completed tasks</button>
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
                        <button :class="$style.button" @click="deleteCompletedTasks">Yes</button>
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
                        <button :class="$style.button" @click="deleteAllTasks">Yes</button>
                        <button :class="[$style.button, $style.cancelButton]" @click="closeModal">Cancel</button>
                    </div>
                </template>                
            </ModalWindow>
        </template>
        <!-- <section :class="[$style.completedTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Tasks from the server
                </h2>
                <div></div>
            </div>
            <template v-for="task in fetchedTasks">
                <TodoItem :task="task" />
            </template>
        </section> -->
        <!-- <div>
           <p>Testing store:</p> 
           taskList: {{ taskList }} 
        </div>
        <div>
            activeTasksList: {{ activeTasksList }} <br/>
            completedTasksList: {{ completedTasksList }} 
        </div> -->
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
            newTaskId: 0,
            // taskList: [],
            isCompleted: false,
            fetchedTasks: [],
            modalDeleteAll: false,
            modalDeleteActive: false,
            modalDeleteCompleted: false,
        }
    },
    // mounted() {
    //     const timeNow = new Date()
    //     console.log(timeNow.toString())
    //     this.newTaskDueDate.min = timeNow.toString()
    // },
    computed: {
        ...mapStores(useTaskStore),
        ...mapState(useTaskStore, [ 
            'completedTasksList',
            'activeTasksList', 
        ]),
        ...mapWritableState(useTaskStore, [
            'taskList'
        ])
    },
    methods: {
        ...mapActions(useTaskStore, ['dateOfToday']),
        async addListItem() {
            const task = {
                description: this.newTaskDescription,
                dueDate: this.newTaskDueDate,
                id: this.newTaskId,
                completion: this.isCompleted,
            }
            if (this.newTaskDescription !== '' && this.newTaskDueDate !== '') {
                this.taskList.push(task)
                this.newTaskId++
                this.newTaskDescription = ''
            }
            this.focusAddTaskDescriptionInput()
            console.log(task)

            // axios.get - read some data, must be idempotent - kinda like a pure function where you avoid side effects in the database.
            //   Doesn't have a body
            // axios.post - create new entries in the database
            //   Has a body with data (an object) used to create a new entry
            // axios.put - update an existing entry
            //   Has a body with data (an object) used to update an entry
            // axios.delete - delete an entry
            //   Doesn't have a body
            // const tasks = await axios.post('http://localhost:3000/api/task/create', task)
            // this.fetchedTasks = tasks.data
        },
        focusAddTaskDescriptionInput() {
            this.$refs.taskDescriptionInput.focus()
        },
        updateTaskDescriptionAndDueDate(updatedDescription, updatedDueDate, id) {
            const taskToUpdate = this.taskList.find((task) => task.id === id)
            taskToUpdate.description = updatedDescription
            taskToUpdate.dueDate = updatedDueDate
        },
        deleteTaskItem(id) {
            const taskListWithTaskRemoved = this.taskList.filter((task) => task.id !== id)
            this.taskList = taskListWithTaskRemoved
        },
        findTaskToMoveToCompleted(id) {
            const taskToMoveToCompleted = this.taskList.find((task) => task.id === id)
            taskToMoveToCompleted.completion = true
        },
        findTaskToMoveToActive(id) {
            const taskToMoveToActive = this.taskList.find((task) => task.id === id)
            taskToMoveToActive.completion = false
        },
        deleteActiveBtnClicked() {
            if (this.activeTasksList.length > 0) {
                this.modalDeleteActive = true
            }
        },
        deleteActiveTasks() {
            this.taskList = this.completedTasksList
            this.closeModal()
        },
        deleteCompletedBtnClicked() {
            if (this.completedTasksList.length > 0) {
                this.modalDeleteCompleted = true
            }
        },
        deleteCompletedTasks() {
            this.taskList = this.activeTasksList
            this.closeModal()
        },
        deleteAllBtnClicked() {
            if (this.taskList.length > 0) {
                this.modalDeleteAll = true
            }
        },
        deleteAllTasks() {
            this.taskList = []
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