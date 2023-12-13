<script setup>
import { onMounted, ref } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";

const keepAlivePermission = "keepAlivePermission";

const permission = ref(null);
const bgColor = ref("#ede9e9");
const bgColorFront = ref("#212121");

onMounted(async () => {
  Emitter.emit("route-name", "Adicionar nova permição");
  Emitter.emit("disable-search");

  if (localStorage.getItem(keepAlivePermission)) {
    const permissionLocal = JSON.parse(localStorage.getItem(keepAlivePermission));
    
    permission.value = permissionLocal.permission
    bgColor.value = permissionLocal.bgColor
    bgColorFront.value = permissionLocal.bgColorFront
  }
});

let saveLocalTimeout;

const keepAlive = () => {
  clearTimeout(saveLocalTimeout);
  saveLocalTimeout = setTimeout(() => {
    localStorage.setItem("keepAlivePermission", JSON.stringify({ 
      permission: permission.value,
      bgColor: bgColor.value,
      bgColorFront: bgColorFront.value
    }));
  }, 2000);
};

const clear = () => {
  permission.value = null
  bgColor.value = "#ede9e9"
  bgColorFront.value = "#212121"
  localStorage.removeItem(keepAlivePermission);
};

const registerPermission = async () => {
  if (!permission.value) return;

  try {
    const response = await api.post(`/permissions`, {
      permission: permission.value,
      bgColor: bgColor.value,
      bgColorFront: bgColorFront.value
    });

    console.log("response.data", response.data)
    const { message } = response.data;

    showNotification(message, "success");
    clear();
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
        <label for="bgColorFront"><sup>*</sup>Cor da fonte:</label>
        <input
          type="color"
          tabindex="3"
          @keypress="keepAlive"
          id="bgColorFront"
          class="input"
          v-model="bgColorFront"
        />
      </div>

    </div>

    {{  bgColorFront }} - {{   bgColor }}

    <div class="form-group space-between mt-40 mb-40 mh-4 ph-12">
      <button class="btn btn-large muted" @click="clear">Limpar</button>
      <button class="btn btn-large primary" tabindex="2" @click="registerPermission">
        Adicionar
      </button>
    </div>
  </div>
</template>

<style scoped>
.panel-img {
  flex: 1;
  min-width: 150px;
  max-width: 150px;
  max-height: 150px;
  min-height: 150px;

  border-radius: 6px;
  background-color: var(--white2);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-size: cover;
  background-position: center;

  cursor: pointer;
}

.panel-img:hover {
  transition: background-color ease 0.4s;
  background-color: var(--white3);
}

.panel-img:active {
  scale: 0.97;
}

.panel-img > i {
  font-size: 5rem;
  color: var(--silver);
}
</style>
