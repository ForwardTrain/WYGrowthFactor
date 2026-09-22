<template>
  <div class="searchResultsDetails-box">
    <div class="loading-box" v-show="loading">
      <todo2></todo2>
    </div>
    <top></top>
    <div v-if="noDetails" class="no-data">
      <div>
        No Data
      </div>
    </div>
    <div class="content-box"  v-else>
      <div class="content-left">
        <div class="left-top">
          <p>Detail results for </p>
          <p>{{spliceName()}}</p>
        </div>

        <div class="conditions-list">
          <div :style="listIndex  == 0 ? 'background: #F3F4F6;' : ''" @click="leftChoose(0)">
            General Information
          </div>
          <!-- <p>General information</p> -->
          <div :style="listIndex  == 1 ? 'background: #F3F4F6;' : ''" @click="leftChoose(1)">
            Protein Sequence
          </div>
          <div :style="listIndex  == 2 ? 'background: #F3F4F6;' : ''" @click="leftChoose(2)">
            Protein Function
          </div>
          <div v-show="showList.list3"  :style="listIndex  == 3 ? 'background: #F3F4F6;' : ''" @click="leftChoose(3)">
            Expression & Location
          </div>
          <div v-show="showList.list4" :style="listIndex  == 4 ? 'background: #F3F4F6;' : ''" @click="leftChoose(4)">
            Protein Structure
          </div>
          <div :style="listIndex  == 5 ? 'background: #F3F4F6;' : ''" @click="leftChoose(5)">
            Protein Interactions
          </div>
          <div :style="listIndex  == 6 ? 'background: #F3F4F6;' : ''" @click="leftChoose(6)">
            KEGG Pathways
          </div>
          <div v-show="showList.list7" :style="listIndex  == 7 ? 'background: #F3F4F6;' : ''" @click="leftChoose(7)">
            PTM
          </div>
          <div v-show="showList.list8" :style="listIndex  == 8 ? 'background: #F3F4F6;' : ''" @click="leftChoose(8)">
            Mutation & Disease
          </div>
        </div>
      </div>


      <div class="content-right">
        <!-- <div class="right-top">
          <div class="search-input-box">
            <div class="search-input">
              <div>
                <el-icon><Search /></el-icon>
                <el-input  v-model="name" placeholder="Search by keyword" />
              </div>
              <div>Search</div>
            </div>
          </div>

          <div class="right-text-box">
            <p>Advanced search</p>
            <div>?</div>
            <p>Help</p>
          </div>
        </div> -->

        <div class="Download-btn">
          <!-- <div><img src="@/assets/images/dc@2x.png" alt="">Download</div> -->
          <!-- <div><img src="@/assets/images/BLAST@2x.png" alt="">Blast</div> -->
          <!-- <div><img src="@/assets/images/alignment@2x.png" alt="">Alignment</div> -->
        </div>

        <page1 ref="page1" @upDataList="upDataList"  @noData="noData"></page1>

        <!-- <bottom class="bottom-box-1"></bottom> -->
      </div>
    </div>

    
  </div>
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'
import page1 from './page1.vue'

import todo2 from '../todo2.vue'


import {
  sel_search_details
} from '@/api/common'
export default {
  components: {
    top,
    bottom,
    page1,
    todo2
  },
  data () {
    return {
      loading: false,
      listIndex: '0',
      noDetails: false,

      showList: {
        list0: true,
        list1: true,
        list2: true,
        list3: true,
        list4: true,
        list5: true,
        list6: true,
        list7: true,
        list8: true,
      },
    }
  },
  created() {
    this.loading = true
  },
  mounted() {
    
    setTimeout(() => {
     
      this.loading = false
      setTimeout(() => {
        window.scrollTo({
          top: 0,
        });
      }, 1)
    }, 7000)

    // this.getsel_search_details()
  },
  methods: {
    /**
     * 
     */
    upDataList(list) {
      console.log(list, 22222)
      this.showList = list
    },
    /**
     * 截取名称
     */
    spliceName() {
      let name = ''
      if(this.$route.query.name) {
        let list = this.$route.query.name.split('(')
        name = list[0]
      }
      return name
    },
    noData(val) {
      this.noDetails = val
      this.loading = false
    },
    /**
     * 左侧选择
     */
    leftChoose(index) {
      this.listIndex = index
      this.$refs.page1.scrollToAnchor(`box${index}`)
    },
    
  },
}
</script>

<style scoped lang='scss'>
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  color: #959595;
  font-size: 23px;
}
::v-deep(.el-loading-mask) {
    background-color: #fff;
  }
  .loading-box {
    position: fixed;
    height: 100vh;
    width: 100vw;
    // border: 1px solid red;
    // margin-top: 10px;
    left: 50%;
    transform: translate(-50%);
    z-index: 9999;
  }
  .searchResultsDetails-box {
    // border: 1px solid green;
    .content-box {
      display: flex;
      width: 1420px;
      margin: 0 auto;
      margin-top: 5px;
      position: absolute;
      top: 70px;
      // height: 800px !important;
      background: #fff;
      .content-left {
        padding: 25px 20px;
        margin-left: 40px;
        width: 280px;
        min-width: 280px;
        // border: 1px solid red;
        // position: fixed;
        .left-top {
          // border-bottom: 1px solid #E9E9E9;
          padding-bottom: 15px;
          >:nth-child(1) {
            // font-weight: 500;
            font-size: 16px;
            span {
              font-weight: 400;
              font-size: 16px;
            }
          }
          >:nth-child(2) {
            font-weight: 500;
            font-size: 24px;
            margin-top: 10px;
          }
        }
        .conditions-list{
          border-top: 1px solid #E9E9E9;
          // border: 1px solid red;
          padding: 10px 0;
          >p {
            font-weight: 400;
            font-size: 16px;
            color: #999999;
          }
          >div {
            cursor: pointer;
            // width: 316px;
            height: 38px;
            font-size: 16px;
            background: #F3F4F6;
            line-height: 38px;
            padding: 0 12px;
            background: #fff;
          }
        }
      }

      .content-right {
        width: 100%;
        // border: 1px solid red;
        margin-right: 20px;
        height: calc(100vh - 90px);
        overflow: auto;
        // position: relative;
        .bottom-box-1 {
          // position: absolute;
          z-index: 9999;
          width: 100%;
          // position: fixed;
          // bottom: 0px;
        }
        .right-top {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .navigation-prompt {
            position: absolute;
            left: 0px;
            font-size: 12px;
            color: #B5B5B5;
          }
          .search-input-box {
            .search-input {
              display: flex;
        
              >:nth-child(1) {
                width: 420px;
                height: 50px;
                background: #FFFFFF;
                border-radius: 4px 0px 0px 4px;
                border: 1px solid #DCDFE6;
              // border-radius: 4px 0px 0px 4px;
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
            .search-line {
              display: flex;
              justify-content: space-between;
              color: #fff;
              font-weight: 500;
              :nth-child(2) {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
          .right-text-box {
            margin-left: 20px;
            display: flex;
            color: #135287;
            font-weight: 500;
            >:nth-child(1) {
              cursor: pointer;
            }
            >:nth-child(3) {
              cursor: pointer;
            }
            :nth-child(2) {
              cursor: pointer;
              width: 16px;
              height: 16px;
              background: #FFDC00;
              border-radius: 50%;
              text-align: center;
              line-height: 16px;
              margin-left: 25px;
              margin-right: 5px;
            }
          }
        }
        .Download-btn {
          // margin-top: 20px;
          display: flex;
          align-items: center;
          font-weight: 500;
          >div {
            display: flex;
            color: #135287;
            align-items: center;
            height: 36px;
            background: #F5F7FA;
            border-radius: 4px;
            border: 1px solid #EBEEF5;
            padding: 0 15px;
            margin-right: 20px;
            cursor: pointer;
          }
          img {
            margin-right: 6px;
            width: 14px;
          }
        }
      }
    }
  }
</style>
