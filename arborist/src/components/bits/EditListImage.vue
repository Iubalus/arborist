<template>
    <Labelled :label="label">
        <div
            v-for="(v, i) in internalValue"
            :key="i"
            class="image-line"
        >
            <div class="item-row">
                <LabelText
                    v-model:value="v.name"
                    :read-only="readOnly"
                ></LabelText>
                <Btn
                    v-if="!readOnly"
                    text="-"
                    width="30px"
                    @click="() => deleteItem(i)"
                ></Btn>
            </div>
            <ImageUpload
                v-model:value="v.image"
                :read-only="readOnly"
            ></ImageUpload>
        </div>
        <Btn
            v-if="!readOnly"
            right
            width="70px"
            text="+ Add"
            @click="addItem"
        ></Btn>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LabelText from './LabelText.vue';
import Labelled from './Labelled.vue';
import ImageUpload from "./ImageUpload.vue";
import Btn from './Btn.vue';
import type { ImageFile } from '../types/ImageFile';
import type { NamedImage } from '../types/NamedImage';

export default defineComponent({
    components: { LabelText, Labelled, Btn, ImageUpload },
    props: {
        label: {
            type: String,
            default: () => null
        },
        value: {
            type: Array as PropType<NamedImage[]>,
            required: true
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        asRow: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:value'],
    data() {
        return {
            internalValue: this.value as NamedImage[]
        }
    },
    watch: {
        internalValue: {
            handler: function (v: string) {
                //@ts-ignore
                this.$emit('update:value', v);
            },
            deep: true
        }
    },
    methods: {
        addItem() {
            let n = { name: null as unknown as string, image: null as unknown as ImageFile } as NamedImage;
            this.internalValue.push(n);
        },
        deleteItem(index: number) {
            this.internalValue.splice(index, 1);
        }
    }
})

</script>
<style scoped>
.image-line {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;

    &:first-of-type {
        margin-top: 0;
    }

    .item-row {
        display: flex;
        gap: 10px;
    }
}
</style>
