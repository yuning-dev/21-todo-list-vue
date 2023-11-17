<template>
    <div :class="$style.wrapper">
        <template v-if="!isInEditMode">
            <div :class="$style.taskDescriptionContainer">
                {{ task.description }}
            </div>
            <div :class="{ [$style.orange]: isOrange, [$style.red]: isRed }">
                Due date: {{ task.dueDate }}
            </div>
        </template>
        <template v-else>
            <div>
                Task description <input type="text" v-model="editedTaskDescription" />
            </div>
            <div v-if="!task.completion">
                Due date <input type="date" v-model="editedDueDate">
            </div>
            <div v-if="task.completion">
                Due date: {{ task.dueDate }}
            </div>
            <button :class="$style.editCompleteBtn" @click="editCompleteBtnClicked">Edit complete</button>
        </template>
        <div>
            <button v-if="!task.completion" @click="moveToCompletedButtonClicked" :disabled="isButtonDisabled">Completed</button>
            <button v-if="task.completion" @click="makeActiveButtonClicked">Make active</button>
            <button v-if="!task.completion" @click="editButtonClicked" :disabled="isButtonDisabled">Edit</button>
            <button v-if="task.completion" @click="editButtonClicked" :disabled="isButtonDisabled">Edit description</button>
            <button @click="deleteButtonClicked">Delete</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TodoItem',
    props: {
        task: Object,
    },
    data() {
        return {
            editedTaskDescription: this.task.description,
            editedDueDate: this.task.dueDate,
            isInEditMode: false,
            isButtonDisabled: false,
            daysToDeadline: this.getDaysUntilDeadline(),
            // isRed: false,
            // isOrange: false,
        }
    },
    // mounted() {
    //     this.setDueDateColor(this.task.dueDate)
    // },
    computed: {
        isOrange() {
            return 0 < this.daysToDeadline && this.daysToDeadline <= 1
        },
        isRed() {
            return this.daysToDeadline <= 0
        }
    },
    methods: {
        editButtonClicked() {
            this.isButtonDisabled = true
            this.isInEditMode = true
        },
        editCompleteBtnClicked() {
            this.isInEditMode = false
            this.isButtonDisabled = false
            // this.setDueDateColor(this.editedDueDate)
            this.$emit('updateTask', this.editedTaskDescription, this.editedDueDate, this.task.id)
        },
        deleteButtonClicked() {
            this.$emit('delete', this.task.id)
        },
        moveToCompletedButtonClicked() {
            this.$emit('moveToCompleted', this.task.id)
        },
        makeActiveButtonClicked() {
            this.$emit('moveToActive', this.task.id)
        },
        getDaysUntilDeadline() {
            const deadline = Date.parse(this.task.dueDate)
            const timeNow = Date.now()
            const dateNow = timeNow - (timeNow % 86400000)
            const daysToDeadline = (deadline - dateNow) / 1000 / 60 / 60 / 24
            return daysToDeadline
        },
        // setDueDateColor(date) {
        //     const deadline = Date.parse(date)
        //     const timeNow = Date.now()
        //     const dateNow = timeNow - (timeNow % 86400000)
        //     const daysToDeadline = (deadline - dateNow) / 1000 / 60 / 60 / 24
        //     if (daysToDeadline <= 0) {
        //         this.isRed = true
        //     } else if (daysToDeadline <= 1) {
        //         this.isOrange = true
        //         this.isRed = false
        //     } else {
        //         this.isRed = false
        //         this.isOrange = false
        //     }
        // },
    },
}
</script>

<style module src="./TodoItem.css" />