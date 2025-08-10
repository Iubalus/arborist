<template>
    <table>
        <tbody>
            <tr v-for="(level, y) in fullTree(innerRoot)">
                <td
                    v-for="(node, x) in level"
                    :colspan="countLeaves(node)"
                    :class="[node.contentType === 'CUSTOM' ? 'align-content-start' : null]"
                >
                    <div class="d-flex gap-1">
                        <div v-if="node.contentType === 'CUSTOM'">
                            <details>
                                <summary></summary>
                                <div class="d-grid gap-1">
                                    <button @click="cut(x, y)">Cut</button>
                                    <button @click="copy(x, y)">Copy</button>
                                    <button @click="paste(x, y)">Paste</button>
                                    <button @click="remove(x, y)">Delete</button>
                                    <button @click="right(x, y)">&#8594;</button>
                                    <button @click="left(x, y)">&#8592;</button>
                                    <button @click="up(x, y)">&#8593;</button>
                                    <button @click="down(x, y)">&#8595;</button>
                                </div>
                            </details>
                        </div>
                        <component
                            v-if="node.element"
                            :is="node.element"
                            v-model:content="node.content"
                        />
                        <span
                            class="separator-content"
                            v-else
                        >
                            {{ node.content }}
                        </span>
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
            innerRoot: this.root
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
            this.walkTree(node, 0, nodes);
            return nodes;
        },
        walkTree(node: TreeNode, level: number, flattened: TreeNode[][]) {
            flattened[level] = (flattened[level] || []).concat([node]);
            if (!node.children) {
                for (let i = level + 1; i <= this.depth; i++) {
                    flattened[i] = (flattened[i] || []).concat([{ contentType: TreeContentType.FILLER }])
                }
            } else {
                (node.children || [])?.forEach(v => this.walkTree(v, level + 1, flattened))
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
        up(x: number, y: number) {

        },
        down(x: number, y: number) {

        },
        left(x: number, y: number) {

        },
        right(x: number, y: number) {

        }
    }
})

</script>
<style scoped>
td {
    border: solid 1px green;
    justify-content:space-around;

    .separator-content {
        font-size: 60px;
    }
}
</style>
