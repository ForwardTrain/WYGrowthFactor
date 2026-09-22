<template>
  <div class="graphicManagement-page2-box">

    <div class="prompt-type">
      <div></div>
      <p>资讯列表</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>栏目名称：</p>
        <div>
          <el-input style="width: 180px" v-model="item_name" placeholder=" " />
        </div>

        <p>标题名称：</p>
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
        <div @click="choosetype(6)" :style="leftIndexOf == 6 ? 'background: #18C5A4; color: #fff' : ''">
          下架
        </div>
        <!-- <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          待审核
        </div> -->
        <div @click="choosetype(5)" :style="leftIndexOf == 5 ? 'background: #18C5A4; color: #fff' : ''">
          发布成功
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
        <el-table-column prop="img" label="封面图片" width="10%">
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
        </el-table-column>  
        <el-table-column prop="name" label="标题名称" width="10%"/>
        <el-table-column prop="item_name" label="栏目" width="10%"/>
        <!-- <el-table-column prop="registration_time" label="热文推荐" width="20%"/> -->
        <el-table-column prop="is_push" label="热文推荐" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.is_push == '1' ? '推荐' : '不推荐'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.status == '1' ? '未提交' : scoped.row.status == '2' ? '待审核' : scoped.row.status == '3' ? '审核通过' : 
                 scoped.row.status == '4' ? '审核不通过' : scoped.row.status == '5' ? '发布' : '下架'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="publish_time" label="发布时间" width="10%"/>
        
        <el-table-column  width="20%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="changeType(scoped.row, 5)" v-if="scoped.row.status == 6" >上架</p>
              <p @click="changeType(scoped.row, 6)" v-else>下架</p>
              <!-- <p @click="changeType(scoped.row, 1)" >审核</p> -->
              <!-- <p @click="changeType(scoped.row, 1)" >提交</p> -->
              <p @click="goLook(scoped.row)" >查看</p>
              <p @click="goEdit(scoped.row)" v-if="scoped.row.status == 6" >编辑</p>
              
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
  Contentsel_list,
  Contentdel_list,
  Contentadd_upd_list
} from '@/api/common'
export default {
  data () {
    return {
      item_name: '',
      name: '',

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
    /**
     * 前往设置
     */
    goSetting(row) {
      this.$store.commit("setRouterList",{
        name: '图文新增',
        url: '/imageTextAdd',
        query: {
          id: row.id,
        }
      })
      this.$router.push({
        path: '/imageTextAdd',
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
      Contentsel_list({
        item_name: this.item_name,
        name: this.name,
        type: 1,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        status:  this.leftIndexOf,
      }).then((res) => {
        this.results = res.data
      })
    },


    changeType(row, type) {
      this.$ElMessageBox.confirm(
        type == 5 ? '确认上架此数据？' : '确认下架此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        Contentadd_upd_list({
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
        Contentdel_list({
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
      this.name =  ''
      this.leftIndexOf = 0
      this.currentPage = 1
      this.pageSize = 10
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
    goLook(row, look) {
      this.$store.commit("setRouterList",{
        name: '图文新增',
        url: '/imageTextAdd',
        query: {
          id: row.id,
          look: 1,
        }
      })
      this.$router.push({
        path: '/imageTextAdd',
        query: {
          id: row.id,
          look: 1,
        }
      })
    },
    /**
     * 查看
     */
    goEdit(row, look) {
      this.$store.commit("setRouterList",{
        name: '图文新增',
        url: '/imageTextAdd',
        query: {
          id: row.id,
        }
      })
      this.$router.push({
        path: '/imageTextAdd',
        query: {
          id: row.id,
        }
      })
    },
    openAdd() {
      this.$store.commit("setRouterList",{
        name: '图文新增',
        url: '/imageTextAdd',
        
      })
      this.$router.push({
        path: '/imageTextAdd',
       
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .graphicManagement-page2-box {
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
