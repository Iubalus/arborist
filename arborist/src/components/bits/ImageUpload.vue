<template>
    <div>
        <input @change="handleImage" type="file" accept="image/*">
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ImageFile } from '../types/ImageFile';

export default defineComponent({
    props: {
        value: {
            type: Object as PropType<ImageFile>,
            required: true
        }
    },
    emits: ["update:value"],
    data() {
        return {
            internalImage: this.value as ImageFile
        }
    },
    methods: {
        handleImage(e: any) {
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
            handler: function (v) {
                if (this.value !== v) {
                    this.$emit("update:value", v);
                }
            }
        }
    }
})

</script>
<style scoped></style>
