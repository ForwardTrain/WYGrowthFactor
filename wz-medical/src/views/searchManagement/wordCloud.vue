<template>
  <div class="wordCloud-box">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="430px">
      <div>
        
        <div class="dialine-box dialine-box2" style="margin-bottom: 30px;">
          <p>词：</p>
          <div class="tips-input">
            <el-input style="width: 180px" v-model="dianame" placeholder=" " />
            <p v-show="showHave" style="margin-top: 5px;color: #FF1E1E;">该词已经存在</p>
          </div>
        </div>

        <div class="dialine-box dialine-box2">
          <p>搜索次数：</p>
          <div>
            <el-input style="width: 180px" v-model="dianum" placeholder=" " />
          </div>
        </div>
        <!-- <div class="dialine-box dialine-box2">
          <p>状态：</p>
          <div style="width: 180px">
            <el-switch v-model="diastatus" />
          </div>
        </div> -->
      </div>
      <template #footer>
        <span class="dialog-footer" v-if="title != '查看'">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="add">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="prompt-type">
      <div></div>
      <p>词云管理</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>搜索词：</p>
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
        <div @click="choosetype(1)" :style="leftIndexOf == 1 ? 'background: #18C5A4; color: #fff' : ''">
          启用
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          禁用
        </div>
        

      </div>
      <div>
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新增</el-button>
        <el-button class="margin-L" type="info" @click="openDelete(null)"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/delete-icon.png" alt="">删除</el-button>
      </div>
    </div>

    <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                height="calc(100vh - 370px)">
        <el-table-column width="5%" type="selection"/>
        <el-table-column prop="num" label="搜索次数" width="10%"/>
        <el-table-column prop="name" label="搜索词" width="10%"/>
        <el-table-column prop="last_search_time" label="最新搜索日期" width="10%"/>
        <el-table-column prop="create_time" label="操作时间" width="10%"/>
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="changeType(scoped.row, 2)" v-if="scoped.row.status == 1">不通过</p>
              <p @click="changeType(scoped.row, 1)" v-else>通过</p>
              
              <p class="delete-p" @click="openDelete(scoped.row)">删除</p>
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
  sel_list,
  del_list,
  add_upd_list
} from '@/api/common'
export default {
  data () {
    return {
      title: '新增',
      dialogVisible: false,
      
      name: '',
      showHave: false,

      diastatus: true,
      dianame: '',
      dianum: '',


      results: {
        list: [],
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
      sel_list({
        name: this.name,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        status:  this.leftIndexOf,
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
        del_list({
          ids: this.multipleSelection.toString()
        }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }
        })
      })
    },

    emptyData() {
      this.name = ''
      this.getList()
    },

    add() {
      add_upd_list({
        id: this.editId,
        name: this.dianame,
        num: this.dianum,
        status: this.diastatus ? 1 : 2,
      }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.dialogVisible = false
            this.getList()
            this.getsel_students_list_add_option_stu()
          } else if (res.code == 0 && res.message == '该词已存在') {
            this.showHave = true
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
      this.showHave = false
      this.dianame = ''
      this.dianum = ''
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped lang='scss'>
  .wordCloud-box {
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
