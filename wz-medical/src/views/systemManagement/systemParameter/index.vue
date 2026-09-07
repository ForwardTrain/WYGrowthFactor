<template>
  <div class="systemParameter-box">
    <el-dialog
      v-model="dialogVisible"
      title="编辑"
      :center="true"
      width="630px">
      <div>
        
        <div class="dialine-box dialine-box2" style="margin-bottom: 30px;">
          <p>值：</p>
          <div>
            <el-input
              v-model="addData.value"
              style="width: 440px"
              :autosize="{ minRows: 4, maxRows: 40 }"
              type="textarea"
              placeholder=" "
            />
          </div>
        </div>

        <div class="dialine-box dialine-box2">
          <p>描述：</p>
          <div>
            <el-input
              v-model="addData.desc"
              style="width: 440px"
              :autosize="{ minRows: 4, maxRows: 40 }"
              type="textarea"
              placeholder=" "
            />
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
      <p>系统参数</p>
    </div>

    <div class="search-content-box" v-if="false">
      <div class="search-line">
        <p>数据ID：</p>
        <div>
          <el-input style="width: 180px" v-model="id" placeholder=" " />
        </div>

        <p>数据名称：</p>
        <div>
          <el-input style="width: 180px" v-model="name" placeholder=" " />
        </div>

        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>
    </div>


    <div class="operation-btn">
      <div class="operation-btn-left">
        <!-- <div @click="choosetype(0)" :style="leftIndexOf == 0 ? 'background: #18C5A4; color: #fff' : ''">
          全部
        </div> -->
        <!-- <div @click="choosetype(1)" :style="leftIndexOf == 1 ? 'background: #18C5A4; color: #fff' : ''">
          使用中
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          未使用
        </div> -->
        

      </div>
      <div>
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/权限@2x.png" alt="">权限管理</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新建数据</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openAdd2"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新建数据2</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openUpdata"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/更新@2x.png" alt="">更新数据</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-21.png" alt="">导出</el-button> -->
        
        <!-- <el-button class="margin-L" type="info" @click="openDelete(null)"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/delete-icon.png" alt="">删除</el-button> -->
      </div>
    </div>

    <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                height="calc(100vh - 270px)">
        <!-- <el-table-column width="5%" type="selection"/> -->
        <el-table-column prop="type" label="类型" width="5%"/>
        <el-table-column prop="value" label="值" width="20%"/>
        <el-table-column prop="desc" label="描述" width="10%"/>
        <!-- <el-table-column prop="create_time" label="操作时间" width="10%"/> -->
        <el-table-column  width="5%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <!-- <p @click="changeType(scoped.row, 2)" v-if="scoped.row.status == 1">不通过</p> -->
              <!-- <p @click="changeType(scoped.row, 1)" v-else>通过</p> -->
              <!-- <p @click="goSetting(scoped.row, 1)" >置顶</p> -->
              <!-- <p @click="goSetting(scoped.row, 1)" >取消置顶</p> -->
              <p @click="goEdit(scoped.row)" >编辑</p>
              
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
  sel_sys_params_list,
  del_data_list,
  update_sys_params_list
} from '@/api/common'
export default {
  data () {
    return {
      dialogVisible: false,
      id: '',
      name: '',

      addData: {},

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
    goEdit(row) {
      this.addData = row
      this.dialogVisible = true
    },
    /**
     * 前往设置
     */
    goSetting(row) {
      this.$store.commit("setRouterList",{
        name: '工具设置',
        url: '/dataManagementSet',
        query: {
          id: row.id,
        }
      })
      this.$router.push({
        path: '/dataManagementSet',
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
      sel_sys_params_list({
        id: this.id,
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
        del_data_list({
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
      this.id = ''
      this.pageSize = ''
      this.currentPage = ''
      this.getList()
    },

    add() {
      update_sys_params_list(this.addData).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.dialogVisible = false
            this.getList()
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
      this.$store.commit("setRouterList",{
        name: '新建数据',
        url: '/addData',
       
      })
      this.$router.push({
        path: '/addData',
        
      })
    },
    openAdd2() {
      this.$store.commit("setRouterList",{
        name: '新建数据',
        url: '/addData2',
       
      })
      this.$router.push({
        path: '/addData2',
        
      })
    },
    goLook(row) {
      this.$store.commit("setRouterList",{
        name: '查看数据',
        url: '/lookDetails',
        query: {
          id: row.id
        }
        
      })
      this.$router.push({
        path: '/lookDetails',
        query: {
          id: row.id
        }
      })
    },
    openUpdata() {
      // this.$store.commit("setRouterList",{
      //   name: '更新数据',
      //   url: '/updateData',
       
      // })
      // this.$router.push({
      //   path: '/updateData',
        
      // })
      this.$store.commit("setRouterList",{
        name: '更新数据',
        url: '/dataUpdata',
        
      })
      this.$router.push({
        path: '/dataUpdata',
        
      })
    }
  },
}
</script>

<style scoped lang='scss'>

  .systemParameter-box {
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
    .dialine-box2 {
      display: flex;
      align-items: flex-start;
      >:nth-child(1) {
        margin-top: 0px;
      }
    }
  }
</style>
