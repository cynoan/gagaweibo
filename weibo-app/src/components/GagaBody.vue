<template>
  <div id="gbody">
    <item-header :isComment="isComment" :gaga="gaga"></item-header>
    <div id="content">
      <p class="txt" v-html="gaga.content"></p>
    </div>
    <div v-if="gaga.isRelay == 1" id="origin">
      <p class="txt">
        <a href="javascript:;" class="author">{{gaga.originAuthor}}：</a>
        <span v-html="gaga.originContent"></span>
      </p>
    </div>
    <div v-if="gaga.hasOwnProperty('cincs') && gaga.cincs.length > 0" id="commsInComm" @click.stop="lookMoreComms()">
      <div v-if="gaga.cincs.length <= 10">
        <p class="txt">
          <a href="javascript:;" class="author">{{gaga.cincs[0].nickname}}：</a>
          <span v-html="gaga.cincs[0].content"></span>
        </p>
        <p class="txt" v-if="gaga.cincs.length > 1">
          <a href="javascript:;" class="author">{{gaga.cincs[1].nickname}}：</a>
          <span v-html="gaga.cincs[1].content"></span>
        </p>
        <p class="txt" v-if="gaga.cincs.length > 2">
          <a href="javascript:;" class="author">共{{gaga.cincs.length}}条回复</a>
        </p>
      </div>
      <div v-else>
        <p class="txt" v-if="gaga.cincs.length > 2">
          <a href="javascript:;" class="author">共{{gaga.cincs.length}}条回复</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import itemHeader from "./ItemHeader";
export default {
  created() {
  },
  props: {
    isComment: { default: false },
    gaga: { default: "" }
  },
  components: {
    itemHeader
  },
  methods: {
    lookMoreComms(){
      this.$router.push({name:"CommsInComm",params:{
        originComm:this.gaga
      }})
    },
  },
};
</script>
<style scoped>
#gbody {
  padding-top: 10px;
}
#origin,
#commsInComm > div {
  box-sizing: border-box;
  background-color: #eee;
  margin: 0 15px 5px 66px;
  text-align: left;
  border-radius: 4px;
}
#commsInComm > div {
  padding: 5px 0;
}
#origin > .txt,
#commsInComm > div > .txt {
  box-sizing: border-box;
  padding: 10px;
  font-size: 0.98rem;
}
#commsInComm > div > .txt {
  padding: 5px 10px;
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