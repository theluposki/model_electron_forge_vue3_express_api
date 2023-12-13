<script setup>
import { onMounted, ref } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";
import { useRoute } from "vue-router";

const { params } = useRoute();

const permissionId = ref("");

const permission = ref(null);

const authorizationsList = ref([
      'usuários',
      'permições',
      'produtos'
])

const authorization = ref([]);

const bgColor = ref("#ede9e9");
const bgColorFront = ref("#212121");

const getPermission = async () => {
  if (!permissionId.value) return;

  try {
    const response = await api.get(`/permissions/${permissionId.value}`);

    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.log(data);
      showNotification(error.response.data.error, "error");
    }
  }
};

onMounted(async () => {
  Emitter.emit("route-name", "Editar permição");
  Emitter.emit("disable-search");
  permissionId.value = params.id;

  const permissionLocal = await getPermission();

  permission.value = permissionLocal.permission;
  bgColor.value = permissionLocal.bgColor;
  bgColorFront.value = permissionLocal.bgColorFront;
});

const clear = () => {
  permission.value = null;
  bgColor.value = "#ede9e9";
  bgColorFront.value = "#212121";
};

const updatePermission = async () => {
  if (!permission.value) return;
  console.log(permission.value);

  try {
    const response = await api.put(`/permissions/${permissionId.value}`, {
      permission: permission.value,
      bgColor: bgColor.value,
      bgColorFront: bgColorFront.value,
    });

    const { message } = response.data;

    showNotification(message, "success");
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.log(data);
      showNotification(error.response.data.error, "error");
    }
  }
};
</script>

<template>
  <div class="page-i">
    <div class="form-control">
      <label for="permission"><sup>*</sup>Permição:</label>
      <input
        type="text"
        tabindex="1"
        id="permission"
        class="input"
        v-model="permission"
        placeholder="digite a permição"
      />
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="bgColor"><sup>*</sup>Cor de fundo:</label>
        <input
          type="color"
          tabindex="2"
          id="bgColor"
          class="input"
          v-model="bgColor"
        />
      </div>

      <div class="form-control">
        <label for="bgColorFront"><sup>*</sup>Cor da fonte:</label>
        <input
          type="color"
          tabindex="3"
          id="bgColorFront"
          class="input"
          v-model="bgColorFront"
        />
      </div>
    </div>

    <ul class="list">
      <li :class="authorization.includes(item) ? 'item-list checked' : 'item-list' " v-for="(item, index) in authorizationsList" :key="index" >
        <label :for="item">{{ item  }}</label>
          <input
            type="checkbox"

            :id="item"
            class="input"
            v-model="authorization"
            :value="item"
          />
      </li>
    </ul>

    {{  authorization }}

    <div class="form-group space-between mt-40 mb-40 mh-4 ph-12">
      <button class="btn btn-large muted" @click="clear">Limpar</button>
      <button
        class="btn btn-large green"
        tabindex="4"
        @click="updatePermission"
      >
        Atualizar
      </button>
    </div>
  </div>
</template>

<style scoped>
.list {
  margin: 20px 4px 0 4px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
}

.item-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 4px;
  background-color: var(--white3);
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.item-list > label {
  flex: 1;
  cursor: pointer;
}

.checked {
  background-color: var(--white);
}

.checked > label {
  font-weight: bold;
  text-transform: capitalize;
  color: var(--dark2);
  font-size: 1.4rem;
}
</style>
