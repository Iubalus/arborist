<template>
  <div>
    <div v-for="(profile, i) in profiles" :key="i" class="profile-option" @click="() => selectedProfile = profile">{{
      profile.name }} at {{
        profile.company }} on {{ profile.when }}
    </div>
    <InterviewSnapshot v-if="selectedProfile" :profile="selectedProfile" :key="selectedProfile.id"></InterviewSnapshot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import InterviewSnapshot from './components/InterviewSnapshot.vue';
import { loadProfiles } from "./data";
export default defineComponent({
  components: { InterviewSnapshot },
  data() {
    return {
      profiles: [],
      selectedProfile: null
    }
  },
  created() {
    this.profiles = loadProfiles();
  }
})
</script>
<style scoped>
.profile-option {
  &:hover {
    cursor: pointer;
    background-color: #ebebeb;
  }
}
</style>
