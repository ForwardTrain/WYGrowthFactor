<template>
  <div class="tools-box">
    <top></top>

    <div class="content-box">
      <div class="content-left">
        <p>Tools</p>
        <div class="left-serch">
          <div @click="chooseLeft(1)" :style="leftIndex == 1 ? 'background: #F3F4F6;' : ''">Sequence similarity search (BLAST)</div>
          <div @click="chooseLeft(2)" :style="leftIndex == 2 ? 'background: #F3F4F6;' : ''">Multiple alignment (Clustal Omega)</div>
          <!-- <div>Secondary Structure Prediction</div>
          <div>3D structure prediction (Alphafold)</div>
          <div>Conserved domain search (CD-search)</div> -->
        </div>
      </div>


      <div class="content-right">
        <!-- <div class="right-top">
          <p class="navigation-prompt">Home > Browse > By ALL</p>
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
            <p>Advanced Search</p>
            <div>?</div>
            <p>Help</p>
          </div>
        </div> -->

        <page1 v-if="leftIndex == 1"></page1>
        <page2 v-if="leftIndex == 2"></page2>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'

import page1 from './page1.vue'
import page2 from './page2.vue'
export default {
  watch: {
    '$route.query.type': {
      handler(val) {
        if(val) {
          this.leftIndex = val
        } else {
          this.leftIndex = 1
        }
      }
    },

  },
  components: {
    top,
    bottom,
    page1,
    page2
  },
  data () {
    return {
      leftIndex: 1,
    }
  },
  mounted() {
    if(this.$route.query.type) {
      this.leftIndex = this.$route.query.type
    }
  },
  methods: {
    chooseLeft(type) {
      this.leftIndex = type
    },
  },
}
</script>

<style scoped lang='scss'>
  .tools-box {
    .content-box {
      display: flex;
      .content-left {
        width: 306px;
        padding: 25px 20px;
        >:nth-child(1) {
          font-weight: 500;
          font-size: 24px;
        }
        .left-serch {
          border-top: 1px solid #E9E9E9;
          margin-top: 10px;
          padding-top: 10px;
          >div {
            width: 266px;
            height: 38px;
            cursor: pointer;
            line-height: 38px;
            padding: 0 10px;
            // background: #F3F4F6;
          }
        }
      }
      .content-right {
        width: 1100px;
        // border: 1px solid red;
        margin-top: 15px;
        padding-right: 20px;
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
      }
    }
  }
</style>
