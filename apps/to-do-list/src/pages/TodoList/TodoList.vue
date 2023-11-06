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
                    <input type="text" :class="$style.addItemField" v-model="newTaskDescription" @keyup.enter="addListItem" />
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
            <template v-for="task in taskList">
                <TodoItem :task="task" @delete="deleteActiveTaskItem" @updateTask="updateTaskDescription" />
            </template>
        </section>
        <section :class="[$style.completedTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Completed tasks
                </h2>
                <button>Delete completed tasks</button>
            </div>
            
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
        }
    },
    methods: {
        addListItem() {
            const task = {
                description: this.newTaskDescription,
                dueDate: this.newTaskDueDate,
                id: this.newTaskId
            }

            this.taskList.push(task)
            this.newTaskId++
            this.newTaskDescription = ''
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
        deleteActiveTasks() {
            this.taskList = []
        },
        deleteActiveTaskItem(id) {
            const taskListWithTaskRemoved = this.taskList.filter((task) => {
                if (task.id === id) {
                    return false
                } 
                return true
            })
            this.taskList = taskListWithTaskRemoved
        },
    },
}
</script>

<style module src="./TodoList.css" />