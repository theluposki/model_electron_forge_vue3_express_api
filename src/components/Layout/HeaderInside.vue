<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { Emitter } from "../../utils/Emitter.js";

const routeName = ref("");

const search = ref(null);

defineProps({
  icon: String,
  routes: Array,
  searchView: Boolean,
  searchPlaceholder: String,
});

Emitter.on("route-name", (name) => {
  routeName.value = name;
});

let timeoutSearch;

const emitSearch = () => {
  clearTimeout(timeoutSearch);

  timeoutSearch = setTimeout(() => {
    if(search.value === "") {
      Emitter.emit("search", "");
      return
    } 
    Emitter.emit("search", search.value);
  }, 200);
};

onMounted(() => {
  search.value = null;
});
</script>

<template>
  <header class="header-i">
    <div class="left">
      <div class="name-router">
        <i :class="icon"></i>
        <span>{{ routeName }}</span>
      </div>
    </div>

    <div class="right">
      <div class="search" v-if="searchView">
        <input
          type="text"
          class="input"
          v-model="search"
          @keypress="emitSearch"
          :placeholder="searchPlaceholder"
        />
      </div>
      <RouterLink
        v-for="item in routes"
        :to="item.path"
        class="router-link"
        exact-active-class="active"
      >
        <i :class="item.icon"></i>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.header-i {
  min-height: 50px;
  max-height: 50px;
  padding: 0 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-i > .left {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-i > .left > .name-router {
  color: var(--dark5);
  font-size: 1.4rem;
  font-weight: 400;

  display: flex;
  align-items: center;
  gap: 8px;
}

.header-i > .left > .name-router > i {
  font-size: 2.2rem;
  color: var(--primary);
}

.header-i > .left > .name-router > span {
  font-weight: bold;
  color: var(--dark4);
}

.header-i > .right {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.header-i > .right > .router-link {
  width: 32px;
  height: 32px;

  background-color: var(--white);
  color: var(--dark);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.header-i > .right > .router-link:hover {
  transition: all ease 0.2s;
  background-color: var(--white2);
}

.header-i > .right > .router-link:active {
  scale: 0.95;
}

.header-i > .right > .router-link.active {
  background-color: var(--dark);
  color: var(--white);
}

.header-i > .right > .router-link.active:hover {
  transition: all ease 0.2s;
  background-color: var(--dark2);
}
</style>