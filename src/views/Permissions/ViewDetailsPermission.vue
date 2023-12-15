<script setup>
import { onMounted, ref } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";
import { useRoute, useRouter } from "vue-router";
import { formatDateOnly } from "../../utils/date.js";

const { params } = useRoute();
const { back, push } = useRouter();

const permissionId = ref("");
const permission = ref([]);

const getPermission = async () => {
  if (!permissionId.value) return;

  try {
    const response = await api.get(`/permissions/${permissionId.value}`);

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

const editpermission = () => {
  if (!permissionId.value) return;

  push(`/permissions/edit-permission/${permissionId.value}`)
}

const deletepermission = async () => {
  if (!permissionId.value) return;

  try {
    const response = await api.delete(`/permissions/${permissionId.value}`);

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
  Emitter.emit("route-name", "Detalhe da permição");
  Emitter.emit("disable-search");
  Emitter.emit("enable-viewDetails");

  permissionId.value = params.id;

  permission.value = await getPermission();
});
</script>
<template>
  <div class="page-i page-details">
    <div class="top" v-if="permission.permission">
      <div class="details">
        <span><b>Permição: </b>{{ permission?.permission }}</span>
        <span class="title-details"><b>Cor de fundo: </b><span class="ball" :style="`background-color: ${permission?.bgColor};`"></span> </span>
        <span class="title-details"><b>Cor da fonte: </b> <span class="ball" :style="`background-color: ${permission?.bgColorFront};`"></span></span>
        <span><b>Autorizações: </b> <span class="authorization" :style="`background-color: ${permission.bgColor}; color: ${permission.colorFont}; `" v-for="authorization in JSON.parse(permission?.authorizations)">{{ authorization }}</span></span>
        <span><b>Criado em: </b>{{ formatDateOnly(permission?.created_at) }}</span>
        <span><b>Modificado em: </b>{{ formatDateOnly(permission?.update_at) }}</span>
        <span><b>Descrição: </b>{{ permission?.description }}</span>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-large mt-20 yellow" @click="editpermission">
        <i class="ri-edit-2-line"></i>
        Editar permição
      </button>
      <button class="btn btn-large mt-20 red" @click="deletepermission">
        <i class="ri-delete-bin-5-line"></i>
        Excluir permição
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

.details > span {
  display: flex;
  gap: 4px;
}

.title-details {
  display: flex;
  align-items: center;
  gap: 6px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.ball {
  display: flex;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
  border-radius: 50%;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, inset 1px 1px 2px rgba(0, 0, 0, 0.16);
}
</style>
