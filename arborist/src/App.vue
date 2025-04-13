<template>
  <div>
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
    <LabelText
      v-model:value="testValue"
    />
    <LabelText
      label="Sample"
      v-model:value="testValue"
    />    
    <LabelText
      label="Sample"
      v-model:value="testValue"
      read-only
    />
    <pre>{{ testValue }}</pre>
    <pre>
      {{ profiles }}
    </pre>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import InterviewSnapshot from './components/InterviewSnapshot.vue';
import { loadProfiles, Profile } from "./data";
import LabelText from "./components/bits/LabelText.vue";
export default defineComponent({
  components: { InterviewSnapshot, LabelText },
  data() {
    return {
      profiles: [],
      selectedProfile: null,
      testValue: "Hello"
    }
  },
  created() {
    this.profiles = loadProfiles();
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
