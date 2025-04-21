<template>
    <span :class="['tab', active ? 'active' : '']">
        {{ title }}
    </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: () => null
        },
        active: {
            type: Boolean,
            default: () => false
        }
    }
})

</script>
<style scoped>
.tab {
    padding: 10px 10px 10px 10px;
    background: white;
    border-radius: 5px 5px 0 0;
    box-sizing: border-box;
    margin-bottom: -13px;
    box-shadow: 2px 2px 5px rgba(0,0,0,.6);

    &.active {
        font-weight: bold;
    }

    &:hover {
        cursor: pointer;
        background: rgb(235, 235, 235);
    }
}
</style>
