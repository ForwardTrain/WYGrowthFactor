<template>
  <div class="system-content">
    <router-view class="routerView" ref="routerView"></router-view>
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
    
  },
}
</script>

<style scoped lang='scss'>
  .system-content {
    background: #F6F7FB;
    
    // width: 100%;
    
    overflow: auto;
    .routerView {
      // border: 1px solid red;
      margin: 12px;
      width: calc(100vw - 255px);
      background: #fff;
      border-radius: 8px;
      height: calc(100vh - 132px);
      overflow: auto;
    }
  }
</style>
