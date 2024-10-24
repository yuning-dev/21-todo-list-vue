<script setup>
import TopBar from '@/components/topbar/TopBar.vue'
</script>

<template>
  <header>
    <TopBar />
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
</style>
