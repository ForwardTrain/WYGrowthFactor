<template>
  <div class="dataCompare-box">
    <div class="prompt-type">
      <div></div>
      <p>差异数据详情对比</p>
    </div>

    <div class="content-right">
        <div class="content-right-top">
          <!-- <div @click="scrollToAnchor('base_expression_and_location2', 'base_expression_and_location', 0)" :style="topChooseIndex == 0 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_expression_and_location</div>
          <div @click="scrollToAnchor('base_family_and_domain2', 'base_family_and_domain', 1)" :style="topChooseIndex == 1 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_family_and_domain</div>
          <div @click="scrollToAnchor('base_general_infomation2', 'base_general_infomation', 2)" :style="topChooseIndex == 2 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_general_infomation</div>
          <div @click="scrollToAnchor('base_mutation_and_disease2', 'base_mutation_and_disease', 3)" :style="topChooseIndex == 3 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_mutation_and_disease</div>
          <div @click="scrollToAnchor('base_post_translational_modification2', 'base_post_translational_modification',4)" :style="topChooseIndex == 4 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_post_translational_modification</div>
          <div @click="scrollToAnchor('base_protein_function2', 'base_protein_function', 5)" :style="topChooseIndex == 5 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_protein_function</div>
          <div @click="scrollToAnchor('base_protein_interaction2', 'base_protein_interaction',6)" :style="topChooseIndex == 6 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_protein_interaction</div>
          <div @click="scrollToAnchor('base_protein_sequence2', 'base_protein_sequence',7)" :style="topChooseIndex == 7 ? 'color: #1990FF; border-color: #1990FF;' : ''">base_protein_sequence</div>
          <div @click="scrollToAnchor('base_protein_structure2', 'base_protein_structure', 8)" :style="topChooseIndex == 8 ? 'color: #1990FF; border-color: #1990FF;' : ''">
            base_protein_structure
          </div> -->
          <div @click="scrollToAnchor('general_information2', 'general_information', 1)" :style="topChooseIndex == 1 ? 'color: #1990FF; border-color: #1990FF;' : ''">general_information</div>
          <div @click="scrollToAnchor('protein_sequence2', 'protein_sequence', 2)" :style="topChooseIndex == 2 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_sequence</div>
          <div @click="scrollToAnchor('protein_function2', 'protein_function', 3)" :style="topChooseIndex == 3 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_function</div>
          <div @click="scrollToAnchor('expression_and_location2', 'expression_and_location',4)" :style="topChooseIndex == 4 ? 'color: #1990FF; border-color: #1990FF;' : ''">expression_and_location</div>
          <div @click="scrollToAnchor('protein_structure2', 'protein_structure', 5)" :style="topChooseIndex == 5 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_structure</div>
          <div @click="scrollToAnchor('family_and_domain2', 'family_and_domain',6)" :style="topChooseIndex == 6 ? 'color: #1990FF; border-color: #1990FF;' : ''">family_and_domain</div>
          <div @click="scrollToAnchor('protein_interaction2', 'protein_interaction',7)" :style="topChooseIndex == 7 ? 'color: #1990FF; border-color: #1990FF;' : ''">protein_interaction</div>
          <div @click="scrollToAnchor('mutation_and_disease2', 'mutation_and_disease', 8)" :style="topChooseIndex == 8 ? 'color: #1990FF; border-color: #1990FF;' : ''">
            mutation_and_disease
          </div>
          <div @click="scrollToAnchor('post_translational_modification2', 'post_translational_modification', 9)" :style="topChooseIndex == 9 ? 'color: #1990FF; border-color: #1990FF;' : ''">
            post_translational_modification
          </div>
        </div>

        <div class="line-table">
          <div class="table-box" style="margin-right: 15px;">
            <div  class="table-line">
              <div>
                <div v-for="(item, index) in dataInfo.current.list" :key="index"
                    :style="item.op_type == 'equ' ? 'background: #FFBFBF' : item.op_type == 'upd' ? 'background: #E2F6DB' : item.op_type == 'add' ? 'background: #FFE4C0' : item.op_type == 'del' ?  'background: #C0EDFF' : ''"> 
                  <p :ref="`${item.type}`"  :id="`${item.type}`">{{item.type || '-'}}</p>
                </div>
              </div>
              <div>
                <div v-for="(item, index) in dataInfo.current.list" :key="index">
                  {{item.name || '-'}}
                </div>
                
              </div>

              <div>
                <div v-for="(item, index) in dataInfo.current.list" :key="index">
                  {{item.value || '-'}}
                </div>
              </div>

            </div>

          </div>
          <div class="table-box">
            <div  class="table-line">
              <div>
                <div v-for="(item, index) in dataInfo.show.list" :key="index"
                    :style="item.op_type == 'equ' ? 'background: #FFBFBF' : item.op_type == 'upd' ? 'background: #E2F6DB' : item.op_type == 'add' ? 'background: #FFE4C0' : item.op_type == 'del' ?  'background: #C0EDFF' : ''">
                  <p :ref="`${item.type}2`" :id="`${item.type}2`">{{item.type || '-'}}</p>
                </div>
              </div>
              <div>
                <div v-for="(item, index) in dataInfo.show.list" :key="index">
                  {{item.name || '-'}}
                </div>
                
              </div>

              <div>
                <div v-for="(item, index) in dataInfo.show.list" :key="index">
                  {{item.value || '-'}}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
  </div>
</template>

<script>

import { 
  diff_data
} from '@/api/common'
export default {
  data () {
    return {
      topChooseIndex: 1,
      dataInfo: {
        current: {
          list: []
        },
        show: {
          list: []
        }
      },
    }
  },
  mounted() {
    this.getdiff_data()
  },
  methods: {
    scrollToAnchor(anchor, anchor2, index) {
      this.topChooseIndex = index
      this.$nextTick(() => {
        const element = this.$refs[anchor];
        if (element) {
          element[0].scrollIntoView();
        }
      });
      this.$nextTick(() => {
        const element = this.$refs[anchor2];
        if (element) {
          element[0].scrollIntoView();
        }
      });
    },
    goToAnchor(elementId) {
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop;
        this.scrollToPosition(offsetTop);
      }
    },
    scrollToPosition(position) {
      // 可以在这里添加滚动动画效果
      window.scrollTo({
        top: position,
        behavior: 'smooth' // 添加平滑滚动效果
      });
    },
    getdiff_data() {
      diff_data({
        id: this.$route.query.id,
        type: this.$route.query.type,
      }).then((res) => {
        this.dataInfo = res.data
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .dataCompare-box {
    padding: 12px;
    .content-right {
      margin-top: 15px;
      .content-right-top {
        display: flex;
        flex-wrap: wrap;
        >div {
          margin-bottom: 10px;
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
    .line-table {
      display: flex;
     
    }
    /* 滚动条的滑块 */
    ::-webkit-scrollbar-thumb {
      background: #E6E8EC; /* 设置滑块的背景颜色 */
      border-radius: 5px;
    }
    ::-webkit-scrollbar {
      background: #fff !important;
      height: 8px !important;
      width: 8px !important;
    }
    .table-box {
      width: 50% !important;
      overflow: auto;
      border: 1px solid #E5E8EE;
      padding-bottom: 0px !important;

      height: calc(100vh - 300px);
      .table-line {
        display: flex;
        >:nth-child(1) {
          // width: 274px;
          // min-width: 274px;
          // margin-bottom: -1px;
          // // background: #FFBFBF;
          // border: 1px solid #E5E8EE;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          // word-wrap: break-word; /* 允许在单词内换行 */
          margin-left: -1px;
          >div {
            margin-bottom: -1px;
            padding:0 20px;
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE;
            word-wrap: break-word; /* 允许在单词内换行 */
          }
        }
        >:nth-of-type(2) {
          margin-left: -1px;
          >div {
            margin-bottom: -1px;
            padding:0 20px;
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE;
            word-wrap: break-word; /* 允许在单词内换行 */
          }
        }
        >:nth-of-type(3) {
          margin-left: -1px;
          >div {
            margin-bottom: -1px;
            padding:0 20px;
            
            white-space: nowrap;
            height: 48px;
            line-height: 48px;
            background: #FFFFFF;
            border: 1px solid #E5E8EE;
            word-wrap: break-word; /* 允许在单词内换行 */
          }
        }
      }
    }
  }
</style>
