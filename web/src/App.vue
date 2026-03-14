<template>
  <div>
    <div class="header-bar">
      <div class="branding">
        <img alt="Logo" src="/image/arborist-full.png">
      </div>
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

export default defineComponent({
  components: {},
  computed: {
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
