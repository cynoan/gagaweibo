<template>
  <div id="details">
    <div class="header">
      <i class="iconfont icon-icon_left back" @click="back"></i>
      <span>GAGA正文</span>
    </div>
    <gaga-body :gaga="gaga"></gaga-body>
    <div class="tabs" @click="tabClick($event)">
      <span class="tab" id="tab-relay">转发({{gaga.relay}})</span>
      <span class="tab" id="tab-comment" selected>评论({{gaga.comment}})</span>
      <span class="tab" id="tab-likes">赞({{gaga.like}})</span>
      <div>
        <div class="selbar" :sel="this.selected"></div>
      </div>
    </div>
    <details-cont :selected="selected" :comms="comms" :relays="relays"></details-cont>
    <div class="footer">
      <i class="iconfont icon-xie comm" @click="showWrite">
        <span>说点什么吧……</span>
      </i>
      <i class="iconfont icon-xihuan like"></i>
      <i class="iconfont icon-zhuanhuan relay"></i>
    </div>
    <div id="mask" @click="closeWrite"></div>
    <write-comm></write-comm>
  </div>
</template>
<script>
import gagaBody from "../components/GagaBody";
import detailsCont from "../components/DetailsCont";
import writeComm from "../components/WriteComm";
import gagaData from "../json/gaga.json";
export default {
  data() {
    return {
      selected: "comment",
      gaga: "",
      comms: gagaData.comms,
      relays: gagaData.relays
    };
  },
  created() {
    this.gaga = this.$route.params;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    showWrite() {
      var writeArea = document.getElementById("write-comm");
      var mask = document.getElementById("mask");
      var footer = document.querySelector("div.footer");
      footer.style.transform = "translateY(60px)";
      mask.style.cssText = "display:block; animation:show-ani 0.3s";
      writeArea.style.transform = "translateY(-243px)";
    },
    closeWrite() {
      var writeArea = document.getElementById("write-comm");
      var mask = document.getElementById("mask");
      var footer = document.querySelector("div.footer");
      footer.style.transform = "translateY(0)";
      var closeMask = () => {
        mask.style.display = "none";
        mask.removeEventListener("webkitAnimationEnd", closeMask);
      };
      mask.addEventListener("webkitAnimationEnd", closeMask);
      mask.style.animation = "close-ani 0.3s";
      writeArea.style.transform = "translateY(0)";
    },
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
    gagaBody,
    detailsCont,
    writeComm
  }
};
</script>
<style scoped>
#details >>> .txt {
  line-height: 24px;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
.header,
.footer {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  background-color: #f5f5f5;
  box-shadow: 0 0 15px -5px #999999;
  align-items: center;
  padding: 0 15px;
}
.header {
  top: 0;
  left: 0;
}
.footer {
  bottom: 0;
  left: 0;
  transition: all 0.5s;
}
.header span {
  display: block;
  /* font-weight: bold; */
  font-size: 1.125rem;
}
.back {
  font-size: 1.125rem;
}
#gbody {
  margin-top: 55px;
}
.tabs {
  box-sizing: border-box;
  width: 100vw;
  position: relative;
  margin-top: 10px;
  display: flex;
}
.tab {
  position: relative;
  display: block;
  padding: 0 15px;
  height: 40px;
  width: 33.34vw;
  line-height: 40px;
  font-weight: bold;
  font-size: 0.98rem;
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
  width: 33.34%;
}
.selbar[sel="relay"] {
  left: 0;
}
.selbar[sel="comment"] {
  left: 33.34vw;
}
.selbar[sel="likes"] {
  left: 66.68vw;
}

.footer > i:not(:first-child) {
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 1.125rem;
}
.footer > i.comm {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: -15px;
  padding-left: 15px;
  text-align: left;
  font-size: 1.125rem;
}
i.comm > span {
  font-size: 1rem;
}
.footer > i.like {
  font-size: 1.2rem;
  font-weight: bold;
}
.footer > i.relay {
  margin-right: -10px;
}
#mask {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
}
#write-comm {
  position: fixed;
  z-index: 1000;
  bottom: -243px;
  left: 0;
  transition: all 0.3s;
}
</style>