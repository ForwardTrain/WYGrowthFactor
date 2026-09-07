<template>
  <div class="lookDetails-box">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="480px">
      <div>
        <div class="dialine-box">
          <p><span>*</span>别名名称：</p>
          <div>
            <el-input v-model="diaName" placeholder="请输入" />
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
      <p>查看</p>
    </div>

    <div class="content-box">
      <div class="content-left">
        <div class="title-box">
          基础数据信息
        </div>

        <div class="left-border">
          <!-- <div class="btn-line">
            <el-button class="margin-L" type="primary" @click="goCompare">对比</el-button>
            <el-button class="margin-L" type="info" >取消</el-button>
          </div> -->

          <div class="data-line">
            <div class="line-box">
              <p>数据ID</p>
              <div style="width: 350px" >
                <!-- <el-input style="width: 350px" v-model="tel" placeholder=" " /> -->
                {{dataInfo.id || '-'}}
              </div>
            </div>
            <div class="line-box">
              <p>数据名称</p>
              <div style="width: 350px" >
                <!-- <el-input style="width: 350px" v-model="tel" placeholder=" " /> -->
                {{dataInfo.protein_name || '-'}}
              </div>
            </div>
          </div>


          <div class="btn-line" style="margin-top: 15px;">
            <el-button class="margin-L" type="primary" @click="openAdd">添加别名</el-button>
          </div>

          <div class="left-table" style="margin-top: 15px;">
            <el-table :data="dataInfo.as_know" 
                      ref="multipleTableRef"
                      style="width: 100%"
                      border
                      @selection-change="handleSelectionChange">
              <el-table-column prop="id" label="id" width="15%"/>
              <el-table-column prop="name" label="别名" width="40%"/>
              <el-table-column  width="20%" align="center" label="操作">
                <template #default="scoped">
                  <div class="table-operation">
                    <p @click="openEdit(scoped.row)">编辑</p>
                    <p class="delete-p" @click="openDelete(scoped.row)">删除</p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        
      </div>
      <div class="content-right">
        <div class="content-right-top">
          <!-- <div @click="scrollToAnchor('as_know2', 'as_know', 0)" :style="topChooseIndex == 0 ? 'color: #1990FF; border-color: #1990FF;' : ''">as_know</div> -->
          <div @click="scrollToAnchor('general_information2', 'general_information', 1)" :style="topChooseIndex == 1 ? 'color: #1990FF; border-color: #1990FF;' : ''">general_information</div>
          <div @click="scrollToAnchor('protein_sequence2', 'protein_sequence', 2)" :style="topChooseIndex == 2 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_sequence</div>
          <div @click="scrollToAnchor('protein_function2', 'protein_function', 3)" :style="topChooseIndex == 3 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_function</div>
          <div @click="scrollToAnchor('expression_and_location2', 'expression_and_location',4)" :style="topChooseIndex == 4 ? 'color: #1990FF; border-color: #1990FF;' : ''">expression_and_location</div>
          <div @click="scrollToAnchor('protein_structure2', 'protein_structure', 5)" :style="topChooseIndex == 5 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_structure</div>
          <div @click="scrollToAnchor('family_and_domain2', 'family_and_domain',6)" :style="topChooseIndex == 6 ? 'color: #1990FF; border-color: #1990FF;' : ''">family_and_domain</div>
          <div @click="scrollToAnchor('protein_interaction2', 'protein_interaction',7)" :style="topChooseIndex == 7 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_interaction</div>
          <div @click="scrollToAnchor('mutation_and_disease2', 'mutation_and_disease', 8)" :style="topChooseIndex == 8 ? 'color: #1990FF; border-color: #1990FF;' : ''">
            mutation_and_disease
          </div>
          <div @click="scrollToAnchor('post_translational_modification2', 'post_translational_modification', 9)" :style="topChooseIndex == 9 ? 'color: #1990FF; border-color: #1990FF;' : ''">
            post_translational_modification
          </div>
        </div>

        <div class="table-box">
          <div  class="table-line">
            <div>
              <div v-for="(item, index) in dataInfo.list" :key="index"
                  :style="item.op_type == 'equ' ? 'background: #FFBFBF' : item.op_type == 'upd' ? 'background: #E2F6DB' : item.op_type == 'add' ? 'background: #FFE4C0' : item.op_type == 'del' ?  'background: #C0EDFF' : ''"> 
                <p :ref="`${item.type}`"  :id="`${item.type}`">{{item.type || '-'}}</p>
              </div>
            </div>
            <div>
              <div v-for="(item, index) in dataInfo.list" :key="index">
                {{item.name || '-'}}
              </div>
              
            </div>

            <div>
              <div v-for="(item, index) in dataInfo.list" :key="index">
                {{item.value || '-'}}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  upd_data_list_details,
  add_upd_as_know
} from '@/api/common'
export default {
  data () {
    return {
      diaName: '',
      title: '新增',
      dialogVisible: false,

      topChooseIndex: 1,
      results: {
        list: [
          {}
        ],
        total: 0,
      },
      editId: '',
      dataInfo: {
        list: [],
        as_know: []
      }
    }
  },
  mounted() {
    this.getupd_data_list_details()
  },
  methods: {
    scrollToAnchor(anchor, anchor2, index) {
      this.topChooseIndex = index
      this.$nextTick(() => {
        const element = this.$refs[anchor];
        if (element) {
          element[0].scrollIntoView();
        }
      });
      this.$nextTick(() => {
        const element = this.$refs[anchor2];
        if (element) {
          element[0].scrollIntoView();
        }
      });
    },
    /**
     * 打开新增别名和
     */
    openAdd() {
      this.title = '新增'
      this.diaName = ''
      this.dialogVisible = true
    },
    openEdit(row) {
      this.title = '编辑'
      this.diaName = row.name
      this.editId = row.id
      this.dialogVisible = true
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
        add_upd_as_know({
          name: '',
          id: row.id,
          p_id: this.$route.query.id
        }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getupd_data_list_details()
          }
        })
      })
    },
    add() {
      if(!this.diaName) {
        this.$message({
          type: 'warning',
          message: '请输入别名'
        })
        return
      }
      add_upd_as_know({
        name: this.diaName,
        id: this.editId,
        p_id: this.$route.query.id
      }).then((res) => {
        if(res.code == 1) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getupd_data_list_details()
        }
      })
    },
    /**
     * 获取详情
     */
    getupd_data_list_details() {
      upd_data_list_details({
        id: this.$route.query.id
      }).then((res) => {
        this.dataInfo = res.data
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .lookDetails-box {
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
    padding: 12px;
    .content-box {
      margin-top: 15px;
      display: flex;
      .line-box {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin-top: 20px;
          >p {
            text-align: right;
            margin-right: 15px;
          }
        }
        .data-line {
          border-bottom: 1px solid #EBEEF5;
          padding-bottom: 20px;
        }
      .content-left {
        .title-box {
          margin-right: 20px;
          width: 514px;
          height: 42px;
          background: #E3F1FF;
          border-radius: 8px;
          font-weight: 500;
          font-size: 16px;
          line-height: 42px;
          padding: 0 20px;
        }
        .left-border {
          margin-top: 15px;
          width: 514px;
          // height: 832px;
          background: #FFFFFF;
          border: 1px solid #E5E8EE;
          padding: 15px;
        }
        .btn-line {
          text-align: right;
        }
      }
      .content-right {
        .content-right-top {
          display: flex;
          >div {
            margin-right: 15px;
            cursor: pointer;
            padding: 0 15px;
            height: 28px;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px solid #DCDFE6;
            line-height: 28px;
            text-align: center;
          }
        }
      }
    }
    .table-box {
      // border: 1px solid red !important;
      height: calc(100vh - 250px);
      overflow: auto;
      .table-line {
        display: flex;
        >:nth-child(1) {
          // width: 274px;
          // margin-top: -1px;
          // background: #FFBFBF;
          // border: 1px solid #E5E8EE;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          margin-left: -1px;
          >div {
            margin-top: -1px;
            padding:0 20px;
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE;
            word-wrap: break-word; /* 允许在单词内换行 */
          }
        }
        >:nth-of-type(2) {
          margin-left: -1px;
          >div {
            margin-top: -1px;
            padding:0 20px;
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE
          }
        }
        >:nth-of-type(3) {
          margin-left: -1px;
          >div {
            margin-top: -1px;
            padding:0 20px;
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE
          }
        }
      }
    }
  }
</style>
