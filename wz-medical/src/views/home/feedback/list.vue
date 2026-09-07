<template>
  <div class="feedback-list">
    <div class="dialog-box" v-if="showDia">
      <div class="dialog-top">
        <p>Feedback</p>
        <el-icon class="color-icon" @click="showDia = false"><Close /></el-icon>
      </div>
      <div class="dia-line">
        <p>Type：{{infoDateils.support.type == 1 ? 'Inquiry' :infoDateils.support.type == 2 ?  'Advice' : infoDateils.support.type == 3 ? 'Complaint' : infoDateils.support.type == 4 ? 'Other' : '-' }}</p>
        <p>Feedback Time：{{infoDateils.support.create_time}}</p>
        <p>Public：{{infoDateils.support.is_show == 1 ? 'Agree' :'Disagree'}}</p>
      </div>

      <div class="dia-content dia-content2">
        <p>Content</p>
        <!-- v-html="infoDateils.support.content" -->
        <div v-html="infoDateils.support.content"></div>
      </div>

      <div class="dia-content">
        <p>Reply</p>
        <div v-html="infoDateils.report.content"></div>
      </div>
    </div>

    <top></top>

    <div class="feedback-content">
      <p class="title">Home > Feedback</p>
      <p class="title-2">Feedback</p>

      <div class="screen-line">
        <div class="search-content-box">
          <div class="search-line">
            <p>Title：</p>
            <div>
              <el-input v-model="title" placeholder="请输入" />
            </div>

            <p>Tel：</p>
            <div>
              <el-input v-model="tel" placeholder="请输入" />
            </div>
          
            <el-button class="margin-L" type="primary" @click="getList">Search</el-button>
            <el-button class="margin-L" type="info" @click="emptyData">Clear</el-button>
          </div>
        </div> 

        <div class="contact-us" @click="goContactUs">
          Contact us
        </div>
      </div>

      <div class="table-box">
        <el-config-provider :locale="locale">
        <el-table :data="results.list" 
              ref="multipleTableRef"
              style="width: 100%"
              border>
          <el-table-column prop="id" label="Number" width="6%"/>
          <el-table-column prop="title" label="Title" width="10%"/>
          <el-table-column prop="type" label="Type" width="6%">
             <template #default="scoped">
              <p>{{scoped.row.type == 1 ? 'Inquiry' : scoped.row.type == 2? 'Advice' : scoped.row.type == 1 ? 'Complaint' : scoped.row.type == 1 ? 'Other' : '-'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="Feedback Time" width="10%"/>
          <!-- <el-table-column prop="r_create_time" label="回复日期" width="10%"/> -->
          <!-- <el-table-column prop="r_operator" label="回复部门" width="10%"/> -->
          <el-table-column prop="tel" label="Tel" width="10%"/>
          <el-table-column prop="email" label="Email" width="10%"/>
           <el-table-column prop="status" label="Public" width="6%">
            <template #default="scoped">
              <p>{{scoped.row.is_show == 1 ? 'Agree' : 'Disagree'}}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="registration_time" label="访客识别" width="10%"/> -->
          <!-- <el-table-column prop="overseas_desc" label="是否国外" width="10%"/>
          <el-table-column prop="lat" label="纬度" width="10%"/>
          <el-table-column prop="lng" label="经度" width="10%"/>
          <el-table-column prop="status" label="状态" width="10%">
            <template #default="scoped">
              <p>{{scoped.row.status == 1 ? '启用' : '禁用'}}</p>
            </template>
          </el-table-column> -->
          <el-table-column  width="10%" align="center" label="Controls">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="goLook(scoped.row)" >Look</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        </el-config-provider>
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
  sel_support_list,
  sel_support_list_details
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      showDia: false,
      title: '',
      tel: '',
      locale: en,
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,

      infoDateils: {
        report: {},
        support: {}
      }
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
     * 清空
     */
    emptyData() {
      this.pageSize = 10
      this.currentPage = 1
      this.title = ''
      this.tel = ''
      this.getList()
    },
    /**
     * 获取列表
     */
    getList() {
      sel_support_list({
        title: this.title,
        tel: this.title,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },
    goContactUs() {
      this.$router.push({
        path: '/feedbackAdd'
      })
    },
    /**
     * 前往查看
     */
    goLook(item) {
      sel_support_list_details({
        id: item.id
      }).then((res) => {
        this.showDia = true
        this.infoDateils = res.data
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .feedback-list {
    position: relative;
    .dialog-box {
      background: #fff;
      position: absolute;
      width: 760px;
      z-index: 9999;
      // top: 50%;
      left: 50%;
      margin-top: 150px;
      transform: translate(-50%);
      box-shadow: 0px 2px 24px 0px rgba(0,0,0,0.3);
      border: 1px solid #E9E9E9;
      .dialog-top {
        height: 50px;
        background: #166AA9;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        .color-icon {
          cursor: pointer;
        }
      }
      .dia-line {
        display: flex;
        justify-content: center;
        color: #B5B5B5;
        padding: 10px 0;
        border-bottom: 1px solid #E9E9E9;
        >p {
          margin-right: 20px;
        }
      }
      .dia-content2 {
        border-bottom: 1px solid #E9E9E9;
      }
      .dia-content {
        padding: 15px;
        display: flex;
        >div {
          word-wrap: break-word; 
          max-width: 640px;
          width: 640px;
        }
        >p {
          width: 60px;
          margin-right: 20px;
        }
      }
    }

    .feedback-content{
      width: 1400px;
      margin: 0 auto;
      .title {
        color: #B5B5B5;
        margin-top: 17px;
      }
      .title-2 {
        font-weight: 500;
        font-size: 24px;
        margin-top: 20px;
      }
    }
    .screen-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .contact-us {
          width: 108px;
          height: 38px;
          background: #18C5A4;
          border-radius: 4px;
          color: #fff;
          text-align: center;
          line-height: 38px;
          margin-top: 10px;
          cursor: pointer;
        }
    }
    .page-box {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        
      }
  }
</style>
