<template>
    <div>
        <Page :title="title"
            :super-header="`${internalSnapshot.date.toLocaleDateString()} ${internalSnapshot.date.toLocaleTimeString()}`">
            <FlexRow>
                <Card title="Edit values" min-width="50%">
                    <LabelText label="Company" v-model:value="internalSnapshot.company"></LabelText>
                    <DualEditList label="Interviewees" v-model:value="internalSnapshot.interviewees" key-a="name"
                        width-a="50%" key-b="profileURL" />
                    <EditList label="Interviewers" v-model:value="internalSnapshot.interviewers" />
                    <Selct label="Lead Interviewer" v-model:selected="internalSnapshot.leadInterviewer"
                        :options="interviewerOptions" />
                    <DualEditList label="Memorable Quotes" v-model:value="internalSnapshot.memorableQuotes"
                        key-a="quote" key-b="from" width-b="30%" />
                    <EditList label="Quick Facts" v-model:value="internalSnapshot.quickFacts" />
                </Card>
                <div>
                    <ProfileImages :profiles="internalSnapshot.interviewees" />
                    <QuoteDisplay :quotes="internalSnapshot.memorableQuotes" />
                    <FlexRow>
                        <PresentDisplay label="Present" :lead-interviewer="internalSnapshot.leadInterviewer"
                            :interviewees="internalSnapshot.interviewees.map(v => v.name)"
                            :interviewers="internalSnapshot.interviewers" />
                        <DisplayList label="Quick Facts" :values="internalSnapshot.quickFacts" />
                    </FlexRow>
                </div>
            </FlexRow>
        </Page>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { SnapshotData } from '../../snapshot-api';
import Page from '../bits/Page.vue';
import QuoteDisplay from '../bits/QuoteDisplay.vue';
import DualEditList from '../bits/DualEditList.vue';
import Card from '../bits/Card.vue';
import FlexRow from '../bits/FlexRow.vue';
import LabelText from '../bits/LabelText.vue';
import EditList from '../bits/EditList.vue';
import Selct from '../bits/Selct.vue';
import PresentDisplay from '../bits/PresentDisplay.vue';
import { dolist } from '../bits/list-util';
import ProfileImages from '../bits/ProfileImages.vue';
import DisplayList from '../bits/DisplayList.vue';

export default defineComponent({
    components: { Page, QuoteDisplay, DualEditList, Card, FlexRow, LabelText, EditList, Selct, PresentDisplay, ProfileImages, DisplayList },
    props: {
        snapshot: {
            type: Object as PropType<SnapshotData>,
            required: true
        }
    },
    emits: ['update'],
    data() {
        return {
            internalSnapshot: this.snapshot
        }
    },
    watch: {
        internalSnapshot: {
            handler: function (v) {
                this.$emit("update", v);
            },
            deep: true
        }
    },
    computed: {
        title(): string {
            return `#${this.internalSnapshot.id} ${dolist(this.internalSnapshot.interviewees.map(v => v.name))} at ${this.internalSnapshot.company}`
        },
        interviewerOptions(): { label: string, value: string }[] {
            return this.internalSnapshot.interviewers.map(v => { return { label: v, value: v } });
        }
    }
})

</script>
<style scoped></style>
