<template>
  <div class="advancedSearch-box">
    <div class="search-top">
      <p>Advanced Search</p>
      <el-icon @click="closeDrawer"><CloseBold /></el-icon>
    </div>

    <div class="search-input">
      <div>
        <el-icon><Search /></el-icon>
        <el-input v-model="name" placeholder="Search by keyword" />
        <el-icon @click="clearInput"><CircleCloseFilled /></el-icon>
      </div>

      <div>
        <el-button @click="CancelData">Cancel</el-button>
        <el-button type="primary" @click="goConfirm" >Confirm</el-button>
      </div>
    </div>

    <div class="add-text">
      <p>condition</p>
      <p @click="addList"><el-icon class="icon-add"><Plus /></el-icon>Add Field</p>
    </div>

    <div class="list-box">
      <div v-for="(item, index) in list" :key="index">
        <el-select
          v-model="item.Fname"
          @change="changeOptions(item)"
          placeholder=" "
          style="width: 100px; margin-right: 10px;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="item.name"
          placeholder=" "
          style="width: 200px;margin-right: 10px;">
          <el-option
            v-for="item2 in item.options"
            :key="item2.name"
            :label="item2.name"
            :value="item2.name"
          />
        </el-select>
        <el-input v-model="item.value" style="width: 420px;margin-right: 10px;" placeholder=" " />
        <p class="Remove-p" @click="removeList(index)">Remove</p>
      </div>

    </div>
  </div>
</template>

<script>

import {
  HomeContentSearch_combobox2,
} from '@/api/common'


export default {
  data () {
    return {
      name: '', 

      options: [],
      value: '',
      list: []
    }
  },
  mounted() {
    this.getHomeContentSearch_combobox2()
  },
  methods: {
    getHomeContentSearch_combobox2() {
      HomeContentSearch_combobox2({}).then((res) => {
        this.options = res.data
      })
    },
    /**
     * 关闭窗口
     */
    closeDrawer() {
      this.$emit('closeDrawer')
    },
    CancelData() {
      this.name = ''
      this.list = []
    },
    /**
     * 清除
     */
    clearInput() {
      this.name = ''
    },
    /**
     * 选择类型
     */
    changeOptions(item) {
      setTimeout(() => {
        this.options.forEach((val) => {
          if(val.id == item.Fname) {
            console.log(val, 333)
            item.options = val.children
          }
        })
      }, 100)
    },
    /**
     * 
     */
    goConfirm() {
      localStorage.removeItem('advancedSearch')
      this.$emit('advancedSearch', {
        name: this.name,
        list: this.list
      })
      // localStorage.setItem('advancedSearch',JSON.stringify({
      //   name: this.name,
      //   list: this.list
      // }))
      // this.$router.push({
      //   path: '/advancedSearchList',
      //   query: {
      //     advanced: 1
      //   }
      // })
    },
    /**
     * 新增
     */
    addList() {
      this.list.push({
        options: [],
        name: '',
        value: '',
        Fname: '',
      })
    },
    /**
     * 删除
     */
    removeList(index) {
      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.list.splice(index, 1)
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .advancedSearch-box {
    width: 850px;
    .search-top {
      width: 850px;
      height: 50px;
      background: #166AA9;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      >:nth-child(2) {
        cursor: pointer;
      }
    }
    .search-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      margin-top: 30px;
      
      >:nth-child(1) {
        display: flex;
        align-items: center;
        color: #DCDFE6;

        width: 625px;
        height: 50px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        padding: 0 10px;
        ::v-deep(.el-input__wrapper) {
          box-shadow: none !important;
        }
        font-size: 18px;
        >:nth-child(3) {
          cursor: pointer;
        }
      }
    }
    .add-text {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      color: #135287;
      font-weight: 500;
      font-size: 16px;
      .icon-add {
        font-weight: 600;
      }
      >:nth-child(2) {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
    .list-box {
      padding: 0 20px;
      >div {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .Remove-p {
          color: #FF2D2D;
          cursor: pointer;
          font-weight: 500;
        }
      }
    }
  }
</style>
