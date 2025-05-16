<template>
    <Page title="Outcomes">
        <Tree></Tree>   
        <Tree horizontal></Tree>        
    </Page>
</template>
<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import Page from '../bits/Page.vue';
import RawTreeBuilder from '../bits/RawTreeBuilder.vue';
import Outcome from '../bits/Outcome.vue';
import Tree from '../bits/Tree.vue';

export default defineComponent({
    components: { Page, RawTreeBuilder, Tree },
    data() {
        return {
            outcomesTree: [
                {
                    "uuid": "97BEE1DA-7F37-E94A-667E-02A7A14C3FC7",
                    "content": {
                        "type": "BUSINESS",
                        "text": "Top Level"
                    },
                    "children": [
                        {
                            "uuid": "A5C550A7-3CE1-7D41-09CC-FE0A130F6EBA",
                            "content": {
                                "type": "BUSINESS",
                                "text": "Mid Level"
                            },
                            "children": []
                        },
                        {
                            "uuid": "AC488480-6F38-BA8A-7AE1-FEF6615F558D",
                            "content": {
                                "type": "BUSINESS",
                                "text": "Mid Level 2"
                            },
                            "children": [
                                {
                                    "uuid": "56E05109-01CA-811B-19D2-3DD7E8CF8348",
                                    "content": {
                                        "type": "PRODUCT",
                                        "text": "Thing"
                                    },
                                    "children": []
                                },
                                {
                                    "uuid": "78CF5593-30EB-9273-EB49-3E7DC078B07F",
                                    "content": {
                                        "type": "PRODUCT",
                                        "text": "Thing 2"
                                    },
                                    "children": [
                                        {
                                            "uuid": "DA2A5D5B-E3FD-FC19-9269-F1EBBB109BDF",
                                            "content": {
                                                "type": "PRODUCT",
                                                "text": "Thing 3"
                                            },
                                            "children": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            nodeType: markRaw(Outcome)
        }
    }
})
</script>
<style scoped></style>
