<script setup>
import { RouterView } from "vue-router";
import NavM from "./NavM.vue";
</script>

<template>
  <main class="MainM">
    <NavM />

    <main class="ViewsM">
      <RouterView />
    </main>
  </main>
</template>

<style scoped>
.MainM {
  flex: 1;
  display: flex;
  gap: 12px;
  padding: 12px;

  min-width: 800px;
  max-width: 800px;
  min-height: 600px;
  max-height: 600px;
  overflow: hidden;
}

.ViewsM {
  background-color: var(--white);

  min-width: calc(800px - 192px - 24px);
  max-width: calc(800px - 192px - 24px);

  min-height: calc(600px - 24px);
  max-height: calc(600px - 24px);

  overflow-x: hidden;
  overflow-y: auto;

  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
