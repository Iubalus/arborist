<template>
  <div>
    <Snapshot v-if="snapshots.length > 0" :snapshot="snapshots[0]"></Snapshot>
    <div class="interview-panel">
      <div>
        <div v-for="(profile, i) in profiles" :key="i" class="profile-option" @click="() => selectedProfile = profile">
          {{
            profile.name }} at {{
            profile.company }} on {{ profile.when }}
        </div>
      </div>
      <div>
        <InterviewSnapshot v-if="selectedProfile" :profile="selectedProfile"
          @update="(v: Profile) => selectedProfile = { ...selectedProfile, ...v }" :key="selectedProfile.id">
        </InterviewSnapshot>
      </div>
    </div>
    <Page title="Sample Page" super-header="Hello">
      <Card title="Hello World">
        <Selct label="Hello" v-model:selected="selected" :options="options" ></Selct>        
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
    </Page>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import InterviewSnapshot from './components/InterviewSnapshot.vue';
import { loadProfiles, type Profile } from "./data";
import LabelText from "./components/bits/LabelText.vue";
import Card from "./components/bits/Card.vue";
import EditList from "./components/bits/EditList.vue";
import Btn from "./components/bits/Btn.vue";
import Page from "./components/bits/Page.vue";
import DragCanvas from "./components/DragCanvas.vue";
import DualEditList from "./components/bits/DualEditList.vue";
import Snapshot from "./components/pages/Snapshot.vue";
import { loadSnapshots, type SnapshotData } from "./snapshot-api";
import Selct from "./components/bits/Selct.vue";
export default defineComponent({
  components: { InterviewSnapshot, LabelText, Card, EditList, Btn, Page, DragCanvas, DualEditList, Snapshot, Selct },
  data() {
    return {
      profiles: [] as Profile[],
      snapshots: [] as SnapshotData[],
      selectedProfile: null as unknown as Profile,
      testValue: "Hello",
      editList: ["Foo", "Bar", "Baz"],
      doubleList: [{ a: "hello", b: "World" }],
      options: [{ value: "1", label: "Foo" }, { value: "2", label: "Bar" }],
      selected: "1"
    }
  },
  async created() {
    this.profiles = loadProfiles();
    this.snapshots = await loadSnapshots();
  }
})
</script>
<style scoped>
.interview-panel {
  display: flex;
  gap: 20px;

  div:first-of-type {
    flex-grow: 1;
  }

  .profile-option {
    text-wrap: nowrap;
    text-align: left;
    padding: 5px 10px;

    &:hover {
      cursor: pointer;
      background-color: #ebebeb;
    }
  }
}
</style>
