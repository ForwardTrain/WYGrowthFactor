<template>
  <div class="graphicManagement-page1-box">
    
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="430px">
      <div>
        
        <div class="dialine-box dialine-box2" style="margin-bottom: 30px;">
          <p><span>*</span>栏目名称：</p>
          <div class="tips-input">
            <el-input style="width: 180px" :disabled="title == '查看'" v-model="addData.name" placeholder=" " />
          </div>
        </div>

        <div class="dialine-box dialine-box2" style="margin-bottom: 30px;">
          <p>上级栏目：</p>
          <div class="tips-input">
            <el-select
              :disabled="title == '查看'"
              v-model="addData.p_id"
              placeholder=" "
              style="width: 180px"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>

        <div class="dialine-box dialine-box2" style="margin-bottom: 30px;">
          <p>左侧导航显示：</p>
          <div class="tips-input">
            <el-radio-group style="width: 180px" :disabled="title == '查看'"  v-model="addData.left_show" class="ml-4">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="dialine-box dialine-box2">
          <p>显示排序：</p>
          <div>
            <el-input style="width: 180px" :disabled="title == '查看'" v-model="addData.sort" placeholder=" " />
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
      <p>资讯栏目</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>栏目名称：</p>
        <div>
          <el-input style="width: 180px" v-model="item_name" placeholder=" " />
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
          显示
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          不显示
        </div>
        

      </div>
      <div>
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-22.png" alt="">导入</el-button>
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-21.png" alt="">导出</el-button> -->
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
                height="calc(100vh - 440px)">
        <el-table-column width="5%" type="selection"/>
        <el-table-column prop="id" label="id" width="6%"/>
        <!-- <el-table-column prop="img" label="封面图片" width="10%">
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
          </template>
        </el-table-column>   -->
        <el-table-column prop="p_name" label="栏目名称" width="10%"/>
        <el-table-column prop="name" label="栏目" width="10%"/>
        <el-table-column prop="num" label="内容数量" width="10%"/>
        <el-table-column prop="left_show" label="是否显示" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.left_show == '1' ? '显示' : '不显示'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人" width="10%"/>
        <!-- <el-table-column prop="status" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.status == '1' ? '未提交' : scoped.row.status == '2' ? '待审核' : scoped.row.status == '3' ? '审核通过' : 
                 scoped.row.status == '4' ? '审核不通过' : scoped.row.status == '5' ? '发布' : '下架'}}</p>
          </template>
        </el-table-column> -->
        <el-table-column  width="20%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="changeType(scoped.row, 2)" v-if="scoped.row.left_show == 1">不显示</p>
              <p @click="changeType(scoped.row, 1)" v-else>显示</p>
              
              <p @click="goLook(scoped.row, 1)" >查看</p>
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
  Itemsel_list,
  Itemdel_list,
  Itemadd_upd_list,
  Itemp_item_list
} from '@/api/common'
export default {
  data () {
    return {
      dialogVisible: false,
      title: '新增',

      item_name: '',

      options: [],

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

      addData: {
        id: '',
        left_show	: '1',
        name: '',
        p_id: '',
        sort: '',
        status: '',
        type: 1,
      }
    }
  },
  mounted() {
    this.getList()
    this.getItemp_item_list()
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
     * 获取下拉框
     */
    getItemp_item_list() {
      Itemp_item_list({
        type: 1,
      }).then((res) => {
        this.options = res.data
      })
    },
    /**
     * 前往设置
     */
    goSetting(row) {
      this.$store.commit("setRouterList",{
        name: '工具设置',
        url: '/graphicManagement-page1Set',
        query: {
          id: row.id,
        }
      })
      this.$router.push({
        path: '/graphicManagement-page1Set',
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
      Itemsel_list({
        item_name: this.item_name,
        type: 1,
        left_show: this.leftIndexOf,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },


     changeType(row, type) {
      this.$ElMessageBox.confirm(
        type == 1 ? '确认显示此数据？' : '确认不显示此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        Itemadd_upd_list({
          id: row.id,
          left_show: type,
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
        Itemdel_list({
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
      this.item_name = ''
      // this.tel = ''
      this.currentPage = 1
      this.pageSize = 10
      this.leftIndexOf = 0
      this.getList()
    },

    add() {
      if(!this.addData.name) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      Itemadd_upd_list(this.addData).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.dialogVisible = false
            this.getItemp_item_list()
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
    goEdit(row) {
      this.title = '编辑'
      this.addData = row
      this.dialogVisible = true
    },
    goLook(row) {
      this.title = '查看'
      this.addData = row
      this.dialogVisible = true
    },
    openAdd() {
      this.title = '新增'
      this.addData =  {
        id: '',
        left_show	: '1',
        name: '',
        p_id: '',
        sort: '',
        status: '',
        type: 1,
      }
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped lang='scss'>
  .graphicManagement-page1-box {
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
        width: 120px;
        text-align: right;
      }
    }
  }
</style>
