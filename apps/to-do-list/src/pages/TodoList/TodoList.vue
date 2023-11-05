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
                    <input type="text" :class="$style.addItemField" v-model="newTaskDescription">
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
                <button>Delete active tasks</button>
            </div>
            <template v-for="task in taskList">
                <TodoItem :task="task"/>
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
            taskList: [],
        }
    },
    methods: {
        addListItem() {
            const task = {
                newTaskDescription: this.newTaskDescription,
                newTaskDueDate: this.newTaskDueDate,
            }
            this.taskList.push(task)
        },
    },
}
</script>

<style module src="./TodoList.css" />