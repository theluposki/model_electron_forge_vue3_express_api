<script setup>
import { onMounted } from "vue";
import { Emitter } from "../../utils/Emitter.js"

onMounted(() => {
  Emitter.emit("route-name", "Lista de Produtos");
})
</script>

<template>
  <div class="page-i">
    Lista de produtos
  </div>
</template>