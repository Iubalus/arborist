<template>
    <Labelled :label="label">
        <select v-model="internalSelected">
            <option v-if="allowBlank"></option>
            <option
                v-for="option in options"
                :key="option[valueKey]"
                :value="option[valueKey]"
            >{{ option[labelKey] }}
            </option>
        </select>
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
        allowBlank: {
            type: Boolean,
            default: () => true
        },
        selected: {
            type: String,
            default: () => null
        },
        options: {
            type: Array as PropType<{ [key: string]: string }[]>,
            required: true
        },
        labelKey: {
            type: String,
            default: () => "label"
        },
        valueKey: {
            type: String,
            default: () => "value"
        }
    },
    emits: ["update:selected"],
    data() {
        return {
            internalSelected: this.selected
        }
    },
    watch: {
        internalSelected: {
            handler: function (v) {
                this.$emit("update:selected", v);
            }
        }
    }
})

</script>
<style scoped>
select {
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    background: transparent;
}
</style>
