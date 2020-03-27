<template>
  <div id="gperson">
    <div class="back" style="background:url(http://q7fplcgtx.bkt.clouddn.com/image/back.png)"></div>
    <div class="personal">
      <img :src="$store.state.infos.avatar" class="user-avatar" />
      <span class="user-name">{{$store.state.infos.nickname}}</span>
      <p class="intro">{{$store.state.infos.intro}}</p>
      <p class="p-bottom">
        关注
        <span class="attention">313</span>
        <span>|</span>
        粉丝
        <span id="follower">569</span>
      </p>
    </div>
    <div class="tabs" @click="tabClick($event)">
      <span class="tab" id="weibo" selected>微博(1705)</span>
      <span class="tab" id="photo">相册</span>
      <div>
        <div class="selbar" :sel="this.selected"></div>
      </div>
    </div>
    <div class="container">
      <gaga-list class="weibo" selected :gagas="mygagas"></gaga-list>
      <photos class="photo"></photos>
    </div>
  </div>
</template>
<script>
import gagaList from "./GagaList";
import photos from "./Photos";
import gagaData from "../json/gaga.json";
export default {
  data() {
    return {
      selected: "weibo",
      mygagas: ""
    };
  },
  created() {
    this.axios
      .post(
        "/user/getmylist",
        this.qs.stringify({
          uid: this.$store.state.uid,
          nickname: this.$store.state.infos.nickname,
          avatar: this.$store.state.infos.avatar,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        }
      )
      .then(res => {
        this.mygagas = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    tabClick(e) {
      var elem = e.target;
      if (elem.nodeName == "SPAN") {
        if (elem.id != this.selected) {
          document.getElementById(this.selected).removeAttribute("selected");
          document
            .querySelector(`.container>.${this.selected}`)
            .removeAttribute("selected");
          this.selected = elem.id;
          document.getElementById(this.selected).setAttribute("selected", "");
          document
            .querySelector(`.container>.${this.selected}`)
            .setAttribute("selected", "");
        }
      }
    }
  },
  components: {
    gagaList,
    photos
  }
};
</script>
<style scoped>
.container {
  width: 100vw;
}
#glist,
#gphoto {
  display: none;
  opacity: 0;
}
#glist[selected],
#gphoto[selected] {
  display: block;
  opacity: 1;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
#gperson {
  overflow-y: scroll;
}

.back {
  width: 100vw;
  height: 24vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.personal {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 15px;
  margin-top: -10vw;
  font-size: 0.99rem;
}
img.user-avatar {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  box-shadow: 0 0 10px -8px #666666;
}
.user-name {
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 10px;
}
.intro {
  margin-top: 10px;
}
.p-bottom {
  margin-top: 10px;
  color: #777777;
  font-weight: bold;
}
.p-bottom > span:not(:nth-child(2)) {
  color: #2c3e50;
}
.p-bottom > span:nth-child(2) {
  margin: 0 5px 0 10px;
}
.tabs {
  position: relative;
  margin-top: 10px;
  display: flex;
}
.tab {
  position: relative;
  display: block;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
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
}
.selbar[sel="weibo"] {
  width: 109px;
  left: 0;
}
.selbar[sel="photo"] {
  width: 62px;
  left: 109px;
}
</style>