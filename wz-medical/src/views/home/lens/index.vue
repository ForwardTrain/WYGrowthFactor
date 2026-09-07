<template>
  <div class="clinical-box">

    <div class="down-bg" v-if="showDown">
      <div class="down-box">
        <div class="title-box">
          <p>Download</p>
          <div>
            <el-icon style="cursor: pointer;" @click="showDown = false"><Close /></el-icon>
          </div>
        </div>

        <div class="down-choose">
          <p style="margin-right: 20px">Number of Studies</p>
          <div>
             <el-select
              v-model="value"
              placeholder=" "
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        <div class="bottom-btn">
          <div @click="showDown = false">Cancel</div>
          <div :style="!this.value ? 'cursor: not-allowed; opacity: 0.5' : ''" @click="downLoadFaily()">Confirm</div>
        </div>
      </div>
    </div>


    <top></top>

    <div class="content-box">
      
      <div class="right-top">
        <p class="navigation-prompt">Home > Patent</p>
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
          <div class="Download-btn" @click="openDownLoadFaily()">
            <el-icon><Download /></el-icon>
            Download
          </div>

          <div class="Download-btn" v-if="sortOrder != 'desc'" @click="sortList('desc')">
            <el-icon><SortUp /></el-icon>
            Most recent
          </div>
          <div class="Download-btn" v-else @click="sortList(null)">
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
        <div class="card-box" v-for="(item, index) in results.list" :key="index" >
          <div v-html="item.title" style="background: #f5f5f5 !important;font-size: 22px !important;"></div>


          <div>
            <div class="line-box3">
              <p class="line-title" style="width: 130px;margin-right: 0px;">Identifiers</p>
              <p class="line-content" style="width: 150px;">{{item.identifers  || '-'}}</p>
              <p class="line-title">Legal Status</p>
              <p class="line-content">{{item.LegalStatus  || '-'}}</p>
            </div>
            <div class="line-box3">
              <p class="line-title" style="width: 130px;margin-right: 0px;">Application No</p>
              <p class="line-content" style="width: 150px;">{{item.ApplicationNumber  || '-'}}</p>
              <p class="line-title">Filed</p>
              <p class="line-content">{{item.filed  || '-'}}</p>
              <p class="line-title">Published</p>
              <p class="line-content">{{item.date_published  || '-'}}</p>
              <p class="line-title">Earliest Priority</p>
              <p class="line-content">{{item.EarliestPriorityDate  || '-'}}</p>
            </div>
            <div class="line-box3">
              <p class="line-title" style="width: 130px;margin-right: 0px;">Inventors</p>
              <p class="line-content">{{item.Inventors || '-'}}</p>
            </div>

            <div class="line-box3">
              <p class="line-title" style="width: 130px;margin-right: 0px;">LensID</p>
              <p class="line-content LensID-box" @click="goRouter2(item)">{{item.LensID  || '-'}}</p>
            </div>

            <div v-if="false" class="line-box3" v-show="item.ApplicationNumber">
              <p class="line-title" style="width: 130px;margin-right: 0px;">Additional Info</p>
              <p class="line-content  ApplicationNumber-box">{{item.ApplicationNumber}}</p>
            </div>
          </div>

          <div class="abstract-box" v-show="item.abstract">
           <p>Abstract</p>
           <!-- <div v-html="item.abstract">
           </div> -->
           <div style="line-height: 20px;">
            {{item.abstract}}
           </div>
          </div>


          <!-- <div>
            <div>
              <p>DisplayKey：</p>
              <div>{{item.DisplayKey}}</div>
              <p>Family：</p>
              <div>{{item.ExtendedFamilySize}}s / {{item.SimpleFamilySize}}ex</div>
              <p>Family Jurisdictions：</p>
              <div>{{item.SimpleFamilyMemberJurisdictions}}</div>
              <p>Legal Status：</p>
              <div>{{item.LegalStatus}}</div>
            </div>
            <div>
              <p>Application No：</p>
              <div>{{item.ApplicationNumber}}</div>
              <p>Filed：</p>
              <div>{{item.ApplicationDate}}</div>
              <p>Published：</p>
              <div>{{item.PublicationDate}}</div>
              <p>Earliest Priority：</p>
              <div>{{item.EarliestPriorityDate}}</div>
            </div>
            <div>
              <p>Applicants：</p>
              <div>{{item.Applicants}}</div>
            </div>
            <div>
              <p>Inventors：</p>
              <div>{{item.Inventors}}</div>
            </div>
            <div>
              <p>Cited Works：</p>
              <div>{{item.NPLCitationCount}}</div>
              <p>Cited by：</p>
              <div>{{item.CitedbyPatentCount}}</div>
              <p>Cites：</p>
              <div>{{item.CitesPatentCount}}</div>
              <p>Collections：</p>
              <div>{{item.NPLCitationCount}}</div>
              <p>LensID：</p>
              <div>{{item.LensID}}</div>
            </div>
            <div>
              <p>Additional Info：</p>
              <div>-</div>

            </div>
          </div> -->
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
  sel_TL_list,
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      sortOrder: 'desc',
      loading: false,
      title: '',
      locale: en,
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,

      showDown: false,
      value: '',
      options: [
        {
          value: '10',
          label: 'Top 10 Studies'
        },{
          value: '20',
          label: 'Top 20 Studies'
        },{
          value: '50',
          label: 'Top 50 Studies'
        },{
          value: '100',
          label: 'Top 100 Studies'
        }
      ],
      historyList: []
    }
  },
  mounted() {
    this.getList()
    if(localStorage.getItem('historyList4')) {
      this.historyList = JSON.parse(localStorage.getItem('historyList4'))
    }
  },
  methods: {
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
    goHelp() {
      this.$router.push({
        path: '/helpList',
      })
    },
    openDownLoadFaily() {
      this.showDown = true
    },
    downLoadFaily() {
      if(!this.value) {
        return
      }
      this.$axios({
        url: `${this.$global.downUrlLeft}/WZGrowth/HomeThreeFile/sel_TL_list_export`,
        method: "post",
        data: {
          limitNum: Number(this.value),
          title: this.title
          // list: this.multipleSelection,
        },
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token,
        },
        responseType: 'blob'
      }).then((res) => {
        // 
        // var blob = new Blob([res.data])
        // var downloadElement = document.createElement('a')
        // var href = window.URL.createObjectURL(blob) //创建下载的链接
        // downloadElement.href = href
        // let time = Date.parse(new Date()) 
        // downloadElement.download = `${time}.xlsx`
        // // downloadElement.download = `${time}.xlsx`
        // // downloadElement.download = ``
        // // downloadElement.download = `${this.$route.query.time}-月结算单.xlsx` //下载后文件名
        // document.body.appendChild(downloadElement)
        // downloadElement.click() //点击下载
        // document.body.removeChild(downloadElement) //下载完成移除元素
        // window.URL.revokeObjectURL(href) //释放掉blob对象

        const link = document.createElement('a'); // 创建元素
        let blob = new Blob([res]);
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `${time}.xlsx`) // 为下载后的文件命名
        document.body.appendChild(link)
        link.click(); // 点击下载
        document.body.removeChild(link) // 下载完成后移除元素
        window.URL.revokeObjectURL(link.href) // 释放blob对象

        this.$message({
          type: 'success',
          message: '下载成功'
        })
        this.showDown = false
      })
    },
    goRoutr() {
      this.$router.push({
        path: '/helpList'
      })
    },

    goRouter2(item) {
      window.open(`https://www.lens.org/lens/patent/${item.LensID}`)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    getList() {
      this.loading = true
      if(this.title && !this.historyList.includes(this.title)) {
        this.historyList.unshift(this.title)
        localStorage.setItem('historyList4', JSON.stringify(this.historyList.slice(0, 5)))
      }
      sel_TL_list({
        sortOrder: this.sortOrder,
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
.bottom-btn{
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  >div {
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #F5F7FA;
    box-shadow: 0px 2px 24px 0px rgba(0,0,0,0.3);
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    cursor: pointer;
  }
  :nth-child(2) {
    background: #1990FF;
    color: #fff;
    margin-left: 50px;
    
  }
}
.line-box3 {
      display: flex;
      // align-items: center;
      margin: 20px 0;
      padding: 0 20px;
      .line-title {
        font-weight: 500;
        font-size: 16px;
        // color: #333333;
        color: #702330;
        // width: 130px;
        text-align: left;
        margin-right: 20px;
        // border: 1px solid red;
      }
      .line-content {
        // margin-left: 30px !important;
        margin-right: 50px;
        font-weight: 300;
      }
      .ApplicationNumber-box {
        border-radius: 4px;
        border: 1px solid #00AEFF;
        padding: 5px 10px;
        color: #00AEFF;
      }
      .LensID-box {
        cursor: pointer;
        color: #135287;
      }
    }
.overallStatus-text{
  padding: 5px;
  color: #fff;
  border-radius: 4px;
}
  .clinical-box {
    // position: relative;
    .down-bg {
      position:fixed;
      z-index: 100;
      width: 100vw;
      height: 100vh;
      // background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .down-box {
      width: 700px;
      height: 260px;
      background: #FFFFFF;
      box-shadow: 0px 2px 24px 0px rgba(0,0,0,0.3);
      border: 1px solid #E9E9E9;
      .title-box {
        width: 700px;
        height: 50px;
        background: #166AA9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        // box-shadow: 0px 2px 24px 0px rgba(0,0,0,0.3);
        :nth-child(1) {
          font-weight: 400;
          font-size: 20px;
          color: #FFFFFF;
        }
        >:nth-child(2) {
          cursor: pointer;
        }
      }
      .down-choose {
        // border: 1px solid red;
        font-weight: 400;
        font-size: 16px;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;

      }
    }
    .content-box {
      width: 1420px;
      margin: 0 auto;
      margin-top: 15px;
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
    }
    .table-box {
      
      margin-bottom: 20px;
      min-height: 100px;
      .card-box {
        cursor: pointer;
        // height: 482px;
        margin-top: 15px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #DCDFE6;
        >:nth-child(1) {
          padding: 10px 15px;
          border-bottom: 1px solid #DCDFE6;
          font-weight: 500;
          font-size: 26px;
        }
        // >:nth-child(2) {
        //   padding: 10px 15px;
        //   >div {
        //     display: flex;
        //     align-items: center;
        //     margin: 15px 0;
        //     >p {
        //       font-weight: 500;
        //       font-size: 16px;
        //       width: 180px;
        //       text-align: right;
        //     }
        //   }
        // }
        // >:nth-child(3) {
        //   padding: 10px 15px;
        //   border-top: 1px solid #DCDFE6;
        //   font-size: 16px;
        // }
      }
    }
  }

.abstract-box {
  padding: 20px;
  border-top: 1px solid #DCDFE6;
  >:nth-child(1) {
    font-weight: 600;
    font-size: 16px;
    color: #333333;
    margin-bottom: 10px;
  }
  >div {
    font-weight: 400;
    font-size: 16px;
    color: #333333;
  }
}
.page-btn {
        display: flex;
        >div {
          display: flex;
          align-items: center;
        }
      }
</style>
