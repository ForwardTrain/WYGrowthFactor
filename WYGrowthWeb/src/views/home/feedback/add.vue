<template>
  <div class="feedback-add-box">
    <top></top>
    <div class="feedback-add-content">
      <p class="title">Home > Feedback </p>
      <p class="title-2">Contact us</p>
      <p>Send us general questions and suggestions using the form below</p>

      <div class="add-content">
        <div class="add-content-left">
          <div class="line-box"></div>
          <div class="left-text">
            <!-- <img src="@/assets/images/Group@2wwx.png" alt=""> -->
            <div>
              <p style="font-weight: 600;margin-bottom: 0px;">Help Us Improve! Share Your Feedback and Contribute to Our Growth Factor Database</p>
              <p>We are committed to continuously improving and expanding our Growth Factor Database to better serve the scientific community. Your input is invaluable in helping us achieve this goal. Whether you have suggestions, feedback, or new data to contribute, we welcome your participation!</p>
              <p style="font-weight: 600;margin-bottom: 0px;" >How You Can Contribute</p>
              <p style="margin-bottom: 5px;">1. Provide Feedback or Suggestions: <span style="font-weight: 400 !important;">If you have any suggestions on how we can improve the database, or if you encounter any issues while using it, please let us know.</span></p>
              
              <p >2. Submit New Growth Factor Information: <span  style="font-weight: 400 !important;">If you have data on growth factors that are not currently included in our database, we encourage you to submit this information.</span></p>
            
              <p style="font-weight: 600;margin-bottom: 0px;">Guidelines for Submissions</p>
              <p style="margin-bottom: 5px;">1. Provide detailed and accurate descriptions of the growth factor, including its name, function, source, and any relevant references or publications.</p>
              <p style="margin-bottom: 5px;">2. Include supporting evidence or citations for the data you are submitting.</p>
              <p>3. Ensure that the information is up-to-date and has been verified by reliable sources.</p>
              <!-- <p>为了保障反馈畅通，提高工作效率，更好的为您服务，请您在发内容前，按照范围反映情况。</p>
              <p>（一）一个反馈内容反映一个问题。反映问题必须实事求是，时间、地点、当事人、主要经过、结果等要素要齐全，文字应该简明扼要。</p>
              <p>（二）请注明姓名、工作单位、联系方式、电子邮件等个人真实资料。如果资料不详或不真实，我们将不予受理。</p>
              <p>（三）请勿重复提交投诉。如果您重复提交，我们将只受理您若干投诉中的一个。</p>
              <p>（四）不属于本栏目受理范围的问题视为无效问题，本栏目管理人员有权对此删改并不再告知。</p>
              <p>注：十分真诚地欢迎您向我们真实、客观地反映问题，感谢您对于我们工作中的不足之处提出宝贵意见。请您认真、详细、真实地填写以下信息，以便我们回复！请认真填写表格（带*项不能为空）</p> -->
            </div>
          </div>
        </div>

        <div class="add-content-right">
          <div class="top1">
            <p>Submission</p>
            <div>
              <el-button class="margin-L" type="info" @click="cancel">Cancel</el-button>
              <el-button class="margin-L" type="primary" @click="opstAdd">Send</el-button>
            </div>
          </div>

          <div class="middle1">
            <div>
              <div class="line-box2">
                <p>Name/Account</p>
                <div>
                  <el-input style="width: 720px;" v-model="addData.name" placeholder=" " />
                </div>
              </div>
              <div class="line-box2">
                <p>Contact number</p>
                <div>
                  <el-input style="width: 720px;" v-model="addData.tel" placeholder=" " />
                </div>
              </div>
              <div class="line-box2">
                <p><span>*</span>E-mail</p>
                <div>
                  <el-input style="width: 720px;" v-model="addData.email" placeholder=" " />
                </div>
              </div>
            </div>
            <div>
              <!-- <div class="line-box2">
                <p><span>*</span>Gender</p>
                <div>
                  <el-radio-group style="width: 180px" v-model="addData.sex" class="ml-4">
                    <el-radio label="1" size="large">Male</el-radio>
                    <el-radio label="2" size="large">Female</el-radio>
                  </el-radio-group>
                </div>
              </div> -->
              <!-- <div class="line-box2">
                <p><span>*</span>Type</p>
                <div>
                  <el-radio-group style="width: 380px" v-model="addData.type" class="ml-4">
                    <el-radio label="1" size="large">Inquiry</el-radio>
                    <el-radio label="2" size="large">Advice</el-radio>
                    <el-radio label="3" size="large">Complaint</el-radio>
                    <el-radio label="4" size="large">Other</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="line-box2">
                <p><span>*</span>Public</p>
                <div>
                  <el-radio-group style="width: 180px" v-model="addData.is_show" class="ml-4">
                    <el-radio label="1" size="large">Agree</el-radio>
                    <el-radio label="2" size="large">Disagree</el-radio>
                  </el-radio-group>
                </div>
              </div> -->

            </div>
          </div>

          <div class="top1" style="margin-top: 30px;">
            <p>Feedback information</p>
            <div>
            </div>
          </div>

          <div>
            <div class="line-box2">
              <!-- <p>Message title</p> -->
              <p><span>*</span>Protein Name</p>
              <div>
                <el-input style="width: 720px;" v-model="addData.title" placeholder=" " />
              </div>
            </div>
            <div class="line-box2">
              <!-- <p>Message title</p> -->
              <p><span>*</span>Gene Name</p>
              <div>
                <el-input style="width: 720px;" v-model="addData.title" placeholder=" " />
              </div>
            </div>
            <div class="line-box2 line-box3">
              <p>Detail Information</p>
              <div>
                <el-input style="width: 720px;" 
                          v-model="addData.content" 
                          :autosize="{ minRows: 5, maxRows: 20 }"
                          type="textarea"
                          placeholder="Sequence, Function, Organism, et al." />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'
add_support
import {
  add_support
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      addData: {
        content: '',
        email: '',
        is_show: '1',
        name: '',
        sex: '1',
        tel: '',
        title: '',
        type: '1',
      }
    }
  },
  mounted() {
    
  },
  methods: {
    /**
     * 提交
     */
    opstAdd() {
      if(!this.addData.name || !this.addData.tel) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      add_support(this.addData).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.cancel()
        }
      })
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang='scss'>
  .feedback-add-box {
    .feedback-add-content {
      width: 1400px;
      margin: 0 auto;
      .title {
        color: #B5B5B5;
        margin-top: 17px;
      }
      .title-2 {
        font-weight: 500;
        font-size: 24px;
        margin-top: 20px;
      }
    }
    .add-content {
      padding: 17px 0;
      border-top: 1px solid #DCDFE6;
      margin-top: 15px;
      display: flex;
      .add-content-left {
        width: 458px;
        // height: 484px;
        background: #FFFFFF;
        box-shadow: 0px 1px 9px 0px rgba(106,106,106,0.3);
        padding: 10px 9px;
        .line-box {
          width: 440px;
          height: 2px;
          background: #47C9FF;
        }
        .left-text {
          display: flex;
          margin-top: 10px;
          img {
            width: 14px;
            height: 14px;
            margin-right: 10px;
          }
          p {
            margin-bottom: 10px;
            line-height: 22px;
          }
        }
      }
      
      .line-box2 {
        display: flex;
        align-items: center;
        margin-top: 20px;
        >div {
          min-height: 40px;
          display: flex;
          align-items: center;
        }
        >p {
          width: 110px;
          text-align: right;
          margin-right: 20px;
          span {
            color: #FF1D1D;
          }
        }
      }
      .line-box3 {
        display: flex;
        align-items: flex-start;
        
      }
      .add-content-right {
        width: 100%;
        margin-left: 80px;
        .top1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          >p {
            font-weight: 500;
            font-size: 20px;
          }
        }
        .middle1 {
          display: flex;
        }
      }
    }
  }
</style>
