<template>
  <div id="likes">
    <div class="like-item" v-for="i of 20" :key="i">
      <img src="../assets/2.jpg" class="user-avatar" />
      <div>
        <span class="user-name">Bobi</span>
        <span
          class="user-intro"
        >Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.</span>
        <span class="user-fans">粉丝 : 358</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
#likes{
  padding-bottom: 15px;
}
.like-item {
  box-sizing: border-box;
  display: flex;
  height: 50px;
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
  height: 50px;
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
  width: 50px;
  height: 50px;
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