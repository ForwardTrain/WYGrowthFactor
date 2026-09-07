<template>
  <div class="addData-box">
    <div class="top-box">
      <div class="prompt-type">
        <div></div>
        <p>数据列表</p>
      </div>

      <div>
        <el-button class="margin-L" type="primary">保存</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">取消</el-button>
      </div>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>数据源选择：</p>
        <div>
          <el-input style="width: 180px" v-model="tel" placeholder=" " />
        </div>

        <p>数据库选择：</p>
        <div>
          <el-input style="width: 180px" v-model="tel" placeholder=" " />
        </div>

        <p style="margin-left: 20px;">据库选择：</p>
        <div>
          <el-input style="width: 180px" v-model="tel" placeholder=" " />
        </div>

        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>
    </div>

     <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                height="calc(100vh - 370px)">
        <el-table-column prop="student_name" label="序号" width="8%"/>
        <el-table-column prop="tel" label="数据名称" width="94%"/>
        <!-- <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="changeType(scoped.row, 2)" v-if="scoped.row.status == 1">不通过</p>
              <p @click="changeType(scoped.row, 1)" v-else>通过</p>
              <p @click="goSetting(scoped.row, 1)" >置顶</p>
              <p @click="goSetting(scoped.row, 1)" >取消置顶</p>
              
              <p class="delete-p" @click="openDelete(scoped.row)">删除</p>
            </div>
          </template>
        </el-table-column> -->
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
export default {
  data () {
    return {
      results: {
        list: [
          {}
        ],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,
    }
  },
  mounted() {
    
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
  },
}
</script>

<style scoped lang='scss'>
  .addData-box {
    padding: 12px;
    .top-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
