<template>
  <div class="float-tab">
    <div class="branding">
      <img alt="Logo" src="/image/arborist-full.png"></img>
    </div>
    <table class="tabs">
      <tbody>
      <tr>
        <td>
          <RouterLink to="/">Home</RouterLink>
        </td>
      </tr>
      <tr>
        <td>
          <RouterLink to="/grand-tree">Grand Tree</RouterLink>
        </td>
      </tr>
      <tr>
        <td>
          <RouterLink to="/outcomes">Outcomes</RouterLink>
        </td>
      </tr>
      <tr>
        <td>
          <RouterLink to="/questions">Questions</RouterLink>
        </td>
      </tr>
      <tr>
        <td>
          <RouterLink to="/opportunity-solution-tree">Opportunity Solution Tree</RouterLink>
        </td>
      </tr>
      <tr>
        <td>
          <RouterLink to="/snapshots">Snapshots</RouterLink>
        </td>
      </tr>
      <tr>
        <td>
          <RouterLink to="/playground">Playground</RouterLink>
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


.tabs > tbody > tr > td {
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
