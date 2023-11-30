<script setup>
import { onMounted } from "vue";
import { Emitter } from "../../utils/Emitter.js";

onMounted(async () => {
  Emitter.emit("route-name", "Adicionar novo usuário");
});
</script>
<template>
  <div class="page-i">
    <h1>Add User</h1>
  </div>
</template>