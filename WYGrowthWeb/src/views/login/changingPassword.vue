<template>
  <div class="login-box">
    <!-- <img class="img" src="@/assets/images/Group.png" alt=""> -->


    <div class="login-content">
      <div class="title">修改密码</div>

      <div class="line-box">
        <p>新密码</p>
        <el-input type="password" v-model="psd" placeholder="请输入密码" />
        <p class="prompt" :style="showError1 ? 'color:#FF3D3D;'  : 'color: #666'">密码不符合要求：数字+字母8位以上，字母不区分大小写</p>
      </div>

      <div class="line-box">
        <p>确认密码</p>
        <el-input type="password" v-model="re_psd" placeholder="请输入密码" />
        <p class="prompt" v-if="showError2">两次密码不一致，请重新输入</p>
      </div>

      <div class="login-btn" @click="change">确定</div>
    </div>

  </div>
</template>

<script>

import { 
  changePsd
} from '@/api/common'

export default {
  data () {
    return {
      showError1: false,
      showError2: false,
      psd: '',
      re_psd: '',
    }
  },
  mounted() {
    
  },
  methods: {
    /**
     * 修改密码
     */
    change() {
      if(this.psd != this.re_psd) {
        this.showError2 = true
        return
      } else {
        this.showError2 = false
      }
      
      var uPattern = /^[0-9a-zA-Z_]{8,}$/;
      if(!uPattern.test(this.psd) || !uPattern.test(this.re_psd) ) {
        this.showError1 = true
        return
      } else {
        this.showError1 = false
      }
      
      changePsd({
        psd: this.psd,
        re_psd: this.re_psd
      }).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            duration: 2000,
            message: '修改成功'
          })
          this.$router.go(-1)
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
    >img {
      position: absolute;
      top: 0px;
      left: 0px;
    }
    .login-content {
      width: 516px;
      height: 540px;
      background: #FFFFFF;
      border-radius: 15px;
      border: 1px solid #f5f5f5;
      .title {
        font-size: 24px;
        font-weight: 600;
        padding: 38px 0;
        margin: 0 28px;
        border-bottom: 1px solid #EBEEF5;
      }
      .line-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
        position: relative;
        >p {
          width: 60px;
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
      }
      .login-btn {
        width: 376px;
        height: 50px;
        background: #6A9EFF;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        line-height: 50px;
        margin: 0 auto;
        margin-top: 83px;
        cursor: pointer;
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
  }
</style>
