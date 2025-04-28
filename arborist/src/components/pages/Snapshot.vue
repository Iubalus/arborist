<template>
    <div>
        <Page :title="title" :super-header="snapshotDate">
            <FlexRow>
                <Card title="Edit values" min-width="50%">
                    <FlexRow>
                        <LabelText label="Company" v-model:value="internalSnapshot.company" />
                        <DateTime label="When" v-model:value="internalSnapshot.date" />
                    </FlexRow>
                    <LabelText label="Recording URL" v-model:value="internalSnapshot.recordingURL" />
                    <DualEditList label="Interviewees" v-model:value="internalSnapshot.interviewees" key-a="name"
                        width-a="50%" key-b="profileURL" />
                    <EditList label="Interviewers" v-model:value="internalSnapshot.interviewers" />
                    <Selct label="Lead Interviewer" v-model:selected="internalSnapshot.leadInterviewer"
                        :options="interviewerOptions" />
                    <DualEditList label="Memorable Quotes" v-model:value="internalSnapshot.memorableQuotes"
                        key-a="quote" key-b="from" width-b="30%" />
                    <EditList label="Quick Facts" v-model:value="internalSnapshot.quickFacts" />
                    <EditList label="Insights" v-model:value="internalSnapshot.insights" />
                    <DualEditList label="Exhibits" v-model:value="internalSnapshot.exhibits" key-a="name" key-b="url"
                        width-a="20%" />
                    <LabelText label="Experience Map URL" v-model:value="internalSnapshot.experienceMapURL" />
                    <EditList label="Moments in Time" v-model:value="internalSnapshot.momentsInTime" />
                    <LabelText label="Story" big-text v-model:value="internalSnapshot.story" />
                </Card>
                <div>
                    <a :href="internalSnapshot.recordingURL">Recording [link] &#8617;</a>
                    <ProfileImages :profiles="internalSnapshot.interviewees" />
                    <QuoteDisplay :quotes="internalSnapshot.memorableQuotes" />
                    <FlexRow>
                        <PresentDisplay label="Present" :lead-interviewer="internalSnapshot.leadInterviewer"
                            :interviewees="internalSnapshot.interviewees.map(v => v.name)"
                            :interviewers="internalSnapshot.interviewers" />
                        <DisplayList label="Quick Facts" :values="internalSnapshot.quickFacts" />
                    </FlexRow>
                    <DisplayList label="Insights" :values="internalSnapshot.insights" />
                    <Exhibits :exhibits="internalSnapshot.exhibits" />
                    <LabelImage :url="internalSnapshot.experienceMapURL" label="Experience Map" />
                    <DisplayList label="Moments in Time" :values="internalSnapshot.momentsInTime" />
                    <DisplayTextBlock label="Story" :text="internalSnapshot.story" />
                </div>
            </FlexRow>
        </Page>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Card from '../bits/Card.vue';
import DateTime from '../bits/DateTime.vue';
import DisplayList from '../bits/DisplayList.vue';
import DisplayTextBlock from '../bits/DisplayTextBlock.vue';
import DualEditList from '../bits/DualEditList.vue';
import EditList from '../bits/EditList.vue';
import Exhibits from '../bits/Exhibits.vue';
import FlexRow from '../bits/FlexRow.vue';
import LabelImage from '../bits/LabelImage.vue';
import LabelText from '../bits/LabelText.vue';
import Page from '../bits/Page.vue';
import PresentDisplay from '../bits/PresentDisplay.vue';
import ProfileImages from '../bits/ProfileImages.vue';
import QuoteDisplay from '../bits/QuoteDisplay.vue';
import Selct from '../bits/Selct.vue';
import { makeTitle, snapshotDate } from '../bits/snapshot-util';
import type { SnapshotData } from '../types/Snapshot';

export default defineComponent({
    components: { Page, QuoteDisplay, DualEditList, Card, FlexRow, LabelText, EditList, Selct, PresentDisplay, ProfileImages, DisplayList, DisplayTextBlock, Exhibits, LabelImage, DateTime },
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
            return makeTitle(this.internalSnapshot);
        },
        snapshotDate(): string {
            return snapshotDate(this.internalSnapshot);
        },
        interviewerOptions(): { label: string, value: string }[] {
            return this.internalSnapshot.interviewers.map(v => { return { label: v, value: v } });
        }
    }
})

</script>
<style scoped></style>
