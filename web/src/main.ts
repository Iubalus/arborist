import {createApp} from 'vue'
import {createMemoryHistory, createRouter} from "vue-router";
import './style.css'
import App from './App.vue'
import VueDragscroll from 'vue-dragscroll'

import {
    Playground,
    Home,
    GrandTree,
    Outcomes,
    Questions,
    Snapshots,
    Admin
} from "@/components/pages";

const routes = [
    {path: '/', component: Home, meta: {title: "Home"}},
    {path: '/grand-tree', component: GrandTree, meta: {title: "Grand Tree"}},
    {path: '/outcomes', component: Outcomes, meta: {title: "Outcomes"}},
    {path: '/questions', component: Questions, meta: {title: "Questions"}},
    {path: '/snapshots', component: Snapshots, meta: {title: "Snapshots"}},
    {path: '/playground', component: Playground, meta: {title: "Playground"}},
    {path: "/admin", component: Admin, meta: {title: "Admin"}}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

const app = createApp(App);
app.use(VueDragscroll);
app.use(router);
app.mount('#app')
