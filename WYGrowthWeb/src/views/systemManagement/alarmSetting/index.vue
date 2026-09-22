<template>
  <div class="alarmSetting">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="410px">
      <div>
        <div class="line-box">
          <p><span>*</span>告警名称：</p>
          <div v-if="!addData.sku_name">
            <el-select v-model="addData.sku_id" filterable class="m-2"  placeholder=" " style="width: 230px;">
              <el-option
                v-for="item in options"
                :key="item.sku_id"
                :label="item.sku_name"
                :value="item.sku_id"
              />
            </el-select>
          </div>
          <div v-else>{{addData.sku_name}}</div>
        </div>
        <div class="line-box">
          <p><span>*</span>告警最小值：</p>
          <div>
            <el-input v-model="addData.limit_min" style="width: 230px;" placeholder=" " />
          </div>
        </div>
        <div class="line-box">
          <p><span>*</span>告警最大值：</p>
          <div>
            <el-input v-model="addData.limit_max" style="width: 230px;" placeholder=" " />
          </div>
        </div>

        <!-- <div class="line-box">
          <p><span>*</span>开始时间：</p>
          <div>
            <el-input v-model="addData.name" style="width: 230px;" placeholder=" " />
          </div>
        </div> -->
       
        
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="add">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="prompt-type">
      <div></div>
      <p>告警设置</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>名称：</p>
        <div>
          <el-input v-model="sku_name" placeholder="请输入" />
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
        <el-table-column prop="sku_name" label="名称"  width="10%"/>
        <el-table-column prop="limit_min"  label="告警最小值" width="10%" />
        <el-table-column prop="limit_max"  label="告警最大值" width="10%" />
        <el-table-column prop="c_s_date"  label="创建时间" width="10%" />
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
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
        :total="results.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import { 
  sel_sku_warn_list,
  del_sku_warn,
  sel_all_sku_test,
  save_sku_warn_list,


  SysOrgJobListAdd,
  SysOrgJobListDelete,
  SysOrgJobListUpdate
} from '@/api/common'

export default {
  data () {
    return {
      dialogVisible: false,
      title: '',
      
      sku_name: '',
      state: '',
      options: [],
      

      results: {
        list: [],
        count: 0,
      },
      currentPage: 1,
      pageSize: 10,

      addData: {
        sku_id: '',
        limit_min: '',
        limit_max: '',
        id: '',
      },

      multipleSelection: []
    }
  },
  mounted() {
    this.getList()
    this.getsel_all_sku_test()
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
     * 获取所有指标
     */
    getsel_all_sku_test() {
      sel_all_sku_test({
        sku_name: '',
      }).then((res) => {
        this.options = res.data
      })
    },

    emptyData() {
      this.sku_name = ''
      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },
    getList() {
      sel_sku_warn_list({
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        sku_name: this.sku_name,
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
        this.multipleSelection.push(item.sku_id)
      })
    },

    add() {
      if(this.addData.sku_id == '' || this.addData.limit_min == '' || this.addData.limit_max == '' ) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      save_sku_warn_list(this.addData).then((res) => {
        if(res.code == 1) {
          this.getList()
          this.getsel_all_sku_test()
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
        this.multipleSelection.push(row.sku_id)
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
          del_sku_warn({
            ids: this.multipleSelection.toString()
          }).then((res) => {
            if(res.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
              this.getsel_all_sku_test()
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
        sku_id: '',
        limit_min: '',
        limit_max: '',
        sku_name: '',
        id: '',
      }
      this.dialogVisible = true
    },

    goEdit(row) {
      this.title = '编辑'
      this.addData = {
        sku_id: row.sku_id,
        sku_name: row.sku_name,
        id: row.id,
        limit_max: row.limit_max,
        limit_min: row.limit_min,
      }
      setTimeout(() => {
         this.dialogVisible = true
      }, 10)
    }
  },
}
</script>

<style scoped lang='scss'>
  .alarmSetting {
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

