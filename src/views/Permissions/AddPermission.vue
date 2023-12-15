<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Emitter } from "../../utils/Emitter.js";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";

const { push } = useRouter();

const keepAlivePermission = "keepAlivePermission";

const permission = ref(null);

const authorizationsList = ref([]);

const authorization = ref([]);

const bgColor = ref("#ede9e9");
const colorFont = ref("#212121");

const description = ref("");

const getAuthorizations = async () => {
  try {
    const response = await api.get(`/authorizations`);

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

onMounted(async () => {
  Emitter.emit("route-name", "Adicionar nova permição");
  Emitter.emit("disable-search");

  authorizationsList.value = await getAuthorizations();

  if (localStorage.getItem(keepAlivePermission)) {
    const permissionLocal = JSON.parse(
      localStorage.getItem(keepAlivePermission)
    );

    permission.value = permissionLocal.permission;
    bgColor.value = permissionLocal.bgColor;
    colorFont.value = permissionLocal.colorFont;
    description.value = permissionLocal.description
  }
});

let saveLocalTimeout;

const keepAlive = () => {
  clearTimeout(saveLocalTimeout);
  saveLocalTimeout = setTimeout(() => {
    localStorage.setItem(
      "keepAlivePermission",
      JSON.stringify({
        permission: permission.value,
        bgColor: bgColor.value,
        colorFont: colorFont.value,
        authorization: authorization.value,
        description: description.value
      })
    );
  }, 2000);
};

const clear = () => {
  permission.value = null;
  bgColor.value = "#ede9e9";
  colorFont.value = "#212121";
  authorization.value = ""
  description.value = ""
  localStorage.removeItem(keepAlivePermission);
};

const registerPermission = async () => {
  if (!permission.value) return;

  try {
    const response = await api.post(`/permissions`, {
      permission: permission.value,
      bgColor: bgColor.value,
      colorFont: colorFont.value,
      description: description.value,
      authorizations: authorization.value,
    });

    const { message } = response.data;

    showNotification(message, "success");
    clear();
    push("/permissions");
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
        @keypress="keepAlive"
        id="permission"
        class="input"
        v-model="permission"
        placeholder="digite a Permição"
      />
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="bgColor"><sup>*</sup>Cor de fundo:</label>
        <input
          type="color"
          tabindex="2"
          @keypress="keepAlive"
          id="bgColor"
          class="input"
          v-model="bgColor"
        />
      </div>

      <div class="form-control">
        <label for="colorFont"><sup>*</sup>Cor da fonte:</label>
        <input
          type="color"
          tabindex="3"
          @keypress="keepAlive"
          id="colorFont"
          class="input"
          v-model="colorFont"
        />
      </div>
    </div>

    <p class="text-info">
      Neste local, é possível selecionar quais módulos terão permissão de
      acesso.
    </p>

    <ul class="list">
      <li
        :class="
          authorization.includes(item) ? 'item-list checked' : 'item-list'
        "
        v-for="(item, index) in authorizationsList"
        :key="index"
      >
        <label :for="item">{{ item }}</label>
        <input
          type="checkbox"
          :id="item"
          class="input"
          v-model="authorization"
          :value="item"
        />
      </li>
    </ul>

    {{ authorization }}

    <div class="form-control">
      <label for="description"><sup>*</sup>Descrição:</label>
      <textarea
        name="description"
        v-model="description"
        id="description"
        placeholder="Descreva o a permição"
        tabindex="2"
        @keypress="keepAlive"
      ></textarea>
    </div>

    <div class="form-group space-between mt-40 mb-40 mh-4 ph-12">
      <button class="btn btn-large muted" @click="clear">Limpar</button>
      <button
        class="btn btn-large primary"
        tabindex="2"
        @click="registerPermission"
      >
        Adicionar
      </button>
    </div>
  </div>
</template>

<style scoped>
.list {
  margin: 10px 4px 0 4px;
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
