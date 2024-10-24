<template>
    <div :class="$style.wrapper">
        <template v-if="!isInEditMode">
            <div data-testid="title" :class="$style.apptTitleContainer">
                {{ appt.title }}
            </div>
            <div v-if="!appt.completion" data-testid="dueDate" :class="{ [$style.orange]: isOrange, [$style.red]: isRed }">
                Due date: {{ appt.dueDate }}
            </div>
            <div v-if="appt.completion">
                Due date: {{ appt.dueDate }}
            </div>
        </template>
        <template v-else>
            <div>
                Title <input type="text" data-testid="editTitleInput" v-model="editedApptTitle" />
            </div>
            <div v-if="!appt.completion">
                Due date <input type="date" data-testid="editDueDate" v-model="editedDueDate" :min="dateOfToday()">
            </div>
            <div v-if="appt.completion">
                Due date: {{ appt.dueDate }}
            </div>
            <button data-testid="editCompleteBtn" :class="[$style.editCompleteBtn, $style.button]" @click="editCompleteBtnClicked">Edit complete</button>
        </template>
        <div>
            <button data-testid="completedBtn" :class="$style.button" v-if="!appt.completion" @click="moveToCompletedButtonClicked" :disabled="isButtonDisabled">Completed</button>
            <button data-testid="makeActiveBtn" :class="$style.button" v-if="appt.completion" @click="makeActiveButtonClicked">Make active</button>
            <button data-testid="editBtn" :class="$style.button" v-if="!appt.completion" @click="editButtonClicked" :disabled="isButtonDisabled">Edit</button>
            <button :class="$style.button" v-if="appt.completion" @click="editButtonClicked" :disabled="isButtonDisabled">Edit title</button>
            <button data-testid="deleteBtn" :class="$style.button" @click="deleteButtonClicked">Delete</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TodoItem',
    props: {
        appt: Object,
    },
    data() {
        return {
            editedApptTitle: this.appt.title,
            editedDueDate: this.appt.dueDate,
            isInEditMode: false,
            isButtonDisabled: false,
        }
    },
    computed: {
        daysToDeadline() {
            const deadline = Date.parse(this.appt.dueDate)
            const timeNow = Date.now()
            const dateNow = timeNow - (timeNow % 86400000)
            const daysToDeadline = (deadline - dateNow) / 1000 / 60 / 60 / 24
            return daysToDeadline
        },
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
            console.log(this.editedApptTitle, this.editedDueDate, this.appt._id)
            this.$emit('updateAppt', this.editedApptTitle, this.editedDueDate, this.appt._id)
        },
        deleteButtonClicked() {
            this.$emit('delete', this.appt._id)
        },
        moveToCompletedButtonClicked() {
            this.$emit('moveToCompleted', this.appt._id)
        },
        makeActiveButtonClicked() {
            this.$emit('moveToActive', this.appt._id)
        },
        dateOfToday() {
            const today = new Date()
            const todayInString = today.toISOString()
            const dateInString = todayInString.substring(0,10)
            return dateInString
        },
    },
}
</script>

<style module src="./TodoItem.css" />