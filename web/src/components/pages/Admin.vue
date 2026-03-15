<script lang="ts">
import {defineComponent} from 'vue'
import {Btn, LabelText, Page} from "@/components/bits";
import {type Author, authorAPI} from "@/persistence/authorAPI.ts";

export default defineComponent({
  name: "Admin",
  components: {LabelText, Btn, Page},
  data() {
    return {
      newAuthorName: "",
      currentAuthor: null as unknown as Author
    }
  },
  methods: {
    async createAuthor() {
      await authorAPI().createAuthor(this.newAuthorName);
      this.newAuthorName = "";
    },
    async updateAuthor() {
      await authorAPI().updateAuthor(this.currentAuthor);
    }
  }
})
</script>

<template>
  <Page title="Admin">
    <div style="display:grid; gap:10px;align-items:end; grid-template-columns: 2fr 1fr;">
      <LabelText
          v-model:value="newAuthorName"
          label="New Author"
      />
      <Btn
          text="Create Author"
          @click="createAuthor"
      />
      <LabelText
          v-if="currentAuthor"
          v-model:value="currentAuthor.name"
          label="Current Author"
      />
      <Btn
          v-if="currentAuthor"
          text="Update Author"
          @click="updateAuthor"
      />
    </div>
  </Page>
</template>

<style scoped>
</style>