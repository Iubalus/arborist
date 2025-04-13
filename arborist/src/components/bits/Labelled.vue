<template>
    <div class="label-container">
        <label v-show="!!label">{{ label }}</label>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: {
            type: String,
            default: () => null
        }
    }
})

</script>
<style scoped>
.label-container {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;

    label {
        font-size: 0.8em;
        display: block;
        margin-bottom: 3px;
    }
}
</style>
