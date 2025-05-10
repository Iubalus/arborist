<template>
    <Page title="Playground" super-header="Hello">        
        <ImageUpload v-model:value="imageTest" />
        {{ imageTest?.filename }}
        {{ imageTest?.size }}
        {{ imageTest?.type }}
        <img :src="imageTest?.encoded" />
        <Card title="Import/Export All Data">            
            <div v-show="!!message" class="message">
                {{ message }}
            </div>
            <FlexRow>
                <Btn text="Import" @click="importJSON"></Btn>
                <Btn text="Export" @click="exportJSON"></Btn>
                <Btn text="Clear Cached Data" @click="clearCached" />
            </FlexRow>
            <LabelText label="To Import" big-text v-model:value="toImport" />
        </Card>
        <Card title="Hello World">
            <Selct label="Hello" v-model:selected="selected" :options="options"></Selct>
            <Btn fun text="Click Me" @click="() => console.log('hello')"></Btn>
            <Btn label="Nice" text="Click Me" read-only @click="() => console.log('hello')"></Btn>
            <DualEditList v-model:value="doubleList" key-a="a" key-b="b" width-b="30%"></DualEditList>
            <EditList v-model:value="editList" as-row></EditList>
            <EditList v-model:value="editList"></EditList>
            <EditList v-model:value="editList" label="Read Only" read-only></EditList>
        </Card>
        <DragCanvas />
        <Card>
            <LabelText v-model:value="testValue" />
            <LabelText label="Sample" v-model:value="testValue" />
            <LabelText label="Sample" v-model:value="testValue" read-only />
            <LabelText big-text label="Sample" v-model:value="testValue" read-only />
            <LabelText big-text label="Sample" v-model:value="testValue" />
        </Card>
    </Page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Page from '../bits/Page.vue';
import LabelText from '../bits/LabelText.vue';
import Card from '../bits/Card.vue';
import EditList from '../bits/EditList.vue';
import Btn from '../bits/Btn.vue';
import DragCanvas from '../bits/DragCanvas.vue';
import DualEditList from '../bits/DualEditList.vue';
import Snapshot from './Snapshot.vue';
import Selct from '../bits/Selct.vue';
import { clearCachedData, createAPI } from '../../api/mockapi';
import FlexRow from '../bits/FlexRow.vue';
import ImageUpload from '../bits/ImageUpload.vue';
import type { ImageFile } from '../types/ImageFile';

export default defineComponent({
    components: { LabelText, Card, EditList, Btn, Page, DragCanvas, DualEditList, Snapshot, Selct, FlexRow, ImageUpload },
    data() {
        return {
            testValue: "Hello",
            editList: ["Foo", "Bar", "Baz"],
            doubleList: [{ a: "hello", b: "World" }],
            options: [{ value: "1", label: "Foo" }, { value: "2", label: "Bar" }],
            selected: "1",
            toImport: "",
            message: "",
            imageTest: null as unknown as ImageFile
        }
    },
    methods: {
        async importJSON() {
            this.message = "";
            if (!this.toImport) {
                this.message = "Nothing to import";
                return;
            }
            await createAPI().import(JSON.parse(this.toImport));
            this.message = "Imported content";
        },
        async exportJSON() {
            this.message = "";
            let exported = await createAPI().export();
            navigator.clipboard.writeText(JSON.stringify(exported, null, 2));
            this.message = "Exported content to clipboard";
        },
        clearCached() {
            this.message = "";
            clearCachedData();
            this.message = "Cache has been cleared. Refresh to complete the process.";
        }
    }
})
</script>
<style scoped>
.message {
    font-family: monospace;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    padding: 10px;
    background: #e4f6ff;
}
</style>
