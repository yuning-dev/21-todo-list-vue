<template>
    <div :class="$style.wrapper">
        <div>{{ task.description }}</div>
        <div>
            <button>Completed</button>
            <button>Edit</button>
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
    methods: {
        deleteButtonClicked() {
            this.$emit('delete', this.task.id)
        }
    },
}
</script>

<style module src="./TodoItem.css" />