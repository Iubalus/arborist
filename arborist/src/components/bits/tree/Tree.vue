<template>
    <table class="tree-wrapping-table">
        <tbody>
            <tr v-for="(level, y) in fullTree(innerRoot)">
                <td
                    v-for="(node, x) in level"
                    :colspan="countLeaves(node)"
                    :class="[node.contentType === 'CUSTOM' ? 'align-content-start' : null]"
                >
                    <div
                        v-if="node.contentType === 'CUSTOM'"
                        class="d-grid gap-1 tree-node-custom"
                    >
                        <div class="d-flex gap-1 flex-nowrap">
                            <button
                                class="tree-node-action"
                                @click="cut(x, y)"
                            >Cut</button>
                            <button
                                class="tree-node-action"
                                @click="copy(x, y)"
                            >Copy</button>
                            <button
                                class="tree-node-action"
                                @click="paste(x, y)"
                            >Paste</button>
                            <button
                                class="tree-node-action"
                                @click="remove(x, y)"
                            >Delete</button>
                            <button
                                class="tree-node-action"
                                style="margin-left:auto"
                                @click="hideChildren(x, y)"
                            >{{ isHidden(x, y) ? 'Expand' : 'Collapse' }}</button>
                        </div>
                        <div class="d-flex gap-1 justify-content-space-between">
                            <button
                                class="tree-node-action"
                                @click="left(x, y)"
                            >&#8592;</button>
                            <div>
                                <component
                                    v-if="node.element"
                                    :is="node.element"
                                    v-model:content="node.content"
                                />
                            </div>
                            <button
                                class="tree-node-action"
                                @click="right(x, y)"
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
            hidden: [] as any[]
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
        cut(x: number, y: number) {

        },
        copy(x: number, y: number) {

        },
        paste(x: number, y: number) {

        },
        remove(x: number, y: number) {

        },
        left(x: number, y: number) {

        },
        right(x: number, y: number) {

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
