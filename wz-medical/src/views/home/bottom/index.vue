<template>
  <div class="page-bottom-box22">
      <goTop class="go-top"></goTop>
      <div class="content-box2">
        <div>
          <div class="info-box">
            <img class="icon-img" :src="sysInfo.logo" alt="">
            <div>
              <p>DRGF updated: {{PVData.count.last_update_day || '-'}}</p>
              <p>Version: {{PVData.count.version  || '-'}}   <span style="color: #2440b3;background: #fff;padding: 5px 10px;border-radius: 4px;" @click="goRouter2('/disclaimer')">disclaimer</span></p>
            </div>
          </div>

          
          <div class="bottom-middle-line">
            <p class="line-box"></p>
            <div>
              <p @click="goRouter('/home')">Home</p>
            </div>
            <div>
              <p>Browse</p>
              <p @click="goRouter3('/advancedSearchList', {type2:1})">By Famiy</p>
              <p @click="goRouter3('/advancedSearchList', {type2:2})">By Ligand</p>
              <p @click="goRouter3('/advancedSearchList', {type2:3})">By Receptor</p>
              <p @click="goRouter3('/advancedSearchList', {type2:4})">By Organism</p>
              <p @click="goRouter3('/advancedSearchList', {type2:5})">By All</p>
            </div>
            <div style="width: 106px;">
              <p @click="goRouter('/clinical')">Clinical Research</p>
              <!-- <p>By Family</p>
              <p>By Function</p>
              <p>By Disease</p>
              <p>By All</p> -->
            </div>
            <!-- <div>
              <p>Tools</p>
              <p>Blast</p>
              <p>Alignment</p>
              <p>Second structure prediction</p>
              <p>By Disease</p>
              <p>By All</p>
            </div> -->
            <div style="width: 20px;">
              <p @click="goRouter('/GeenMedical')">Patent</p>
              <!-- <p @click="goRouter('/GeenMedical')">Literature</p> -->
              <!-- <p @click="goRouter('/lens')">The Lens</p> -->
            </div>

            <div>
              <p >Tools</p>
              <p @click="goRouter3('/tools', {type:1})">Run Blast</p>
              <p @click="goRouter3('/tools', {type:2})">Run Align</p>

              <!-- <p>Run Alphafold</p>
              <p>Run HawkDock</p> -->
            </div>
            <!-- <div>
              <p>Statistics</p>
            </div> -->
            <div>
              <p @click="goRouter('/helpList')">Help</p>
            </div>
            <div>
              <p @click="goRouter('/feedbackList')">Feedback</p>
            </div>
            <div style="width: 90px;">
              <p @click="goRouter('/AboutUs')">About DRGF</p>
            </div>
            <div style="min-width: 400px; margin-left: 20px;">
              <p class="email-icon"><img src="@/assets/images/youxiang@2x.png" alt="">Contact us</p>
              <!-- <p>Contact us: {{aboutData.e_name}}</p> -->
              <p>Tel: {{aboutData.customer_service_tel}}</p>
              <p>E-mail: {{aboutData.email}}</p>
              <p>{{aboutData.address}}</p>
              <p>{{aboutData.customer_service_time}}</p>
            </div>
          </div>
          
        </div>

        <div class="text-2">
          Copyright © 2021. Creative Commons Attribution 4.0 (CC-BY 4.0) license. All Rights Reserved
        </div>

        <!-- <p class="text-2"></p> -->
        
      </div>
      
  </div>
</template>

<script>


import {
  sel_contact_us,
} from '@/api/common'

import goTop from '../goTop.vue'

export default {
  components: {
    goTop
  },
  data () {
    return {
      sysInfo: {},
      aboutData: {},
      PVData: {
        count: {
          version: '',
          last_update_day: '',
        }
      }
    }
  },
  mounted() {
    if(localStorage.getItem('sysInfo')) {
      this.sysInfo = JSON.parse(localStorage.getItem('sysInfo'))
    }
    if(localStorage.getItem('PVData')) {
      this.PVData = JSON.parse(localStorage.getItem('PVData'))
    }
    this.getsel_contact_us()
  },
  methods: {
    /**
     * 获取系统信息
     */
    getsel_contact_us() {
      sel_contact_us({}).then((res) => {
        this.aboutData = res.data
      })
    },
    /**
     * 页面跳转
     */
    goRouter(url) {
      this.$router.push({
        path: url
      })
    },
    /**
     * 跳转
     */
    goRouter2(url) {
      window.open(url)
      // this.$router.push({
      //   path: url
      // })
    },

    goRouter3(url, data) {
      this.$router.push({
        path: url,
        query: data
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .page-bottom-box22 {
    position: relative;
    .go-top {
      position: absolute;
      right: 30px;
    }
    .content-box2 {
      width: 1420px;
      // margin: 0 auto;
    }
      height: 403px;
      background: #2A2A2A;
      display: inline-block;
      width: 100%;
      text-align: center;
      
      >div {
        width: 90%;
        margin: 0 auto;
        margin-top: 40px;
      }
      .info-box {
        display: flex;
        color: #fff;
        img {
          width: 54px;
          margin-right: 15px;
        }
        >div {
          >:nth-child(2) {
            margin-top: 12px;
            span {
              margin-left: 20px;
              cursor: pointer;
            }
          } 
        }
      }
      .text-2 {
        color: #959595;
      }
      .email-icon {
        display: flex;
        align-items: center;
        img {
          width: 15px;
          margin-right: 5px;
        }
      }
      .line-box {
        height: 1px;
        border-bottom: 1px solid #959595;
        position: absolute;
        // top: 200px;
        // left: 0;
        margin-top: 30px;
        width: 100%;
        z-index: 999;
      }
      .bottom-middle-line {
        position: relative;
        // border: 1px solid red;
        width: 1420px;
        display: flex;
        color: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
        >div {
          text-align: left;
          margin-right: 40px;
          max-width: 250px;
          color: #959595;
          margin-right: 60px;
          // min-width: 120px;
          >p {
            cursor: pointer;
            margin-bottom: 15px;
            font-size: 12px;
          }
          >:nth-child(1) {
            font-weight: 500;
            font-size: 13px;
            color: #fff;
            margin-bottom: 40px;
          }
        }
      }
    }
</style>
