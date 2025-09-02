<template>
    <Page
        title="Coming Soon"
        v-dragscroll
        class="grand-tree"
    >
        <Tree :root="root" />
    </Page>
</template>
<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import { Page, Tree, type TreeNode } from '@/components/bits';
import OutcomeNode from './OutcomeNode.vue';

export default defineComponent({
    components: { Page, Tree },
    data() {
        return {
            root: {
                contentType: "CUSTOM",
                element: markRaw(OutcomeNode),
                content: {
                    type: "BUSINESS",
                    text: "Profit"
                },
                children: [
                    {
                        contentType: "CUSTOM",
                        element: markRaw(OutcomeNode),
                        content: {
                            type: "BUSINESS",
                            text: "Revenue"
                        },
                        children: [
                            {
                                contentType: "CUSTOM",
                                element: markRaw(OutcomeNode),
                                content: {
                                    type: "PRODUCT",
                                    text: "Increase # of Customers"
                                },
                                children: [
                                    {
                                        contentType: "CUSTOM",
                                        element: markRaw(OutcomeNode),
                                        content: {
                                            text: "I want to know about new products"
                                        }
                                    },
                                    {
                                        contentType: "CUSTOM",
                                        element: markRaw(OutcomeNode),
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
                        element: markRaw(OutcomeNode),
                        content: {
                            type: "BUSINESS",
                            text: "Cost"
                        },
                        children: [
                            {
                                contentType: "CUSTOM",
                                element: markRaw(OutcomeNode),
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
                                element: markRaw(OutcomeNode),
                                content: {
                                    type: "BUSINESS",
                                    text: "People Cost"
                                }
                            }
                        ]
                    },
                    {
                        contentType: "CUSTOM",
                        element: markRaw(OutcomeNode),
                        content: {
                            type: "BUSINESS",
                            text: "Revenue"
                        },
                        children: [
                            {
                                contentType: "CUSTOM",
                                element: markRaw(OutcomeNode),
                                content: {
                                    type: "PRODUCT",
                                    text: "Increase # of Customers"
                                },
                                children: [
                                    {
                                        contentType: "CUSTOM",
                                        element: markRaw(OutcomeNode),
                                        content: {
                                            text: "I want to know about new products"
                                        }
                                    },
                                    {
                                        contentType: "CUSTOM",
                                        element: markRaw(OutcomeNode),
                                        content: {
                                            text: "I want the product to be affordable"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        contentType: "CUSTOM",
                        element: markRaw(OutcomeNode),
                        content: {
                            type: "BUSINESS",
                            text: "Revenue"
                        },
                        children: [
                            {
                                contentType: "CUSTOM",
                                element: markRaw(OutcomeNode),
                                content: {
                                    type: "PRODUCT",
                                    text: "Increase # of Customers"
                                },
                                children: [
                                    {
                                        contentType: "CUSTOM",
                                        element: markRaw(OutcomeNode),
                                        content: {
                                            text: "I want to know about new products"
                                        }
                                    },
                                    {
                                        contentType: "CUSTOM",
                                        element: markRaw(OutcomeNode),
                                        content: {
                                            text: "I want the product to be affordable"
                                        }
                                    },
                                    {
                                        contentType: "CUSTOM",
                                        element: markRaw(OutcomeNode),
                                        content: {
                                            type: "BUSINESS",
                                            text: "Revenue"
                                        },
                                        children: [
                                            {
                                                contentType: "CUSTOM",
                                                element: markRaw(OutcomeNode),
                                                content: {
                                                    type: "PRODUCT",
                                                    text: "Increase # of Customers"
                                                },
                                                children: [
                                                    {
                                                        contentType: "CUSTOM",
                                                        element: markRaw(OutcomeNode),
                                                        content: {
                                                            text: "I want to know about new products"
                                                        }
                                                    },
                                                    {
                                                        contentType: "CUSTOM",
                                                        element: markRaw(OutcomeNode),
                                                        content: {
                                                            text: "I want the product to be affordable"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } as TreeNode
        }
    }
})
</script>
<style scoped>
.grand-tree {
    height: 80vh;

    &:hover {
        cursor: grab;
        user-select: none;

        &:active {
            cursor: grabbing;
        }
    }
}
</style>
