<template>
  <div id="mylikes">
      <gaga-list :gagas="gagas"></gaga-list>
  </div>
</template>
<script>
import gagaList from "../components/GagaList";
import gagaData from "../json/gaga.json";
export default {
  data() {
    return {
      gagas: gagaData.gagas
    };
  },
  components: {
    gagaList,
  },
}
</script>
<style scoped>

</style>