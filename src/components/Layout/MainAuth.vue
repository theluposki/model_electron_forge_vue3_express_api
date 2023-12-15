<script setup>
import { ref } from "vue";
import { showNotification } from "../Layout/NotificationService.js";
import { api } from "../../axios.js";
import { useUserStore } from "../../stores/user.js";

const userStore = useUserStore();

const email = ref("janedoe@mail.com");
const password = ref("MyPassw0rd#2023");

const lock = ref(true);

const lockPassword = () => {
  const passwordEl = document.getElementById("password");

  if (passwordEl.type === "password") {
    passwordEl.type = "text";
    lock.value = false;
    return;
  }
  passwordEl.type = "password";
  lock.value = true;
};

const login = async () => {
  if (!email.value || !password.value) return;

  try {
    const response = await api.post(`/auth`, {
      email: email.value,
      password: password.value,
    });

    const { message } = response.data;
    showNotification(message, "success");

    const myuser = await api.get(`/users/my`);

    userStore.setUser(myuser.data);
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
  <main class="Auth">
    <div class="panelLogin">
      <div class="form-control">
        <label for="email"><sup>*</sup>E-mail:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="input"
          placeholder="digite o seu e-mail"
          tabindex="1"
        />
      </div>
      <div class="form-control">
        <label for="password"><sup>*</sup>Senha:</label>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            class="input"
            placeholder="digite o sua senha"
            tabindex="2"
          />
          <button class="btn" @click="lockPassword">
            <i class="ri-lock-password-line" v-if="lock"></i>
            <i class="ri-lock-unlock-line" v-if="!lock"></i>
          </button>
        </div>
      </div>

      <div class="form-control mt-40">
        <button class="btn btn-large mv-right" @click="login">
          Acessar
          <i class="ri-rocket-2-line"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dataerror {
  position: absolute;
  top: 20px;
  font-size: 10px;
}
.Auth {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;

  min-width: 800px;
  max-width: 800px;
  min-height: 600px;
  max-height: 600px;
  overflow: hidden;
}

.panelLogin {
  background-color: var(--white);
  min-width: 400px;
  max-width: 400px;
  min-height: 300px;
  max-height: 300px;

  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  border-radius: 8px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
