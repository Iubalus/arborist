<template>
    <div class="d-flex gap-2 align-center">
        <Labelled
            :label="`${profile.name}${!profile.image ? ' (not pictured below)' : ''}`"
            v-for="profile in profiles"
            :key="profile.name"
            center
        >
            <div :class="'image-container'">
                <div
                    v-if="!profile.image"
                    class="unpictured"
                >
                    <span>None</span>
                </div>
                <img
                    v-else
                    :src="profile.image.encoded"
                    :alt="profile.name"
                ></img>
            </div>
        </Labelled>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Labelled from '@/components/bits/container/Labelled.vue';
import LabelText from '@/components/bits/text/LabelText.vue';
import type { ImageFile } from './ImageFile';

export default defineComponent({
    components: { Labelled, LabelText },
    props: {
        label: {
            type: String,
            default: () => null
        },
        profiles: {
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
    border-radius: 100%;
    width: 250px;
    height: 250px;
    background: black;

    img {
        max-height: 100%;
        max-width: 100%;
        filter: contrast(175%) brightness(120%) grayscale(60%);
    }

    .unpictured {
        align-content: center;
        height: 100%;
        color: white;
        font-size: 3em;
    }
}
</style>
