import Request from '@/utils/api'

//  七牛云token
export const  sel_qiniu_token = (params) => Request.post('/WZGrowth/SysAdmin/sel_qiniu_token', params)

//  系统信息
export const  sys_info = (params) => Request.post('/WZGrowth/SysBasic/sys_info', params)


// 登入
export const  login = (params) => Request.post('/WZGrowth/SysAdmin/login', params)


// 岗位
export const  SysBasicToolChina = (params) => Request.post('/WZGrowth/SysBasicTool/china', params)

// 基础信息 - 详情
export const  sel_org_info = (params) => Request.post('/WZGrowth/SysBasic/detail', params)

// 基础信息 - 更新 这个换成 SysBasic
export const  update_org_info = (params) => Request.post('/WZGrowth/SysOrgDept/update_org_info', params)

// 班级 -状态变更
export const  roleList = (params) => Request.post('/WZGrowth/SysRole/all/list', params)

// 班级 -状态变更
export const  roleListDelete = (params) => Request.post('/WZGrowth/SysRole/delete', params)

// 班级 -状态变更
export const  roleListAdd = (params) => Request.post('/WZGrowth/SysRole/add', params)

// 班级 -状态变更
export const  roleListUpdate = (params) => Request.post('/WZGrowth/SysRole/update', params)

// 菜单列表
export const  SysMenuAllMenu = (params) => Request.post('/WZGrowth/SysMenu/all/menu', params)

// 菜单列表
export const  SysEnterpriseb_list = (params) => Request.post('/WZGrowth/SysAdmin/sys_account_list', params)

// 岗位
export const  update_state_sys_account = (params) => Request.post('/WZGrowth/SysAdmin/update_state_sys_account', params)

// 岗位
export const  edit_sys_account_list = (params) => Request.post('/WZGrowth/SysAdmin/edit_sys_account_list', params)

// 删除
export const  b_listDel = (params) => Request.post('/WZGrowth/SysAdmin/del_sys_account_list', params)

// 岗位
export const  sel_sys_account_list_edit_option_job = (params) => Request.post('/WZGrowth/SysAdmin/sel_sys_account_list_edit_option_job', params)


// 菜单列表
export const  SysMenuAllMenuDelete = (params) => Request.post('/WZGrowth/SysMenu/delete', params)

// 菜单列表
export const  SysMenuAllMenuAdd = (params) => Request.post('/WZGrowth/SysMenu/add', params)

// 菜单列表
export const  SysMenuAllMenuUpdate = (params) => Request.post('/WZGrowth/SysMenu/update', params)

// 受访页面统计
export const  sel_browser_page_count_data = (params) => Request.post('/WZGrowth/BizCount/sel_browser_page_count_data', params)

// 流量概况
export const  sel_count_data = (params) => Request.post('/WZGrowth/BizCount/sel_count_data', params)

// 浏览器访问量统计
export const  sel_browser_count_data = (params) => Request.post('/WZGrowth/BizCount/sel_browser_count_data', params)

// 数据库
export const  sel_literature_count_data = (params) => Request.post('/WZGrowth/BizCount/sel_literature_count_data', params)

// 地域概况
export const  sel_area_count_data = (params) => Request.post('/WZGrowth/BizCount/sel_area_count_data', params)

// banner详情
export const  banner_sel_detail = (params) => Request.post('/WZGrowth/Banner/banner_sel_detail', params)

// banner详情更新
export const  banner_upd = (params) => Request.post('/WZGrowth/Banner/banner_upd', params)

// 客户列表
export const  sel_customer_list = (params) => Request.post('/WZGrowth/BizCount/sel_customer_list', params)

// 客户列表 - 启、禁用
export const  upd_customer_status = (params) => Request.post('/WZGrowth/BizCount/upd_customer_status', params)

// 客户列表 - 访问记录
export const  sel_customer_list_recode = (params) => Request.post('/WZGrowth/BizCount/sel_customer_list_recode', params)

// 词云管理列表
export const  sel_list = (params) => Request.post('/WZGrowth/SearchWord/sel_list', params)


// 词云管理列表-删除
export const  del_list = (params) => Request.post('/WZGrowth/SearchWord/del_list', params)

// 词云管理列表-新增更新
export const  add_upd_list = (params) => Request.post('/WZGrowth/SearchWord/add_upd_list', params)

// 帮助详情
export const  sel_list_details = (params) => Request.post('/WZGrowth/HomeContent/sel_list_details', params)

// Brewer 左侧列表
export const  search_combobox = (params) => Request.post('/WZGrowth/HomeContent/search_combobox', params)

// 浏览信息
export const  sel_home_info = (params) => Request.post('/WZGrowth/HomeBasic/sel_home_info', params)

// 关乎我们
export const  sel_contact_us = (params) => Request.post('/WZGrowth/HomeBasic/sel_contact_us', params)

// 搜索结果列表--下拉框搜索
export const  search_result_list = (params) => Request.post('/WZGrowth/HomeContent/search_result_list', params)

// 搜索下拉框
export const  HomeContentSearch_combobox2 = (params) => Request.post('/WZGrowth/HomeContent/search_combobox2', params)

// 蛋白详情，
export const  sel_search_details = (params) => Request.post('/WZGrowth/HomeContent/sel_search_details', params)

// 系统参数 - 列表
export const  sel_sys_params_list = (params) => Request.post('/WZGrowth/SysBasic/sel_sys_params_list', params)











// 栏目列表
export const  Itemsel_list = (params) => Request.post('/WZGrowth/Item/sel_list', params)

// 栏目列表-删除
export const  Itemdel_list = (params) => Request.post('/WZGrowth/Item/del_list', params)

// 新增更新栏目
export const  Itemadd_upd_list = (params) => Request.post('/WZGrowth/Item/add_upd_list', params)

// 上级栏目下拉框
export const  Itemp_item_list = (params) => Request.post('/WZGrowth/Item/p_item_list', params)




// 列表
export const  Contentsel_list = (params) => Request.post('/WZGrowth/Content/sel_list', params)

// 删除
export const  Contentdel_list = (params) => Request.post('/WZGrowth/Content/del_list', params)

// 新增编辑
export const  Contentadd_upd_list = (params) => Request.post('/WZGrowth/Content/add_upd_list', params)

// 查看详情
export const  Contentsel_list_details = (params) => Request.post('/WZGrowth/Content/sel_list_details', params)







// 数据管理--数据列表
export const  data_list = (params) => Request.post('/WZGrowth/DataManage/data_list', params)

// 数据管理--数据列表--删除
export const  del_data_list = (params) => Request.post('/WZGrowth/DataManage/del_data_list', params)

// 据管理--数据更新列表--查看--数据库下拉框
export const  upd_data_list_sel_db_combobox = (params) => Request.post('/WZGrowth/DataManage/upd_data_list_sel_db_combobox', params)

// 数据管理--数据更新列表--查看--数据库信息
export const  upd_data_list_sel = (params) => Request.post('/WZGrowth/DataManage/upd_data_list_sel', params)

// 数据管理--数据更新--查看--对比结果
export const  upd_data_list_sel_db_combobox_left_down = (params) => Request.post('/WZGrowth/DataManage/upd_data_list_sel_db_combobox_left_down', params)

// 数据管理--数据更新--查看--右侧列表
export const  upd_data_list_sel_db_combobox_right_list = (params) => Request.post('/WZGrowth/DataManage/upd_data_list_sel_db_combobox_right_list', params)


// 数据管理--数据差异--更新
export const  diff_data_upd = (params) => Request.post('/WZGrowth/DataManage/diff_data_upd', params)

// 数据管理--数据更新--列表
export const  upd_data_list = (params) => Request.post('/WZGrowth/DataManage/upd_data_list', params)
//数据更新- 全部更新
export const  data_upd = (params) => Request.post('/WZGrowth/DataManage/data_upd', params)

//数据管理--数据差异--右侧列表--详情对比
export const  diff_data = (params) => Request.post('/WZGrowth/DataManage/diff_data', params)

//数据管理--数据详情
export const  upd_data_list_details = (params) => Request.post('/WZGrowth/DataManage/upd_data_list_details', params)

//数据管理--数据详情--编辑别名
export const  add_upd_as_know = (params) => Request.post('/WZGrowth/DataManage/add_upd_as_know', params)

//热门列表
export const  sel_hot_list = (params) => Request.post('/WZGrowth/Content/sel_hot_list', params)

//热门--置顶取消置顶
export const  upd_hot_list = (params) => Request.post('/WZGrowth/Content/upd_hot_list', params)

//反馈--列表
export const  sel_support_list = (params) => Request.post('/WZGrowth/Content/sel_support_list', params)

//反馈--删除
export const  del_support_list = (params) => Request.post('/WZGrowth/Content/del_support_list', params)

//反馈--详情
export const  sel_support_list_details = (params) => Request.post('/WZGrowth/Content/sel_support_list_details', params)

//反馈--新增更新
export const  add_upd_report = (params) => Request.post('/WZGrowth/Content/add_upd_report', params)

//词条-列表
export const  SearchWordsel_list = (params) => Request.post('/WZGrowth/SearchWord/sel_list', params)

//搜索设置列表
export const  search_set_list = (params) => Request.post('/WZGrowth/SearchWord/search_set_list', params)

//搜索设置列表-左侧
export const  search_type_name_list = (params) => Request.post('/WZGrowth/SearchWord/search_type_name_list', params)

//列表
export const  sel_clinicaltrials_list = (params) => Request.post('/WZGrowth/Literatures/sel_clinicaltrials_list', params)

//列表删除
export const  del_clinicaltrials_list = (params) => Request.post('/WZGrowth/Literatures/del_clinicaltrials_list', params)

//图文视频列表
export const  HomeContentsel_list = (params) => Request.post('/WZGrowth/HomeContent/sel_list', params)

//新增反馈
export const  add_support = (params) => Request.post('/WZGrowth/HomeContent/add_support', params)

//合作机构
export const  sys_cooperate_manage_list = (params) => Request.post('/WZGrowth/HomeContent/sys_cooperate_manage_list', params)

//首页栏目
export const  sel_item_list = (params) => Request.post('/WZGrowth/HomeContent/sel_item_list', params)

//首页 数据库简介
export const  sel_databases_brief = (params) => Request.post('/WZGrowth/HomeContent/sel_databases_brief', params)

//首页 临床研究
export const  sel_CT_list = (params) => Request.post('/WZGrowth/HomeThreeFile/sel_CT_list', params)

//首页 sel_GM_list
export const  sel_GM_list = (params) => Request.post('/WZGrowth/HomeThreeFile/sel_GM_list', params)

//首页 lens
export const  sel_TL_list = (params) => Request.post('/WZGrowth/HomeThreeFile/sel_TL_list', params)


//关键字--example
export const  sel_key_words_example = (params) => Request.post('/WZGrowth/HomeContent/sel_key_words_example', params)

//关键字
export const  sel_key_words = (params) => Request.post('/WZGrowth/HomeContent/sel_key_words', params)

//首页热门
export const  HomeContentsel_hot_list = (params) => Request.post('/WZGrowth/HomeContent/sel_hot_list', params)

//系统参数 - 更新
export const  update_sys_params_list = (params) => Request.post('/WZGrowth/SysBasic/update_sys_params_list', params)

//系统参数 - 更新
export const  Literaturessel_GM_list = (params) => Request.post('/WZGrowth/Literatures/sel_GM_list', params)

//系统参数 - 更新
export const  Literaturesdel_GM_list = (params) => Request.post('/WZGrowth/Literatures/del_GM_list', params)

//系统参数 - 更新
export const  Literaturessel_TL_list = (params) => Request.post('/WZGrowth/Literatures/sel_TL_list', params)

//系统参数 - 更新
export const  Literaturesdel_TL_list = (params) => Request.post('/WZGrowth/Literatures/del_TL_list', params)

//首页Bannner
export const  HomeBasicbanner_sel_detail = (params) => Request.post('/WZGrowth/HomeBasic/banner_sel_detail', params)

//列表管理列表
export const  sel_protein_type_list = (params) => Request.post('/WZGrowth/DataManage/sel_protein_type_list', params)

//列表管理列表-删除
export const  del_protein_type_list = (params) => Request.post('/WZGrowth/DataManage/del_protein_type_list', params)

//列表管理列表-编辑
export const  edit_protein_type_list = (params) => Request.post('/WZGrowth/DataManage/edit_protein_type_list', params)

//编辑 - 选择蛋白列表
export const  sel_protein_type_list_option = (params) => Request.post('/WZGrowth/DataManage/sel_protein_type_list_option', params)

//首页前端中的统计图
export const  sel_home_protein_num_count = (params) => Request.post('/WZGrowth/HomeBasic/sel_home_protein_num_count', params)

//首页的Advanced Search 和 蛋白列表中左侧搜索条件
export const  search_result_list2 = (params) => Request.post('/WZGrowth/HomeContent/search_result_list', params)

//sel_CT_list_detail
export const  sel_CT_list_detail = (params) => Request.post('/WZGrowth//HomeThreeFile/sel_CT_list_detail', params)

//sel_TL_list_search
export const  sel_TL_list_search = (params) => Request.post('/WZGrowth/HomeThreeFile/sel_TL_list_search', params)


//蛋白列表导出fasta
export const  export_search_result_fast = (params) => Request.post('/WZGrowth/HomeContent/export_search_result_fast', params)

//蛋白列表导出fasta
export const  HomeContentrun = (params) => Request.post('/WZGrowth/HomeContent/run', params)

//query_search_example_data
export const  query_search_example_data = (params) => Request.post('/WZGrowth/HomeContent/query_search_example_data', params)

//add_search_example_data
export const  add_search_example_data = (params) => Request.post('/WZGrowth/HomeContent/add_search_example_data', params)

//query_example_data
export const  query_example_data = (params) => Request.post('/WZGrowth/HomeContent/query_example_data', params)

//del_search_example_data
export const  del_search_example_data = (params) => Request.post('/WZGrowth/HomeContent/del_search_example_data', params)

//query_protein_data
export const  query_protein_data = (params) => Request.post('/WZGrowth/HomeContent/query_protein_data', params)

//药品
export const  drugInfoPage = (params) => Request.post('/WZGrowth/drugInfo/page', params)

//药品
export const  HomeThreeFiledramp = (params) => Request.post('/WZGrowth/HomeThreeFile/dramp ', params)

//查看详情
export const  sel_search_details2 = (params) => Request.post('/WZGrowth/HomeEdit/sel_search_details', params)

//查看详情
export const  sel_search_details2updDate = (params) => Request.post('/WZGrowth/HomeEdit/updData', params)

//查看详情
export const  HomeEditgetCode = (params) => Request.post('/WZGrowth/HomeEdit/getCode', params)

//查看详情
export const  sel_search_details_familys = (params) => Request.post('/WZGrowth/HomeEdit/sel_search_details_familys  ', params)




























































