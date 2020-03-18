<template>
  <div id="login-layout" @click="hideBtn($event)">
    <div id="header" ref="header">
      <img src="../assets/logo1.png" class="logo" />
      <div :class="`login-bottom login ${which ? 'show-in' : 'show-out'}`" v-show="which">
        <a>忘记密码</a>
        <span>|</span>
        <a href="javascript:;" @click="toReg">用户注册</a>
      </div>
      <div :class="`login-bottom reg ${!which ? 'show-in' : 'show-out'}`" v-show="!which">
        <a href="javascript:;" @click="toLogin">已有帐户?</a>
      </div>
    </div>
    <div id="section">
      <div id="login" v-show="which" :class="which ? 'show-in' : 'show-out'">
        <input type="text" ref="loguname" placeholder="输入用户名" v-model="loguname" />
        <div class="logDiv">
          <i
            :class="'iconfont '+toggleClass"
            id="toggle-pwd"
            :toggle="toggle"
            :show="show"
            @click="togglePwd"
          ></i>
          <input
            :type="upwdType"
            ref="logupwd"
            placeholder="输入密码"
            @focus="showBtn"
            v-model="logupwd"
          />
          <i class="iconfont icon-chahao" id="clear-pwd" :show="show" @click="clearPwd"></i>
        </div>
        <button ref="loginBtn" class="submit" :canLogin="canLogin" :disabled="!canLogin" @click="login()">
          <i class="iconfont icon-jichutubiao-XC-xiangyou"></i>
        </button>
      </div>

      <div id="reg" v-show="!which" :class="!which ? 'show-in' : 'show-out'">
        <div class="regDiv">
          <span id="uname-msg" v-show="!unameok && unameok!=null">包含4~12位英文字母或数字</span>
          <i class="iconfont icon-jinggao" v-if="!unameok && unameok!=null"></i>
          <i class="iconfont icon-zhengque" v-if="unameok"></i>
          <input
            type="text"
            ref="reguname"
            placeholder="输入用户名"
            v-model="reguname"
            :err="!unameok && unameok!=null"
            :ok="unameok"
          />
        </div>
        <div class="regDiv">
          <span id="upwd-msg" v-show="!upwdok && upwdok!=null">同时包含6~12位英文字母和数字</span>
          <i class="iconfont icon-jinggao" v-if="!upwdok && upwdok!=null"></i>
          <i class="iconfont icon-zhengque" v-if="upwdok"></i>
          <input
            type="password"
            ref="regupwd"
            placeholder="输入密码"
            v-model="regupwd"
            :err="!upwdok && upwdok!=null"
            :ok="upwdok"
          />
        </div>
        <div class="regDiv">
          <span id="cpwd-msg" v-show="!cpwdok && cpwdok!=null">两次密码输入不一致</span>
          <i class="iconfont icon-jinggao" v-if="!cpwdok && cpwdok!=null"></i>
          <i class="iconfont icon-zhengque" v-if="cpwdok"></i>
          <input
            type="password"
            ref="cpwd"
            placeholder="再次确认密码"
            v-model="cpwd"
            :err="!cpwdok && cpwdok!=null"
            :ok="cpwdok"
          />
        </div>
        <div class="regDiv">
          <span id="phone-msg" v-show="!phoneok && phoneok!=null">手机号格式不正确</span>
          <i class="iconfont icon-jinggao" v-if="!phoneok && phoneok!=null"></i>
          <i class="iconfont icon-zhengque" v-if="phoneok"></i>
          <input
            type="text"
            ref="phone"
            placeholder="输入手机号"
            v-model="phone"
            :err="!phoneok && phoneok!=null"
            :ok="phoneok"
          />
        </div>
        <button ref="regBtn" class="submit" :canReg="canReg" :disabled="!canReg">
          <i class="iconfont icon-jichutubiao-XC-xiangyou"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loguname: null,
      logupwd: null,
      reguname: null,
      unameok: null,
      regupwd: null,
      upwdok: null,
      cpwd: null,
      cpwdok: null,
      phone: null,
      phoneok: null,
      toggle: false,
      toggleClass: "icon-bukejian",
      upwdType: "password",
      show: false,
      canLogin: false,
      canReg: false,
      timer: null,
      btnBack: { deg: 0, from: 0, to: 100 },
      degFunc: null,
      fromFunc: null,
      toFunc: null,
      which: true
    };
  },
  created() {
    this.degFunc = () => {
      this.btnBack.deg++;
    };
    this.fromFunc = () => {
      this.btnBack.from++;
    };
    this.toFunc = () => {
      this.btnBack.to--;
    };
  },
  updated() {
    if (this.loguname && this.logupwd) {
      this.canLogin = true;
    } else {
      this.canLogin = false;
    }
    if (this.unameok && this.upwdok && this.cpwdok && this.phoneok) {
      this.canReg = true;
    } else {
      this.canReg = false;
    }
  },
  watch: {
    canLogin(newVal, oldVal) {
      if (newVal != oldVal && newVal == true) {
        this.timer = setInterval(() => {
          this.degFunc();
          if (this.btnBack.from == 100) {
            this.fromFunc = () => {
              this.btnBack.from--;
            };
          } else if (this.btnBack.from == 0) {
            this.fromFunc = () => {
              this.btnBack.from++;
            };
          }
          if (this.btnBack.to == 0) {
            this.toFunc = () => {
              this.btnBack.to++;
            };
          } else if (this.btnBack.to == 100) {
            this.toFunc = () => {
              this.btnBack.to--;
            };
          }
          this.$refs.loginBtn.style.background = `linear-gradient(${this.btnBack.deg}deg, #e12f54 ${this.btnBack.from}%, #5c123a ${this.btnBack.to}%)`;
        }, 10);
      } else if (newVal != oldVal && newVal == false) {
        clearInterval(this.timer);
        this.$refs.loginBtn.removeAttribute("style");
      }
    },
    canReg(newVal, oldVal) {
      if (newVal != oldVal && newVal == true) {
        this.timer = setInterval(() => {
          this.degFunc();
          if (this.btnBack.from == 100) {
            this.fromFunc = () => {
              this.btnBack.from--;
            };
          } else if (this.btnBack.from == 0) {
            this.fromFunc = () => {
              this.btnBack.from++;
            };
          }
          if (this.btnBack.to == 0) {
            this.toFunc = () => {
              this.btnBack.to++;
            };
          } else if (this.btnBack.to == 100) {
            this.toFunc = () => {
              this.btnBack.to--;
            };
          }
          this.$refs.regBtn.style.background = `linear-gradient(${this.btnBack.deg}deg, #1abdec ${this.btnBack.from}%, #051d49 ${this.btnBack.to}%)`;
        }, 10);
      } else if (newVal != oldVal && newVal == false) {
        clearInterval(this.timer);
        this.$refs.regBtn.removeAttribute("style");
      }
    },
    reguname() {
      var reg = /^[a-zA-Z0-9]{4,12}$/;
      this.unameok = reg.test(this.reguname);
    },
    regupwd() {
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
      this.upwdok = reg.test(this.regupwd);
    },
    cpwd() {
      var str = `^${this.cpwd}$`;
      var reg = new RegExp(str);
      this.cpwdok =
        reg.test(this.regupwd) && this.regupwd != null && this.regupwd != "";
    },
    phone() {
      var reg = /^1[3-9][0-9]{9}$/;
      this.phoneok = reg.test(this.phone);
    }
  },
  methods: {
    toReg() {
      this.$refs.header.style.animation = "toReg 0.5s";
      this.$refs.header.style.backgroundImage = `url(${require("../assets/reg_head.png")})`;
      this.which = false;
      this.$refs.loguname.value = "";
      this.$refs.logupwd.value = "";
      this.loguname = null;
      this.logupwd = null;
    },
    toLogin() {
      this.$refs.header.style.animation = "toLogin 0.5s";
      this.$refs.header.style.backgroundImage = `url(${require("../assets/login_head.png")})`;
      this.reguname = this.regupwd = this.cpwd = this.phone = "";
      setTimeout(() => {
        this.unameok = this.upwdok = this.cpwdok = this.phoneok = null;
      }, 0);
      this.which = true;
    },
    clearPwd() {
      this.logupwd = null;
      this.$refs.logupwd.focus();
    },
    showBtn() {
      this.show = true;
    },
    hideBtn(e) {
      if (
        e.target.offsetParent &&
        e.target.offsetParent.className != "logDiv"
      ) {
        this.show = false;
      }
    },
    togglePwd() {
      this.$refs.logupwd.focus();
      if (this.toggle == false) {
        this.toggle = true;
        this.toggleClass = "icon-xianshikejian";
        this.upwdType = "text";
      } else {
        this.toggle = false;
        this.toggleClass = " icon-bukejian";
        this.upwdType = "password";
      }
    },
    login() {
      this.axios.post(
        "/user/login",
        this.qs.stringify({
          uname: this.loguname,
          upwd: this.logupwd
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        }
      )
      .then(res => {
        console.log(111);
        this.$toast(res.data.msg);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
};
</script>
<style scoped>
#login-layout {
  width: 100vw;
  height: 100vh;
}
#header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 30vh;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-image: url("../assets/login_head.png");
}
#header > .logo {
  position: absolute;
  height: 15%;
  left: 3vw;
  bottom: 3vw;
}
#section {
  box-sizing: border-box;
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 70vh;
  top: 30vh;
  overflow: scroll;
}
input {
  box-sizing: border-box;
  display: block;
  height: 60px;
  width: 80vw;
  line-height: 60px;
  margin: 0 auto;
  border-radius: 30px;
  border: none;
  outline: none;
  background: #eaeaea;
  font-size: 1.25rem;
  padding: 0 60px;
  text-align: center;
}
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #eaeaea inset !important;
}
input:focus::placeholder {
  opacity: 0;
}
input::placeholder,
input::-webkit-input-placeholder,
input::-moz-placeholder {
  font-size: 1.125rem;
  text-align: center;
  opacity: 0.5;
}
input[ok] {
  border: 3px solid #146eaa;
  box-shadow: 0 0 15px -5px #146eaa;
}
input[err] {
  border: 3px dashed #146eaa;
  box-shadow: 0 0 15px -5px #146eaa;
}
#login input {
  margin-top: 26px;
}
#reg,
#login {
  padding-top: 14px;
  padding-bottom: 40px;
}
#reg > .regDiv > span {
  position: absolute;
  font-size: 0.75rem;
  right: 5vw;
  color: #146eaa;
  margin-top: -21px;
}
.logDiv,
.regDiv {
  box-sizing: border-box;
  position: relative;
  width: 80vw;
  margin: 0 auto;
}
.logDiv {
  height: 60px;
}
.regDiv {
  height: 86px;
  padding-top: 26px;
}
.regDiv > i {
  position: absolute;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 1.25rem;
  color: #146eaa;
  right: 0;
}
.regDiv > i.icon-jinggao {
  line-height: 56px;
}
#toggle-pwd,
#clear-pwd {
  display: none;
  position: absolute;
  height: 60px;
  width: 60px;
  line-height: 60px;
  top: 0;
  border-radius: 50%;
}
#toggle-pwd {
  font-size: 1.5rem;
  left: 0;
}
#clear-pwd {
  font-size: 1.25rem;
  right: 0;
}
#toggle-pwd[show="true"],
#clear-pwd[show="true"] {
  display: block;
}
.submit {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #eaeaea;
  border: none;
  outline: none;
  box-shadow: none;
  margin-top: 30px;
}
.submit > i {
  font-size: 1.5rem;
  color: #fff;
}
.login-bottom {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.6vh;
  right: 3.5vw;
  bottom: 4vw;
  color: #eaeaea;
  font-size: 0.875rem;
  border-radius: 1.8vh;
  padding: 0 12px;
  box-shadow: 0 0 20px -5px #999;
}
.login-bottom > a {
  color: #eaeaea;
}
.login-bottom > span {
  margin: -2px 10px 0;
}
.login-bottom.login {
  background: linear-gradient(30deg, #5c123a 0%, #e12f54 100%);
}
.login-bottom.reg {
  background: linear-gradient(150deg, #1abdec 30%, #051d49 100%);
}
.show-in {
  animation: show-ani 1s;
}
.show-out {
  animation: close-ani 1s;
}
</style>