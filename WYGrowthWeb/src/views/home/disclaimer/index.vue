<template>
  <div class="help-box">
    <top></top>
    <img class="top-img" src="@/assets/images/topimg2.png" alt="">

    <div>
      <div class="search-top">
        <p>Home > disclaimer</p>

        <div>
          

          <!-- <div class="search-input">
            <div>
              <el-icon><Search /></el-icon>
              <el-input  v-model="name" placeholder="Search by keyword" />
            </div>
            <div @click="getHomeContentsel_list2">Search</div>
          </div> -->
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-left">
        <p style="font-weight: 500;font-size: 24px;margin-bottom: 10px;">disclaimer</p>
        <div v-for="(item, index) in letfList" :key="index">
          <div @click="chooseType(item, index)" :style="leftIndex == index ? 'background: #00AEFF; color: #fff;' : '' ">{{item.name}}</div>
        </div>
        
        
      </div>
      <div class="content-right" v-if="letfList.length">
        <div class="details-box">
          <div>{{detailsData.name}}</div>
          <div v-html="detailsData.content"></div>
        </div>
      </div>

      <div class="content-right" v-else>
        <div class="no-data">
          No data available
        </div>
      </div>

     

    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'

import {
  HomeContentsel_list,
  sel_list_details
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      leftIndex: 0,
      name: '',
      letfList: [],
      itemName: '',
      rightList: [],
      detailsData: {}
    }
  },
  mounted() {
    this.getHomeContentsel_list()
  },
  methods: {
    goDetails(item) {
      this.$router.push({
        path: '/helpDetails',
        query: {
          id: item.id
        }
      })
    },
    /**
     * 选择栏目
     */
    chooseType(item, index) {
      this.leftIndex = index
      this.getsel_list_details(item)
    },
    /**
     * 获取详情
     */
    getsel_list_details(item) {
      sel_list_details({
        id: item.id
      }).then((res) => {
        this.detailsData = res.data
        setTimeout(() => {
            var contentBox = document.getElementsByClassName('ql-editor')
            for(var i=0; i<contentBox.length; i++) {
              contentBox[i].setAttribute("contenteditable", false);
            }
          }, 100)
      })
    },
    /**
     * 左侧数据
     */
    getHomeContentsel_list() {
      HomeContentsel_list({
        type: 5,
        pageSize: 9999,
        pageIndex: 1,
      }).then((res) => {
        this.letfList = res.data.list
        if(res.data.list && res.data.list.length) {
          this.getsel_list_details(res.data.list[0])
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
::v-deep(.ql-container) {
  width: 100% !important;
}
  .help-box {
    background: #F0F4F7;
    .top-img {
      // height: 350px;
      width: 100%;
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
    .search-top {
      width: 1420px;
      margin: 0 auto;
      >p {
        color: #B5B5B5;
        margin-top: 15px;
      }
      >div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        >p {
          font-weight: 500;
          font-size: 24px;
        }
      }
      .search-input {
        display: flex;
        >:nth-child(1) {
          width: 417px;
          height: 50px;
          background: #FFFFFF;
          border-radius: 4px 0px 0px 4px;
          display: flex;
          align-items: center;
          padding: 0 18px;

          ::v-deep(.el-input__wrapper) {
            box-shadow: none;
            
          }
        }
        >:nth-child(2) {
          width: 132px;
          height: 50px;
          background: #00AEFF;
          border-radius: 0px 4px 4px 0px;
          text-align: center;
          line-height: 50px;
          font-weight: 500;
          font-size: 16px;
          color:#fff;
          cursor: pointer;
        }
      }
    }
    .no-data {
      text-align: center;
      color: #B5B5B5;
      margin-top: 100px;
      margin-bottom: 100px;
    }
    .content-box {
      width: 1400px;
      margin: 0 auto;
      display: flex;
      margin-top: 15px;
      margin-bottom: 15px;
      .content-left{
        margin-right: 10px;
        
        >div {
          width: 200px;;
          min-width: 200px;;
          >div {
            width: 200px;
            height: 50px;
            padding: 0 15px;
            line-height: 50px;
            cursor: pointer;
            background: #fff;
          }
        }
        // div {
        //   line-height: 50px;
        //   padding: 0 15px;
        //   cursor: pointer;
        //   height: 50px;
        //   width: 200px;
        //   background: #fff;
        // }
        
      }
      .content-right {
        width: 100%;
        .article-box {
          cursor: pointer;
          background: #fff;
          margin-bottom: 20px;
          >:nth-child(1) {
            height: 62px;
            line-height: 62px;
            background: #FFFFFF;
            padding: 0 15px;
            border-bottom: 1px solid #DCDFE6;
            display: flex;
            align-items: center;
          }
          >:nth-child(2) {
            padding: 20px;
          }
        }
      }
    }
  }
</style>
