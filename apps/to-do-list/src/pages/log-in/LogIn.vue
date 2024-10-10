<template>
    <div :class="$style.wrapper">
        <div :class="$style.contentWrapper">
            <div :class="$style.title">Log in to Simple Schedule</div>
            <div :class="$style.inputsWrapper">
                <input type="text" placeholder="Email address" />
                <input type="text" placeholder="Password"/>
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

</script>

<style module src="./LogIn.css"></style>