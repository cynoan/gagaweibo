<template>
  <div id="write-comm">
    <p id="title">发评论</p>
    <textarea id="comm-txt" placeholder="说点什么吧..." v-model="content"></textarea>
    <div>
      <input type="checkbox" id="isRelay" />
      <label for="isRelay">
        <i>
          <i></i>
        </i>
        <span>同时转发</span>
      </label>
    </div>
    <div class="footer">
      <div class="footer_left">
        <i class="iconfont icon-icon_camera_fill" id="photo"></i>
        <i class="iconfont icon-icon_at" id="at"></i>
      </div>
      <i class="iconfont icon-icon_send" id="send" @click="newComm()"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      oriComm: null
    };
  },
  methods: {
    newComm() {
      let url = "/upload/newcomm";
      let data = "";
      // let uid = this.$store
      if (this.isCommGaga) {
        data = this.qs.stringify({
          uid: this.$store.state.uid,
          gid: this.gid,
          content: this.content,
          date: new Date().getTime()
        });
      } else {
        data = this.qs.stringify({
          uid: this.$store.state.uid,
          gid: this.gid,
          ocid: this.oriComm.cid,
          content: this.content,
          date: new Date().getTime()
        });
      }
      this.axios
        .post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          this.content = "";
          this.$emit("send", res.data);
        })
        .catch(err => {
          console.error(err);
        });
        this.oriComm = this.isCommGaga ? null : this.originComm;
    }
  },
  props: {
    gid: { default: null },
    originComm: { default: null },
    isCommGaga: { default:null }
  },
  watch: {
    originComm() {
      this.oriComm = this.originComm;
    }
  }
};
</script>
<style scoped>
#write-comm {
  position: relative;
  width: 100vw;
  background-color: #f2f2f2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
p {
  box-sizing: border-box;
  height: 36px;
  line-height: 36px;
  text-align: left;
  margin: 0 15px;
  font-size: 14px;
  border-bottom: 1px solid #999;
}
#comm-txt {
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  padding: 15px;
  resize: none;
  border: none;
  outline: none;
  font-size: 16px;
  color: #666;
  font-family: "SimHei";
  background-color: transparent;
}
#comm-txt::placeholder {
  font-size: 16px;
}
.footer {
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 15px -5px #999999;
  align-items: center;
  padding: 0 15px;
}
.footer i {
  font-size: 24px;
}
#at {
  margin-left: 12px;
}
#isRelay {
  display: none;
}
#isRelay + label {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 18px;
  padding: 0 15px;
  margin-bottom: 15px;
}
#isRelay + label > i {
  display: block;
  width: 18px;
  height: 18px;
  border: 2px solid #4bc3e4;
  border-radius: 2px;
}
#isRelay + label > i > i {
  display: block;
  width: 0px;
  height: 0px;
  margin: 9px;
  background-color: #4bc3e4;
  border-radius: 2px;
  transition: all 0.1s;
}
#isRelay:checked + label > i > i {
  width: 10px;
  height: 10px;
  margin: 4px;
}
#isRelay + label > span {
  display: inline-block;
  font-size: 16px;
  line-height: 18px;
  margin-left: 5px;
  color: #666;
}
</style>