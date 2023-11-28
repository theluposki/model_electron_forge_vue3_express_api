<script setup>
import { RouterView } from "vue-router";
</script>
<template>
  <main class="main-products">
    <RouterView />
  </main>
</template>

<style scoped>
.main-products {
  flex: 1;
  background-color: antiquewhite;
}
</style>