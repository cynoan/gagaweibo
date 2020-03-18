<template>
  <div id="myfavos">
    <div class="header">
      <title-back :title="{to:'Home', title:'我的评论和赞'}"></title-back>
    </div>
    <gaga-list :gagas="gagas"></gaga-list>
  </div>
</template>
<script>
import gagaList from "../components/GagaList";
import gagaData from "../json/gaga.json";
import titleBack from "../components/TitleBack";
export default {
  data() {
    return {
      gagas: gagaData.gagas
    };
  },
  components: {
    gagaList,
    titleBack
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  background-color: #f5f5f5;
  box-shadow: 0 0 15px -5px #999999;
  top: 0;
  left: 0;
}
#glist{
  margin-top: 50px;
}
</style>