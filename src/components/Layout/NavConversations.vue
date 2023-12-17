<script setup>
import { ref } from "vue"
import { useConversationStore } from "../../stores/conversation.js";

const conversationStore = useConversationStore();


const isVisibleList = ref(false);

const toggleVisibleList = () => {
  isVisibleList.value = !isVisibleList.value
}

const conversations = ref([
  {
    id: 1,
    image: "https://i.pravatar.cc/150?img=26",
    name: "Joelma da Caçambinha",
    lastMessage: "sdasdas asdasd asdasd asd  asdasdasdasdad"
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/150?img=38",
    name: "Maria",
    lastMessage: "sdasdas asdasd asdasd asd  asdasdasdasdad"
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/150?img=37",
    name: "Fulano",
    lastMessage: "sdasdas asdasd asdasd asd  asdasdasdasdad"
  }
])

const openConversation = (conversation) => {
  conversationStore.setConversation(conversation);
  conversationStore.setVisibleConversation();
}

</script>

<template>
  <div class="NavConversations">
    <header class="header" data-count="2" @click="toggleVisibleList">
      <span><i class="ri-chat-2-line"></i>&nbsp;Conversas</span>
      <i class="ri-subtract-line" v-if="isVisibleList"></i>
      <i class="ri-fullscreen-line" v-else></i>
    </header>
    <main class="main" v-if="isVisibleList">
      <div class="search-contact">
        <input class="input" type="text" placeholder="buscar contato">
        <button class="btn">
          <i class="ri-search-2-line"></i>
        </button>
      </div>
      <ul class="list_contacts">
        <li class="item-list" v-for="item in conversations" :key="item.id" @click="openConversation(item)">
          <div class="left">
            <div class="image">
              <img :src="item.image" alt="imagem do contato">
            </div>
          </div>
          <div class="right">
            <div class="name-LastMessage">
              <span class="name">{{ item.name }}</span>
              <span class="lastMessage">{{ item.lastMessage }}</span>
            </div>
            <div class="count">2</div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
.NavConversations {
  position: absolute;
  bottom: 12px;
  right: 12px;

  --minMaxWidth: 180px;
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

  padding: 4px 16px;
}

.header:hover {
  transition: all ease .4s;
  background-color: var(--white2);
}

.header:active {
  scale: .95;
}

.header::after {
  --topLeft: -4px;
  content: attr(data-count);
  position: absolute;
  top: var(--topLeft);
  left: var(--topLeft);

  background-color: var(--danger);
  color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: fit-content;
  padding: 4px;
  height: 15px;

  display: flex;
  align-items: center;
  border-radius: 20px;

  font-size: 1.2rem;
  font-weight: normal;
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
.list_contacts {
  min-height: var(--minMaxHeightListContacts);
  max-height: var(--minMaxHeightListContacts);
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: var(--white2);

  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-list {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
  cursor: pointer;
}

.item-list:hover {
  transition: all ease .4s;
  background-color: var(--white2);
}

.item-list:active {
  scale: .90;
}

.item-list > .left {
  display: flex;
  align-items: center;
}

.image {
  --widthHeightDivImage: 40px;
  --widthHeightImage: 36px;
  width: var(--widthHeightDivImage);
  height: var(--widthHeightDivImage);
  background-color: var(--dark);

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.image > img {
  width: var(--widthHeightImage);
  height: var(--widthHeightImage);

  object-fit: cover;

  border-radius: 2px;
}

.right {
  flex: 1;
  display: flex;
}

.name-LastMessage {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name-LastMessage > .name {
  font-size: 1.4rem;
  font-weight: bold;

  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12ch;
  max-height: 20px;
}
.name-LastMessage > .lastMessage {
  font-size: 1.2rem;
  color: var(--dark5);

  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 16ch;
  max-height: 20px;
}

.count {
background-color: var(--danger);
  color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: fit-content;
  padding: 4px;
  height: 15px;

  display: flex;
  align-items: center;
  border-radius: 20px;

  font-size: 1.2rem;
  font-weight: normal;
}
</style>