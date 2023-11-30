import { createRouter, createWebHistory } from "vue-router";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: "/:pathMatch(.*)*", component: NotFound },
  { path: "/", component: () => import("./views/Home.vue") },
  {
    path: "/product",
    component: () => import("./views/Product/Product.vue"),
    children: [
      {
        path: "",
        component: () => import("./views/Product/ListProducts.vue"),
      },
      {
        path: "add-products",
        component: () => import("./views/Product/AddProduct.vue"),
      },
    ],
  },
  {
    path: "/users",
    component: () => import("./views/Users/Users.vue"),
    children: [
      {
        path: "",
        component: () => import("./views/Users/ListUser.vue"),
      },
      {
        path: "add-user",
        component: () => import("./views/Users/addUser.vue"),
      },
    ],
  },
  { path: "/about", component: () => import("./views/About.vue") },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
