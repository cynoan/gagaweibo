<template>
  <div id="glist">
    <gaga-item v-for="(gaga,i) of gagas" :key="i" :gaga="gaga" @click.native="toDetails(gaga)" @relay="relayIt"></gaga-item>
  </div>
</template>
<script>
import gagaItem from "./GagaItem";
export default {
  data() {
    return {};
  },
  components: {
    gagaItem
  },
  props: {
    gagas: { default: "" }
  },
  methods: {
    relayIt(data){
      this.$emit("relay",data);
    },
    toDetails(gaga) {
      this.$router.push({
        name: "GagaDetails",
        params: {
          gid: gaga.gid,
          content: gaga.content,
          date: gaga.date,
          nickname: gaga.nickname,
          avatar: gaga.avatar,
          isRelay: gaga.isRelay,
          originAuthor: gaga.originAuthor,
          originContent: gaga.originContent,
          from:"Home"
        }
      });
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
}
</style>