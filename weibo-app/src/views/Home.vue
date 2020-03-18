<template>
  <div id="home" :active="this.selected">
    <home-header></home-header>
    <home-container :selected="selected"></home-container>
    <home-tabbar @selected="getSelected"></home-tabbar>
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
      selected: "list"
    };
  },
  components: {
    homeHeader,
    homeTabbar,
    homeContainer
  },
  methods: {
    getSelected(data) {
      this.selected = data.slice(4);
    }
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
#home[active="list"]>#gheader>.header>#logo>#head-logo,
#home[active="list"]>#gheader>.header>#logo>#head-msg{
  transform: translateX(0);
}
#home[active="msg"]>#gheader>.header>#logo>#head-logo,
#home[active="msg"]>#gheader>.header>#logo>#head-msg{
  transform: translateX(-64px);
}
#home[active="person"]>#gheader>.header>#logo>#head-logo,
#home[active="person"]>#gheader>.header>#logo>#head-msg{
  transform: translateX(-128px);
}
#home[active="person"]>#gheader{
  opacity: 0;
}
</style>
