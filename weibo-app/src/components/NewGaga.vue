<template>
  <div id="gaga">
    <div class="header">
      <div class="header-left">
        <i class="iconfont icon-icon_left back" @click="closeWrite()"></i>
        <img src="../assets/avatar.jpg" class="avatar" />
        <span class="user_name">Cynoan</span>
      </div>
      <img src="../assets/logo.png" class="logo" />
    </div>
    <textarea id="txt_content" placeholder="推送一条GAGA..." autofocus></textarea>
    <div class="footer">
      <div class="footer_left">
        <i class="iconfont icon-icon_camera_fill" id="photo"></i>
        <i class="iconfont icon-icon_at" id="at"></i>
      </div>
      <i class="iconfont icon-icon_send" id="send"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newgaga:"",
      tArea:"",
      home:""
    };
  },
  mounted() {
    this.newgaga = document.getElementById("gaga");
    this.home = document.getElementById("home");
    this.tArea = document.getElementById("txt_content");
    this.tArea.style.height = document.documentElement.clientHeight - 100 + "px";
  },
  methods: {
    closeWrite() {
      this.home.style.transform = "translateX(0)";
      this.newgaga.style.left = "100vw";
      this.newgaga.style.animation = "close-write 0.4s ease";
      this.newgaga.addEventListener("webkitAnimationEnd", setWriteNone);
      var t = this;
      function setWriteNone() {
        t.newgaga.style.display = "none";
        t.newgaga.removeEventListener("webkitAnimationEnd", setWriteNone);
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
  background-color: #FFFFFF;
  z-index: 999
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
.back{
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
textarea {
  box-sizing: border-box;
  position: absolute;
  top: 50px;
  left: 0;
  display: block;
  box-sizing: border-box;
  width: 100vw;
  font-size: 18px;
  color: #333;
  resize: none;
  overflow-y: scroll;
  padding: 15px;
  border: 0;
  outline: none;
  line-height: 24px;
  letter-spacing: 1px;
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
</style>