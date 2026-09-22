<template>
  <div class="dataAcquisition-box">
    <div class="prompt-type">
      <div></div>
      <p>数据列表</p>
    </div>

    <div class="search-content-box">
      <div class="search-line">
        <p>DRGF ID：</p>
        <div>
          <el-input style="width: 180px" v-model="tel" placeholder=" " />
        </div>


        <el-button class="margin-L" type="primary" @click="getList">搜索</el-button>
        <el-button class="margin-L" type="info" @click="emptyData">清空</el-button>
      </div>
    </div>

    <div class="content-box">
      <div class="content-left">
        <el-table :data="list" 
                  style="width: 100%"
                  border>
          <el-table-column  width="15%" align="center" label="DRGF ID">
            <template #default="scoped">
              <p>1213231</p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="content-right">
        <div class="content-right-top">
          <div v-for="(item, index) in 6" :key="index" :style="topChooseIndex == index ? 'color: #1990FF; border-color: #1990FF;' : ''">Family & Domain</div>
        </div>

        <div class="table-box">
          <div  class="table-line" v-for="(item, index) in 4" :key="index">
            <div>
              General Information一般信息
            </div>
            <div>
              <div>
                Protein name(s) 蛋白质名
              </div>
              <div>
                Gene name(s)
              </div>
              <div>
                Also know as 也称为
              </div>
              <div>
                Gene ID
              </div>
              <div>
                Uniprot Entry Unipro
              </div>
            </div>

            <div>
              <div>
                OMEGA-stichotoxin-Sgtla (OMEGA-SHTX-Sgtla) (EGF-like peptide toxin) (Gigantoxin I) (Gigt I) (Gigantoxin-1;
              </div>
              <div>
                /
              </div>
              <div>
                /
              </div>
              <div>
                /
              </div>
              <div>
                MASFRTLLFAVVILESCULUSSMARGEDMEVETEMNKRUNGUAGICOYASSFOENGGTCRYIPELCHYYCICPODY'TEHRCROMSY
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      topChooseIndex: 0,
    }
  },
  mounted() {
    
  },
  methods: {
    
  },
}
</script>

<style scoped lang='scss'>
  .dataAcquisition-box {
    padding: 12px;
    .content-box {
      margin-top: 15px;
      display: flex;
      .content-left {
        width: 210px;
        min-width: 210px;
        margin-right: 20px;
      }
      .content-right {
        .content-right-top {
          display: flex;
          >div {
            margin-right: 15px;
            cursor: pointer;
            padding: 0 15px;
            height: 28px;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px solid #DCDFE6;
            line-height: 28px;
            text-align: center;
          }
        }
      }
    }
    .table-box {
      .table-line {
        display: flex;
        >:nth-child(1) {
          width: 274px;
          margin-top: -1px;
          background: #FFBFBF;
          border: 1px solid #E5E8EE;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        >:nth-of-type(2) {
          margin-left: -1px;
          >div {
            margin-top: -1px;
            padding:0 20px;
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE
          }
        }
        >:nth-of-type(3) {
          margin-left: -1px;
          >div {
            margin-top: -1px;
            padding:0 20px;
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE
          }
        }
      }
    }
  }
</style>
