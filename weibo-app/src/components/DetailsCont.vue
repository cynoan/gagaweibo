<template>
  <div id="details-cont">
    <relay :relays="relays"></relay>
    <comment active :comms="comms"></comment>
    <likes></likes>
  </div>
</template>
<script>
import comment from "./Comment";
import likes from "./Likes";
import relay from "./Relay";
export default {
  data(){
    return {
      active:"comment"
    }
  },
  created(){

  },
  components: {
    comment,
    likes,
    relay
  },
  props: {
    selected:{ default: "" },
    comms:{ default: ""},
    relays:{ default: ""},
  },
  watch:{
    selected:function(newVal,oldVal){
      document.getElementById(oldVal).removeAttribute("active");
      document.getElementById(newVal).setAttribute("active", "");
    }
  }
};
</script>
<style scoped>
#details-cont {
  box-sizing: border-box;
  margin-bottom: 50px;
  width: 100vw;
}
#comment,#likes,#relay{
  display: none;
}
#comment[active],#likes[active],#relay[active]{
  display: block;
}

</style>