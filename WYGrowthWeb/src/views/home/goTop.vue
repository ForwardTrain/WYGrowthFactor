<template>
  <div class="go-top" @click="goTop"> 
    <img src="@/assets/images/up@2x.png" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {
    goTop() {
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 添加平滑滚动效果
      });
    }
  },
}
</script>

<style scoped lang='scss'>
  .go-top {
    width: 70px !important;;
    height: 70;
    // border-left: 20px solid transparent;
    // border-right: 20px solid black;
    // border-top: 10px solid transparent;
    // border-bottom: 10px solid transparent;
    animation: bounce 1s infinite;
    // background: #fff;
    cursor: pointer;
    img {
      width: 70px;
      height: 70px;
    }
  }
//   @keyframes bounce {
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(20px); /* 或者其他值，根据你的设计调整 */
//   }
// }
</style>
