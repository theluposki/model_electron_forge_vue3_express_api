<script setup>
import { onMounted, ref } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";
import { useRoute, useRouter } from "vue-router";
import { formatBirthDate, formatDateOnly } from "../../utils/date.js";

const { params } = useRoute();
const { back, push } = useRouter();

const userId = ref("");
const user = ref([]);

const getUser = async () => {
  if (!userId.value) return;

  try {
    const response = await api.get(`/users/${userId.value}`);

    const result = response.data;
    return result;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.log(data);
      showNotification(error.response.data.error, "error");
    }
  }
};

const editUser = () => {
  if (!userId.value) return;

  push(`/users/edit-user/${userId.value}`)
}

const deleteUser = async () => {
  if (!userId.value) return;

  try {
    const response = await api.delete(`/users/${userId.value}`);

    const { message } = response.data;
    showNotification(message, "success");
    back();
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.log(data);
      showNotification(error.response.data.error, "error");
    }
  }
};

onMounted(async () => {
  Emitter.emit("route-name", "Detalhe do usuário");
  Emitter.emit("disable-search");
  Emitter.emit("enable-viewDetails");

  userId.value = params.id;

  user.value = await getUser();
});
</script>
<template>
  <div class="page-i page-details">
    <div class="top" v-if="user.name">
      <div class="image">
        <img :src="user.image" alt="imagem do usuário" />
      </div>
      <div class="details">
        <span><b>Nome: </b>{{ user?.name }}</span>
        <span><b>E-mail: </b>{{ user?.email }}</span>
        <span><b>Idade: </b>{{ formatBirthDate(user?.birthDate) }}</span>
        <span><b>Autorização: </b>{{ user?.permission }}</span>
        <span><b>Criado em: </b>{{ formatDateOnly(user?.created_at) }}</span>
        <span><b>Modificado em: </b>{{ formatDateOnly(user?.update_at) }}</span>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-large mt-20 yellow" @click="editUser">
        <i class="ri-edit-2-line"></i>
        Editar Usuário
      </button>
      <button class="btn btn-large mt-20 red" @click="deleteUser">
        <i class="ri-delete-bin-5-line"></i>
        Excluir Usuário
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-details {
  padding: 12px;
}
.top {
  display: flex;
  gap: 12px;

  font-size: 1.4rem;
}

.image {
  min-width: 150px;
  max-width: 150px;
  min-height: 150px;
  max-height: 150px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark);
}

.image img {
  min-width: 144px;
  max-width: 144px;
  min-height: 144px;
  max-height: 144px;
  border-radius: 6px;

  object-fit: cover;
  object-position: center center;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}
</style>
