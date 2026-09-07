<template>
  <div class="column-anagement-box">

    <el-drawer
      v-model="drawer"
      direction="rtl"
      modal-class="drawer-box"
      size="650px"
      :with-header="false">
      <div class="drawer-content">
        <img class="close-btn" @click="drawer = false" src="@/assets/images/drawer-close-btn.png" alt="">
        <div class="drawer-right-content">
          <div>
            <div class="prompt-type">
              <div></div>
              <p>{{title}}</p>
            </div>
            <div class="right-content">
              <div class="drawer-line2">
                <div>
                  <div class="drawer-line-box">
                    <p><span>*</span>角色名称：</p>
                    <div>
                      <el-input :disabled="title == '查看' ? true : false" v-model="addData.role_name" style="width: 160px" placeholder=" " />
                    </div>
                  </div>

                  <div class="drawer-line-box">
                    <p><span>*</span>状态：</p>
                    <div>
                      <el-switch
                        :disabled="title == '查看' ? true : false"
                        v-model="drawerState"
                        size="large"/>
                    </div>
                  </div>
                </div>
                <div class="drawer-line-box drawer-line-box2">
                    <p><span>*</span>说明：</p>
                    <div>
                      <el-input
                        :disabled="title == '查看' ? true : false"
                          style="width: 230px"
                          v-model="addData.description"
                          :rows="5"     
                          type="textarea"
                          placeholder=" "
                        />
                    </div>
                  </div>

              </div>

              <div>
                <div>
                  <div class="prompt-type">
                    <div></div>
                    <p>页面权限</p>
                  </div>

                  <div class="table-box2">
                    <div class="head-box2">
                      <el-checkbox v-model="checked1" @change="changeChecked1" label="页面名称" size="large" />
                    </div>

                    <div class="table-line-box"
                         v-for="(item, index) in results2.list"
                         :key="index">
                      <div>
                        <div class="checked-line-box">
                          <el-checkbox v-model="item.checked1" :disabled="title == '查看' ? true : false" @change="(val) => changeChecked2(val, item)" label=" " size="large" />

                          <p @click="item.show = !item.show"> 
                            <el-icon v-show="item.children && item.children.length" v-if="item.show" ><ArrowUpBold /></el-icon>
                            <el-icon v-show="item.children && item.children.length" v-else ><ArrowDownBold /></el-icon>
                            {{item.name}}
                          </p>
                        </div>


                        <div v-for="(item2, index2) in item.children"
                             :key="index2"
                             v-show="item.show"
                             class="checked-line-box2">
                          <div class="checked-line-box3">
                            <el-checkbox  @change="(val) => changeChecked3(val, item2)" v-model="item2.checked1" :disabled="title == '查看' ? true : false" label=" " size="large" />
                            <p style="cursor: pointer;" @click="item2.show = !item2.show">
                              <el-icon v-show="item2.children && item2.children.length" v-if="item2.show" ><ArrowUpBold /></el-icon>
                              <el-icon v-show="item2.children && item2.children.length" v-else ><ArrowDownBold /></el-icon>
                              {{item2.name}}
                            </p>
                          </div>

                          <div v-for="(item3, index3) in item2.children"
                               :key="index3"
                               class="checked-line-box4"
                               v-show="item2.show"> 
                            <el-checkbox v-model="item3.checked1" :disabled="title == '查看' ? true : false" label=" " size="large" />
                            <p>
                              {{item3.name}}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <!-- <div>
                    <el-table :data="results2.list" 
                              ref="multipleTableRef"
                              row-key="id"
                              
                              header-cell-class-name="table-header"
                              :tree-props="{children: 'children'}"
                              @select="rowSelect"
                              @select-all="selectAll"
                              default-expand-all
                              @selection-change="handleSelectionChange2"
                              height="calc(100vh - 320px)">
                      <el-table-column width="2%" :disabled="title == '查看' ? true : false" type="selection"/>
                      <el-table-column prop="name" label="页面名称"  width="10%"/>

                    </el-table>
                  </div> -->

                </div>

              </div>
              
            </div>
            <div v-if="title != '查看'">
              <el-button class="margin-L" type="info" @click="drawer = false">取消</el-button>
              <el-button class="margin-L" type="primary" @click="title == '新增' ? add() : edit()">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>


    <div class="prompt-type">
      <div></div>
      <p>角色管理</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>名称：</p>
        <div>
          <el-input v-model="name" placeholder="请输入" />
        </div>

       
        <p class="margin-L">状态：</p>
        <div>
          <el-select v-model="status" style="width: 120px;" class="m-2" placeholder=" ">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        
      
        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>

      <div class="operation-btn">
        <el-button class="margin-L" type="info" @click="openAdd"><img style="margin-right: 4px;" src="@/assets/images/add-icon.png" alt="">新增</el-button>
        <el-button class="margin-L" type="info" @click="openDelete(null)"><img style="margin-right: 4px; height: 16px;" src="@/assets/images/delete-icon.png" alt="">删除</el-button>
      </div>
    </div>

    <div class="table-box">
      <el-table :data="results.list" 
                ref="multipleTableRef"
                @selection-change="handleSelectionChange"
                height="calc(100vh - 340px)">
        <el-table-column width="2%" type="selection"/>
        <el-table-column prop="role_name" label="角色名称"  width="10%"/>
        <el-table-column prop="description" label="说明" width="10%"/>
        <!-- <el-table-column prop="num" label="使用人数" width="10%"/> -->
        
        <el-table-column prop="state" label="状态" width="10%">
          <template #default="scoped">
            <p>{{scoped.row.status == 1 ? '可用' : '禁用'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="operate_name"  label="操作人" width="10%" />
        <el-table-column prop="create_time"  label="操作时间" width="10%" />
        
        <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="goLook(scoped.row, 1)">查看</p>
              <p @click="openChangeType(scoped.row, 0)" v-if="scoped.row.status == 1">禁用</p>
              <p @click="openChangeType(scoped.row, 1)" v-else>启用</p>
              <p @click="goEdit(scoped.row)" >编辑</p>
              <p class="delete-p" @click="openDelete(scoped.row)">删除</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-box">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="results.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import { 
  roleList,
  SysMenuAllMenu,
  roleListAdd,
  roleListDelete,
  roleListUpdate
} from '@/api/common'

export default {
  data () {
    return {
      title: '',
      drawer: false,

      drawerState: true,

      checked1: false,

      name: '',
      status: '',
      options: [
        {
          name: '启用',
          id: '1'
        },{
          name: '禁用',
          id: '0'
        }
      ],

      addData: {
        role_name: '',
        status: '',
        description: '',
        menu_id: []
      },

      

      results: {
        list: [],
        total: 0,
      },
      currentPage: 1,
      pageSize: 10,

      results2: {
        list: [],
        total: 0,
      },


      multipleSelection: [],
    }
  },
  mounted() {
    this.getList()
    this.getLis2()
  },
  methods: {

    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    emptyData() {
      this.name = ''
      this.status = ''
      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },
    /**
     * 获取列表
     */
    getList() {
      roleList({
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        name: this.name,
        status: this.status,
      }).then((res) => {
        this.results = res.data
      })
    },

    getLis2() {
      SysMenuAllMenu({
        pageSize: 9999,
        pageIndex: 1,
      }).then((res) => {
        res.data.list.forEach((item) => {
          item.checked1 = false
          item.show = false
          if(item.children) {
            item.children.forEach((item2) => {
              item2.checked1 = false
              item2.show = false
              if(item2.children) {
                item2.children.forEach((item3) => {
                  item3.checked1 = false
                })
              }
            })
          }
        })
        this.results2 = res.data
      })
    },
    /**
     * 页面权限选择
     */
    changeChecked1(val) {
      this.results2.list.forEach((item) => {
        item.checked1 = val
        if(item.children) {
          item.children.forEach((item2) => {
            item2.checked1 = val
            if(item2.children) {
              item2.children.forEach((item3) => {
                item3.checked1 = val
              })
            }
          })
        }
      })
    },

    changeChecked2(val, item) {
      item.children.forEach((item2) => {
        item2.checked1 = val
        if(item2.children) {
          item2.children.forEach((item3) => {
            item3.checked1 = val
          })
        }
      })
    },

    changeChecked3(val, item) {
      item.children.forEach((item2) => {
        item2.checked1 = val
      })
    },
    /**
     * 选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((item) => {
        this.multipleSelection.push(item.id)
        // if(item.children) {
        //   item.children.forEach((item2) => {
        //     this.multipleSelection.push(item2.id)
        //   })
        // }
      })
    },

    handleSelectionChange2(val) {
      this.addData.menu_id = []
      val.forEach((item) => {
        this.addData.menu_id.push(item.id)
      })
    },


    add() {
      if(this.addData.role_name == '') {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      if(this.drawerState) {
        this.addData.status = 1
      } else {
        this.addData.status = 2
      }
      
      let list = []

      this.results2.list.forEach((item) => {
        if(item.checked1) {
          list.push(item.id)
        }
        if(item.children) {
          item.children.forEach((item2) => {
            if(item2.checked1) {
              list.push(item2.id)
            }
            if(item2.children) {
              item2.children.forEach((item3)=> {
                if(item3.checked1) {
                  list.push(item3.id)
                }
              })
            }
          })
        }
      })
      
      this.addData.menu_id = list.toString()

      roleListAdd(this.addData).then((res) => {
        if(res.code == 1) {
          this.getList()
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.drawer = false
        }
      })
    },

    edit() {
      if(this.addData.role_name == '') {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      if(this.drawerState) {
        this.addData.status = 1
      } else {
        this.addData.status = 2
      }

      let list = []

      this.results2.list.forEach((item) => {
        if(item.checked1) {
          list.push(item.id)
        }
        if(item.children) {
          item.children.forEach((item2) => {
            if(item2.checked1) {
              list.push(item2.id)
            }
            if(item2.children) {
              item2.children.forEach((item3)=> {
                if(item3.checked1) {
                  list.push(item3.id)
                }
              })
            }
          })
        }
      })
      
      this.addData.menu_id = list.toString()
      roleListUpdate(this.addData).then((res) => {
        if(res.code == 1) {
          this.getList()
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.drawer = false
        }
      })
    },

    

    
    /**
     * 打开删除
     */
    openDelete(row) {
      if(row) {
        this.multipleSelection = []
        this.multipleSelection.push(row.id)
      }

      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      )
        .then(() => {
          roleListDelete({
            ids: this.multipleSelection.toString()
          }).then((res) => {
            if(res.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            }
          })
        })
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: 'Delete canceled',
          // })
        })
    },

    openChangeType(row, type) {
      this.$ElMessageBox.confirm(
        `确认${type == 1 ? '启用' : '禁用'}此数据？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      )
        .then(() => {
          roleListUpdate({
            id: row.id,
            status: type,
          }).then((res) => {
            if(res.code == 1) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.getList()
            }
          })
        })
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: 'Delete canceled',
          // })
        })
    },
    /**
     * 前往新增页面
     */
    openAdd() {
      this.title = '新增'
      this.$refs.multipleTableRef.clearSelection()
      this.addData = {
        role_name: '',
        status: true,
        description: '',
        menu_id: []
      },
      this.results2.list.forEach((item) => {
        item.checked1 = false
        item.show = false
        if(item.children) {
          item.children.forEach((item2) => {
            item2.checked1 = false
            item2.show = false
          })
        }
      })

      this.drawer = true
    },


    goLook(row) {
      this.$refs.multipleTableRef.clearSelection()
      this.title = '查看'
      this.addData = {
        role_name: row.role_name,
        status: row.status == 1 ? true : false,
        description: row.description,
        menu_id: [],
        id: row.id
      },

      this.results2.list.forEach((item) => {
        item.checked1 = false
        item.show = false
        if(item.children) {
          item.children.forEach((item2) => {
            item2.checked1 = false
            item2.show = false
          })
        }
      })


      this.drawer = true
      let list = []
      if(row.menu_ids) {
        list = row.menu_ids.split(',')
      }
      setTimeout(() => {
        list.forEach((item) => {
          this.results2.list.forEach((item2, index2) => {
            if(item == item2.id) {
              item2.checked1 = true
            } 
            item2.children.forEach((item3, index3) => {
              if(item == item3.id) {
                item3.checked1 = true
              } 
            })
          })
        })
      }, 100)
    },
    /**
     * 打开编辑
     */
    goEdit(row) {
      this.$refs.multipleTableRef.clearSelection()
      this.title = '编辑'
      this.addData = {
        role_name: row.role_name,
        status: row.status == 1 ? true : false,
        description: row.description,
        menu_id: [],
        id: row.id
      },

      this.results2.list.forEach((item) => {
        item.checked1 = false
        item.show = false
        if(item.children) {
          item.children.forEach((item2) => {
            item2.checked1 = false
            item2.show = false
          })
        }
      })


      this.drawer = true
      let list = []
      if(row.status == 1) {
        this.drawerState = true
      } else {
        this.drawerState = false
      }
      if(row.menu_ids) {
        list = row.menu_ids.split(',')
      }
      
      setTimeout(() => {
        list.forEach((item) => {
          this.results2.list.forEach((item2, index2) => {
            if(item == item2.id) {
              item2.checked1 = true
            } 
            item2.children.forEach((item3, index3) => {
              if(item == item3.id) {
                item3.checked1 = true
              } 
            })
          })
        })
      }, 100)
    }
  },
}
</script>

<style scoped lang='scss'>
  .column-anagement-box {
    padding: 15px;
    .table-box2 {
      // border: 1px solid red;
      height: 100%;
      margin-top: 12px;
      height: calc(100vh - 330px);
      overflow: auto;
      .head-box2 {
        height: 48px;
        background: #F5F7FA;
        display: flex;
        align-items: center;
        padding: 0 12px;
      }
      .table-line-box {
        
        border-bottom: 1px solid #EBEEF5;
        display: flex;
        align-items: center;
        .checked-line-box {
          padding-left: 30px;
          display: flex;
          align-items: center;
          >p {
            cursor: pointer;
            height: 48px;
            display: flex;
            align-items: center;
            >:nth-child(1) {
              margin-right: 6px;
            }
          }
        }

        .checked-line-box2 {
          // display: flex;
          // align-items: center;
          padding-left: 60px;
        }
        .checked-line-box3 {
          display: flex;
          align-items: center;
        }
        .checked-line-box4 {
          padding-left: 40px;
          display: flex;
          align-items: center;
        }
      }
    }
    .drawer-line2 {
      display: flex;
      align-items: flex-start;

      >:nth-child(1) {
        margin-right: 20px;
      }
    }
    .drawer-line-box {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      >p {
        color: #909399;
        span {
          color: #FF1B1B;
        }
      }
    }
    .drawer-line-box2 {
      display: flex;
      align-items: flex-start;
    }
    .line-box {
      display: flex;
      align-items: center;
      margin: 10px 0;
      >p {
        width: 90px;
        text-align: right;
        white-space: nowrap;
        span {
          color: #FF1B1B;
        }
      }
    }
  }
</style>
