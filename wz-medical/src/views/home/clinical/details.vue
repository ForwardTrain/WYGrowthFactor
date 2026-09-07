<template>
  <div class="clinical-box">
    <top></top>

    <div class="content-box">
      <div class="title-box">
        {{info.briefTitle}}
      </div>

      <div class="box-2">
        <div class="line-box4">
          <div class="Recruiting-box" :style="$route.query.overallStatus == 'Unknown' ? 'color: #fff;background-color: rgb(124,111,59);' : $route.query.overallStatus == 'Completed' ? 'color: #fff;background-color: rgb(136,35,28);' : $route.query.overallStatus == 'Recruiting' ? 'color: #fff; background-color: rgb(77,122,45);' : $route.query.overallStatus == 'Suspended' ?'color: #fff;background-color: #989595;' : 'color: #135287;background-color: 135287;'">
            {{$route.query.overallStatus}}
          </div>
          <div class="Recruiting-box" style="border: 1px solid #333;">
            {{$route.query.phases || 'NA'}}
          </div>
        </div>

        <div class="line-box" v-show="info.nct_number">
          <p>ClinicalTrials.gov ID</p>
          <p @click="goUrl()" style="color: #135287;cursor: pointer;">{{info.nct_number}}</p>
        </div>
        <div class="line-box" v-show="info.sponsor">
          <p>Sponsor</p>
          <p>{{info.sponsor}}</p>
        </div>
        <div class="line-box" v-show="info.information_provided_by">
          <p>Information provided by</p>
          <p>{{info.information_provided_by}}</p>
        </div>
        <div class="line-box" v-show="info.last_update_posted">
          <p>Last Update</p>
          <p>{{info.last_update_posted}}</p>
        </div>
      </div>

      <div class="title-box" style="font-size: 20px;">
        Study Overview
      </div>

      <div class="box-type2" v-show="info.brief_summary">
        <p>Brief Summary</p>
        <!-- <p>{{info.brief_summary}}</p> -->
        <p class="text-2" style="font-size: 16px; line-height: 22px;" v-html="info.brief_summary"></p>
      </div>

      <div class="box-type2" v-show="info.detailed_description">
        <p>Detailed Description</p>
        <!-- <p >{{info.detailed_description}}</p> -->
        <p class="text-2" v-html="info.detailed_description" ></p>
      </div>

      <div class="box-type2" v-show="info.official_title">
        <p>Official Title</p>
        <p>{{info.official_title}}</p>
      </div>

      <div class="box-type2" v-show="info.official_title">
        <p>Conditions</p>
        <div class="line-box2">
          <p v-for="(item, index) in info.conditions" :key="index">{{item}}<span v-show="index + 1 != info.conditions.length">,&nbsp;</span></p>
        </div>
      </div>

      <div class="box-type2" v-show="info.intervention_treatment && info.intervention_treatment.length">
        <p>Intervention / Treatment</p>
        <div v-for="(item, index) in info.intervention_treatment" :key="index" v-show="item.interventionNames" class="Treatment-box">
          <div></div><p v-for="(item2, index2) in item.interventionNames" :key="index2">{{item2}}</p>
        </div>
      </div>

      <div class="box-type2" v-show="info.other_study_id_numbers" style="border: none;">
        <p>Other Study ID Numbers</p>
        <p>{{info.other_study_id_numbers}}</p>
      </div>

    </div>

    <bottom></bottom>
  </div>
</template>

<script>

import top from '../top/index.vue'
import bottom from '../bottom/index.vue'

import {
  sel_CT_list_detail,
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      info: {
        briefTitle: '',
        brief_summary: '',
        conditions: '',
        detailed_description: '',
        intervention_treatment: '',
        last_update_posted: '',
        nct_number: '',
        official_title: '',
        other_study_id_numbers: '',
        overallStatus: '',
        sponsor: '',
      }
    }
  },
  mounted() {
    this.getsel_CT_list_detail()
  },
  methods: {
    getsel_CT_list_detail() {
      sel_CT_list_detail({
        id: this.$route.query.id
      }).then((res) => {
        this.info = res.data
      })
    },
    /**
     * 跳转三方链接
     */
    goUrl() {
      window.open(`https://clinicaltrials.gov/study/${this.info.nct_number}`)
    },
  },
}
</script>

<style scoped lang='scss'>
::v-deep(.text-2) {
  >p {
    font-size: 16px !important; 
  }
}
  .clinical-box {
    .line-box {
      
      display: flex;
      align-items: center;
      margin-top: 14px;
      p {
        font-size: 16px;
        color: #333333;
      }
      >:nth-child(1) {
        font-weight: 500;
        font-size: 16px;
        color: #702330;
        width: 200px;
      }
    }
    .content-box {
      width: 1393px;
      // height: 1041px;
      background: #FFFFFF;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
      margin: 40px auto;
      .title-box {
        background: #f5f5f5;
        font-weight: 500;
        font-size: 26px;
        color: #333333;
        // height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #DCDFE6;
        padding: 5px 20px;
      }
      .box-2 {
        padding: 20px;
        border-bottom: 1px solid #DCDFE6;
        .Recruiting-box {
          // width: 87px;
          padding: 0 10px;
          width: fit-content;
          height: 30px;
          background: #FFFFFF;
          border-radius: 4px;
          
          // color: #2DAE3D;
          text-align: center;
          line-height: 30px;
          font-size: 16px;
        }
      }
      .line-box2 {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        background: #D7E9F5;
        >p {
          font-weight: 500;
          font-size: 16px;
          color: #333333;
        }
        padding: 4px 10px; 
        width: fit-content;
      }
      .Treatment-box {
        display: flex;
        align-items: center;
        margin-top: 14px;
        >p {
          font-weight: 500;
          font-size: 16px;
          color: #333333;
        }
        >div {
          height: 5px;
          width: 5px;
          background: #333;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .box-type2 {
        margin: 20px;
        border-bottom: 1px solid #DCDFE6;
        padding-bottom: 15px;
        >:nth-child(1) {
          font-weight: 500;
          font-size: 16px;
          color: #702330;
        }
        >:nth-child(2) {
          line-height: 24px !important;
          font-weight: 400 !important;
          font-size: 16px !important;
          color: #333333 !important;
          margin-top: 10px !important;
        }
      }
    }
  }
  .line-box4 {
    display: flex;
    >:nth-child(1) {
      margin-right: 20px;
      
    }
    >:nth-child(2) {
      color: #702330 !important;
      border-color: #000 !important;
    }

  }
</style>
