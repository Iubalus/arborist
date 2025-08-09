<template>
    <div>
        <Page
            :title="title"
            :super-header="snapshotDate"
        >
            <Btn
                v-show="!showEdit"
                text="&#9998; Edit"
                width="100px"
                @click="() => showEdit = true"
            />
            <FlexRow>
                <Card
                    v-show="showEdit"
                    title="Edit values"
                    min-width="50%"
                    closable
                    @close="() => showEdit = false"
                >
                    <FlexRow>
                        <LabelText
                            label="Company"
                            v-model:value="internalSnapshot.company"
                        />
                        <DateTime
                            label="When"
                            v-model:value="internalSnapshot.date"
                        />
                    </FlexRow>
                    <LabelText
                        label="Recording URL"
                        v-model:value="internalSnapshot.recordingURL"
                    />
                    <EditListImage
                        label="Interviewees"
                        v-model:value="internalSnapshot.interviewees"
                        key-a="name"
                        width-a="50%"
                        key-b="profileURL"
                    />
                    <EditList
                        label="Interviewers"
                        v-model:value="internalSnapshot.interviewers"
                    />
                    <Selct
                        label="Lead Interviewer"
                        v-model:selected="internalSnapshot.leadInterviewer"
                        :options="interviewerOptions"
                    />
                    <DualEditList
                        label="Memorable Quotes"
                        v-model:value="internalSnapshot.memorableQuotes"
                        key-a="quote"
                        key-b="from"
                        width-b="30%"
                    />
                    <EditList
                        label="Quick Facts"
                        v-model:value="internalSnapshot.quickFacts"
                    />
                    <EditList
                        label="Insights"
                        v-model:value="internalSnapshot.insights"
                    />
                    <EditList
                        :key="rawOpportunities.length"
                        label="Opportunities"
                        v-model:value="rawOpportunities"
                    />
                    <EditListImage
                        label="Exhibits"
                        v-model:value="internalSnapshot.exhibits"
                        key-a="name"
                        key-b="url"
                        width-a="20%"
                    />
                    <ImageUpload
                        label="Experience Map URL"
                        v-model:value="internalSnapshot.experienceMap"
                    />
                    <EditList
                        label="Moments in Time"
                        v-model:value="internalSnapshot.momentsInTime"
                    />
                    <LabelText
                        label="Story"
                        big-text
                        v-model:value="internalSnapshot.story"
                    />
                </Card>
                <div class="preview-pane">
                    <a
                        v-if="!!internalSnapshot.recordingURL"
                        :href="internalSnapshot.recordingURL"
                    >
                        Recording [link] &#8617;
                    </a>
                    <ProfileImages :profiles="internalSnapshot.interviewees" />
                    <QuoteDisplay :quotes="internalSnapshot.memorableQuotes" />
                    <FlexRow>
                        <PresentDisplay
                            label="Present"
                            :lead-interviewer="internalSnapshot.leadInterviewer"
                            :interviewees="internalSnapshot.interviewees.map(v => v.name)"
                            :interviewers="internalSnapshot.interviewers"
                        />
                        <DisplayList
                            label="Quick Facts"
                            :values="internalSnapshot.quickFacts"
                        />
                    </FlexRow>
                    <DisplayList
                        label="Insights"
                        :values="internalSnapshot.insights"
                    />
                    {{ opportunities }}
                    <Exhibits :exhibits="internalSnapshot.exhibits" />
                    <LabelImage
                        v-if="!!internalSnapshot.experienceMap"
                        :url="internalSnapshot.experienceMap.encoded"
                        label="Experience Map"
                    />
                    <DisplayList
                        label="Moments in Time"
                        :values="internalSnapshot.momentsInTime"
                    />
                    <DisplayTextBlock
                        label="Story"
                        :text="internalSnapshot.story"
                    />
                </div>
            </FlexRow>
        </Page>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { 
    Page,
    Card,
    DateTime,
    DisplayList,
    DisplayTextBlock,
    DualEditList,
    EditList,
    Exhibits,
    FlexRow,
    LabelImage,
    LabelText,
    PresentDisplay,
    ProfileImages,
    QuoteDisplay,
    Selct,
    Btn,
    EditListImage,
    ImageUpload
 } from '../bits';

import { makeTitle, snapshotDate } from '../util/snapshot-util';
import type { SnapshotData } from '../types/Snapshot';
import type { Opportunity } from '../types/Opportunity';
import { createAPI } from '../../api/mockapi';

export default defineComponent({
    components: { Page, QuoteDisplay, EditListImage, DualEditList, Card, FlexRow, LabelText, EditList, Selct, PresentDisplay, ProfileImages, DisplayList, DisplayTextBlock, Exhibits, LabelImage, DateTime, Btn, ImageUpload },
    props: {
        snapshot: {
            type: Object as PropType<SnapshotData>,
            required: true
        }
    },
    emits: ['update'],
    data() {
        return {
            showEdit: !this.snapshot.company,
            internalSnapshot: this.snapshot,
            rawOpportunities: [] as String[],
            opportunities: [] as Opportunity[]
        }
    },
    async created() {
        this.opportunities = await createAPI().findSnapshotOpportunities(this.snapshot.id)
        this.rawOpportunities = this.opportunities.map(v => v.text);
    },
    watch: {
        internalSnapshot: {
            handler: async function (v) {
                this.$emit("update", v);
                await createAPI().saveSnapshot(v);
            },
            deep: true
        },
        rawOpportunities: {
            handler: async function () {
                if (this.opportunities.length < this.rawOpportunities.length) {
                    //insertion
                    let opportunity = {
                        opportunityId: null as unknown as String,
                        parentOpportunityId: null as unknown as String,
                        text: this.rawOpportunities[this.rawOpportunities.length - 1],
                        snapshotIds: [this.snapshot.id]
                    } as Opportunity
                    let newId = await createAPI().saveOpportunity(opportunity);
                    opportunity.opportunityId = newId;
                    this.opportunities.push(opportunity);
                } else if (this.opportunities.length > this.rawOpportunities.length) {
                    //deletion
                    let toRemove = this.opportunities.find(v => !this.rawOpportunities.includes(v.text))
                    if (!toRemove) {
                        return;
                    }
                    toRemove.snapshotIds = toRemove.snapshotIds.filter(v => v !== this.snapshot.id);
                    await createAPI().saveOpportunity(toRemove);
                    this.opportunities = this.opportunities.filter(v => v.opportunityId !== toRemove.opportunityId);
                } else {
                    //modification
                    for (let i = 0; i < this.rawOpportunities.length; i++) {
                        if (this.rawOpportunities[i] !== this.opportunities[i].text) {
                            this.opportunities[i].text = this.rawOpportunities[i];
                            await createAPI().saveOpportunity(this.opportunities[i]);
                        }
                    }
                }
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
<style scoped>
.preview-pane {
    padding: 10px;
}
</style>
