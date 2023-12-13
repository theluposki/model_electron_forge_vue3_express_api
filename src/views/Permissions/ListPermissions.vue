<script setup>
import { onMounted, ref } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import List from "./components/List.vue";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";

const permissions = ref([])

Emitter.on("search", async (value) => {
  if (value === '')  {
    permissions.value = await getPermissions();
    return
  }

  permissions.value = await searchByLikeName(value)
});

Emitter.on("refresh", async () => {
  await refreshGetPermissions();
})

const getPermissions = async () => {
  try {
    const response = await api.get(`/permissions`);

    const result = response.data;
    return result
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.error(data);
      showNotification(error.response.data.error, "error");
    }
  }
}

const searchByLikeName = async (value) => {
  if(!value) return
  
  try {
    const response = await api.get(`/permissions/search/${value}`);

    const result = response.data;

    return result
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.error(data);
      showNotification(error.response.data.error, "error");
    }
  }
}

const refreshGetPermissions = async () => {
  permissions.value = await getPermissions();
}

onMounted(async () => {
  Emitter.emit("route-name", "Lista de permições");
  Emitter.emit("enable-search")
  permissions.value = await getPermissions();
});
</script>
<template>
  <div class="page-i">
    <List :permissions="permissions"/>
  </div>
</template>
