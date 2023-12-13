<script setup>
import HeaderInside from "../../components/Layout/HeaderInside.vue";
import MainInside from "../../components/Layout/MainInside.vue";

const routesHeaderInside = new Set([
  {
    path: "/permissions",
    icon: "ri-list-unordered",
  },
  {
    path: "/permissions/add-permission",
    icon: "ri-user-add-line",
  },
]);
</script>

<template>
  <div class="page">
    <HeaderInside icon="ri-folder-shield-2-line" :routes="[...routesHeaderInside]" searchPlaceholder="pesquisar"/>
    <MainInside />
  </div>
</template>