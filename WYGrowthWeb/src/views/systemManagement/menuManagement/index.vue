<template>
  <div class="column-anagement-box">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="410px">
      <div>
        <div class="line-box">
          <p><span>*</span>菜单名称：</p>
          <div>
            <el-input v-model="addData.name" style="width: 230px;" placeholder=" " />
          </div>
        </div>
        <div class="line-box">
          <p>菜单路径：</p>
          <div>
            <el-input v-model="addData.absolute_url" style="width: 230px;" placeholder=" " />
          </div>
        </div>
        <div class="line-box">
          <p><span>*</span>菜单排序：</p>
          <div>
            <el-input v-model="addData.sequence" style="width: 230px;" placeholder=" " />
          </div>
        </div>

        <div class="line-box">
          <p><span>*</span>权限配置：</p>
          <div>
            <!-- <el-input v-model="addData.is_config" style="width: 230px;" placeholder=" " /> -->
            <el-radio-group  v-model="addData.is_config" style="width: 230px;"  class="ml-4">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="line-box line-box2">
          <p>选中图标：</p>
          <div>
            <el-upload
              :headers="{
                Authorization: Authorization,
              }"
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="onSuccess">
              <img v-if="addData.sel_picture_url" :src="addData.sel_picture_url" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </div>
        </div>
        <div class="line-box line-box2">
          <p>图标：</p>
          <div>
            <el-upload
              :headers="{
                Authorization: Authorization,
              }"
              class="avatar-uploader"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onSuccess2">
              <img v-if="addData.picture_url" :src="addData.picture_url" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </div>
        </div>
        <div class="line-box">
          <p>状态：</p>
          <div>
            <el-switch
              v-model="addData.status"
              size="large"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="title == '新增' ? add() : edit()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="prompt-type">
      <div></div>
      <p>菜单管理</p>
    </div>

    <div class="search-content-box">
      <div></div>
      <!-- <div class="search-line">
        <p>名称：</p>
        <div>
          <el-input v-model="name" placeholder="请输入" />
        </div>

       
        <p class="margin-L">状态：</p>
        <div>
          <el-select v-model="value" style="width: 120px;" class="m-2" placeholder=" ">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        
      
        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div> -->

      <div class="operation-btn">
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新增</el-button>
        <!-- <el-button class="margin-L" type="info" @click="openDelete(null)"><img style="margin-right: 4px; height: 16px;" src="@/assets/images/delete-icon.png" alt="">删除</el-button> -->
      </div>
    </div>

    <div class="table-box">
                <!-- default-expand-all -->

      <el-table :data="results.list"
                row-key="id"
                height="calc(100vh - 250px)">
        <el-table-column prop="name" label="菜单名称"  width="10%"/>
        <el-table-column prop="absolute_url" label="路径" width="10%"/>
        <el-table-column prop="sequence" label="排序" width="10%"/>

        <el-table-column prop="state" label="选中图标" width="10%">
          <template #default="scoped">
            <img v-if="scoped.row.sel_picture_url" :src="scoped.row.sel_picture_url" class="table-img" alt="">
          </template>
        </el-table-column>

        <el-table-column prop="state" label="图标" width="10%">
          <template #default="scoped">
            <img v-if="scoped.row.picture_url" :src="scoped.row.picture_url" class="table-img" alt="">
          </template>
        </el-table-column>
        
        <el-table-column prop="state" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.status == 1 ? '可用' : '禁用'}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="create_time"  label="操作时间" width="10%" />
        
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <!-- v-if="scoped.row.pId == '0'" -->
              <p @click="tableOpenAdd(scoped.row)" >新增</p>
              <p @click="openChangeType(scoped.row, 0)" v-if="scoped.row.status == 1">禁用</p>
              <p @click="openChangeType(scoped.row, 1)" v-else>启用</p>
              
              <p @click="goEdit(scoped.row)">编辑</p>
              <p class="delete-p" @click="openDelete(scoped.row)">删除</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- <div class="pagination-box">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="results.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->

  </div>
</template>

<script>

import {
  SysMenuAllMenu,
  SysMenuAllMenuAdd,
  SysMenuAllMenuDelete,
  SysMenuAllMenuUpdate,
  sel_qiniu_token
} from '@/api/common'

let _this = null
import * as qiniu from 'qiniu-js'

export default {
  data () {
    return {
      title: '',
      dialogVisible: false,

      addData: {
        name: '',
        sequence: '',
        pid: '',
        absolute_url: '',
        picture_url: '',
        sel_picture_url: '',
        status: true,
        is_config: '1',
      },

      Authorization: '',
      actionUrl: '',

      options: [
        {
          label: '111',
          value: 1
        }
      ],

      value1: '',

      results: {
        list: [],
        total: 0,
      },
      pageSize: 10,
      currentPage: 1,

      multipleSelection: [],

      qnToken: ''
    }
  },
  mounted() {
    _this = this
    if(this.$global.hostname) {
      this.actionUrl = this.$global.target + '/HealthyMnHt//SysUploadFiles/upload/files'
    } else {
      this.actionUrl = window.location.origin + '/HealthyMnHt//SysUploadFiles/upload/files'
    }
    this.Authorization = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token
    
    this.getList()

    this.getsel_qiniu_token()
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

    getsel_qiniu_token() {
      sel_qiniu_token({}).then((res) => {
        this.qnToken = res
      })
    },

    onSuccess(uploadFile) {
      const observable =  qiniu.upload(uploadFile.raw, `${Date.now()}${uploadFile.name}`, this.qnToken)
      const observer = {
        next(res){
          
        },
        error(err){
          // ...
        },
        complete(res){
          setTimeout(() => {
              _this.addData.sel_picture_url = `http://filezdmanager.hello2345.com/${res.key}`
            }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },

    onSuccess2(uploadFile) {
      const observable =  qiniu.upload(uploadFile.raw, `${Date.now()}${uploadFile.name}`, this.qnToken)
      const observer = {
        next(res){
          
        },
        error(err){
          // ...
        },
        complete(res){
          setTimeout(() => {
              _this.addData.picture_url = `http://filezdmanager.hello2345.com/${res.key}`
            }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },
    /**
     * 更换头像
     */
    handleAvatarSuccess(uploadFile, index) {
      this.addData.sel_picture_url = uploadFile.data.files[0]
    },
    /**
     * 更换头像
     */
    handleAvatarSuccess2(uploadFile, index) {
      this.addData.picture_url = uploadFile.data.files[0]
    },

    getList() {
      SysMenuAllMenu({
        // pageSize: this.pageSize,
        // pageIndex: this.currentPage,
        pageSize: 9999,
        pageIndex: 1,
      }).then((res) => {
        this.results = res.data
      })
    },
    add() {
      // || this.addData.picture_url == '' || this.addData.sel_picture_url == ''
      if(this.addData.name == ''  || this.addData.sequence == '' ) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      if(this.addData.status) {
        this.addData.status = 1
      } else {
        this.addData.status = 0
      }
      SysMenuAllMenuAdd(this.addData).then((res) => {
        if(res.code == 1) {
          this.getList()
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.dialogVisible = false
        }
      })
    },

    edit() {
      // || this.addData.picture_url == '' || this.addData.sel_picture_url == ''
      if(this.addData.name == ''  || this.addData.sequence == '' ) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      if(this.addData.status) {
        this.addData.status = 1
      } else {
        this.addData.status = 0
      }
      SysMenuAllMenuUpdate(this.addData).then((res) => {
        if(res.code == 1) {
          this.getList()
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.dialogVisible = false
        }
      })
    },

    tableOpenAdd(row) {
      this.title = '新增'
      this.addData =  {
        name: '',
        sequence: '',
        pid: row.id,
        absolute_url: '',
        picture_url: '',
        sel_picture_url: '',
        status: true,
        is_config: '1',
      },
      this.dialogVisible = true
    },

    /**
     * 打开删除
     */
    openDelete(row) {
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
          SysMenuAllMenuDelete({
            id: row.id
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
          SysMenuAllMenuUpdate({
            id: row.id,
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
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: 'Delete canceled',
          // })
        })
    },
    goEdit(row) {
      this.title = '编辑'
      this.addData =  {
        name: row.name,
        sequence: row.sequence,
        pid: row.pid,
        id: row.id,
        absolute_url: row.absolute_url,
        picture_url: row.picture_url,
        sel_picture_url: row.sel_picture_url,
        status: row.status == 1 ? true : false,
        is_config: row.is_config ? row.is_config.toString() : '1'
      },
      this.dialogVisible = true
    },
    /**
     * 前往新增页面
     */
    openAdd() {
      this.title = '新增'
      this.addData =  {
        name: '',
        sequence: '',
        pid: '0',
        absolute_url: '',
        picture_url: '',
        sel_picture_url: '',
        status: true,
        is_config: '1',
      },
      this.dialogVisible = true
    }
  },
}
</script>

<style scoped lang='scss'>
  .column-anagement-box {
    padding: 15px;
    .table-img {
      width: 30px;
      height: 30px;
      border: 1px solid #DCDFE6;
      border-radius: 6px;;
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
    .line-box2 {
      display: flex;
      align-items: flex-start;
    }
    ::v-deep(.el-upload) {
      width: 92px;
      height: 92px;
      background: #FFFFFF;
      border-radius: 4px;
    }
}
</style>
