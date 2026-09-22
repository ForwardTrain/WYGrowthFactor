<template>
  <div class="hotManagement-box">

    <div class="prompt-type">
      <div></div>
      <p>热门列表</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>栏目名称：</p>
        <div>
          <el-input style="width: 180px" v-model="item_name" placeholder=" " />
        </div>

        <p>标题名称：</p>
        <div>
          <el-input style="width: 180px" v-model="name" placeholder=" " />
        </div>

        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>
    </div>


    <div class="operation-btn">
      <div class="operation-btn-left">
        <div @click="choosetype(0)" :style="leftIndexOf == 0 ? 'background: #18C5A4; color: #fff' : ''">
          全部
        </div>
        <!-- <div @click="choosetype(1)" :style="leftIndexOf == 1 ? 'background: #18C5A4; color: #fff' : ''">
          图文
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          视频
        </div>
        <div @click="choosetype(3)" :style="leftIndexOf == 3 ? 'background: #18C5A4; color: #fff' : ''">
          置顶
        </div> -->
        

      </div>
      <div>
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-22.png" alt="">导入</el-button>
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-21.png" alt="">导出</el-button>
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新增</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openDelete(null)"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/delete-icon.png" alt="">删除</el-button> -->
      </div>
    </div>

    <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                height="calc(100vh - 370px)">
        <!-- <el-table-column width="5%" type="selection"/> -->
        <el-table-column prop="id" label="编号" width="6%"/>
        <!-- <el-table-column prop="tel" label="封面图片" width="10%"/> -->
        <el-table-column prop="img" label="封面图片" width="10%">
          <template #default="scoped">
            <el-image
              style="width: 50px; height: 50px"
              :src="scoped.row.img"
              :zoom-rate="1.2"
              :preview-teleported="true"
              :preview-src-list="[scoped.row.img]"
              :initial-index="0"
              fit="cover"
            />
            <!-- <img :src="scoped.row.img" alt="" style="width: 50px;height: 50px;"> -->
          </template>
        </el-table-column>  
        <el-table-column prop="name" label="标题" width="10%"/>
        <el-table-column prop="type" label="所在模块" width="10%"/>
        <el-table-column prop="item_name" label="所在栏目" width="10%"/>
        <el-table-column prop="publish_time" label="发布时间" width="10%"/>
        <el-table-column prop="is_push" label="是否置顶" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.is_push == '1' ? '置顶' : '不置顶'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.status == '1' ? '未提交' : scoped.row.status == '2' ? '待审核' : scoped.row.status == '3' ? '审核通过' : 
                 scoped.row.status == '4' ? '审核不通过' : scoped.row.status == '5' ? '发布' : '下架'}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="brief" show-overflow-tooltip label="简介" width="10%"/>

        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <!-- <p @click="changeType(scoped.row, 2)" v-if="scoped.row.status == 1">不通过</p> -->
              <!-- <p @click="changeType(scoped.row, 1)" v-else>通过</p> -->
              <p @click="goSetting(scoped.row, 2)" v-if="scoped.row.is_push == '1'">取消置顶</p>
              <p @click="goSetting(scoped.row, 1)" v-else>置顶</p>
              
              
              <!-- <p class="delete-p" @click="openDelete(scoped.row)">删除</p> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-box">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="results.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>


  </div>
</template>

<script>

import { 
  // students_list,
  // sel_students_list_add_option_stu,
  // save_students_list_application,
  // del_students_list_application,
  // update_students_list_application_status
  Contentsel_list,
  sel_hot_list,
  upd_hot_list
} from '@/api/common'
export default {
  data () {
    return {
      item_name: '',
      name: '',

      results: {
        list: [
        ],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,
      leftIndexOf: 0,

      multipleSelection: [],
      value: [],
      options: [],
    }
  },
  mounted() {
    this.getList()
    // this.getsel_students_list_add_option_stu()
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
     * 前往设置
     */
    goSetting(row, type) {
      this.$ElMessageBox.confirm(
        type == 1 ? '确认置顶此数据？' : '确认取消置顶此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        upd_hot_list({
          id: row.id,
          is_push: type,
        }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getList()
          }
        })
      })
    },

    getsel_students_list_add_option_stu() {
      sel_students_list_add_option_stu({
        active_main_id: this.$route.query.id
      }).then((res) => {
        this.options = res.data.list
      })
    },

    /**
     * 列别选择
     */
    choosetype(index) {
      this.leftIndexOf = index
      this.getList()
    },


    getList() {
      sel_hot_list({
        item_name: this.item_name,
        name: this.name,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },


     changeType(row, type) {
      this.$ElMessageBox.confirm(
        type == 1 ? '确认通过此数据？' : '确认不通过此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        update_students_list_application_status({
          ids: row ? row.id : this.multipleSelection.toString(),
          status: type,
          active_main_id: this.$route.query.id,
        }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getList()
            this.getsel_students_list_add_option_stu()
          }
        })
      })
    },
    /**
     * 打开删除
     */
    openDelete(row) {
      if(row) {
        this.multipleSelection = []
        this.multipleSelection.push(row.id)
      }
      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        del_students_list_application({
          active_main_id: this.$route.query.id,
          ids: this.multipleSelection.toString()
        }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
            this.getsel_students_list_add_option_stu()
          }
        })
      })
    },

    emptyData() {
      this.item_name = ''
      this.name = ''
      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },

    add() {
      save_students_list_application({
        active_main_id: this.$route.query.id,
        stu_id: this.value.toString()
      }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.dialogVisible = false
            this.getList()
            this.getsel_students_list_add_option_stu()
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
    openAdd() {
      this.value = []
       this.dialogVisible = true
    },
  },
}
</script>

<style scoped lang='scss'>
::v-deep(.el-tooltip) {
  width: 90% !important;
}
  .hotManagement-box {
    padding: 12px;
    .tips-input {
      position: relative;
      >p {
        position: absolute;
        font-size: 12px;
      }
    }
    .dialine-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      span {
        color: red;
      }
      >:nth-child(1) {
        width: 80px;
        text-align: right;
      }
    }
  }
</style>
