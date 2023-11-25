<script setup>
import TopBar from '@/components/TopBar/TopBar.vue'
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
