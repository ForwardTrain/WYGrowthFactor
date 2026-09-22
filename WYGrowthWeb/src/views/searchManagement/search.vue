<template>
  <div class="search-box">
    <div class="prompt-type">
      <div></div>
      <p>搜索管理</p>
    </div>

    <div class="content-box">
      <div class="content-left">
        <el-row class="tac" >
          <el-col :span="12" >
            <el-menu
              style="width: 280px;"
              default-active="1"
              class="el-menu-vertical-demo">
              <!-- <el-sub-menu index="1">
                <template #title>
                  <span>Navigator One</span>
                </template>
                <el-menu-item-group >
                  <el-menu-item index="1-1">item one</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group >
                  <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu> -->
              <el-menu-item :index="index" v-for="(item, index) in list" :key="index" @click="chooseType(item.type_name)">
                <span >{{item.type_name}}</span>
              </el-menu-item>
              <!-- <el-menu-item index="2" @click="chooseType('base_family_and_domain')">
                <span>base_family_and_domain</span>
              </el-menu-item>
              <el-menu-item index="3" @click="chooseType('base_general_infomation')">
                <span>base_general_infomation</span>
              </el-menu-item>

              <el-menu-item index="4" @click="chooseType('base_mutation_and_disease')">
                <span>base_mutation_and_disease</span>
              </el-menu-item>
              <el-menu-item index="5" @click="chooseType('base_post_translational_modification')">
                <span>base_post_translational_modification</span>
              </el-menu-item>
              <el-menu-item index="6" @click="chooseType('base_protein_function')">
                <span>base_protein_function</span>
              </el-menu-item>
              <el-menu-item index="7" @click="chooseType('base_protein_interaction')">
                <span>base_protein_interaction</span>
              </el-menu-item>
              <el-menu-item index="8" @click="chooseType('base_protein_sequence')">
                <span>base_protein_sequence</span>
              </el-menu-item>
              <el-menu-item index="8" @click="chooseType('base_protein_structure')">
                <span>base_protein_structure</span>
              </el-menu-item> -->
            </el-menu>
          </el-col>
        
        </el-row>
      </div>

      <div class="content-right">
        <div>
          <p class="title-1">{{type}}</p>
          <div class="table-box" style="margin-bottom: 15px;">
            <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
              border
              style="width: 100%; margin-top: 20px"
            >
              <el-table-column prop="type_name" label="分类"  />
              <el-table-column prop="name" label="项目" />
              <!-- <el-table-column prop="amount1" label="状态">
                <template #default="scoped">
                  <div class="table-operation">
                    <el-switch v-model="value1" />
                  </div>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>

import { 
  search_set_list,
  search_type_name_list
} from '@/api/common'
export default {
  data () {
    return {
      tableData: [
      ],
      list: [],
      type: ''
    }
  },
  mounted() {
    // this.getsearch_set_list()
    // console.log(11111, 222)
    this.getsearch_type_name_list()
  },
  methods: {
    handleOpen(val) {
      console.log(val, 2222)
    },
    handleClose() {

    },
    getsearch_type_name_list() {
      search_type_name_list({}).then((res) => {
        this.list = res.data
        if(res.data && res.data.length) {
          this.type = res.data[0].type_name
          this.getsearch_set_list()
        }
      })
    },
    /**
     * 
     */
    chooseType(type) {
      this.type = type
      console.log(2222)
      this.getsearch_set_list()
    },
    getsearch_set_list() {
      search_set_list({
        type_name: this.type
      }).then((res) => {
        this.tableData = res.data
        // this.getsearch_set_list()
      })
    },
    /**
     * 合并
     */
    objectSpanMethod({row,column,rowIndex,columnIndex}) {
      if (columnIndex === 0) { // 第一列
        if (rowIndex  === 0) {
          return {
            rowspan: this.tableData.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
}
</script>

<style scoped lang='scss'>
  .search-box {
    padding: 12px;
    .title-1 {
      font-weight: 500;
    }
    .content-box {
      margin-top: 16px;
      border-top: 1px solid #EBEEF5;
      display: flex;
      .content-left {
        border-right: 1px solid #EBEEF5;
        min-width: 280px;
        overflow: auto;
        ::v-deep(.el-menu) {
          border: none !important;
        }
      }
      .content-right {
        height: calc(100vh - 200px);
        overflow: auto;
        padding: 15px;
      }
    }
  }
</style>
