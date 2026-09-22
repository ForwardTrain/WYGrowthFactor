<template>
  <div class="agreement-list">
    <div class="prompt-type">
      <div></div>
      <p>协议管理</p>
    </div>

    <div class="table-box">
      <el-table :data="results.list"
                height="calc(100vh - 220px)">
        <el-table-column prop="name" label="名称"  width="70%"/>
        
        <el-table-column  width="30%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="goLook(scoped.row)" >查看</p>
              <p @click="goEdit(scoped.row)" >编辑</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import {
  sel_sys_privacy_policy,
} from '@/api/common'
export default {
  data () {
    return {
      results: {
        list: [],
        total: 0,
      },
    }
  },
  mounted() {
    this.getsel_sys_privacy_policy()
  },
  methods: {
    getsel_sys_privacy_policy() {
      sel_sys_privacy_policy({}).then((res) => {
        this.results.list = res.data
      })
    },
    goLook(row) {
      localStorage.setItem('agreement', JSON.stringify(row.content))
      this.$store.commit("setRouterList",{
        name: '查看协议',
        url: '/agreementListEdit',
        query: {
          type: row.type,
          id: row.id,
          look: 1,
        }
      })
      this.$router.push({
        path: '/agreementListEdit',
        query: {
          type: row.type,
          id: row.id,
          look: 1,
        }
      })
    },
    goEdit(row) {
      localStorage.setItem('agreement', JSON.stringify(row.content))
      this.$store.commit("setRouterList",{
        name: '编辑协议',
        url: '/agreementListEdit',
        query: {
          type: row.type,
          id: row.id
        }
      })
      this.$router.push({
        path: '/agreementListEdit',
        query: {
          type: row.type,
          id: row.id
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .agreement-list {
    padding: 15px;
    .table-box {
      margin-top: 20px;
    }
  }
</style>
