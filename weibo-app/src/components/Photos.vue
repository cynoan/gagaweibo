<template>
  <div id="gphoto">
      <div v-for="(item,i) of allPics" :key="i" class="pic-item">
        <div class="date">{{(new Date(item[0].date)).getFullYear()<(new Date()).getFullYear()?(new Date(item[0].date)).getFullYear()+"年"+((new Date(item[0].date)).getMonth()+1)+"月":(new Date(item[0].date)).getMonth()+1+"月"}}</div>
        <div class="pics">
          <div v-for="(pic,j) of item" :key="j" :style="`background:url(http://q7fplcgtx.bkt.clouddn.com/image/${pic.imgUrl})`" class="pic"></div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      allPics:[
        [
          {date:"2020-2-27",imgUrl:"1.jpeg"},
          {date:"2020-2-20",imgUrl:"2.jpeg"},
          {date:"2020-2-17",imgUrl:"3.jpeg"},
          {date:"2020-2-16",imgUrl:"4.jpeg"},
          {date:"2020-2-10",imgUrl:"5.jpeg"},
          {date:"2020-2-8",imgUrl:"6.jpeg"},
          {date:"2020-2-4",imgUrl:"7.jpeg"},
        ],
        [
          {date:"2020-1-28",imgUrl:"8.jpeg"},
          {date:"2020-1-23",imgUrl:"9.jpeg"},
          {date:"2020-1-19",imgUrl:"10.jpeg"},
          {date:"2020-1-12",imgUrl:"11.jpeg"},
          {date:"2020-1-11",imgUrl:"12.jpeg"},
          {date:"2020-1-9",imgUrl:"13.jpeg"},
        ],
        [
          {date:"2019-12-28",imgUrl:"14.jpeg"},
          {date:"2019-12-23",imgUrl:"15.jpeg"},
          {date:"2019-12-19",imgUrl:"16.jpeg"},
          {date:"2019-12-12",imgUrl:"17.jpeg"},
          {date:"2019-12-11",imgUrl:"18.jpeg"},
        ]
      ]
    };
  },
  mounted(){
    var date = new Date(this.allPics[0][0].date);
  }
}
</script>
<style scoped>
.date{
  box-sizing: border-box;
  background-color: #EEEEEE;
  text-align: left;
  padding-left: 15px;
  font-size: 16px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
}
.pics{
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
}
.pic{
  display: block;
  box-sizing: border-box;
  width: 33.33vw;
  height: 33.33vw;
  border: 1px solid #FFFFFF;
  /* margin: 2.5vw 0 0 2.5vw; */
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
}
/* .pic-item:not(:first-child){
  margin-top: 2.5vw;
} */

</style>