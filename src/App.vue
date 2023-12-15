<script setup>
import MainAuth from "./components/Layout/MainAuth.vue"
import MainM from "./components/Layout/MainM.vue"
import NotificationList from "./components/Layout/NotificationList.vue"

import { notifications } from './components/Layout/NotificationService.js';
import { useUserStore } from "./stores/user.js"
import { computed } from "vue";

const userStore = useUserStore();

const user = computed(() => userStore.user);
</script>

<template>
  <NotificationList :notifications="notifications" />
  <MainAuth v-if="!user.name"/>
  <MainM v-if="user.name"/>
</template>
