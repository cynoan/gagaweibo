<template>
  <div id="atgaga">
      <gaga-list :gagas="atmes"></gaga-list>
  </div>
</template>
<script>
import gagaList from './GagaList'
export default {
  props:{
    atmes:{ default:"" }
  },
  components:{
    gagaList
  }
}
</script>
<style scoped>
</style>