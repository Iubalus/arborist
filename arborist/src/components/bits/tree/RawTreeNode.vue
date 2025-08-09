<template>
    <div :class="['tree-card', isCopy ? 'is-copy' : '', isCut ? 'is-cut' : '']">
        <component
            :is="node"
            v-model:value="internalValue"
        ></component>
        <FlexRow>
            <Btn
                text="&#11205;"
                @click="up"
            />
            <Btn
                text="&#11206;"
                @click="down"
            />
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
import { defineComponent, markRaw, type PropType } from 'vue';
import Btn from '@/components/bits/button/Btn.vue';
import FlexRow from '@/components/bits/container/FlexRow.vue';
import RawTreeTextNode from './RawTreeTextNode.vue';

export default defineComponent({
    components: { RawTreeTextNode, FlexRow, Btn },
    props: {
        value: {
            type: Object as PropType<any>,
            default: () => null
        },
        node: {
            type: Object as PropType<any>,
            default: () => markRaw(RawTreeTextNode)
        },
        isCopy: {
            type: Boolean,
            default: false
        },
        isCut: {
            type: Boolean,
            default: false
        }
    },
    emits: ["update:value", "cut", "copy", "paste", "delete", "up", "down"],
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
        },
        up() {
            this.$emit("up");
        },
        down() {
            this.$emit("down")
        }
    }

})

</script>
<style scoped>
.tree-card {
    display: block;
    min-width: 200px;
    margin: 5px 0;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);

    &.is-copy {
        border: dashed 1px blue;
        margin: 4px -1px;
    }

    &.is-cut {
        border: dashed 1px red;
        margin: 4px -1px;
    }
}
</style>
