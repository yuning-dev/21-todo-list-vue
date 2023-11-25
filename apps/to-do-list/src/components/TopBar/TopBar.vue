<template>
    <section :class="$style.wrapper">
        <div :class="$style.items">
            <router-link :class="$style.item" :to="{ name: 'todo-list' }">
                Todo List
            </router-link>
            <router-link :class="$style.item" :to="{ name: 'account' }">
                Account Settings
            </router-link>
            <router-link :class="$style.item" :to="{ name: 'insights' }">
                Insights
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