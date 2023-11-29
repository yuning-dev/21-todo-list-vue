<template>
    <section :class="$style.wrapper">
        <div>
            Please enter here the new email address you wish to associate your account with:
            <input type="text" :class="$style.emailInput" v-model="newEmail">
        </div>
        <div>
            Please enter the new email address again:
            <input type="text" :class="$style.emailInput" v-model="newEmailConfirmation"> 
            <div :class="$style.warningWrapper">
                {{ doesEmailMatch }}
            </div>
        </div>
        <button :class="$style.button" @click="submitButtonClicked">Submit</button>
    </section>
</template>

<script>
export default {
    name: 'emailSettings',
    data() {
        return {
            newEmail: '',
            newEmailConfirmation: '',
            isSubmitButtonClicked: false,
        }
    },
    computed: {
        doesEmailMatch() {
            const warning = "The email addresses don't match."
            if ((this.newEmail !== this.newEmailConfirmation) && (this.newEmailConfirmation !== '' || this.isSubmitButtonClicked)) {
                return warning
            }
        },
    },
    methods: {
        submitButtonClicked() {
            this.isSubmitButtonClicked = true
        }
    },
}
</script>

<style module src="./EmailSettings.css" />