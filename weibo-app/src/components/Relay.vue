<template>
  <div id="relay">
      <gaga-body v-for="(relay,i) of relays" :key="i" :isComment="false" :gaga="relay"></gaga-body>
  </div>
</template>
<script>
import gagaBody from "./GagaBody";
export default {
  components:{
    gagaBody
  },
  props:{
    relays:{ default: ""}
  }
}
</script>
<style scoped>
#relay >>> .user-name{
  font-weight: normal;
}
#relay >>>.txt{
  line-height: 18px !important;
}
#relay>#gbody{
  border-bottom: 1px solid #CCC;
} 
</style>