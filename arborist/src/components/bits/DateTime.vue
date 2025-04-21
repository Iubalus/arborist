<template>
    <Labelled :label="label">
        <input v-model="internalValue" type="datetime-local" :disabled="readOnly" />
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
            type: Date,
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
            internalValue: new Date((this.value || new Date()).getTime() - (6 * 60 * 60 * 1000)).toISOString().slice(0, 16)
        }
    },
    watch: {
        internalValue: {
            handler: function (v: Date) {
                //@ts-ignore
                this.$emit('update:value', new Date(v));
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
    border-radius: 5px;
    border: solid 1px black;
}
</style>
