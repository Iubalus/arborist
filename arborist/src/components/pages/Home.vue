<template>
    <div class="home">
        <Tabs :tabs="tabs" @tab-selected="activateTab" />
        <component :is="active"></component>
        <Page title="Playground">
            <slot></slot>
        </Page>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Tabs from '../bits/Tabs.vue';
import FlexRow from '../bits/FlexRow.vue';
import Snapshots from './Snapshots.vue';
import OppSolTree from './OppSolTree.vue';
import Page from '../bits/Page.vue';

export default defineComponent({
    components: { Tabs, FlexRow, Page },
    data() {
        return {
            active: Snapshots,
            tabs: [
                {
                    title: "Snapshot",
                    active: true,
                    page: Snapshots
                },
                {
                    title: "Opportunity Solution Tree",
                    active: false,
                    page: OppSolTree
                }
            ]
        }
    },
    methods: {
        activateTab(index: number) {
            this.active = this.tabs[index].page;
        }
    }

})
</script>
<style scoped></style>
