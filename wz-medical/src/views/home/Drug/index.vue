<template>
  <div class="Drug-box">

    <!-- <div v-html="todo1"></div> -->


    <top></top>

    <div class="content-box">
      <div class="right-top">
        <p class="navigation-prompt">Home > Drug</p>
        <div class="search-input-box">
          <div class="search-input">
            <div>
              <el-icon><Search /></el-icon>

              <el-popover placement="bottom" v-if="historyList && historyList.length" ref="popoverRef" :width="420" trigger="click">
                  <template #reference>
                    <el-input  v-model="title"  @input="changedianame"   placeholder="Search" />
                  </template>
                  <div class="history-box">
                    <div @click="CloseHistory(item)" v-for="(item, index) in historyList" :key="index" >
                      <p  >{{item}}</p>
                      <el-icon class="Close-btn2" @click.stop="deletehistoryList(index)"><Close /></el-icon>
                    </div>
                  </div>
                </el-popover>


              <el-input  v-else v-model="title"  @input="changedianame"  placeholder="Search" />


            </div>
            <div @click="getList()">Search</div>
          </div>
        </div>

        <div class="right-text-box" @click="goRoutr()">
          <p></p>
          <div @click="goHelp()">?</div>
          <p @click="goHelp()">Help</p>
        </div>
      </div>


      <div class="page-box2">
        <div class="page-btn">
          <div class="Download-btn" v-if="sortOrder != 'desc'" @click="sortList('desc')">
            <el-icon><SortUp /></el-icon>
            Most recent
          </div>
          <div class="Download-btn" v-else @click="sortList(null)">
            <el-icon><SortDown /></el-icon>
            Most recent
          </div>
          <!-- <div class="Download-btn" @click="openDownLoadFaily()">
              <el-icon><Download /></el-icon>
              Download
            </div> -->
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


      <div class="page-box" >
        <div class="page-content" v-for="(item, index) in results.list" :key="index">
          <div class="title-box">
            <!-- {{item.drugNameEn}} ({{item.approvalNumber}}) -->
            <span v-html="item.drugNameEn"></span> <span v-html="item.approvalNumber"></span>
          </div>
          <div class="content-1">
            <p class="title">Basic Information</p>
            <div class="line-box">
              <div>
                <p class="title-p">Trade Name:&nbsp;</p>
                <p class="text-p"><span v-html="item.tradeName"></span></p>
              </div>
              <div>
                <p class="title-p">Specifications:&nbsp;</p>
                <p class="text-p"><span v-html="item.specifications"></span></p>
              </div>
            </div>
            
            <div class="line-box">
              <div>
                <p class="title-p">Dosage Form:&nbsp;</p>
                <!-- <p class="text-p">{{item.dosageForm}}</p> -->
                <p class="text-p"><span v-html="item.dosageForm"></span></p>
              </div>
              <div>
                <p class="title-p">ATC classification:&nbsp;</p>
                <!-- <p class="text-p">{{item.atc}}</p> -->
                <p class="text-p"><span v-html="item.atc"></span></p>
              </div>
            </div>

            <div class="line-box">
              <div>
                <p class="title-p">Target:&nbsp;</p>
                <!-- <p class="text-p">{{item.target}}</p> -->
                <p class="text-p"><span v-html="item.target"></span></p>
              </div>
              <div>
                <p class="title-p">Active Ingredient:&nbsp;</p>
                <!-- <p class="text-p">{{item.activeIngredient}}</p> -->
                <p class="text-p"><span v-html="item.activeIngredient"></span></p>
              </div>
            </div>


          </div>

          <div class="content-1 line-1">
            <p class="title">Listing Information</p>
            <div class="line-box">
              <div>
                <p class="title-p">Approval Number:&nbsp;</p>
                <!-- <p class="text-p">{{item.approvalNumber}}</p> -->
                <p class="text-p"><span v-html="item.approvalNumber"></span></p>
              </div>
              <div>
                <p class="title-p">Approval Date:&nbsp;</p>
                <!-- <p class="text-p">{{item.approvalDate}}</p> -->
                <p class="text-p"><span v-html="item.approvalDate"></span></p>
              </div>
            </div>
            
            <div class="line-box">
              <div>
                <p class="title-p">Marketing Authorization Holder:&nbsp;</p>
                <!-- <p class="text-p">{{item.marketingAuthorizationHolder}}</p> -->
                <p class="text-p"><span v-html="item.marketingAuthorizationHolder"></span></p>
              </div>
              <div>
                <p class="title-p">Address of Marketing Authorization Holder:&nbsp;</p>
                <!-- <p class="text-p">{{item.addressOfMarketingAuthorizationHolder}}</p> -->
                <p class="text-p"><span v-html="item.addressOfMarketingAuthorizationHolder"></span></p>
              </div>
            </div>

            <div class="line-box">
              <div>
                <p class="title-p">Manufacturer:&nbsp;</p>
                <!-- <p class="text-p">{{item.manufacturer}}</p> -->
                <p class="text-p"><span v-html="item.manufacturer"></span></p>
              </div>
              <div>
                <p class="title-p">Manufacturer's Address:&nbsp;</p>
                <!-- <p class="text-p">{{item.manufacturerAddress}}</p> -->
                <p class="text-p"><span v-html="item.manufacturerAddress"></span></p>
              </div>
            </div>


          </div>

          <div class="content-1 line-1">
            <p class="title">Medical Insurance Information</p>
            <div class="line-box">
              <div>
                <p class="title-p">Medical Insurance Classification:&nbsp;</p>
                <p class="text-p">{{item.medicalInsuranceClassification}}</p>
                <p class="text-p"><span v-html="item.medicalInsuranceClassification"></span></p>
              </div>
              <div>
                <p class="title-p">Medical Insurance Number:&nbsp;</p>
                <!-- <p class="text-p">{{item.medicalInsuranceNumber}}</p> -->
                <p class="text-p"><span v-html="item.medicalInsuranceNumber"></span></p>
              </div>
            </div>
            
            <div class="line-box">
              <div>
                <p class="title-p">Usage Scope:&nbsp;</p>
                <p class="text-p"><span v-html="item.usageScope"></span></p>
                <!-- <p class="text-p">{{item.usageScope}}</p> -->
              </div>
              <div>
                
              </div>
            </div>

            <div class="line-box">
              <div>
                <p class="title-p">OCT/Prescription Drug:&nbsp;</p>
                <p class="text-p"><span v-html="item.octPrescriptionDrug"></span></p>
                <!-- <p class="text-p">{{item.octPrescriptionDrug}}</p> -->
              </div>
              <div>
                
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import bottom from '../bottom/index.vue'
import top from '../top/index.vue'
import en from 'element-plus/es/locale/lang/en'


import {
  drugInfoPage,
} from '@/api/common'

// import aa from '../aa.html'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      // todo1: aa,
      sortOrder: 'desc',

      locale: en,
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,

      historyList: [],

      title: '',
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    changedianame(val) {
      const filteredValue = val.replace(/\(|\)|\（|\）/g, '');
      // const filteredValue = val.replace(/[0-9]/g, '');
      // const filteredValue2 = val.replace(/\)/g, ''); // 例如，移除所有数字
      this.title = filteredValue;
      console.log(val, 2222)
    },

    sortList(val) {
      this.sortOrder = val
      this.getList()
    },
    deletehistoryList(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('historyList4', JSON.stringify(this.historyList))
    },
    CloseHistory(val) {
      this.title = val
      this.$refs.popoverRef.hide()
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    goHelp() {
      this.$router.push({
        path: '/helpList',
      })
    },
    goRoutr() {
      this.$router.push({
        path: '/helpList'
      })
    },

    getList() {
      drugInfoPage({
        sortOrder: this.sortOrder,
        drugName: this.title,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .Drug-box {
    .content-box {
      width: 1420px;
      margin: 0 auto;
      margin-top: 15px;
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
    .page-box2 {
      display: flex;
      justify-content: space-between;
    }
    .page-box {
      // display: flex;
      // justify-content: space-between;
      margin-top: 20px;
      .page-content {
        margin-bottom: 20px;
        // height: 100px;
        width: 100%;
        margin-top: 15px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #DCDFE6;
      }
      .title-box {
        font-size: 22px;
        font-weight: 500;
        padding: 10px 15px;
        background: #f5f5f5;
        border-bottom: 1px solid #DCDFE6;
      }
      .line-1 {
        border-top: 1px solid #DCDFE6;
      }
      .content-1 {
        padding: 15px;
        .title {
          width: 100%;
          // text-decoration: underline;
          border-bottom: 1px solid #DCDFE6;

          color: #702330;
          font-size: 18px;
          font-weight: 500;
        }
      }
      .line-box {
        display: flex;
        align-items: center;
        // border: 1px solid red;
        padding-top: 20px;
        >div {
          min-width: 40%;
          display: flex;
          align-items: center;
          .title-p {
            // width: 310px;
            font-weight: 500;
            font-size: 16px;
            // color: #702330;
            // text-align: right;
          }
          .text-p {
            font-size: 16px;
            // font-weight: 500;
          }
        }
      }
    }
  }

  .page-btn {
        display: flex;
        >div {
          display: flex;
          align-items: center;
        }
      }

.Download-btn {
  color: #135287 !important;
  display: flex;
  align-items: center;
  height: 36px;
  background: #F5F7FA;
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  padding: 0 15px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
