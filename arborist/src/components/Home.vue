<template>
    <div class="home">
        <SystemMenu
            :tabs="tabs"
            @tab-selected="activateTab"
        />
        <component :is="active"></component>
    </div>
</template>
<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import FlexRow from './bits/FlexRow.vue';
import Page from './bits/Page.vue';
import AssumptionMapping from './pages/AssumptionMapping.vue';
import AssumptionTests from './pages/AssumptionTests.vue';
import OpportunitySizing from './pages/OpportunitySizing.vue';
import OpportunitySolutionTree from './pages/OpportunitySolutionTree.vue';
import Outcomes from './pages/Outcomes.vue';
import Overview from './pages/Overview.vue';
import Playground from './pages/Playground.vue';
import Questions from './pages/Questions.vue';
import Snapshots from './pages/Snapshots.vue';
import SolutionStorymap from './pages/SolutionStorymap.vue';
import GrandTree from './pages/GrandTree.vue';
import SystemMenu from './SystemMenu.vue';

export default defineComponent({
    components: { SystemMenu, FlexRow, Page },
    data() {
        return {
            active: markRaw(GrandTree),
            tabs: [
                {
                    title: "Home",
                    active: false,
                    page: markRaw(Overview)
                },
                {
                    title: "The Grand Tree",
                    active: true,
                    page: markRaw(GrandTree)
                },
                {
                    title: "Outcomes",
                    active: false,
                    page: markRaw(Outcomes)
                },
                {
                    title: "Questions",
                    active: false,
                    page: markRaw(Questions)
                },
                {
                    title: "Snapshots",
                    active: false,
                    page: markRaw(Snapshots)
                },
                {
                    title: "Opportunity Solution Tree",
                    active: false,
                    page: markRaw(OpportunitySolutionTree)
                },
                {
                    title: "Opportunity Sizing",
                    active: false,
                    page: markRaw(OpportunitySizing)
                },
                {
                    title: "Story Mapping",
                    active: false,
                    page: markRaw(SolutionStorymap)
                },
                {
                    title: "Assumption Mapping",
                    active: false,
                    page: markRaw(AssumptionMapping)
                },
                {
                    title: "Assumption Tests",
                    active: false,
                    page: markRaw(AssumptionTests)
                },
                {
                    title: "Playground",
                    active: false,
                    page: markRaw(Playground)
                }
            ]
        }
    },
    methods: {
        activateTab(index: number) {
            this.active = this.tabs[index].page as any;
        }
    }

})
</script>
<style scoped>
.home {
    margin-left: 230px;
}
</style>
