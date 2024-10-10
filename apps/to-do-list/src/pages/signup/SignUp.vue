<template>
    <div :class="$style.wrapper">
        <h1 :class="$style.title">Account Settings</h1>
        <div :class="$style.contentWrapper">
            <section :class="$style.sideBar">
            </section>
            <section :class="$style.routedPageWrapper">
                <router-view></router-view>
            </section>
        </div>
             
    </div>

</template>

<script>
export default {
    name: 'Account',
}
</script>

<style module src="./SignUp.css"></style>