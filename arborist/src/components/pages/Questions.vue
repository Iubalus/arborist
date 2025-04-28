<template>
    <Page title="Questions">
        <FlexRow>
            <LabelText v-model:value="newQuestion" label="Question" />
            <Selct label="Type" v-model:selected="newType" :options="typeOptions" />
        </FlexRow>
        <Btn text="Add" />
    </Page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Btn from '../bits/Btn.vue';
import FlexRow from '../bits/FlexRow.vue';
import LabelText from '../bits/LabelText.vue';
import Page from '../bits/Page.vue';
import Selct from '../bits/Selct.vue';

export default defineComponent({
    components: { Page, Btn, FlexRow, LabelText, Selct },
    data() {
        return {
            newQuestion: null as unknown as string,
            newType: null as unknown as string
        }
    },
    computed: {
        typeOptions() {
            return [
                {
                    key: "RESEARCH",
                    label: "Research"
                },
                {
                    key: "INTERVIEW",
                    label: "Interview"
                }
            ]
        }

    }
})
</script>
<style scoped></style>
