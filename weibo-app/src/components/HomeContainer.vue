<template>
  <div id="tab-container" :active="this.selected">
    <gaga-list active :gagas="gagas"></gaga-list>
    <message></message>
    <person></person>
  </div>
</template>
<script>
import gagaList from "../components/GagaList";
import message from "../components/Message";
import person from "../components/Person";
import gagaData from "../json/gaga.json";
export default {
  data() {
    return {
      gagas: gagaData.gagas
    };
  },
  components: {
    gagaList,
    message,
    person
  },
  props: ["selected"],
};
</script>
<style scoped>
#tab-container {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
#glist,
#gmsg,
#gperson {
  position: absolute;
  padding: 50px 0;
  display: block;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  transition: all 0.4s;
}
#glist {
  left: 0;
}
#gmsg {
  left: 100vw;
}
#gperson {
  left: 200vw;
  top: -50px;
  padding-bottom: 0;
}
#glist::-webkit-scrollbar,
#gmsg::-webkit-scrollbar,
#gperson::-webkit-scrollbar {
  display: none;
}

#tab-container[active="list"]>#glist{
  left:0;
}
#tab-container[active="list"]>#gmsg{
  left: 100vw;
}
#tab-container[active="list"]>#gperson{
  left: 200vw;
}

#tab-container[active="msg"]>#glist{
  left:-100vw;
}
#tab-container[active="msg"]>#gmsg{
  left: 0;
}
#tab-container[active="msg"]>#gperson{
  left: 100vw;
}

#tab-container[active="person"]>#glist{
  left:-200vw;
}
#tab-container[active="person"]>#gmsg{
  left: -100vw;
}
#tab-container[active="person"]>#gperson{
  left: 0;
}
</style>