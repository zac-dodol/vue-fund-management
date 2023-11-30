import { createRouter, createWebHistory } from "vue-router";
import FundList from "@/components/FundList.vue";
import FundDetails from "@/components/FundDetails.vue";

const routes = [
  { path: "/", component: FundList },
  { path: "/fund/:id", name: "fundDetails", component: FundDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
