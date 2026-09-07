<template>
  <div class="GeenMedical-box">
    <top></top>

    <div class="content-box">
      
      <div class="right-top">
        <p class="navigation-prompt">Home > GeenMedical</p>
        <div class="search-input-box">
          <div class="search-input">
            <div>
              <el-icon><Search /></el-icon>
              <el-input  v-model="title" placeholder="Search by keyword" />
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
        <div></div>
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
        <div class="card-box" v-for="(item, index) in results.list" :key="index">
          <div>{{item.article_title}}</div>
          <div>
            <div>
              <p>影像因子：</p>
              <div>{{item.factor}}</div>
              <p style="cursor: pointer; color: #00AEFF;" @click="goRouter2(item.PMID_url)">PMID：</p>
              <div style="cursor: pointer;color: #00AEFF;" @click="goRouter2(item.PMID_url)">{{item.PMID}}</div>
              <p>期刊年卷：</p>
              <div>{{item.medlineTA}};{{item.journal_dp}};{{item.journal_volume}};{{item.article_medlinePgn}}</div>
            </div>
            <div>

      

              <p style="cursor: pointer;color: #00AEFF;" @click="goRouter2(item.identities_doi_url)">DOI：</p>
              <div style="cursor: pointer;color: #00AEFF;" @click="goRouter2(item.identities_doi_url)">{{item.identities_doi}}</div>
            </div>
            <!-- <div>
              <p>关键词：</p>
              <div>{{item.keywords}}</div>
            </div> -->
            <div>
              <p>作者列表：</p>
              <div>{{item.authors}}</div>
            </div>
          </div>
          <div v-for="(item2, index2) in item.brief" :key="index2">
            {{item2.brief}}
          </div>
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
  sel_GM_list,
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      loading: false,
      title: '',
      locale: en,
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    goHelp() {
      this.$router.push({
        path: '/helpList',
      })
    },
    goRoutr(url) {
      this.$router.push({
        path: '/helpList'
      })
    },
    goRouter2(url) {
      if(url){
        window.open(url)
      }
      
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
      sel_GM_list({
        title: this.title,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.loading = false
        this.results = res.data
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .GeenMedical-box {
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
        >:nth-child(2) {
          padding: 10px 15px;
          >div {
            display: flex;
            align-items: center;
            margin: 15px 0;
            >p {
              font-weight: 500;
              font-size: 16px;
              width: 140px;
              text-align: right;
            }
          }
        }
        >:nth-child(3) {
          padding: 10px 15px;
          border-top: 1px solid #DCDFE6;
          font-size: 16px;
        }
      }
    }
  }
</style>
