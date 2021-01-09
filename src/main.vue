<template>
  <div>
      <router-link to="/main/home">Home</router-link> |
      <router-link to="/main/about">About</router-link> |
      <router-link to="/main/candler">Candler</router-link> |
      <router-link to="/main/message">Message</router-link> |
      <router-link to="/main/echarts">Echarts</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

</style>