<template>
  <div class="my">
    <h1>My页面</h1>
    <!-- <el-button @click="$router.push('/')">去Home</el-button> -->
    <!-- <img src="@/assets/img/GitHub.png"/> -->
    <iframe id="3rdPartUI-page" ref="3rdPartUI-dom" frameborder="0" scrolling="no"
        :style="{ width: 2300 + 'px', height: 2000 + 'px', marginLeft: 0 + '%', marginTop: '-18px', marginRight: 10 + '%', visibility: '' }"
        src="/#/3rdPartAI">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'My',
}
</script>
<style scoped>
</style>
