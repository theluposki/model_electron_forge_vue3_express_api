<script setup>
import { useRouter } from "vue-router";

const { push } = useRouter();

defineProps({
  users: Array
})

const setLink = (id) => push(`/users/view-user/${id}`)

</script>

<template>
  <ul class="list">
    <li class="item-list" v-for="item in users" :key="item.id" @click="setLink(item.id)">
      <div class="left">
        <div class="image">
          <img :src="item.image" alt="imagem do usuário" loading="lazy">
        </div>
        <div>{{ item.name }}</div>  
      </div>

      <div class="right">
        <div class="authorization" :style="`background-color: ${ item.bgColor }; color: ${item.colorFont}; `">{{ item.permission }}</div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px;
}

.item-list {
  min-height: 45px;
  background-color: var(--white);
  border-radius: 4px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 0 12px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
}

.item-list:active {
  scale: .99;
}

.item-list > .left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  width: 38px;
  height: 38px;
  background-color: var(--dark);
}

.image img {
  border-radius: 2px;
  width: 34px;
  height: 34px;
  object-fit: cover;
  object-position: center center;
}

.item-list > .right {
  display: flex;
  align-items: center;
  gap: 6px;
}


</style>
