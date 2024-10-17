<template>
    <div :class="$style.wrapper">
        <div :class="$style.contentWrapper">
            <div :class="$style.title">Sign up to Simple Appoinment</div>
            <div :class="$style.inputsWrapper">
                <input type="text" placeholder="Email address" />
                <input type="text" placeholder="Password"/>
                <input type="text" placeholder="Repeat password"/>
                <button :class="$style.signUpBtn">Sign up</button>
            </div>
            <div :class="$style.disclaimer">
                Already have an account?
                <router-link :class="$style.logInLink" :to="{ name: 'log-in' }">Log in</router-link>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style module src="./SignUp.css"></style>