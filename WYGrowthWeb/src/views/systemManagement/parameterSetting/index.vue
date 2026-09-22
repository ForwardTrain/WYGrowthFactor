<template>
  <div class="parameterSetting-box"> 
    <div class="prompt-type">
      <div></div>
      <p>参数设置</p>
    </div>

    <div class="content-box">
      <p >饮食处方设置</p>
      <div>
        <div>
          <p class="p-1">默认能量等级</p>
          <div class="line-box">
            <el-input v-model="theData.one" style="width: 200px;"  placeholder=" " />
            <p class="p-3">千卡/公斤</p>
          </div>
        </div>
        <div>
          <p class="p-1">营养成分比例</p>
          <div class="line-box">
            <p class="p-2">碳水比列</p>
            <el-input v-model="theData.two" @change="chang1()" style="width: 100px;"  placeholder=" " />
            <p class="p-3">%</p>
             <p class="p-2">脂肪比列</p>
            <el-input v-model="theData.three" @change="chang2()" style="width: 100px;"  placeholder=" " />
            <p class="p-3">%</p>
             <p class="p-2">蛋白质比列</p>
            <el-input v-model="theData.four" disabled style="width: 100px;"  placeholder=" " />
            <p class="p-3">%</p>
          </div>
        </div>
        <div>
          <p class="p-1">饮食规律比列</p>
          <div class="line-box">
            <p class="p-2">早餐摄入比列</p>
            <el-input v-model="theData.five" @change="chang3()" style="width: 100px;"  placeholder=" " />
            <p class="p-3">%</p>
             <p class="p-2">午餐摄入比列</p>
            <el-input v-model="theData.six" @change="chang4()" style="width: 100px;"  placeholder=" " />
            <p class="p-3">%</p>
             <p class="p-2">晚餐摄入比列</p>
            <el-input v-model="theData.seven" disabled style="width: 100px;"  placeholder=" " />
            <p class="p-3">%</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-btn">
      <el-button class="margin-L" type="info" @click="cancel">取消</el-button>
      <el-button class="margin-L" type="primary" @click="add()">保存</el-button>
    </div>
  </div>
</template>

<script>

import {
  sel_food_params,
  upd_food_params
  
} from '@/api/common'
export default {
  data () {
    return {
      theData: {
        five: "",
        four
        : 
        "",
        one
        : 
        "",
        seven
        : 
        "",
        six
        : 
        "",
        three
        : 
        "",
        two
        : 
        "",
      },
    }
  },
  mounted() {
    this.getsel_food_params()
  },
  methods: {
    chang1() {
      if(Number(this.theData.two) > 100 - Number(this.theData.three)) {
        this.theData.two = ''
        this.$message({
          type: 'warning',
          message: '百分比总和不能超过100'
        })
        return
      } else {
        this.theData.four = 100 - Number(this.theData.two) - Number(this.theData.three)
      }
    },
    chang2() {
      if(Number(this.theData.three) > 100 - Number(this.theData.two)) {
        this.theData.three = ''
        this.$message({
          type: 'warning',
          message: '百分比总和不能超过100'
        })
        return
      } else {
        this.theData.four = 100 - Number(this.theData.two) - Number(this.theData.three)
      }
    },
    chang3() {
      if(Number(this.theData.five) > 100 - Number(this.theData.six)) {
        this.theData.five = ''
        this.$message({
          type: 'warning',
          message: '百分比总和不能超过100'
        })
        return
      } else {
        this.theData.seven = 100 - Number(this.theData.six) - Number(this.theData.five)
      }
    },
    chang4() {
      if(Number(this.theData.six) > 100 - Number(this.theData.five)) {
        this.theData.six = ''
        this.$message({
          type: 'warning',
          message: '百分比总和不能超过100'
        })
        return
      } else {
        this.theData.seven = 100 - Number(this.theData.six) - Number(this.theData.five)
      }
    },
    getsel_food_params() {
      sel_food_params({}).then((res) => {
        this.theData = res.data
      })
    },
    /**
     * 取消
     */
    cancel() {
      this.getsel_food_params()
    },
    /**
     * 保存
     */
    add() {
      if(this.theData.one == '' || this.theData.two == '' || this.theData.three == '' || this.theData.five == ''|| this.theData.six == '') {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      upd_food_params(this.theData).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
         
        }
      }) 
    }
  },
}
</script>

<style scoped lang='scss'>
  .parameterSetting-box {
    padding: 15px;
    .content-box {
      margin-top: 15px;
      height: calc(100vh - 255px);
      overflow: auto;
      margin-bottom: 20px;
      >p {
        text-align: center;
      }
      >div {
        margin-top: 20px;
        padding: 0 50px;
        .p-1 {
          width: 120px;
        }
        .p-2 {
          width: 100px;
        }
        .p-3 {
          width: 150px;
          margin-left: 10px;
        }
        >div {
          display: flex;
          padding: 0 30px;
          align-items: center;
          height: 100px;
          border: 1px solid #EDEFF5;
          margin-top: -1px;
          .line-box {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
</style>
