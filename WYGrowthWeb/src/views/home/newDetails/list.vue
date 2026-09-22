<template>
  <div class="dataManagement-box">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="730px">
      <div>
        
        <div>
          <p style="margin-bottom: 10px;">Funtion：</p>

          <div>
            <div class="activity-content" v-if="showEditor">
              <quill-editor content-type="html" 
                            enable
                            :options="editorOption" 
                            style="min-height: 500px;" 
                            ref="myQuillEditor"
                            :id="`quillEditors${this.nowTime}`"
                            :content="desc" />
            </div>
          </div>


        </div>

        <div style="margin-top: 20px;">
          <div class="add-libe">
            <p>Pubmed：</p>

            <div class="add-btn" @click="showPMID = true">
              +
            </div>
          </div>

          <div class="PMID-line" v-show="showPMID">
            <div>
              <p>PMID: </p>
              <el-input v-model="input2" style="width: 180px" placeholder=" " />
            </div>

            <div>

              <el-button type="primary" @click="addList2">
                确定
              </el-button>
              <el-button @click="closePMID">取消</el-button>
          
            </div>
            
            
          </div>


          <div class="list-box">
            <div v-for="(item, index) in list2" :key="index">
              PMID: 8766722
              <el-icon @click="deleteList2(index)" class="close-btn"><Close /></el-icon>
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
      <p>数据列表</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>DRGF ID：</p>
        <div>
          <el-input style="width: 180px" v-model="id" placeholder=" " />
        </div>

        <p>数据名称：</p>
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
        <!-- <div @click="choosetype(1)" :style="leftIndexOf == 1 ? 'background: #18C5A4; color: #fff' : ''">
          使用中
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          未使用
        </div> -->
        

      </div>
      <div>
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/权限@2x.png" alt="">权限管理</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新建数据</el-button> -->
        <!-- <el-button class="margin-L" type="info" @click="openAdd2"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新建数据2</el-button> -->


        <el-button class="margin-L" type="info" @click="openAddDetails"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/add-line.png" alt="">新增</el-button>

        <el-button class="margin-L" type="info" @click="openUpdata"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/更新@2x.png" alt="">更新数据</el-button>
        <!-- <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/iocn-21.png" alt="">导出</el-button> -->
        
        <el-button class="margin-L" type="info" @click="openDelete(null)"><img style="margin-right: 4px; width: 14px;" src="@/assets/images/delete-icon.png" alt="">删除</el-button>
      </div>
    </div>

    <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                height="calc(100vh - 370px)">
        <el-table-column width="5%" type="selection"/>
        <el-table-column prop="drgf_code" label="DRGF ID" width="9%"/>
        <el-table-column prop="protein_name" label="蛋白质名称" width="20%"/>
        <el-table-column prop="unipro_entry" label="条目" width="10%"/>
        <el-table-column prop="create_time" label="操作时间" width="10%"/>
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <!-- <p @click="changeType(scoped.row, 2)" v-if="scoped.row.status == 1">不通过</p> -->
              <!-- <p @click="changeType(scoped.row, 1)" v-else>通过</p> -->
              <!-- <p @click="goSetting(scoped.row, 1)" >置顶</p> -->
              <!-- <p @click="goSetting(scoped.row, 1)" >取消置顶</p> -->
              <p @click="goLook(scoped.row)" >查看</p>
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

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
  [{ list: "ordered" }, { list: "bullet" }], //列表
  [{ script: "sub" }, { script: "super" }], // 上下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  // [{ size: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '32px', '36px'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
  [{ font: [] }], //字体
  [{ align: [] }], //对齐方式
  ["clean"], //清除字体样式
  ['link', 'image', 'upload'], // 链接、图片、视频
  // ['sourceEditor']
]

import { 
  data_list,
  del_data_list
} from '@/api/common'
export default {
  data () {
    return {
      title: '新增',
      dialogVisible: false,

      showEditor: true,

      showPMID: false,
      input2: '',

      list2: [
        {
          name: '8787823',
        },{
          name: '8787823',
        },{
          name: '8787823',
        },{
          name: '8787823',
        },{
          name: '8787823',
        },{
          name: '8787823',
        },
      ],

      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'upload': function () { // 添加工具方法
                document.querySelector('.avatar-uploader input').click()
              }
            }
          }, // 自定义工具栏，与上面定义的toolbarOptions 相对应
          // 新增下面
          // imageDrop: true, // 拖动加载图片组件。
          // imageResize: { //调整大小组件。
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar']
          // },
        },
        theme: "snow", //主题
        placeholder: "请输入正文",
      },

      desc: '',

      nowTime: '',
      
      id: '',
      name: '',

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
    }
  },
  mounted() {
    this.nowTime = Date.now()

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
    deleteList2(index) {
      this.list2.splice(index, 1)
    },

    addList2() {

      this.list2.push({
        name: this.input2,
      })
      this.input2 = ''
    },

    closePMID() {
      this.input2 = ''
      this.showPMID = false
    },
    /**
     * 前往新增
     */
    openAddDetails() {
      this.$store.commit("setRouterList",{
        name: '新增详情',
        url: '/dataDetails',
        // query: {
        //   id: row.id,
        // }
      })
      this.$router.push({
        path: '/dataDetails',
        // query: {
        //   id: row.id,
        // }
      })
    },
    /**
     * 前往设置
     */
    goSetting(row) {
      this.$store.commit("setRouterList",{
        name: '工具设置',
        url: '/dataManagementSet',
        query: {
          id: row.id,
        }
      })
      this.$router.push({
        path: '/dataManagementSet',
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
      data_list({
        id: this.id,
        name: this.name,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
      }).then((res) => {
        this.results = res.data
      })
    },


     changeType(row, type) {
      this.$ElMessageBox.confirm(
        type == 1 ? '确认通过此数据？' : '确认不通过此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        update_students_list_application_status({
          ids: row ? row.id : this.multipleSelection.toString(),
          status: type,
          active_main_id: this.$route.query.id,
        }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getList()
            this.getsel_students_list_add_option_stu()
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
        del_data_list({
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
      this.name = ''
      this.id = ''
      this.pageSize = ''
      this.currentPage = ''
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
    openAdd() {
      this.$store.commit("setRouterList",{
        name: '新建数据',
        url: '/addData',
       
      })
      this.$router.push({
        path: '/addData',
        
      })
    },
    openAdd2() {
      this.$store.commit("setRouterList",{
        name: '新建数据',
        url: '/addData2',
       
      })
      this.$router.push({
        path: '/addData2',
        
      })
    },

    goLook(row) {
      this.$store.commit("setRouterList",{
        name: '查看数据',
        url: '/dataDetails',
        query: {
          id: row.id,
          look: 1,
        }
        
      })
      this.$router.push({
        path: '/dataDetails',
        query: {
          id: row.id,
          look: 1,
        }
      })
    },
    goEdit(row) {
      this.$store.commit("setRouterList",{
        name: '查看数据',
        url: '/dataDetails',
        query: {
          id: row.id,
        }
        
      })
      this.$router.push({
        path: '/dataDetails',
        query: {
          id: row.id,
        }
      })
    },
    openUpdata() {
      // this.$store.commit("setRouterList",{
      //   name: '更新数据',
      //   url: '/updateData',
       
      // })
      // this.$router.push({
      //   path: '/updateData',
        
      // })
      this.$store.commit("setRouterList",{
        name: '更新数据',
        url: '/dataUpdata',
        
      })
      this.$router.push({
        path: '/dataUpdata',
        
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .dataManagement-box {
    padding: 12px;
    .tips-input {
      position: relative;
      >p {
        position: absolute;
        font-size: 12px;
      }
    }
    .add-libe {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .PMID-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      >div {
        display: flex;
      align-items: center;
      }
    }
    .list-box {
      display: flex;
      flex-wrap: wrap;
      >div {
        .close-btn {
          margin-left: 12px;
          cursor: pointer;
        }
        display: flex;
        align-items: center;
        height: 30px;
        background: rgb(232, 239, 252);
        border-radius: 24px;
        padding: 0 15px;
        line-height: 30px;
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }
    .add-btn {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid rgb(233,246,247);
      background: rgb(233,246,247);
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(95, 181, 179);
      cursor: pointer;
      
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
