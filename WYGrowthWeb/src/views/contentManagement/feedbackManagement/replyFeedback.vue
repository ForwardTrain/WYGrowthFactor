<template>
  <div class="replyFeedback-box">
    <div class="prompt-type">
      <div></div>
      <p>回复反馈</p>
    </div>

    <div class="content-box">
      <div class="content-left">
        <div class="top-box">
          <p class="title-1">个人信息</p>
          <!-- <div>
            <el-button class="margin-L" type="primary" >提交</el-button>
            <el-button class="margin-L" type="info" @click="emptyData">取消</el-button>
          </div> -->
        </div>

        <div>
          <div class="line-box">
            <div class="line-box">
              <p><span>*</span>姓名/账号：</p>
              <div style="width: 150px;">{{dataInfo.support.name}}</div>
              <!-- <el-input style="width: 180px;" disabled v-model="dataInfo.support.name" placeholder=" " /> -->
            </div>
            <div class="line-box">
              <p><span>*</span>性别：</p>
              <div>{{dataInfo.support.sex == 1 ? '男' : '女'}}</div>
              <!-- <el-radio-group style="width: 150px" disabled  v-model="dataInfo.support.sex" class="ml-4">
                <el-radio label="1" size="large">男</el-radio>
                <el-radio label="2" size="large">女</el-radio>
              </el-radio-group> -->
            </div>
          </div>
          <div class="line-box">
            <div class="line-box">
              <p><span>*</span>联系方式：</p>
              <div style="width: 150px;">{{dataInfo.support.tel}}</div>
              <!-- <el-input style="width: 180px;" disabled v-model="dataInfo.support.tel" placeholder=" " /> -->
            </div>
            <div class="line-box">
              <p>电子邮箱：</p>
              <div>{{dataInfo.support.email}}</div>
              <!-- <el-input style="width: 180px;" disabled v-model="dataInfo.support.email" placeholder=" " /> -->
            </div>
          </div>
          <div class="line-box">
            <p><span>*</span>类型：</p>
            <div>{{dataInfo.support.type == 1 ? '咨询' : dataInfo.support.type == 2 ? '建议' : dataInfo.support.type == 3 ? '投诉' : dataInfo.support.type == 4 ? '其他' : '-'}}</div>
            <!-- <el-radio-group style="width: 300px" disabled v-model="dataInfo.support.type" class="ml-4">
              <el-radio label="1" size="large">咨询</el-radio>
              <el-radio label="2" size="large">建议</el-radio>
              <el-radio label="3" size="large">投诉</el-radio>
              <el-radio label="4" size="large">其他</el-radio>
            </el-radio-group> -->
          </div>

        </div>

        <p class="title-1">反馈信息</p>
        <div class="line-box">
          <p>反馈标题：</p>
          <!-- <el-input style="width: 180px;" disabled v-model="dataInfo.support.title" placeholder=" " /> -->
          <div>{{dataInfo.support.title}}</div>
        </div>
        <div class="line-box line-box2">
          <p>反馈内容：</p>
          <div class="activity-content" v-if="showEditor">
            <div v-html="desc">

            </div>
            <!-- <quill-editor content-type="html" 
                          enable
                          disabled
                          :options="editorOption" 
                          style="min-height: 500px;" 
                          ref="myQuillEditor"
                          :id="`quillEditors${this.nowTime}`"
                          :content="desc" /> -->
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="top-box">
          <p class="title-1">回复信息</p>
          <div>
            <el-button class="margin-L" type="primary" @click="add(2)">发布</el-button>
            <el-button class="margin-L" type="primary" @click="add(1)">保存</el-button>
            <el-button class="margin-L" type="info" @click="emptyData">取消</el-button>
          </div>
        </div>
        <div class="line-box">
          <p>简介名称：</p>
          <el-input style="width: 180px;" v-model="dataInfo.report.name" placeholder=" " />
        </div>
        <div class="line-box line-box2">
          <p>文章内容：</p>
          <div class="activity-content" v-if="showEditor">
            <div v-if="$route.query.look == 1" v-html="desc2"></div>
            <quill-editor content-type="html" 
                          enable
                          v-else
                          :options="editorOption" 
                          style="min-height: 500px;" 
                          ref="myQuillEditor"
                          :id="`quillEditors${this.nowTime}`"
                          :content="desc2" />
          </div>
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

import { 
  sel_support_list_details,
  add_upd_report
} from '@/api/common'

export default {
  
  data () {
    return {
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
      showEditor: true,
      nowTime: '',
      desc: '',

      desc2: '',

      dataInfo: {
        report: {},
        support: {

        },
      }
    }
  },
  mounted() {
    this.nowTime = Date.now()
    this.getsel_support_list_details()
    
  },
  methods: {
    add(type) {
      var someElement = document.getElementById(`quillEditors${this.nowTime}`);
      var someElementToString = someElement.outerHTML;
      add_upd_report({
        content: someElementToString,
        id: this.$route.query.id,
        name: this.dataInfo.report.name,
        p_id: this.dataInfo.report.id,
        status: type
      }).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.emptyData()
        }
      })
    },
    /**
     * 返回
     */
    emptyData() {
      this.$router.go(-1)
    },
    /**
     * 详情
     */
    getsel_support_list_details() {
      sel_support_list_details({
        id: this.$route.query.id
      }).then((res) => {
        this.showEditor = false
        this.dataInfo = res.data
        setTimeout(() => {
          this.desc =  res.data.support.content
          this.desc2 =  res.data.report.content
          this.showEditor = true
        }, 100)

        if(this.$route.query.id && this.$route.query.look == 1) {
          setTimeout(() => {
            var contentBox = document.getElementsByClassName('ql-editor')
            for(var i=0; i<contentBox.length; i++) {
              contentBox[i].setAttribute("contenteditable", false);
            }
          }, 300)
        }
      })
    },
  },
}
</script>

<style scoped lang='scss'>
::v-deep(.is-disabled) {
  .el-input__inner {
    color: #000 !important;
  }
  .el-radio__inner {
    color: #000 !important;
  }
  
}
  .replyFeedback-box {
    padding: 12px;
    .activity-content {
      width: 475px;
      height: 560px;
    }
    .content-box {
      margin-top: 15px;
      display: flex;
      .title-1 {
        font-weight: 500;
        font-size: 16px;
      }
      >div {
        width: 50%;
      }
      .top-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .content-left {
        padding-right: 100px; 
        border-right: 1px solid #EBEEF5;
      }
      .content-right {
        padding: 0 30px;
      }
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
  }
</style>
