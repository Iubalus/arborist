<script lang="ts">
import {defineComponent} from 'vue'
import {Btn, LabelText, Page, Selct} from "@/components/bits";
import {type Author, authorAPI} from "@/persistence/authorAPI.ts";

export default defineComponent({
  name: "Admin",
  components: {Selct, LabelText, Btn, Page},
  data() {
    return {
      newAuthorName: "",
      authors: [] as any,
      innerSelectedAuthor: null as unknown as string,
      selectedAuthor: null as unknown as Author
    }
  },
  async created() {
    this.authors = (await authorAPI().loadAuthors());
  },
  computed: {
    selectableAuthor() {
      return this.authors.map((v: any) => {
        return {
          value: JSON.stringify(v),
          label: v.name
        }
      })
    }
  },
  watch: {
    innerSelectedAuthor: function (v) {
      if (!!v) {
        this.selectedAuthor = JSON.parse(v);
      }
    }
  },
  methods: {
    async createAuthor() {
      await authorAPI().createAuthor(this.newAuthorName);
      this.authors = (await authorAPI().loadAuthors());
      this.newAuthorName = "";

    },
    async updateAuthor() {
      await authorAPI().updateAuthor(this.selectedAuthor);
      this.authors = (await authorAPI().loadAuthors());
    }
  }
})
</script>

<template>
  <Page title="Admin">
    <div style="display:grid; gap:10px;align-items:end; grid-template-columns: 1fr 1fr 1fr;">
      <LabelText
          v-model:value="newAuthorName"
          style="grid-column: span 2;"
          label="New Author"
      />
      <Btn
          text="Create Author"
          @click="createAuthor"
      />
      <Selct
          v-if="selectableAuthor.length > 0"
          v-model:selected="innerSelectedAuthor"
          label="Select Author to Edit"
          :options="selectableAuthor"
      />
      <LabelText
          v-if="selectedAuthor"
          v-model:value="selectedAuthor.name"
          label="Current Author"
      />
      <Btn
          v-if="selectedAuthor"
          text="Update Author"
          @click="updateAuthor"
      />
    </div>
  </Page>
</template>

<style scoped>
</style>