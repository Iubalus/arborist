<template>
    <Page title="Coming Soon">
        <LabelText v-model:value="equation" label="Equation" />
        <pre>{{ equation }}</pre>
    </Page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Page from '../bits/Page.vue';
import LabelText from '../bits/LabelText.vue';

export default defineComponent({
    components: { Page, LabelText },
    data() {
        return {
            equation: "",
        }
    },
    computed: {

    }
})
</script>
<style scoped></style>
