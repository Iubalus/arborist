<template>
    <div class="page">
        <h1 v-show="!!title">{{ title }}</h1>
        <span class="super-header">{{ superHeader }}</span>
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
        superHeader: {
            type: String,
            defaul: () => null
        }
    }
})

</script>
<style scoped>
.page {
    overflow: auto;
    box-sizing: border-box;
    display: block;
    padding: 20px 10px 10px 10px;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px gray;
    background: white;
    position: relative;
    text-align: center;

    >h1 {
        margin: 0 0 30px;
        padding: 0;
    }

    .super-header {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size:0.8em;
    }
}
</style>
