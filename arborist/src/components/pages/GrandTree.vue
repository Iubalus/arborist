<template>
    <Page title="Coming Soon">
        <Tree :root="root" />
    </Page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Page, Tree, type TreeNode } from '@/components/bits';

export default defineComponent({
    components: { Page, Tree },
    data() {
        return {
            root: {
                contentType: "CUSTOM",
                content: {
                    type: "BUSINESS",
                    text: "Profit"
                },
                children: [
                    {
                        contentType: "CUSTOM",
                        content: {
                            type: "BUSINESS",
                            text: "Revenue"
                        },
                        children: [
                            {
                                contentType: "CUSTOM",
                                content: {
                                    type: "PRODUCT",
                                    text: "Increase # of Customers"
                                },
                                children: [
                                    {
                                        contentType: "CUSTOM",
                                        content: {
                                            text: "I want to know about new products"
                                        }
                                    },
                                    {
                                        contentType: "CUSTOM",
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
                        contentType: "CUSTOM",
                        content: {
                            type: "BUSINESS",
                            text: "Cost"
                        },
                        children: [
                            {
                                contentType: "CUSTOM",
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
                                contentType: "CUSTOM",
                                content: {
                                    type: "BUSINESS",
                                    text: "People Cost"
                                }
                            }
                        ]
                    }
                ]
            } as TreeNode
        }
    }
})
</script>
<style scoped></style>
