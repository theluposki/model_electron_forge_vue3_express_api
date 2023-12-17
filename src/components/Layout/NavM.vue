<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../../stores/user.js";
import { showNotification } from "../Layout/NotificationService.js";
import { computed, onMounted, ref } from "vue";
import { checkAuthorization } from "../../utils/checkAuthorization.js";

const userStore = useUserStore();

const user = computed(() => userStore.user);

const logout = () => {
  userStore.removeUser();
  showNotification("Sessão encerrada com sucesso.", "alert")
}

const modules = ref({
  "usuários": false,
  "permissões": false,
  "produtos": false,
})

const fnCheckAuthorization = async (module) => {
  const result = await checkAuthorization(user.value.permission, module) // : Boolean
  modules.value[module] = result;
}

onMounted(async () => {
  for (const module in modules.value) {
        await fnCheckAuthorization(module);
  }
})
</script>

<template>
  <div class="NavM">
    <div class="user-connected">
      <img :src="user.image" alt="image user">
      <div class="user-info">
        <span class="name">{{ user.name }}</span>
        <span class="permission">{{ user.permission }}</span>
      </div>
    </div>

    <nav class="nav">
      <RouterLink to="/" class="nav-link" exact-active-class="active">
        <i class="ri-dashboard-line"></i>
        Dashboard
      </RouterLink>
      <RouterLink v-if="modules['usuários']" to="/users" class="nav-link" active-class="active">
        <i class="ri-user-line"></i>
        Usuários
      </RouterLink>
      <RouterLink v-if="modules['permissões']" to="/permissions" class="nav-link" active-class="active">
        <i class="ri-folder-shield-2-line"></i>
        Permissões
      </RouterLink>
      <RouterLink v-if="modules['produtos']" to="/product" class="nav-link" active-class="active">
        <i class="ri-product-hunt-line"></i>
        Produtos
      </RouterLink>
      <RouterLink to="/about" class="nav-link" exact-active-class="active">
        <i class="ri-information-line"></i>
        About
      </RouterLink>
    </nav>

    <footer class="footer">
      <i class="ri-logout-box-line"></i>
      <span @click="logout">Encerrar sessão</span>
    </footer>
  </div>
</template>

<style scoped>
.NavM {
  background-color: var(--white);

  min-width: 180px;
  max-width: 180px;

  min-height: calc(600px - 24px);
  max-height: calc(600px - 24px);

  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-connected {
  min-height: 60px;
  max-height: 60px;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
}

.user-connected > img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: solid 2px var(--dark);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info > .name {
  font-size: 1.4rem;

  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12ch;
  max-height: 20px;  
}

.user-info > .permission {
  font-size: 1.2rem;
  color: brown;

  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12ch;
  max-height: 20px;
}

.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.nav-link {
  min-height: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;

  font-size: 1.4rem;
}

.nav-link:hover {
  transition: all ease .2s;
  background-color: var(--white2);
}

.nav-link:active {
  scale: 1.03;
}

.nav-link > i {
  font-size: 2rem;
}

.active {
  background-color: var(--dark);
  color: var(--white);
  font-weight: bold;
}

.active:hover {
  transition: all ease .2s;
  background-color: var(--dark2);
}

.footer {
  min-height: 40px;
  max-height: 40px;

  display: flex;
  align-items: center;
  padding: 12px;

  gap: 4px;
}

.footer > span {
  font-size: 1.4rem;
  color: var(--dark5);
  cursor: pointer;  
}

.footer > span:hover {
  transition: all ease .2s;
  color: var(--dark);
}

.footer > span:active {
  scale: .95;
}

.footer > i {
  font-size: 1.6rem;
}
</style>
