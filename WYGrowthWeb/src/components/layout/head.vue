<template>
  <div class="system-head">
    <div class="head-top">
      <div @click="gohome">
        <img class="img" :src="sysInfo.logo" alt="">
        <p>{{sysInfo.sys_name}}</p>
      </div>
      <div>
        <!-- <el-select v-model="value" class="m-2" @change="changeGo" placeholder="友情链接" style="margin-right: 20px;">
          <el-option
            v-for="item in options"
            :key="item.address"
            :label="item.name"
            :value="item.address"
          />
        </el-select> -->

        <img class="img" v-if="logo" :src="logo" alt="">
        <p>{{userName}}</p>
        <p @click="outLogin" class="out-p">退出登录</p>
      </div>
    </div>
  </div>
</template>

<script>


import { 
  SysBussel_sys_business
} from '@/api/common'
export default {
  watch: {
    '$store.state.friendlyLink': {
      handler(val) {
        this.getsel_sys_business()
      }
    },

    
  },
  data () {
    return {
      userName: '',
      logo: '',

      sysInfo: {},
      
      value: '',
      options: []

    }
  },
  mounted() {
    if(localStorage.getItem('ACCOUNT_DETAIL')) {
      this.userName = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).name
      this.logo = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).logo
    }

    if(localStorage.getItem('sysInfo')) {
      this.sysInfo = JSON.parse(localStorage.getItem('sysInfo'))
    }

  },
  methods: {
    /**
     * 
     */
    gohome() {
      window.open('/home')
    },

    
    /**
     * 退出
     */
    outLogin() {
      this.$ElMessageBox.confirm(
        '确认退出该系统？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      )
        .then(() => {
          this.$router.push({
            path: '/login'
          })
          localStorage.clear()
        })
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: 'Delete canceled',
          // })
        })
    }
  },
}
</script>

<style scoped lang='scss'>
  .system-head {
    ::v-deep(.el-input__wrapper) {
      background-color: rgba(0,0,0,0);

      .el-input__inner::placeholder {
        color: #fff;
      }
      .el-select__icon {
        color: #fff;
      }
    }
    .head-top {
      height: 60px;
      background: #1990FF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      >:nth-child(1) {
        cursor: pointer;
      }
      >div {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          margin-right: 12px;
        }
        color: #fff;
      }
      .out-p {
        padding-left: 12px;
        border-left: 1px solid #fff;
        margin-left: 12px;
        cursor: pointer;

      }
    }
    
  }
</style>
