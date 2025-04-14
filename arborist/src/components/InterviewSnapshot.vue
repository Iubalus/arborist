<template>
    <Page :title="`${internalProfile.name} at ${internalProfile.company}`" :super-header="`At ${internalProfile.when}`">

        <ImagePane v-model:value="internalProfile.profile" alt-text="Profile" circle background="black" />        
        <EditList v-model:value="internalProfile.memorableQuotes" />
        <EditList label="Present" v-model:value="internalProfile.present" as-row />
        <LabelText v-model:value="internalProfile.interviewQuestion" big-text label="Interview Question">
        </LabelText>
        <FlexRow>
            <EditList label="Quick Facts" v-model:value="internalProfile.quickFacts" />
            <EditList label="Insights" v-model:value="internalProfile.insights" />
        </FlexRow>
        <Card title="Experience Map">
            <ImagePane v-model:value="internalProfile.experienceMap" alt-text="Experience Map" />
            <LabelText v-model:value="internalProfile.story" big-text label="Story"></LabelText>
        </Card>
        <Card title="Maint">
            <FlexRow>
                <LabelText v-model:value="internalProfile.name" label="Name" />
                <LabelText v-model:value="internalProfile.company" label="Company" />
                <LabelText v-model:value="internalProfile.when" label="At" />
            </FlexRow>
        </Card>
    </Page>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import EditList from './bits/EditList.vue';
import Card from './bits/Card.vue';
import LabelText from './bits/LabelText.vue';
import type { Profile } from '../data';
import Page from './bits/Page.vue';
import FlexRow from './bits/FlexRow.vue';
import ImagePane from './bits/ImagePane.vue';

export default defineComponent({
    components: { EditList, Card, LabelText, Page, FlexRow, ImagePane },
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    emits: ['update'],
    data() {
        return {
            internalProfile: this.profile as Profile
        }
    },
    watch: {
        internalProfile: {
            handler: function (v: Profile) {
                //@ts-ignore
                this.$emit('update', v);
            },
            deep: true
        }
    }
})

</script>
<style scoped></style>
