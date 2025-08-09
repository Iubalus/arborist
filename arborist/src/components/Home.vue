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
import { 
    Page,
    FlexRow
 } from './bits';
import {
    GrandTree,
    OpportunitySolutionTree,
    Outcomes,
    Playground,
    Questions,
    Snapshots,
    SystemMenu
} from './pages';

export default defineComponent({
    components: { SystemMenu, FlexRow, Page },
    data() {
        return {
            active: markRaw(GrandTree),
            tabs: [
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
