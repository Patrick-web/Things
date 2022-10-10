import Vue from "vue";
import VueRouter from "vue-router";
import shopping from "@/views/shopping";
import stickys from "@/views/stickys";
import todo from "@/views/todo";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todo",
    component: todo,
  },
  {
    path: "/shopping",
    name: "shopping",
    component: shopping,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
