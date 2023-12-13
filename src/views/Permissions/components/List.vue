<script setup>
import { useRouter } from "vue-router";

const { push } = useRouter();

defineProps({
  permissions: Array
})

const setLink = (id) => push(`/permissions/view-permission/${id}`)

</script>

<template>
  <ul class="list">
    <li class="item-list" v-for="item in permissions" :key="item.id" @click="setLink(item.id)">
      <div class="left">
        <div class="authorization" :style="`background-color: ${item.bgColor}; color: ${item.bgColorFront}; `">{{ item.permission }}</div>  
      </div>

      <div class="right">
        <div>right</div>
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

.item-list > .right {
  display: flex;
  align-items: center;
  gap: 6px;
}

</style>
