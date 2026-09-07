<template>
  <div class="help-details">
    <top></top>
    <img class="top-img" src="@/assets/images/topimg2.png" alt="">
    

    <div class="content-box">
      <p>Home > Help</p>

      <div class="details-box">
        <div>{{info.name}}</div>
        <div v-html="info.content"></div>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'


import {
  sel_list_details
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
    this.getsel_list_details()
  },
  methods: {
    getsel_list_details() {
      sel_list_details({
        id: this.$route.query.id
      }).then((res) => {
        this.info = res.data
        setTimeout(() => {
            var contentBox = document.getElementsByClassName('ql-editor')
            for(var i=0; i<contentBox.length; i++) {
              contentBox[i].setAttribute("contenteditable", false);
            }
          }, 100)
      })
    }
  },
}
</script>

<style scoped lang='scss'>
::v-deep(.ql-container) {
  width: 100% !important;
}
  .help-details {
    background: #F0F4F7;
    .top-img {
      // height: 350px;
      width: 100%;
    }
    
    .content-box {
      margin: 0 auto;
      width: 1420px;
      
      >:nth-child(1) {
        margin-top: 10px;
      }
      .details-box {
        background: #fff;
        // min-height: 800px;
        margin-top: 15px;
        margin-bottom: 25px;
        padding: 20px 50px;
        :nth-child(1) {
          border-bottom: 1px solid #E9E9E9;
          text-align: center;
          margin-bottom: 25px;
          padding-bottom: 25px;
        }
      }
    }
  }
</style>
