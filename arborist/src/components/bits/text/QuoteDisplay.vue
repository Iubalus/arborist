<template>
    <Labelled :label="label">
        <div
            v-for="quote in quotes"
            class="quote"
        >
            <span>&quot;{{ quote.quote }}&quot;</span><span>- {{ quote.from }}</span>
        </div>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Quote } from '../../types/Snapshot';
import Labelled from '@/components/bits/container/Labelled.vue';

export default defineComponent({
    components: { Labelled },
    props: {
        label: {
            type: String,
            default: () => null
        },
        quotes: {
            type: Array as PropType<Quote[]>,
            required: true
        }
    }
})

</script>
<style scoped>
.quote {
    padding: 15px;
    margin-top: 10px;
    background: #e4f6ff;
    border-radius: 5px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .6);

    span:last-of-type {
        font-style: italic;
        padding-left: 10px;
    }
}
</style>
