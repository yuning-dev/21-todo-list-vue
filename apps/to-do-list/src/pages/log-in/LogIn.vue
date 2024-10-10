<template>
    <div :class="$style.wrapper">
        <div :class="$style.contentWrapper">
            <div :class="$style.title">Log in to Simple Schedule</div>
            <div :class="$style.inputsWrapper">
                <input type="text" placeholder="Email address" v-model="email"/>
                <input type="text" placeholder="Password" v-model="password"/>
                <button :class="$style.logInBtn">Log in</button>
            </div>
            <div :class="$style.disclaimer">
                Don't have an account?
                <router-link :class="$style.signUpLink" :to="{ name: 'sign-up' }">Sign up</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import login from '../../components/auth.scripts'

export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        // async submit() {
        //     this.loading = true
        //     const response = await login(this.item)
        //     if (response.data.accessToken) {

        //     }
        // }
    }
}
</script>

<style module src="./LogIn.css"></style>