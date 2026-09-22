<template>
  <div class="Browse-box">
    <top></top>
    <img class="top-img" src="@/assets/images/topimg3.png" alt="">
    <div class="select-type-box">
      <div :style="selectIndex == 1 ? 'background: rgba(20,95,151,0.7);' : ''">By All</div>
      <div :style="selectIndex == 2 ? 'background: rgba(20,95,151,0.7);' : ''">By Family</div>
      <div :style="selectIndex == 3 ? 'background: rgba(20,95,151,0.7);' : ''">By Function</div>
      <div :style="selectIndex == 4 ? 'background: rgba(20,95,151,0.7);' : ''">By Receptor</div>
      <div :style="selectIndex == 5 ? 'background: rgba(20,95,151,0.7);' : ''">By Disease</div>
    </div>

    <div class="content-box">
      <div class="content-left">
        <div class="left-top">
          <p>By Family</p>
          <p>Filter your results</p>
        </div>

        <div class="left-Select">
          <p>Popular families</p>

          <el-radio-group style="width: 180px"  v-model="is_push" class="ml-4">
            <el-radio label="1" size="large">wound healing (128,838)</el-radio>
            <el-radio label="1" size="large">wound healing (128,838)</el-radio>
            <el-radio label="1" size="large">wound healing (128,838)</el-radio>
            <el-radio label="1" size="large">wound healing (128,838)</el-radio>
            <el-radio label="1" size="large">wound healing (128,838)</el-radio>
            <el-radio label="1" size="large">wound healing (128,838)</el-radio>
          </el-radio-group>
        </div>
        <p class="Other-families">Other families</p>

        <div class="search-line-2">
          <div>
            <el-icon><Search /></el-icon>
            <el-input  v-model="name" placeholder="Search" />
          </div>
          <div>Go</div>
        </div>

      </div>

      <!-- // 右 -->
      <div class="content-right">
        <div class="right-top">
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
            <div @click="goHelp()">?</div>
            <p @click="goHelp()">Help</p>
          </div>
        </div>

        <div class="right-middle">
          <div>
            <div><img src="@/assets/images/dc@2x.png" alt="">Download</div>
            <div><img src="@/assets/images/BLAST@2x.png" alt="">Blast</div>
            <div><img src="@/assets/images/alignment@2x.png" alt="">Alignment</div>
          </div>
          <div>
            <el-config-provider :locale="locale">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next"
                :total="results.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-config-provider>
            
          </div>
        </div>

        <div class="right-bottom">
          <el-config-provider :locale="locale">
          <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
            <el-table-column width="5%" type="selection"/>
            <!-- <el-table-column prop="student_name" label="访问时间" width="10%"/> -->
            <el-table-column prop="country" label="DRGF ID" width="6%"/>
            <el-table-column prop="province" label="Protein names" width="10%"/>
            <el-table-column prop="address" label="Gene names" width="10%"/>
            <el-table-column prop="overseas_desc" label="Organism" width="10%"/>
            <el-table-column prop="isp" label="Families" width="10%"/>
            <el-table-column prop="ip" label="UniProt entry" width="10%"/>
            <!-- <el-table-column prop="registration_time" label="访客识别" width="10%"/> -->
            <!-- <el-table-column prop="overseas_desc" label="是否国外" width="10%"/>
            <el-table-column prop="lat" label="纬度" width="10%"/>
            <el-table-column prop="lng" label="经度" width="10%"/>
            <el-table-column prop="status" label="状态" width="10%">
              <template #default="scoped">
                <p>{{scoped.row.status == 1 ? '启用' : '禁用'}}</p>
              </template>
            </el-table-column> -->
            <!-- <el-table-column  width="15%" align="center" label="操作">
              <template #default="scoped">
                <div class="table-operation">
                  <p @click="changeType(scoped.row, 1)" v-if="scoped.row.status == 2">启用</p>
                  <p @click="changeType(scoped.row, 2)" v-else>禁用</p>
                  <p @click="goLook(scoped.row)" >查看</p>
                  
                  <p class="delete-p" @click="openDelete(scoped.row)">删除</p>
                </div>
              </template>
            </el-table-column> -->
          </el-table>
          </el-config-provider>
        </div>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>

import top from '../top/index.vue'
import bottom from '../bottom/index.vue'

import en from 'element-plus/es/locale/lang/en'

import {
  sel_hot_list,
} from '@/api/common'


export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      selectIndex: 1,
      locale: en,
      listIndex: '0-0',
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,
      multipleSelection: [],
    }
  },
  mounted() {
    
  },
  methods: {
    goHelp() {
      this.$router.push({
        path: '/helpList',
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    
    /**
     * 选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((item) => {
        this.multipleSelection.push(item.id)
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .Browse-box {
    .top-img {
      width: 100%;
      height: 300px;
    }
    .select-type-box {
      display: flex;
      height: 56px;
      background: rgba(0,0,0,0.7);
      color: #fff;
      margin-top: -60px;
      z-index: 9;
      position: relative;
      >div {
        width: 20%;
        line-height: 56px;
        text-align: center;
        cursor: pointer;
      }
    }
    .content-box {
      display: flex;
      .content-left {
        width: 360px;
        min-width: 360px;
        // border-right: 1px solid red;
        height: 800px;
        padding: 15px 20px;
        .search-line-2 {
          margin-top: 15px;
          display: flex;
          align-items: center;
          >:nth-child(1) {
            display: flex;
            align-items: center;
            width: 268px;
            height: 40px;
            background: #FFFFFF;
            border-radius: 4px 0px 0px 4px;
            border: 1px solid #DCDFE6;
            padding-left: 10px;
            ::v-deep(.el-input__wrapper) {
              box-shadow: none;
              
            }
          }
          >:nth-child(2) {
            cursor: pointer;
            width: 52px;
            height: 40px;
            background: #00AEFF;
            border-radius: 0px 4px 4px 0px;
            color: #fff;
            text-align: center;
            line-height: 40px;
          }
        }
        .left-top {
          // border-bottom: 1px solid #E9E9E9;
          padding-bottom: 15px;
          >:nth-child(1) {
            font-weight: 500;
            font-size: 24px;
            span {
              font-weight: 400;
              font-size: 16px;
            }
          }
          >:nth-child(2) {
            font-weight: 500;
            color: #135287;
            margin-top: 10px;
          }
        }
        .left-Select {
          border-top: 1px solid #E9E9E9;
          border-bottom: 1px solid #E9E9E9;
          padding: 10px 0;
          >p {
            font-size: 16px;
            color: #999999;
          }
        }
        .Other-families {
          font-size: 16px;
            color: #999999;
          margin-top: 10px;
        }
      }
      .content-right {
        margin-left: 10px;
        // border: 1px solid red;
        width: 100%;
        padding: 15px 20px;
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
        .right-middle {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          >:nth-child(1) {
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
        .right-bottom {
          margin-top: 20px;
        }
      }
    }
  }
</style>
