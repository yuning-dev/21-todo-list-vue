<template>
    <div :class="$style.wrapper">
        <div>Wash dishes</div>
        <div>
            <button>Completed</button>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TodoItem',
    props: {

    },
}
</script>

<style module src="./TodoItem.css" />