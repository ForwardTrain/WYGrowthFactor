<template>
  <div class="nav-bottom" :style="showMenu ? 'width: calc(100vw - 230px)' : 'width: calc(100vw - 95px)'">
    <div class="navigation-btn"
          v-for="(item, index) in routeList"
          :key="index"
          @click="goPage(item)"
          :style="item.url == $route.path ? 'border-color: #1990FF; color: #1990FF;background: #F1F8FF;' : ''">
        {{item.name}}
      <img v-show="routeList.length != 1" @click.stop="deleteRoute(index)" src="@/assets/images/close-icon.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    '$store.state.routerList': {
      handler(val) {
        this.routeList.forEach((item, index) => {
          if(item.url == val.url) {
            this.routeList.splice(index, 1)
          }
        })
        this.routeList.unshift(val)
        localStorage.setItem('routeList', JSON.stringify(this.routeList))
      }
      
    },
    '$store.state.NavWidth': {
      handler(val) {
        this.showMenu = val
      }
    },

    
  },
  data () {
    return {
      showMenu: true,
      routeList: [],
    }
  },
  mounted() {
    if(localStorage.getItem('routeList')) {
      this.routeList = JSON.parse(localStorage.getItem('routeList'))
    }
  },
  methods: {
    /**
     * 前往页面
     */
    goPage(item) {
      // clearInterval(window.setTime)
      this.$router.push({
        path: item.url,
        query: item.query
      })
    },
    /**
     * 删除路由记录
     */
    deleteRoute(index) {
      this.routeList.splice(index, 1)
      localStorage.setItem('routeList', JSON.stringify(this.routeList))
      this.$router.push({
        path: this.routeList[0].url
      })
      
    },
  },
}
</script>

<style scoped lang='scss'>
  .nav-bottom {
    height: 48px;
    width: 100%;
    // max-width: calc(100vw - 230px);
    background: #E6E8F1;
    display: flex;
    align-items: center;
    overflow-x: auto !important;
    overflow-y: hidden;
    padding: 0 14px;
    .navigation-btn {
      white-space: nowrap;
      padding: 0 10px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid #AFC5DB;
      color: #AFC5DB;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-left: 4px;
        display: none;
      }
    }
    .navigation-btn:hover {
      border-color: #1990FF; 
      color: #1990FF;
      background: #F1F8FF;
      img {
        display: block;
      }
    }
  }
  .nav-bottom::-webkit-scrollbar {
    display: none !important;
  }
</style>
