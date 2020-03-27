<template>
  <div id="home" :active="this.selected">
    <home-header :relayData="relayData"></home-header>
    <home-container :selected="selected" :gagas="gagas" @relay="relayIt"></home-container>
    <home-tabbar @selected="getSelected" @refresh="refreshList"></home-tabbar>
  </div>
</template>

<script>
import homeHeader from "../components/HomeHeader";
import homeTabbar from "../components/HomeTabbar";
import homeContainer from "../components/HomeContainer";
export default {
  name: "Home",
  data() {
    return {
      selected: "list",
      gagas: "",
      relayData: "",
      latestTime: ""
    };
  },
  components: {
    homeHeader,
    homeTabbar,
    homeContainer
  },
  created() {
    console.log("Home创建");
    this.$store.commit("regetUser");
    this.getMyInfos();
    this.getList();
  },
  methods: {
    refreshList() {
      document.getElementById("glist").scrollTop = 0;
      this.$indicator.open();
      this.axios
        .get("/user/getlist", {
          params: { uid: this.$store.state.uid }
        })
        .then(res => {
          this.gagas = res.data;
          this.$indicator.close();
          var msg = "";
          if (res.data[0].date > this.latestTime) {
            var num = 0;
            for (var item of res.data) {
              if (item.date > this.latestTime) {
                num += 1;
              } else {
                break;
              }
            }
            this.latestTime = res.data[0].date;
            msg = "发现" + num + "条新GAGA";
          } else {
            msg = "没有新的内容";
          }
          this.$toast({
            message: msg,
            className: "notice-toast",
            duration: 1200
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    relayIt(data) {
      this.relayData = data;
    },
    getSelected(data) {
      this.selected = data.slice(4);
    },
    getList() {
      this.axios
        .get("/user/getlist", {
          params: { uid: this.$store.state.uid }
        })
        .then(res => {
          this.gagas = res.data;
          this.latestTime = res.data[0].date;
          console.log(this.latestTime);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getMyInfos() {
      this.axios
        .get("/user/getinfos", { params: { uid: this.$store.state.uid } })
        .then(res => {
          this.$store.commit("setInfos", res.data[0]);
          window.localStorage.setItem("infos", JSON.stringify(res.data[0]));
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  destroyed() {
    console.log("销毁Home");
  },
  watch: {
    $route(to, from) {
      if (to.name == "Login") {
        this.$destroy("Home");
      }
      if (to.name == "Home") {
        document.querySelector("div#glist").scrollTop = this.glistTop;
        document.querySelector("div#gmsg").scrollTop = this.gmsgTop;
        document.querySelector("div#gperson").scrollTop = this.gpersonTop;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != "Login") {
      this.glistTop = document.querySelector("div#glist").scrollTop;
      this.gmsgTop = document.querySelector("div#gmsg").scrollTop;
      this.gpersonTop = document.querySelector("div#gperson").scrollTop;
      // console.log(this.glistTop, this.gmsgTop, this.gpersonTop);
    }
    next();
  }
};
</script>
<style>
#home {
  position: relative;
  transition: all 0.4s;
}
#home::-webkit-scrollbar {
  display: none;
}
#home[active="list"] > #gheader > .header > #logo > #head-logo,
#home[active="list"] > #gheader > .header > #logo > #head-msg {
  transform: translateX(0);
}
#home[active="msg"] > #gheader > .header > #logo > #head-logo,
#home[active="msg"] > #gheader > .header > #logo > #head-msg {
  transform: translateX(-64px);
}
#home[active="person"] > #gheader > .header > #logo > #head-logo,
#home[active="person"] > #gheader > .header > #logo > #head-msg {
  transform: translateX(-128px);
}
#home[active="person"] > #gheader {
  opacity: 0;
}
</style>
