<template>
  <div class="banner-list">
    <div class="top-linebox">
      <div class="prompt-type">
        <div></div>
        <p>新增</p>
      </div>

      <div class="btn-content">
        <el-button @click="getbanner_sel_detail">取消</el-button>
        <el-button type="primary" v-show="!$route.query.look" @click="opstbanner_upd">保存</el-button>
      </div>
    </div>

    <div class="line-box">
      <p class="title-1">{{bannerData.name}}<span>图片大小建议：1920*602px，jpg格式</span></p>

      <div class="line-bottom">
        <div>
          <el-button class="margin-L" type="primary"   @click="addList">添加</el-button>
          <div style="margin: 35px 0;">
            轮播时间：<el-input v-model="bannerData.time_lag" style="width: 80px;margin: 0 10px;"  placeholder=" " />秒
          </div>
          <p>跳转地址：</p>
        </div>

        <div class="img-box">
          <div v-for="(item, index) in bannerData.details" :key="index" style="margin: 0 12px;" class="img-line">
            <div>
              <div>
                <el-upload
                  :headers="{
                    Authorization: Authorization,
                  }"
                  class="avatar-uploader"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="(uploadFile) => onSuccess(index,uploadFile)">
                  <img v-if="item.path" :src="item.path" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </div>
              
              <el-input v-model="item.url" style="width: 350px;margin-top: 17px;"  placeholder=" " />
            </div>

            <p @click="deleteBanner(index)">删除</p>
          </div>
        </div>
      </div>
    </div>


    <div class="line-box" v-if="false">
      <p class="title-1">浏览页<span>图片大小建议：1920*602px，jpg格式</span></p>

      <div class="line-bottom">
        <div>
          <el-button class="margin-L" type="primary"   @click="addList">添加</el-button>
          <div style="margin: 35px 0;">
            轮播时间：<el-input v-model="draName" style="width: 80px;margin: 0 10px;"  placeholder=" " />秒
          </div>
          <p>跳转地址：</p>
        </div>

        <div v-for="(item, index) in 5" :key="index" style="margin: 0 12px;" class="img-line">
          <div>
            <div>
              <el-upload
                :headers="{
                  Authorization: Authorization,
                }"
                class="avatar-uploader"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="onSuccess">
                <img v-if="addData.sel_picture_url" :src="addData.sel_picture_url" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
            
            <el-input v-model="draName" style="width: 350px;margin-top: 17px;"  placeholder=" " />
          </div>

          <p>删除</p>
        </div>
      </div>
    </div>

    <div class="line-box" v-if="false">
      <p class="title-1">热门更多<span>图片大小建议：1920*602px，jpg格式</span></p>

      <div class="line-bottom">
        <div>
          <el-button class="margin-L" type="primary"   @click="addList">添加</el-button>
          <div style="margin: 35px 0;">
            轮播时间：<el-input v-model="draName" style="width: 80px;margin: 0 10px;"  placeholder=" " />秒
          </div>
          <p>跳转地址：</p>
        </div>

        <div v-for="(item, index) in 5" :key="index" style="margin: 0 12px;" class="img-line">
          <div>
            <div>
              <el-upload
                :headers="{
                  Authorization: Authorization,
                }"
                class="avatar-uploader"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="onSuccess">
                <img v-if="addData.sel_picture_url" :src="addData.sel_picture_url" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
            
            <el-input v-model="draName" style="width: 350px;margin-top: 17px;"  placeholder=" " />
          </div>

          <p>删除</p>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import {
  sel_qiniu_token,
  banner_sel_detail,
  banner_upd
} from '@/api/common'

let _this = null
import * as qiniu from 'qiniu-js'

export default {
  data () {
    return {
      draName: '',
      qnToken: '',
      Authorization: '',
      actionUrl: '',
      addData: {
        sel_picture_url: '',
      },

      bannerData: {}
    }
  },
  mounted() {
    _this = this
  
    this.Authorization = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token

    this.getbanner_sel_detail()

    this.getsel_qiniu_token()
  },
  methods: {
    getsel_qiniu_token() {
      sel_qiniu_token({}).then((res) => {
        this.qnToken = res
      })
    },
    /**
     * banner详情
     */
    getbanner_sel_detail() {
      banner_sel_detail({}).then((res) => {
        this.bannerData = res.data
      })
    },
    /**
     * 更新
     */
    opstbanner_upd() {
      banner_upd(this.bannerData).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      })
    },
    /**
     * 新增bannner
     */
    addList() {
      this.bannerData.details.push({
        path: '',
        url: '',
      })
    },
    /**
     * 删除banner
     */
    deleteBanner(index) {
      this.$ElMessageBox.confirm(
        '确认删除此数据',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.bannerData.details.splice(index, 1)
      })
      
    },
    /**
     * 上传
     */
    onSuccess(index, uploadFile) {
      // console.log(index, uploadFile, 3333)
      const observable =  qiniu.upload(uploadFile.raw, `${Date.now()}${uploadFile.name}`, this.qnToken)
      const observer = {
        next(res){
          
        },
        error(err){
          // ...
        },
        complete(res){
          setTimeout(() => {
              _this.bannerData.details[index].path = `http://fileotheryz.hzyzcloud.com/${res.key}`
            }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },
  },
}
</script>

<style scoped lang='scss'>
.top-linebox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
  .banner-list {
    padding: 12px;
    .line-box {
      padding: 12px 0;
      border-bottom: 1px solid #EBEEF5;
    }
    .img-box {
      display: flex;
      flex-wrap: wrap;
      >div {
        margin-bottom: 15px !important;
      }
    }
    .img-line {
      display: flex;
      align-items: flex-end;
      white-space: nowrap;
      >p {
        margin-bottom: 7px;
        cursor: pointer;
        color: #F64334;
        margin-left: 10px;

      }
    }
    .title-1 {
      span {
        font-size: 12px;
        color: #909399;
        margin-left: 12px;
      }
    }
    ::v-deep(.el-upload) {
      width: 350px;
      height: 110px;
      background: #FFFFFF;
      border-radius: 4px;
    }
    .line-bottom {
      margin-top: 15px;
      display: flex;
      >:nth-child(1) {
        min-width: 200px;
      }

    }
  }
</style>
