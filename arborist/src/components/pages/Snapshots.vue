<template>
    <div>
        <Page
            title="Snapshots"
            :key="reRender"
        >
            <Btn
                text="New"                
                width="80px"
                @click="createNew"
            />
            <ul class="selection-list">
                <li
                    v-for="(snapshot, i) in snapshots"
                    @click="() => selectSnapshot(i)"
                    :key="i"
                    :class="[i === selectedInd ? 'active' : '']"
                >
                    {{ makeTitle(snapshot) }}
                    <span class="date"> {{ makeDate(snapshot) }}</span>
                </li>
            </ul>
        </Page>
        <Snapshot
            :key="selectedInd"
            v-if="snapshots[selectedInd]"
            :snapshot="snapshots[selectedInd]"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { 
    Page,
    Btn,    
 } from '@/components/bits';
import type { SnapshotData } from '../types/Snapshot';
import { makeTitle, snapshotDate } from '../util/snapshot-util';
import Snapshot from './Snapshot.vue';
import { createSnapshot, loadSnapshots } from './SnapshotInteractor';

export default defineComponent({
    components: { Page, Snapshot, Btn },
    data() {
        return {
            reRender: 0,
            selectedInd: null as unknown as number,
            snapshots: [] as SnapshotData[]
        }
    },
    async created() {
        this.snapshots = await loadSnapshots();
    },
    methods: {
        makeTitle(snapshot: SnapshotData): string {
            return makeTitle(snapshot);
        },
        makeDate(snapshot: SnapshotData): string {
            return snapshotDate(snapshot);
        },
        selectSnapshot(index: number) {
            if (this.selectedInd === index) {
                this.selectedInd = null as unknown as number;
            } else {
                this.selectedInd = index;
            }
        },
        async createNew() {
            await createSnapshot();
            this.snapshots = await loadSnapshots();
            this.reRender++;//Todo: Figure out why the snapshots array is losing reactivity
        }
    }
})
</script>
<style scoped>
ul.selection-list {
    padding: 0;
    margin: 10px 0 0 0;
    text-align: left;

    li {
        padding: 10px 20px;
        position: relative;
        list-style-type: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-left: 5px solid #52bafa;
        border-radius: 0 5px 5px 0;
        margin-top: 10px;

        &:first-of-type {
            margin-top: 0;
        }

        &:hover {
            cursor: pointer;
            background: rgb(235, 235, 235);
        }

        &.active {
            font-weight: bold;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, .6);
        }

        .date {
            position: absolute;
            top: 3px;
            right: 3px;
            font-size: 0.7em;
        }
    }

}
</style>
