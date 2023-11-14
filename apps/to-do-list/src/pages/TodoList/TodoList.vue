<template>
    <div :class="$style.wrapper">
        <section :class="[$style.header, $style.card]">
            <h1 :class="$style.title">
                Interactive Todo List
            </h1>
            <p :class="$style.intro">
                This TodoList is incredibly addictive. Use with caution,
                and at your own peril. Mwahahahahah!!!!!??!!!!
            </p>
            <div :class="$style.addItemContainer">
                <label>
                    Task description:
                    <input type="text" :class="$style.addItemField" v-model="newTaskDescription" @keyup.enter="addListItem" ref="taskDescriptionInput"/>
                </label>
                <label>
                    Due date:
                    <input type="date" :class="$style.dueDate" v-model="newTaskDueDate" />
                </label>
                <label>
                    <button @click="addListItem">
                        Add list item
                    </button>
                </label>
            </div>
        </section>
        <section :class="[$style.activeTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Active tasks
                </h2>
                <button @click="deleteActiveTasks">Delete active tasks</button>
            </div>
            <template v-for="task in activeTasksList">
                <TodoItem :task="task" @delete="deleteTaskItem" @updateTask="updateTaskDescriptionAndDueDate" @moveToCompleted="findTaskToMoveToCompleted" />
            </template>
        </section>
        <section :class="[$style.completedTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Completed tasks
                </h2>
                <button @click="deleteCompletedTasks">Delete completed tasks</button>
            </div>
            <template v-for="task in completedTasksList">
                <TodoItem :task="task" @delete="deleteTaskItem" @updateTask="updateTaskDescriptionAndDueDate" @moveToActive="findTaskToMoveToActive"/>
            </template>
        </section>
        <section>
            <button :class="$style.deleteAllButton" @click="deleteAllTasks">Delete all tasks</button>
        </section>

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
    </div>
</template>

<script>
import TodoItem from '../../components/TodoItem.vue'
import axios from 'axios'

export default {
    name: 'TodoList',
    components: {
        TodoItem
    },
    data() {
        return {
            newTaskDescription: '',
            newTaskDueDate: '',
            newTaskId: 0,
            taskList: [],
            isCompleted: false,
            fetchedTasks: [],
        }
    },
    // mounted() {
    //     const timeNow = new Date()
    //     console.log(timeNow.toString())
    //     this.newTaskDueDate.min = timeNow.toString()
    // },
    computed: {
        activeTasksList() {
            let activeTasksList = []
            activeTasksList = this.taskList.filter((task) => {
                if (task.completion) {
                    return false
                }
                return true
            })
            return activeTasksList
        },
        completedTasksList() {
            let completedTasksList = []
            completedTasksList = this.taskList.filter((task) => {
                if (!task.completion) {
                    return false
                }
                return true
            })
            return completedTasksList
        }
    },
    methods: {
        async addListItem() {
            const task = {
                description: this.newTaskDescription,
                dueDate: this.newTaskDueDate,
                id: this.newTaskId,
                completion: this.isCompleted,
                daysToDeadline: this.getDaysUntilDeadline()
            }
            if (this.newTaskDescription !== '') {
                this.taskList.push(task)
                this.newTaskId++
                this.newTaskDescription = ''
            }
            this.focusAddTaskDescriptionInput()
            this.getDaysUntilDeadline()

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
            const taskToUpdate = this.taskList.find((task) => {
                if (task.id === id) {
                    return true
                }
                return false
            })
            taskToUpdate.description = updatedDescription
            taskToUpdate.dueDate = updatedDueDate
        },
        deleteTaskItem(id) {
            const taskListWithTaskRemoved = this.taskList.filter((task) => {
                if (task.id === id) {
                    return false
                } 
                return true
            })
            this.taskList = taskListWithTaskRemoved
        },
        findTaskToMoveToCompleted(id) {
            const taskToMoveToCompleted = this.taskList.find((task) => {
                if (task.id === id) {
                    return true
                }
                return false
            })
            taskToMoveToCompleted.completion = true
        },
        findTaskToMoveToActive(id) {
            const taskToMoveToActive = this.taskList.find((task) => {
                
                if (task.id === id) {
                    return true
                }
                return false
            })
            taskToMoveToActive.completion = false
        },
        deleteActiveTasks() {
            const completedTasksList = this.taskList.filter((task) => {
                if (task.completion) {
                    return true
                }
                return false
            })
            this.taskList = completedTasksList
        },
        deleteCompletedTasks() {
            const activeTasksList = this.taskList.filter((task) => {
                if (!task.completion) {
                    return true
                }
                return false
            })
            this.taskList = activeTasksList
        },
        deleteAllTasks() {
            this.taskList = []
        },
        getDaysUntilDeadline() {
            const deadline = Date.parse(this.newTaskDueDate)
            const timeNow = Date.now()
            const dateNow = timeNow - (timeNow % 86400000)
            const daysToDeadline = (deadline - dateNow) /1000/60/60/24
            return daysToDeadline
        },
    },
}
</script>

<style module src="./TodoList.css" />