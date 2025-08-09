<template>
    <div class="home">
        <div class="branding">
            <img src="/image/arborist-full.png"></img>
        </div>
        <Tabs
            :tabs="tabs"
            @tab-selected="activateTab"
        />
        <component :is="active"></component>
    </div>
</template>
<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import FlexRow from '../bits/FlexRow.vue';
import Page from '../bits/Page.vue';
import Tabs from '../bits/Tabs.vue';
import AssumptionMapping from './AssumptionMapping.vue';
import AssumptionTests from './AssumptionTests.vue';
import OpportunitySizing from './OpportunitySizing.vue';
import OpportunitySolutionTree from './OpportunitySolutionTree.vue';
import Outcomes from './Outcomes.vue';
import Overview from './Overview.vue';
import Playground from './Playground.vue';
import Questions from './Questions.vue';
import Snapshots from './Snapshots.vue';
import SolutionStorymap from './SolutionStorymap.vue';
import GrandTree from './GrandTree.vue';

export default defineComponent({
    components: { Tabs, FlexRow, Page },
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
.branding {
    position: relative;
    padding-bottom: 20px;

    img {
        width: 300px
    }
}
</style>
