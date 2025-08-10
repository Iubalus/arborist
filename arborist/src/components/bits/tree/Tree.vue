<template>
    <table>
        <tbody>
            <tr v-for="level in fullTree(root)">
                <td
                    v-for="node in level"
                    :colspan="countLeaves(node)"
                >
                    {{ node.content }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export enum TreeContentType {
    CUSTOM = "CUSTOM",
    FILLER = "FILLER",
    JOINER = "JOINER"
}

export interface TreeNode {
    contentType: TreeContentType;
    content?: any;
    children?: TreeNode[];
}

export default defineComponent({
    props: {
        root: {
            type: Object as PropType<TreeNode>,
            default: () => { return { } }
        }
    },
    computed: {
        depth() {
            return this.computeDepth(this.root, 0);
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
        }
    }
})

</script>
<style scoped>
td {
    border: solid 1px blue;
}
</style>
