<template>
  <div class="float-tab">
    <div class="branding">
      <img alt="Logo" src="/image/arborist-full.png">
    </div>
    <table class="tabs">
      <tbody>
      <tr
          v-for="(r) in routes"
          :key="r.path"
      >
        <td :class="['tab', r.path === route ? 'active' : '']">
          <RouterLink :to="r.path">{{ r.meta.title }}</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <nav>
  </nav>
  <main class="main">
    <RouterView/>
  </main>
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
.main {
  margin-left: 230px;
}

.float-tab {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 230px;
  z-index: 2;
  overflow: hidden;

  .branding {
    margin-left: 10px;

    img {
      height: 150px;
    }
  }

  table {
    width: 100%;
  }
}


.tab {
  padding: 10px 10px 10px 10px;
  background: rgb(245, 245, 245);
  border-radius: 25px 0 0 25px;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: right;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  > a {
    width: 100%;
    display: block;
    text-align: center;
    color: black;
  }

  &.active {
    font-weight: bold;
    background: white;
  }

  &:hover {
    cursor: pointer;
    background: rgb(235, 235, 235);
  }
}
</style>
