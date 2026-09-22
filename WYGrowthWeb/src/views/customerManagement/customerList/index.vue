<template>
  <div class="customerList-box">
    <el-dialog
      v-model="dialogVisible"
      title="查看"
      :center="true"
      width="660px">
      <div>
        <div class="table-box">
          <el-table :data="results2.list" 
                    ref="multipleTableRef"
                    style="width: 100%"
                    border
                    height="calc(100vh - 370px)">
            <!-- <el-table-column width="5%" type="selection"/> -->
            <!-- <el-table-column prop="student_name" label="访问时间" width="10%"/> -->
            <el-table-column prop="address" label="地址" width="15%"/>
            <el-table-column prop="create_time" label="登录时间" width="10%"/>
            <el-table-column prop="isp" label="运营商" width="10%"/>
            <el-table-column prop="ip" label="访问IP" width="10%"/>
            <!-- <el-table-column prop="status" label="状态" width="10%">
              <template #default="scoped">
                <p>{{scoped.row.status == 1 ? '启用' : '禁用'}}</p>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        
        <div class="pagination-box">
          <el-pagination
            v-model:current-page="currentPage2"
            v-model:page-size="pageSize2"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="results2.total"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </div>
      </div>
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="title == '新增' ? add() : edit()">
            确定
          </el-button>
        </span>
      </template> -->
    </el-dialog>

    <div class="prompt-type">
      <div></div>
      <p>客户列表</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>国家：</p>
        <div>
          <el-input style="width: 180px" v-model="country" placeholder=" " />
        </div>

        <p>IP地址：</p>
        <div>
          <el-input style="width: 180px" v-model="ip" placeholder=" " />
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
          启用
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          禁用
        </div> -->
        

      </div>
      <div>
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-22.png" alt="">导入</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-21.png" alt="">导出</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新增</el-button> -->
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
        <!-- <el-table-column prop="student_name" label="访问时间" width="10%"/> -->
        <el-table-column prop="country" label="国家" width="6%"/>
        <el-table-column prop="province" label="省" width="5%"/>
        <el-table-column prop="address" label="地址" width="5%"/>
        <el-table-column prop="overseas_desc" label="是否国外" width="10%"/>
        <el-table-column prop="isp" label="运营商" width="10%"/>
        <el-table-column prop="ip" label="访问IP" width="10%"/>
        <!-- <el-table-column prop="registration_time" label="访客识别" width="10%"/> -->
        <el-table-column prop="overseas_desc" label="是否国外" width="10%"/>
        <el-table-column prop="lat" label="纬度" width="10%"/>
        <el-table-column prop="lng" label="经度" width="10%"/>
        <!-- <el-table-column prop="status" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.status == 1 ? '启用' : '禁用'}}</p>
          </template>
        </el-table-column> -->
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <!-- <p @click="changeType(scoped.row, 1)" v-if="scoped.row.status == 2">启用</p>
              <p @click="changeType(scoped.row, 2)" v-else>禁用</p> -->
              <p @click="goLook(scoped.row)" >查看</p>
              
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
  sel_customer_list,
  sel_customer_list_recode,
  upd_customer_status
} from '@/api/common'
export default {
  data () {
    return {
      dialogVisible: false,

      tel: '',
      country: '',
      ip: '',

      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,


      results2: {
        list: [],
        total: 0,
      },
      currentPage2: 1,
      pageSize2: 10,


      leftIndexOf: 0,

      multipleSelection: [],
      value: [],
      options: [],
      diaip: '',
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

    handleSizeChange2(val) {
      this.pageSize2 = val
      this.getList2()
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val
      this.getList2()
    },

    goLook(row) {
      this.currentPage2 =  1
      this.pageSize2 = 10
      this.dialogVisible = true
      this.diaip = row.ip
      this.getList2(row)
    },
    getList2() {
      sel_customer_list_recode({
        ip: this.diaip,
        pageSize: this.pageSize2,
        pageIndex: this.currentPage2,
      }).then((res) => {
        if(res.code == 1) {
          this.results2 = res.data
        }
      })
    },
    /**
     * 前往设置
     */
    goSetting(row) {
      this.$store.commit("setRouterList",{
        name: '工具设置',
        url: '/customerListSet',
        query: {
          id: row.id,
        }
      })
      this.$router.push({
        path: '/customerListSet',
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
      sel_customer_list({
        country: this.country,
        ip: this.ip,
        status: this.leftIndexOf,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },


     changeType(row, type) {
      this.$ElMessageBox.confirm(
        type == 1 ? '确认启用此ip？' : '确认禁用此ip？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        upd_customer_status({
          ip: row.ip,
          status: type,
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
      this.ip = ''
      this.country = ''
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
  .customerList-box {
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
