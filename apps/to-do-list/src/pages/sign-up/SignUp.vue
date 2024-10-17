<template>
    <div :class="$style.wrapper">
        <div :class="$style.contentWrapper">
            <div :class="$style.title">Sign up to Simple Appoinment</div>
                <Form :validation-schema="schema" :class="$style.inputsWrapper">
                    <div :class="$style.formGroup">
                        <Field name="email" type="text" placeholder="Email address" :class="$style.inputField"/>
                        <ErrorMessage name="email" :class="$style.errorFeedback" />
                    </div>
                    <div :class="$style.formGroup">
                        <Field name="password" type="password" placeholder="Password" :class="$style.inputField" v-model="inputPassword" />
                        <ErrorMessage name="password" :class="$style.errorFeedback" />
                    </div>
                    <div :class="$style.formGroup">
                        <Field name="repeatPassword" type="password" placeholder="Repeat password" v-model="repeatPassword"/>
                        <ErrorMessage name="repeatPassword" :class="$style.errorFeedback" />
                    </div>
                    <!-- <div :class="$style.errorFeedback" v-if="doPasswordsMatch">Please make sure the passwords match!</div> -->
                    <button :class="$style.signUpBtn">Sign up</button>
                </Form>
            <div :class="$style.disclaimer">
                Already have an account?
                <router-link :class="$style.logInLink" :to="{ name: 'log-in' }" @click="doPasswordsMatch">Log in</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
    name: 'SignUp',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const schema = yup.object().shape({
            email: yup.string().email().required('Email is required!'),
            password: yup.string().required('Password is required!'),
            repeatPassword: yup.string().required('Please repeat your password!')
        })
        return {
            inputPassword: '',
            repeatPassword: '',
            schema
        }
    },
    methods: {
        doPasswordsMatch() {
            // add this inside the function that triggers when the sign-up button is clicked
            if (this.inputPassword !== this.repeatPassword) {
                return false
            } 
            return true
        }
    }
}

</script>

<style module src="./SignUp.css"></style>