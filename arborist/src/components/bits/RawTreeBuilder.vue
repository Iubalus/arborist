<template>
    <div :class="[root || internalTree.length === 0 ? 'root' : 'tree-node']">
        <div
            v-for="(c, i) in internalTree"
            :key="c.uuid"
        >
            <FlexRow>
                <div :class="['label-stick', i === 0 ? 'first-label-stick' : '']">
                    <RawTreeNode
                        v-model:value="c.content"
                        :is-cut="isCut(c, cut)"
                        :is-copy="isCopy(c, copied)"
                        @delete="() => deleteListener(c)"
                        @copy="() => copyListener(c)"
                        @paste="() => pasteListener(c)"
                        @cut="() => cutListener(c)"
                    />
                </div>
                <Btn
                    v-if="c.children.length == 0"
                    text="Add Child"
                    width="120px"
                    @click="() => addChild(i)"
                />
                <RawTreeBuilder
                    v-model:tree="c.children"
                    :root="false"
                />
            </FlexRow>
            <Btn
                v-if="i == internalTree.length - 1 && !root"
                text="Add Sibling"
                width="120px"
                @click="addSibling"
            />
        </div>
        <Btn
            v-if="root && internalTree.length === 0"
            text="Create"
            width="120px"
            @click="addSibling"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Btn from './Btn.vue';
import FlexRow from './FlexRow.vue';
import RawTreeNode from './RawTreeNode.vue';
import { addListener, getStore, putStore, removeListener, States } from './RawTreeBuilderStateStore';
import { generateUUID } from '../util/uuid-util';

interface Node {
    uuid: string;
    content: any;
    children: Node[]
}

export default defineComponent({
    components: { Btn, RawTreeNode, FlexRow },
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
    emits: ['update:tree'],
    data() {
        return {
            cut: null as unknown as Node,
            copied: null as unknown as Node,
            internalTree: this.tree,
            disableInnerWatch: false
        }
    },
    watch: {
        internalTree: {
            handler: function (v) {
                this.$emit("update:tree", v);
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        addListener(this.updateFromStore);
    },
    unmounted() {
        removeListener(this.updateFromStore);
    },
    methods: {
        updateFromStore() {
            let node = getStore(States.CLIPBOARD)
            if (!!node) {
                let isCut = getStore(States.IS_CUT);
                if (isCut) {
                    this.copied = null as unknown as Node;
                    this.cut = JSON.parse(node);
                } else {
                    this.cut = null as unknown as Node;
                    this.copied = JSON.parse(node);
                }
            } else {
                if (!!this.cut) {
                    this.cut = null as unknown as Node;
                }
                if (!!this.copied) {
                    this.copied = null as unknown as Node;
                }
            }
            let deleted = getStore(States.DELETED);
            this.internalTree = this.internalTree.filter(v => v.uuid !== deleted)
        },
        addChild(index: number) {
            this.internalTree[index].children.push({ uuid: generateUUID(), content: {} as unknown as any, children: [] });
        },
        addSibling() {
            this.internalTree.push({ uuid: generateUUID(), content: {} as unknown as any, children: [] });
        },
        deleteListener(node: Node) {
            putStore(States.DELETED, node.uuid);
        },
        copyListener(node: Node) {
            putStore(States.CLIPBOARD, JSON.stringify(node));
            putStore(States.IS_CUT, false);
        },
        pasteListener(node: Node) {
            let value = getStore(States.CLIPBOARD);
            if (!!value) {
                node.children.push(this.reId(JSON.parse(value)));
                let parsed = JSON.parse(value);
                if (getStore(States.IS_CUT)) {
                    putStore(States.DELETED, parsed.uuid);
                    putStore(States.IS_CUT, false);
                }
                putStore(States.CLIPBOARD, null);
            }
        },
        cutListener(node: Node) {
            putStore(States.CLIPBOARD, JSON.stringify(node));
            putStore(States.IS_CUT, true);
        },
        reId(node: Node) {
            node.uuid = generateUUID();
            node.children.forEach(c => this.reId(c));
            return node;
        },
        isCut(node: Node, cut: Node) {
            if (!cut) {
                return false;
            }
            return cut.uuid === node.uuid || cut.children.some((c: Node): boolean => this.isCut(node, c))
        },
        isCopy(node: Node, copied: Node) {
            console.log(node, copied);
            if (!copied) {
                return false;
            }
            return copied.uuid === node.uuid || copied.children.some((c: Node): boolean => this.isCopy(node, c))
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
