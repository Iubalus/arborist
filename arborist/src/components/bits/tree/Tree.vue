<template>
    <table class="tree-wrapping-table">
        <tbody>
            <tr v-for="(level, y) in fullTree(innerRoot)">
                <td
                    v-for="(node, x) in level"
                    :colspan="countLeaves(node)"
                    :class="[node.contentType === 'CUSTOM' ? 'align-content-start' : null, node.isCut ? 'is-cut' : '', node.isCopy ? 'is-copy' : '', node.contentType === 'FILLER' ? 'filler-cell' : '']"
                >
                    <div
                        v-if="node.contentType === 'CUSTOM'"
                        class="d-grid tree-node-custom"
                    >
                        <div class="d-flex flex-nowrap">
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
                                @click="remove(node)"
                            >Delete</button>                            
                        </div>
                        <div
                            class="d-flex justify-center"
                            style="padding:0 1px;"
                        >
                            <component
                                v-if="node.element"
                                :is="node.element"
                                v-model:content="node.content"
                            />
                        </div>
                        <div class="d-flex">
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action"
                                @click="left(node)"
                            >&#8592;</button>
                            <button
                                :disabled="!selectedNode"
                                class="tree-node-action"
                                @click="paste(node)"
                            >Paste</button>
                            <button
                                :disabled="!node.children"
                                class="tree-node-action"
                                @click="hideChildren(x, y)"
                            >{{ isHidden(x, y) ? 'Expand' : 'Collapse' }}</button>
                            <button
                                :disabled="node === innerRoot"
                                class="tree-node-action flex-end"
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
table {
    border-spacing: 0;
    border-top: solid 1px #52bafaAF;
    border-right: solid 1px #52bafaAF;
}

td {
    padding: 0;
    border-left: solid 1px #52bafaAF;
    border-bottom: solid 1px #52bafaAF;

    &.filler-cell {
        border: solid 1px transparent;
    }

    justify-content: space-around;

    .separator-content {
        font-size: 60px;
    }

    &:not(.filler-cell)+.filler-cell {
        border-left: solid 1px #52bafaAF;
    }

    &.is-cut {
        filter: brightness(.7) sepia(100%) saturate(2) hue-rotate(280deg);
    }

    &.is-copy {
        filter: sepia(100%) saturate(2) hue-rotate(60deg);
    }

    .tree-node-custom {
        margin: -1px;

        .tree-node-action {
            &:disabled {
                color: gray;
                filter: grayscale(1);
                opacity: 50%;

                &:hover {
                    cursor: not-allowed;
                }
            }

            margin-left:-1px;

            &:first-of-type {
                margin-left: 0;
            }

            border: solid 1px #52bafa;
            text-wrap: nowrap;
            padding: 2px 5px;
            font-size:11px;
            justify-self: center;
            align-self: center;
            background: white;
            color: #52bafa;

            &:hover:not(:disabled) {
                opacity: 1;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, .6);
                background: #f0f9ff;
            }
        }
    }
}

.tree-wrapping-table {
    min-width: 100%;
}
</style>
