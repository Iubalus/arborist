<template>
    <Labelled :label="label">
        <ul :class="[readOnly ? '' : 'draggable', asRow ? 'as-row' : '']">
            <li v-for="(v, i) in internalValue" :key="keys[i]" :draggable="!readOnly" :ondragover="dragOver"
                :ondragstart="dragStart" :ondragend="dragEnd" :data-index="i">
                <div class="item-row" :data-use="v">
                    <LabelText v-model:value="internalValue[i]" :read-only="readOnly"></LabelText>
                    <Btn v-if="!readOnly" text="-" width="30px" @click="() => deleteItem(i)"></Btn>
                </div>
            </li>
            <li v-show="!readOnly">
                <Btn text="+" @click="addItem"></Btn>
            </li>
        </ul>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
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
        },
        asRow: {
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
    methods: {
        makeKeys(list: any[]) {
            //@ts-ignore
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
            this.$emit('update:value', this.internalValue);            
        },
        dragOver(e: any) {
            this.dragEndIndex = e.target.dataset.index;
        },
        dragStart(e: any) {            
            this.dragStartIndex = e.target.dataset.index;
        },
        addItem() {
            this.internalValue.push("");
            this.keys = this.makeKeys(this.internalValue);
        },
        deleteItem(index: number) {
            this.internalValue.splice(index, 1);
            this.keys = this.makeKeys(this.internalValue);
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

.as-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0;
    margin: 0;

    li {
        display: inline;
        padding: 0;
        margin: 0;
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
    gap: 5px;
}
</style>
