<template>
  <div class="system-information-box">
    <div class="left-content">
      <div class="left-top"> 
        <div class="prompt-type">
          <div></div>
          <p>基础信息</p>
        </div>

        <div class="top-line">
          <div>
            <div class="line-box">
              <span>学校名称：</span>
              <div>
                <el-input v-model="details.org_name" placeholder=" " />
              </div>
            </div>
            <div class="line-box">
              <span>英文名称：</span>
              <div>
                <el-input v-model="details.e_name" placeholder=" " />
              </div>
            </div>

            <div class="line-box">
              <span>联系地址：</span>
              <div>
                <el-select v-model="details.p_code" filterable @change="changePcpde" style="width: 120px;margin-right: 15px;" class="m-2" placeholder=" ">
                  <el-option
                    v-for="item in options"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
                <el-select v-model="details.c_code" filterable @change="changeCcpde" style="width: 120px;margin-right: 15px;" class="m-2" placeholder=" ">
                  <el-option
                    v-for="item in options2"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
                <el-select v-model="details.a_code" filterable style="width: 120px;" class="m-2" placeholder=" ">
                  <el-option
                    v-for="item in options3"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </div>
            </div>

            <div class="line-box">
              <span></span>
              <div>
                <el-input v-model="details.address" style="width: 350px" placeholder=" " />
              </div>
            </div>

            <div class="line-box">
              <span>邮箱地址：</span>
              <div>
                <el-input v-model="details.email" placeholder=" " />
              </div>
            </div>

            <div class="line-box">
              <span>客服电话：</span>
              <div>
                <el-input v-model="details.customer_service_tel	" placeholder=" " />
              </div>
            </div>

            <div class="line-box line-box2">
              <span>服务时间：</span>
              <div>
                <el-input
                  style="width: 230px;"
                  v-model="details.customer_service_time"
                  :rows="2"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3 }"
                  placeholder=" "
                />
              </div>
            </div>

            <div class="prompt-type" style="margin-top: 50px;">
              <div></div>
              <p>系统信息</p>
            </div>

            <div class="line-box">
              <span>系统名称：</span>
              <div>
                <el-input v-model="details.sys_name" placeholder=" " />
              </div>
            </div>

            <div class="line-box line-box2">
              <span>Logo：</span>
              <div>
                <el-upload
                  :headers="{
                    Authorization: Authorization,
                  }"
                  :action="actionUrl"
                  class="avatar-uploader"
                  :show-file-list="false"
                   :auto-upload="false"
                  :on-change="onSuccess"
                  :on-success="(uploadFile) => handleAvatarSuccess(uploadFile, index)">
                  <img v-if="details.logo" :src="details.logo" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </div>
            </div>


            <div class="btn-box">
              <el-button class="margin-L" type="primary" @click="add">保存</el-button>
              <el-button class="margin-L" type="info" @click="getDetails">取消</el-button>
            </div>

          </div>

        </div>

      </div>

  
    </div>

    
    <div class="right-content">

      

      <div class="top-line-box">
        <div class="prompt-type">
          <div></div>
          <p>通知</p>
        </div>

        <div>
          <el-button class="margin-L" type="primary" v-if="!showEditor2" @click="showEditor2 = true">显示</el-button>
          <el-button class="margin-L" type="info" v-else @click="showEditor2Data()">隐藏</el-button>
        </div>
      </div>

      <div v-if="showEditor2" class="quill-editor-box">
        <quill-editor content-type="html" 
                      enable
                      :options="editorOption" 
                      style="min-height: 500px; width: 200px;" 
                      ref="myQuillEditor"
                      id="quillEditor2"
                      :content="notice_content" />
      </div>

      

      <div class="top-line-box">
        <div class="prompt-type"  style="margin-top: 30px;">
          <div></div>
          <p>团队简介</p>
        </div>

        <div>
          <el-button class="margin-L" type="primary" v-if="!showEditor" @click="showEditor = true">显示</el-button>
          <el-button class="margin-L" type="info" v-else @click="showEditorData()">隐藏</el-button>
        </div>
      </div>

      <div v-if="showEditor" class="quill-editor-box">
        <quill-editor content-type="html" 
                      enable
                      :options="editorOption" 
                      style="min-height: 500px; width: 200px;" 
                      ref="myQuillEditor"
                      id="quillEditor"
                      :content="desc" />
      </div>

      

      <div class="top-line-box">
        <div class="prompt-type" >
          <div></div>
          <p>团队详情</p>
        </div>

        <div>
          <el-button class="margin-L" type="primary" v-if="!showEditor3" @click="showEditor3 = true">显示</el-button>
          <el-button class="margin-L" type="info" v-else @click="showEditor3Data()">隐藏</el-button>
        </div>
      </div>

      <div v-if="showEditor3"  class="quill-editor-box">
        <quill-editor content-type="html" 
                      enable
                      :options="editorOption" 
                      style="min-height: 500px; width: 200px;" 
                      ref="myQuillEditor"
                      id="quillEditor3"
                      :content="detail_brief" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  SysBasicToolChina,
  sel_org_info,
  update_org_info,
  sel_qiniu_token,
  sys_info
} from '@/api/common'

let _this = null
import * as qiniu from 'qiniu-js'

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
  [{ list: "ordered" }, { list: "bullet" }], //列表
  [{ script: "sub" }, { script: "super" }], // 上下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: [] }], // 字体大小
  // [{ size: sizes }],
  [{ 'size': ['12px', '14px', '16px' ,'18px', '22px', '26px', '30px', '36px', '42px'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
  [{ font: [] }], //字体
  [{ align: [] }], //对齐方式
  ["clean"], //清除字体样式
  ['link', 'image', 'upload'], // 链接、图片、视频
  // ['sourceEditor']
]

export default {
  data () {
    return {
      options: [],
      options2: [],
      options3: [],

      actionUrl: '',
      Authorization: '',

      details: {},

      fileList99: [],
      showEditor: true,
      desc: '',
      content: '',
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

      notice_content: '',
      detail_brief: '',

      qnToken: '',

      showEditor2: true,
      showEditor3: true,
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

    this.getSysBasicToolChina(0)

    this.getDetails()

    this.getsel_qiniu_token()

    
  },
  methods: {
    getsel_qiniu_token() {
      sel_qiniu_token({}).then((res) => {
        this.qnToken = res
      })
    },
    /**
     * 更换头像
     */
    handleAvatarSuccess(uploadFile, index) {
      this.details.picture_url = uploadFile.data.files[0]
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
              _this.details.logo = `http://fileotheryz.hzyzcloud.com/${res.key}`,
              _this.fileList99.push({
                url: `http://fileotheryz.hzyzcloud.com/${res.key}`,
                img: `http://fileotheryz.hzyzcloud.com/${res.key}`,
              })
            }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },
    /**
     * 保存
     */
    add() {
      if(this.showEditor) {
        var someElement = document.getElementById('quillEditor');
        var someElementToString = someElement.outerHTML;
        this.details.introduction_brief = someElementToString
      } else {
        this.details.introduction_brief = ''
      }

      if(this.showEditor2) {
        var someElement2 = document.getElementById('quillEditor2');
        var someElementToString2 = someElement2.outerHTML;
        this.details.notice_content  = someElementToString2  
      } else {
        this.details.notice_content  = ''  
      }
      if(this.showEditor3) {
        var someElement3 = document.getElementById('quillEditor3');
        var someElementToString3 = someElement3.outerHTML;
        this.details.detail_brief = someElementToString3
      } else {
        this.details.detail_brief = ''
      }
      


      


      update_org_info(this.details).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.getsys_info()
          
        }
      })
    },

    /**
     * 获取信息
     */
    getsys_info() {
      sys_info({}).then((res) => {
        localStorage.setItem('sysInfo', JSON.stringify(res.data))
        setTimeout(() => {
          window.location.reload()
        }, 100)
      })
    },

    showEditor3Data() {
      var someElement3 = document.getElementById('quillEditor3');
      var someElementToString3 = someElement3.outerHTML;
      this.detail_brief = someElementToString3
      setTimeout(() => {
        this.showEditor3 = false
      }, 100)
    },

    showEditor2Data() {
      var someElement2 = document.getElementById('quillEditor2');
      var someElementToString2 = someElement2.outerHTML;
      this.notice_content = someElementToString2
      setTimeout(() => {
        this.showEditor2 = false
      }, 100)
    },

    showEditorData() {
      var someElement = document.getElementById('quillEditor');
      var someElementToString = someElement.outerHTML;
      this.desc = someElementToString
      setTimeout(() => {
        this.showEditor = false
      }, 100)
    },
    /**
     * 获取详情
     */
    getDetails() {
      this.showEditor = false
      this.showEditor2 = false
      this.showEditor3 = false
      sel_org_info({}).then((res) => {
        this.details = res.data
        this.desc =  res.data.introduction_brief
        this.content = res.data.introduction_brief

        this.notice_content =  res.data.notice_content
        this.detail_brief =  res.data.detail_brief

        
        if(res.data.introduction_brief) {
          this.showEditor = true
        }

        if(res.data.notice_content) {
          this.showEditor2 = true
        }

        if(res.data.detail_brief) {
          this.showEditor3 = true
        }
        
        


        if(res.data.p_code) {
          SysBasicToolChina({
            code: res.data.p_code
          }).then((res) => {
            this.options2 = res.data.list
          })
        }
        if(res.data.c_code) {
          SysBasicToolChina({
            code: res.data.c_code
          }).then((res) => {
            this.options3 = res.data.list
          })
        }
      })
    },
    /**
     * 获取神市区
     */
    getSysBasicToolChina(type) {
      SysBasicToolChina({
        code: type,
      }).then((res) => {
        if(type == 0) {
          this.options = res.data.list
        }
      })
    },
    /**
     * 选择省
     */
    changePcpde(code) {
      SysBasicToolChina({
        code: code,
      }).then((res) => {
        this.options2 = res.data.list
        this.details.c_code = ''
        this.details.a_code = ''
      })
    },
    /**
     * 选择市
     */
    changeCcpde(code) {
      SysBasicToolChina({
        code: code,
      }).then((res) => {
        this.options3 = res.data.list
        this.details.a_code = ''
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .top-line-box {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    margin-top: 30px;
  }
  .system-information-box {
    display: flex;
    background: #F6F7FB !important;

    .btn-box {
      position: absolute;
      bottom:20px;
    }

    .quill-editor-box {
      margin-top: 20px;
    }
    ::v-deep(#quillEditor) {
      width: 100% !important;
      overflow: auto;
      max-height: calc(100vh - 280px) !important;
      // overflow: auto;
      // max-height: calc(100vh - 330px) !important;
      // margin: 0px !important
    }
    ::v-deep(#quillEditor2) {
      width: 100% !important;
      overflow: auto;
      max-height: calc(100vh - 280px) !important;
      // overflow: auto;
      // max-height: calc(100vh - 330px) !important;
      // margin: 0px !important
    }
    ::v-deep(#quillEditor3) {
      width: 100% !important;
      overflow: auto;
      max-height: calc(100vh - 280px) !important;
      // overflow: auto;
      // max-height: calc(100vh - 330px) !important;
      // margin: 0px !important
    }
    >div  {
      width: 50%;
    }
    .top-line {
      display: flex;
      align-items: flex-start;
      >:nth-child(1) {
        margin-right: 50px;
      }
    }
    .left-content {
      margin-right: 12px;
      
    }
    .left-middle {
      margin-top: 12px;
      background: #fff;
      height: 177px;
      border-radius: 8px;
      padding: 15px;
    }
    .left-bottom {
      margin-top: 12px;
      background: #fff;
      height: calc(100vh - 501px);
      border-radius: 8px;
      padding: 15px;
    }
    .left-top {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      height: calc(100vh - 132px);
    }
    .right-content {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      overflow: auto;
    }
    .line-box {
      display: flex;
      align-items: center;
      margin-top: 15px;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
        color: #909399;
      }
    }
    .line-box2 {
      display: flex;
      align-items: flex-start;
    }
    ::v-deep(.el-upload) {
      width: 92px;
      height: 92px;
      background: #FFFFFF;
      border-radius: 4px;
    }
    .btn-content {
      position: absolute;
      bottom: 25px;
    }
  }
</style>
