<template>
    <Labelled :label="label">        
        <div class="image-container">
            <img :src="url" :alt="altText"></img>
        </div>
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
        url: {
            type: String,
            required: true
        },
        altText: {
            type: String,
            default: () => "image"
        }
    }
})

</script>
<style scoped>
.image-container {
    margin-top: 10px;
    display: inline-block;
    overflow: hidden;

    img {
        max-height: 100%;
        max-width: 100%;
    }
}
</style>
