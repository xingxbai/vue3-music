import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import Home from "../views/Home.vue";
import Recommend from "@/views/recommend";
import Singer from "@/views/singer";
import Search from "@/views/search";
import SingerDetail from '@/views/singer-detail'
import TopList from "@/views/top-list";

const routes = [{
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    name: "recommend",
    component: Recommend
  },
  {
    path: "/singer",
    name: "singer",
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/top-list",
    name: "topList",
    component: TopList
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
