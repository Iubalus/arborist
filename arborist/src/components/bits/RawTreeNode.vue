<template>
    <div class="tree-card">
        <component
            :is="node"
            v-model:value="internalValue"
        ></component>
        <FlexRow>
            <Btn
                text="&#9986; Cut"
                @click="cut"
            />
            <Btn
                text="&#10064; Copy"
                @click="copy"
            />
            <Btn
                text="&#9112; Paste"
                @click="paste"
            />
            <Btn
                text="&#9888; Delete"
                @click="doDelete"
            />
        </FlexRow>
    </div>
</template>
<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import LabelText from './LabelText.vue';
import FlexRow from './FlexRow.vue';
import Btn from './Btn.vue';

export default defineComponent({
    components: { LabelText, FlexRow, Btn },
    props: {
        value: {
            type: Object,
            default: () => null
        },
        node: {
            type: Object,
            default: () => markRaw(LabelText)
        }
    },
    emits: ["update:value", "cut", "copy", "paste", "delete"],
    data() {
        return {
            internalValue: this.value
        }
    },
    watch: {
        internalValue: {
            handler: function (v) {
                this.$emit("update:value", v);
            }
        }
    },
    methods: {
        cut() {
            this.$emit('cut')
        },
        copy() {
            this.$emit('copy')
        },
        paste() {
            this.$emit('paste')
        },
        doDelete() {
            this.$emit('delete')
        }
    }

})

</script>
<style scoped>
.tree-card {
    min-width: 200px;
    margin: 5px 0;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    background: white;
}
</style>
