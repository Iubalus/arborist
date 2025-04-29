<template>
    <Labelled :label="label" :style="`width:${width}`">
        <button type="button" :class="[readOnly ? 'disabled' : '']" :disabled="readOnly" @click="doClick">
            {{ text }}
        </button>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Labelled from './Labelled.vue';

export default defineComponent({
    components: { Labelled },
    props: {
        label: {
            type: String,
            default: () => null
        },
        text: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: () => null
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click'],
    methods: {
        doClick() {
            if (!this.readOnly) {
                this.$emit("click");
            }
        }
    }
})

</script>
<style scoped>
button {
    font-family: monospace;
    text-align: center;
    padding: 3px 10px;
    box-sizing: border-box;
    background: rgb(209, 240, 255);
    width: 100%;
    border: solid 1px rgb(128, 128, 128);
    box-shadow: 0 0 1px 1px rgb(211, 210, 210);
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-right: 2px solid gray;
    border-bottom: 2px solid gray;
    text-shadow:        
        1px 0px 1px white,
        1px 1px 1px white;

    &.disabled {
        background: rgb(190, 190, 190);
    }

    &:hover:not(.disabled) {
        cursor: pointer;
        border-top: 2px solid darkgray;
        border-left: 2px solid darkgray;
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        background: rgb(175, 201, 214);
    }
}
</style>
