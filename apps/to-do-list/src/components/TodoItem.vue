<template>
    <div :class="$style.wrapper">
        <div>{{ task.newTaskDescription }}</div>
        <div>
            <button>Completed</button>
            <button>Edit</button>
            <button>Delete</button>
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

    },
}
</script>

<style module src="./TodoItem.css" />