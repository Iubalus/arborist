<template>
    <div
        class="card"
        :style="`min-width:${minWidth};`"
    >
        <h2 v-show="!!title">{{ title }} <span
                v-if="closable"
                class="close"
                @click="close"
            >x</span></h2>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: () => null
        },
        minWidth: {
            type: String,
            default: () => "0"
        },
        closable: {
            type: Boolean,
            default: false
        }
    },
    emits: ["close"],
    methods: {
        close() {
            this.$emit("close")
        }
    }
})

</script>
<style scoped>
.card {
    overflow: auto;
    box-sizing: border-box;
    display: block;
    padding: 0 10px 10px 10px;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px gray;
    background: white;

    >h2 {
        position: relative;
        margin: 0;
        padding: 0;
        border-bottom: solid 1px #dbdbdb;

        .close {
            position: absolute;
            right: 0;
            top: 10px;
            font-family: monospace;
            height: 20px;
            width: 20px;
            line-height: 18px;
            text-align: center;
            color: #777777;
            border: solid 1px #777777;
            border-radius: 5px;

            &:hover {
                cursor: pointer;
                background: #EAEAEA;
            }
        }
    }
}
</style>
