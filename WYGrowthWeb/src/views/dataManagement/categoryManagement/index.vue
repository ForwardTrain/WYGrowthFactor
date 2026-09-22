<template>
  <div class="categoryManagement-box">

    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :center="true"
      width="930px">
      <div>
        
        <div class="dialine-box ">
          <p><span>*</span>家族名称：</p>
          <div class="tips-input">
            <el-input style="width: 580px" @input="changedianame" v-model="dianame" placeholder=" " />
          </div>
        </div>

        <div class="dialine-box ">
          <p><span>*</span>蛋白名称：</p>
          <div>
            <el-select
              
              v-model="diaList"
              multiple
              filterable
              collapse-tags
              placeholder=" "
              style="width: 580px"
            >
              <el-option
                v-for="item in options"
                :key="item.unipro_entry"
                :label="item.name"
                :value="item.unipro_entry"
              />
            </el-select>
          </div>
        </div>
        <div class="dialine-box dialine-box2">
          <p>简介：</p>
          <div style="width: 580px">

            <div v-if="showEditor" class="quill-editor-box">
              <quill-editor content-type="html" 
                            enable
                            :options="editorOption" 
                            style="min-height: 700px; width: 580px;" 
                            ref="myQuillEditor"
                            id="quillEditor"
                            :content="desc" />
            </div>

            <!-- <el-input
              v-model="desc"
              style="width: 380px"
              :autosize="{ minRows: 8, maxRows: 20 }"
              type="textarea"
              placeholder=" "
            /> -->
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
      <p>家族管理</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>名称：</p>
        <div>
          <el-input style="width: 180px" v-model="name" placeholder=" " />
        </div>

        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>
    </div>


    <div class="operation-btn">
      <div class="operation-btn-left">
        <!-- <div @click="choosetype(0)" :style="leftIndexOf == 0 ? 'background: #18C5A4; color: #fff' : ''">
          全部
        </div>
        <div @click="choosetype(1)" :style="leftIndexOf == 1 ? 'background: #18C5A4; color: #fff' : ''">
          启用
        </div>
        <div @click="choosetype(2)" :style="leftIndexOf == 2 ? 'background: #18C5A4; color: #fff' : ''">
          禁用
        </div> -->
        

      </div>
      <div>
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
                height="calc(100vh - 370px)">
        <el-table-column width="5%" type="selection"/>
        <el-table-column prop="name" label="家族名称" width="10%"/>
        <el-table-column show-overflow-tooltip prop="protin_names"  label="蛋白名称" width="15%">
           <!-- <template #default="scoped">
            <div class="unipro_entry-box">
              <p>{{scoped.row.protin_names}}</p>
            </div>
          </template> -->
        </el-table-column>

        <el-table-column prop="desc" show-overflow-tooltip label="备注" width="10%"/>
        <el-table-column  width="10%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="openEdit(scoped.row, 1)">编辑</p>
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
  // students_list,
  // sel_students_list_add_option_stu,
  // save_students_list_application,
  // del_students_list_application,
  // update_students_list_application_status
  sel_protein_type_list,
  del_protein_type_list,
  edit_protein_type_list,
  sel_protein_type_list_option
} from '@/api/common'

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
  // [{ font: [] }], //字体
  [{ align: [] }], //对齐方式
  ["clean"], //清除字体样式
  ['link', 'image', 'upload'], // 链接、图片、视频
  // ['sourceEditor']
]

export default {
  data () {
    return {
      showEditor: true,
      title: '新增',
      dialogVisible: false,
      
      name: '',
      showHave: false,

      editId: '',
      diaList: [],
      dianame: '',
      desc: '',


      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,
      leftIndexOf: 0,

      options: [],

      multipleSelection: [],
      value: [],
      options: [],
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
    }
  },
  mounted() {
    this.getList()
    // this.getsel_students_list_add_option_stu()
    this.getsel_protein_type_list_option()
  },
  methods: {
    changedianame(val) {
      const filteredValue = val.replace(/\(|\)|\（|\）/g, '');
      // const filteredValue = val.replace(/[0-9]/g, '');
      // const filteredValue2 = val.replace(/\)/g, ''); // 例如，移除所有数字
      this.dianame = filteredValue;
      console.log(val, 2222)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    getsel_students_list_add_option_stu() {
      sel_students_list_add_option_stu({
        active_main_id: this.$route.query.id
      }).then((res) => {
        this.options = res.data.list
      })
    },
    /**
     * 获取变价
     */
    getsel_protein_type_list_option() {
      sel_protein_type_list_option({}).then((res) => {
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
      sel_protein_type_list({
        name: this.name,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        status:  this.leftIndexOf,
      }).then((res) => {
        this.results = res.data
      })
    },
    /**
     * 编辑
     */
    openEdit(row) {
      this.showEditor = false
      this.diaList = []
      this.title = '编辑'
      this.editId = row.id
      this.dianame = row.name
      this.desc = row.desc
      if(row.list && row.list.length) {
        row.list.forEach((item) => {
          this.diaList.push(item.unipro_entry)
        })
      }
      setTimeout(() => {
        this.showEditor = true
      }, 100)
      this.dialogVisible = true
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
        del_protein_type_list({
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
      this.getList()
    },

    add() {
      if(!this.dianame && !this.diaList.length) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }


      let list1 = []
      this.diaList.forEach((item) => {
        list1.push({
          unipro_entry: item
        })
      })

      let list2 = list1.filter((item, index, self) =>
          index === self.findIndex(t => (t.unipro_entry === item.unipro_entry))
      );

      var someElement = document.getElementById('quillEditor');
      var someElementToString = someElement.outerHTML;

      edit_protein_type_list({
        id: this.editId,
        name: this.dianame,
        list: list2,
        desc: someElementToString,
      }).then((res) => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.dialogVisible = false
            this.getList()
            this.getsel_students_list_add_option_stu()
          } else if (res.code == 0 && res.message == '该词已存在') {
            this.showHave = true
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
      this.showHave = false
      this.dianame = ''
      this.title = '新增'
      this.desc = ''
      this.editId = ''
      this.diaList = []
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped lang='scss'>

  ::v-deep(.el-tooltip) {
    width: 100% !important;
  }
  .categoryManagement-box {
    padding: 12px;
    .tips-input {
      position: relative;
      >p {
        position: absolute;
        font-size: 12px;
      }
    }
    .unipro_entry-box {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      border: 1px solid red;
      width: 100%;
      height: 30px !important;
      overflow: auto;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      >p {
        white-space: nowrap;
        white-space: pre-wrap;
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
        width: 130px;
        text-align: right;
      }
    }
    .dialine-box2 {
      display: flex;
      align-items: flex-start;
    }
  }
</style>
