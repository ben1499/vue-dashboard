<template>
  <div id="app">
    <side-bar></side-bar>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>

import SideBar from './components/SideBar.vue'
import Header from './components/HeaderComp.vue'


export default {
  name: 'App',
  components: {
    'side-bar': SideBar,
    'app-header': Header,

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  gap: 10px;

}

* {
  margin: 0;
  padding: 0;
}

a {
    text-decoration: none;
}

</style>
