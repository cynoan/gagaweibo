<template>
  <div id="tabbar" @click="tab($event)">
    <i slot="icon" class="iconfont icon-salescenter-fill tabicon" id="tab-list" selected />
    <i slot="icon" class="iconfont icon-salescenter-fill tabicon" id="listback" />
    <i slot="icon" class="iconfont icon-email-fill tabicon" id="tab-msg" />
    <i slot="icon" class="iconfont icon-email-fill tabicon" id="msgback" />
    <i slot="icon" class="iconfont icon-account-fill tabicon" id="tab-person" />
    <i slot="icon" class="iconfont icon-account-fill tabicon" id="personback" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "tab-list"
    };
  },
  methods: {
    tab(e) {
      var elem = e.target;
      var elemback = document.getElementById(e.target.id.slice(4)+"back");
      e.target.style.animation = "tabclick 0.3s";
      elemback.style.display = "flex";
      e.target.addEventListener("webkitAnimationEnd", () => {
        e.target.style.animation = "";
        elemback.style.display = "none";
      });
      if (elem.id != this.selected) {
        document.getElementById(this.selected).removeAttribute("selected");
        this.selected = elem.id;
        document.getElementById(this.selected).setAttribute("selected", "");
        this.$emit("selected", this.selected);
      } else {
        if (e.target.id == "tab-list") {
          this.$emit("refresh");
        }
      }
    }
  }
};
</script>
<style scoped>
#tabbar {
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  width: 100vw;
  height: 50px;
  top: 100vh;
  margin-top: -50px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  box-shadow: 0 0 15px -5px #999999;
  align-items: center;
}
#tabbar > i {
  text-align: center;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  font-size: 32px;
  background-image: url("../assets/clickback.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0;
  width: calc(100vw / 3);
}
#tabbar > i:nth-child(odd) {
  position: absolute;
  opacity: 0.6;
  flex: 1;
  z-index: 2;
}
#tabbar > i:nth-child(3),
#tabbar > i:nth-child(4){
  left: calc(100vw / 3);
}
#tabbar > i:nth-child(5),
#tabbar > i:nth-child(6){
  left: calc(100vw / 3 * 2);
}
#tabbar > i[selected] {
  opacity: 1 !important;
}
#tabbar > i:nth-child(even) {
  position: absolute;
  display: none;
  opacity: 1;
  z-index: 1;
}
</style>