<template>
    <div class="card">
        <h2 v-show="!!title">{{ title }}</h2>
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
        margin: 0;
        padding: 0;
        border-bottom: solid 1px #dbdbdb;
    }
}
</style>
