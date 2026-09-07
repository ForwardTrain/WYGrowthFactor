<template>
  <div class="agreement-list-edit">
    <div class="prompt-type">
      <div></div>
      <p>{{$route.query.type == 1 ? '隐私政策' : '用户协议'}}</p>
    </div>


    <div class="content-box2">
     <div v-if="showEditor" class="quill-editor-box">
        <div v-html="desc" style="height: calc(100vh - 320px);" v-if="$route.query.look == 1"></div>
        <quill-editor content-type="html" 
                v-else
                enable
                :options="editorOption" 
                style="height: calc(100vh - 320px);" 
                ref="myQuillEditor"
                id="quillEditor"
                :content="desc" />
      </div>

    </div>

    <div class="btn-content">
      <el-button @click="goBalck">取消</el-button>
      <el-button type="primary" v-show="!$route.query.look" @click="postupd_sys_privacy_policy">保存</el-button>
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
  upd_sys_privacy_policy,
} from '@/api/common'

export default {
  data () {
    return {
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
    }
  },
  mounted() {
    if(localStorage.getItem('agreement')) {
      this.showEditor = false
      this.desc = JSON.parse(localStorage.getItem('agreement'))
      setTimeout(() => {
        this.showEditor = true
        

        if(this.$route.query.look) {
          setTimeout(() => {
            var contentBox = document.getElementsByClassName('ql-editor')
            for(var i=0; i<contentBox.length; i++) {
              contentBox[i].setAttribute("contenteditable", false);
            }
          }, 100)
        }
      }, 200)

      
    }
  },
  methods: {
    goBalck() {
      this.$router.go(-1)
    },
    /**
     * 保存
     */
    postupd_sys_privacy_policy() {
      var someElement = document.getElementById("quillEditor");
      var someElementToString = someElement.outerHTML;
      upd_sys_privacy_policy({
        id: this.$route.query.id,
        content: someElementToString
      }).then((res) => {  
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.goBalck()
        }
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .agreement-list-edit {
    padding: 15px;
    .content-box2 {
      width: 1000px;
      margin: 15px 0;
    }
    ::v-deep(#quillEditor) {
      width: 100% !important;
      overflow: auto;
      // overflow: auto;
      // max-height: calc(100vh - 330px) !important;
      // margin: 0px !important
    }
  }
</style>
