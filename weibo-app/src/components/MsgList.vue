<template>
  <div id="mlist">
    <ul>
      <li v-for="(msg,i) of msgs" :key="i" class="msg-item">
        <div :style="`background:url(${require('../assets/'+msg.avatar)})`" class="user-avatar"></div>
        <div class="msg-right">
          <span class="user-name">{{msg.name}}</span>
          <p class="msg-txt">{{msg.txt}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msgs: [
        {
          avatar: "avatar.jpg",
          name: "Tom",
          txt: "Lorem ipsum dolor sit sit amet"
        },
        {
          avatar: "1.jpg",
          name: "Jack",
          txt: "Lorem ipsum dolor sit amet sit sit ipsum dolor sit"
        },
        {
          avatar: "2.jpg",
          name: "Bobi",
          txt: "Lorem ipsum dolor sit amet amet amet amet"
        },
        {
          avatar: "3.jpg",
          name: "Sandy",
          txt: "Lorem ipsum dolor sit amet amet"
        },
        {
          avatar: "4.jpg",
          name: "Lala",
          txt: "Lorem ipsum dolor sit"
        },
        {
          avatar: "5.jpg",
          name: "Brown",
          txt: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet"
        },
        {
          avatar: "2.jpg",
          name: "Sin",
          txt: "Lorem ipsum dolor sit amet amet amet amet"
        },
        {
          avatar: "1.jpg",
          name: "David",
          txt: "Lorem ipsum dolor sit amet sit sit ipsum dolor sit"
        },
      ]
    };
  }
};
</script>
<style scoped>
#mlist{
  box-sizing: border-box;
  padding: 0 15px;
  width: 100vw;
  margin-bottom: 15px;
}
#mlist::-webkit-scrollbar{
  display: none;
  width: 0;
}
ul{
  width: 100%;
}
ul > li {
  height: 50px;
  display: flex;
  align-items: center;
  width: 100%;
}
ul>li:not(:first-child){
  margin-top: 20px;
}
div.user-avatar {
  box-sizing: border-box;
  flex: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 10px -5px #999999;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center !important;
}
div.msg-right{
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  margin-left: 10px;
  overflow: hidden;
}
.msg-right>p,.msg-right>span{
  margin: 2px 0;
}
.msg-right>p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>