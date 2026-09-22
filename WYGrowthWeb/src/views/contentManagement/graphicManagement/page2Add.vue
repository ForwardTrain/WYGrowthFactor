<template>
  <div class="imageTextAdd-add">
    <div class="prompt-type">
      <div></div>
      <p>{{$route.query.look ? '查看' : $route.query.id ? '编辑' : '新增'}}</p>
    </div>

    <div class="operation-btn">
      <div class="operation-btn-left">
        
      </div>
      <div>
        <el-button class="margin-L" type="primary" @click="add(5)" v-if="!$route.query.look">保存</el-button>
        <!-- <el-button class="margin-L" type="primary" @click="add(6)" v-if="!$route.query.look">提交</el-button> -->
        <el-button class="margin-L" type="info" @click="emptyData">取消</el-button>
      </div>
    </div>

    <div class="content-box">
      <div class="content-left">
        <p style="font-weight: 600;margin: 15px 0;">基本信息</p>

        <div class="left-top">
          <div>
            <div class="line-box">
              <p><span>*</span>栏目选择：</p>
              <el-select v-model="addData.item_id" :disabled="$route.query.look" placeholder=" " style="width: 240px">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>

            <div class="line-box">
              <p><span>*</span>标题名称：</p>
              <el-input style="width: 240px;" :disabled="$route.query.look" v-model="addData.name" placeholder=" " />
            </div>
            <div class="line-box">
              <p>来源：</p>
              <el-input style="width: 140px;" :disabled="$route.query.look" v-model="addData.source" placeholder=" " />
              <p>来源地址：</p>
              <el-input style="width: 180px;" :disabled="$route.query.look" v-model="addData.source_url" placeholder=" " />
            </div>

            <div class="line-box line-box">
              <p >热文推荐：</p>
              <div>
                <el-radio-group style="width: 180px" :disabled="$route.query.look" v-model="addData.is_push" class="ml-4">
                  <el-radio label="1" size="large">是</el-radio>
                  <el-radio label="2" size="large">否</el-radio>
                </el-radio-group>
              </div>
            </div>

            <div class="line-box line-box2">
              <p><span>*</span>封面图片：</p>
              <div>
                <el-upload
                  :headers="{
                    Authorization: Authorization,
                  }"
                  
                  :action="actionUrl"
                  :disabled="$route.query.look"
                  :auto-upload="false"
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-change="onSuccess">
                  <img v-if="addData.img" style="width: 101px; height: 101px;" :src="addData.img" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </div>
            </div>

            <div class="line-box line-box">
              <p >发布时间：</p>
              <div>
                <el-radio-group style="width: 300px" :disabled="$route.query.look"  v-model="addData.publish_type" class="ml-4">
                  <el-radio label="1" size="large">手动发布</el-radio>
                  <el-radio label="2" size="large">直接发布</el-radio>
                  <el-radio label="3" size="large">定时发布</el-radio>
                </el-radio-group>
                <el-date-picker
                  :disabled="$route.query.look"
                  v-if="addData.publish_type == 3"
                  v-model="addData.publish_time"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  placeholder=" "
                />
              </div>
            </div>

            <div class="line-box line-box2">
              <p >内容概述：</p>
              <div>
                <el-input
                :disabled="$route.query.look"
                  v-model="addData.brief"
                  style="width: 240px"
                  :autosize="{ minRows: 5, maxRows: 20 }"
                  type="textarea"
                  placeholder=" "
                />
              </div>
            </div>

            <div class="line-box line-box2 updata-box">
              <p >附件上传：</p>
                <div>
                  <el-upload
                    :headers="{
                      Authorization: Authorization,
                    }"
                    :disabled="$route.query.look"
                    ref="upload"
                    :auto-upload="false"
                    :on-change="onSuccess2"
                    style="width: 240px"
                    :action="actionUrl"
                    class="avatar-uploader"
                    :show-file-list="false"
                    >
                    <el-button class="margin-L" type="primary" v-if="!$route.query.look" >点击上传</el-button>  
                  </el-upload>
                  <div>
                    <div v-for="(item, index) in addData.file_list" :key="index" class="file-name">{{item.name}} <el-icon v-if="!$route.query.look" @click="deleteFile(index)" class="delete-icon"><CircleClose /></el-icon></div>
                  </div>
                </div>
                <!-- <el-upload
                    class="upload-demo"
                    multiple
                    ref="upload"
                    disabled
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="onSuccess2">
                  <el-button class="margin-L" type="primary" >点击上传</el-button>  
                </el-upload> -->
                
              </div>
            
          </div>

        </div>

    
      </div>

      <div class="content-right">
        <p style="font-weight: 800;margin: 15px 0;">内容编辑</p>
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

      <div v-if="false">
        <p style="font-weight: 600;margin: 15px 0;">操作状态</p>
        <div>
          <el-timeline style="max-width: 600px">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              color="#427BFB"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        
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
  sel_qiniu_token,
  Contentadd_upd_list,
  Contentsel_list,
  Contentsel_list_details,
  Itemsel_list
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

      activities: [
        {
          content: 'Event start',
          timestamp: '2018-04-15',
        },
        {
          content: 'Approved',
          timestamp: '2018-04-13',
        },
        {
          content: 'Success',
          timestamp: '2018-04-11',
        },],

      diasex: '1',
      nowTime: '',
      desc: '',

      tableList: [],
      url: '',
      addData: {
        brief: '',
        content: '',
        file_list: [],
        id: '',
        img: '',
        is_push: '1',
        item_id: '',
        name: '',
        publish_time: '',
        publish_type: '1',
        source: '',
        source_url: '',
        status: '',
        type: 1,
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

    this.getsel_qiniu_token()

    this.getContentsel_list()

    if(this.$route.query.id) {
      this.getContentsel_list_details()
      setTimeout(() => {
        var contentBox = document.getElementsByClassName('ql-editor')
        for(var i=0; i<contentBox.length; i++) {
          contentBox[i].setAttribute("contenteditable", false);
        }
      }, 100)
    }
  },
  methods: {
    getContentsel_list() {
      Itemsel_list({
        type:1,
      }).then((res) => {
        this.options = res.data.list
      })
    },
    /**
     * 获取详情
     */
    getContentsel_list_details() {
      Contentsel_list_details({id: this.$route.query.id}).then((res) => {
       
        this.showEditor = false
        this.desc = res.data.content
        setTimeout(() => {
          this.showEditor = true
        } ,100)
        
        this.addData = res.data
        // this.addData.img = res.data.img
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
     * 删除文件
     */
    deleteFile(index) {
      this.$ElMessageBox.confirm(
        '确认删除此附件？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
       this.addData.file_list.splice(index, 1)
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
            _this.addData.img = `http://fileotheryz.hzyzcloud.com/${res.key}`
             
          }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },

    onSuccess2(uploadFile) {
      const observable =  qiniu.upload(uploadFile.raw, `${Date.now()}${uploadFile.name}`, this.qnToken)
      const observer = {
        next(res){
          
        },
        error(err){
          // ...
        },
        complete(res){
          setTimeout(() => {
            _this.addData.file_list.push({
              url: `http://fileotheryz.hzyzcloud.com/${res.key}`,
              name: uploadFile.name,
            })
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
      // this.$router.go(-1)
      this.$router.push({
        path: '/graphicManagement',
        query: {
          page: 2,
        }
      })
    },
    /**
     * 保存
     */
    add(status) {
      if(!this.addData.name || !this.addData.item_id || !this.addData.img) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      var someElement = document.getElementById(`quillEditors${this.nowTime}`);
      var someElementToString = someElement.outerHTML;
      this.addData.content = someElementToString
      this.addData.status = status
      this.addData.id = this.$route.query.id
      Contentadd_upd_list(this.addData).then((res) => {
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
  .updata-box {
    ::v-deep(.avatar-uploader .el-upload) {
      border: none !important;
    }
  }
  .file-name {
    margin-top: 15px;
    display: flex;
    align-items: center;
    .delete-icon {
      cursor: pointer;
      margin-left: 10px;
    }

  }
  .imageTextAdd-add {
    padding: 12px;
    .content-box {
      display: flex;
      .content-left {
        // width: 800px;
        margin-right: 30px;
        
      }
      .content-right {
        margin-right: 30px;
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
