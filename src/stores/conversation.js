import { defineStore } from "pinia";
import { ref } from "vue";

export const useConversationStore = defineStore("conversation", () => {
  const isVisibleConversation = ref(true);
  const currentConversation = ref({
    id: 1,
    name: "Joelma",
    image: "https://i.pravatar.cc/150?img=26"
  });

  const setConversation = (conversation) => {
    currentConversation.value = conversation
  }

  const setVisibleConversation = () => {
    isVisibleConversation.value = true;
  }

  const setNotVisibleConversation = () => {
    isVisibleConversation.value = false;
  }

  return {
    currentConversation,
    setConversation,
    isVisibleConversation,
    setVisibleConversation,
    setNotVisibleConversation
  }
});
