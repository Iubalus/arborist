<template>
    <div class="home">
        <FlexRow>
            <Tab v-for="(tab, i) in tabs" :key="i" :title="tab.title" :active="tab.active" @click="activateTab(i)" />
        </FlexRow>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Tab from '../bits/Tab.vue';
import FlexRow from '../bits/FlexRow.vue';

export default defineComponent({
    components: { Tab, FlexRow },
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
            this.tabs.forEach((tab, i) => {
                tab.active = i === index;
            })
        }
    }

})
</script>
<style scoped></style>
