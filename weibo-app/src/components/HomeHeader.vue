<template>
  <div id="gheader">
    <div class="header">
      <i class="iconfont icon-caidan-kuai" id="more" @click="showMore()"></i>
      <div id="logo">
        <img src="http://q7fplcgtx.bkt.clouddn.com/image/logo.png" id="head-logo" />
        <span id="head-msg">消息</span>
      </div>
      <i class="iconfont icon-icon_copyto" id="write" @click="showWrite()"></i>
    </div>
    <more-bar :obj="{more:this.more,morebar:this.morebar,mask:this.mask}"></more-bar>
    <new-gaga :relayData="relayData"></new-gaga>
    <div class="mask" @click="closeMask()"></div>
  </div>
</template>
<script>
import moreBar from "./MoreBar";
import newGaga from "./NewGaga";
export default {
  data() {
    return {
      more: "",
      morebar: "",
      mask: "",
      newgaga: "",
      home: "",
    };
  },
  mounted() {
    this.more = document.getElementById("more");
    this.morebar = document.getElementById("morebar");
    this.newgaga = document.getElementById("gaga");
    this.mask = document.querySelector("div.mask");
    this.home = document.getElementById("home");
  },
  methods: {
    showWrite() {
      this.newgaga.style.left = "100px";
      this.newgaga.style.animation = "show-write 0.4s ease";
      this.newgaga.style.display = "block";
      this.home.style.transform = "translateX(-100px)";
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", this.closeWrite, false);
      }
    },
    closeWrite() {
      window.removeEventListener("popstate", this.closeWrite, false);
      this.home.style.transform = "translateX(0)";
      this.newgaga.style.left = "100vw";
      this.newgaga.style.animation = "close-write 0.4s ease";
      this.newgaga.addEventListener("webkitAnimationEnd", setWriteNone);
      var t = this;
      function setWriteNone() {
        t.newgaga.style.display = "none";
        t.newgaga.removeEventListener("webkitAnimationEnd", setWriteNone);
      }
    },
    showMore() {
      if (
        this.more.style.transform == "" ||
        this.more.style.transform == "rotate(0deg)"
      ) {
        this.more.style.transform = "rotate(90deg)";
        this.more.style.animation = "rotate0to90 0.4s ease";
        this.morebar.style.display = "block";
        this.morebar.style.left = 0;
        this.morebar.style.boxShadow = "0 0 20px -8px #666666";
        this.morebar.style.animation = "show-morebar 0.4s ease";
        this.mask.style.display = "block";
        this.mask.style.animation = "show-morebar-mask 0.4s linear";
        if (window.history && window.history.pushState) {
          history.pushState(null, null, document.URL);
          window.addEventListener("popstate", this.closeMask, false);
        }
      }
    },
    closeMask() {
      window.removeEventListener("popstate", this.closeMask, false);
      this.more.style.transform = "rotate(0)";
      this.more.style.animation = "rotate90to0 0.4s ease";
      this.morebar.style.left = "-300px";
      this.morebar.style.boxShadow = "none";
      this.morebar.style.animation = "close-morebar 0.4s ease";
      this.mask.style.animation = "close-morebar-mask 0.4s linear";
      this.mask.addEventListener("webkitAnimationEnd", setMaskNone);
      var t = this;
      function setMaskNone() {
        t.morebar.style.display = "none";
        t.mask.style.display = "none";
        t.more.style.animation = "";
        t.mask.removeEventListener("webkitAnimationEnd", setMaskNone);
      }
    }
  },
  components: {
    moreBar,
    newGaga
  },
  props: {
    relayData: { default: "" }
  },
  watch: {
    relayData() {
      this.showWrite();
    }
  }
};
</script>
<style scoped>
#gheader {
  position: absolute;
  width: 100vw;
  z-index: 999;
  opacity: 1;
  top: 0;
  transition: all 0.4s;
}
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 50px;
  background-color: #f5f5f5;
  box-shadow: 0 0 15px -5px #999999;
  align-items: center;
  padding: 0 15px;
}
.header > #logo {
  position: absolute;
  display: flex;
  left: 50%;
  margin-left: -32px;
  height: 40px;
  width: 64px;
  overflow: hidden;
  border-radius: 4px;
}
#logo > img,
#logo > span {
  flex: none;
  display: block;
  width: 64px;
  height: 40px;
  transition: all 0.3s;
}
#logo > span {
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
  letter-spacing: 2px;
}
.icon-caidan-kuai,
.icon-icon_copyto {
  line-height: 50px;
  cursor: pointer;
}
.icon-caidan-kuai {
  font-size: 1.1rem;
}
.icon-icon_copyto {
  font-size: 1.375rem;
}
.mask {
  position: absolute;
  display: none;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: #000000;
  opacity: 0.6;
  z-index: 998;
}
</style>