<template>
    <Page title="Coming Soon">
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
    </Page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Page } from '@/components/bits';

interface Node {
    contentType: "OUTCOME" | "JOINER" | "FILLER" | "OPPORTUNITY";
    content?: Outcome | Opportunity | String;
    children?: Node[];
}

interface Outcome {
    type: "BUSINESS" | "PRODUCT",
    text: String;
}

interface Opportunity {
    text: String;
}

export default defineComponent({
    components: { Page },
    data() {
        return {
            root: {
                contentType: "OUTCOME",
                content: {
                    type: "BUSINESS",
                    text: "Profit"
                },
                children: [
                    {
                        contentType: "OUTCOME",
                        content: {
                            type: "BUSINESS",
                            text: "Revenue"
                        },
                        children: [
                            {
                                contentType: "OUTCOME",
                                content: {
                                    type: "PRODUCT",
                                    text: "Increase # of Customers"
                                },
                                children: [
                                    {
                                        contentType: "OPPORTUNITY",
                                        content: {
                                            text: "I want to know about new products"
                                        }
                                    },
                                    {
                                        contentType: "OPPORTUNITY",
                                        content: {
                                            text: "I want the product to be affordable"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        contentType: "JOINER",
                        content: "-"
                    },
                    {
                        contentType: "OUTCOME",
                        content: {
                            type: "BUSINESS",
                            text: "Cost"
                        },
                        children: [
                            {
                                contentType: "OUTCOME",
                                content: {
                                    type: "BUSINESS",
                                    text: "Infra costs"
                                }
                            },
                            {
                                contentType: "JOINER",
                                content: "+"
                            },
                            {
                                contentType: "OUTCOME",
                                content: {
                                    type: "BUSINESS",
                                    text: "People Cost"
                                }
                            }
                        ]
                    }
                ]
            } as Node
        }
    },
    computed: {
        depth() {
            return this.computeDepth(this.root, 0);
        }
    },
    methods: {
        countLeaves(node: Node): number {
            if (!node.children) {
                return 1;//leaf
            }
            return (node.children || []).map(c => this.countLeaves(c)).reduce((l, r) => l + r, 0);
        },
        computeDepth(node: Node, current: number): number {
            return Math.max(...[current].concat((node.children || []).map(v => this.computeDepth(v, current + 1))));
        },
        fullTree(node: Node): Node[][] {
            let nodes = [] as Node[][];
            this.walkTree(node, 0, nodes);
            return nodes;
        },
        walkTree(node: Node, level: number, flattened: Node[][]) {
            flattened[level] = (flattened[level] || []).concat([node]);
            if (!node.children) {
                for (let i = level + 1; i <= this.depth; i++) {
                    flattened[i] = (flattened[i] || []).concat([{ contentType: "FILLER" }])
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
