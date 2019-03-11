<template>
  <div id="app" class="main-width">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.main-width{
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
