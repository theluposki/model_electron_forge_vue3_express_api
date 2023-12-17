<script setup>
import { ref, computed } from "vue"
import { useConversationStore } from "../../stores/conversation.js";

const conversationStore = useConversationStore();

const currentConversation = computed(() => conversationStore.currentConversation);

const isVisibleList = ref(true);

const toggleVisibleList = () => {
  isVisibleList.value = !isVisibleList.value
}
</script>

<template>
  <div class="Conversations">
    <header class="header" data-count="2" @click.stop="toggleVisibleList">
      <div class="wrapper-info-conversation">
        <div class="imageConversation">
          <img :src="currentConversation.image" alt="image conversation">
        </div>
        <div class="name">
          {{ currentConversation.name }}
        </div>
      </div>
      <div class="right-header">
        <i class="ri-subtract-line" v-if="isVisibleList"></i>
        <i class="ri-fullscreen-line" v-else></i>
        <i class="ri-close-line close" @click.stop="conversationStore.setNotVisibleConversation"></i>
      </div>
    </header>
    <main class="main" v-if="isVisibleList">
      <div class="search-contact">
        <input class="input" type="text" placeholder="buscar contato">
        <button class="btn">
          <i class="ri-search-2-line"></i>
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.Conversations {
  position: absolute;
  bottom: 12px;
  right: 196px;

  --minMaxWidth: 240px;
  min-width: var(--minMaxWidth);
  max-width: var(--minMaxWidth);

  border-radius: 12px 12px 6px 0;


  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  background-color: var(--white);
}

.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  font-size: 1.4rem;
  font-weight: bold;


  min-width: var(--minMaxWidth);
  max-width: var(--minMaxWidth);

  border-radius: 12px 12px 6px 0;
  cursor: pointer;

  padding: 4px 8px 4px 8px;
}

.header:hover {
  transition: all ease .4s;
  background-color: var(--white2);
}

.header:active {
  scale: .95;
}

.wrapper-info-conversation {
  display: flex;
  align-items: center;
  gap: 4px;
}

.wrapper-info-conversation > .imageConversation {
  --widthHeightDivImageConversation: 24px;
  --widthHeightImageConversation: 20px;

  width: var(--widthHeightDivImageConversation);
  height: var(--widthHeightDivImageConversation);

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--dark);
  border-radius: 50%;
}

.wrapper-info-conversation > .imageConversation > img {
  width: var(--widthHeightImageConversation);
  height: var(--widthHeightImageConversation);
  object-fit: cover;

  border-radius: 50%;
}

.wrapper-info-conversation > .name {
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 18ch;
  max-height: 20px;
}

.right-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.close {
  width: 22px;
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  border-radius: 4px;
  cursor: pointer;
}

.close:hover {
  transition: all ease .4s;
  box-shadow: inset 0 0 6px var(--dark);
}
.close:active {
  scale: .90;
}

.main {
  --minMaxHeight: 360px;
  --minMaxHeightSearch: 40px;
  --minMaxHeightListContacts: calc(var(--minMaxHeight) - var(--minMaxHeightSearch));
  min-height: var(--minMaxHeight);
  max-height: var(--minMaxHeight);
  border-top: solid 1px var(--silver);
}

.search-contact {
  width: 100%;
  background-color: var(--white2);
  min-height: var(--minMaxHeightSearch);
  max-height: var(--minMaxHeightSearch);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
}
.list_Messages {
  min-height: var(--minMaxHeightListMessages);
  max-height: var(--minMaxHeightListMessages);
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: var(--white2);

  display: flex;
  flex-direction: column;
  gap: 6px;
}

</style>