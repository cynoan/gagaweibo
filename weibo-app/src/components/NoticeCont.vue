<template>
  <div id="notice-cont" :active="selected">
    <at-gaga :atmes="atmes"></at-gaga>
    <at-comm></at-comm>
    <comm-me></comm-me>
    <like-me></like-me>
  </div>
</template>
<script>
import atGaga from './AtGaga'
import atComm from './AtComm'
import commMe from './CommMe'
import likeMe from './LikeMe'
export default {
  props:{
    atmes:{ default:"" },
    selected:{ default:"atgaga" }
  },
  components:{
    atGaga,
    atComm,
    commMe,
    likeMe
  },
  watch:{
    selected(){

    }
  }
}
</script>
<style scoped>
#notice-cont{
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
#atgaga,#atcomm,#commme,#likeme{
  box-sizing: border-box;
  position: absolute;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  padding-top: 105px;
  transition: all 0.4s;
}

#notice-cont[active="atgaga"]>#atgaga{
  left:0;
}
#notice-cont[active="atgaga"]>#atcomm{
  left: 100vw;
}
#notice-cont[active="atgaga"]>#commme{
  left: 200vw;
}
#notice-cont[active="atgaga"]>#likeme{
  left: 300vw;
}

#notice-cont[active="atcomm"]>#atgaga{
  left:-100vw;
}
#notice-cont[active="atcomm"]>#atcomm{
  left: 0;
}
#notice-cont[active="atcomm"]>#commme{
  left: 100vw;
}
#notice-cont[active="atcomm"]>#likeme{
  left: 200vw;
}

#notice-cont[active="commme"]>#atgaga{
  left:-200vw;
}
#notice-cont[active="commme"]>#atcomm{
  left: -100vw;
}
#notice-cont[active="commme"]>#commme{
  left: 0;
}
#notice-cont[active="commme"]>#likeme{
  left: 100vw;
}

#notice-cont[active="likeme"]>#atgaga{
  left:-300vw;
}
#notice-cont[active="likeme"]>#atcomm{
  left: -200vw;
}
#notice-cont[active="likeme"]>#commme{
  left: -100vw;
}
#notice-cont[active="likeme"]>#likeme{
  left: 0;
}
</style>