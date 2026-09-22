<template>
  <div class="advancedSearchList-box">

    <el-drawer
      v-model="drawer"
      :show-close="false"
      :with-header="false"
      size="850px"
      direction="ltr">
      <advancedSearch @advancedSearch="advancedSearch" @closeDrawer="closeDrawer"></advancedSearch>
    </el-drawer>


    <top></top>
    <div class="family-name" v-if="results.family_info && results.family_info.name">
      Detail results for <p>{{results.family_info.name}}</p>
    </div>
    <div class="family_info-decs" v-if="results.family_info && results.family_info.desc">
      <span class="todo2-box" v-html="results.family_info.desc"></span> <span style="color: #135287;cursor: pointer;font-size: 16px;" @click="windowOpen(results.family_info.family_url)">More useful information in InterPro</span>
    </div>

    <div class="content-box">
      <div class="content-left" v-loading="loading2">
        <div class="left-top">
          <!-- <p><span>Search results</span></p> -->
          <p>Filter your results</p>
        </div>

        <div class="conditions-list-box">
          <div class="conditions-list" v-for="(item, index) in leftList" :key="index">
            <!-- <p  style="color: #702330;">{{item.name}}</p> -->
            <p  style="color: #702330;">{{item.name}}</p>
            
            <div v-for="(item2, index2) in item.children" :key="index2" @click="chooseLeftData(item2, index, index2)" :style="showBGcolor(item2) ? 'background: #F3F4F6;' : ''">
              {{item2.name}} ({{item2.num || '-'}})
              <el-icon @click.stop="deleteItem2(item2)" v-show="showBGcolor(item2)"><CircleClose /></el-icon>
            </div>
          </div>
        </div>

        <div class="left-search" v-if="$route.query.type2 !== 5">
          <p style="color: #702330;">Other families</p>
          <div class="search-input-box">
            <div class="search-input">
              <div>
                <el-icon><Search /></el-icon>

                


                <el-input  v-model="name2" placeholder="Search" />

                
              </div>
              <div @click="getLeftList()">Go</div>
            </div>
          </div>
        </div>

      </div>

      <!-- // 右 -->
      <div class="content-right">
        <div class="right-top">
          <div class="search-input-box">
            <div class="search-input">
              <div>
                <el-icon><Search /></el-icon>

                <el-popover placement="bottom" v-if="historyList && historyList.length" ref="popoverRef" :width="420" trigger="click">
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
              <div @click="getLeftList()">Search</div>
            </div>
          </div>

          <div class="right-text-box" >
            <p @click="openAdvancedSearch">Advanced Search</p>
            <div @click="goHelp()">?</div>
            <p @click="goHelp()">Help</p>
          </div>
        </div>

        <div class="right-middle">
          <div>
            <div class="Download-btn" @click="downLoadFaily()" :style="!this.multipleSelection.length ? 'cursor: not-allowed; opacity: 0.5' : ''">
              <el-icon><Download /></el-icon>
              Download
            </div>

            <div class="Download-btn" @click="goTools(1)" :style="!this.multipleSelection.length ? 'cursor: not-allowed; opacity: 0.5' : ''">
              <el-icon><Share /></el-icon>
              Blast
            </div>

            <div class="Download-btn" @click="goTools(2)" :style="this.multipleSelection.length < 2 ? 'cursor: not-allowed; opacity: 0.5' : ''">
              <el-icon><Postcard /></el-icon>
              Alignment
            </div>

            <!-- <div><img src="@/assets/images/dc@2x.png" alt="">Download</div>
            <div><img src="@/assets/images/BLAST@2x.png" alt="">Blast</div>
            <div><img src="@/assets/images/alignment@2x.png" alt="">Alignment</div> -->
          </div>
          <div>
            <el-config-provider :locale="locale">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next"
                :total="results.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-config-provider>
            
          </div>
        </div>

        <div class="right-bottom" v-loading="loading">
          <el-config-provider :locale="locale">
          <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection"/>
            <!-- <el-table-column prop="student_name" label="访问时间" width="10%"/> -->
            <el-table-column prop="id" label="DRGF ID" width="100px" align="center" >
              <template #default="scoped">
              <!-- {{scoped.row.protein_name}} -->
                <p @click="goLook(scoped.row)"><span class="href-p" v-html="scoped.row.DRGF_code"></span></p>
              </template>
            </el-table-column>

            <el-table-column prop="protein_name" label="Protein Name(s)">
             <template #default="scoped">
              <!-- {{scoped.row.protein_name}} -->
                <p  ><span v-html="scoped.row.protein_name"></span></p>
              </template>
            </el-table-column>

            <el-table-column prop="gene_name"  label="Gene Name(s)">

              <template #default="scoped">
              <!-- {{scoped.row.protein_name}} -->
                <p v-if="scoped.row.gene_name">
                  <span v-html="scoped.row.gene_name"></span>  
                  <span v-show="scoped.row.gene_name && scoped.row.gene_names">&nbsp;(</span>
                  <span v-html="scoped.row.gene_names"></span>
                  <span v-show="scoped.row.gene_name && scoped.row.gene_names">)</span>
                </p>
                <p v-else>-</p>
              </template>
            </el-table-column>


            <!-- <el-table-column prop="gene_names" width="240px" label="Gene names" >

              <template #default="scoped">
                <p><span v-html="scoped.row.gene_names"></span></p>
              </template>
            </el-table-column> -->

            

            

            <el-table-column prop="organism"  label="Organism" >
              <template #default="scoped">
              <!-- {{scoped.row.protein_name}} -->
                <!-- <p><span v-html="scoped.row.organism"></span></p> -->
                <p v-html="showText2(scoped.row.organism)"></p>
              </template>
            </el-table-column>

            <el-table-column prop="Families" label="Family"  >
              <template #default="scoped">
              <!-- {{scoped.row.protein_name}} -->
                <p><span v-html="scoped.row.family"></span></p>
              </template>
            </el-table-column>

            <el-table-column prop="unipro_entry" align="center" width="120px" label="Uniprot Entry">
              <template #default="scoped">
              <!-- {{scoped.row.protein_name}} -->
                <p><span @click="goUrl(scoped.row)" class="unipro_entry-name" v-html="scoped.row.unipro_entry"></span></p>
              </template>
            </el-table-column>

            <!-- <el-table-column prop="protein_complex" label="Protein complex"  >
              <template #default="scoped">
                <p v-for="(item, index) in scoped.row.protein_complex" :key="index">{{item.value}} 
                  <span v-show="item.evidences && item.evidences.length">
                    （PMID：<span style="color: #135287;cursor: pointer;" @click="windowOpen(`https://pubmed.ncbi.nlm.nih.gov/${item2.id}`)" v-for="(item2, index2) in item.evidences" :key="index2">{{item2.id}}<span v-show="index2 + 1 != item.evidences.length">，</span></span>）
                  </span>
                </p>
              </template>
            </el-table-column> -->

            

      

            
            <!-- <el-table-column prop="also_known_as" label="Also Know As" width="10%">
              <template #default="scoped">
                <p><span v-html="scoped.row.also_known_as"></span></p>
              </template>
            </el-table-column>

            

            <el-table-column prop="family" label="Family" width="10%">
              <template #default="scoped">
                <p><span v-html="scoped.row.family"></span></p>
              </template>
            </el-table-column>

            <el-table-column prop="length" label="length" width="6%">
              <template #default="scoped">
                <p >{{scoped.row.length}} AA</p>
              </template>
            </el-table-column> -->


            <!-- <el-table-column prop="unipro_entry" label="UniProt ID" width="8%"/> -->

            <!-- <el-table-column prop="overseas_desc" label="是否国外" width="10%"/>
            <el-table-column prop="lat" label="纬度" width="10%"/>
            <el-table-column prop="lng" label="经度" width="10%"/>
            <el-table-column prop="status" label="状态" width="10%">
              <template #default="scoped">
                <p>{{scoped.row.status == 1 ? '启用' : '禁用'}}</p>
              </template>
            </el-table-column> -->
            <!-- <el-table-column  width="5%" align="center" label="Controls">
              <template #default="scoped">
                <div class="table-operation">
                  <p @click="goLook(scoped.row)" >Look</p>
                  
                </div>
              </template>
            </el-table-column> -->
          </el-table>
          </el-config-provider>
        </div>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>

import top from '../top/index.vue'
import bottom from '../bottom/index.vue'
import advancedSearch from '../advancedSearch/advancedSearch.vue'

import en from 'element-plus/es/locale/lang/en'

import {
  search_combobox,
  search_result_list2,
  export_search_result_fast
} from '@/api/common'


export default {
  watch: {
    '$route.query.type': {
      handler(val) {
        if(val) {
          this.leftList.forEach((item, index) => {
            if(item.children && item.children.length) {
              item.children.forEach((item2, index2) => {
                if(item2.type == this.$route.query.type) {
                  this.chooseLeftData(item2, index, index2)
                }
              })
            }
          })
        } else {
          this.getList(2)
        }
        console.log(val, 3333)
      }
    },
    '$route.query.type2': {
      handler(val) {
        // this.getList(2)
        setTimeout(() => {
          this.getsearch_combobox()
        }, 200)
        console.log(val, 3333)
      }
    },
    '$route.query.family_id': {
      handler(val) {
        // this.getList(2)
        setTimeout(() => {
          this.getsearch_combobox()
        }, 200)
        console.log(val, 3333)
      }
    },
    '$store.state.routeType': {
      handler(val) {
        console.log(val, 23333)
        this.getList(2)
      }
      
    },
  },
  components: {
    top,
    bottom,
    advancedSearch,
  },
  data () {
    return {
      historyList: [],

      name2: '',
      drawer: false,

      loading: false,
      name: '',
      locale: en,
      listIndex: '',
      results: {
        list: [],
        total: 0,
        family_info: {
          desc: '',
          family_url: '',
        }
      },
      currentPage: 1,
      pageSize: 10,
      multipleSelection: [],

      leftList: [],
      unipro_entry: []
    }
  },
  mounted() {
    if(localStorage.getItem('historyList2')) {
      this.historyList = JSON.parse(localStorage.getItem('historyList2'))
    }
    this.getsearch_combobox()
    if(this.$route.query.name) {
      this.name = this.$route.query.name
    }
  },
  methods: {
    showText2(item) {
      const bracketIndex = item.indexOf('(');
      if(bracketIndex == -1) {
        return item        
      } else {
        return `<span style="font-style: italic !important;">${item.substring(0, bracketIndex)}</span><span>${item.substring(bracketIndex)}</span>`
      }
    },

    deletehistoryList(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('historyList2', JSON.stringify(this.historyList))
    },
    CloseHistory(val) {
      this.name = val
      this.$refs.popoverRef.hide()
    },


    goUrl(row) {
      window.open(`https://www.uniprot.org/uniprotkb/${row.unipro_entry}/entry`)
      console.log(row, 222)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    windowOpen(url) {
      window.open(url)
    },
    goHelp() {
      this.$router.push({
        path: '/helpList',
      })
    },
    /**
     * 前往tools
     */
    goTools(type) {
      let list = []
      let name1 = ''
      let name2 = ''
      this.results.list.forEach((item, index) => {
        this.multipleSelection.forEach((item2) => {
          if(item.id == item2) {
            list.push(item.unipro_entry)
          }
          if(index == 1) {
            name1 = item.unipro_entry
            name2 = item.protein_name
          }
        })
      })
      this.$router.push({
        path: '/tools',
        query: {
          type: type,
          unipro_entry: list.toString(),
          BLASTjob: `sp|${name1}|${name2} +1`
        }
      })
    },

    downLoadFaily() {
      // export_search_result_fast(this.multipleSelection).then((res) => {

      // })
      this.$axios({
        url: `${this.$global.downUrlLeft}/WZGrowth/HomeContent/export_search_result_fast`,
        method: "post",
        data: {
          list: this.multipleSelection,
        },
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token,
        },
        responseType: 'blob'
      }).then((res) => {
        // 
        var blob = new Blob([res.data])
        var downloadElement = document.createElement('a')
        var href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        let time = Date.parse(new Date()) 
        downloadElement.download = `${time}.fasta`
        // downloadElement.download = ``
        // downloadElement.download = `${this.$route.query.time}-月结算单.xlsx` //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        this.$message({
          type: 'success',
          message: '下载成功'
        })
        // this.downLoading = false
      })
    },
    /**
     * 删除
     */
    deleteItem2(item) {
      this.unipro_entry.forEach((val, index) => {
        if(val.id == item.id) {
          this.unipro_entry.splice(index, 1)
        }
      })
      this.getList()
      console.log(this.unipro_entry, 9898)
    },
    /**
     * 显示底色
     */
    showBGcolor(item) {
      let have = false
      this.unipro_entry.forEach((val) => {
        if(val.id == item.id) {
          have =  true
        }
      })
      return have
    },
    goLook(item) {


      let todo1 = item.unipro_entry.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
            // console.log(todo1, 333333)
      // return
      localStorage.setItem('unipro_entry', JSON.stringify(todo1))
      this.$router.push({
        path: '/searchResultsDetails',
        query: {
          name: item.protein_name,
          id: item.id,
          // unipro_entry: item.unipro_entry
        }
      })
    },

    getLeftList() {
      if(this.name && !this.historyList.includes(this.name)) {
        this.historyList.unshift(this.name)
        localStorage.setItem('historyList2', JSON.stringify(this.historyList.slice(0, 5)))
      }
      

      this.getsearch_combobox()
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
      // console.log(data, 333)
      // return
      localStorage.setItem('advancedSearch',JSON.stringify(list))
      this.name = data.name
      this.getList()
      this.drawer = false
    },
    /**
     * 左侧选择
     */
    chooseLeftData(item, index, index2) {
      this.unipro_entry.push(item)
      this.unipro_entry = [item]
      // this.listIndex = `${index}-${index2}`
      // this.getList(1)
      // this.getsearch_combobox()
      this.getList()
    },
    
    /**
     * 获取列表
     */
    getList(type) {
      if(type == 2) {
        this.listIndex =  ''
      }
      this.loading = true
      
      let data
      console.log(type, 12345)
      if(type == 1) {
        data = [this.unipro_entry]
      } else {
        data = [

        ]
        if(localStorage.getItem('advancedSearch')) {
          data = JSON.parse(localStorage.getItem('advancedSearch'))
        }
      }

      let list = this.unipro_entry

      console.log(this.unipro_entry, 9999)

      if(localStorage.getItem('advancedSearch')) {
        console.log(this.unipro_entry, 222)
        // list = this.unipro_entry.concat(JSON.parse(localStorage.getItem('advancedSearch')))
        list = JSON.parse(localStorage.getItem('advancedSearch'))
        console.log(list, 88888)
      }

      search_result_list2({
        key_words: data.name ? data.name : this.name2,
        key_words2: this.name ? this.name : '',
        // unipro_entry: this.unipro_entry,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        // list: this.unipro_entry,
        list: list,
        type: this.$route.query.type2 ? this.$route.query.type2 : '',
        family_id: this.$route.query.family_id ? this.$route.query.family_id : '',
      }).then((res) => {
        console.log(222, 9898)
        this.loading = false
        localStorage.removeItem('advancedSearch')
        this.results = res.data
      })
    },
    /**
     * 获取左侧列表
     */
    getsearch_combobox() {
      // console.log(this.$route.query.family_id, 3333)
      this.loading = true

      this.loading2 = true

      search_combobox({
        type: this.$route.query.type2 ? this.$route.query.type2 : '',
        family_id: this.$route.query.family_id ? this.$route.query.family_id : '',
        key_words: this.name2,
        key_words2: this.name,
        // list: this.unipro_entry,
      }).then((res) => {
        if(res.data && res.data.list && res.data.list[0]) {
          this.unipro_entry = res.data.list[0].name
        }
        this.leftList = res.data
        this.loading2 = false
        if(this.$route.query.type) {
          this.leftList.forEach((item, index) => {
            if(item.children && item.children.length) {
              item.children.forEach((item2, index2) => {
                if(item2.type == this.$route.query.type) {
                  this.chooseLeftData(item2, index, index2)
                }
              })
            }
          })
        } else {
          this.getList()
        }
        
      })
    },
    /**
     * 选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((item) => {
        this.multipleSelection.push(item.id)
      })
    },
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
.unipro_entry-name {
  cursor: pointer;
  color: #135287;
}
::v-deep(.el-table th.el-table__cell>.cell) {
  font-weight: 600;
  // text-align: center;
}
::v-deep(.ql-container) {
  width: 100% !important;
  border: none !important;
  font-size: 20px !important;
}
.family-name {
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  display: flex;
  align-items: center;
  p {
    font-weight: 500;
  font-size: 24px;
  color: #333333;
  margin-left:10px;
  }
}
::v-deep(.el-drawer__body) {
  padding: 0px !important;
}
.family_info-decs {
  border-radius: 8px;
  border: 1px solid #DCDFE6;
  margin: 20px;
  padding: 10px;
}
.Download-btn {
  color: #135287 !important;
}
.href-p {
      cursor: pointer;
      color: #135287;
    }
  .advancedSearchList-box {
    .content-box {
      display: flex;
      .content-left {
        width: 300px;
        min-width: 300px;
        // border: 1px solid red;
        // height: 800px;
        overflow: auto;
        padding: 15px 20px;
        .left-top {
          // border-bottom: 1px solid #E9E9E9;
          padding-bottom: 15px;
          >:nth-child(1) {
            font-weight: 500;
            font-size: 24px;
            span {
              font-weight: 400;
              font-size: 16px;
            }
          }
          >:nth-child(2) {
            font-weight: 500;
            color: #135287;
            margin-top: 10px;
          }
        }
        .left-search {
          border-top: 1px solid #E9E9E9; 
          margin-top: 10px;
          padding-top: 10px;
          >:nth-child(1) {
            font-weight: 400;
            font-size: 16px;
            color: #999999;
            margin-bottom: 20px;
          }
        }
        .search-input-box {
          .search-input {
            display: flex;
      
            >:nth-child(1) {
              width: 420px;
              height: 40px;
              background: #FFFFFF;
              border-radius: 4px 0px 0px 4px;
              border: 1px solid #DCDFE6;
            // border-radius: 4px 0px 0px 4px;
              display: flex;
              align-items: center;
              padding: 0 18px;
              ::v-deep(.el-input__wrapper) {
                box-shadow: none;
                
              }
            }
            >:nth-child(2) {
              width: 132px;
              height: 40px;
              background: #00AEFF;
              border-radius: 0px 4px 4px 0px;
              text-align: center;
              line-height: 40px;
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
            :nth-child(2) {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .conditions-list-box {
          // border: 1px solid red;
          max-height: 700px;
          overflow: auto;

        }
        .conditions-list{
          border-top: 1px solid #E9E9E9;
          padding: 10px 0;
          >p {
            font-weight: 400;
            font-size: 16px;
            color: #999999;
          }
          >div {
            font-weight: 400!important;
            font-size: 14px;
            // padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            width: 260px;
            // height: 38px;
            background: #F3F4F6;
            // line-height: 38px;
            padding:8px 2px;
            background: #fff;
            // border: 1px solid red;
          }
        }
      }
      .content-right {
        margin-left: 10px;
        // border: 1px solid red;
        width: 100%;
        padding: 15px 20px;
        .right-top {
          display: flex;
          justify-content: center;
          align-items: center;
          .search-input-box {
            .search-input {
              display: flex;
        
              >:nth-child(1) {
                width: 420px;
                height: 50px;
                background: #FFFFFF;
                border-radius: 4px 0px 0px 4px;
                border: 1px solid #DCDFE6;
              // border-radius: 4px 0px 0px 4px;
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
              :nth-child(2) {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
          .right-text-box {
            margin-left: 20px;
            display: flex;
            color: #135287;
            font-weight: 500;
            >:nth-child(1) {
              cursor: pointer;
            }
            >:nth-child(3) {
              cursor: pointer;
            }
            :nth-child(2) {
              cursor: pointer;
              width: 16px;
              height: 16px;
              background: #FFDC00;
              border-radius: 50%;
              text-align: center;
              line-height: 16px;
              margin-left: 25px;
              margin-right: 5px;
            }
          }
        }
        .right-middle {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          >:nth-child(1) {
            display: flex;
            align-items: center;
            font-weight: 500;
            >div {
              display: flex;
              align-items: center;
              height: 36px;
              background: #F5F7FA;
              border-radius: 4px;
              border: 1px solid #EBEEF5;
              padding: 0 15px;
              margin-right: 20px;
              cursor: pointer;
            }
            img {
              margin-right: 6px;
              width: 14px;
            }
          }
        }
        .right-bottom {
          margin-top: 20px;
        }
      }
    }
  }
  ::v-deep(.todo2-box) {
    font-size: 16px !important;
    span {
      font-size: 16px !important;
    }
    >p {
      font-size: 16px !important;
    }
    line-height: 22px !important; 
  }
</style>
