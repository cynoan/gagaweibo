<template>
  <div id="details">
    <div class="header">
      <i class="iconfont icon-icon_left back" @click="back"></i>
      <span>共{{cincs.length}}条回复</span>
    </div>
    <gaga-body :gaga="originComm" id="originComm" :isComment="true"></gaga-body>
    <div id="originBottom">
      <a href="javascript:;" id="originGaga" ref="originGaga">查看原微博</a>
      <div id="divide-line"></div>
    </div>
    <gaga-body
      v-for="(comm,i) of cincs"
      :key="i"
      :gaga="comm"
      :isComment="true"
      @click.native="showWrite(comm)"
    ></gaga-body>
    <div id="mask" @click="closeWrite"></div>
    <write-comm :gid="gaga.gid"></write-comm>
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
      fromName: "",
      cincs: [],
      originComm: {}
    };
  },
  created() {
    this.$store.commit("regetUser");
    if (this.$route.params.originComm == undefined) {
      this.originComm = JSON.parse(window.sessionStorage.getItem("originComm"));
    } else {
      this.originComm = this.$route.params.originComm;
      window.sessionStorage.setItem(
        "originComm",
        JSON.stringify(this.originComm)
      );
    }
    this.cincs = this.originComm.cincs;
    delete this.originComm.cincs;

  },
  mounted() {
    this.$refs.originGaga.onclick = ()=>{ this.$router.go(-1) } 
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    showWrite(comms) {
      document.querySelector(
        "p#title"
      ).innerHTML = `@${comms.nickname}：${comms.content}`;
      var writeArea = document.getElementById("write-comm");
      var mask = document.getElementById("mask");
      mask.style.cssText = "display:block; animation:show-ani 0.3s";
      writeArea.style.transform = "translateY(-243px)";
      document.querySelector("textarea#comm-txt").focus();
    },
    closeWrite() {
      var writeArea = document.getElementById("write-comm");
      var mask = document.getElementById("mask");
      var closeMask = () => {
        mask.style.display = "none";
        mask.removeEventListener("webkitAnimationEnd", closeMask);
      };
      mask.addEventListener("webkitAnimationEnd", closeMask);
      mask.style.animation = "close-ani 0.3s";
      writeArea.style.transform = "translateY(0)";
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
#originBottom{
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
}
a {
  text-decoration: none;
  color: #3464be;
}
a#originGaga {
  margin-left: 66px;
  text-align: left;
  margin-bottom: 15px;
  font-size: 1rem;
  width: 5rem;
}
#divide-line{
  height:20px;
  width:100vw;
  background-color: #F2F2F2;
  box-shadow: 0 0 1px 0 #CCC inset;
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
  border-bottom: 1px solid #ccc;
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
#originComm {
  margin-top: 65px;
}
</style>