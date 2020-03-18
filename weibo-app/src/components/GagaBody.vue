<template>
  <div id="gbody">
    <item-header :isComment="isComment" :gaga="gaga"></item-header>
    <div id="content">
      <p class="txt" v-html="gaga.content"></p>
    </div>
    <div v-if="gaga.isRelay" id="origin">
      <p class="txt">
        <a href="javascript:;" class="author">{{gaga.originAuthor}}：</a>
        <span v-html="gaga.originContent"></span>
      </p>
    </div>
  </div>
</template>
<script>
import itemHeader from "./ItemHeader";
export default {
  props: {
    isComment: { default: false },
    gaga: { default: "" }
  },
  components: {
    itemHeader
  }
};
</script>
<style scoped>
#gbody {
  padding-top: 10px;
}
#origin {
  box-sizing: border-box;
  background-color: #eee;
  margin: 0 15px 5px 66px;
  text-align: left;
  border-radius: 4px;
}
#origin > .txt {
  box-sizing: border-box;
  padding: 10px;
  font-size: 0.98rem;
}
.author {
  text-decoration: none;
  color: #3464be;
  font-size: 0.98rem;
}
#content > .txt {
  margin: 7px 15px 7px 66px;
  text-align: left;
  font-size: 0.98rem;
  line-height: 24px;
}
</style>