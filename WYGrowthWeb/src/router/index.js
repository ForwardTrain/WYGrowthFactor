import { createRouter, beforeEach, createWebHistory } from 'vue-router'
import Layout from '@/components/layout'

import global from '../utils/global'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('views/home/index.vue')
  },
  {
    path: '/todo2',
    name: 'todo2',
    component: () => import('views/home/todo.vue')
  },
  {
    path: '/todo3',
    name: 'todo3',
    component: () => import('views/home/todo2.vue')
  },
  
  {
    path: '/searchResultsDetails', // 高级搜索详情
    name: 'searchResultsDetails',
    component: () => import('views/home/searchResults/details.vue')
  },
  {
    path: '/Drug', // 高级搜索详情
    name: 'Drug',
    component: () => import('views/home/Drug')
  },

  {
    path: '/advancedSearchList', // 搜索结果列表
    name: 'advancedSearchList',
    component: () => import('views/home/advancedSearch/list.vue')
  },

  
  {
    path: '/hotList', // 热门
    name: 'hotList',
    component: () => import('views/home/hot/list.vue')
  },
  {
    path: '/hotDetails', // 热门详情
    name: 'hotDetails',
    component: () => import('views/home/hot/details.vue')
  },
  {
    path: '/imageText', // 图文
    name: 'imageText',
    component: () => import('views/home/hot/imageText.vue')
  },
  {
    path: '/feedbackList', // 反馈
    name: 'feedbackList',
    component: () => import('views/home/feedback/list.vue')
  },
  {
    path: '/feedbackAdd', // 新增反馈
    name: 'feedbackAdd',
    component: () => import('views/home/feedback/add.vue')
  },
  {
    path: '/helpList', // 帮助
    name: 'helpList',
    component: () => import('views/home/help/list.vue')
  },

  {
    path: '/helpDetails', // 帮助详情
    name: 'helpDetails',
    component: () => import('views/home/help/details.vue')
  },

  {
    path: '/Browse', // Browse
    name: 'Browse',
    component: () => import('views/home/Browse')
  },
  {
    path: '/tools', // tools
    name: 'tools',
    component: () => import('views/home/tools')
  },
  {
    path: '/toolsResults', // tools
    name: 'toolsResults',
    component: () => import('views/home/tools/toolResults')
  },
  {
    path: '/resultPage', // tools
    name: 'resultPage',
    component: () => import('views/home/tools/result')
  },
  
  {
    path: '/InformationStatistics', // 统计信息
    name: 'InformationStatistics',
    component: () => import('views/home/InformationStatistics')
  },

  {
    path: '/clinical', // 临床
    name: 'clinical',
    component: () => import('views/home/clinical')
  },
  {
    path: '/clinicalDetails', // 临床
    name: 'clinicalDetails',
    component: () => import('views/home/clinical/details')
  },
  {
    path: '/GeenMedical', // GeenMedical
    name: 'GeenMedical',
    component: () => import('views/home/GeenMedical')
  },
  {
    path: '/lens', // GeenMedical
    name: 'lens',
    component: () => import('views/home/lens')
  },
  {
    path: '/AboutUs', // aboutUs
    name: 'AboutUs',
    component: () => import('views/home/aboutUs/list.vue')
  },
  {
    path: '/disclaimer', // aboutUs
    name: 'disclaimer',
    component: () => import('views/home/disclaimer')
  },
  {
    path: '/readMore',
    name: 'readMore',
    meta: { title: '查看更多' },
    component: () => import('views/home/readMore')
  },

  





  {
    path: '/login',
    name: 'login',
    component: () => import('views/login')
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    meta: { title: '', },
    children: [
      // {
      //   path: '/notice',
      //   name: 'notice',
      //   meta: { title: '工作台' },
      //   component: () => import('views/notice')
      // },

      // {
      //   path: '/workbench',
      //   name: 'workbench',
      //   meta: { title: '工作台' },
      //   component: () => import('views/workbench/workbench')
      // },
      // {
      //   path: '/todo2',
      //   name: 'todo2',
      //   meta: { title: '数据统计' },
      //   component: () => import('views/home/newDetails/list')
      // },

      {
        path: '/dataDetails',
        name: 'dataDetails',
        meta: { title: '数据统计' },
        component: () => import('views/home/newDetails/add')
      },

      {
        path: '/dataStatistics',
        name: 'dataStatistics',
        meta: { title: '数据统计' },
        component: () => import('views/dataStatistics')
      },
      {
        path: '/bannerList',
        name: 'bannerList',
        meta: { title: 'bannerList' },
        component: () => import('views/bannerList')
      },

      {
        path: '/wordCloud',
        name: 'wordCloud',
        meta: { title: '词云管理' },
        component: () => import('views/searchManagement/wordCloud')
      },
      {
        path: '/examples',
        name: 'examples',
        meta: { title: 'examples' },
        component: () => import('views/searchManagement/Examples')
      },
      {
        path: '/search',
        name: 'search',
        meta: { title: '搜索管理' },
        component: () => import('views/searchManagement/search')
      },
      {
        path: '/searchAuthority',
        name: 'searchAuthority',
        meta: { title: '搜索权限' },
        component: () => import('views/searchManagement/searchAuthority')
      },
      {
        path: '/searchAuthoritySet',
        name: 'searchAuthoritySet',
        meta: { title: '搜索权限设置' },
        component: () => import('views/searchManagement/searchAuthoritySet')
      },
      {
        path: '/hotManagement',
        name: 'hotManagement',
        meta: { title: '热门管理' },
        component: () => import('views/contentManagement/hotManagement')
      },
      {
        path: '/graphicManagement',
        name: 'graphicManagement',
        meta: { title: '图文管理' },
        component: () => import('views/contentManagement/graphicManagement')
      },
      {
        path: '/imageTextAdd',
        name: 'imageTextAdd',
        meta: { title: '图文列表新增' },
        component: () => import('views/contentManagement/graphicManagement/page2Add')
      },
      {
        path: '/videoContent',
        name: 'videoContent',
        meta: { title: '视讯内筒' },
        component: () => import('views/contentManagement/videoContent')
      },
      {
        path: '/videoContentAdd',
        name: 'videoContentAdd',
        meta: { title: '视讯内筒' },
        component: () => import('views/contentManagement/videoContent/page2Add')
      },
      {
        path: '/aboutUs2',
        name: 'aboutUs2',
        meta: { title: '关于我们' },
        component: () => import('views/contentManagement/aboutUs')
      },
      {
        path: '/aboutUsAdd',
        name: 'aboutUsAdd',
        meta: { title: '关于我们' },
        component: () => import('views/contentManagement/aboutUs/page2Add')
      },
      {
        path: '/helpDocument',
        name: 'helpDocument',
        meta: { title: '帮助文档' },
        component: () => import('views/contentManagement/helpDocument')
      },
      {
        path: '/helpDocumentAdd',
        name: 'helpDocumentAdd',
        meta: { title: '帮助文档' },
        component: () => import('views/contentManagement/helpDocument/page2Add')
      },
      {
        path: '/feedbackManagement',
        name: 'feedbackManagement',
        meta: { title: '帮助文档' },
        component: () => import('views/contentManagement/feedbackManagement')
      },
      {
        path: '/replyFeedback',
        name: 'replyFeedback',
        meta: { title: '帮助文档' },
        component: () => import('views/contentManagement/feedbackManagement/replyFeedback')
      },
      {
        path: '/customerList',
        name: 'customerList',
        meta: { title: '客户列表' },
        component: () => import('views/customerManagement/customerList')
      },

      {
        path: '/dataAcquisition',
        name: 'dataAcquisition',
        meta: { title: '数据采集' },
        component: () => import('views/dataManagement/dataAcquisition')
      },
      {
        path: '/backupManagement',
        name: 'backupManagement',
        meta: { title: '备份数据' },
        component: () => import('views/dataManagement/backupManagement')
      },
      // {
      //   path: '/dataManagement',
      //   name: 'dataManagement',
      //   meta: { title: '数据管理' },
      //   component: () => import('views/dataManagement/dataManagement')
      // },

      {
        path: '/dataManagement',
        name: 'dataManagement',
        meta: { title: '数据统计' },
        component: () => import('views/home/newDetails/list')
      },

    
      {
        path: '/categoryManagement',
        name: 'categoryManagement',
        meta: { title: '类别管理' },
        component: () => import('views/dataManagement/categoryManagement')
      },
      {
        path: '/addData',
        name: 'addData',
        meta: { title: '新建数据' },
        component: () => import('views/dataManagement/dataManagement/addData')
      },
      {
        path: '/addData2',
        name: 'addData2',
        meta: { title: '新建数据' },
        component: () => import('views/dataManagement/dataManagement/addData2')
      },
      {
        path: '/updateData',
        name: 'updateData',
        meta: { title: '更新数据' },
        component: () => import('views/dataManagement/dataManagement/updateData')
      },
      {
        path: '/dataUpdata',
        name: 'dataUpdata',
        meta: { title: '数据更新' },
        component: () => import('views/dataManagement/dataManagement/dataUpdata')
      },
      {
        path: '/dataCompare',
        name: 'dataCompare',
        meta: { title: '数据对比' },
        component: () => import('views/dataManagement/dataManagement/dataCompare')
      },

      {
        path: '/lookDetails',
        name: 'lookDetails',
        meta: { title: '查看数据' },
        component: () => import('views/dataManagement/dataManagement/lookDetails')
      },

      
      
      
      
      

      {
        path: '/systemInformation',
        name: 'systemInformation',
        meta: { title: '系统信息' },
        component: () => import('views/systemManagement/systemInformation')
      },

      {
        path: '/organizationManagement',
        name: 'organizationManagement',
        meta: { title: '组织管理' },
        component: () => import('views/systemManagement/organizationManagement')
      },

      {
        path: '/roleManagement',
        name: 'roleManagement',
        meta: { title: '角色管理' },
        component: () => import('views/systemManagement/roleManagement')
      },

      {
        path: '/personnelManagement',
        name: 'personnelManagement',
        meta: { title: '人员管理' },
        component: () => import('views/systemManagement/personnelManagement')
      },

      {
        path: '/menuManagement',
        name: 'menuManagement',
        meta: { title: '菜单系统' },
        component: () => import('views/systemManagement/menuManagement')
      },

      {
        path: '/systemParameter',
        name: 'systemParameter',
        meta: { title: '系统参数' },
        component: () => import('views/systemManagement/systemParameter')
      },
      
      {
        path: '/clinicaltrials',
        name: 'clinicaltrials',
        meta: { title: 'clinicaltrials平台' },
        component: () => import('views/literatureManagement/clinicaltrials')
      },
      {
        path: '/TheLens2',
        name: 'TheLens2',
        meta: { title: 'TheLens平台' },
        component: () => import('views/literatureManagement/TheLens')
      },
      {
        path: '/GeenMedical2',
        name: 'GeenMedical2',
        meta: { title: 'GeenMedical平台' },
        component: () => import('views/literatureManagement/GeenMedical')
      },
      
   
      
      
      
      

    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {


  console.log('Global beforeEach guard: from', from.path, 'to', to.path);
  global.sel_view_recode(to.path)
  let localStorageDay = localStorage.getItem('today')
  if(localStorageDay != global.today) {
    global.homeBasicInfo()  
  }
  

  next(); // 必须调用 next()，否则路由不会跳转


});





export default router
