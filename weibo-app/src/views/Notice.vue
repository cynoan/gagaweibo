<template>
  <div id="notice">
    <div class="header">
      <div class="title">
        <router-link to="/Home">
          <i class="iconfont icon-icon_left back"></i>
        </router-link>
        <span>我的通知</span>
      </div>
      <div class="tabs" @click="tabClick($event)">
        <span class="tab" id="tab-atgaga">@我的微博</span>
        <span class="tab" id="tab-atcomm" selected>@我的评论</span>
        <span class="tab" id="tab-commme">收到的评论</span>
        <span class="tab" id="tab-likeme">收到的赞</span>
        <div>
          <div class="selbar" :sel="this.selected"></div>
        </div>
      </div>
    </div>
    <notice-cont :atmes="atmes" :selected="selected"></notice-cont>
  </div>
</template>
<script>
import gagaData from "../json/gaga.json";
import noticeCont from "../components/NoticeCont";
export default {
  data() {
    return {
      selected: "atgaga",
      atmes: gagaData.atme
    };
  },
  created() {
    this.$route.params.tab && (this.selected = this.$route.params.tab);
  },
  methods: {
    tabClick(e) {
      var elem = e.target;
      if (elem.nodeName == "SPAN") {
        if (elem.id.slice(4) != this.selected) {
          document
            .getElementById("tab-" + this.selected)
            .removeAttribute("selected");
          this.selected = elem.id.slice(4);
          document
            .getElementById("tab-" + this.selected)
            .setAttribute("selected", "");
        }
      }
    }
  },
  components: {
    noticeCont
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
}
.back {
  font-size: 1.125rem;
}
.header {
  position: fixed;
  z-index: 999;
  height: 105px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  background-color: #f5f5f5;
  box-shadow: 0 0 15px -5px #999999;
  top: 0;
  left: 0;
}
.header > .title {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 50px;
  padding: 0 15px;
}
.title span {
  display: block;
  /* font-weight: bold; */
  font-size: 1.125rem;
}
.tabs {
  box-sizing: border-box;
  width: 100vw;
  position: relative;
  margin-top: 5px;
  display: flex;
}
.tab {
  position: relative;
  display: block;
  /* padding: 0 15px; */
  height: 50px;
  width: 25vw;
  line-height: 50px;
  font-weight: bold;
  font-size: 0.875rem;
  box-sizing: border-box;
}
.tabs > div:last-child {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 2px;
  background-color: #ddd;
}
.selbar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #315ba8;
  transition: all 0.3s;
  width: 25%;
}
.selbar[sel="atgaga"] {
  left: 0;
}
.selbar[sel="atcomm"] {
  left: 25vw;
}
.selbar[sel="commme"] {
  left: 50vw;
}
.selbar[sel="likeme"] {
  left: 75vw;
}
</style>