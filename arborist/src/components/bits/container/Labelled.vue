<template>
    <div :class="['label-container', noMargin ? 'no-margin' : '']">
        <label
            v-show="!!label"
            :class="[center ? 'center' : '']"
        >{{ label }}</label>
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
        },
        center: {
            type: Boolean,
            default: () => false
        },
        noMargin: {
            type: Boolean,
            default: () => false
        }
    }
})

</script>
<style scoped>
.label-container {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
    align-content: center;

    &.no-margin {
        margin-top: 0;
    }

    label {
        font-size: 0.8em;
        text-align: left;
        display: block;
        margin-bottom: 3px;

        &.center {
            text-align: center;
        }
    }
}
</style>
