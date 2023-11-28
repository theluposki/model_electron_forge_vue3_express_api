<script setup>
import Notification from "./Notification.vue";
defineProps({
  notifications: Array,
});
</script>

<template>
  <ul class="Notification-List">
    <Notification v-for="(item, index) in notifications" :key="index" :index="index" :message="item.message" :status="item.status"/>
  </ul>
</template>

<style scoped>
.Notification-List {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
