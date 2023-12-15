<script setup>
import { onMounted, ref } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import List from "./components/List.vue";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";

const users = ref([])

Emitter.on("search", async (value) => {
  if (value === '')  {
    users.value = await getUsers();
    return
  }

  users.value = await searchByLikeName(value)
});

Emitter.on("refresh", async () => {
  await refreshGetUsers();
})

const getUsers = async () => {
  try {
    const response = await api.get(`/users`);

    const result = response.data;

    if(result.error) {
      showNotification(result.error, "error");
      return 
    }
    return result
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.error(data);

      console.log("****** data: ", error.response.data.error);
      showNotification(error.response.data.error, "error");
    }
  }
}

const searchByLikeName = async (value) => {
  if(!value) return
  
  try {
    const response = await api.get(`/users/search/${value}`);

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

const refreshGetUsers = async () => {
  users.value = await getUsers();
}

onMounted(async () => {
  Emitter.emit("route-name", "Lista de usuários");
  Emitter.emit("enable-search")
  users.value = await getUsers();
});
</script>
<template>
  <div class="page-i">
    <List :users="users"/>
  </div>
</template>
