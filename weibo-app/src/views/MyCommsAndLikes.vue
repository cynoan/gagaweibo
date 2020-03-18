<template>
  <div id="mycommsandlikes">
    <div class="header">
      <title-back :title="{to:'Home', title:'我的评论和赞'}"></title-back>
      <div class="tabs" @click="tabClick($event)">
        <span class="tab" id="tab-mycomms" selected>我发出的评论</span>
        <span class="tab" id="tab-mylikes">我的点赞</span>
        <div>
          <div class="selbar" :sel="this.selected"></div>
        </div>
      </div>
    </div>
    <div id="container" :active="this.selected">
      <my-comms></my-comms>
      <my-likes></my-likes>
    </div>
  </div>
</template>
<script>
import myComms from '../components/MyComms'
import myLikes from '../components/MyLikes'
import titleBack from '../components/TitleBack'
export default {
  data() {
    return {
      selected: "mycomms",
    };
  },
  components:{
    myComms,
    myLikes,
    titleBack
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
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
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
  height: 50px;
  width: 50vw;
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
  width: 50%;
}
.selbar[sel="mycomms"] {
  left: 0;
}
.selbar[sel="mylikes"] {
  left: 50vw;
}
#container{
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
#mycomms,#mylikes{
  box-sizing: border-box;
  position: absolute;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  padding-top: 105px;
  transition: all 0.4s;
}
#container[active="mycomms"]>#mycomms{
  left:0;
}
#container[active="mycomms"]>#mylikes{
  left: 100vw;
}

#container[active="mylikes"]>#mycomms{
  left:-100vw;
}
#container[active="mylikes"]>#mylikes{
  left: 0;
}
</style>