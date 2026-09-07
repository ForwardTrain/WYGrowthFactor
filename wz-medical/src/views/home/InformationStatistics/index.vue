<template>
  <div class="InformationStatistics-box">
    <top></top>
    <div class="content-box">
      <div class="content-left">
        <p>DRAMP的数据统计</p>
        <p>（最后修改于2024年9月18日）</p>
        <div class="left-serch">
          <div :style="leftIndex == 1 ? 'background: #F3F4F6;' : ''">1. Composition of DRAMP according to the Dataset of peptides belongs to</div>
          <div>2. Distribution of lengths of sequences for peptides from General dataset</div>
          <div>3. Distribution of lengths of sequences for peptides from Patent dataset</div>
          <div>4. Distribution of lengths of sequences for stapled peptides</div>
          <div>5. Proportions of different anchoring positions patterns for stapled AMPs</div>
          <div>6. Proportions of stapling strategies used to synthesize stapled AMPs</div>
          <div>7. Amino acid composition of peptides from General dataset</div>
          <div>8. Top 8 AMPs for antimicrobial activity against common pathogens in DRAMP</div>
        </div>
      </div>

      <div class="content-right">

      </div>

    </div>
    <bottom></bottom>
  </div>  
</template>

<script>
import top from '../top/index.vue'
import bottom from '../bottom/index.vue'
export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      leftIndex: 1,
    }
  },
  mounted() {
    
  },
  methods: {
    
  },
}
</script>

<style scoped lang='scss'>
  .InformationStatistics-box {
    .content-box {
      margin-top: 15px;
      display: flex;
      .content-left {
        width: 356px;
        padding: 25px 20px;
        >p {
          text-align: center;
          font-weight: 500;
          font-size: 20px;
        }
        .left-serch {
          border-top: 1px solid #E9E9E9;
          margin-top: 10px;
          padding-top: 10px;
          >div {
            width: 316px;
            cursor: pointer;
            // line-height: 38px;
            padding: 10px 10px;
            // background: #F3F4F6;
          }
        }
      }
      .content-right {
        width: 100%;
        padding: 10px;
        margin-right: 20px;
        height: calc(100vh - 200px);
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
      }
    }
  }
</style>
