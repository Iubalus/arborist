<template>
    <Labelled :label="label">
        <ul :class="[readOnly ? '' : 'draggable']">
            <li v-for="(v, i) in visibleList" :key="keys[i]" :draggable="!readOnly" :ondragover="dragOver"
                :ondragstart="dragStart" :ondragend="dragEnd" :data-index="i">
                <div class="item-row">
                    <LabelText v-model:value="internalValue[i]" :read-only="readOnly"></LabelText>
                    <Btn v-if="!readOnly" text="X" width="30px" @click="() => deleteItem(i)"></Btn>
                </div>
            </li>
            <li v-show="!readOnly">
                <Btn text="Add" @click="addItem"></Btn>
            </li>
        </ul>
        <pre>{{ keys }}</pre>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent, readonly, type PropType } from 'vue'
import LabelText from './LabelText.vue';
import Labelled from './Labelled.vue';
import Btn from './Btn.vue';

export default defineComponent({
    components: { LabelText, Labelled, Btn },
    props: {
        label: {
            type: String,
            default: () => null
        },
        value: {
            type: Array as PropType<String[]>,
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
            internalValue: this.value as string[],
            keys: this.makeKeys(this.value),
            dragStartIndex: 0,
            dragEndIndex: 0
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
    },
    computed: {
        visibleList() {
            return this.internalValue;
        }
    },
    methods: {
        makeKeys(list: any[]) {
            return list.map((v, i) => {
                return `${new Date().getTime()} ${i}`;
            })
        },
        dragEnd() {
            let elt = this.internalValue[this.dragStartIndex];
            this.internalValue.splice(this.dragStartIndex, 1);
            this.internalValue.splice(this.dragEndIndex, 0, elt);
            this.keys = this.makeKeys(this.internalValue);
            //@ts-ignore
            this.$emit('update:value', v);
        },
        dragOver(e: any) {
            this.dragEndIndex = e.target.dataset.index;
        },
        dragStart(e: any) {
            this.dragStartIndex = e.target.dataset.index;
        },
        addItem() {
            this.internalValue.push("");
        },
        deleteItem(index: number) {
            this.internalValue.splice(index, 1);
        }
    }
})

</script>
<style scoped>
.draggable {
    li:hover {
        cursor: grab;
    }
}

ul {
    margin: 0;
    padding: 0 0 0 25px;

    li {
        +li {
            margin-top: 5px;
        }
    }
}

.item-row {
    display: flex;
    gap: 10px;
}
</style>
