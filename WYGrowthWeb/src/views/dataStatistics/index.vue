<template>
  <div class="data-statistics-data">
    <div class="sort1-box">
      <div>
        <p class="title">流量概况</p>
        <div class="rate-box">
          <div>
            <div>
              <div>
                <p>今日流量（PV）</p>
                <p>{{topData.today_see_num|| '-'}}</p>
              </div>
              <img src="@/assets/images/Group@2x.png" alt="">
            </div>
            <p class="p-1">昨日流量（PV）：{{topData.yesterday_see_num|| '-'}}</p>
          </div>

          <div>
            <div>
              <div>
                <p>今日访客量（UV）</p>
                <p>{{topData.today_visits_num|| '-'}}</p>
              </div>
              <img src="@/assets/images/Group7@2x.png" alt="">
            </div>
            <p class="p-1">昨日访客量（UV）：{{topData.yesterday_visits_num|| '-'}}</p>
          </div>

          <div>
            <div>
              <div>
                <p>今日IP数量</p>
                <p>{{topData.today_ip_num|| '-'}}</p>
              </div>
              <img src="@/assets/images/Group6@2x.png" alt="">
            </div>
            <p class="p-1">昨日IP数量：{{topData.yesterday_ip_num|| '-'}}</p>
          </div>

          <div>
            <div>
              <div>
                <p>今日跳出率</p>
                <p>{{topData.today_bounce_rate|| '-'}}</p>
              </div>
              <img src="@/assets/images/Group2@2x.png" alt="">
            </div>
            <p class="p-1">昨日跳出率：{{topData.before_yesterday_bounce_rate || '-'}}</p>
          </div>

          <!-- <div>
            <div>
              <div>
                <p>今日平均访问时长</p>
                <p>-</p>
              </div>
              <img src="@/assets/images/Group@2x.png" alt="">
            </div>
            <p class="p-1">昨日平均访问时长：-</p>
          </div> -->

          
        </div>
      </div>
      <div>
        <p class="title">数据库</p>
        <div class="Archive-box">
          {{topData.size_in_KB || '-'}} {{topData.unit_name || '-'}}
        </div>
      </div>
    </div>

    <div class="sort1-box" style="margin-top: 20px;">
      <div style="margin-right: 12px;" >
        <p class="title">地域概况</p>
        <div class="eachats-box" >
          <div class="time-box">
            <div>
              <div :style="timeIndex1 == 0 ? 'background: #1990FF; color: #fff;' : ''" @click="chooseTime1(0)">日</div>
              <!-- <div>周</div> -->
              <div :style="timeIndex1 == 1 ? 'background: #1990FF; color: #fff;' : ''" @click="chooseTime1(1)">月</div>
              <div :style="timeIndex1 == 2 ? 'background: #1990FF; color: #fff;' : ''" @click="chooseTime1(2)">年</div>
            </div>
            <p>{{time}}</p>
          </div>
          <div style="width: 100%; height: 90%; margin-top: 12px;" ref="echarts1"></div>
        </div>
      </div>

      <div>
        <p class="title">地域分布</p>
        <div class="eachats-box" style="width: 792px;">
          <div class="time-box">
            <div>
              <div :style="timeIndex2 == 0 ? 'background: #1990FF; color: #fff;' : ''" @click="chooseTime2(0)">日</div>
              <!-- <div>周</div> -->
              <div :style="timeIndex2 == 1 ? 'background: #1990FF; color: #fff;' : ''" @click="chooseTime2(1)">月</div>
              <div :style="timeIndex2 == 2 ? 'background: #1990FF; color: #fff;' : ''" @click="chooseTime2(2)">年</div>
            </div>
            <p>{{time2}}</p>
          </div>
          <div style="width: 100%; height: 90%; margin-top: 12px;" ref="echarts2"></div>
        </div>
      </div>
    </div>

    <div class="sort1-box" style="margin-top: 20px;">
      <div style="margin-right: 12px;">
        <p class="title">浏览器</p>
        <div class="table-box">
          <el-table :data="tableData1.list" height="230px" style="width: 100%">
            <el-table-column prop="app_name" label="名称" width="180" />
            <el-table-column prop="num" label="浏览量" width="180" />
            <el-table-column prop="ratio" label="占比" />
          </el-table>
        </div>
      </div>

      <div style="margin-right: 12px;">
        <p class="title">受访页面</p>
        <div class="table-box">
          <el-table :data="tableData2.list"  height="230px" style="width: 100%">
            <el-table-column prop="path" label="名称" width="180" />
            <el-table-column prop="num" label="浏览量" width="180" />
            <el-table-column prop="ratio" label="占比" />
          </el-table>
        </div>
      </div>
      <div>
        <p class="title">数据库</p>
        <div class="table-box">
          <el-table :data="tableData3.list"  height="230px" style="width: 100%">
            <el-table-column prop="name" label="版本号" width="180" />
            <el-table-column prop="c_s_date" label="更新日期" width="180" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';



import {
  sel_browser_page_count_data,
  sel_count_data,
  sel_browser_count_data,
  sel_literature_count_data,
  sel_area_count_data
} from '@/api/common'

export default {
  data () {
    return {
      tableData1:[],
      tableData2:[],
      tableData3:[],

      topData: {},

      time: '',
      timeIndex1: 2,

      time2: '',
      timeIndex2: 2,


    }
  },
  mounted() {
    this.time = this.$global.today
    this.time2 = this.$global.today
    this.getSsel_browser_page_count_data()
    this.getsel_browser_count_data()
    this.getsel_literature_count_data()

    this.getsel_count_data()

    this.getsel_area_count_data('1')
    this.getsel_area_count_data('2')
  },
  
  methods: {
    /**
     * 选择时间
     */
    chooseTime1(type) {
      this.timeIndex1 = type
      if(type == 0) {
        this.time = this.$global.today
      } else if(type == 1) {
        this.time = this.$global.today.slice(0, 7)
      } else if(type == 2) {
        this.time = this.$global.today.slice(0, 4)
      }
      this.getsel_area_count_data('1')
    },

    /**
     * 选择时间
     */
    chooseTime2(type) {
      this.timeIndex2 = type
      if(type == 0) {
        this.time2 = this.$global.today
      } else if(type == 1) {
        this.time2 = this.$global.today.slice(0, 7)
      } else if(type == 2) {
        this.time2 = this.$global.today.slice(0, 4)
      }
      this.getsel_area_count_data('2')
    },
    /**
     * 受访页面统计
     */
    getSsel_browser_page_count_data() {
      sel_browser_page_count_data({}).then((res) => {
        this.tableData2 = res.data
      })
    },

    /**
     * 流量概况
     */
    getsel_count_data() {
      sel_count_data({}).then((res) => {
        this.topData = res.data
      })
    },
    /**
     * 浏览器
     */
    getsel_browser_count_data() {
      sel_browser_count_data({}).then((res) => {
        this.tableData1 = res.data
      })
    },
    /**
     * 数据库
     */
    getsel_literature_count_data() {
      sel_literature_count_data({}).then((res) => {
        this.tableData3 = res.data
      })
    },
    /**
     * 地域概况
     */
    getsel_area_count_data(type) {
      sel_area_count_data({
        is_overseas: type,
        c_s_date: type == 1 ? this.time : this.time2
      }).then((res) => {
        if(type == 1) {
          let xData = []
          let seriesData = []
          res.data.list.forEach((item) => {
            xData.push(item.country)
            seriesData.push(item.num)
          })
          this.createcharts(xData, seriesData)
        }
        if(type == 2) {
          let seriesData = []
          res.data.list.forEach((item) => {
            
            seriesData.push({
              name: item.province,
              value: item.num
            })
          })
          this.createcharts2(seriesData)
        }
      })
    },
    /**
     * 图表渲染
     */
    createcharts(xData, seriesData) {
      this.myChart = echarts.init(this.$refs.echarts1);
      const option = {
        color: ['#6694FC'],
        xAxis: {
          type: 'value',
          
        },
        tooltip: {
          trigger: "item"
        },
        yAxis: {
          type: 'category',
          data: xData
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            barMaxWidth: '30'
          }
        ]
      };
      this.myChart.setOption(option);
    },

    
    createcharts2(seriesData) {
      this.myChart = echarts.init(this.$refs.echarts2);
      const option = {
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item"
        },
 
        //左侧小导航图标
        visualMap: {
          min: 0,
          max: 600,
          text: ["高", "低"],
          inRange: {
            color: ["#D8FAFE", "#006EDD"]//此处是设置颜色过渡
          }
        },
 
        //配置属性
        series: [
          {
            name: "浏览人数",
            type: "map",
            mapType: "china", // ---此处是中国地图样式-------需要注意：省份中应使用汉字即如 ‘mapType:"河南"’
            roam: true,
            label: {
              normal: {
                show: false //省份名称----你可以选择true，展示每个省份的名称
              },
              emphasis: {
                show: false
              }
            },
            data: seriesData
            // data: [//这是数据，500以内的随机数
            //   { name: "北京", value: "100" },
            //   { name: "天津", value: Math.round(Math.random() * 500) },
            //   { name: "上海", value: Math.round(Math.random() * 500) },
            //   { name: "重庆", value: Math.round(Math.random() * 500) },
            //   { name: "河北", value: Math.round(Math.random() * 500) },
            //   { name: "河南", value: Math.round(Math.random() * 500) },
            //   { name: "云南", value: Math.round(Math.random() * 500) },
            //   { name: "辽宁", value: Math.round(Math.random() * 500) },
            //   { name: "黑龙江", value: Math.round(Math.random() * 500) },
            //   { name: "湖南", value: Math.round(Math.random() * 500) },
            //   { name: "安徽", value: Math.round(Math.random() * 500) },
            //   { name: "山东", value: Math.round(Math.random() * 500) },
            //   { name: "新疆", value: Math.round(Math.random() * 500) },
            //   { name: "江苏", value: Math.round(Math.random() * 500) },
            //   { name: "浙江", value: Math.round(Math.random() * 500) },
            //   { name: "江西", value: Math.round(Math.random() * 500) },
            //   { name: "湖北", value: Math.round(Math.random() * 500) },
            //   { name: "广西", value: Math.round(Math.random() * 500) },
            //   { name: "甘肃", value: Math.round(Math.random() * 500) },
            //   { name: "山西", value: Math.round(Math.random() * 500) },
            //   { name: "内蒙古", value: Math.round(Math.random() * 500) },
            //   { name: "陕西", value: Math.round(Math.random() * 500) },
            //   { name: "吉林", value: Math.round(Math.random() * 500) },
            //   { name: "福建", value: Math.round(Math.random() * 500) },
            //   { name: "贵州", value: Math.round(Math.random() * 500) },
            //   { name: "广东", value: Math.round(Math.random() * 500) },
            //   { name: "青海", value: Math.round(Math.random() * 500) },
            //   { name: "西藏", value: Math.round(Math.random() * 500) },
            //   { name: "四川", value: Math.round(Math.random() * 500) },
            //   { name: "宁夏", value: Math.round(Math.random() * 500) },
            //   { name: "海南", value: Math.round(Math.random() * 500) },
            //   { name: "台湾", value: Math.round(Math.random() * 500) },
            //   { name: "香港", value: Math.round(Math.random() * 500) },
            //   { name: "澳门", value: Math.round(Math.random() * 500) }
            // ] //数据
          }
        ]
      };
      this.myChart.setOption(option);
    }
  },
}
</script>

<style scoped lang='scss'>
  .data-statistics-data {
    background: #F6F7FB !important;
    // border: 1px solid red;
    overflow: auto;
    // padding: 15px;
    .title {
      font-weight: 500;
      font-size: 20px;
    }
    .sort1-box {
      display: flex;
    }
    .rate-box {
      display: flex;
      align-items: center;
      margin-top: 12px;
      >div {
        width: 242px;
        height: 135px;
        background: #FFFFFF;
        border-radius: 12px;
        margin-right: 12px;
        padding: 15px;
        .p-1 {
          margin-top: 12px;
        }
        >div {
          display: flex;
          justify-content: space-between;
          
          >div {
            >:nth-child(2) {
              margin-top: 12px;
              font-weight: 500;
              font-size: 30px;
            }
          }
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
    .Archive-box {
      margin-top: 12px;
      width: 388px;
      height: 135px;
      background: linear-gradient( 315deg, #4D59CF 0%, #425AC6 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 50px;
      padding: 22px;
      color: #fff;
    }
    .eachats-box {
      margin-top: 12px;
      width: 856px;
      height: 390px;
      background: #FFFFFF;
      border-radius: 12px;
      padding: 12px;
    }
    .table-box {
      margin-top: 12px;
      width: 546px;
      height: 259px;
      background: #FFFFFF;
      border-radius: 12px;
      padding: 12px;
    }
    .time-box {
      display: flex;
      justify-content: space-between;
      >p {
        color: #999999;
      }
      >div {
        display: flex;
        >div {
          margin-right: 12px;
          cursor: pointer;
          width: 42px;
          height: 32px;
          background: #F3F3F3;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
