<template>
  <div id="title-back">
    <router-link :to="{name:title.to}">
      <i class="iconfont icon-icon_left back"></i>
    </router-link>
    <span>{{title.title}}</span>
  </div>
</template>
<script>
export default {
  props:{ title:{ default:"" } }
};
</script>
<style scoped>
#title-back {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 50px;
  padding: 0 15px;
}
#title-back span {
  display: block;
  font-size: 1.125rem;
}
.back {
  font-size: 1.125rem;
}
</style>