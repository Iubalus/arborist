<template>
    <Page title="Outcomes">
        <RawTreeBuilder
            v-model:tree="outcomesTree"
            :node-type="nodeType"
            :key="rootKey"
        />        
    </Page>
</template>
<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import Page from '../bits/Page.vue';
import RawTreeBuilder from '../bits/RawTreeBuilder.vue';
import Outcome from '../bits/Outcome.vue';
import { api } from '../../api/api';

export default defineComponent({
    components: { Page, RawTreeBuilder },
    data() {
        return {
            outcomesTree: [] as any[],
            nodeType: markRaw(Outcome)
        }
    },
    async created() {
        this.outcomesTree = await api().loadOutcomes();
    },
    computed: {
        rootKey(): string {
            if (this.outcomesTree.length == 0) {
                return "root"
            }
            return this.outcomesTree[0].uuid;
        }
    },
    watch: {
        outcomesTree: {
            handler: async function (v) {
                await api().saveOutcomes(v);
            },
            deep: true
        }
    }
})
</script>
<style scoped></style>
