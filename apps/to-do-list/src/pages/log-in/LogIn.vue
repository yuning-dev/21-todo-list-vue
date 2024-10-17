<template>
    <div :class="$style.wrapper">
        <div :class="$style.contentWrapper">
            <div :class="$style.title">Log in to Simple Appoinments</div>
            <Form :validation-schema="schema" :class="$style.inputsWrapper">
                <div :class="$style.formGroup">
                    <Field name="email" type="text" placeholder="Email address" :class="$style.inputField" />
                    <ErrorMessage name="email" :class="$style.errorFeedback" />
                </div>
                <div :class="$style.formGroup">
                    <Field name="password" type="text" placeholder="Password" :class="$style.inputField" />
                    <ErrorMessage name="password" :class="$style.errorFeedback" />
                </div>
                <button :class="$style.logInBtn">Log in</button>
            </Form>
            <div :class="$style.disclaimer">
                Don't have an account?
                <router-link :class="$style.signUpLink" :to="{ name: 'sign-up' }">Sign up</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
    name: 'LogIn',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const schema = yup.object().shape({
            email: yup.string().email().required('Email is required!'),
            password: yup.string().required('Password is required!')
        })
        return {
            loading: false,
            message: '',
            schema
        }
    },
    methods: {

    }
}
</script>

<style module src="./LogIn.css"></style>