<template>
    <section :class="$style.wrapper">
        <div :class="$style.items">
            <router-link :class="$style.item" :to="{ name: 'todo-list' }">
                Todo List
            </router-link>
            <router-link :class="$style.item" :to="{ name: 'sign-up' }">
                Sign up
            </router-link>
            <router-link :class="$style.item" :to="{ name: 'log-in' }">
                Log in
            </router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'TopBar',
}
</script>

<style module src="./TopBar.css" />