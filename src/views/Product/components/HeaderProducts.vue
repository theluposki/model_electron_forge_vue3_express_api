<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { Emitter } from "../../../utils/Emitter.js";

const routeName = ref("")

Emitter.on("route-name", (name) => {
  routeName.value = name
})
</script>

<template>
  <header class="header-i">
    <div class="left">
      <span class="name-router">
        <i class="ri-product-hunt-line"></i>
        {{  routeName }}
      </span>
    </div>

    <div class="right">
      <RouterLink to="/product" class="router-link" exact-active-class="active">
        <i class="ri-list-unordered"></i>
      </RouterLink>
      <RouterLink
        to="/product/add-products"
        class="router-link"
        exact-active-class="active"
      >
        <i class="ri-add-line"></i>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped></style>
