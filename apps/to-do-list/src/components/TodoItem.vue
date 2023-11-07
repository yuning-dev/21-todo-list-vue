<template>
    <div :class="$style.wrapper">
        <div v-if="isInEditMode === false">
            {{ task.description }}
        </div>
        <div v-if="isInEditMode === true">
            <input type="text" v-model="editedTaskDescription" @keyup.enter="editCompleteIconClicked" @blur="editCompleteIconClicked"/>
            <img src="../../public/checkmark.png" width="16" :class="$style.editCompleteIcon" @click="editCompleteIconClicked">
        </div>
        <div>
            <button v-if="!task.completion" @click="moveToCompletedButtonClicked" :disabled="isButtonDisabled">Completed</button>
            <button v-if="task.completion" @click="makeActiveButtonClicked">Make active</button>
            <button @click="editButtonClicked" :disabled="isButtonDisabled">Edit</button>
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
            isInEditMode: false,
            isButtonDisabled: false
        }
    },
    methods: {
        editButtonClicked() {
            this.isButtonDisabled = true
            this.isInEditMode = true
        },
        editCompleteIconClicked() {
            this.isInEditMode = false
            this.isButtonDisabled = false
            this.$emit('updateTask', this.editedTaskDescription, this.task.id)
        },
        deleteButtonClicked() {
            this.$emit('delete', this.task.id)
        },
        moveToCompletedButtonClicked() {
            this.$emit('moveToCompleted', this.task.id)
        },
        makeActiveButtonClicked() {
            this.$emit('moveToActive', this.task.id)
        }
    },
}
</script>

<style module src="./TodoItem.css" />