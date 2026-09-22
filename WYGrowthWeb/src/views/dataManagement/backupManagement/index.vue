<template>
  <div class="feedbackManagement-box">

    <el-dialog
      v-model="dialogVisible"
      title="自动备份设置"
      :center="true"
      width="500px">
      <div>
        
        <div class="dialine-box " style="margin-bottom: 30px;">
          <p>是否自动备份：</p>
          <div class="tips-input" style="width: 180px">
            <el-switch v-model="value1" />
          </div>
        </div>
        <div class="dialine-box " style="margin-bottom: 30px;">
          <p>备份开始时间：</p>
          <div class="tips-input" style="width: 180px">
            <el-time-select
                v-model="value"
                style="width: 120px"
                placeholder=" "
              />
          </div>
        </div>
        <div class="dialine-box dialine-box2" style="margin-bottom: 30px;">
          <p>备份频率：</p>
          <div class="tips-input" style="width: 360px">
            <el-checkbox v-model="checked1" label="周一" size="large" />
            <el-checkbox v-model="checked1" label="周二" size="large" />
            <el-checkbox v-model="checked1" label="周三" size="large" />
            <el-checkbox v-model="checked1" label="周四" size="large" />
            <el-checkbox v-model="checked1" label="周五" size="large" />
            <el-checkbox v-model="checked1" label="周六" size="large" />
            <el-checkbox v-model="checked1" label="周日" size="large" />

          </div>
        </div>

        <div class="dialine-box " style="margin-bottom: 30px;">
          <p>加密模式：</p>
          <div class="tips-input">
            <el-select
              v-model="value"
              placeholder=" "
              style="width: 180px"
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

    <el-dialog
      v-model="dialogVisible2"
      title="手动备份"
      :center="true"
      width="400px">
      <div>
        
        <div class="dialine-box " style="margin-bottom: 30px;">
          <p>备份名称：</p>
          <div class="tips-input" >
            <el-input v-model="title"  style="width: 180px" placeholder=" " />
          </div>
        </div>
        <div class="dialine-box " style="margin-bottom: 30px;">
          <p>加密模式：</p>
          <div class="tips-input">
            <el-select
              v-model="value"
              placeholder=" "
              style="width: 180px"
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
      <p>备份列表</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>备份名称：</p>
        <div>
          <el-input style="width: 180px" v-model="tel" placeholder=" " />
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
          使用中
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          未使用
        </div>

      </div>
      <div>
        <el-button class="margin-L" type="info" @click="openDialog1"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/自动@2x.png" alt="">自动备份</el-button>
        <el-button class="margin-L" type="info" @click="openDialog2"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/手动@2x.png" alt="">手动备份</el-button>

        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-22.png" alt="">导入</el-button>
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-21.png" alt="">导出</el-button>
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
        <el-table-column prop="student_name" label="序号" width="6%"/>
        <el-table-column prop="tel" label="备份名称" width="10%"/>
        <el-table-column prop="class_name" label="加密模式" width="10%"/>
        <el-table-column prop="registration_time" label="备份时间" width="10%"/>
        <el-table-column prop="registration_time" label="备份类型" width="10%"/>
        <el-table-column prop="registration_time" label="操作人" width="10%"/>
        <el-table-column prop="registration_time" label="备份大小" width="10%"/>
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="goSetting(scoped.row, 1)" >下载</p>
              <p @click="goRecover(scoped.row)" >还原</p>
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
} from '@/api/common'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogVisible2: false,

      tel: '',

      results: {
        list: [
          {}
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
    // this.getList()
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
     * 打开自动备份设置
     */
    openDialog1() {
      this.dialogVisible = true
    },
    /**
     * 打开自动备份设置
     */
    openDialog2() {
      this.dialogVisible2 = true
    },
    /**
     * 前往设置
     */
    goRecover(row) {
      this.$store.commit("setRouterList",{
        name: '回复反馈',
        url: '/replyFeedback',
        query: {
          id: row.id,
        }
      })
      this.$router.push({
        path: '/replyFeedback',
        query: {
          id: row.id,
        }
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
      students_list({
        active_main_id: this.$route.query.id,
        student_name: this.student_name,
        tel: this.tel,
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
      this.student_name = ''
      this.tel = ''
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
  .feedbackManagement-box {
    
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
      // justify-content: center;
      margin-top: 15px;
      span {
        color: red;
      }
      >:nth-child(1) {
        width: 120px;
        text-align: right;
      }
    }
    .dialine-box2 {
      display: flex;
      align-items: flex-start;
      >:nth-child(1) {
        margin-top: 10px;
      }
    }
  }
</style>
