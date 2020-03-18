<template>
  <div id="comment">
      <gaga-body v-for="(comm,i) of comms" :key="i" :isComment="true" :gaga="comm"></gaga-body>
  </div>
</template>
<script>
import gagaBody from "./GagaBody";
export default {
  components:{
    gagaBody
  },
  props:{
    comms:{ default: ""}
  }
}
</script>
<style scoped>
#comment >>> .user-name{
  font-weight: normal;
}
#comment >>>.txt{
  line-height: 18px !important;
}
#comment>#gbody{
  border-bottom: 1px solid #CCC;
} 
</style>