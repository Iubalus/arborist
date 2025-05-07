<template>
    <Page title="Playground" super-header="Hello">
        <Card title="Hello World">
            <Selct label="Hello" v-model:selected="selected" :options="options"></Selct>
            <Btn text="Click Me" @click="() => console.log('hello')"></Btn>
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

        <Card title="Data Import/Export">
            <Btn text="Import" @click="importJSON"></Btn>
            <LabelText label="To Import" big-text v-model:value="toImport" />
            <Btn text="Export" @click="exportJSON"></Btn>
            <pre>{{ exported }}</pre>
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
import { createAPI } from '../../api/mockapi';

export default defineComponent({
    components: { LabelText, Card, EditList, Btn, Page, DragCanvas, DualEditList, Snapshot, Selct },
    data() {
        return {
            testValue: "Hello",
            editList: ["Foo", "Bar", "Baz"],
            doubleList: [{ a: "hello", b: "World" }],
            options: [{ value: "1", label: "Foo" }, { value: "2", label: "Bar" }],
            selected: "1",
            toImport: "",
            exported: ""
        }
    },
    methods: {
        async importJSON() {
            await createAPI().import(JSON.parse(this.toImport));

        },
        async exportJSON() {
            this.exported = await createAPI().export();
        }
    }
})
</script>
<style scoped></style>
