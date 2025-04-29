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

export default defineComponent({
    components: { Page },
    data() {
        return {
            content: [{
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat at nunc et egestas.",
                children: [
                    {
                        title: "Total",
                        author: "Robin",
                        last: "3/31/25 2:54PM",
                        text: "1.1",
                        children: [
                            {
                                joiner: "("
                            },
                            {
                                text: "A",
                            },
                            {
                                joiner: "+"
                            },
                            {
                                text: "B",
                                children: [
                                    {
                                        joiner: "("
                                    },
                                    {
                                        text: "1.1.2.1 A",
                                    },
                                    {
                                        joiner: "x"
                                    },
                                    {
                                        text: "1.1.2.2 B"
                                    },
                                    {
                                        joiner: ")"
                                    }
                                ]
                            },
                            {
                                joiner: "+"
                            },
                            {
                                text: "C",
                                children: [
                                    {
                                        text: "1.1.3.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat at nunc et egestas.",
                                        color: 'rgb(177, 224, 255)'
                                    }
                                ]

                            },
                            {
                                joiner: ")"
                            }
                        ]
                    },
                    {
                        text: "1.2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat at nunc et egestas."
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
        toCell(root: any) {
            let cell = {
                colSpan: null as unknown as number,
                before: null as unknown as string,
                after: null as unknown as string,
                title: null as unknown as string,
                author: null as unknown as string,
                last: null as unknown as string,
                color: "#ffeab1",
                text: null as unknown as string,
                joiner: null as unknown as string,
                classes: [] as string[]
            };
            let leaves = this.countLeaves(root);
            if (leaves > 1) {
                cell.colSpan = leaves;
            }
            cell.joiner = root.joiner;
            cell.text = root.text;
            cell.author = root.author;
            cell.last = root.last;
            cell.title = root.title;
            cell.color = root.color;
            cell.before = root.before;
            cell.after = root.after;
            return cell;
        },
        toRows(children: any[]): any[] {
            let allChildren = [] as any[];
            let hadChildren = false;
            let row = [] as any[]
            children.forEach((child: any) => {
                row.push(this.toCell(child));
                if (!!child.children) {
                    allChildren = allChildren.concat(child.children);
                    hadChildren = true;
                } else {
                    allChildren.push({});//placeholder object for spacing
                }
            })
            let rows = [];
            rows.push(row);
            if (hadChildren) {
                rows = rows.concat(this.toRows(allChildren));
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
