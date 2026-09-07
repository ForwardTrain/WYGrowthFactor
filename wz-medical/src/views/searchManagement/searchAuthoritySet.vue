<template>
  <div class="searchAuthoritySet-add">
    <div class="prompt-type">
      <div></div>
      <p>工具设置</p>
    </div>

    <div class="operation-btn">
      <div class="operation-btn-left">
        
      </div>
      <div>
        <el-button class="margin-L" type="primary" @click="add(2)" v-if="!$route.query.look">保存</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">取消</el-button>
      </div>
    </div>

    <div class="content-box">
      <div class="content-left">
        <p style="font-weight: 600;margin: 15px 0;">工具信息</p>

        <div class="left-top">
          <div>
            <div class="line-box">
              <p><span>*</span>工具名称：</p>
              <el-input style="width: 240px;" :disabled="$route.query.look" v-model="addData.title" placeholder=" " />
            </div>

            <div class="line-box">
              <p><span>*</span>工具地址：</p>
              <el-input style="width: 240px;" :disabled="$route.query.look" v-model="addData.title" placeholder=" " />
            </div>

            <div class="line-box line-box">
              <p >工具状态：</p>
              <div>
                <el-switch :disabled="$route.query.look" v-model="addData.is_need_approver"  />
              </div>
            </div>
            
          </div>

        </div>

    
      </div>

      <div class="content-right">
        <p style="font-weight: 600;margin: 15px 0;">工具描述</p>
        <div v-if="!$route.query.look">
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

          <div class="activity-content" v-else v-html="desc">

          </div>
      </div>



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

let _this = null
import * as qiniu from 'qiniu-js'

import QrcodeVue from 'qrcode.vue'

import { 
} from '@/api/common'


export default {
  components: {
    QrcodeVue,
  },

  data () {
    return {
      share_url: '',
      showEditor: true,
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
      nowTime: '',
      desc: '',

      tableList: [],
      url: '',
      addData: {
        title: '',
        time: ['', ''],
        img: '',
        applicants_type: '1',
        applicants_num: '',
        is_need_approver: true,
        scope: '1',
        content: '',
      },
      value: '',
      options: [],
      qnToken: '',
      Authorization: '',
      actionUrl: '',
    }
  },
  mounted() {
     _this = this

     if(this.$global.hostname) {
      this.actionUrl = this.$global.target + '/HealthyMnHt//SysUploadFiles/upload/files'
    } else {
      this.actionUrl = window.location.origin + '/HealthyMnHt//SysUploadFiles/upload/files'
    }
    this.Authorization = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token

    if(this.$route.query.id) {
      // this.getsel_active_list()

      setTimeout(() => {
        var contentBox = document.getElementsByClassName('ql-editor')
        for(var i=0; i<contentBox.length; i++) {
          contentBox[i].setAttribute("contenteditable", false);
        }
      }, 100)
    }
  },
  methods: {
    /**
     * 获取详情
     */
    getsel_active_list() {
      sel_active_list({id: this.$route.query.id}).then((res) => {
        res.data.time =[res.data.active_time_start, res.data.active_time_end]
        if(res.data.is_need_approver == 1) {
          res.data.is_need_approver = true
        } else {
          res.data.is_need_approver = false
        }
        this.share_url = res.data.share_url
        this.tableList = res.data.class_list
        this.showEditor = false
        this.desc = res.data.content
        setTimeout(() => {
          this.showEditor = true
        } ,100)
        
        this.addData = res.data
        this.addData.img = res.data.img
      })
    },
    getsel_qiniu_token() {
      sel_qiniu_token({}).then((res) => {
        this.qnToken = res
      })
    },
    /**
     * 打开删除
     */
    openDelete(index) {
      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
       this.tableList.splice(index, 1)
      })
    },
    /**
     * 获取棒极列表
     */
    getsel_active_list_option_class() {
      sel_active_list_option_class({}).then((res) => {
        this.options = res.data.list
      })
    },

    onSuccess(uploadFile) {
      const observable =  qiniu.upload(uploadFile.raw, `${Date.now()}${uploadFile.name}`, this.qnToken)
      const observer = {
        next(res){
          
        },
        error(err){
          // ...
        },
        complete(res){
          setTimeout(() => {
              _this.addData.img = `http://filezdmanager.hello2345.com/${res.key}`
            }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },
    
    /**
     * 添加班级
     */
    getClass() {
      this.options.forEach((item) => {
        if(item.id == this.value) {
          this.tableList.push(item)
        }
      })
    },
    /**
     *  取消
     */
    emptyData() {
      this.$router.go(-1)
    },
    /**
     * 保存
     */
    add(type) {
      if(this.addData.is_need_approver) {
        this.addData.is_need_approver = '1'
      } else {
        this.addData.is_need_approver = '2'
      }
      var someElement = document.getElementById(`quillEditors${this.nowTime}`);
      var someElementToString = someElement.outerHTML;
      this.addData.content = someElementToString
      this.addData.class_list = this.tableList
      this.addData.active_time_start = this.addData.time[0]
      this.addData.active_time_end = this.addData.time[1]

      this.addData.status = type
      this.addData.id = this.$route.query.id
      add_active_list(this.addData).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })

          this.emptyData()
        }
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .searchAuthoritySet-add {
    padding: 12px;
    .content-box {
      display: flex;
      .content-left {
        // width: 800px;
        margin-right: 150px;
        
      }
    }
    .activity-content {
      width: 675px;
      height: 560px;
    }

    .left-top {
      display: flex;
    }
    .line-box {
      display: flex;
      align-items: center;
      margin: 10px 0;
      >p {
        width: 90px;
        min-width: 90px;
        text-align: right;
        white-space: nowrap;
        span {
          color: #FF1B1B;
        }
      }
    }
    .line-box2 {
      display: flex;
      align-items: flex-start;
    }
    ::v-deep(.el-icon.avatar-uploader-icon) {
      width: 102px;
      height: 102px;
    }
  }
</style>
