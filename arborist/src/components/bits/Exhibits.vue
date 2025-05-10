<template>
    <div>
        <Labelled
            v-for="exhibit in exhibits"
            :label="exhibit.name"
            :key="exhibit.name"
        >
            <div :class="'image-container'">
                <a
                    :href="(exhibit.image || {}).encoded"
                    target="_blank"
                >
                    <img
                        :src="(exhibit.image || {}).encoded"
                        :alt="exhibit.name"
                    ></img>
                </a>
            </div>
        </Labelled>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Labelled from './Labelled.vue';
import LabelText from './LabelText.vue';
import type { ImageFile } from '../types/ImageFile';

export default defineComponent({
    components: { Labelled, LabelText },
    props: {
        label: {
            type: String,
            default: () => null
        },
        exhibits: {
            type: Array as PropType<{ name: string, image: ImageFile }[]>,
            required: true
        }
    }
})

</script>
<style scoped>
.image-container {
    margin-top: 10px;
    display: inline-block;
    overflow: hidden;
    background: white;

    img {
        max-height: 100%;
        max-width: 100%;
    }
}
</style>
