<script setup>
import { onMounted, ref } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import List from "./components/List.vue";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";

const users = ref([])

Emitter.on("search", async (value) => {
  console.log('count', value.length);
  if (value === '')  {
    users.value = await getUsers();
    return
  }

  users.value = await searchByLikeName(value)
});

const getUsers = async () => {
  try {
    const response = await api.get(`/users`);

    const result = response.data;
    return result
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      showNotification(
        "Erro de conexão: O servidor recusou a conexão.",
        "error"
      );
      console.log("error: ", error.code);
    }
    if (error.response) {
      const data = error.response.data;
      console.log(data);
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
    if (error.code === "ERR_NETWORK") {
      showNotification(
        "Erro de conexão: O servidor recusou a conexão.",
        "error"
      );
      console.log("error: ", error.code);
    }
    if (error.response) {
      const data = error.response.data;
      console.log(data);
      showNotification(error.response.data.error, "error");
    }
  }
}

onMounted(async () => {
  Emitter.emit("route-name", "Lista de usuários");
  users.value = await getUsers();
});
</script>
<template>
  <div class="page-i">
    <List :users="users"/>
  </div>
</template>
