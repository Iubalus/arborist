<template>
    <div :class="['label-container', !readOnly ? 'draggable' : null]">
        <label v-show="!!label">{{ label }}</label>
        <ul>
            <li v-for="(ignored, i) in visibleList" :key="keys[i]" :draggable="!readOnly" :ondragover="dragOver"
                :ondragstart="dragStart" :ondragend="dragEnd" :data-index="i">
                <LabelText v-model:value="internalValue[i]" :read-only="readOnly"></LabelText>
            </li>
        </ul>
        <pre>{{ keys }}</pre>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LabelText from './LabelText.vue';

export default defineComponent({
    components: { LabelText },
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
            internalValue: this.value,
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
                return `${v.substring(0, 50)}, ${i}`
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
        }
    }
})

</script>
<style scoped>
.label-container {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;

    label {
        font-size: 0.8em;
        display: block;
        margin-bottom: 3px;
    }

    input {
        padding: 5px 10px;
        width: 100%;
        box-sizing: border-box;
    }

    &.draggable {
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

}
</style>
