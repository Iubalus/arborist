import {createApp} from 'vue'
import {createMemoryHistory, createRouter} from "vue-router";
import './style.css'
import App from './App.vue'
import VueDragscroll from 'vue-dragscroll'

import {Playground, Home, GrandTree, Outcomes, Questions, Snapshots, OpportunitySolutionTree} from "@/components/pages";

const routes = [
    {path: '/', component: Home},
    {path: '/grand-tree', component: GrandTree},
    {path: '/outcomes', component: Outcomes},
    {path: '/questions', component: Questions},
    {path: '/opportunity-solution-tree', component: OpportunitySolutionTree},
    {path: '/snapshots', component: Snapshots},
    {path: '/playground', component: Playground},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

const app = createApp(App);
app.use(VueDragscroll);
app.use(router);
app.mount('#app')
