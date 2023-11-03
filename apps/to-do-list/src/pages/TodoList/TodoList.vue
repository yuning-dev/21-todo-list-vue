<template>
    <div :class="$style.wrapper">
        <section :class="[$style.header, $style.card]">
            <h1 :class="$style.title">
                Interactive Todo List
            </h1>
            <p :class="$style.intro">
                This TodoList is incredibly addictive. Use with caution,
                and at your own peril. Mwahahahahah!!!!!??!!!!
            </p>
            <div :class="$style.addItemContainer">
                <input type="text" :class="$style.addItemField">
                <button>Add list item</button>
            </div>
        </section>
        <section :class="[$style.activeTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Active tasks
                </h2>
                <button>Delete active tasks</button>
            </div>
            
        </section>
        <section :class="[$style.completedTasksSection, $style.card]">
            <div :class="$style.listHeader">
                <h2>
                    Completed tasks
                </h2>
                <button>Delete completed tasks</button>
            </div>
            
        </section>
    </div>
</template>

<script>
export default {
    name: 'TodoList',
}
</script>

<style module src="./TodoList.css" />