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
import { Page, Btn, LabelText, Selct } from '@/components/bits';
import { api } from '@/api/api';
import { type Outcome } from '@/components/types';

export default defineComponent({
    components: { Page, Btn, LabelText, Selct },
    data() {
        return {
            selectedOutcome: null as unknown as string,
            rawOutcomes: [] as Outcome[],
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
