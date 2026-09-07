<template>
  <div class="dataUpdata-box">
    <div class="prompt-type">
      <div></div>
      <p>更新数据</p>
    </div>

    <div class="content-box">
      <div class="content-left">
        <div class="title-box">
          数据库信息
        </div>
        <div class="table-line">
          <div><p>数据库大小</p><span>{{dataInfo.database_size || '-'}}</span></div>
          <div><p>数据库数量</p><span>{{dataInfo.database_length || '-'}}条</span></div>
          <div><p>当前数据库更新日期</p><span>{{dataInfo.c_s_date || '-'}}</span></div>
          <div><p>最近更新数据名称</p><span>{{dataInfo.name || '-'}}</span></div>
          <div style="border-color: #fff;"><p>操作人</p><span>{{dataInfo.operator || '-'}}</span></div>
        </div>

        <div class="title-box" style="margin-top: 15px;">
          更新数据库选择
        </div>
        <div class="table-line2">
          <div class="btn-line">
            <el-button class="margin-L" type="primary" @click="goCompare">对比</el-button>
            <!-- <el-button class="margin-L" type="info" >取消</el-button> -->
          </div>
          <div>
            <!-- <div class="line-box">
              <p>类型选择</p>
              <el-select
                v-model="value"
                placeholder=" ">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div> -->
            <div class="line-box">
              <p>数据名称</p>
              <el-select
                v-model="optionsvalue"
                placeholder=" ">
                <el-option
                  v-for="item in options"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="title-box" style="margin-top: 15px;">
          对比结果
        </div>
        <div class="table-line" v-loading="loading">
          <!-- <div><p>数据大小</p><span>55Mb</span></div> -->
          <div><p>全部</p><span>{{comparisonresult.total || '-'}}</span></div>
          <div><p>新增数据</p><span>{{comparisonresult.add || '-'}}</span></div>
          <div><p>差异数据</p><span>{{comparisonresult.diff || '-'}}</span></div>
          <div style="border-color: #fff;"><p>减少数据</p><span>{{comparisonresult.del || '-'}}</span></div>
        </div>
      </div>

      <div class="content-right">
        <div>
          <div class="right-top">
            <div :style="rightTopIndex == 0 ? 'color: #1990FF;border-color: #1990FF;' : '' " @click="chooseType(0)">全部数据</div>
            <div :style="rightTopIndex == 1 ? 'color: #1990FF;border-color: #1990FF;' : '' " @click="chooseType(1)">新增数据</div>
            <div :style="rightTopIndex == 2 ? 'color: #1990FF;border-color: #1990FF;' : '' " @click="chooseType(2)">差异数据</div>
            <div :style="rightTopIndex == 3 ? 'color: #1990FF;border-color: #1990FF;' : '' " @click="chooseType(3)">减少数据</div>
          </div>

          <el-button class="margin-L" type="primary" @click="allUpdata">全部更新</el-button>
        </div>

        <div>
          <div class="table-box" v-loading="loading2">
            <el-table :data="results.list" 
                      ref="multipleTableRef"
                      style="width: 100%"
                      border>
              <el-table-column prop="id" label="DRGF ID" width="20%"/>
              <el-table-column prop="protein_name" label="数据名称" width="80%"/>
              <el-table-column  width="20%" align="center" label="操作" v-if="rightTopIndex == 2">
                <template #default="scoped">
                  <div class="table-operation">
                    <p @click="goListCompare(scoped.row)">对比</p>
                    <!-- <p @click="goLook(scoped.row)">查看</p> -->
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
      </div>
    </div>
  </div>
</template>

<script>
import { 
  upd_data_list_sel_db_combobox,
  upd_data_list_sel,
  upd_data_list_sel_db_combobox_left_down,
  upd_data_list_sel_db_combobox_right_list,
  diff_data_upd,
  data_upd
} from '@/api/common'

export default {
  data () {
    return {
      options: [],
      optionsvalue: '',

      dataInfo: '',
      comparisonresult: {},
      loading: false,
      loading2: false,

      rightTopIndex: 0,
      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getupd_data_list_sel_db_combobox()
    this.getupd_data_list_sel()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getupd_data_list_sel_db_combobox_right_list()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getupd_data_list_sel_db_combobox_right_list()
    },
    /**
     * 选择
     */
    chooseType(type) {
      this.rightTopIndex = type
      this.currentPage = 1
      this.pageSize = 10
      this.results.list = []
      this.getupd_data_list_sel_db_combobox_right_list()
    },
    /**
     * 全部更新
     */
    allUpdata() {
      if(!this.optionsvalue) {
        this.$message({
          type: 'warning',
          message: '请选择数据名称'
        })
        return
      }
      let type = ''
      if(this.rightTopIndex == 0) {
        type = ''
      } else if (this.rightTopIndex == 1) {
        type = 'add'
      }  else if (this.rightTopIndex == 2) {
        type = 'diff'
      }  else if (this.rightTopIndex == 3) {
        type = 'del'
      }
      data_upd({
        name: this.optionsvalue,
        type: type,
      }).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getupd_data_list_sel_db_combobox_right_list()
        }
      })
    },
    /**
     * 信息
     */
    getupd_data_list_sel() {
      upd_data_list_sel({}).then((res) => {
        this.dataInfo = res.data
      })
    },
    /**
     * 数据库 下拉框
     */
    getupd_data_list_sel_db_combobox() {
      upd_data_list_sel_db_combobox({}).then((res) => {
        this.options = res.data
      })
    },
    /**
     * 列表对比
     */
    goListCompare(row) {
      let type = ''
      if(this.rightTopIndex == 0) {
        type = ''
      } else if (this.rightTopIndex == 1) {
        type = 'add'
      }  else if (this.rightTopIndex == 2) {
        type = 'diff'
      }  else if (this.rightTopIndex == 3) {
        type = 'del'
      }
      this.$store.commit("setRouterList",{
        name: '数据对比',
        url: '/dataCompare',
        query: {
          id: row.id,
          type: type,
        }
      })
      this.$router.push({
        path: '/dataCompare',
        query: {
          id: row.id,
          type: type,
        }
      })
    },
    /**
     * 对比
     */
    goCompare() {
      if(!this.optionsvalue) {
        this.$message({
          type: 'warning',
          message: '请选择数据名称'
        })
        return
      }
      this.getupd_data_list_sel_db_combobox_right_list()
      this.loading = true
      upd_data_list_sel_db_combobox_left_down({
        name: this.optionsvalue,
      }).then((res) => {
        this.comparisonresult = res.data
        this.loading = false
      })
    },
    /**
     * 右侧数据列表 
     */
    getupd_data_list_sel_db_combobox_right_list() {
      this.loading2=  true
      let type = ''
      if(this.rightTopIndex == 0) {
        type = ''
      } else if (this.rightTopIndex == 1) {
        type = 'add'
      }  else if (this.rightTopIndex == 2) {
        type = 'diff'
      }  else if (this.rightTopIndex == 3) {
        type = 'del'
      }
      upd_data_list_sel_db_combobox_right_list({
        name: this.optionsvalue,
        type: type,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
        this.loading2=  false
      })
    },
    goLook() {
      this.$store.commit("setRouterList",{
        name: '查看数据',
        url: '/lookDetails',
        
      })
      this.$router.push({
        path: '/lookDetails',
        
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .dataUpdata-box {
    padding: 12px;
    .content-box {
      margin-top: 20px;
      display: flex;
      .content-left {
        .table-line {
          margin-top: 10px;
          width: 290px;
          height: 244px;
          background: #FFFFFF;
          border: 1px solid #E5E8EE;
          padding: 0 4px;
          >div {
            height: 48px;
            line-height: 48px;
            text-align: center;
            border-bottom: 1px solid #EBEEF5;
            display: flex;
            align-items: center;
            p {
              width: 140px;
              text-align: right;
            }
            span {
              font-weight: 500;
              font-size: 16px;
              margin-left: 10px;
            }
          }
        }
        .table-line2 {
          width: 290px;
          // height: 194px;
          background: #FFFFFF;
          border: 1px solid #E5E8EE;
          margin-top: 15px;
          padding: 20px 10px;
        }
        .line-box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          >p {
            width: 90px;
            text-align: right;
            margin-right: 15px;
          }
        }
        .btn-line {
          text-align: right;
        }
        .title-box {
          width: 290px;
          height: 42px;
          background: #E3F1FF;
          border-radius: 8px;
          line-height: 42px;
          font-weight: 500;
          font-size: 16px;
          padding-left: 20px;
        }
      }
      .content-right {
        margin: 0 20px;
        >:nth-child(1) {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .right-top {
          display: flex;
          align-items: center;
          >div {
            text-align: center;
            line-height: 28px;
            margin-right: 20px;
            cursor: pointer;
            width: 98px;
            height: 28px;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px solid #DCDFE6;
          }
        }
      }
    }
  }
</style>
