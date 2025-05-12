<template>
    <Page title="Outcomes">
        <RawTreeBuilder
            v-model:tree="outcomesTree" 
            :node-type="nodeType"           
        />
        <pre>{{ outcomesTree }}</pre>
    </Page>
</template>
<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import Page from '../bits/Page.vue';
import RawTreeBuilder from '../bits/RawTreeBuilder.vue';
import Outcome from '../bits/Outcome.vue';

export default defineComponent({
    components: { Page, RawTreeBuilder },
    data() {
        return {
            outcomesTree:[],
            nodeType: markRaw(Outcome)
        }
    }
})
</script>
<style scoped></style>
