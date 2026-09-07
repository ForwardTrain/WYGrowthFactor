<template>
  <div class="hotDetails-box">
    <top></top>
    <img class="top-img" src="@/assets/images/top-img-2.png" alt="">

    <div class="content-box">
      <div class="content-top">
        <p>{{info.name}}</p>
        <div>
          <span>来源：{{info.source}}</span> <span>时间：{{info.publish_time}}</span>
        </div>
      </div>
      <div v-html="info.content"></div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'

import {
  Contentsel_list_details,
} from '@/api/common'
export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      info: {}
    }
  },
  mounted() {
    this.getContentsel_list_details()
  },
  methods: {
    getContentsel_list_details() {
      Contentsel_list_details({
        id: this.$route.query.id
      }).then((res) => {
        this.info = res.data
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .hotDetails-box {
    background: #F0F4F7;
    .top-img {
      // height: 350px;
      width: 100%;
    }
    .content-box {
      width: 1420px;
      background: #FFFFFF;
      margin: 0 auto;
      margin-bottom: 27px;
      margin-top: 27px;
      padding: 15px 20px;
      .content-top {
        text-align: center;
        >:nth-child(1) {
          font-weight: 500;
          font-size: 20px;
          margin-bottom: 10px;
        }
        >:nth-child(2) {
          color: #B5B5B5;
          :nth-child(1) {
            margin-right: 20px;
          }
        }
        border-bottom: 1px solid #E9E9E9;
        margin-bottom: 20px;
        padding-bottom: 25px;
      }
    }
  }
</style>
