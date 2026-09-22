<template>
  <div class="graphicManagement-box">
    <div class="choose-btn">
      <div :style="btnIndex == 1 ? 'background: #1990FF; color: #fff;' : ''" @click="btnIndex = 1">
        帮助栏目
      </div>
      <div :style="btnIndex == 2 ? 'background: #1990FF; color: #fff;' : ''" @click="btnIndex = 2">
        帮助列表
      </div>
    </div>

    <div class="childpage-box">
      <page1 v-if="btnIndex == 1"></page1>
      <page2 v-if="btnIndex == 2"></page2>
    </div>
  </div>
</template>

<script>
import page1 from './page1.vue'
import page2 from './page2.vue'
export default {
  components: {
    page1,
    page2,
  },
  
  data () {
    return {
      btnIndex: 1,
    }
  },
  mounted() {
    if(this.$route.query.page == 2) {
      this.btnIndex = 2
    }
  },
  methods: {
    
  },
}
</script>

<style scoped lang='scss'>
  .graphicManagement-box {
    padding: 12px;
    .childpage-box {
      margin-top: 15px;
    }
    .choose-btn {
      display: flex;
      align-items: center;
      >div {
        margin-right: 12px;
        cursor: pointer;
        width: 108px;
        height: 36px;
        background: #F5F7FA;
        border-radius: 8px;
        border: 1px solid #EBEEF5;
        text-align: center;
        line-height: 36px;
      }
      
    }
  }
</style>
