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
import { defineComponent } from 'vue'
import Tabs from '../bits/Tabs.vue';
import FlexRow from '../bits/FlexRow.vue';
import Snapshots from './Snapshots.vue';
import OppSolTree from './OppSolTree.vue';
import Page from '../bits/Page.vue';
import Playground from './Playground.vue';

export default defineComponent({
    components: { Tabs, FlexRow, Page },
    data() {
        return {
            active: Playground,
            tabs: [
                {
                    title: "Snapshot",
                    active: false,
                    page: Snapshots
                },
                {
                    title: "Opportunity Solution Tree",
                    active: false,
                    page: OppSolTree
                },
                {
                    title:"Playground",
                    active: true,
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
