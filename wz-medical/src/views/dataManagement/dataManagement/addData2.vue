<template>
  <div class="addData-box2">
    <div class="top-box">
      <div class="prompt-type">
        <div></div>
        <p>新建数据</p>
      </div>

      <div>
        <el-button class="margin-L" type="primary">保存</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">取消</el-button>
      </div>
    </div>

    <div class="content-box">
      <div class="content-left">
        <div class="line-box">
          <p>数据源选择：</p>
          <el-select v-model="value" class="m-2" @change="changeGo" placeholder="友情链接" style="margin-right: 20px;">
            <el-option
              v-for="item in options"
              :key="item.address"
              :label="item.name"
              :value="item.address"
            />
          </el-select>
        </div>
        <div class="line-box">
          <p>表格选取选：</p>
          <div style="width: 210px; display: flex; align-items: center;;">
            <el-upload
              :headers="{
                Authorization: Authorization,
              }"
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="onSuccess">
              <img v-if="addData.sel_picture_url" :src="addData.sel_picture_url" class="avatar" />
              <div style="color: #1990FF; padding: 10px 50px;" v-else>点击上传</div> 
              
            </el-upload>
            <p style="margin-left: 15px; color: #F64334; cursor: pointer;">删除</p>
          </div>
        </div>
        <div class="line-box">
          <el-button class="margin-L" type="primary">上传</el-button>
          <el-button class="margin-L" type="info" @click="emptyData">取消</el-button>
        </div>
      </div>
      <div class="content-right">
        <el-table :data="results.list" 
                ref="multipleTableRef"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
        <el-table-column prop="student_name" label="序号" width="15%"/>
        <el-table-column prop="tel" label="数据名称" width="90%"/>
        <!-- <el-table-column  width="15%" align="center" label="操作">
          <template #default="scoped">
            <div class="table-operation">
              <p @click="changeType(scoped.row, 2)" v-if="scoped.row.status == 1">不通过</p>
              <p @click="changeType(scoped.row, 1)" v-else>通过</p>
              <p @click="goSetting(scoped.row, 1)" >置顶</p>
              <p @click="goSetting(scoped.row, 1)" >取消置顶</p>
              
              <p class="delete-p" @click="openDelete(scoped.row)">删除</p>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      addData: {
        sel_picture_url: '',
      },
      results: {
        list: [
          // {}
        ],
        total: 0,
      },
    }
  },
  mounted() {
    
  },
  methods: {
    onSuccess(uploadFile) {
      const observable =  qiniu.upload(uploadFile.raw, `${Date.now()}${uploadFile.name}`, this.qnToken)
      const observer = {
        next(res){
          
        },
        error(err){
          // ...
        },
        complete(res){
          setTimeout(() => {
              _this.addData.img = `http://filezdmanager.hello2345.com/${res.key}`
            }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },
  },
}
</script>

<style scoped lang='scss'>
  .addData-box2 {
    padding: 12px;
    .top-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content-box {
      display: flex;
      margin-top: 20px;
      .content-left {
        width: 410px;
        min-width: 410px;
        height: 274px;
        background: #FFFFFF;
        border: 1px solid #E5E8EE;
      }
      .content-right {
        padding: 0 20px;
      }
      
    }
    .line-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      margin-top: 40px;
      >p {
        width: 90px;
        min-width: 90px;
        text-align: right;
        white-space: nowrap;
        span {
          color: #FF1B1B;
          
        }
      }
    }
  }
</style>
