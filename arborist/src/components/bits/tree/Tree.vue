<template>
    <table class="tree-wrapping-table">
        <tbody>
            <tr v-for="(level, y) in fullTree(innerRoot)">
                <td
                    v-for="(node, x) in level"
                    :colspan="countLeaves(node)"
                    :class="[node.contentType === 'CUSTOM' ? 'align-content-start' : null, node.isCut ? 'is-cut' : '', node.isCopy ? 'is-copy' : '']"
                >
                    <div
                        v-if="node.contentType === 'CUSTOM'"
                        class="d-grid gap-1 tree-node-custom"
                    >
                        <div class="d-flex gap-1 flex-nowrap">
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action"
                                @click="cut(node)"
                            >Cut</button>
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action"
                                @click="copy(node)"
                            >Copy</button>
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action"
                                @click="paste(node)"
                            >Paste</button>
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action"
                                @click="remove(node)"
                            >Delete</button>
                            <button
                                class="tree-node-action"
                                style="margin-left:auto"
                                @click="hideChildren(x, y)"
                            >{{ isHidden(x, y) ? 'Expand' : 'Collapse' }}</button>
                        </div>
                        <div class="d-flex gap-1 justify-content-space-between">
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action"
                                @click="left(node)"
                            >&#8592;</button>
                            <div>
                                <component
                                    v-if="node.element"
                                    :is="node.element"
                                    v-model:content="node.content"
                                />
                            </div>
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action"
                                @click="right(node)"
                            >&#8594;</button>
                        </div>
                    </div>
                    <div
                        class="separator-content"
                        v-else
                    >
                        {{ node.content }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Btn } from '@/components/bits';

export enum TreeContentType {
    CUSTOM = "CUSTOM",
    FILLER = "FILLER",
    JOINER = "JOINER"
}

export interface TreeNode {
    contentType: TreeContentType;
    content?: any;
    element?: any;
    children?: TreeNode[];
    isCut?: boolean;
    isCopy?: boolean;
}

export enum SelectType {
    CUT = "CUT",
    COPY = "COPY"
}

export default defineComponent({
    components: { Btn },
    props: {
        root: {
            type: Object as PropType<TreeNode>,
            default: () => { return {} }
        }
    },
    emits: ['update:root'],
    data() {
        return {
            innerRoot: this.root,
            hidden: [] as any[],
            selectedNode: null as unknown as TreeNode,
            selectType: null as unknown as SelectType,
        }
    },
    watch: {
        innerRoot: {
            handler(v) {
                if (JSON.stringify(v) !== JSON.stringify(this.root)) {
                    this.$emit("update:root", v);
                }
            },
            deep: true
        },
        root: {
            handler(v) {
                this.innerRoot = v;
            },
            deep: true
        }
    },
    computed: {
        depth() {
            return this.computeDepth(this.innerRoot, 0);
        }
    },
    methods: {
        countLeaves(node: TreeNode): number {
            if (!node.children) {
                return 1;//leaf
            }
            return (node.children || []).map(c => this.countLeaves(c)).reduce((l, r) => l + r, 0);
        },
        computeDepth(node: TreeNode, current: number): number {
            return Math.max(...[current].concat((node.children || []).map(v => this.computeDepth(v, current + 1))));
        },
        fullTree(node: TreeNode): TreeNode[][] {
            let nodes = [] as TreeNode[][];
            this.walkTree(node, 0, 0, nodes);
            return nodes;
        },
        isHidden(x: number, y: number) {
            return !!this.hidden.find(v => {
                return v.x === x && v.y === y
            })
        },
        walkTree(node: TreeNode, x: number, y: number, flattened: TreeNode[][]) {
            flattened[y] = (flattened[y] || []).concat([node]);
            if (!node.children) {
                for (let i = y + 1; i <= this.depth; i++) {
                    flattened[i] = (flattened[i] || []).concat([{ contentType: TreeContentType.FILLER }])
                }
            } else {
                if (this.isHidden(x, y)) {
                    for (let i = y + 1; i <= this.depth; i++) {
                        for (let j = 0; j < node.children.length + 1; j++) {
                            flattened[i] = (flattened[i] || []).concat([{ contentType: TreeContentType.FILLER }])
                        }
                    }
                } else {
                    (node.children || [])?.forEach((v, x) => this.walkTree(v, x, y + 1, flattened))
                }
            }
        },
        doVisit(node: TreeNode, action: (n: TreeNode) => void) {
            action(node);
            node.children?.forEach(c => this.doVisit(c, action));
        },
        cloneVisit(original: TreeNode, clone: TreeNode, action: (original: TreeNode, clone: TreeNode) => void) {
            action(original, clone);
            if (!original.children || !clone.children) {
                return;
            }
            for (let i = 0; i < original.children.length; i++) {
                this.cloneVisit(original.children[i], clone.children[i], action);
            }
        },
        clearSelection() {
            this.doVisit(this.innerRoot, (n) => {
                n.isCopy = false;
                n.isCut = false;
            });
        },
        cut(node: TreeNode) {
            this.clearSelection();
            if (this.selectedNode === node && this.selectType === SelectType.CUT) {
                this.selectedNode = null as unknown as TreeNode;
                return;
            }
            this.selectedNode = node;
            this.selectType = SelectType.CUT;
            this.doVisit(node, (n) => {
                n.isCut = true;
            });
        },
        copy(node: TreeNode) {
            this.clearSelection();
            if (this.selectedNode === node && this.selectType === SelectType.COPY) {
                this.selectedNode = null as unknown as TreeNode;
                return;
            }
            this.selectedNode = node;
            this.selectType = SelectType.COPY;
            this.doVisit(node, (n) => {
                n.isCopy = true;
            });
        },
        paste(node: TreeNode) {
            if (!this.selectedNode) {
                return;
            }
            if (!node.children) {
                node.children = [];
            }
            let newNode = JSON.parse(JSON.stringify(this.selectedNode));
            this.cloneVisit(this.selectedNode, newNode, (original, clone) => {
                clone.element = original.element;
            })
            node.children?.push(newNode);
            if (this.selectType === SelectType.CUT) {
                this.remove(this.selectedNode);
            }
            this.selectedNode = null as unknown as TreeNode;
            this.selectType = null as unknown as SelectType;
            this.clearSelection();
        },
        remove(node: TreeNode) {
            this.doVisit(this.innerRoot, (n) => {
                if (n.children?.find(v => v === node)) {
                    n.children = n.children.filter(v => v !== node);
                }
            })
        },
        swap(x1: number, x2: number, nodes: TreeNode[]) {
            //capture internal element
            let x1Elt = nodes[x1].element;
            let x2Elt = nodes[x2].element;

            //clear internal element
            nodes[x1].element = null;
            nodes[x2].element = null;

            let temp = nodes[x2];
            nodes[x2] = nodes[x1];
            nodes[x1] = temp;

            this.$nextTick(() => {
                //re-render with elements swapped
                nodes[x2].element = x1Elt;
                nodes[x1].element = x2Elt;
            })
        },
        left(node: TreeNode) {
            this.doVisit(this.innerRoot, (n) => {
                if (n.children?.find(v => v === node)) {
                    let currentInd = n.children?.indexOf(node);
                    let newInd = currentInd === 0 ? n.children.length - 1 : currentInd - 1;
                    this.swap(currentInd, newInd, n.children);
                }
            })
        },
        right(node: TreeNode) {
            this.doVisit(this.innerRoot, (n) => {
                if (n.children?.find(v => v === node)) {
                    let currentInd = n.children?.indexOf(node);
                    let newInd = currentInd + 1 === n.children.length ? 0 : currentInd + 1;
                    this.swap(currentInd, newInd, n.children);
                }
            })
        },
        hideChildren(x: number, y: number) {
            if (this.isHidden(x, y)) {
                this.hidden = this.hidden.filter(v => v.x !== x || v.y !== y);
            } else {
                this.hidden.push({ x: x, y: y });
            }
        }
    }
})

</script>
<style scoped>
td {
    border: solid 1px rgba(173, 221, 173, .5);
    justify-content: space-around;

    .separator-content {
        font-size: 60px;
    }

    &.is-cut {
        border: dashed 1px red;
    }

    &.is-copy {
        border: dashed 1px blue;
    }

    .tree-node-custom {
        padding: 5px;

        .tree-node-action {
            opacity: 20%;
            border-radius: 1000px;
            border: none;
            text-wrap: nowrap;
            padding: 5px 10px;
            justify-self: center;
            align-self: center;
            background: rgba(218, 255, 239, .5);
            box-shadow: 0 0 2px rgba(0, 0, 0, .6);

            &:hover {
                opacity: 1;
                box-shadow: 0 0 4px rgba(0, 0, 0, .6);
                background: rgb(218, 255, 239);
                cursor: pointer;
            }
        }
    }
}

.tree-wrapping-table {
    min-width: 100%;
}
</style>
