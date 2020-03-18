<template>
  <div id="tabbar" @click="tab($event)">
    <i slot="icon" class="iconfont icon-salescenter-fill tabicon" id="tab-list" selected />
    <i slot="icon" class="iconfont icon-email-fill tabicon" id="tab-msg" />
    <i slot="icon" class="iconfont icon-account-fill tabicon" id="tab-person" />
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
      if (elem.id != this.selected) {
        document.getElementById(this.selected).removeAttribute("selected");
        this.selected = elem.id;
        document.getElementById(this.selected).setAttribute("selected", "");
        this.$emit("selected", this.selected);
      }
    }
  }
};
</script>
<style scoped>
#tabbar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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
  height: 50px;
  line-height: 50px;
  font-size: 32px;
  width: 33.34vw;
  opacity: 0.6;
}
#tabbar > i[selected] {
  opacity: 1;
}
</style>