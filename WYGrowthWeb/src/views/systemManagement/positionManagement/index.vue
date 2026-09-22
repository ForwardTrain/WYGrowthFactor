<template>
  <div class="personnel-management-box">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="410px">
      <div>
        <div class="line-box">
          <p><span>*</span>岗位名称：</p>
          <div>
            <el-input v-model="addData.name" style="width: 230px;" placeholder=" " />
          </div>
        </div>
        <div class="line-box line-box2">
          <p><span>*</span>岗位说明：</p>
          <div>
            <el-input
              v-model="addData.desc"
              :rows="2"
              style="width: 230px;"
              :autosize="{ minRows: 2, maxRows: 8 }"
              type="textarea"
              placeholder=" "
            />
          </div>
        </div>
        <div class="line-box">
          <p>状态：</p>
          <div>
            <el-switch
              v-model="addData.state"
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
      <p>岗位管理</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>名称：</p>
        <div>
          <el-input v-model="name" placeholder="请输入" />
        </div>

        <p class="margin-L">状态：</p>
        <div>
          <el-select v-model="state" style="width: 120px;" class="m-2" placeholder=" ">
            <el-option
              v-for="item in options"
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
        <el-table-column prop="name" label="岗位名称"  width="10%"/>
        <el-table-column prop="desc"  label="岗位说明" width="10%" />

        <el-table-column prop="num"  label="岗位人数" width="10%" />
        
        <el-table-column prop="state" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.state == 1 ? '启用' : '禁用'}}</p>
          </template>
        </el-table-column>
        
        <el-table-column prop="operate_user"  label="操作人" width="10%" />
        <el-table-column prop="modify_time"  label="操作时间" width="10%" />
        
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="openChangeType(scoped.row, 0)" v-if="scoped.row.state == 1">禁用</p>
              <p @click="openChangeType(scoped.row, 1)" v-else>启用</p>
              <p @click="goEdit(scoped.row)" >编辑</p>
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
  SysOrgJobList,
  SysOrgJobListAdd,
  SysOrgJobListDelete,
  SysOrgJobListUpdate
} from '@/api/common'

export default {
  data () {
    return {
      dialogVisible: false,
      title: '',

      name: '',
      state: '',
      options: [
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
      currentPage: 1,
      pageSize: 10,

      addData: {
        name: '',
        desc: '',
        state: ''
      },

      multipleSelection: []
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

    emptyData() {
      this.name = ''
      this.state = ''
      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },
    getList() {
      SysOrgJobList({
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        name: this.name,
        state: this.state,
      }).then((res) => {
        this.results = res.data
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

    add() {
      if(this.addData.name == '' || this.addData.desc == '') {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      if(this.addData.state) {
        this.addData.state = 1
      } else {
        this.addData.state = 0
      }
      SysOrgJobListAdd(this.addData).then((res) => {
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
      if(this.addData.name == '' || this.addData.desc == '') {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      if(this.addData.state) {
        this.addData.state = 1
      } else {
        this.addData.state = 0
      }
      SysOrgJobListUpdate(this.addData).then((res) => {
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
          SysOrgJobListDelete({
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
          SysOrgJobListUpdate({
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
     * 前往新增页面
     */
    openAdd() {
      this.title = '新增'
      this.addData = {
        name: '',
        desc: '',
        state: true
      }
      this.dialogVisible = true
    },
    goEdit(row) {
      this.title = '编辑'
      this.addData = {
        name: row.name,
        id: row.id,
        desc: row.desc,
        state: row.state == 1 ? true : false
      }
      this.dialogVisible = true
    }
  },
}
</script>

<style scoped lang='scss'>
  .personnel-management-box {
    padding: 15px;
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
      display: flexa;
      align-items: flex-start;
    }
  }
</style>
