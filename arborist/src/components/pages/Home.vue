<template>
    <div class="home">
        <Tabs :tabs="tabs" @tab-selected="activateTab" />
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Tabs from '../bits/Tabs.vue';
import FlexRow from '../bits/FlexRow.vue';

export default defineComponent({
    components: { Tabs, FlexRow },
    data() {
        return {
            tabs: [
                {
                    title: "Snapshot",
                    active: true
                },
                {
                    title: "Opportunity Solution Tree",
                    active: false
                }
            ]
        }
    },
    methods: {
        activateTab(index: number) {
            console.log(index);
        }
    }

})
</script>
<style scoped></style>
