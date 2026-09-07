<template>
  <div class="nav-bar">

    <div class="nav-switch">
      <img  v-show="isCollapse" @click="closeNav" src="@/assets/images/nav-pack.png" alt="">
      <img  v-show="!isCollapse" @click="closeNav" src="@/assets/images/nav-unfold.png" alt="">
    </div>

    <div class="menu-list-box">
      <el-menu
        :default-active="menuIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @select="selectMenu"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true">
        <div v-for="(item, index) in menuList"
            :key="index">
          <el-menu-item :style="index == menuIndex1 ? 'background: #fff;color: #000;' : ''" :index="`${index}`" @click="urlClick(item, index, 0)" v-if="!item.children || !item.children.length">
            <el-icon>
              <img v-if="index == menuIndex1" class="menu-icon" :src="item.sel_picture_url" alt="">
              <img v-else class="menu-icon" :src="item.picture_url" alt="">
            </el-icon>
            <template #title>{{item.name}} </template>
          </el-menu-item>

          <el-sub-menu
            v-else
            :index="`${index}`"
            :class="index == menuIndex1 ? 'todo' : ''">
            <template #title >
              <el-icon>
                <img v-if="index == menuIndex1" class="menu-icon" :src="item.sel_picture_url" alt="">
                <img v-else class="menu-icon" :src="item.picture_url" alt="">
              </el-icon>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item 
                v-for="(item2, index2) in item.children"
                :key="index2"
                @click="urlClick(item2, index, index2)"
                :index="`${index}-${index2}`">{{item2.name}}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </div>
        
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuIndex: '0-0',
      menuIndex1: '0',
      isCollapse: false,

      menuList: [
        {
          name: '数据统计',
          sel_picture_url: require("@/assets/images/xicon-home-2.png"),
          picture_url: require("@/assets/images/icon-home-2.png"),
          absolute_url: '/dataStatistics'
        },
      
        {
          name: 'BANNER管理',
          sel_picture_url: require("@/assets/images/xicon-home-3.png"),
          picture_url: require("@/assets/images/icon-home-3.png"),
          absolute_url: '/bannerList'
        },
        {
          name: '搜索管理',
          sel_picture_url: require("@/assets/images/xicon-home-4.png"),
          picture_url: require("@/assets/images/icon-home-4.png"),
          children: [
            {
              name: 'examples',
              absolute_url: '/examples'
            },
            {
              name: '词云管理',
              absolute_url: '/wordCloud'
            },
            {
              name: '搜索管理',
              absolute_url: '/search'
            },
            // {
            //   name: '搜索权限',
            //   absolute_url: '/searchAuthority'
            // },
            
          ]
        },
        {
          name: '内容管理',
          sel_picture_url: require("@/assets/images/xicon-home-5.png"),
          picture_url: require("@/assets/images/icon-home-5.png"),
          children: [
            {
              name: '热门管理',
              absolute_url: '/hotManagement'
            },
            {
              name: '资讯管理',
              absolute_url: '/graphicManagement'
            },
            // {
            //   name: '视讯内容',
            //   absolute_url: '/videoContent'
            // },
            {
              name: '关于我们',
              absolute_url: '/aboutUs2'
            },
            {
              name: '帮助文档',
              absolute_url: '/helpDocument'
            },
            {
              name: '反馈管理',
              absolute_url: '/feedbackManagement'
            },
            
          ]
        },
        {
          name: '客户管理',
          sel_picture_url: require("@/assets/images/xicon-home-10.png"),
          picture_url: require("@/assets/images/icon-home-10.png"),
          children: [
            {
              name: '客户列表',
              absolute_url: '/customerList'
            },
          ]
        },

        // {
        //   name: '数据管理',
        //   sel_picture_url: require("@/assets/images/xicon-home-6.png"),
        //   picture_url: require("@/assets/images/icon-home-6.png"),
        //   children: [
        //     {
        //       name: '数据管理',
        //       absolute_url: '/dataManagement'
        //     },
        //     // {
        //     //   name: '备份管理',
        //     //   absolute_url: '/backupManagement'
        //     // },
        //     {
        //       name: '历史版本',
        //       absolute_url: '/updateData'
        //     },
        //     // {
        //     //   name: '数据采集',
        //     //   absolute_url: '/dataAcquisition'
        //     // },
        //   ]
        // },
        {
          name: '数据管理',
          sel_picture_url: require("@/assets/images/xicon-home-7.png"),
          picture_url: require("@/assets/images/icon-home-7.png"),
          children: [
            {
              name: '数据管理',
              absolute_url: '/dataManagement'
            },
            // {
            //   name: '备份管理',
            //   absolute_url: '/backupManagement'
            // },
            {
              name: '历史版本',
              absolute_url: '/updateData'
            },
            {
              name: '家族管理',
              absolute_url: '/categoryManagement'
            },
            // {
            //   name: '数据采集',
            //   absolute_url: '/dataAcquisition'
            // },
          ]
        },
        {
          name: '文献管理',
          sel_picture_url: require("@/assets/images/xicon-home-8.png"),
          picture_url: require("@/assets/images/icon-home-8.png"),
          children: [
            {
              name: 'clinicaltrials平台',
              absolute_url: '/clinicaltrials'
            },
            {
              name: 'TheLens平台',
              absolute_url: '/TheLens2'
            },
            {
              name: 'GeenMedical平台',
              absolute_url: '/GeenMedical2'
            },
            // {
            //   name: '区域管理',
            //   absolute_url: '/organizationManagement'
            // },
            // {
            //   name: '角色管理',
            //   absolute_url: '/roleManagement'
            // },{
            //   name: '人员管理',
            //   absolute_url: '/personnelManagement'
            // },{
            //   name: '菜单管理',
            //   absolute_url: '/menuManagement'
            // }
          ]
        },
        {
          name: '系统管理',
          sel_picture_url: require("@/assets/images/xicon-home-9.png"),
          picture_url: require("@/assets/images/icon-home-9.png"),
          children: [
            {
              name: '系统信息',
              absolute_url: '/systemInformation'
            },
            // {
            //   name: '区域管理',
            //   absolute_url: '/organizationManagement'
            // },
            {
              name: '角色管理',
              absolute_url: '/roleManagement'
            },{
              name: '人员管理',
              absolute_url: '/personnelManagement'
            },{
              name: '菜单管理',
              absolute_url: '/menuManagement'
            },{
              name: '系统参数',
              absolute_url: '/systemParameter'
            }
          ]
        },
        
      ]
      // menuList: []
    }
  },
  mounted() {
    if(localStorage.getItem('menuList')) {
      // this.menuList = JSON.parse(localStorage.getItem('menuList'))
    }
    if(localStorage.getItem('menuIndex')) {
      this.menuIndex = localStorage.getItem('menuIndex')
    }
    // this.selectMenu(localStorage.getItem('menuIndex'))
    if(this.$route.query.showWork == 1){
      this.isCollapse = true
    }
  },
  methods: {
    selectMenu(item) {
      let list = item.split('-')
      if(list[0]) {
        this.menuIndex1 = list[0]
      } else {
        this.menuIndex1 = item.slice(0, 1)
      }
      // this.menuIndex1 = item.slice(0, 1)
    },
    /**
     * 页面点击
     */
    urlClick(item, index, index2) {
      if(item.absolute_url == '/workbench') {
        this.isCollapse = true
        this.$store.commit("changeNavWidth", !this.isCollapse)
      }

      localStorage.setItem('menuIndex', `${index}-${index2}`)
      this.$store.commit("setRouterList",{
        name: item.name,
        url: item.absolute_url,
        // query: {
        //   id: row.id
        // }
      })
      this.$router.push({
        path: item.absolute_url
      })
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    closeNav() {
      this.$store.commit("changeNavWidth", this.isCollapse)
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style scoped lang='scss'>
  .popper-class1 {
    border: 1px solid red;
    background: red;
  }
  
  ::v-deep(.el-menu) {
    background: #0167EC;
    --el-menu-border-color: none !important;
    
    .el-icon svg  {
      width: 16px !important;
      height: 16px !important;
    }
    
    .el-sub-menu__title {
      border-radius: 8px;
      height: 40px;
      border-radius: 8px !important;
      margin-top: 20px;
      span {
        display: inline-block;
        width: 131px;
        color: #fff !important;
        font-weight: 500;
        font-size: 15px;
      }
      i {
        color: #fff !important;
      }
    }
    .el-sub-menu__title:hover {
      background: none !important;
    }


    .el-menu-item {
      color: #fff;
      font-size: 15px;
      height: 40px;
      margin: 10px 0;
      border-radius: 8px;
      
      cursor: pointer !important; 
    }
    .el-menu-item-group {
      ul {
        .is-active {
         
          background: #318AFD;
        }
      }
    }
    .el-menu-item:hover {
      background: none;

    }
    .el-sub-menu__title:hover {
      background: none !important;
    }
    .el-menu-item.is-active {
      background: #fff ;
      border-radius: 8px;
      border-bottom-color: #fff !important;
      color: #000 !important;
      
    }
    .el-sub-menu.is-active .el-sub-menu__title{
      background: #fff ;
      border-radius: 8px;
      border-bottom-color: #fff !important;
      span {
        color: #000 !important;
      }
      .el-icon svg  {
        color: #000 !important;
      }
    }
    .el-sub-menu.is-active .el-sub-menu__title:hover{
      background: #fff !important;
    
    }
  }

  .todo {
    border-radius: 8px;
    ::v-deep(.el-sub-menu__title) {
      background: #fff !important;
      span {
        color: #000 !important;
      }
      .el-icon svg  {
        color: #000 !important;
      }
    }
    ::v-deep(.el-sub-menu__title):hover {
      background: #fff !important;
    }
  }
  .menu-icon {
    width: 16px;
    height: 16px;
  }
  .nav-bar {
    padding: 15px;
    background: #0167EC;
    height: calc(100vh - 60px);
    
  }
  .menu-list-box {
    margin-top: 10px;
    height: calc(100vh - 110px);
    overflow: auto;
  }
  .nav-switch {
    text-align: center;
    img {
      width: 18px;
      height: 15px;
      cursor: pointer;
    }
  }
  // ::v-deep(.el-popper) {
  //   background: red !important;
  // }
  // .el-popper{
  //   border-color: red !important;
  //   background: red !important;
  //   .el-menu-item-group {
  //     background: red !important;
  //   }
  //   .el-menu-item {
  //     background: green !important;
  //     color: red !important;
  //   }
  //   color: red;
  //   background: red;
  // }
</style>
