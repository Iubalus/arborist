<template>
    <Labelled :label="label">
        <input v-model="internalValue" type="text" :disabled="readOnly" />
    </Labelled>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Labelled from './Labelled.vue';

export default defineComponent({
    components: { Labelled },
    props: {
        label: {
            type: String,
            default: () => null
        },
        value: {
            type: String,
            required: true
        },
        readOnly: {
            type: Boolean,
            default: false
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
            }
        }
    }
})

</script>
<style scoped>
input {
    padding: 5px 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius:5px;
    border:solid 1px black;
}
</style>
