<template>
    <div>
        <Page :title="title"
            :super-header="`${internalSnapshot.date.toLocaleDateString()} ${internalSnapshot.date.toLocaleTimeString()}`">
        </Page>
        <QuoteDisplay
            :quotes="internalSnapshot.memorableQuotes"
        ></QuoteDisplay>
        <DualEditList
            v-model:value="internalSnapshot.memorableQuotes"
            key-a="quote"
            key-b="from"
            width-b="20%"
        ></DualEditList>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { SnapshotData } from '../../snapshot-api';
import Page from '../bits/Page.vue';
import QuoteDisplay from '../bits/QuoteDisplay.vue';
import DualEditList from '../bits/DualEditList.vue';

export default defineComponent({
    components: { Page, QuoteDisplay, DualEditList },
    props: {
        snapshot: {
            type: Object as PropType<SnapshotData>,
            required: true
        }
    },
    emits: ['update'],
    data() {
        return {
            internalSnapshot: this.snapshot
        }
    },
    watch: {
        internalSnapshot: {
            handler: function (v) {
                this.$emit("update", v);
            },
            deep: true
        }
    },
    computed: {
        title(): string {
            return `#${this.internalSnapshot.id} ${this.dolist(this.internalSnapshot.interviewees.map(v => v.name))} at ${this.internalSnapshot.company}`
        }
    },
    methods: {
        dolist(values: string[]) {
            if (values.length == 1) {
                return values[0];
            } else {
                let oxford = values.length > 2 ? "," : "";
                return values.slice(0, -1).join(", ") + oxford + " and " + values.slice(-1);
            }
        }
    }

})

</script>
<style scoped></style>
