<template>
    <Labelled :label="label">
        <ul class="display-list">
            <li
                v-for="(v, i) in values"
                :key="i"
            >
                {{ v }}
            </li>
            <li v-if="values.length == 0">none</li>
        </ul>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Labelled from '@/components/bits/container/Labelled.vue';

export default defineComponent({
    components: { Labelled },
    props: {
        label: {
            type: String,
            default: () => null
        },
        values: {
            type: Array as PropType<String[]>,
            required: true
        }
    }
})

</script>
<style scoped>
.display-list {
    margin: 0;
    padding: 0 0 0 25px;
    text-align: left;
}
</style>
