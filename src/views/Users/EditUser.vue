<script setup>
import { onMounted, ref, toRaw } from "vue";
import { Emitter } from "../../utils/Emitter.js";
import { generatePassword } from "../../utils/generatePassword.js";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";
import { useRoute } from "vue-router";
import { formatDateYMD } from "../../utils/date.js";

const { params } = useRoute();

const userId = ref("");
const showIcon = ref(true);
const lock = ref(true);

const keepAliveAddUser = "keepAliveAddUser";

const permissions = ref([]);

const newUser = ref({
  name: null,
  email: null,
  birthDate: null,
  permission: "",
  password: null,
  uploadedImage: null,
});

const getUser = async () => {
  if (!userId.value) return;

  try {
    const response = await api.get(`/users/${userId.value}`);

    const result = response.data;

    return {
      name: result.name,
      email: result.email,
      birthDate: formatDateYMD(result.birthDate),
      permission: result.permission,
      password: null,
      uploadedImage: result.image,
    };
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.log(data);
      showNotification(error.response.data.error, "error");
    }
  }
};

const viewLock = () => {
  const passEl = document.getElementById("password");

  if (passEl.type === "password") {
    passEl.type = "text";
    lock.value = false;
    return;
  }
  passEl.type = "password";
  lock.value = true;
};

const generatePassLocal = () => {
  const passEl = document.getElementById("password");
  lock.value = false;
  passEl.type = "text";
  newUser.value.password = generatePassword();
};

const getAllPermissions = async () => {
  try {
    const response = await api.get(`/permissions`);

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
      showNotification(error.response.data.error, "error");
    }
  }
}


const findPermissionId = (permissionsArray, userObject) => {
  const filteredPermissions = permissionsArray.filter(permission => permission.permission === userObject.permission);
  const plainPermissions = filteredPermissions.map(filteredPermission => toRaw(filteredPermission));
  return plainPermissions[0].id;
};

onMounted(async () => {
  Emitter.emit("route-name", "Editar usuário");
  Emitter.emit("disable-search"); 
  userId.value = params.id;

  permissions.value = await getAllPermissions();
  newUser.value = await getUser();

  newUser.value.permission = findPermissionId(permissions.value, newUser.value);

  document.querySelector(
    ".panel-img"
  ).style.backgroundImage = `url('${newUser.value.uploadedImage}')`;
  showIcon.value = false;
});

let saveLocalTimeout;

const keepAlive = () => {
  clearTimeout(saveLocalTimeout);
  saveLocalTimeout = setTimeout(() => {
    localStorage.setItem("keepAliveAddUser", JSON.stringify(newUser.value));
  }, 2000);
};

const clear = () => {
  newUser.value = {
    name: null,
    email: null,
    birthDate: null,
    permission: "",
    password: null,
    uploadedImage: null,
  };

  localStorage.removeItem(keepAliveAddUser);

  if (newUser.value.uploadedImage === null) {
    document.querySelector(".panel-img").style.backgroundImage = "none";
    showIcon.value = true;
  }
};

const imageUpload = (event) => {
  const input = event.target;
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const img = new Image();
    img.src = reader.result;

    const updateUI = (imageType, imageBase64, uiClass) => {
      newUser.value.uploadedImage = `data:${imageType};base64,${imageBase64}`;

      document.querySelector(
        uiClass
      ).style.backgroundImage = `url(${newUser.value.uploadedImage})`;

      showIcon.value = false;
      keepAlive();
    };

    img.onload = function () {
      const imageType = file.type;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxWidth = 800;
      const maxHeight = 600;
      let newWidth = img.width;
      let newHeight = img.height;

      if (img.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (img.height * maxWidth) / img.width;
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (img.width * maxHeight) / img.height;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const imageBase64 = canvas.toDataURL(imageType).split(",")[1];

      updateUI(imageType, imageBase64, ".panel-img");
    };
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const updateUser = async () => {
  if (
    !newUser.value.name ||
    !newUser.value.email ||
    !newUser.value.uploadedImage ||
    !newUser.value.birthDate ||
    // !newUser.value.password ||
    !newUser.value.permission
  )
    return;

  try {
    const response = await api.put(`/users/${userId.value}`, {
      name: newUser.value.name,
      email: newUser.value.email,
      image: newUser.value.uploadedImage,
      password: newUser.value.password,
      birthDate: newUser.value.birthDate,
      permission: newUser.value.permission,
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
    <div class="form-group">
      <div class="form-control">
        <label for="imageUpload" class="panel-img">
          <i
            class="ri-image-line"
            :style="{ display: showIcon ? 'block' : 'none' }"
          ></i>
          <input
            type="file"
            @change="imageUpload"
            name="upload"
            id="imageUpload"
            accept="image/*"
            hidden
          />
        </label>
      </div>
    </div>

    <div class="form-control">
      <label for="nome"><sup>*</sup>Nome:</label>
      <input
        type="text"
        tabindex="1"
        @keypress="keepAlive"
        id="nome"
        class="input"
        v-model="newUser.name"
        placeholder="digite o nome"
      />
    </div>

    <div class="form-control">
      <label for="email"><sup>*</sup>E-mail:</label>
      <input
        type="text"
        tabindex="2"
        @keypress="keepAlive"
        id="email"
        class="input"
        v-model="newUser.email"
        placeholder="digite o e-mail"
      />
    </div>

    <div class="form-control">
      <label for="birthDate"><sup>*</sup>Data de nascimento:</label>
      <input
        type="date"
        tabindex="3"
        @keypress="keepAlive"
        id="birthDate"
        class="input"
        v-model="newUser.birthDate"
      />
    </div>

    <div class="form-control">
      <label for="password"><sup>*</sup>Senha:</label>
      <div class="form-group">
        <input
          type="password"
          tabindex="4"
          @keypress="keepAlive"
          id="password"
          class="input"
          placeholder="digite a senha"
          v-model="newUser.password"
        />
        <button class="btn" @click="viewLock">
          <i class="ri-lock-password-line" v-if="lock"></i>
          <i class="ri-lock-unlock-line" v-else></i>
        </button>
        <button class="btn btn-large" @click="generatePassLocal">
          <i class="ri-key-line"></i> Gerar senha
        </button>
      </div>
    </div>

    <div class="form-control">
      <label for="permission"
        ><sup>*</sup>Autorização: {{ newUser.permission }}</label
      >
      <select
        class="select"
        name="permission"
        v-model="newUser.permission"
        id="permission"
        tabindex="5"
        @change="keepAlive"
      >
        <option value="" disabled>Selecione a autorização</option>
        <option v-for="item in permissions" :key="item.id" :value="item.id">
          {{ item.permission }}
        </option>
      </select>
    </div>

    <div class="form-group space-between mt-40 mb-40 mh-4">
      <button class="btn btn-large muted" @click="clear">Limpar</button>
      <button class="btn btn-large green" tabindex="6" @click="updateUser">
        Atualizar
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
