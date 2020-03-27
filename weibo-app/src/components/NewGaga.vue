<template>
  <div id="gaga">
    <div class="header">
      <div class="header-left">
        <i class="iconfont icon-icon_left back" @click="closeWrite()"></i>
        <img :src="avatar" class="avatar" />
        <span class="user_name">{{uname}}</span>
      </div>
      <img src="http://q7fplcgtx.bkt.clouddn.com/image/logo.png" class="logo" />
    </div>
    <textarea
      id="txt_content"
      placeholder="推送一条GAGA..."
      autofocus
      v-model="taContent"
      :class="tAreaClass"
    ></textarea>
    <div id="origin" v-if="relayDetails">
      <div class="origin-pic" :style="`background-image:url(${origin.avatar})`"></div>
      <div class="origin-content">
        <span>@{{origin.nickname}}</span>
        <p v-html="origin.content"></p>
      </div>
    </div>
    <div class="footer">
      <div class="footer_left">
        <i class="iconfont icon-icon_camera_fill" id="photo"></i>
        <i class="iconfont icon-icon_at" id="at"></i>
      </div>
      <i class="iconfont icon-icon_send" id="send" @click="newGaga()"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newgaga: "",
      tArea: "",
      home: "",
      uname: "",
      avatar: "",
      taContent: "",
      relayDetails: "",
      tAreaClass: "ta-height",
      origin: {}
    };
  },
  created() {
    this.uname = this.$store.state.infos.nickname;
    this.avatar = this.$store.state.infos.avatar;
  },
  mounted() {
    this.newgaga = document.getElementById("gaga");
    this.home = document.getElementById("home");
    this.tArea = document.getElementById("txt_content");
    // this.tArea.style.height = document.documentElement.clientHeight - 100 + "px";
  },
  methods: {
    closeWrite() {
      this.taContent = "";
      this.relayDetails = "";
      this.origin.content = "";
      this.origin.avatar = "";
      this.origin.nickname = "";
      this.tAreaClass = "ta-height";
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
    newGaga() {
      let url;
      let data;
      if (this.relayDetails.originGid) {
        console.log("relay again");
        url = "/upload/newrelay";
        data = this.qs.stringify({
          uid: this.$store.state.uid,
          content: this.taContent,
          date: new Date().getTime(),
          isRelay: 1,
          originGid: this.relayDetails.originGid,
          originUid: this.relayDetails.originUid,
          latestGid: `${this.relayDetails.latestGid},${this.relayDetails.gid}`
        });
      } else if (this.relayDetails.isRelay == 1) {
        console.log("relay")
        url = "/upload/newrelay";
        data = this.qs.stringify({
          uid: this.$store.state.uid,
          content: this.taContent?this.taContent:"转发微博",
          date: new Date().getTime(),
          isRelay: 1,
          originGid: this.relayDetails.gid,
          originUid: this.relayDetails.uid,
          latestGid: this.relayDetails.gid
        });
      } else {
        console.log("not relay");
        url = "/upload/newgaga";
        data = this.qs.stringify({
          uid: this.$store.state.uid,
          content: this.taContent,
          date: new Date().getTime(),
          isRelay: 0
        });
      }
      this.axios
        .post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          let instance = this.$toast({
            message: res.data.msg,
            className: "notice-toast"
          });
          setTimeout(() => {
            instance.close();
            this.closeWrite();
          }, 500);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  props: {
    relayData: { default: "" }
  },
  watch: {
    relayData() {
      this.relayDetails = this.relayData;
      setTimeout(() => {
        this.tArea.focus();
        this.tArea.setSelectionRange(0, 0);
      }, 420);
      if (this.relayDetails) {
        this.tAreaClass = "ta-height-relay";
        if (this.relayDetails.originGid) {
          this.origin.avatar = this.relayDetails.originAvatar;
          this.origin.nickname = this.relayDetails.originAuthor;
          this.origin.content = this.relayDetails.originContent;
          this.taContent = `//@${this.relayDetails.nickname}：${this.relayDetails.content}`;
        } else {
          this.origin.avatar = this.relayDetails.avatar;
          this.origin.nickname = this.relayDetails.nickname;
          this.origin.content = this.relayDetails.content;
        }
      }
    }
  }
};
</script>
<style scoped>
#gaga {
  display: none;
  box-sizing: border-box;
  position: absolute;
  width: 100vw;
  height: 100vh;
  padding: 60px 0;
  left: 100vw;
  top: 0;
  box-shadow: 0 0 20px -8px #666666;
  background-color: #ffffff;
  z-index: 999;
}
.header,
.footer {
  position: absolute;
  z-index: 999;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
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
}
.header-left {
  display: flex;
  align-items: center;
}
.back {
  font-size: 1.125rem;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.header span {
  display: block;
  font-weight: bold;
  font-size: 1.125rem;
}
.header > .logo {
  height: 40px;
}
.ta-height {
  height: calc(100vh - 100px);
}
.ta-height-relay {
  height: calc(100vh - 185px);
}
textarea {
  box-sizing: border-box;
  position: absolute;
  top: 50px;
  left: 0;
  display: block;
  box-sizing: border-box;
  width: 100vw;
  font-size: 1rem;
  color: #333;
  resize: none;
  overflow-y: scroll;
  padding: 15px;
  border: 0;
  outline: none;
  line-height: 24px;
  letter-spacing: 1px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  text-align: left;
  word-break: break-all;
}
textarea::-webkit-scrollbar {
  display: none;
}
.footer i {
  font-size: 1.5rem;
}
#at {
  margin-left: 15px;
}
#content > .txt {
  margin: 8px 15px 8px 0;
  text-align: left;
  font-size: 0.98rem;
  padding: 0 15px;
  line-height: 24px;
}
#origin {
  position: absolute;
  bottom: 60px;
  box-sizing: border-box;
  display: flex;
  width: calc(100% - 30px);
  text-align: left;
  flex-direction: row;
  border-radius: 4px;
  margin: 0 15px;
  padding: 0 15px 0 0;
  background-color: #eee;
  box-shadow: 0 0 5px 0 #ddd;
}
#origin > div {
  box-sizing: border-box;
  display: flex;
  border-radius: 4px;
}
.origin-pic {
  flex: none;
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
  max-height: 48px;
  overflow: hidden;
}
</style>