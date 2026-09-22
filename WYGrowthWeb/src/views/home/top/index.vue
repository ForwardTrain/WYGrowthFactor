<template>
  <div>
    <div class="mune-box">
        <div class="logo-icon" @click="goRouter('/home')">
          <img class="icon-img" :src="sysInfo.logo" alt="">
          <p>{{sysInfo.sys_name}}</p>
        </div>
        <div>
          <div class="el-dropdown-link" @click="goRouter('/home')">Home</div>
          <!-- <div class="el-dropdown-link" @click="goRouter('/advancedSearchList')">Browse</div> -->

          <el-dropdown  class="select">
            <span class="el-dropdown-link line-Browse">
              Browse
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <div>
                  <el-dropdown-item @click="goRouter('/advancedSearchList', '1')">
                    <div class="el-dropdown-link" >By Family</div>
                  </el-dropdown-item>
                  <el-dropdown-item @click="goRouter('/advancedSearchList', '2')">
                    <div class="el-dropdown-link" >By Ligand</div>
                  </el-dropdown-item>
                  <el-dropdown-item @click="goRouter('/advancedSearchList', '3')">
                    <div class="el-dropdown-link" >By Receptor</div>
                  </el-dropdown-item>
                   <el-dropdown-item @click="goRouter('/advancedSearchList', '4')">
                    <div class="el-dropdown-link" >By Organism</div>
                  </el-dropdown-item>
                  <el-dropdown-item @click="goRouter('/advancedSearchList', '5')">
                    <div class="el-dropdown-link" >By All</div>
                  </el-dropdown-item>
                </div>
                
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          
          <div class="el-dropdown-link" @click="goRouter('/clinical')">Clinical Research</div>

          
          
          <!-- <div class="el-dropdown-link" @click="goRouter('/Docu')">Docu</div> -->
          
          <!-- <div class="el-dropdown-link" @click="goRouter('/tools')"></div> -->
          
          
          <div class="el-dropdown-link" @click="goRouter('/lens')">Patent</div>

          <div class="el-dropdown-link" @click="goRouter('/Drug')">Drug</div>

          <el-dropdown  class="select">
            <span class="el-dropdown-link line-Browse">
              Tools
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <div>
                  <el-dropdown-item @click="goRouter2('/tools', '1')">
                    <div class="el-dropdown-link" >Run Blast</div>
                  </el-dropdown-item>
                  <el-dropdown-item @click="goRouter2('/tools', '2')">
                    <div class="el-dropdown-link" >Run Align</div>
                  </el-dropdown-item>

                  <el-dropdown-item >
                    <div class="el-dropdown-link" >Run Alphafold</div>
                  </el-dropdown-item>
                  <el-dropdown-item >
                    <div class="el-dropdown-link" >Run HawkDock</div>
                  </el-dropdown-item>
                </div>
                
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <div class="el-dropdown-link" @click="goRouter('/helpList')">Help</div>
          <div class="el-dropdown-link" @click="goRouter('/feedbackAdd')">Feedback</div>
          <div class="el-dropdown-link" @click="goRouter('/AboutUs')">About Us</div>

          
          <!-- <el-dropdown>
            <span class="el-dropdown-link">
              Dropdown List
             
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown>
            <span class="el-dropdown-link">
              Dropdown List
          
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>

        <div class="login-btn" @click="goRouter('/login')">
          Log in
          <img class="top-img" src="@/assets/images/login-icon.png" alt="">
        </div>
        <!-- <div>
          IP：{{HomeBasicInfo.ip}}
        </div> -->
      </div>
  </div>
</template>

<script>
import {
  sys_info
} from '@/api/common'

export default {
  data () {
    return {
      showArrow: '',
      sysInfo: {},
      HomeBasicInfo: {}
    }
  },
  mounted() {
    if(!localStorage.getItem('sysInfo')) {
      this.getsys_info()
    }
    if(localStorage.getItem('sysInfo')) {
      this.sysInfo = JSON.parse(localStorage.getItem('sysInfo'))
    }
    if(localStorage.getItem('HomeBasicInfo')) {
      this.HomeBasicInfo = JSON.parse(localStorage.getItem('HomeBasicInfo'))
    }
  },
  methods: {
    /**
     * 获取信息
     */
    getsys_info() {
      sys_info({}).then((res) => {
        localStorage.setItem('sysInfo', JSON.stringify(res.data))
      })
    },
    goRouter2(url, type) {
      this.$router.push({
        path: url,
        query: {
          type: type
        }
      })
    },
    /**
     * 页面跳转
     */
    goRouter(url, type) {
      if(type == '') {
        this.$store.commit("setRouteType")
      }
      this.$router.push({
        path: url,
        query: {
          type2: type
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
.line-Browse {
  display: flex;
  align-items: center;
}

::v-deep(.el-tooltip__trigger) {
  .el-icon--right {
    transition: all 0.2s ease;
  }
}
::v-deep(.el-tooltip__trigger)[aria-describedby] {
  .el-dropdown-link .el-icon {
    transform: rotate(180deg);
  }
}

  .mune-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    height: 70px;
    background: rgba(9,62,102,1);
    .logo-icon {
      cursor: pointer;
    }
    .login-btn {
      width: 92px;
      height: 34px;
      cursor: pointer;
      border-radius: 17px;
      border: 1px solid #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 15px;
        margin-left: 5px;
      }
    }
    >div {
      display: flex;
      align-items: center;
      white-space: nowrap;
      >div {
        // border: 1px solid red;
        white-space: nowrap;
      }
    }
    .icon-img {
      width: 54px;
      height: 54px;
      border-radius: 8px;
      margin-right: 18px;
    }
    .el-dropdown-link {
      color: #fff;
      cursor: pointer;
      margin-right: 20px;
      font-weight: 500;
      font-size: 17px;
    }
    color: #fff;
      >:nth-child(1) {
      p {
        font-weight: 500;
        font-size: 24px;
      }
    }
  }
</style>
