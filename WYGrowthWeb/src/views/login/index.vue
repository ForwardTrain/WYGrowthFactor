<template>
  <div class="login-box">
    <div class="img"></div>
    <div class="background-box">
      <div class="login-content" v-if="type == 1">
        <div class="title">
          <img :src="sysData.logo" alt="">
          {{sysData.sys_name}}
        </div>

        <div class="line-box">
          <p>账号</p>
          <el-input v-model="user_name"  @keyup.enter="goLogin()" placeholder="请输入账号" />
        </div>

        <div class="line-box">
          <p>密码</p>
          <el-input v-model="psd"  @keyup.enter="goLogin()" type="password" placeholder="请输入密码" />
        </div>
        <!-- <div class="agree-conteng">
          <el-checkbox v-model="checked1" label="" size="large" />
          <p class="agree-p">我已阅读并同意 <span @click="openMess(1)">《用户协议》</span>和<span  @click="openMess(2)">《隐私政策》</span></p>
        </div> -->

        <div class="login-btn" @click="goLogin">登录</div>
        
        <!-- <p class="forget-password" @click="goForget">忘记密码</p> -->
        
      </div>

      <div class="login-content" v-if="type == 3">
        <div class="title">忘记密码</div>

        <div class="line-box">
          <p>用户账号</p>
          <el-input v-model="tel" placeholder="请输入用户账号" />
        </div>

        <div class="line-box line-box2">
          <p>验证码</p>
          <el-input v-model="code" placeholder="请输入验证码" />
          <p v-if="time == 60" class="verification-code" @click="getCode">获取验证码</p>
          <p v-else style="color: #666666;">{{time}}s</p>
        </div>

        <div class="line-box">
          <p>用户密码</p>
          <el-input v-model="newPsd" type="password" placeholder="请输入用户密码" />
          
        </div>
        <div class="login-btn login-btn2" @click="sentForgetPsd">确定</div>
      </div>
    </div>
  </div>
</template>

<script>

import { 
  login,
  // userList,
  SysMenuAllMenu,
  sys_info,
  
} from '@/api/common'

export default {
  data () {
    return {
      checked1: false,
      user_name: '',
      psd: '',
      type: 1,
      tel: '',
      time: 60,
      timeFun: null,
      code: '',
      newPsd: '',
      needCode: '',

      systemInfoName: '',
      login_title: '',
      systemInfoIcon: '',
      sysData: {}
    }
  },
  mounted() {
    this.getsys_info()
  },
  methods: {
    /**
     * 获取信息
     */
    getsys_info() {
      sys_info({}).then((res) => {
        this.sysData = res.data
        localStorage.setItem('sysInfo', JSON.stringify(res.data))
      })
    },
    /**
     * 前往忘记密码
     */
    goForget() {
      this.type = 3
      this.code = ''
      this.newPsd = ''
      this.needCode = ''
      this.tel = ''
    },
    /**
     * 登录
     */
    goLogin() {
      if(!this.user_name) {
        this.$message({
          type: 'warning',
          duration: 2000,
          message: '请输入账号'
        })
        return
      } else if(!this.psd) {
        this.$message({
          type: 'warning',
          duration: 2000,
          message: '请输入密码'
        })
        return
      }
      // if(!this.checked1) {
      //   this.$message({
      //     type: 'warning',
      //     duration: 2000,
      //     message: '请阅读并同意'
      //   })
      //   return
      // }
      login({
        user_name: this.user_name,
        psd: this.psd
      }).then((res) => {
        if(res.code == 1) {
          localStorage.setItem('ACCOUNT_DETAIL', JSON.stringify(res.data))
          // this.getUserList()
          // let url = ''
          this.$router.push({
            path: '/dataStatistics',
          })
          // userList({}).then((res) => {
          //   localStorage.setItem('menuList', JSON.stringify(res.data.children))
          //   if(res.data.children.length) {
          //     res.data.children.forEach((item) => {
          //       if(item.children && item.children.length) {
          //         item.children.forEach((item2) => {
          //           if(!url && item2.absolute_url) {
          //             url = item2.absolute_url
          //           }
          //         })
          //       }
          //     })
          //   }
          //   setTimeout(() => {
          //     this.$router.push({
          //       path: url,
          //     })
          //   }, 100)
          // })
        }
      })
    },
    /**
     * 获取菜单
     */
    getUserList() {
      userList({}).then((res) => {
        if(res.code == 1) {
          localStorage.setItem('MENU_LIST', JSON.stringify(res.data))
          localStorage.setItem('menuIndex', '0-0')
          this.$router.push({
            path: '/bannerList',
          })
        }
      })
    },
    /**
     * 获取验证码
     */
    getCode() {
      if(!this.tel) {
        this.$message({
          type: 'warning',
          duration: 2000,
          message: '请输入账号'
        })
        return
      }
      getSms({
        tel: this.tel
      }).then((res) => {
        if(res.code == 1) {
          this.needCode = res.data.code
          this.$message({
            type: 'success',
            message: '发送成功'
          })
          this.timeFun = setInterval(() => {
            this.time -= 1
            if(this.time == 0) {
              window.clearTimeout(this.timeFun)
              this.time = 60
            }
          }, 1000)
        }
      })
    },
    /**
     * 忘记密码
     */
    sentForgetPsd() {
      if(this.needCode != this.code) {
        this.$message({
          type: 'warning',
          duration: 2000,
          message: '验证码错误'
        })
        return
      }
      forgetPsd({
        tel: this.tel,
        psd: this.newPsd,
      }).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.type = 1
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .login-box {
    height: 100vh;
    // background: url('@/assets/images/login-bg.png');
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .background-box {
      width: 591px;
      height: 646px;
      // background: rgba(216,216,216, 0.04);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ::v-deep(.el-input__wrapper) {
      border-radius: 16px;
    }
    .agree-conteng {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .img {
      position: absolute;
      z-index: -1;
      background: url('@/assets/images/bg@2x.png') no-repeat;
      background-size: 100% 100%;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .login-content {
      width: 516px;
      height: 540px;
      background: #FFFFFF;
      border-radius: 15px;
      border: 1px solid rgba(216,216,216, 0.3);
      .title {
        font-size: 24px;
        font-weight: 600;
        padding: 38px 0;
        margin: 0 28px;
        border-bottom: 1px solid #EBEEF5;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          margin-right: 12px;
        }
      }
      .line-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
        position: relative;
        >p {
          // width: 60px;
          text-align: right;
          margin-right: 15px;
        }
        ::v-deep(.el-input) {
          width: 319px;
          height: 50px;
        }
        .prompt {
          position: absolute;
          color: #FF3D3D;
          width: 310px;
          font-size: 12px;
          top: 52px;
          text-align: left;
          left: 130px;
        }
      }
      .line-box2 {
        .verification-code {
          width: 77px;
          color: #2268FB;
          cursor: pointer;
        }
        ::v-deep(.el-input) {
          width: 228px;
        }
        >:nth-child(3) {
          width: 77px;
        }
      }
      .login-btn {
        width: 376px;
        height: 50px;
        background: #0F8CFF;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        line-height: 50px;
        margin: 0 auto;
        margin-top: 83px;
        cursor: pointer;
        border-radius: 16px;
      }
      
      .login-btn2 {
        margin-top: 43px;
      }
      .forget-password {
        color: #2268FB;
        margin-top: 12px;
        
        cursor: pointer;
      }
    }
    .agree-p {
      // margin-top: 5px;
      margin-left: 9px;
      color: #CCCCCC;
      span {
        cursor: pointer;
        color: #0F8CFF;
      }
    }
  }
</style>
