<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.at-name{
  text-decoration: none ;
  color: #3464be ; 
}
a{
  text-decoration: none;
  color: #2c3e50 ; 
}
i.back {
  font-size: 22px;
  padding: 15px;
  margin-left: -15px;
}

</style>
