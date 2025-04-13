<template>
    <Labelled :label="label" :style="`width:${width}`">
        <button type="button" :class="[readOnly ? 'disabled' : '']" :disabled="readOnly"
            @click="doClick">
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
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    background: rgb(204, 204, 255);
    width: 100%;
    border: solid 1px rgb(128, 128, 128);

    &.disabled {
        background: rgb(190, 190, 190);
    }

    &:hover:not(.disabled) {
        cursor: pointer;
        background: rgb(223, 223, 248);
    }
}
</style>
