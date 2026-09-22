<template>
  <div class="home-box">
    <el-drawer
      v-model="drawer"
      :show-close="false"
      :with-header="false"
      size="850px"
      direction="ltr">
      <advancedSearch @advancedSearch="advancedSearch" @closeDrawer="closeDrawer"></advancedSearch>
    </el-drawer>

    <div class="top-search">
      <top :PVData="PVData"></top>
      
     
      <div class="middle-seach">
        <div class="text-p">
          <p>DRGF  <span style="font-weight: 600;font-style: italic;">V{{PVData.count.version}}</span></p>
          <p>Growth Factor Database</p>
          <p>Developed by <span @click="openUrl()" class="WMU-a">WMU</span></p>
          <!-- <p>{{PVData.count.DRGF_desc}}</p> -->
          <!-- <p>Developed by FGF research team of WMU</p> -->
        </div>

        <div class="search-input-box">
          <p>Start Your Search</p>
          <div class="search-input">
            <div>
              <el-icon><Search /></el-icon>
              <!-- <el-input name="account" v-model="name" placeholder="Search for protein, gene, family or organism" /> -->
              <!-- <form>
                <input type="text" style="width: 1000px;" id="operator" name="operator"/>
                <input type="submit" value="提交" />
              </form> -->

              <el-popover placement="bottom" v-if="historyList && historyList.length" ref="popoverRef" :width="1100" trigger="click">
                <template #reference>
                  <el-input name="account" v-model="name" placeholder="Search for protein, gene, family or organism" />
                </template>
                <div class="history-box">
                  <div @click="CloseHistory(item)" v-for="(item, index) in historyList" :key="index" >
                    <p  >{{item}}</p>
                    <el-icon class="Close-btn2" @click.stop="deletehistoryList(index)"><Close /></el-icon>
                  </div>
                </div>
              </el-popover>

              <el-input name="account" v-else v-model="name" placeholder="Search for protein, gene, family or organism" />
              
              <el-icon class="Close-btn" @click="name = ''"><Close /></el-icon>
            </div>

            <div @click="goSearch()" type="submit" style="font-size: 24px">Go</div>
          </div>

          <div class="search-line">
            <div>Examples： 
              <!-- <p v-for="(item, index) in example" :key="index" @click="PushName(item)"><span>{{item}}</span><span style="text-decoration: none;" v-show="index != example.length - 1">，</span> </p> -->
                <p v-for="(item, index) in example" :key="index" v-show="item.name" @click="PushName(item)">{{item.name}}</p> 
                <!-- <p @click="PushName(item)">VEGF</p>
                <p @click="PushName(item)">PDGF</p>
                <p @click="PushName(item)">BMP</p>
                <p @click="PushName(item)">EGF</p> -->
              </div>
            <p @click="openAdvancedSearch()" style="font-size: 16px">Advanced Search</p>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-box">
      <el-carousel height="442px" :interval="Number(bannerList.time_lag) * 1000" :pause-on-hover="true" v-if="bannerList.details.length">
        <el-carousel-item v-for="(item, index) in bannerList.details" :key="index">
          <img style="height: 442px; width: 100%;" :src="item.path" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>


    <div class="content-box">
      <div class="content-left">
        <p class="title-1">Top Search Terms</p>

        <div class="text-flutter">
          <todo6 ref="todo" :keyword="keyword" @postWord="postWord"></todo6>
          <!-- <div class="word-cloud" id="wordCloud"></div> -->
        </div>

        <p class="title-1" style="margin-top: 30px;">Contributor</p>
        <div class="cooperation-box">
          <div v-for="(item, index) in contributorList" @click="goUrl(item)" :key="index">
            <div class="img-box">
              <img :src="item.img" alt="">
            </div>
            <!-- <p>{{item.title}}</p> -->
          </div>
        </div>

        <div class="data-show">
          <div>
            <div>
              <p style="color: #702330;">Page View</p>
              <p>{{PVData.count.pv}}</p>
            </div>
            <div>
              <p style="color: #702330;">User Sessions</p>
              <p>{{PVData.count.uv}}</p>
            </div>
            <div>
              <p style="color: #702330;">Number of IPs</p>
              <p>{{PVData.count.IP_num}}</p>
            </div>
          </div>

          <p>Since {{PVData.count.since}} </p>
        </div>

        <div>
          <div class="eachats-box">
            <div style="width: 100%; height: 90%; margin-top: 12px;" ref="echarts22"></div>
          </div>
        </div>
        
      </div>
      <div class="content-right">
        <p class="title-1">Welcome to DRGF</p>

        <div class="intro-box"  style="margin-top: 10px;">
          <div  v-html="ArchiveInfo.introduction_brief"></div>
          <div class="read-more-1" @click="goReadMore()">more <img src="@/assets/images/Group2Copy@2x.png"  alt=""></div>
          <!-- <div class="Read-more" @click="goReadMore()">
            Read more
          </div> -->
          <p v-show="ArchiveInfo.notice_content" style="margin-top: 20px;color: #702330;">Citation*：</p>
          <!-- <div style="margin-top: 10px;" v-show="ArchiveInfo.notice_content">{{ArchiveInfo.notice_content}}</div> -->
          <div style="margin-top: 10px;" v-html="ArchiveInfo.notice_content" v-show="ArchiveInfo.notice_content"></div>
        </div>

        <p class="title-1" style="margin-top: 20px;">Data statistics information</p>

        <div v-if="proteinListBG" class="proteinList-BG">
          <img  :src="proteinListBG" alt="">
        </div>

        <div v-else class="statistics-info-box" style="margin-top: 10px;">
          <!-- <img src="@/assets/images/WechatIMG10978.jpeg" alt=""> -->
          <!-- <img src="@/assets/images/human@2x.png" alt=""> -->
          
          <div > 
            <div v-for="(item, index) in proteinList" :key="index" @click="goBrowse(item)" class="ratio-box">
              <el-progress type="circle" width="140"  stroke-width="12"  :percentage="((item.ratio * 100).toFixed(2))" />
              <svg width="100%" height="1px">
                <defs>
                  //x,y即渐变色方向及范围的控制
                  <linearGradient id="yellow" x1="1" y1="0" x2="0.3" y2="1">   
                    <stop
                      offset="0%"
                      style="stop-color: #01A9FD" 
                      stop-opacity="1"  
                    ></stop>

                    <stop
                      offset="100%"
                      style="stop-color: #00FDB8"  
                      stop-opacity="1" 
                    ></stop>
                  </linearGradient>
                </defs>
              </svg>
              <p style="margin-top: 0px; font-size: 16px" >{{item.name}}</p>
              <p style="margin-top: 10px;color: #702330;font-size: 16px">{{item.num || '-'}} entries</p>
            </div>
          </div>
          <!-- <div class="statistics-info-line">
            <img src="@/assets/images/human@2x.png" alt="">
            <div>
              <div ref="echarts1" class="echarts-box">

              </div>
           
            </div>
          </div>
          <div class="statistics-info-line">
            <img src="@/assets/images/mouse@2x.png" alt="">
            <div>
              <div ref="echarts2" class="echarts-box">

              </div>
           
            </div>
          </div> -->
        </div>

        <div class="bottom-box">
          <div class="bottom-box-line" style="width: 390px">
            <div @click="goRouter('/hotList')">
              <p class="title-1">Top Content</p>
              <div>more <img src="@/assets/images/Group2Copy@2x.png" alt=""></div>
            </div>
            <div class="bottom-box-line-bottom">
              <el-carousel height="220px" style="width:390px" v-if="hotList.length">
                <el-carousel-item v-for="item in hotList" :key="item">
                  <img :src="item.img" alt="" @click="goContent(item)">
                </el-carousel-item>
              </el-carousel>
              
            </div>
          </div>

          <div class="bottom-box-line bottom-box-line2" >
            <div @click="goRouter('/imageText')">
              <p class="title-1">News</p>
              <div>more <img src="@/assets/images/Group2Copy@2x.png" alt=""></div>
            </div>
            <div class="bottom-box-line-bottom bottom-box-line-bottom2">
              <div v-for="(item, index) in newList" :key="index" @click="goNews(item)">
                <p>{{item.name}}</p>
                <p>{{item.publish_time || '-'}}</p>
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
import * as echarts from 'echarts';
import top from './top/index.vue'
import bottom from './bottom/index.vue'
import advancedSearch from './advancedSearch/advancedSearch.vue'

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'


import todo6 from './todo.vue'
let _this = null


import {
  sys_cooperate_manage_list,
  sel_databases_brief,
  sel_key_words_example,
  sel_key_words,
  HomeContentsel_hot_list,
  HomeContentsel_list,
  sel_home_info,
  HomeBasicbanner_sel_detail,
  sel_home_protein_num_count,
  query_search_example_data,
  sel_area_count_data
} from '@/api/common'


export default {
  components: {
    top,
    bottom,
    advancedSearch,
    todo6
  },
  
  data () {
    return {
      sysInfo: {},
      name: '',
      
      drawer: false,
      ArchiveInfo: '',
      contributorList: [],
      example: [],
      keyword: [],
      hotList: [],
      newList: [],

      PVData: {
        count: {}
      },
      proteinList: [],
      proteinListBG: '',

      historyList: [],
      bannerList: {
        details: [],
        time_lag: '',
      }
    }
  },
  mounted() {
    _this = this
    if(localStorage.getItem('sysInfo')) {
      this.sysInfo = JSON.parse(localStorage.getItem('sysInfo'))
    }
    if(localStorage.getItem('historyList')) {
      this.historyList = JSON.parse(localStorage.getItem('historyList'))
    }
    // this.createcharts()
    // this.createcharts2()

    this.getsys_cooperate_manage_list()
    this.getsel_databases_brief()
    // this.getsel_key_words_example()
    this.getquery_search_example_data()
    this.getsel_key_words()
    this.getHomeContentsel_hot_list()
    this.getHomeContentsel_list()
    this.getsel_home_info()
    this.getHomeBasicbanner_sel_detail()
    this.getsel_home_protein_num_count()

    // setTimeout(() => {
    //   this.todo()
    // }, 400)
    this.getsel_area_count_data(2)
  },
  methods: {
    /**
     * 地域概况
     */
    getsel_area_count_data(type) {
      sel_area_count_data({
        is_overseas: '',
        c_s_date: ''
      }).then((res) => {
        if(type == 1) {
          let xData = []
          let seriesData = []
          res.data.list.forEach((item) => {
            xData.push(item.country)
            seriesData.push(item.num)
          })
          this.createcharts22(xData, seriesData)
        }
        if(type == 2) {
          let seriesData = []
          res.data.list.forEach((item) => {
            
            seriesData.push({
              name: item.province,
              value: item.num
            })
          })
          this.createcharts22(seriesData)
        }
      })
    },
    createcharts22(seriesData) {
      this.myChart = echarts.init(this.$refs.echarts22);
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
    },

    deletehistoryList(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
    },
    CloseHistory(val) {
      this.name = val
      this.$refs.popoverRef.hide()
    },
    openUrl() {
      window.open('https://www.wmu.edu.cn/')
    },
    goUrl(item) {
      if(item.url) {
        window.open(item.url)
      }
    },

    PushName(item) {
      // this.name = item
      // console.log(item, 3333)
      localStorage.setItem('unipro_entry', JSON.stringify(item.unipro_entry))
      this.$router.push({
        path: '/searchResultsDetails',
        query: {
          id: item.pid,
          name: item.name,
          // unipro_entry: item.unipro_entry
        }
      })
    },
    /**
     * 点击单词
     */
    postWord(item) {
      this.name = item.name
      
      this.goSearch()
    },
    /**
     * Data statistics info
     */
    getsel_home_protein_num_count() {
      sel_home_protein_num_count({}).then((res) => {
        this.proteinList = res.data.list
        this.proteinListBG = res.data.bg
      })
    },
    /**
     * 前往goBrowse列表
     */
    goBrowse(item) {
      this.$router.push({
        path: '/advancedSearchList',
        query: {
          family_id: item.id,
          type2: 1,
        }
      })
    },
    
    /**
     * 获取banner
     */
    getHomeBasicbanner_sel_detail() {
      HomeBasicbanner_sel_detail({}).then((res) => {
        this.bannerList = res.data
      })
    },
    /**
     * 浏览信息
     */
    getsel_home_info() {
      sel_home_info({}).then((res) => {
        localStorage.setItem('PVData', JSON.stringify(res.data))
        this.PVData = res.data
      })
    },
    /**
     * 前往新闻
     */
    goNews(item) {
      this.$router.push({
        path: '/hotDetails',
        query: {
          id: item.id
        }
      })
    },
    goContent(item) {
      this.$router.push({
        path: '/hotDetails',
        query: {
          id: item.id
        }
      })
    },
    /**
     * 前往更多
     */
    goReadMore() {
      localStorage.setItem('moreDetails', JSON.stringify(this.ArchiveInfo.detail_brief))
      this.$router.push({
        path: '/readMore',
      })
    },
    /**
     * news
     */
    getHomeContentsel_list() {
      HomeContentsel_list({
        pageSize: 5,
        pageIndex: 1,
      }).then((res) => {
        this.newList= res.data.list
      })
    },
    /**
     * 热门
     */
    getHomeContentsel_hot_list() {
      HomeContentsel_hot_list({
        pageSize: 3,
        pageIndex: 1,
        is_home_hot: '1',
      }).then((res) => {
        this.hotList = res.data.list
      })
    },
    /**
     * 获取关键词
     */
    getsel_key_words() {
      sel_key_words({}).then((res) => {
        this.keyword = res.data
        setTimeout(() => {
          // this.todo(res.data)
          this.$refs.todo.showText()
        }, 100)
      })
    },
    /**
     * 关键词example
     */
    getsel_key_words_example() {
      sel_key_words_example({}).then((res) => {
        this.example = res.data
      })
    },

    getquery_search_example_data() {
      query_search_example_data({
        pageSize: 9999,
        pageIndex: 1,
      }).then((res) => {
        this.example = res.data
      })
    },
    /**
     * 页面跳转
     */
    goRouter(url) {
      window.open(url)
      // this.$router.push({
      //   path: url
      // })
    },
    /**
     * 数据库简介
     */
    getsel_databases_brief() {
      sel_databases_brief({}).then((res) => {
        this.ArchiveInfo = res.data
        setTimeout(() => {
          var contentBox = document.getElementsByClassName('ql-editor')
          for(var i=0; i<contentBox.length; i++) {
            contentBox[i].setAttribute("contenteditable", false);
          }
        }, 100)
      })
    },
    /**
     * 获取友情列表
     */
    getsys_cooperate_manage_list() {
      sys_cooperate_manage_list({}).then((res) => {
        this.contributorList = res.data.list
      })
    },  
    /**
     * 打开高级搜索
     */
    openAdvancedSearch() {
      this.drawer = true
    },
    closeDrawer() {
      this.drawer = false
    },
    advancedSearch(data) {

      let list  = []
      data.list.forEach((item) => {
        if(item.options) {
          item.options.forEach((item2) => {
            if(item.name == item2.name) {
              item2.value = item.value
              list.push(item2)
            }
          })
        }
      })

      localStorage.setItem('advancedSearch',JSON.stringify(list))
      this.$router.push({
        path: '/advancedSearchList',
        query: {
          name: data.name
        }
      })
    },

    goSearch() {
      if(this.name && !this.historyList.includes(this.name)) {
        this.historyList.unshift(this.name)
        localStorage.setItem('historyList', JSON.stringify(this.historyList.slice(0, 5)))
      }
      
      this.$router.push({
        path: '/advancedSearchList',
        query: {
          name: this.name
        }
      })
    },
    /**
     * 图表渲染
     */
    createcharts(xData, seriesData) {
      this.myChart = echarts.init(this.$refs.echarts1);
      // this.myChart = $echarts.init(this.$refs[`tabEachars${index}`][0])
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
          // data: xData
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            // data: seriesData,
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barMaxWidth: '30'
          }
        ]
      };
      this.myChart.setOption(option);
    },
    /**
     * 图表渲染
     */
    createcharts2(xData, seriesData) {
      this.myChart = echarts.init(this.$refs.echarts2);
      // this.myChart = $echarts.init(this.$refs[`tabEachars${index}`][0])
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
          // data: xData
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            // data: seriesData,
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barMaxWidth: '30'
          }
        ]
      };
      this.myChart.setOption(option);
    },
  },
}
</script>

<style scoped lang='scss'>
.eachats-box {
  // border: 1px solid red;
  height: 330px;
}
.history-box {
  >div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 1px solid red;
    margin: 10px 0;
    cursor: pointer;
  }
  >div:hover {
    p {
      color: #4078f2;
    }
  }
  .Close-btn2 {
    font-size: 20px;
    cursor: pointer;
  }
}



::v-deep(.search-input) {
  .el-icon {
    font-size: 18px;
  }
}
::v-deep(.el-input__inner::placeholder) {
  font-size: 20px;
}
.Close-btn {
  font-size: 30px;
  cursor: pointer;
}
.WMU-a {
  cursor: pointer;
}
::v-deep(.ql-editor) {
  font-size: 30px !important;
}
::v-deep(.el-drawer__body) {
  padding: 0px !important;
}
::v-deep(.ql-container) {
   width: 100% !important;
}
// ::v-deep(.el-input__wrapper) {
//   box-shadow: none;
// }
.el-drawer__body {
  padding: 0px !important;
}
.ql-container {
  width: 100% !important;
}

.el-input__wrapper {
  box-shadow: none;
  
}
::v-deep(.el-progress__text) {
  span {
    color: #0097ED;
  }
}
// ::v-deep(.el-progress-circle__track) {
//       stroke: #fff; /* 设置你想要的背景色 */
//   }
  .home-box {
    position: relative;
    .carousel-box {
      position: absolute;
      top: 70px;
      height: 442px;
      z-index: -1;
      width: 100%;

      ::v-deep(.el-carousel__indicators--horizontal) {
        display: none !important;
      }
      // background: red !important;
      // border: 1px solid red;
    }
    .top-search {
      // background: url('@/assets/images/c1ad091c07bb1d96f5625549fc1e86a0@2x.png');
      background-size: 100% 100%;
      height: 512px;
      // width: 1920px;
      // border: 1px solid red;
      .mune-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;
        height: 90px;
        background: rgba(9,62,102,0.8);
        >div {
          display: flex;
          align-items: center;
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
          font-size: 16px;
        }
        color: #fff;
         >:nth-child(1) {
          p {
            font-weight: 500;
            font-size: 24px;
          }
        }
      }
     
    }
    .middle-seach {
      margin: 0 auto;
      width: 1320px;
      // width: 95%;
      // border: 1px solid red;
      .search-input-box {
        width: 100%;
        height: 190px;
        background: rgba(19,82,135,0.6);
        border-radius: 8px;
        margin-top: 30px;
        padding: 23px 50px;
        // opacity: 0.6;
        // .is-focus {
        //   box-shadow: none !important;
        //   // border: none !important;
        // }
        >:nth-child(1) {
          font-weight: 500;
          font-size: 24px;
          color: #fff;
        }
        .search-input {
          margin-top: 23px;
          display: flex;
          
          >:nth-child(1) {
            width: 1188px;
            height: 50px;
            background: #FFFFFF;
            border-radius: 4px 0px 0px 4px;
            display: flex;
            align-items: center;
            padding: 0 18px;

            ::v-deep(.el-input__wrapper) {
              box-shadow: none;
              
            }
          }
          >:nth-child(2) {
            width: 132px;
            height: 50px;
            background: #00AEFF;
            border-radius: 0px 4px 4px 0px;
            text-align: center;
            line-height: 50px;
            font-weight: 500;
            font-size: 16px;
            color:#fff;
            cursor: pointer;
          }
        }
        .search-line {
          display: flex;
          justify-content: space-between;
          color: #fff;
          font-weight: 500;
          >div {
            display: flex;
            align-items: center;
            >p {
              margin-right: 10px;
              background: #196CB1;
              // opacity: 0.8;
              padding: 4px 8px;
              border-radius: 6px;
              cursor: pointer;
            }
          }
          span {
            text-decoration: underline;
            cursor: pointer;
            // margin-right: 10px;
          }
          >:nth-child(2) {
            // text-decoration: underline;
          
            cursor: pointer;
          }
        }
      }
      .text-p {
        text-align: center;
        margin-top: 38px;
        color: #fff;
        p {
          font-size: 20px;
          font-weight: 500;
          white-space: pre-wrap;
          text-shadow: 2px 2px 4px #000000;
        }
        >:nth-of-type(1) {
          font-weight: 600;
          font-size: 46px;
        }
        >:nth-of-type(2) {
          font-weight: 600;
          font-size: 46px;
          margin-top: 12px;
        }
        >:nth-of-type(3) {
          margin-top: 12px;
          font-weight: 500;
          font-size: 26px;
        }
      }
    }
    .content-box {
      display: flex;
      justify-content: center;
      padding: 20px 40px;
      // border: 1px solid red;
      .title-1 {
        font-weight: 500;
        font-size: 24px;
      }
      .content-left {
        // border: 1px solid red;
        width: 400px;
        margin-right: 20px;
        .text-flutter {
          // width: 600px;
          // height: 358px;
          // // border: 1px solid red;
          // background: url('@/assets/images/1@2x.png') no-repeat;
          background-color: #F9F9F9;
          background-size: 100% 100%;
          margin-top: 10px;
        }
        .cooperation-box {
          margin-top: 10px;
          width: 400px;
          // height: 813px;
          background: #F9F9F9;
          padding: 25px;
          padding-bottom: 0px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          >div {
            text-align: center;
            width: 162px;
            // border: 1px solid red;
            .img-box {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              width: 162px;
              height: 80px;
              margin-bottom: 28px;
              // border: 1px solid #DCDFE6;
            }
           img {
            width: 100%;
           } 
           p {
            font-weight: 500;
            font-size: 26px;
            margin-bottom: 10px;
           }
          }
        }
        .data-show {
          margin-top: 15px;
          // height: 159px;
          background: #F9F9F9;
          text-align: center;
          padding-bottom: 15px;
          >p {
            font-size: 16px;
            color: #000000;
            margin-top: 20px;
          }
          >div{
            display: flex;
            justify-content: space-around;
            >div {
              >:nth-child(1) {
                margin-top: 30px;
                color: #999999;
                font-size: 16px;
              }
              >:nth-child(2) {
                font-weight: 500;
                font-size: 26px;
              }
            }
          }
        }
      }
      .content-right {
        width: 900px;
        .intro-box {
          width: 100%;
          max-width: 900px;
          background: #F9F9F9;
          padding: 0px 12px;
          // word-wrap: break-word;
          word-wrap: break-word;
          position: relative;
          padding-bottom: 10px;
          ::v-deep(.ql-container.ql-snow) {
            border: none;
          }
          .Read-more {
            margin-top: 20px;
            width: 112px;
            height: 40px;
            background: #00AEFF;
            border-radius: 4px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            position: absolute;
            right: 30px;
          }
          // word-break: normal;   
        }
        .proteinList-BG {
          margin-top: 20px;
          width: 100%;
          img {
            width: 100%;
          }
        }
        .statistics-info-box {
          .ratio-box {
            // border: 1px solid red;
            cursor: pointer;
            margin-bottom: 10px;
            position: relative;
            :deep(svg > path:nth-child(2)) {
              stroke: url(#yellow);
            }
            
          }
          .ratio-box:hover {
            >:nth-child(1) {
              transform: scale(1.3); /* 鼠标悬停时放大到1.2倍 */
            }
            // svg {
              
            // }
            // transform: scale(1.5); /* 鼠标悬停时放大到1.2倍 */
            position: relative;
            z-index: 9999 !important;
            // border: 1px solid red;
            // background: #fff;
            border-radius: 20px;
            >p {
              z-index: 9999 !important;
              color: #01A9FD;
              // padding:  0 40px;
            }
          }
          >img{
            width: 200px;
          }
          border-radius: 4px;
          border: 1px solid #DCDFE6;
          padding: 10px;
          display: flex;
          align-items: center;
          >div {
            // border: 1px solid red;
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            >div {
              text-align: center;
              // border: 1px solid red;
              margin-top: 10px;
              width: 25%;
              margin-bottom: 20px;

            }
          }
          // .statistics-info-line {
          //   display: flex;
          //   img {
          //     width: 190px;
          //     height: auto;
          //   }
          // }
        }
        .echarts-box {
          width: 500px;
          height: 200px;
        }
        .bottom-box {
          width: 900px;
          display: flex;
          margin-top: 20px;
          >:nth-child(1) {
            margin-right: 20px;
          }
          .bottom-box-line {
            >:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: space-between;
              >div {
                display: flex;
                align-items: center;
                cursor: pointer;
                img {
                  width: 13px;
                  height: 12px;
                }
              }
            }
          }
          .bottom-box-line2 {
            // width: 100% !important;
          }
          .bottom-box-line-bottom {
            img {
              width: 390px;
              height: 220px;
              margin-top: 15px;
            }
          }
          .bottom-box-line-bottom2 {
            width: 100%;
            margin-top: 10px;
            >div {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 16px;
              
              >:nth-child(1) {
                // width: calc(100vw - 1600px);
                width: 350px;
                white-space: nowrap; /* 不换行 */
                overflow: hidden; /* 隐藏超出的内容 */
                text-overflow: ellipsis; /* 用省略号表示被隐藏的部分 */
                font-size: 18px;
              }
              :nth-child(2) {
                // border: 1px solid red;
                width: 140px;
                text-align: right;
              }
              
            }
            // width: 400px !important;
          }
        }
      }
    }

    .page-bottom-box {
      height: 473px;
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
        display: flex;
        color: #fff;
        margin-top: 40px;
        margin-bottom: 40px;
        >div {
          text-align: left;
          margin-right: 40px;
          max-width: 250px;
          color: #959595;
          >p {
            margin-bottom: 20px;
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
  }

.text-flutter {
  width: 400px;
  height: 320px;
  // border: 1px solid red;
  // background: linear-gradient(90deg, #0047ab, #0f52ba); /* 渐变背景 */
  font-family: Arial, sans-serif;
  overflow: hidden;
  border-radius: 10px;
}

.word-cloud {
    position: relative;
    // width: 604px;
    // height: 358px;
}

::v-deep(.word-cloud) {
  position: relative;
}

::v-deep(.word) {
  cursor: pointer;
    position: absolute;
    color: white; /* 字体颜色 */
    font-weight: bold;
    white-space: nowrap;
    transform: rotate(0deg); /* 保持水平 */
    animation: blink 6s infinite;
}

.word {
    cursor: pointer;
    position: absolute;
    color: white; /* 字体颜色 */
    font-weight: bold;
    white-space: nowrap;
    transform: rotate(0deg); /* 保持水平 */
    animation: blink 6s infinite;
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}


.read-more-1 {
  display: flex;
  align-items: center;
  // border: 1px solid red;
  justify-content: flex-end;
  cursor: pointer;
  img {
    width: 12px;
  }
}
</style>
