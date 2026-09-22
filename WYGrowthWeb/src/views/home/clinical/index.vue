<template>
  <div class="clinical-box">
    <top></top>


    <div class="box-3">
      <div class="content-left">
        <p>Filter your results</p>

        <div>
          <div class="left-title">Phase</div>
          <div v-show="item2 != 'NA'" :style="leftItem == item2 ? 'background: #F3F4F6;' : ''" @click="chooseLeft(item2)" class="item2-box" v-for="(item2, index2) in leftList.disease_types" :key="index2">
            <!-- {{item2}} -->
            {{showText(item2)}}
            
          </div>

          <div class="left-title">Status</div>
          <div :style="leftItem2 == item2 ? 'background: #F3F4F6;' : ''" @click="chooseLeft2(item2)" class="item2-box" v-for="(item2, index2) in leftList.other_disease" :key="index2">
            <!-- {{item2}} -->
            {{showText(item2)}}
          </div>
        </div>
      </div>
      <div class="content-box">
      
        <div class="right-top">
          <p class="navigation-prompt">Home > Clinical Research</p>
          <div class="search-input-box">
            <div class="search-input">
              <div>
                <el-icon><Search /></el-icon>

                <el-popover placement="bottom" v-if="historyList && historyList.length" ref="popoverRef" :width="420" trigger="click">
                  <template #reference>
                    <el-input  v-model="title" placeholder="Search" />
                  </template>
                  <div class="history-box">
                    <div @click="CloseHistory(item)" v-for="(item, index) in historyList" :key="index" >
                      <p  >{{item}}</p>
                      <el-icon class="Close-btn2" @click.stop="deletehistoryList(index)"><Close /></el-icon>
                    </div>
                  </div>
                </el-popover>


                <el-input  v-else v-model="title" placeholder="Search" />
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


        <div class="page-box">
          <div class="page-btn">
            <div class="Download-btn" @click="downLoadFaily()" :style="!this.multipleSelection.length ? 'cursor: not-allowed; opacity: 0.5' : ''">
              <el-icon><Download /></el-icon>
              Download
            </div>

            <div class="Download-btn" v-if="sortOrder != 'desc'" @click="sortList('desc')">
              <el-icon><SortUp /></el-icon>
              Most recent
            </div>
            <div class="Download-btn"  v-else @click="sortList(null)">
              <el-icon><SortDown /></el-icon>
              Most recent
            </div>
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

        <div class="table-box" v-loading="loading"> 
          <el-config-provider :locale="locale">
          <el-table :data="results.list" 
                  ref="multipleTableRef"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  border>
              <!-- <el-table-column prop="student_name" label="访问时间" width="10%"/> -->
              <el-table-column width="60px" align="center" type="selection"/>
            
              <!-- <el-table-column prop="nct_number" label="NCT Number" width="10%"/> -->
              <el-table-column prop="nct_number" align="center"  width="115px" label="ID" >
                <template #default="scoped">
                  <p style="color: #135287;cursor: pointer;" @click="goDetails(scoped.row)">{{scoped.row.nct_number}}</p>
                </template>
              </el-table-column>
              
              <el-table-column prop="briefTitle" width="280px" label="Study Title" >
                <template #default="scoped">
                  <p v-html="scoped.row.briefTitle"></p>
                  <!-- <p class="href-p" @click="openUrl(scoped.row)">{{scoped.row.briefTitle}}</p> -->
                </template>
              </el-table-column>
              <el-table-column prop="conditions"  show-overflow-tooltip label="Conditions" />
              <el-table-column prop="Interventions"  show-overflow-tooltip label="Interventions" />

              <!-- <el-table-column prop="Interventions"  align="center"  label="Interventions">
                <template #default="scoped">
                  <p v-html="scoped.row.Interventions"></p>
                </template>
              </el-table-column> -->


              <el-table-column prop="overallStatus" label="Status" width="120px"  >
                <template #default="scoped">
                  <p class="overallStatus-text" :style="scoped.row.overallStatus == 'Unknown' ? 'background-color: rgb(124,111,59)' : scoped.row.overallStatus == 'Completed' ? 'background-color: rgb(136,35,28)' : scoped.row.overallStatus == 'Recruiting' ? 'background-color: rgb(77,122,45)' : scoped.row.overallStatus == 'Suspended' ?'background-color: #989595;' : 'background-color: #135287;'">{{scoped.row.overallStatus}}</p>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="phases" label="Phases" width="5%"/> -->
              <el-table-column prop="phases"  align="center" label="Phases" width="120px" >
                <template #default="scoped">
                  <!-- color: #8B0000; -->
                  <p style="text-align: center;">{{scoped.row.phases}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="leadSponsor" show-overflow-tooltip label="Sponsor" />
              <el-table-column prop="locations" show-overflow-tooltip label="Locations" />




              <!-- <el-table-column prop="nct_number" label="NTC Number" width="6%">
              <template #default="scoped">
                  <p class="href-p" @click="openUrl(scoped.row)">{{scoped.row.nct_number}}</p>
                </template>
              </el-table-column> -->
              <!-- <el-table-column prop="studyType" label="Study Type" width="10%"/> -->


              <!-- <el-table-column prop="overallStatus" label="Status" width="6%"/> -->

              

              
              
              
              
              <!-- <el-table-column prop="lat" label="纬度" width="10%"/>
              <el-table-column prop="lng" label="经度" width="10%"/>
              <el-table-column prop="status" label="状态" width="10%">
                <template #default="scoped">
                  <p>{{scoped.row.status == 1 ? '启用' : '禁用'}}</p>
                </template>
              </el-table-column>
              <el-table-column  width="15%" align="center" label="操作">
                <template #default="scoped">
                  <div class="table-operation">
                    <p @click="changeType(scoped.row, 1)" v-if="scoped.row.status == 2">启用</p>
                    <p @click="changeType(scoped.row, 2)" v-else>禁用</p>
                    <p @click="goLook(scoped.row)" >查看</p>
                    
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
  sel_CT_list,
  sel_TL_list_search,
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      sortOrder: 'desc',
      title: '',
      locale: en,
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,

      multipleSelection: [],
      leftList: [],
      leftItem: '',
      leftItem2: '',
      loading: false,

      historyList: [],
    }
  },
  mounted() {
    if(localStorage.getItem('historyList3')) {
      this.historyList = JSON.parse(localStorage.getItem('historyList3'))
    }
    this.getList()
    this.getsel_TL_list_search()
  },
  methods: {
    sortList(val) {
      this.sortOrder = val
      this.getList()
    },

    showText(item) {
      if(item != 'NA') {
        return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      } else {
        return item
      }
    },
    // capitalizeFirstLetter(string) {
    //   return string.charAt(0).toUpperCase() + string.slice(1);
    // },
    deletehistoryList(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('historyList3', JSON.stringify(this.historyList))
    },
    CloseHistory(val) {
      this.title = val
      this.$refs.popoverRef.hide()
    },
    goHelp() {
      this.$router.push({
        path: '/helpList',
      })
    },
    downLoadFaily() {
      this.$axios({
        url: `${this.$global.downUrlLeft}/WZGrowth/HomeThreeFile/sel_CT_list_export`,
        method: "post",
        data: {
          list: this.multipleSelection,
        },
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token,
        },
        responseType: 'blob'
      }).then((res) => {
        // 
        var blob = new Blob([res.data])
        var downloadElement = document.createElement('a')
        var href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        let time = Date.parse(new Date()) 
        downloadElement.download = `${time}.xlsx`
        // downloadElement.download = `${time}.xlsx`
        // downloadElement.download = ``
        // downloadElement.download = `${this.$route.query.time}-月结算单.xlsx` //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        this.$message({
          type: 'success',
          message: '下载成功'
        })
        // this.downLoading = false
      })
    },

    chooseLeft(item) {
      this.leftItem = item
      this.getList()
    },
    chooseLeft2(item) {
      this.leftItem2 = item
      this.getList()
    },

    getsel_TL_list_search() {
      sel_TL_list_search({}).then((res) => {
        this.leftList = res.data
      })
    },
    openUrl(row) {
      window.open(row.studyUrl)
    },
    goRoutr() {
      this.$router.push({
        path: '/helpList'
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

    goDetails(row) {
      this.$router.push({
        path: '/clinicalDetails',
        query: {
          id: row.id,
          phases: row.phases,
          overallStatus: row.overallStatus,
        }
      })
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

    getList() {
      if(this.title && !this.historyList.includes(this.title)) {
        this.historyList.unshift(this.title)
        localStorage.setItem('historyList3', JSON.stringify(this.historyList.slice(0, 5)))
      }
      

      this.loading = true
      sel_CT_list({
        // name: this.leftItem,
        sortOrder: this.sortOrder,
        phases: this.leftItem,
        overallStatus: this.leftItem2,
        title: this.title,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
        this.loading = false
      })
    },
  },
}
</script>

<style scoped lang='scss'>

::v-deep(.cell) {
  word-break: keep-all;
  // >p {
  //   word-break: keep-all;
  // }
}
.history-box {
  >div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 1px solid red;
    margin: 10px 0;
    cursor: pointer;
  }
  >div:hover {
    p {
      color: #4078f2;
    }
  }
  .Close-btn2 {
    font-size: 20px;
    cursor: pointer;
  }
}
::v-deep(.el-table th.el-table__cell>.cell) {
  font-weight: 600;
  text-align: center;
}
.overallStatus-text{
  padding: 5px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  // white-space: nowrap !important;
  word-break: break-all !important;   
  overflow-wrap: break-word; /* 或者 word-wrap: break-word; */
  white-space: normal; /* 允许文本根据容器宽度自动换行 */
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
.box-3 {
  display: flex;
  // justify-content: center;
  // border: 1px solid red;
  .content-left {
    width: 280px;
    min-width: 280px;
    // border: 1px solid red;
    padding: 70px 20px;
    >:nth-child(1) {
      font-weight: 500;
      font-size: 14px;
      color: #135287;
    }
  }
}
  .clinical-box {
    
    .item2-box {
      // background: red;
      // margin:10px 0;
      // font-weight: 600;
      cursor: pointer;
      padding: 10px 2px;
      // font-weight: 400;
      font-size: 16px;
      color: #333333;
    }
    .href-p {
      cursor: pointer;
      color: #00AEFF;
    }
    .left-title {
      // font-weight: 400;
      font-weight: 600;
      font-size: 16px;
      // color: #999999;
      color: #333;
      padding: 10px 0;
      border-top: 1px solid #E9E9E9;
      margin-top: 15px;
    }
    .content-box {
      // width: 1080px;
      margin: 0 auto;
      margin-top: 15px;
      margin-right: 15px;
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
    .page-box {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .page-btn {
        display: flex;
        >div {
          display: flex;
          align-items: center;
        }
      }
    }
    .table-box {
      margin-top: 15px;
      margin-bottom: 20px;
    }
  }
</style>
