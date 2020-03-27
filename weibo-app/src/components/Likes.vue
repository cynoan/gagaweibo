<template>
  <div id="likes">
    <div class="like-item" v-for="(like,i) of likes" :key="i">
      <img :src="like.avatar" class="user-avatar" />
      <div>
        <span class="user-name">{{like.nickname}}</span>
        <span
          class="user-intro"
        >{{like.intro}}</span>
        <span class="user-fans">粉丝 : {{like.fans}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    likes:{ default:"" }
  }
};
</script>
<style scoped>
#likes{
  padding-bottom: 15px;
}
.like-item {
  box-sizing: border-box;
  display: flex;
  height: 60px;
  padding: 0 15px;
  width: 100vw;
  margin: 15px 0 17px;
}
.like-item:first-child{
  margin-top: 10px;
}
.like-item > div {
  box-sizing: border-box;
  display: flex;
  height: 60px;
  width: 100%;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  overflow: hidden;
}
.user-avatar {
  flex: none;
  box-sizing: border-box;
  border: 1px solid #aaa;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.user-name {
  font-size: 0.98rem;
  font-weight: bold;
}
.user-intro {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.85rem;
}
.user-fans{
  font-size: 0.85rem;
}
</style>