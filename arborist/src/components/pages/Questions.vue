<template>
    <Page title="Questions">
        <Selct
            label="Product Outcome"
            v-model:selected="selectedOutcome"
            :options="productOutcomes"
        />
    </Page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Btn from '../bits/Btn.vue';
import FlexRow from '../bits/FlexRow.vue';
import LabelText from '../bits/LabelText.vue';
import Page from '../bits/Page.vue';
import Selct from '../bits/Selct.vue';
import { api } from '../../api/api';
import type { OutcomeNode } from '../types/Outcome';

export default defineComponent({
    components: { Page, Btn, FlexRow, LabelText, Selct },
    data() {
        return {
            selectedOutcome: null as unknown as string,
            rawOutcomes: [] as OutcomeNode[],
            researchQuestions: []
        }
    },
    async created() {
        this.rawOutcomes = await api().loadOutcomes();
    },
    computed: {
        productOutcomes() {
            return this.flattenOutcomes("", this.rawOutcomes);
        }
    },
    methods: {
        flattenOutcomes(prefix: string, nodes: OutcomeNode[]): { key: string, label: string }[] {
            return nodes.flatMap(v => {
                let r = [];
                if (v.content.type === 'PRODUCT') {
                    r.push({ key: v.uuid, label: `${prefix}${v.content.text}` });
                }
                this.flattenOutcomes(`${prefix}${v.content.text} > `, v.children).forEach(v => r.push(v));
                return r;
            })
        }
    }
})
</script>
<style scoped></style>
