import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const setUser = (myuser) => {
    user.value = myuser
  }

  const removeUser = () => {
    user.value = {}
  }

  return {
    user,
    setUser,
    removeUser
  }
});
