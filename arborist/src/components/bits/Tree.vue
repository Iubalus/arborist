<template>
    <div :class="['tree-node', horizontal ? 'horizontal' : '']">
        <div class="content">{{ root.content }}</div>
        <div
            v-if="root.children && root.children.length > 0"
            class="children"
        >
            <Tree
                v-for="(node, i) in root.children"
                :key="i"
                :root="node"
                :horizontal="horizontal"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export interface Node {
    content: String;
    children: Node[]
}

export default defineComponent({
    props: {
        horizontal: {
            type: Boolean,
            default: false
        },
        root: {
            type: Object as PropType<Node>,
            default: () => {
                return { content: "1A", children: [{ content: "2B", children: [{ content: "3C", children: [] }, { content: "3D", children: [] }] }, { content: "2C" }, { content: "2E" }] };
            }
        }
    }
})

</script>
<style scoped>
.tree-node:not(.horizontal) {
    margin: 0 auto;

    .content {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        border: solid 1px black;
        align-content: center;
        text-align: center;

        &:before {
            position: absolute;
            content: ' ';
            width: 10px;
            height: 15px;
            left: 50%;
            top: -16px;
            border-left: 1px solid red;
        }

        &:after {
            position: absolute;
            content: ' ';
            width: 10px;
            height: 15px;
            left: 50%;
            bottom: -16px;
            border-left: 1px solid red;
        }
    }

    .children {
        display: flex;
        gap: 21px;
        justify-content: center;
        border-top: 1px solid red;
        padding-top: 15px;
        margin-top: 15px;
    }
}

.tree-node.horizontal {
    background: rgb(217, 230, 217);
    display: flex;
    margin-top: 21px;

    &:first-of-type {
        margin-top: 0;
    }

    .content {
        position: relative;
        margin: auto 0;
        width: 100px;
        height: 100px;
        border: solid 1px black;
        align-content: center;
        text-align: center;

        &:before {
            position: absolute;
            content: ' ';
            width: 15px;
            height: 10px;
            top: 50%;
            left: -16px;
            border-top: 1px solid red;
        }

        &:after {
            position: absolute;
            content: ' ';
            width: 15px;
            height: 10px;
            top: 50%;
            right: -16px;
            border-top: 1px solid red;
        }
    }

    .children {
        box-sizing: border-box;
        position: relative;
        display: block;
        padding-left: 15px;
        margin-left: 15px;
        box-sizing: border-box;
        border-left: 1px solid red;
    }
}
</style>
