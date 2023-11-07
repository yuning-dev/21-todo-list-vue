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
                    Task description
                    <input type="text" :class="$style.addItemField" v-model="newTaskDescription" @keyup.enter="addListItem" ref="taskDescriptionInput"/>
                </label>
                <label>
                    Due date
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
                <TodoItem :task="task" @delete="deleteTaskItem" @updateTask="updateTaskDescription" @moveToCompleted="findTaskToMoveToCompleted" />
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
                <TodoItem :task="task" @delete="deleteTaskItem" @updateTask="updateTaskDescription" @moveToActive="findTaskToMoveToActive"/>
            </template>
        </section>
        <section>
            <button :class="$style.deleteAllButton" @click="deleteAllTasks">Delete all tasks</button>
        </section>
    </div>
</template>

<script>
import TodoItem from '../../components/TodoItem.vue'

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
        }
    },
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
        addListItem() {
            const task = {
                description: this.newTaskDescription,
                dueDate: this.newTaskDueDate,
                id: this.newTaskId,
                completion: this.isCompleted
            }
            if (this.newTaskDescription !== '') {
                this.taskList.push(task)
                this.newTaskId++
                this.newTaskDescription = ''
            }
            this.focusAddTaskDescriptionInput()
        },
        focusAddTaskDescriptionInput() {
            this.$refs.taskDescriptionInput.focus()
        },
        updateTaskDescription(updatedDescription, id) {
            const taskToUpdate = this.taskList.find((task) => {
                if (task.id === id) {
                    return true
                }
                return false
            })
            taskToUpdate.description = updatedDescription
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
    },
}
</script>

<style module src="./TodoList.css" />