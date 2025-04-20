<template>
    <FlexRow>
        <Labelled :label="profile.name" v-for="profile in profiles" :key="profile.name" center>
            <div :class="'image-container'">
                <img :src="profile.profileURL" :alt="profile.name"></img>
            </div>
        </Labelled>
    </FlexRow>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Labelled from './Labelled.vue';
import LabelText from './LabelText.vue';
import FlexRow from './FlexRow.vue';

export default defineComponent({
    components: { Labelled, LabelText, FlexRow },
    props: {
        label: {
            type: String,
            default: () => null
        },
        profiles: {
            type: Array as PropType<{ name: string, profileURL: string }[]>,
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
}
</style>
