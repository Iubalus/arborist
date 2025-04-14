<template>
    <Labelled :label="label">
        <LabelText v-model:value="internalValue" label="Image URL" :read-only="readOnly"></LabelText>
        <div :class="['image-container', circle ? 'circle' : '']" :style="`background:${background}`">
            <img :src="internalValue" :alt="altText"></img>
        </div>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Labelled from './Labelled.vue';
import LabelText from './LabelText.vue';

export default defineComponent({
    components: { Labelled, LabelText },
    props: {
        label: {
            type: String,
            default: () => null
        },
        value: {
            type: String,
            required: true
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        altText: {
            type: String,
            default: () => "image"
        },
        circle: {
            type: Boolean,
            default: false
        },
        background: {
            type: String,
            default: () => "white"
        }
    },
    emits: ['update:value'],
    data() {
        return {
            internalValue: this.value
        }
    },
    watch: {
        internalValue: {
            handler: function (v: string) {
                //@ts-ignore
                this.$emit('update:value', v);
            }
        }
    }
})

</script>
<style scoped>
.image-container {
    margin-top: 10px;
    display: inline-block;
    overflow: hidden;

    &.circle {
        border-radius: 100%;
        width: 500px;
        height: 500px;
    }

    img {
        max-height: 100%;
        max-width: 100%;
    }
}
</style>
