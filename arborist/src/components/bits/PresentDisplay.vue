<template>
    <Labelled :label="label">
        <div class="present-display">
            <div>
                <strong>Interviewers:</strong> {{ interviewerDisplay || 'none' }}
            </div>
            <div>
                <strong>Interviewing:</strong> {{ interviewing || 'none' }}
            </div>
        </div>
    </Labelled>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Labelled from './Labelled.vue';
import { dolist } from '../util/list-util';

export default defineComponent({
    components: { Labelled },
    props: {
        label: {
            type: String,
            default: () => null
        },
        leadInterviewer: {
            type: String,
            default: () => null
        },
        interviewers: {
            type: Array as PropType<String[]>,
            default: () => []
        },
        interviewees: {
            type: Array as PropType<String[]>,
            default: () => []
        }
    },
    computed: {
        interviewerDisplay(): String {
            return dolist(this.interviewers.map(v => {
                return v === this.leadInterviewer ? `${v} (Leading)` : v;
            }));
        },
        interviewing(): String {
            return dolist(this.interviewees);
        }
    }
})

</script>
<style scoped>
.present-display {
    padding: 0 10px 10px 10px;
    text-align: left;
}
</style>
