<template>
  <div id="glist">
    <router-link v-for="(gaga,i) of gagas" :key="i" :to="{name:'GagaDetails', params:gaga}">
      <gaga-item :gaga="gaga"></gaga-item>
    </router-link>
  </div>
</template>
<script>
import gagaItem from './GagaItem';
export default {
  data(){
    return {
      
    }
  },
  components:{
    gagaItem
  },
  props:{
    gagas:{ default: "" }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
  color: #2c3e50;
}
</style>