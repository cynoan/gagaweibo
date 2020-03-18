<template>
  <div class="item">
    <gaga-body :gaga="gaga"></gaga-body>
    <div class="item-bottom">
      <i class="iconfont icon-zhuanhuan" id="relay">
        <span class="count">{{gaga.relay}}</span>
      </i>
      <i class="iconfont icon-icon_message" id="comment">
        <span class="count">{{gaga.comment}}</span>
      </i>
      <i class="iconfont icon-xihuan" id="like">
        <span class="count">{{gaga.like}}</span>
      </i>
      <i class="iconfont icon-star" id="star"></i>
    </div>
  </div>
</template>
<script>
import gagaBody from "./GagaBody";
export default {
  components: {
    gagaBody
  },
  props:{
    gaga:{ default:"" }
  }
};
</script>
<style scoped>
.item {
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  margin-top: 4px;
}
.item>>>.txt{
  line-height: 24px;
}
.item-bottom {
  display: flex;
  height: 30px;
  padding-left: 71px;
  margin-bottom: 10px;
}
.item-bottom > i {
  display: flex;
  font-size: 19px;
  width: 80px;
  text-align: left;
  line-height: 30px;
}
.item-bottom > #relay{
  font-size: 15px;
}
.item-bottom > #comment {
  font-size: 16px;
}
.item-bottom > #like {
  font-size: 15px;
  font-weight: bold;
  opacity: 0.8;
}
.item-bottom > #star {
  font-size: 19px;
}
.item-bottom > i > span {
  font-size: 14px;
  font-weight: normal;
  opacity: 1;
  line-height: 30px;
  margin-left: 5px;
}
</style>