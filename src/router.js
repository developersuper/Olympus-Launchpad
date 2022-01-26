import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "./views/Dashboard/Dashboard.vue";
import Explore from "./views/Explore/Explore.vue";
import createLaunch from "./views/createLaunch/createLaunch.vue";
import launchForm from "./views/createLaunch/launchForm.vue";
import myLaunches from "./views/myLaunches/myLaunches.vue";
import launchCard from "./views/launchCard/launchCard.vue";
import partners from "./views/partners/partners.vue";
import partnersLaunches from "./views/partners/partnersLaunches.vue";

const routes = [
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/launchcard/:id",
    name: "launchCard",
    component: launchCard,
    props: true,
  },
  {
    path: "/create",
    name: "Create",
    component: createLaunch,
  },
  {
    path: "/create/:id",
    name: "createForm",
    component: launchForm,
  },
  {
    path: "/mylaunches",
    name: "myLaunches",
    component: myLaunches,
  },
  {
    path: "/partners",
    name: "partners",
    component: partners,
  },
  {
    path: "/partners/:id",
    name: "partnersLaunches",
    component: partnersLaunches,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
