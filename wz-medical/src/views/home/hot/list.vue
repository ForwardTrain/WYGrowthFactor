<template>
  <div class="hot-list">
    <top></top>
    <img class="top-img" src="@/assets/images/top-img-2.png" alt="">

    <div class="search-top">
      <p>Home > Top Content</p>

      <div>
        <p>Top Content</p>

        <div class="search-input">
          <div>
            <el-icon><Search /></el-icon>
            <el-input  v-model="name" placeholder="Search by keyword" />
          </div>
          <div @click="getList">Search</div>
        </div>
      </div>
    </div>

    <div class="list-box">
      <div>
        <div class="list-content" v-for="(item, index) in results.list" :key="index" @click="goDetails(item)">
          <img :src="item.img" alt="">

          <div>
            <p>{{item.item_name}}</p>
            <p>{{item.name}}</p>
            <div>{{item.publish_time}}</div>
          </div>
        </div>
      </div>

      <div class="page-box">
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
      name: '',
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    /**
     * 前往详情
     */
    goDetails(item) {
      this.$router.push({
        path: '/hotDetails',
        query: {
          id: item.id
        }
      })
    },
    /**
     *获取列表
     */
    getList() {
      sel_hot_list({
        name: this.name,
        is_home_hot: '1',
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .hot-list {
    background: #F0F4F7;
    .top-img {
      // height: 350px;
      width: 100%;
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
    .list-box {
      width: 1420px;
      margin: 0 auto;
      .list-content {
        cursor: pointer;
        padding: 0 20px;
        margin-top: 15px;
        width: 1420px;
        height: 271px;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        
        >img {
          width: 350px;
          height: auto;
          max-height: 220px;
          margin-right: 20px;
        }
        >div {
          :nth-child(1) {
            font-size: 20px;
            color: #166AA9;
            display: -webkit-box;
            -webkit-line-clamp: 1; /* 显示的行数 */
            -webkit-box-orient: vertical;
            overflow: hidden;
            
          }
          :nth-child(2) {
            font-weight: 500;
            font-size: 20px;
            margin-top: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 1; /* 显示的行数 */
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          :nth-child(3) {
            font-size: 16px;
            margin-top: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 5; /* 显示的行数 */
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
      .page-box {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
      }
    }
  }
</style>
