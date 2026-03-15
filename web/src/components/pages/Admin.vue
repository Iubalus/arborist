<script lang="ts">
import {defineComponent} from 'vue'
import {Btn, Card, LabelText, Page, Selct} from "@/components/bits";
import {type Author, authorAPI} from "@/persistence/authorAPI.ts";

export default defineComponent({
  name: "Admin",
  components: {Card, Selct, LabelText, Btn, Page},
  data() {
    return {
      newAuthorName: "",
      authors: [] as Author[],
      innerSelectedAuthor: null as unknown as string,
      selectedAuthor: null as unknown as Author
    }
  },
  async created() {
    this.authors = (await authorAPI().loadAuthors());
  },
  computed: {
    authorOptions() {
      return this.authors
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((v: any) => {
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
  <Page title="Admin" class="admin-style">
    <div style="display:grid; gap:20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
      <Card
          title="Create Author"
          class="admin-style"
      >
        <div
            style="display:grid; gap:10px; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); align-items:end;"
        >
          <LabelText
              v-model:value="newAuthorName"
              style="grid-column: span 2;"
              label="New Author"
          />
          <Btn
              text="Create Author"
              style="filter: grayscale(1);"
              fun
              @click="createAuthor"
          />
        </div>
      </Card>
      <Card
          title="Edit Author"
          class="admin-style"
      >
        <div
            style="display:grid; gap:10px; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); align-items:end;"
        >
          <Selct
              v-if="authorOptions.length > 0"
              v-model:selected="innerSelectedAuthor"
              label="Select Author to Edit"
              :options="authorOptions"
          />
          <LabelText
              v-if="selectedAuthor"
              v-model:value="selectedAuthor.name"
              label="Edit Name"
          />
          <Btn
              v-if="selectedAuthor"
              style="filter: grayscale(1);"
              text="Update Author"
              fun
              @click="updateAuthor"
          />
        </div>
      </Card>
    </div>
  </Page>
</template>

<style scoped>
.admin-style {
  font-family: monospace;
  color: blue;
  text-transform: uppercase;
  background: #eaeaea;
  border-radius: 0;
  box-shadow: 1px 1px 3px gray;
}
</style>