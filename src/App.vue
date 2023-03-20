<template>
  <app-header />
  <router-view/>
  <app-footer />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
#app {
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-display: auto;
  font-size: large;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  //background-color: rgb(255, 250, 199);
  //background-image: url("@/assets/Background.png");
  //color scheme: https://coolors.co/palette/00a6fb-0582ca-006494-003554-051923
}
</style>
