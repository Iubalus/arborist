<template>
    <div class="home">
        <div class="branding">
            <img src="/arborist.png"></img>
            <h1>rborist</h1>
        </div>
        <Tabs :tabs="tabs" @tab-selected="activateTab" />
        <component :is="active"></component>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FlexRow from '../bits/FlexRow.vue';
import Page from '../bits/Page.vue';
import Tabs from '../bits/Tabs.vue';
import AssumptionMapping from './AssumptionMapping.vue';
import AssumptionTests from './AssumptionTests.vue';
import OpportunitySizing from './OpportunitySizing.vue';
import OpportunitySolutionTree from './OpportunitySolutionTree.vue';
import Playground from './Playground.vue';
import Questions from './Questions.vue';
import Snapshots from './Snapshots.vue';
import SolutionStorymap from './SolutionStorymap.vue';
import Overview from './Overview.vue';
import Outcomes from './Outcomes.vue';

export default defineComponent({
    components: { Tabs, FlexRow, Page },
    data() {
        return {
            active: Snapshots,
            tabs: [
                {
                    title: "Home",
                    active: true,
                    page: Overview
                },
                {
                    title: "Outcomes",
                    active: false,
                    page: Outcomes
                },
                {
                    title: "Questions",
                    active: false,
                    page: Questions
                },
                {
                    title: "Snapshots",
                    active: false,
                    page: Snapshots
                },
                {
                    title: "Opportunity Solution Tree",
                    active: false,
                    page: OpportunitySolutionTree
                },
                {
                    title: "Opportunity Sizing",
                    active: false,
                    page: OpportunitySizing
                },
                {
                    title: "Story Mapping",
                    active: false,
                    page: SolutionStorymap
                },
                {
                    title: "Assumption Mapping",
                    active: false,
                    page: AssumptionMapping
                },
                {
                    title: "Assumption Tests",
                    active: false,
                    page: AssumptionTests
                },
                {
                    title: "Playground",
                    active: false,
                    page: Playground
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

    h1 {
        top: 122px;
        left: 95px;
        position: absolute;
    }
}
</style>
