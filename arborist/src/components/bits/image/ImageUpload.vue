<template>
    <Labelled :label="label">
        <div class="image-select">
            <input
                @change="handleImage"
                type="file"
                accept="image/*"
            >
            <span :title="`${internalImage?.filename}, ${internalImage?.size} bytes, ${internalImage?.type}`">
                {{ (internalImage || {}).filename }}
            </span>
        </div>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { createAPI } from '../../../api/mockapi';
import Labelled from '../container/Labelled.vue';
import type { ImageFile } from './ImageFile';

export default defineComponent({
    components: { Labelled },
    props: {
        label: {
            type: String,
            default: () => null
        },
        value: {
            type: Object as PropType<ImageFile>,
            default: () => null
        }
    },
    emits: ["update:value"],
    data() {
        return {
            internalImage: this.value as ImageFile
        }
    },
    methods: {
        async handleImage(e: any) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    this.internalImage.encoded = reader.result.toString();
                }
            };
            let file = e.target.files[0]
            this.internalImage = {
                filename: file.name,
                size: file.size,
                type: file.type,
                encoded: ""
            };
            reader.readAsDataURL(file);
        }
    },
    watch: {
        value: {
            handler: function (v) {
                this.internalImage = v;
            }
        },
        internalImage: {
            handler: async function (v) {
                if (this.value !== v) {
                    await createAPI().saveImage(this.internalImage);
                    this.$emit("update:value", v);
                }
            }
        }
    }
})

</script>
<style scoped>
.image-select {
    margin-top: 12px;
    display: flex;
    gap: 10px;
    width: 100%;

    input.fun {
        box-shadow: 0 0 1px 1px rgb(211, 210, 210);

        &::file-selector-button {
            font-family: monospace;
            width: 100%;
            text-align: center;
            padding: 3px 10px;
            box-sizing: border-box;
            background: rgb(209, 240, 255);
            border: solid 1px rgb(128, 128, 128);
            box-shadow: 0 0 1px 1px rgb(211, 210, 210);
            border-top: 2px solid white;
            border-left: 2px solid white;
            border-right: 2px solid gray;
            border-bottom: 2px solid gray;
            text-shadow:
                1px 0px 1px white,
                1px 1px 1px white;
        }

        &:hover::file-selector-button {
            cursor: pointer;
            border-top: 2px solid darkgray;
            border-left: 2px solid darkgray;
            border-right: 2px solid transparent;
            border-bottom: 2px solid transparent;
            background: rgb(175, 201, 214);
        }
    }

    input:not(.fun) {

        box-shadow: 0 0 1px 1px rgb(211, 210, 210);
        border-radius: 25px;

        &::file-selector-button {
            font-family: monospace;
            width: 100%;
            text-align: center;
            padding: 3px 10px;
            box-sizing: border-box;
            background: rgb(209, 240, 255);
            border-radius: 25px;
            line-height: 20px;
            border: none;
        }

        &:hover::file-selector-button {
            cursor: pointer;
            background: rgb(175, 201, 214);
        }
    }

    >span {
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>
