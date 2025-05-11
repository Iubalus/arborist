<template>
    <div>
        Hello World
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Labelled from './Labelled.vue';
import type { Outcome } from '../types/Outcome';

export default defineComponent({
    components: { Labelled },
    props: {
        value: {
            type: Object as PropType<Outcome>,
            default: () => null
        }
    },
    emits: ['update:value'],
    data() {
        return {
            internalValue: this.value
        }
    },
    watch: {
        internalValue: {
            handler: function (v: string) {
                //@ts-ignore
                this.$emit('update:value', v);
            },
            deep: true
        }
    }
})

</script>
<style scoped>

</style>
