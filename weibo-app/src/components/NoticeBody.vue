<template>
  <div id="nbody">
    <item-header :gaga="gaga" :isCommMe="isCommMe" :isMyComms="isMyComms"></item-header>
    <div id="content">
      <p class="txt" v-html="isLikeMe ?'赞了这条微博':gaga.content"></p>
    </div>

    <div id="origin" v-if="gaga.isComm">
      <p>
        <a href="javascript:;" class="at-name">@{{gaga.commAuthor}}</a>
        :{{gaga.commContent}}
      </p>
      <div>
        <div class="origin-pic" :style="`background-image:url(${require('../assets/'+ gaga.originAvatar)})`"></div>
        <div class="origin-content">
          <span>@{{gaga.originAuthor}}</span>
          <p v-html="gaga.originContent"></p>
        </div>
      </div>
    </div>
    <div id="origin" class="notComm" v-else>
      <div class="origin-pic" :style="`background-image:url(${require('../assets/' + gaga.originAvatar)})`"></div>
      <div class="origin-content">
        <span>@{{gaga.originAuthor}}</span>
        <p v-html="gaga.originContent"></p>
      </div>
    </div>
    <div class="divide-line"></div>
  </div>
</template>
<script>
import itemHeader from "./ItemHeader";
export default {
  props: {
    gaga: { default: "" },
    isCommMe: { default: false },
    isLikeMe: { default: false },
    isMyComms: { default: false },
  },
  components: {
    itemHeader
  }
};
</script>
<style scoped>
#content > .txt {
  margin: 8px 15px 8px 0;
  text-align: left;
  font-size: 0.98rem;
  padding: 0 15px;
  line-height: 24px;
}
#origin {
  box-sizing: border-box;
  background-color: #eee;
  text-align: left;
  display: flex;
  flex-direction: column;
  border: 2px solid #eee;
  padding: 0 15px;
  border-bottom: 1px solid #ccc;
}
#origin.notComm {
  flex-direction: row;
  border-radius: 4px;
  margin: 0 15px;
  padding: 0;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
}
#origin > p {
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  margin: 8px 0;
}
#origin > p > a {
  display: block;
}
#origin > div {
  box-sizing: border-box;
  display: flex;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
}
#origin.notComm > div {
  margin-bottom: 0;
  background-color: #eee;
}
.origin-pic {
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.origin-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.origin-content > span {
  line-height: 24px;
}
.origin-content > p {
  font-size: 14px;
  line-height: 24px;
  font-size: 0.8125rem;
}
.item:not(:last-child) > .divide-line {
  background-color: #eee;
  width: 100vw;
  height: 10px;
  box-shadow: 0 0 5px 0 #d8d8d8 inset;
}
</style>