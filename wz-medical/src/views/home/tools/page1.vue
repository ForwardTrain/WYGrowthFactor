<template>
  <div class="page1-box" v-loading="loading1">
    <p class="p-1">Basic Local Alignment Search Tool (BLAST)</p>
    <p class="p-2">BLAST finds regions of similarity between biological sequences. The program compares protein sequences to sequence databases and calculates the statistical significance.</p>

    <div class="box-1">


      <div>
        <!-- or UPI0000000001 -->
        <p>Find a protein sequence to run BLAST sequence similarity search by UniProt ID (e.g. P05067 or A4_HUMAN).</p>
        <div class="input-icon">
          <el-input size="large"  style="width: 870px;"  @input="changeTitle()" v-model="title" placeholder=" " />
          <el-icon style="font-size: 22px;margin-left: -40px;" v-if="!title"><ZoomIn /></el-icon>
          <el-icon @click="title = ''" style="font-size: 22px; cursor: pointer; margin-left: -40px;" v-else><Close /></el-icon>
        </div>
      </div>

      <!-- <div class="step-1">
        Step 1: Enter Query Sequence
      </div> -->
      <p style="font-weight: 600;font-size: 16px;margin: 12px 0 ;">or</p>
      <p>Enter one or more sequences (5 max).</p>

      <el-input style="margin-top: 10px; "
                v-loading="loading"
                class="sequences-input" 
                v-model="sequences" 
                :autosize="{ minRows: 6, maxRows: 40 }"
                type="textarea"
                placeholder="Enter a protein sequence in FASTA format or Bare sequence format（提示词）" />


                                
                          
      <!-- <div class="line-box">
        <p>OR upload a file</p>
        <div>
          <el-upload
                    :headers="{
                      Authorization: Authorization,
                    }"
                    :disabled="$route.query.look"
                    ref="upload"
                    :auto-upload="false"
                    :on-change="onSuccess2"
                    style="width: 240px"
                    :action="actionUrl"
                    class="avatar-uploader"
                    :show-file-list="false"
                    >
                    <div class="updata-btn">
                      点击上传
                    </div>
                  </el-upload>
        </div>
      </div> -->

      <div class="line-box">
        <!-- <p>Job Title</p>
        <div>
          <el-input style="width: 870px;"  v-model="title" placeholder="Enter a descriptive title for your BLAST search（提示词）" />
        </div> -->
      </div>

    </div>

    <div class="box-1 box-11">
      <div class="line-box">
        <div class="line-box3">
          <p>Target database</p>
          <div style="margin-right: 25px">
            <el-select
              v-model="database"
              placeholder="Select"
               size="large"
              style="width: 400px">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        

        
      </div>
    </div>
  

    <div class="line-box3 line-box4" style="margin-top: 10px;">
      <div class="line-box3">
          <p>Restrict by taxonomy</p>
          <div class="input-icon" style="margin-top: 0px;">
            <el-select
              v-model="taxonomy"
               size="large"
              filterable
              remote
              reserve-keyword
              placeholder="Enter Taxon names or IDs to include"
              :remote-method="remoteMethod"
              :loading="loading2"
              style="width: 400px"
              @change="changetaxonomy"
            >
              <el-option
                v-for="item in options22"
                :key="item"
                :label="item.value"
                :value="item"
              />
            </el-select>
            <el-icon style="font-size: 22px;margin-left: -40px;" v-if="!options22.length"><ZoomIn /></el-icon>
            <el-icon @click="taxonomy = ''" style="font-size: 22px; cursor: pointer; margin-left: -40px;" v-else><Close /></el-icon>
          </div>
        </div>


      <div style="margin-left: 50px;" class="taxonomy-List" >
        <div v-for="(item, index) in taxonomyList" :key="index">
          {{item.value}}[{{item.id}}]  <el-icon style="margin-left: 10px; cursor: pointer; " @click="deletetaxonomyList(index)"><CircleClose /></el-icon>
        </div>
      </div>
    </div>

    <div class="line-box3" style="margin-top: 20px;">
      <p>Name your BLAST job</p>
      <div >
       <el-input  size="large" style="width: 400px;"  v-model="BLASTjob" placeholder=" " />
      </div>
    </div>

    <div class="box-1">
      <p style="font-weight: 600; font-size: 24px;">Advanced parameters</p>
      <div class="box-11">
        <div class="line-box">
          <div class="line-box3">
            <p>Sequence type</p>
            <div style="margin-right: 25px">
              <el-select
                v-model="stype"
                placeholder=" "
                 size="large"
                style="width: 190px">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="line-box3">
            <p>Program</p>
            <div style="margin-right: 25px">
              <el-select
                v-model="program"
                placeholder=" "
                 size="large"
                style="width: 190px">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          
          <div class="line-box3">
            <p>E-Threshold</p>
            <div style="margin-right: 25px">
              <el-select
                v-model="exp"
                placeholder=" "
                 size="large"
                style="width: 190px">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="line-box3">
            <p>Matrix</p>
            <div style="margin-right: 25px">
              <el-select
                 size="large"
                v-model="matrix"
                placeholder=" "
                style="width: 190px">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

        </div>
      </div>

      <div class="line-box">
        <div class="line-box3">
          <p>Filter</p>
          <div style="margin-right: 25px">
             <el-select
                 size="large"
                v-model="filter"
                placeholder=" "
                style="width: 190px">
                <el-option
                  v-for="item in options9"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
          </div>
        </div>

        <div class="line-box3">
          <p>Gapped</p>
          <div style="margin-right: 25px">
             <el-select
                 size="large"
                v-model="gapalign"
                placeholder=" "
                style="width: 190px">
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
          </div>
        </div>

        <div class="line-box3">
          <p>Hits</p>
          <div style="margin-right: 25px">
             <el-select
                 size="large"
                v-model="scores"
                placeholder=" "
                style="width: 190px">
                <el-option
                  v-for="item in options10"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
          </div>
        </div>

        <div class="line-box3">
          <p>HSPs per hit</p>
          <div style="margin-right: 25px">
             <el-select
               size="large"
                v-model="hsps"
                placeholder=" "
                style="width: 190px">
                <el-option
                  v-for="item in options7"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-box" style="margin-top: 30px;">
      <el-button class="margin-L" type="info" @click="emptyData">Reset</el-button>
      <el-button :style="!sequences ? 'cursor: not-allowed; opacity: 0.5' : '' " class="margin-L" type="primary" @click="opstBlast()">Blast</el-button>
      
      <!-- <el-checkbox v-model="checked1" label="Run BLAST in a separate window" size="large" /> -->
    </div>
  </div>
</template>

<script>
import {
  HomeContentrun,
} from '@/api/common'


export default {
  data () {
    return {
      loading1: false,
      BLASTjob: '',
      loading: false,
      title: '',
      sequences: '',

      database: 'uniprotkb_refprotswissprot',
      options1: [
        {
          label: 'UniProtKB reference proteomes + Swiss-Prot',
          value: 'uniprotkb_refprotswissprot',
        },{
          label: 'UniProtKB',
          value: 'uniprotkb',
        },{
          label: 'UniProtKB with 3D structure(PDB)',
          value: 'uniprotkb_pdb',
        },{
          label: 'UniProtKB with 3D structure predictions(AlphaFold)',
          value: 'afdb',
        },{
          label: 'UniProtKB reference proteomes',
          value: 'uniprotkb_reference_proteomes',
        },{
          label: 'UniProtKB Swiss-Prot',
          value: 'uniprotkb_swissprot',
        },{
          label: 'UniRef100',
          value: 'uniref100',
        },{
          label: 'UniRef90',
          value: 'uniref90',
        },{
          label: 'UniRef50',
          value: 'uniref50',
        },{
          label: 'UniRarc',
          value: 'uniparc',
        }
      ],

      stype: 'protein',
      options2: [
        {
          label: 'Program',
          value: 'protein',
        },{
          label: 'DNA/RNA',
          value: 'dan',
        }
      ],


      program: 'blastp',
      options3: [
        {
          label: 'blastp',
          value: 'blastp',
        },{
          label: 'blastx',
          value: 'blastx',
        }
      ],

      exp: '10',
      options4: [
        {
          label: '0.00001',
          value: '0.00001',
        },{
          label: '0.0001',
          value: '0.0001',
        },{
          label: '0.001',
          value: '0.001',
        },{
          label: '0.01',
          value: '0.01',
        },{
          label: '0.1',
          value: '0.1',
        },{
          label: '1',
          value: '1',
        },{
          label: '10',
          value: '10',
        },{
          label: '100',
          value: '100',
        },{
          label: '1000',
          value: '1000',
        }
      ],

      matrix: 'BLOSUM62',
      options5: [
        {
          label: 'Auto-BLOSUM62',
          value: 'BLOSUM62',
        },{
          label: 'BLOSUM45',
          value: 'BLOSUM45',
        },{
          label: 'BLOSUM62',
          value: 'BLOSUM62',
        },{
          label: 'BLOSUM80',
          value: 'BLOSUM80',
        },{
          label: 'PAM70',
          value: 'PAM70',
        },{
          label: 'PAM30',
          value: 'PAM30',
        }
      ],
      
      filter: 'F',
      options9: [
        {
          label: 'NONE',
          value: 'F',
        },{
          label: 'Filter low complexity regions',
          value: 'T',
        },
      ],

      gapalign: true,
      options6: [
        {
          label: 'yes',
          value: true,
        },{
          label: 'no',
          value: false,
        }
      ],

      

      hsps: '0',
      options7: [
        {
          label: 'All',
          value: '0',
        },{
          label: '1',
          value: '1',
        },{
          label: '2',
          value: '2',
        },{
          label: '5',
          value: '5',
        },{
          label: '10',
          value: '10',
        },{
          label: '50',
          value: '50',
        },{
          label: '100',
          value: '100',
        }
      ],

      scores: '250',
      options10: [
        {
          label: '50',
          value: '50',
        },{
          label: '100',
          value: '100',
        },{
          label: '250',
          value: '250',
        },{
          label: '500',
          value: '500',
        },{
          label: '750',
          value: '750',
        },{
          label: '1000',
          value: '1000',
        }
      ],

      loading2: false,
      taxonomy: '',
      options22: [],
      taxonomyList: [],


    }
  },
  mounted() {
    if(this.$route.query.unipro_entry) {
      this.getSequences(this.$route.query.unipro_entry)
    }
    if(this.$route.query.BLASTjob) {
      this.BLASTjob = this.$route.query.BLASTjob
    }
  },
  methods: {
    deletetaxonomyList(index) {
      this.taxonomyList.splice(index, 1)
    },
    /**
     * 搜索
     */
    remoteMethod(val) {
      setTimeout(() => {
         console.log(val, 222)
        this.$axios({
          url: `https://rest.uniprot.org/suggester?dict=taxonomy&query=${val}`,
          method: "get",
        }).then((res) => {
          if(res.data) {
            // console.log(res.data, 9898)
            // if(res.data.results && res.data.results.length) {
            //   this.getSequences(res.data.results[0].primaryAccession)
            // }
            // this.BLASTjob = `sp|${res.data.results[0].primaryAccession}|${res.data.results[0].uniProtkbId}`
            console.log(res.data.suggestions, 99999)
            this.options22 = res.data.suggestions
          }
        })
        
      }, 200)
    },
    /**
     * 选择
     */
    changetaxonomy(val) {
      console.log(val, 9898)
      this.taxonomyList.push(val)
      setTimeout(() => {
        this.taxonomy = ''
        this.options22 = []
      }, 100)
    },
    /**
     * 更改title
     */
    changeTitle() {
      console.log(this.title, 23333)
      if(this.title) {
        this.$axios({
          url: `https://rest.uniprot.org/uniprotkb/search?fields=sequence%2Cid%2Creviewed%2Cprotein_name%2Corganism_name%2Cprotein_existence%2Csequence_version&query=${this.title}`,
          method: "get",
        }).then((res) => {
          if(res.data) {
            console.log(res.data, 9898)
            if(res.data.results && res.data.results.length) {
              this.getSequences(res.data.results[0].primaryAccession)
            }
            this.BLASTjob = `sp|${res.data.results[0].primaryAccession}|${res.data.results[0].uniProtkbId}`
          }
        })
      }

      
    },
    /**
     * 清空数据
     */
    emptyData() {
      this.title = ''
      this.sequences = ''


      this.stype = ''
      this.program = ''
      this.exp = ''
      this.matrix = ''
      this.filter = ''
      this.gapalign = ''
      this.scores = ''
      this.hsps = ''
    },
    /**
     * 获取getSequences
     */
    getSequences(val) {
      this.loading = true
      this.$axios({
        url: `https://rest.uniprot.org/uniprotkb/accessions?accessions=${val}&format=fasta`,
        method: "post",
        data: {
          accessions: val,
          format: 'fasta'
        },
      }).then((res) => {
        this.loading = false
        this.sequences = res.data
        
        console.log(res, 9999)
      })
    },
    /**
     * 请求Blast
     */
    opstBlast() {
      this.loading1 = true
      if(!this.sequences) {
        return
      }
      let taxids = []
      this.taxonomyList.forEach((item) => {
        taxids.push(item.id)
      })
      let formdata = new FormData();
      formdata.append('email', 'uuw_dev@uniprot.org')
      formdata.append('program', this.program)
      formdata.append('matrix', this.matrix)
      formdata.append('alignments', this.scores)
      formdata.append('scores', this.scores)
      formdata.append('exp', this.exp)
      formdata.append('filter',  this.filter)
      formdata.append('gapalign', this.gapalign)
      formdata.append('stype', this.stype)
      formdata.append('sequence', this.sequences)
      // formdata.append('sequence', '>sp|A0A1B0GTW7|CIROP_HUMAN Ciliated left-right organizer metallopeptidase OS=Homo sapiens OX=9606 GN=CIROP PE=1 SV=1 \nMLLLLLLLLLLPPLVLRVAASRCLHDETQKSVSLLRPPFSQLPSKSRSSSLTLPSSRDPQ PLRIQSCYLGDHISDGAWDPEGEGMRGGSRALAAVREATQRIQAVLAVQGPLLLSRDPAQ YCHAVWGDPDSPNYHRCSLLNPGYKGESCLGAKIPDTHLRGYALWPEQGPPQLVQPDGPG VQNTDFLLYVRVAHTSKCHQETVSLCCPGWSTAAQSQLTAALTSWAQRRGFVMLPRLCLK LLGSSNLPTLASQSIRITGPSVIAYAACCQLDSEDRPLAGTIVYCAQHLTSPSLSHSDIV MATLHELLHALGFSGQLFKKWRDCPSGFSVRENCSTRQLVTRQDEWGQLLLTTPAVSLSL AKHLGVSGASLGVPLEEEEGLLSSHWEARLLQGSLMTATFDGAQRTRLDPITLAAFKDSG WYQVNHSAAEELLWGQGSGPEFGLVTTCGTGSSDFFCTGSGLGCHYLHLDKGSCSSDPML EGCRMYKPLANGSECWKKENGFPAGVDNPHGEIYHPQSRCFFANLTSQLLPGDKPRHPSL TPHLKEAELMGRCYLHQCTGRGAYKVQVEGSPWVPCLPGKVIQIPGYYGLLFCPRGRLCQ TNEDINAVTSPPVSLSTPDPLFQLSLELAGPPGHSLGKEQQEGLAEAVLEALASKGGTGR CYFHGPSITTSLVFTVHMWKSPGCQGPSVATLHKALTLTLQKKPLEVYHGGANFTTQPSK LLVTSDHNPSMTHLRLSMGLCLMLLILVGVMGTTAYQKRATLPVRPSASYHSPELHSTRV PVRGIREV')
      formdata.append('database', this.database)
      if(this.hsps != '0') {
        formdata.append('hsps', this.hsps === '0' ? '' : this.hsps)
      }
      if(taxids.length) {
        formdata.append('taxids', taxids.toString())
      }
      this.$axios({
        url: `${this.$global.downUrlLeft}/WZGrowth/HomeContent/run`,
        method: "post",
        data: formdata,
        // headers: {
        //   'Authorization': JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token,
        // },
      }).then((res) => {
        let list = []
        if(localStorage.getItem('toolsList')) {
          list = JSON.parse(localStorage.getItem('toolsList'))
        }
        let  databaseName = ''
        this.options1.forEach((item) => {
          if(item.value == this.database) {
            databaseName = item.label
          }
        })
        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth() + 1; // 月份从0开始，因此需要加1
        const day = currentTime.getDate();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        list.unshift({
          id: res.data,
          BLASTjob: this.BLASTjob,
          Status: false,
          sequences: this.sequences,
          time: `${year}-${month}-${day} ${hours}:${minutes}`,
          database: databaseName,
          proteinNames:  '',
          type: 1,
        })
        localStorage.setItem('toolsList', JSON.stringify(list))
        this.loading1 = false
        setTimeout(() => {
          this.$router.push({
            path: '/toolsResults',
            type: 1,
          })
        })
        console.log(res, 888)
      })
    }

    
  },
}
</script>

<style scoped lang='scss'>
.taxonomy-List {
    
    >div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: fit-content;
      padding: 8px 12px;
      border: 1px solid #1990FF;
      border-radius: 4px;
      color: #1990FF;
    }

  }
.sequences-input  {
  font-family: Consolas, "Liberation Mono", Courier, monospace;
}
  .page1-box {
    .p-1 {
      font-weight: 500;
      font-size: 24px;
      margin-top: 15px;
      
    }
    .line-box3 {
      display: flex;
      align-items: center;
      // border: 1px solid red;
      >p {
        margin-right: 15px;
        white-space: nowrap;
      }
    }
    .box-11 {
      display: flex;
      // flex-wrap: wrap;
    }
    .box-1 {
      border-top: 1px solid #DCDFE6;
      margin-top: 10px;
      padding-top: 10px;
      // border: 1px solid red;
    }
    .step-1 {
      width: 100%;
      height: 38px;
      background: #F3F4F6;
      line-height: 38px;
      padding: 0 10px;
    }
    .updata-btn {
      width: 180px;
      height: 40px;
      background: #FFFFFF;
      border-radius: 4px;
      color: #1990FF;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
    .line-box {
      display: flex;
      align-items: center;
      margin: 10px 0;
      >p {
        font-size: 16px;
        margin-right: 10px;
        width: 120px;
        text-align: right;
      }
    }
    .btn-box {
      display: flex;
      align-items: center;
      >:nth-child(2){
        margin-right: 20px;
      }
      margin-bottom: 10px;
    }
  }
  .line-box4 {
    display: flex;
    align-items: flex-start !important;
    
  }
.input-icon {
  display: flex;
  align-items: center;
  margin-top: 15px;
  // border: 1px solid red;
  width: fit-content;
  border-radius: 8px;
  padding-right: 10px;
  color: #DCDFE6;
  ::v-deep(.el-input__wrapper) {
    // box-shadow: none !important; 
    padding-right: 60px;
  }
}
</style>
