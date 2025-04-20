<template>
    <Labelled :label="label">
        <div class="text-block">
            {{ text }}
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
        text: {
            type: String,
            required: true
        }
    }
})

</script>
<style scoped>
.text-block {
    background: white;
    text-align: left;
    padding: 10px;    
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
}
</style>
