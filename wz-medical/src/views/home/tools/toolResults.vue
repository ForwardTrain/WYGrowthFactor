<template>
  <div class="toolResults-box">
    <top></top>

    <div class="content-box">
      <!-- <div class="content-left">
        <p>Tools</p>
        <div class="left-serch">
          <div :style="leftIndex == 1 ? 'background: #F3F4F6;' : ''">Sequence similarity search (BLAST)</div>
          <div>Multiple alignment (Clustal Omega)</div>
      
        </div>
      </div> -->


      <div class="content-right">

        <p class="page-title">Tool results</p>

        <div class="text-1">Your tool analysis results from the last  7 days are listed below.</div>

        <div class="content-box33">
          <div class="line-box1 line-box11">
            <div style="min-width: 136px;">Job type</div>
            <div style="min-width: 296px;">Name</div>
            <div style="min-width: 320px;">Protein Names</div>
            <div style="min-width: 151px;">Created</div>
            <div style="min-width: 252px;;">Status</div>
          </div>

          <div class="content-1" v-for="(item, index) in list" :key="index">
            <div class="line-box1">
              <div>{{item.type == 1 ? 'BLAST' : 'ALIGN'}}</div>
              <div>{{item.BLASTjob}}</div>
              <div class="protein-names" style="padding-top: 0px;">
                <p v-for="(item2, index2) in item.proteinNames" :key="index2">{{item2}}</p>
              </div>
              <div>{{item.time}}</div>
              <div class="Completed-text" @click="goUrl(item)">{{item.Status ? 'Completed' : 'Processing'}} <span v-show="item.hits">({{item.hits}} hits)</span></div>
            </div>
            <div class="line-box1">
              <div style="width: 432px">{{item.id}}</div>
              <div style="width: 0px;padding: 0px;"></div>
              <div></div>
              <div></div>
              <div>Target database: {{item.database}}</div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>

import top from '../top/index.vue'
import bottom from '../bottom/index.vue'


import {
  HomeThreeFiledramp,
} from '@/api/common'

export default {
  components: {
    top,
    bottom,
  },
  data () {
    return {
      leftIndex: 1,
      list: [],
    }
  },
  mounted() {
    if(localStorage.getItem('toolsList')) {
      this.list = JSON.parse(localStorage.getItem('toolsList'))
    }
    setTimeout(() => {
      this.getList()
    }, 100)
  },
  methods: {
    /**
     * 跳转
     */
    goUrl(item) {
      if(item.Status) {
        if(item.type == 2) {
          window.open(`https://www.ebi.ac.uk/Tools/services/rest/clustalo/result/${item.id}/aln-clustal_num`)
        } else {
          HomeThreeFiledramp({
            simiArea: item.sequences
          }).then((res) => {
            // this.tood = res.data
            // this.$router.push({
            //   path:'/resultPage'
            // })
            window.open('/resultPage')
            localStorage.setItem('toolsResult', JSON.stringify(res.data))
            console.log(res.data, 878787)
          })
          // this.$axios({
          //   url: `/WZGrowth/HomeThreeFile/dramp?pass_key=${item.sequences}`,
          //   method: "get",
          // }).then((res) => {

          // })
        }
      }
      
    
    },
    getList() {
      
      // let list = JSON.parse(JSON.stringify(this.list))
      this.list.forEach((item) => {
        // return
        if(!item.Status) {
          this.$axios({
            url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
            method: "get",
          }).then((res) => {
            if(res.data == 'FINISHED') {
              item.Status = true
              localStorage.setItem('toolsList', JSON.stringify(this.list))

              setTimeout(() => {
                this.$axios({
                  url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                  method: "get",
                }).then((res2) => {
                  console.log(res2, 88888)
                  if(res2.data.hits && res2.data.hits.length) {
                    item.hits = res2.data.hits.length
                    item.proteinNames = []
                    res2.data.hits.forEach((item2) => {
                      item.proteinNames.push(item2.hit_uni_de)
                    })
                    localStorage.setItem('toolsList', JSON.stringify(this.list))
                  }
                })
              }, 1000)


            } else {
              setTimeout(() => {
                this.list.forEach((item) => {
                  if(!item.Status) {
                    this.$axios({
                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                      method: "get",
                    }).then((res) => {
                      if(res.data == 'FINISHED') {
                        item.Status = true
                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                        setTimeout(() => {
                          this.$axios({
                            url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                            method: "get",
                          }).then((res2) => {
                            console.log(res2, 88888)
                            if(res2.data.hits && res2.data.hits.length) {
                              item.hits = res2.data.hits.length
                              item.proteinNames = []
                              res2.data.hits.forEach((item2) => {
                                item.proteinNames.push(item2.hit_uni_de)
                              })
                              localStorage.setItem('toolsList', JSON.stringify(this.list))
                            }
                          })
                        }, 1000)
                      } else {
                        setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {
                                  setTimeout(() => {
                                    this.list.forEach((item) => {
                                      if(!item.Status) {
                                        this.$axios({
                                          url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                          method: "get",
                                        }).then((res) => {
                                          if(res.data == 'FINISHED') {
                                            item.Status = true
                                            localStorage.setItem('toolsList', JSON.stringify(this.list))
                                            setTimeout(() => {
                                              this.$axios({
                                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                                method: "get",
                                              }).then((res2) => {
                                                console.log(res2, 88888)
                                                if(res2.data.hits && res2.data.hits.length) {
                                                  item.hits = res2.data.hits.length
                                                  item.proteinNames = []
                                                  res2.data.hits.forEach((item2) => {
                                                    item.proteinNames.push(item2.hit_uni_de)
                                                  })
                                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                                }
                                              })
                                            }, 1000)
                                          } else {
                                            setTimeout(() => {
                                              this.list.forEach((item) => {
                                                if(!item.Status) {
                                                  this.$axios({
                                                    url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                                    method: "get",
                                                  }).then((res) => {
                                                    if(res.data == 'FINISHED') {
                                                      item.Status = true
                                                      localStorage.setItem('toolsList', JSON.stringify(this.list))
                                                      setTimeout(() => {
                                                        this.$axios({
                                                          url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                                          method: "get",
                                                        }).then((res2) => {
                                                          console.log(res2, 88888)
                                                          if(res2.data.hits && res2.data.hits.length) {
                                                            item.hits = res2.data.hits.length
                                                            item.proteinNames = []
                                                            res2.data.hits.forEach((item2) => {
                                                              item.proteinNames.push(item2.hit_uni_de)
                                                            })
                                                            localStorage.setItem('toolsList', JSON.stringify(this.list))
                                                          }
                                                        })
                                                      }, 1000)
                                                    } else {
                                                      setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {
                                  setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {
                                  setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {
                                  setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {
                                  setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {
                                  setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {
                                  setTimeout(() => {
                          this.list.forEach((item) => {
                            if(!item.Status) {
                              this.$axios({
                                url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${item.id}`,
                                method: "get",
                              }).then((res) => {
                                if(res.data == 'FINISHED') {
                                  item.Status = true
                                  localStorage.setItem('toolsList', JSON.stringify(this.list))
                                  setTimeout(() => {
                                    this.$axios({
                                      url: `https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${item.id}/json`,
                                      method: "get",
                                    }).then((res2) => {
                                      console.log(res2, 88888)
                                      if(res2.data.hits && res2.data.hits.length) {
                                        item.hits = res2.data.hits.length
                                        item.proteinNames = []
                                        res2.data.hits.forEach((item2) => {
                                          item.proteinNames.push(item2.hit_uni_de)
                                        })
                                        localStorage.setItem('toolsList', JSON.stringify(this.list))
                                      }
                                    })
                                  }, 1000)
                                } else {

                                }
                              })
                            }
                          })
                        }, 3000)
                                }
                              })
                            }
                          })
                        }, 3000)
                                }
                              })
                            }
                          })
                        }, 3000)
                                }
                              })
                            }
                          })
                        }, 3000)
                                }
                              })
                            }
                          })
                        }, 3000)
                                }
                              })
                            }
                          })
                        }, 3000)
                                }
                              })
                            }
                          })
                        }, 3000)
                                                    }
                                                  })
                                                }
                                              })
                                            }, 3000)
                                          }
                                        })
                                      }
                                    })
                                  }, 3000)
                                }
                              })
                            }
                          })
                        }, 3000)
                      }
                    })
                  }
                })
              }, 3000)
              
            }
          })
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
.Completed-text {
  cursor: pointer;
  color: #135287;
}
  .content-box33 {
    // border: 1px solid red;
    overflow: auto;
    width: calc(100vw - 330px);
  }
  .toolResults-box {
    .content-box {
      display: flex;
      margin-bottom: 20px;
      .content-left {
        width: 306px;
        padding: 25px 20px;
        >:nth-child(1) {
          font-weight: 500;
          font-size: 24px;
        }
        .left-serch {
          border-top: 1px solid #E9E9E9;
          margin-top: 10px;
          padding-top: 10px;
          >div {
            width: 266px;
            height: 38px;
            cursor: pointer;
            line-height: 38px;
            padding: 0 10px;
            // background: #F3F4F6;
          }
        }
      }
    }

    .content-right {
      width: 1180px;
      margin: 0 auto;
      padding-right: 20px;
      .page-title {
        font-weight: 500;
        font-size: 24px;
        color: #333333;
        margin-top: 30px;
      }
      .text-1 {
        margin-top: 35px;
        font-weight: 400;
        // width: fit-content;
        font-size: 16px;
        color: #333333;
        padding: 20px 0px;
        border-top: 1px solid  #DCDFE6;
      }
      .line-box11 {
        >div {
          line-height: 48px;
          font-weight: 600 !important;
        }
      }
      

      .content-1 {
        margin-top: 20px;
        // width: 1510px;
        width: fit-content;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #DCDFE6;
        .line-box1 {
          >div {
            margin-left: 0px;
            border: none !important;
            background: #fff;
            border-radius: 8px;
            padding: 10px 10px;
            font-weight: 400 !important;
            height: auto;
            word-wrap: break-word; /* 或者 overflow-wrap: break-word; */
            word-break: break-all; 
            // line-height: 20px;
          }
        }
      }
    }
  }

  .protein-names {
    height: 50px !important; 
    overflow: auto;
    margin-top: 10px;
  }
  .line-box1 {
    display: flex;
    >div {
      margin-left: -1px;
      width: 296px;
      height: 48px;
      background: #F5F7FA;
      font-size: 16px;
      padding: 0 10px;
      border: 1px solid #E5E8EE;
    }
    >:nth-child(1) {
      width: 136px;
    }
    >:nth-child(2) {
      width: 296px;
    }
    >:nth-child(3) {
      width: 320px;
    }
    >:nth-child(4) {
      width: 151px;
    }
    >:nth-child(5) {
      width: 251px;
    }
    
  }

::v-deep(.container) {
  // display: none !important;
  .col-md-3 {
    display: none !important;
  }
}
</style>
