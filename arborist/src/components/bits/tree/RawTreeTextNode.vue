<template>
    <LabelText v-model:value="internalValue.value" />
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LabelText from '@/components/bits/text/LabelText.vue';

export default defineComponent({
    components: { LabelText },
    props: {
        value: {
            type: Object as PropType<{ value: string }>,
            default: () => { value: null as unknown as string }
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
<style scoped></style>
