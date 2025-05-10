<template>
    <div :class="[root || internalTree.length === 0 ? 'root' : 'tree-node']">
        <div
            v-for="(c, i) in internalTree"
            :key="i"
        >
            <FlexRow>
                <div :class="['label-stick', i === 0 ? 'first-label-stick' : '']">
                    <LabelText
                        style="width:200px;"
                        v-model:value="c.text"
                    />
                </div>
                <Btn
                    v-if="c.children.length == 0"
                    text="Add Child"
                    width="200px"
                    @click="() => addChild(i)"
                />
                <RawTreeBuilder
                    v-model:value="c.children"
                    :root="false"
                />
            </FlexRow>
            <Btn
                v-if="i == internalTree.length - 1 && !root"
                text="Add Sibling"
                width="200px"
                @click="addSibling"
            />
        </div>
        <Btn
            v-if="root && internalTree.length === 0"
            text="Create"
            width="200px"
            @click="addSibling"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Btn from './Btn.vue';
import LabelText from './LabelText.vue';
import FlexRow from './FlexRow.vue';

interface Node {
    text: string;
    children: Node[]
}

export default defineComponent({
    components: { Btn, LabelText, FlexRow },
    props: {
        tree: {
            type: Array as PropType<Node[]>,
            default: () => []
        },
        root: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:value'],
    data() {
        return {
            internalTree: [] as Node[]
        }
    },
    watch: {
        internalTree: {
            handler: function (v) {
                this.$emit("update:value", v);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        addChild(index: number) {
            this.internalTree[index].children.push({ text: null as unknown as string, children: [] });
        },
        addSibling() {
            this.internalTree.push({ text: null as unknown as string, children: [] });
        }
    }
})

</script>
<style scoped>
.root {
    .label-stick {
        position: relative;
        align-content: center;

        &:after {
            width: 10px;
            height: 5px;
            border-bottom: 1px solid #52bafa;
            position: absolute;
            top: 50%;
            right: -10px;
            content: ' '
        }

    }

}

.tree-node {
    position: relative;
    border-left: 1px solid #52bafa;
    padding: 0 10px;

    .label-stick {
        position: relative;
        align-content: center;

        &.first-label-stick {
            &:before {
                top: 0px;
                left: -11px;
                width: 10px;
                height: 50%;
                padding-bottom: 5px;
                border-left: 1px solid white;
            }
        }

        &:before {
            width: 10px;
            height: 5px;
            border-bottom: 1px solid #52bafa;
            position: absolute;
            top: 50%;
            left: -10px;
            content: ' '
        }

        &:after {
            width: 10px;
            height: 5px;
            border-bottom: 1px solid #52bafa;
            position: absolute;
            top: 50%;
            right: -10px;
            content: ' '
        }
    }


    &:after {
        width: 10px;
        height: 13px;
        border-top: 1px solid #52bafa;
        background: white;
        position: absolute;
        bottom: 0;
        left: -1px;
        content: ' '
    }
}
</style>
