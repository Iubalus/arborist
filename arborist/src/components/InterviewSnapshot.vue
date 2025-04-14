<template>
    <Page :title="`${internalProfile.name} at ${internalProfile.company}`" :super-header="`At ${internalProfile.when}`">
        <div class="snapshot">
            <div class="profile">
                <img :src="internalProfile.profile" alt="profile"></img>
            </div>
            <EditList v-model:value="internalProfile.memorableQuotes" />
            <EditList label="Present" v-model:value="internalProfile.present" as-row />
            <LabelText v-model:value="internalProfile.interviewQuestion" big-text label="Interview Question">
            </LabelText>
            <div class="lists">
                <EditList label="Quick Facts" v-model:value="internalProfile.quickFacts" />
                <EditList label="Insights" v-model:value="internalProfile.insights" />
            </div>
            <Card title="Experience Map">
                <div class="experience-map">
                    <div>
                        <img :src="internalProfile.experienceMap" alt="experience map"></img>
                    </div>
                    <LabelText v-model:value="internalProfile.story" big-text></LabelText>
                </div>
            </Card>
        </div>
    </Page>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import EditList from './bits/EditList.vue';
import Card from './bits/Card.vue';
import LabelText from './bits/LabelText.vue';
import type { Profile } from '../data';
import Page from './bits/Page.vue';

export default defineComponent({
    components: { EditList, Card, LabelText, Page },
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
<style scoped>
.profile {
    display: inline-block;
    width: 500px;
    height: 500px;
    border-radius: 100%;
    overflow: hidden;
    background: black;

    img {
        max-height: 100%;
        max-width: 100%;
    }
}

.lists {
    display: flex;
    gap: 10px;
    align-content: center;
}

.experience-map {
    position: relative;
    padding-top: 20px;
    margin-top: 15px;
    display: block;

    div {
        width: 100%;
        max-height: 500px;
        overflow: hidden;
        background: white;
        border-radius: 5px;

        img {
            max-height: 100%;
            max-width: 100%;
        }
    }
}
</style>
