<template>
  <div class="organizationManagement-box">
    <el-dialog
      v-model="dialogVisible"
      :title="'编辑'"
      :center="true"
      width="490px">
      <div>
        <!-- <div class="dialine-box">
          <p><span>*</span>课程编码：</p>
          <div>
            <el-input v-model="diaId" placeholder="请输入" />
          </div>
        </div> -->
        <div class="dialine-box dialine-box2">
          <p>名称：</p>
          <div>
            <p style="width: 240px">{{editData.name}}</p>
          </div>
        </div>
        <div class="dialine-box dialine-box2">
          <p>别名集：</p>
          <div>
            <el-input v-model="editData.alias" style="width: 240px" :disabled="title == '查看'" placeholder=" " />
          </div>
        </div>
        <div class="dialine-box dialine-box2">
          <p>编码：</p>
          <div>
            <p style="width: 240px">{{editData.code}}</p>
          </div>
        </div>
        <div class="dialine-box dialine-box2">
          <p>管理员：</p>
          <div>
            <el-select v-model="editData.account_id" multiple placeholder=" " style="width: 240px">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
      <p>区域管理</p>
    </div>

     <div class="search-content-box">
      <div class="search-line">
        <p>名称：</p>
        <div>
          <el-input style="width: 180px" v-model="name" placeholder=" " />
        </div>

        <el-button class="margin-L" type="primary" @click="getList()">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>
    </div>

    <div class="operation-btn">
      <div class="operation-btn-left">
        
      </div>
      <div>
        <el-button class="margin-L" type="info" @click="goBlack">返回上级</el-button>
      </div>
    </div>

    <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                height="calc(100vh - 370px)">
        <el-table-column prop="name" label="名称"  width="10%"/>
        <el-table-column prop="alias" label="别名集" width="10%"/>
        <el-table-column prop="code" label="编码" width="10%"/>
        <el-table-column prop="manager_name" label="管理员名称" width="10%"/>
        <el-table-column prop="modify_time" label="操作时间" width="10%"/>
        
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="lookNext(scoped.row.code)" v-show="scoped.row.is_next_but == 1" >查看下级</p>
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
  SysBasicToolList,
  sel_list_update_option_account,
  list_update
} from '@/api/common'
import { number } from 'echarts'
export default {
  data () {
    return {
      dialogVisible: false,
      name: '',
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,

      codeList: [],
      value: '',
      options: [],

      editData: {},
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

    add() {
      this.editData.account_id = this.editData.account_id.toString()
      list_update(this.editData).then((res) => {
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


    goBlack() {
      this.pageSize = 10
      this.currentPage = 1

      if(this.codeList.length) {
        this.codeList.pop()
      }
      
      SysBasicToolList({
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        name: this.name,
        code: this.codeList[this.codeList.length - 1]  ? this.codeList[this.codeList.length - 1] : 0,
      }).then((res) => {
        this.results = res.data
      })
    },
    emptyData() {
      this.name = ''
      this.getList()
    },
    goEdit(row) {
      this.getsel_list_update_option_account()
      if(row.account_id) {
        let list = []
        row.account_id.split(',').forEach((item)=> {
          list.push(Number(item))
        })

        row.account_id = list
      }
      this.editData = row
      this.dialogVisible = true
    },
    getsel_list_update_option_account() {
      sel_list_update_option_account({}).then((res) => {
        this.options = res.data.list
      })
    },
    lookNext(code) {
      this.pageSize = 10
      this.currentPage = 1
      this.getList(code)
    },
    /**
     * 列表
     */
    getList(code) {
      if(code) {
        this.codeList.push(code)
      }
      SysBasicToolList({
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        name: this.name,
        code: code ? code : '0',
      }).then((res) => {
        this.results = res.data
      })
      
    },
  },
}
</script>

<style scoped lang='scss'>
  .organizationManagement-box {
    padding: 15px;
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
