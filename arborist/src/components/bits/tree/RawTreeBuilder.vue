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
                        :node="nodeType"
                        @delete="() => deleteListener(c)"
                        @copy="() => copyListener(c)"
                        @paste="() => pasteListener(c)"
                        @cut="() => cutListener(c)"
                        @up="() => upListener(c)"
                        @down="() => downListener(c)"
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
                    :node-type="nodeType"
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
import { defineComponent, markRaw, type PropType } from 'vue'
import Btn from '../button/Btn.vue';
import FlexRow from '../container/FlexRow.vue';
import RawTreeNode from './RawTreeNode.vue';
import { addListener, getStore, putStore, removeListener, States } from './RawTreeBuilderStateStore';
import { generateUUID } from '../../util/uuid-util';
import RawTreeTextNode from './RawTreeTextNode.vue';

interface Node {
    uuid: string;
    content: any;
    children: Node[]
}

export default defineComponent({
    components: { Btn, RawTreeNode, FlexRow },
    props: {
        tree: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        root: {
            type: Boolean,
            default: true
        },
        nodeType: {
            type: Object as PropType<any>,
            default: () => markRaw(RawTreeTextNode)
        },
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
        upListener(node: Node) {
            for (let i = 0; i < this.internalTree.length; i++) {
                if (this.internalTree[i].uuid === node.uuid) {
                    if (i - 1 >= 0) {
                        let swap = this.internalTree[i - 1];
                        this.internalTree[i - 1] = node;
                        this.internalTree[i] = swap;
                    }
                    break;
                }
            }
        },
        downListener(node: Node) {
            for (let i = 0; i < this.internalTree.length; i++) {
                if (this.internalTree[i].uuid === node.uuid) {
                    if (i + 1 < this.internalTree.length) {
                        let swap = this.internalTree[i + 1];
                        this.internalTree[i + 1] = node;
                        this.internalTree[i] = swap;
                    }
                    break;
                }
            }
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
    margin-top:10px;
    padding:20px;
    
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
                width: 9px;
                height: 50%;
                padding-bottom: 5px;
                border-left: 2px solid white;
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
