<script setup>
import HeaderInside from "../../components/Layout/HeaderInside.vue";
import MainInside from "../../components/Layout/MainInside.vue";

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
    <HeaderInside icon="ri-product-hunt-line" :routes="routesHeaderInside"/>
    <MainInside />
  </div>
</template>