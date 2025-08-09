<template>
    <div class="flex-row">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})

</script>
<style scoped>
.flex-row {
    display: flex;
    gap: 10px;
    align-content: center;
}
</style>
