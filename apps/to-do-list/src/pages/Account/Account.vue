<template>
    <div :class="$style.wrapper">
        <h1 :class="$style.title">Account Settings</h1>
        <div :class="$style.contentWrapper">
            <section :class="$style.sideBar">
                <router-link :class="$style.item" :to="{ name: 'email-settings' }">
                    Update your email
                </router-link>
                <router-link :class="$style.item" :to="{ name: 'security-settings' }">
                    Update your password
                </router-link>
                <router-link :class="$style.item" :to="{ name: 'insight-settings' }">
                    Customise Insights
                </router-link>
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

<style module src="./Account.css"></style>