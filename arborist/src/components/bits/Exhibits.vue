<template>
    <div>
        <Labelled :label="exhibit.name" v-for="exhibit in exhibits" :key="exhibit.name">
            <div :class="'image-container'">
                <a :href="exhibit.url" target="_blank">
                    <img :src="exhibit.url" :alt="exhibit.name"></img>
                </a>
            </div>
        </Labelled>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Labelled from './Labelled.vue';
import LabelText from './LabelText.vue';

export default defineComponent({
    components: { Labelled, LabelText },
    props: {
        label: {
            type: String,
            default: () => null
        },
        exhibits: {
            type: Array as PropType<{ name: string, url: string }[]>,
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
