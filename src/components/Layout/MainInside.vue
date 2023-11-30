<script setup>
import { RouterView } from "vue-router";
</script>
<template>
  <main class="mainInside">
    <RouterView />
  </main>
</template>

<style scoped>
.mainInside {
  flex: 1;
  background-color: antiquewhite;
}
</style>