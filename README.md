# 温医大生长因子数据库系统（WYGrowthFactor）

[![Website](https://img.shields.io/badge/website-drgf--wmu.org-blue)](https://www.drgf-wmu.org)
[![Vue](https://img.shields.io/badge/Vue-3.2-green)](https://vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.2-409EFF)](https://element-plus.org/)
[![Spring](https://img.shields.io/badge/Spring-4.2.5-brightgreen)](https://spring.io/)
[![Java](https://img.shields.io/badge/Java-1.8-orange)](https://www.oracle.com/java/)

温州医科大学生长因子数据库系统（Growth Factor），是一个面向生长因子及相关药物、文献、临床研究数据整合、检索、展示与管理的线上平台。

线上访问地址：**[https://www.drgf-wmu.org](https://www.drgf-wmu.org)**

本项目采用前后端分离架构，包含两个子项目：

- **`wz-medical`（前端）**：基于 Vue 3 构建的单页应用（SPA），提供生长因子数据的浏览、检索、统计可视化与管理后台界面。
- **`wz_growth`（后端）**：基于 Spring 4 的 Maven 多模块 Java Web 应用（war 包），提供数据与业务逻辑支撑。

## 项目结构

```
WYGrowthFactor/
├── README.md
├── wz-medical/                        # 前端（Vue 3）
│   ├── package.json                   # 前端依赖与脚本
│   ├── vue.config.js                  # 构建与代理配置
│   ├── babel.config.js
│   ├── jsconfig.json
│   ├── public/                        # 静态资源（index.html、favicon）
│   └── src/
│       ├── api/                       # 接口请求封装
│       ├── assets/                    # 静态资源
│       ├── components/                # 公共组件（layout、navbar）
│       ├── router/                    # 路由配置
│       ├── store/                     # Vuex 状态管理
│       ├── utils/                     # 工具函数
│       ├── App.vue
│       └── main.js
│       └── views/                     # 页面视图
│           ├── home/                  # 首页、浏览、搜索、工具等
│           ├── dataManagement/        # 数据管理
│           ├── dataStatistics/        # 数据统计
│           ├── literatureManagement/  # 文献管理
│           ├── contentManagement/     # 内容管理
│           ├── searchManagement/      # 搜索管理
│           ├── systemManagement/      # 系统管理
│           ├── customerManagement/    # 用户管理
│           ├── bannerList/            # 轮播图管理
│           ├── login/                 # 登录 / 修改密码
│           └── workTable/             # 工作台
└── wz_growth/                         # 后端（Maven 多模块）
    ├── pom.xml                        # 父 POM（多模块聚合）
    ├── web/                           # Web 层（Controller、拦截器）
    ├── service/                       # 业务逻辑层
    ├── model/                         # 领域模型层
    ├── dao/                           # 数据访问层（MyBatis）
    └── common/                        # 公共工具与配置
```

## 技术栈

### 前端（wz-medical）

| 类别 | 技术 |
| --- | --- |
| 框架 | Vue 3.2 + Vue Router 4 + Vuex 4 |
| UI 组件库 | Element Plus 2.2、Vant 4 |
| 可视化 | ECharts 4.9、ECharts GL、World Map |
| HTTP | Axios |
| 富文本 | @vueup/vue-quill |
| 其他 | qiniu-js、qrcode.vue |
| 构建 | Vue CLI 5、Babel、Sass |

### 后端（wz_growth）

| 类别 | 技术 |
| --- | --- |
| 框架 | Spring 4.2.5、Spring MVC、Spring Security |
| ORM | MyBatis 3.3.1 + MyBatis-Spring |
| 数据存储 | MySQL、Redis（Jedis）、MongoDB（Spring Data） |
| 安全认证 | Spring Security、JWT（java-jwt / jjwt）、Kaptcha 验证码 |
| 搜索/模板 | Thymeleaf 3 |
| 任务调度 | Quartz |
| 工具 | Lombok、Hutool、Fastjson、Jackson、Apache Commons、Apache POI、dom4j |
| 第三方服务 | 对象存储 |
| 数据库连接池 | Druid |

## 安装与运行

### 环境要求

- **Node.js**（前端）：推荐 18+，需支持 Vue CLI 5
- **Java JDK**（后端）：1.8
- **Maven**（后端）：3.x
- **MySQL / Redis / MongoDB**：用于数据存储与缓存

### 前端启动（wz-medical）

```bash
cd wz-medical

# 安装依赖
npm install

# 启动开发服务器（默认 0.0.0.0:8085）
npm run serve

# 生产构建
npm run build
```

开发环境下，前端通过 `vue.config.js` 中的 `devServer.proxy` 将 `/WZGrowth` 请求代理到线上后端 `https://www.drgf-wmu.org`，将 `/api` 代理到 UniProt（`https://www.uniprot.org`）。

### 后端构建（wz_growth）

```bash
cd wz_growth

# 打包多模块工程，生成 war 包（最终产物名 WZGrowth.war）
mvn clean package
```

## 核心功能

- **首页（home）**：生长因子数据浏览、药物（Drug）检索、高级检索（advancedSearch）、阅读详情（readMore）、临床研究（clinical）、信息统计（InformationStatistics）等。
- **数据管理（dataManagement）**：数据采集（dataAcquisition）、分类管理（categoryManagement）、数据管理（dataManagement）、备份管理（backupManagement）。
- **数据统计（dataStatistics）**：基于 ECharts 的可视化统计分析。
- **文献管理（literatureManagement）**：集成 GeenMedical、The Lens、ClinicalTrials 等文献检索能力。
- **内容管理（contentManagement）**：图文管理、视频内容、热门内容、帮助文档、关于我们、意见反馈等站点内容维护。
- **搜索管理（searchManagement）**：搜索词管理、检索示例、词云、检索权限配置。
- **系统管理（systemManagement）**：菜单管理、角色管理、组织架构、人员管理、岗位管理、参数设置、协议管理、告警设置、系统服务等。
- **用户/工作台**：登录认证（含验证码）、修改密码、客户管理、工作台。

## 文献数据说明

平台数据模块整合了生长因子相关的药物与文献数据，下面从数量统计与数据简介两个方面进行说明。

### 数量统计

| 数据分类 | 来源 | 数量 |
| --- | --- | --- |
| 期刊论文 | GeenMedical / PubMed | 1,600,000+ |
| 专利文献 | The Lens | 1,700,000+ |
| 临床试验 | ClinicalTrials.gov | 11,000+ |
| 药物 | 自建数据库 | 1,700+ |

### 数据简介

**期刊论文（GeenMedical / PubMed）**

来源于 PubMed / GeenMedical 平台的期刊论文文献。网站中展示了每篇论文的标题、影响因子、PMID（PubMed 唯一标识）、期刊名与出版日期、卷与页码、作者列表以及摘要等信息，并提供通往 PubMed 或 DOI 的原文链接，便于用户直接跳转查阅完整论文。

**专利文献（The Lens）**

来源于 The Lens 平台的专利数据。网站中展示了每项专利的 LensID（Lens 专利唯一标识）、专利标题、法律状态、发布日期、申请号以及发明人等信息，并提供原文链接供用户查看专利详情。

**临床试验（ClinicalTrials）**

来源于 ClinicalTrials.gov 平台的临床试验登记数据。网站中展示了每项试验的标题、NCT 编号、试验状态、研究类型、发起人（申办方）以及正式发布日期等信息，并提供通往 ClinicalTrials.gov 的原文链接。

**药物（Drug）**

生长因子及其靶向药物的自建结构化数据，支持按药品中英文名称模糊检索、按批准日期排序、Excel 批量导入与分页展示。网站中围绕基础信息（药品中英文名称、商品名、剂型、规格、靶点、活性成分、ATC 分类、适应症）、上市信息（批准文号、批准日期、上市许可持有人及地址、生产企业及地址、上市国家地区）以及医保信息（医保分类、医保编号、限制使用范围、OTC/处方药）三大板块完整呈现药物数据。



## 许可

内部项目，版权归温州医科大学生长因子课题组所有。
