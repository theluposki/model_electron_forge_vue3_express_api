<script setup>
import HeaderInside from "../../components/Layout/HeaderInside.vue";
import MainInside from "../../components/Layout/MainInside.vue";

const routesHeaderInside = new Set([
  {
    path: "/users",
    icon: "ri-list-unordered",
  },
  {
    path: "/users/add-user",
    icon: "ri-user-add-line",
  },
]);
</script>

<template>
  <div class="page">
    <HeaderInside icon="ri-user-line" :routes="[...routesHeaderInside]" searchPlaceholder="pesquisar"/>
    <MainInside />
  </div>
</template>