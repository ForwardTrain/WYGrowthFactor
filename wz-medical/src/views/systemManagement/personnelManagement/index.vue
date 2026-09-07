<template>
  <div class="personnel-management-box">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="800px">
      <div class="dialog-content">
        <div>
          <div class="line-box">
            <p><span>*</span>账号：</p>
            <div>
              <el-input v-model="addData.user_name" :disabled="title == '查看' ? true : false" style="width: 230px;" placeholder=" " />
            </div>
          </div>
          <div class="line-box">
            <p><span>*</span>姓名：</p>
            <div>
              <el-input v-model="addData.name" :disabled="title == '查看' ? true : false"  style="width: 230px;" placeholder=" " />
            </div>
          </div>
          <div class="line-box">
            <p><span>*</span>角色权限：</p>
            <div>
              <!-- <el-input v-model="addData.role_ids" style="width: 230px;" placeholder=" " /> -->
              <el-select v-model="addData.role_ids" :disabled="title == '查看' ? true : false"   style="width: 230px;" class="m-2" placeholder=" ">
                <el-option
                  v-for="item in results2.list"
                  :key="item.id"
                  :label="item.role_name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
          <!-- <div class="line-box">
            <p>岗位：</p>
            <div>
              <el-select v-model="addData.job_ids" :disabled="title == '查看' ? true : false"   style="width: 230px;" class="m-2" placeholder=" ">
                <el-option
                  v-for="item in options3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div> -->
        </div>

        <div>
          <div class="line-box">
            <p><span v-show="title == '新增'">*</span>密码：</p>
            <div>
              <el-input v-model="addData.psd" :disabled="title == '查看' ? true : false"   style="width: 230px;" placeholder=" " />
            </div>
          </div>
          <!-- <div class="line-box">
            <p><span>*</span>所属部门：</p>
            <div>
              <el-cascader v-model="addData.dept_ids" 
                         style="width: 230px;" 
                         :disabled="title == '查看' ? true : false" 
                         clearable filterable 
                         :props="props2" 
                         :options="options1"
                         placeholder=" "  />
            </div>
          </div> -->
          <div class="line-box">
            <p><span>*</span>手机号码：</p>
            <div>
              <el-input v-model="addData.tel" :disabled="title == '查看' ? true : false"  style="width: 230px;" placeholder=" " />
            </div>
          </div>
          <div class="line-box">
            <p>状态：</p>
            <div>
              <el-switch
              :disabled="title == '查看' ? true : false" 
                v-model="addData.state"
                size="large"
              />
            </div>
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
      <p>人员管理</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>名称：</p>
        <div>
          <el-input v-model="user_name" placeholder=" " />
        </div>

        <p class="margin-L">手机号：</p>
        <div>
          <el-input v-model="user_tel" placeholder=" " />
        </div>


        <p class="margin-L">状态：</p>
        <div>
          <el-select v-model="state" style="width: 120px;" class="m-2" placeholder=" ">
            <el-option
              v-for="item in options4"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        
      
        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>

      <div class="operation-btn">
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新增</el-button>
        <el-button class="margin-L" type="info" @click="openDelete(null)"><img style="margin-right: 4px; height: 16px;" src="@/assets/images/delete-icon.png" alt="">删除</el-button>
      </div>
    </div>

    <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                @selection-change="handleSelectionChange"
                height="calc(100vh - 340px)">
        <el-table-column width="2%" type="selection"/>
        <el-table-column prop="id" label="ID"  width="10%"/>
        <el-table-column prop="user_name" label="账号"  width="10%"/>
        <el-table-column prop="name" label="姓名" width="10%"/>
        <el-table-column prop="tel" label="手机号" width="10%"/>
        
        <el-table-column prop="state" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.state == 1 ? '可用' : '禁用'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="operate_user"  label="操作人" width="10%" />
        <el-table-column prop="modify_time"  label="操作时间" width="10%" />
        
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p v-show="scoped.row.is_show == 1" @click="openChangeType(scoped.row, 2)" v-if="scoped.row.state == 1">禁用</p>
              <p @click="openChangeType(scoped.row, 1)" v-else>启用</p>
              <p @click="goLook(scoped.row)" >查看</p>
              <p @click="goEdit(scoped.row)" >编辑</p>
              <p v-show="scoped.row.is_show == 1" class="delete-p" @click="openDelete(scoped.row)">删除</p>
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
  SysEnterpriseb_list,
  roleList,

  update_state_sys_account,
  b_listDel,
  sel_sys_account_list_edit_option_job,
  edit_sys_account_list,
} from '@/api/common'
export default {
  data () {
    return {
      title: '',
      dialogVisible: false,

      user_name: '',
      user_tel: '',
      dept_id: [],
      role_id: '',
      job_id: '',
      state: '',


      options1: [],
      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true,
        children: 'children',
      },
      props2: {
        label: 'name',
        value: 'id',
        checkStrictly: true,
        children: 'children',
        // multiple: true,
      },
      options2: [],
      options3: [],
      options4: [
        {
          name: '启用',
          id: '1'
        },{
          name: '禁用',
          id: '0'
        }
      ],


      results: {
        list: [],
        total: 0,
      },

      results2: {
        list: [],
        total: 0,
      },

      currentPage: 1,
      pageSize: 10,

      addData: {},

      multipleSelection: []
    }
  },
  mounted() {
    // this.getroleAllList()
    // this.getcanList()
    // this.getspec_department_list()

    this.getList()
    this.getRolList()
    // this.getsel_sys_account_list_edit_option_job()
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
     * 获取岗位
     */
    getsel_sys_account_list_edit_option_job() {
      sel_sys_account_list_edit_option_job({}).then((res) => {
        this.options3 = res.data.list
      })
    },
    /**
     * 获取角色
     */
    getRolList() {
      roleList({
        pageSize: 9999,
        pageIndex: 1,
        state: '1',
      }).then((res) => {
        this.results2 = res.data
      })
    },

    emptyData() {
      this.user_name = ''
      this.user_tel = ''
      this.state = ''

      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },
    getList() {
      SysEnterpriseb_list({
        user_name: this.user_name,
        tel: this.user_tel,
        state: this.state,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },
    
    
    /**
     * 获取角色李彪
     */
    getroleAllList() {
      roleAllList({}).then((res) => {
        this.options2 = res.data.list
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
    openChangeType(row, type) {
      this.$ElMessageBox.confirm(
        `确认${type == 1 ? '启用' : '禁用'}此数据？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      )
        .then(() => {
          update_state_sys_account({
            id: row.id,
            state: type,
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
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: 'Delete canceled',
          // })
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
      )
        .then(() => {
          b_listDel({
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
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: 'Delete canceled',
          // })
        })
    },
    /**
     * 前往新增页面
     */
    openAdd() {
      this.addData = {
        name: '',
        user_name: '',
        dept_ids: [],
        role_ids: [],
        job_ids: [],
        psd: '',
        tel: '',
        state: true,
        tel: ''
      }
      this.title = '新增'
      this.dialogVisible = true
    },
    goLook(row) {
      row.job_ids = Number(row.job_ids)
      row.role_ids = Number(row.role_ids)
      if(row.state == 1) {
        row.state = true
      } else {
        row.state = false
      }
      this.addData = row
      this.title = '查看'
      this.dialogVisible = true
    },

    goEdit(row) {
      // b_list_detail({id: row.id}).then((res) => {
      //   let role_ids = []
      //   if(res.data.role_ids) {
      //     res.data.role_ids.split(',').forEach((item) => {
      //       if(item) {
      //         role_ids.push(Number(item))
      //       }
      //     })
      //   }
      //   let job_ids = []
      //   if(res.data.job_ids) {
      //     res.data.job_ids.split(',').forEach((item) => {
      //       if(item) {
      //         job_ids.push(Number(item))
      //       }
      //     })
      //   }
      //   this.addData = {
      //     name: res.data.name,
      //     user_name: res.data.user_name,
      //     dept_ids: JSON.parse(res.data.dept_ids2),
      //     role_ids: role_ids,
      //     id: res.data.id,
      //     job_ids: job_ids,
      //     psd: res.data.psd,
      //     state: res.data.state == 1 ? true : false,
      //     tel: res.data.tel
      //   }
      //   this.title = '编辑'
      //   this.dialogVisible = true
      // })
      row.job_ids = Number(row.job_ids)
      row.role_ids = Number(row.role_ids)
      if(row.state == 1) {
        row.state = true
      } else {
        row.state = false
      }
      this.addData = row
      this.title = '编辑'
      this.dialogVisible = true
    },


    add() {
      if(!this.addData.user_name || !this.addData.name || (!this.addData.psd && this.title =='新增') || !this.addData.role_ids 
         || !this.addData.tel) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }     
      if(this.addData.state) {
        this.addData.state = 1
      } else {
        this.addData.state = 2
      }
     
      edit_sys_account_list(this.addData).then((res) => {
        if(res.code == 1) {
          this.getList()
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
        this.dialogVisible = false
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .personnel-management-box {
    padding: 15px;
    ::v-deep(.el-input__inner) {
      // height: 32px !important;
    }
    .dialog-content {
      display: flex;
      justify-content: space-around;
    }
    .line-box {
      display: flex;
      align-items: center;
      margin: 10px 0;
      >p {
        width: 90px;
        text-align: right;
        white-space: nowrap;
        span {
          color: #FF1B1B;
        }
      }
    }
  }
</style>
