<template>
  <div>
    <div class="header-bar">
      <div class="branding">
        <img alt="Logo" src="/image/arborist-full.png">
      </div>
      <Selct
          v-if="!loading"
          v-model:selected="currentAuthorId"
          :options="authorOptions"
          style="max-width: 150px;"
          label="Editing As"
      />
    </div>
    <div class="navigation">
      <RouterLink
          v-for="(r) in routes"
          :key="r.path"
          :class="['tab', r.path === route ? 'active' : '']" :to="r.path"
      >{{
          r.meta.title
        }}
      </RouterLink>
    </div>
    <main class="main">
      <RouterView/>
    </main>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {Selct} from "@/components/bits";
import {type Author, authorAPI} from "@/persistence/authorAPI.ts";

export default defineComponent({
  components: {Selct},
  data() {
    return {
      loading: true,
      currentAuthorId: null as unknown as string,
      authors: [] as Author[]
    }
  },
  async created() {
    this.currentAuthorId = authorAPI().getCurrentAuthorId();
    this.authors = (await authorAPI().loadAuthors());
    this.loading = false;
  },
  watch: {
    currentAuthorId: function (v) {
      authorAPI().setCurrentAuthor(v);
    }
  },
  computed: {
    authorOptions() {
      return this.authors
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((v: any) => {
        return {
          value: v.authorId,
          label: v.name
        }
      });
    },
    routes() {
      return this.$router.getRoutes();
    },
    route() {
      return this.$route.path;
    }
  }
})
</script>
<style scoped>

.header-bar {
  display: flex;
  gap: 10px;
  align-items: end;
  padding: 0 0 10px 0;
  justify-content: space-between;
}

.navigation {
  padding: 0 0 0 0;
  border-radius: 25px 25px 0 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: end;
}

.branding {
  img {
    height: 120px;
  }
}

.tab {
  padding: 5px 10px;
  background: rgb(245, 245, 245);
  box-sizing: border-box;

  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: max-content;
  max-height: max-content;
  display: block;
  text-align: center;
  color: black;

  &.active {
    background: white;
  }

  &:hover {
    cursor: default;
    background: rgb(235, 235, 235);
  }
}
</style>
