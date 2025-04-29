<template>
    <Page title="Opportunity/Solutions Tree">
        <table cellSpacing="0" cellpadding="5" border="1" bordercolor="#cfcfff">
            <tbody>
                <tr v-for="(row, i) in toRows(content)" :key="i">
                    <td v-for="(cell, j) in row" :key="j" :colspan="cell.colSpan">
                        <div class="joiner" v-if="!!cell.joiner">
                            {{ cell.joiner }}
                        </div>
                        <div v-if="!!cell.text" class="card-content" :style="`background:${cell.color};`">
                            <div class="card-author">{{ cell.author }}</div>
                            <div class="card-last">{{ cell.last }}</div>
                            <strong>{{ cell.title }}</strong>
                            <div>{{ cell.text }}</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </Page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Page from '../bits/Page.vue';

export interface Cell {
    colSpan?: number;
    title?: string;
    author?: string;
    last?: string;
    color?: string;
    text?: string;
    joiner?: string;
}

const BUSINESS_OUTCOME = "#bce1f7";
const SOLUTION = "#eccefb";

export default defineComponent({
    components: { Page },
    data() {
        return {
            content: [{
                text: "Business Outcome",
                color: BUSINESS_OUTCOME,
                children: [
                    {
                        joiner: "("
                    },
                    {
                        text: "# of thing",
                        color: BUSINESS_OUTCOME,
                        children: [
                            {
                                text: "Product Outcome 1",
                                children: [
                                    {
                                        text: "Solution 1",
                                        color: SOLUTION
                                    },
                                    {
                                        title: "Status",
                                        text: "Solution 2",
                                        color: SOLUTION
                                    }
                                ]
                            },
                            {
                                text: "Product Outcome 2"
                            }
                        ]
                    },
                    {
                        joiner: "x"
                    },
                    {
                        text: "Avg value of thing",
                        color: BUSINESS_OUTCOME
                    },
                    {
                        joiner: ") -"
                    },
                    {
                        text: "Some Offset",
                        color: BUSINESS_OUTCOME
                    }
                ]
            }]
        }
    },
    methods: {
        countLeaves(root: any): number {
            if (!root.children) {
                return 1;
            }
            return root.children.map((c: any) => this.countLeaves(c)).reduce((l: number, r: number) => l + r, 0);
        },
        toCell(node: any): Cell {
            return {
                colSpan: this.countLeaves(node),
                joiner: node.joiner,
                text: node.text,
                author: node.author,
                last: node.last,
                title: node.title,
                color: node.color
            } as Cell;
        },
        toRows(nodes: any[]): Cell[][] {
            let rows = [] as Cell[][];
            //Add this row
            rows.push(nodes.map(n => this.toCell(n)));
            //Add additional rows (recursively) if data is present
            let EMPTY = {};
            let nextNodes = nodes.flatMap(n => n.children || [EMPTY]);
            if (nextNodes.some(n => n !== EMPTY)) {
                rows = rows.concat(this.toRows(nextNodes));
            }
            return rows;
        }
    }
})
</script>
<style scoped>
.card-content {
    width: 140px;
    min-height: 100px;
    font-size: 15px;
    padding: 20px 10px 10px 10px;
    text-align: center;
    background: rgb(255, 234, 177);
    border-radius: 5px;
    margin: auto;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);

    .card-author {
        position: absolute;
        top: 2px;
        left: 2px;
        font-size: 10px;
    }

    .card-last {
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 10px;
    }
}

table,
tr,
tr {
    border-color: #cfcfff;
}

table {
    .joiner {
        font-size: 3em;
        font-family: monospace;
        text-wrap: nowrap;
    }

    td {
        align-content: center;
        padding: 10px 20px;
    }
}
</style>
