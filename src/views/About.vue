<script setup>
import HeaderInside from '../components/Layout/HeaderInside.vue';

const routesHeaderInside = [
  {
    path: "/product",
    icon: "ri-list-unordered"
  },
  {
    path: "/product/add-products",
    icon: "ri-add-line"
  }
]
</script>

<template>
  <div class="page">
    <HeaderInside icon="ri-information-line" :routes="routesHeaderInside"/>
    <h1>Sobre</h1>
  </div>
</template>
