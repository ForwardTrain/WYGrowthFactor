<template>
  <div class="help-box">
    <top></top>
    <img class="top-img" src="@/assets/images/topimg2.png" alt="">

    <div>
      <div class="search-top">
        <p>Home > Help</p>

        <div>
          <p>Help</p>

          <div class="search-input">
            <div>
              <el-icon><Search /></el-icon>

              <el-popover placement="bottom" v-if="historyList && historyList.length" ref="popoverRef" :width="400" trigger="click">
                <template #reference>
                  <el-input  v-model="name" placeholder="Search" />
                </template>
                <div class="history-box">
                  <div @click="CloseHistory(item)" v-for="(item, index) in historyList" :key="index" >
                    <p  >{{item}}</p>
                    <el-icon class="Close-btn2" @click.stop="deletehistoryList(index)"><Close /></el-icon>
                  </div>
                </div>
              </el-popover>

              <el-input v-else  v-model="name" placeholder="Search" />
            </div>
            <div @click="getHomeContentsel_list2">Search</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-left">
        <div v-for="(item, index) in letfList" :key="index" @click="chooseType(item)">
          <div :style="itemName == item.name ? 'background-color: #00AEFF;' : ''">{{item.name}}</div>
          <div v-for="(item2, index2) in item.children" :key="index2" @click="chooseType(item2)" :style="itemName == item2.name ? 'color: #00AEFF' : ''">
            {{item2.name}}
          </div>
        </div>
        
        
      </div>
      <div class="content-right" v-if="rightList.length">
        <div class="article-box" v-for="(item, index) in rightList" :key="index" @click="goDetails(item)">
          <div>{{item.name}}<el-icon style="cursor: pointer;" v-if="item.show" @click.stop="item.show = !item.show"><CaretBottom /></el-icon> <el-icon style="cursor: pointer;" @click.stop="item.show = !item.show" v-else><CaretTop /></el-icon></div>
          <div v-show="item.show">
            <p>{{item.brief}}</p>
          </div>
        </div>
      </div>

      <div class="content-right" v-else >
        <div class="no-data">
          No data available
        </div>
      </div>

    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'

import {
  HomeContentsel_list,
  sel_item_list
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      name: '',
      letfList: [],
      itemName: '',
      rightList: [],
      historyList: [],
    }
  },
  mounted() {
    if(localStorage.getItem('historyList5')) {
      this.historyList = JSON.parse(localStorage.getItem('historyList5'))
    }
    this.getsel_item_list()
  },
  methods: {
    deletehistoryList(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('historyList5', JSON.stringify(this.historyList))
    },
    CloseHistory(val) {
      this.name = val
      this.$refs.popoverRef.hide()
    },

    goDetails(item) {
      this.$router.push({
        path: '/helpDetails',
        query: {
          id: item.id
        }
      })
    },
    /**
     * 选择栏目
     */
    chooseType(item) {
      console.log(item, 999)
      this.itemName = item.name
      this.getHomeContentsel_list()
    },
    getsel_item_list() {
      sel_item_list({
        type: 4,
        pageSize: 9999,
        pageIndex: 1,
      }).then((res) => {
        this.letfList = res.data.list
        if(res.data.list.length && res.data.list[0].children && res.data.list[0].children.length) {
          this.itemName = res.data.list[0].children[0].name
          
        }
        this.getHomeContentsel_list2()
      })
    },
    getHomeContentsel_list2() {
      if(this.name && !this.historyList.includes(this.name)) {
        this.historyList.unshift(this.name)
        localStorage.setItem('historyList5', JSON.stringify(this.historyList.slice(0, 5)))
      }
      HomeContentsel_list({
        type: 4,
        name: this.name,
        item_name: '',
        pageSize: 9999,
        pageIndex: 1,
      }).then((res) => {
        res.data.list.forEach((item) => {
          item.show = true
        })
        this.rightList = res.data.list
      })
    },
    /**
     * 左侧数据
     */
    getHomeContentsel_list() {
      HomeContentsel_list({
        type: 4,
        name: this.name,
        item_name: this.itemName,
        pageSize: 9999,
        pageIndex: 1,
      }).then((res) => {
        res.data.list.forEach((item) => {
          item.show = true
        })
        this.rightList = res.data.list
      })
    }
  },
}
</script>

<style scoped lang='scss'>
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
  .help-box {
    background: #F0F4F7;
    .top-img {
      // height: 350px;
      width: 100%;
    }
    .search-top {
      width: 1420px;
      margin: 0 auto;
      >p {
        color: #B5B5B5;
        margin-top: 15px;
      }
      >div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        >p {
          font-weight: 500;
          font-size: 24px;
        }
      }
      .search-input {
        display: flex;
        >:nth-child(1) {
          width: 417px;
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
    }
    .no-data {
      text-align: center;
      color: #B5B5B5;
      margin-top: 100px;
      margin-bottom: 100px;
    }
    .content-box {
      width: 1400px;
      margin: 0 auto;
      display: flex;
      margin-top: 15px;
      .content-left{
        margin-right: 10px;
        
        >div {
          width: 200px;;
          min-width: 200px;;
          margin-bottom: 15px;
          >div {
            width: 200px;
            height: 50px;
            padding: 0 15px;
            line-height: 50px;
            cursor: pointer;
            background: #fff;
          }
          >:nth-child(1) {
            // cursor: default;
            line-height: 50px;
            padding: 0 10px;
            color: #fff;
            width: 200px;
            height: 50px;
            background: #166AA9;
          }
        }
        // div {
        //   line-height: 50px;
        //   padding: 0 15px;
        //   cursor: pointer;
        //   height: 50px;
        //   width: 200px;
        //   background: #fff;
        // }
        
      }
      .content-right {
        width: 100%;
        .article-box {
          cursor: pointer;
          background: #fff;
          margin-bottom: 20px;
          >:nth-child(1) {
            height: 62px;
            line-height: 62px;
            background: #FFFFFF;
            padding: 0 15px;
            border-bottom: 1px solid #DCDFE6;
            display: flex;
            align-items: center;
          }
          >:nth-child(2) {
            padding: 20px;
          }
        }
      }
    }
  }
</style>
