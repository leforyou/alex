<template>
  <div id="app" class="main-width">
    <!--<router-view/>-->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
}
.main-width {
  width: 100%;
  max-width: 10rem;
  margin: 0 auto;
}
</style>

<style lang="scss">
@import "./../static/scss/reset.scss";
</style>
<style lang="scss" >
@import "./../static/scss/main.scss";
</style>
