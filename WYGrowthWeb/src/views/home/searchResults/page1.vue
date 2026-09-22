<template>
  <div class="page-1">
    
    <div class="content-box" ref="box0" id="box0">
      <div class="title-box">
        General Information

        <el-icon class="icon-box" v-if="showTable1" @click="showTable1 = !showTable1"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable1 = !showTable1"><CaretTop /></el-icon>
      </div>

      <div class="box-content" v-show="showTable1">

        <div class="line-box line-box23" v-show="dataInfo.general_information.drgfCode">
          <p>DRGF ID</p>
          <div style="line-height: 24px;">{{dataInfo.general_information.drgfCode}}</div>
        </div>

        <div class="line-box line-box23" v-show="dataInfo.general_information.protein_name">
          <p>Protein Name(s)</p>
          <div style="line-height: 24px;">{{dataInfo.general_information.protein_name}}</div>
        </div>
        <div  class="line-box" v-show="dataInfo.general_information.gene_also_known_as && (!dataInfo.general_information.gene_names && !dataInfo.general_information.gene_name)">
          <p>Gene(s)</p>
          <div>{{dataInfo.general_information.gene_also_known_as}}</div>
        </div>

        <div class="line-box line-box23" v-show="dataInfo.general_information.gene_name">
          <p>Gene Name(s)</p>
          <div style="line-height: 24px;">
            <span :style="dataInfo.general_information.gene_url ? 'color: #135287;cursor: pointer;' : ''" @click="windowOpen(dataInfo.general_information.gene_url)">{{dataInfo.general_information.gene_names}} </span> <span v-show="dataInfo.general_information.gene_also_known_as">({{dataInfo.general_information.gene_also_known_as}})</span> provided by <span style="color: #135287;cursor: pointer;"  @click="windowOpen(`https://www.ncbi.nlm.nih.gov/gene`)">Gene</span>
            
            <!-- <span v-html="dataInfo.general_information.gene_name"></span> -->
          </div>
        </div>
        <div class="line-box" v-show="dataInfo.general_information.organism">
          <p>Organism</p>
          <!-- <div>{{dataInfo.general_information.organism}}</div> -->
          <div v-if="dataInfo.general_information && dataInfo.general_information.organism">
            <span v-html="showText2(dataInfo.general_information.organism)"></span>
          </div>
        </div>
        <!-- <div class="line-box">
          <p>Family</p>
          <div></div>
        </div> -->
        
        <!-- <div class="line-box">
          <p>Protein Status：</p>
          <div>{{dataInfo.general_information.protein_status}}</div>
        </div> -->
        <div class="line-box" v-show="dataInfo.general_information.family_list && dataInfo.general_information.family_list.length">
          <p>Family</p>
          <div>
            Belongs to 
            <span style="color: #135287;cursor: pointer;" @click="goFamily(item)" v-for="(item, index) in dataInfo.general_information.family_list" :key="index"> {{item.name}}</span>
          </div>
        </div>
        
        <div class="line-box" v-show="dataInfo.general_information.unipro_entry">
          <p>UniProt Entry</p>
          <div class="href-p" style="color: #135287;cursor: pointer;" @click="goRouter()">{{dataInfo.general_information.unipro_entry}}</div>
        </div>
        <div class="line-box" v-show="dataInfo.general_information.protein_status">
          <p>Protein Status</p>
          <div>{{dataInfo.general_information.protein_status}}</div>
        </div>
      </div>
    </div>

    <div class="content-box" ref="box1" id="box1">
      <div class="title-box title-box2">
        <div>
          Protein Sequence
          <el-icon class="icon-box" v-if="showTable2" @click="showTable2 = !showTable2"><CaretBottom /></el-icon>
          <el-icon class="icon-box" v-else @click="showTable2 = !showTable2"><CaretTop /></el-icon>
        </div>

        <div  class="right-middle">
          <div>
             <div class="Download-btn" @click="downLoadFaily()" >
                <el-icon style="font-size: 16px;margin-right: 5px;"><Download /></el-icon>
                Download
              </div>

              <div style="margin-right: 10px;" class="Download-btn" @click="goTools(1)">
                <el-icon style="font-size: 16px;margin-right: 5px;"><Tools /></el-icon>
                Blast
              </div>
          </div>
        </div>
      </div>

      <div  class="box-content" v-show="showTable2" >
        <div class="line-list" style="padding-left: 25px;margin-top: 10px;">
          <!-- <div v-for="(item, index) in dataInfo.protein_sequence.list" :key="index">
            <p>{{item.length}}</p>
            <p>
              <span :style="showBackground(index, index2)" v-for="(item2, index2) in item.list" :key="index2">{{item2}}</span>
            </p>
          </div> -->
          <div v-for="(item, index) in dataInfo.protein_sequence.complete_list" :key="index">
            <p v-if="index + 1 != dataInfo.protein_sequence.complete_list.length">{{(index + 1) * 10}}</p>
            <p v-else style="color: #fff;">p</p>
            <p>
              <span :style="showBackground(index, index2)" v-for="(item2, index2) in item" :key="index2">{{item2}}</span>
            </p>
          </div>
        </div>

        <div class="table-box">

          <div class="table-box11-1"><p style="color: rgb(112,34,48);">Type</p> <p style="color: rgb(112,34,48); width: 120px">Positions</p> <p style="color: rgb(112,34,48);width: 120px">Length</p> <p style="color: rgb(112,34,48);width: 420px">Description</p></div>
         
          <div class="table-box222">
            <div class="protein_sequence-list" v-for="(item, index) in dataInfo.protein_sequence.list" :key="index" >
              <p class="choose-text" @click="chooseTextF(item.start, item.end, index)"><span :style="complete_listIndex == index ? 'background: yellow;' : ''">{{item.type}}</span></p> <p style="width: 120px;">{{item.start}} - {{item.end}}</p> <p style="width: 120px;">{{item.length}}</p> <p style="width: 420px">{{item.description ?  item.description : item.egfLike ? item.egfLike : ''}}</p>
            </div>
          </div>
          
          <!-- <div><p class="choose-text" @click="chooseTextF(2)"><span :style="chooseText == 2? 'background: #DCDFE6' : ''">Mature form</span></p> <p style="width: 120px">{{dataInfo.protein_sequence.mature_form_start}} - {{dataInfo.protein_sequence.mature_form_end}}</p> <p>{{dataInfo.protein_sequence.mature_form_length}}</p></div> -->
          <!-- <div><p class="choose-text" @click="chooseTextF(3)"><span :style="chooseText == 3? 'background: #DCDFE6' : ''">Complete form</span></p> <p style="width: 120px">1 - {{dataInfo.protein_sequence.length}}</p> <p>{{dataInfo.protein_sequence.length}}</p></div> -->
        </div>

        <div style="margin-top: 20px;margin-bottom: 20px;padding: 20px;" v-show="false">
          <el-config-provider :locale="locale">
              <el-table :data="dataInfo.family_and_domain.domain" 
                      ref="multipleTableRef"
                      style="width: 100%"
                      border
                      >
              
              
              <el-table-column type="expand" width="2%">
                <template #default="scoped">
                  <div m="4" class="table-box-1">
                    
                    <h3 style="margin-left: 100px;">Sequence：{{scoped.row.sequence}}</h3>
                    
                  </div>
                </template>
              </el-table-column>

              <el-table-column prop="type" label="TYPE" width="5%">
                <template #default="scoped">
                  <p :style="domainIndex == scoped.$index ? 'background: yellow;width: fit-content;' : 'width: fit-content;'" @click="chooseDomain(scoped.row.position, scoped.$index)" style="color: #135287;cursor: pointer;">{{scoped.row.type}}</p>
                </template>
              </el-table-column>


              <el-table-column prop="position" label="Position" width="6%"/>
              <!-- <el-table-column prop="EGF-like" label="Name" width="10%"/> -->
              <el-table-column prop="EGF-like" label="Description" width="10%"/>
            </el-table>
          </el-config-provider>
          
        </div>
      </div>
    </div>

    <div class="content-box" ref="box2" id="box2">
      <div class="title-box">
        Protein Function
        <el-icon class="icon-box" v-if="showTable3" @click="showTable3 = !showTable3"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable3 = !showTable3"><CaretTop /></el-icon>
      </div>

      <div class="box-content" v-show="showTable3"> 
        <div style="line-height: 26px;">
          <p v-for="(item, index) in dataInfo.protein_function.function" :key="index">
            <!-- {{item.value}}  -->
            <span v-html="item.value"></span>
            <span v-show="showPMID1F(item.evidences)">(PMID:</span> <span v-show="item2.source == 'PubMed'" v-for="(item2, index2) in item.evidences" :key="index2" style="color: #135287;cursor: pointer;" @click="windowOpen(`https://pubmed.ncbi.nlm.nih.gov/${item2.id}`)">{{item2.id}}<span v-show="index2 + 1 != item.evidences.length">, </span></span><span v-show="showPMID1F(item.evidences)">)</span>
          </p>
        </div>
        <div class="change-value1" style="margin-top: 15px;">
          <p style="font-weight: 500;font-size: 22px;">GO Terms  </p>
           <p style="color: #666666;margin-left: 10px;">Complete annotation on <span style="color: #135287;cursor: pointer;" @click="windowOpen('https://www.ebi.ac.uk/QuickGO')">QuickGO</span></p>
        </div>
        
        <div class="line-box2">
          <div>
            <!-- style="color: rgb(112,34,48);" -->
            <p >Aspect</p>
            <!-- <p style="color: rgb(112,34,48);">Chemoattractant Activity</p> -->
            <p :style="item == 'Biological Process' ? 'color: rgb(170, 128, 100);' : item == 'Cellular Component' ? 'color: rgb(20,118, 186);white-space: nowrap;' : 'color: rgb(248, 151, 95);white-space: nowrap;'" v-for="(item, index) in dataInfo.protein_function.Aspect" :key="index">{{item}}</p>
          </div>
          <!-- style="color: rgb(112,34,48);" -->
          <div>
            <p >Description</p>
            <!-- <p style="color: rgb(112,34,48);">Activation of MAPK Activity</p> -->
            <p v-for="(item, index) in dataInfo.protein_function.Term" :key="index">{{item.name}} <span style="color: #135287;cursor: pointer;" @click="windowOpen(`https://pubmed.ncbi.nlm.nih.gov/${item.pubMed}`)" v-show="item.pubMed">(PMID: {{item.pubMed}})</span></p>
          </div>
          <div>
            <!-- style="color: rgb(112,34,48);" -->
            <p >GO ID</p>
            <!-- <p style="color: rgb(112,34,48);">Extracellular Space</p> -->
            <p  style="cursor: pointer;color:#135287;white-space: nowrap;" v-for="(item, index) in dataInfo.protein_function.Goid" :key="index" @click="openUrl(item)" v-show="item.name">GO: {{item.name}}</p>
          </div>

        </div>
      </div>
    </div>

    <div class="content-box" ref="box3" id="box3" v-show="showExpressionLocation">
      <div class="title-box">
        Expression & Location
        <el-icon class="icon-box" v-if="showTable4" @click="showTable4 = !showTable4"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable4 = !showTable4"><CaretTop /></el-icon>
      </div>

      <div class="box-content" style="min-height: 100px;" v-show="showTable4">
        <div class="text-2">

            <!-- <el-icon><Promotion /></el-icon> -->
            <div >
              <p>For more details</p>
              please visit the 
              <span v-if="dataInfo.expression_and_location.is_human == 1" @click="windowOpen(`https://www.proteinatlas.org/${dataInfo.expression_and_location.hpa_code}`)" style="color: #135287;cursor: pointer;">HPA database</span>
              <span v-else @click="windowOpen(`https://www.bgee.org/gene/${dataInfo.expression_and_location.hpa_code}`)" style="color: #135287;cursor: pointer;">bgee database</span>
            </div>
          </div>
        <div class="line-box" v-if="dataInfo.expression_and_location.developmental_stage && dataInfo.expression_and_location.developmental_stage.length && dataInfo.expression_and_location.developmental_stage[0].value">
          <p>Induction:</p>
        </div>
        <div class="retract-text">
          <p  v-for="(item, index) in dataInfo.expression_and_location.induction" :key="index">
            <span v-html="item.value"></span>
            <span v-show="item.evidences && item.evidences.length">（PMID: </span><span style="color: #135287;cursor: pointer;" @click="windowOpen(`https://pubmed.ncbi.nlm.nih.gov/${item2.id}`)" v-for="(item2, index2) in item.evidences" :key="index2">{{item2.id}}<span v-show="index2 + 1 != item.evidences.length">, </span></span><span v-show="item.evidences && item.evidences.length">）</span>
          </p>
        </div>


        

        <div class="line-box" v-if="dataInfo.expression_and_location.developmental_stage && dataInfo.expression_and_location.developmental_stage.length && dataInfo.expression_and_location.developmental_stage[0].value">
          <p>Developmental Stage:</p>
        </div>
        <div class="retract-text">
          <p style="max-width: 800px;" v-for="(item, index) in dataInfo.expression_and_location.developmental_stage" :key="index">
            <span v-html="item.value"></span>
            <span v-show="item.evidences && item.evidences.length">（PMID: </span><span style="color: #135287;cursor: pointer;" @click="windowOpen(`https://pubmed.ncbi.nlm.nih.gov/${item2.id}`)" v-for="(item2, index2) in item.evidences" :key="index2">{{item2.id}}<span v-show="index2 + 1 != item.evidences.length">, </span></span><span v-show="item.evidences && item.evidences.length">）</span>
          </p>
        </div>
        <!-- <div class="retract-text">{{dataInfo.expression_and_location.developmental_stage ? dataInfo.expression_and_location.developmental_stage : '-'}}</div> -->
        <div>

        </div>



        <div>

          


          <div class="line-box" v-show="dataInfo.expression_and_location.tissue_specificity_rna">
            <p style="margin-right: 0px;">Tissue Specificity: </p>
            <div style="font-size: 16px;">
                  {{dataInfo.expression_and_location.tissue_specificity_rna}}
            </div>
          </div>

         
          

          
          <div>
            <!-- <div class="retract-text">{{dataInfo.expression_and_location.tissue_specificity2 ? dataInfo.expression_and_location.tissue_specificity2 : dataInfo.expression_and_location.tissue_specificity3 ? dataInfo.expression_and_location.tissue_specificity3 : dataInfo.expression_and_location.tissue_specificity1 ? dataInfo.expression_and_location.tissue_specificity1 : '-'}}</div> -->

            <!-- <div class="line-box" v-show="dataInfo.expression_and_location.expression_specificity">
              <p style="margin-right: 2px;">Expression Specificity: </p>
              <div style="font-size: 16px;">
                  {{dataInfo.expression_and_location.expression_specificity}}
              </div>
            </div> -->

            <!-- <div class="line-box" v-show="dataInfo.expression_and_location.hpa_single_cell_type_specificity">
              <p style="margin-right: 2px;">Single Cell Type Specificity: </p>
              <div style="font-size: 16px;">
                  {{dataInfo.expression_and_location.hpa_single_cell_type_specificity}}
              </div>
            </div> -->
            

            <div class="line-box change-value2" v-show="dataInfo.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW">
              <p>RNA Expession Overview</p>
            </div>
            <div class="echarts-box" ref="echarts1" v-show="dataInfo.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW">

            </div>
            <!-- <img style="max-width: 1000px;margin-left: 25px;width: 100%;" :src="dataInfo.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW" alt=""> -->
          </div>
        </div>

        <div v-if="dataInfo.expression_and_location && dataInfo.expression_and_location.expression_specificity">
          <div class="line-box">
            <p>Expression Specificity: </p>
          </div>
          <div class="retract-text">{{dataInfo.expression_and_location.expression_specificity ? dataInfo.expression_and_location.expression_specificity : ''}}</div>
        </div>
      </div>
    </div>

    
    <!-- v-if="dataInfo.family_and_domain && dataInfo.family_and_domain.structured_list && dataInfo.family_and_domain.structured_list.length" -->
    <div class="content-box" ref="box4" id="box4" v-if="dataInfo.protein_structure && dataInfo.protein_structure.structured_list && dataInfo.protein_structure.structured_list.length" >
      <div class="title-box">
        <!-- Structure & Domian -->
        Protein Structure
        <el-icon class="icon-box" v-if="showTable10" @click="showTable10 = !showTable10"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable10 = !showTable10"><CaretTop /></el-icon>
      </div>

      <div  v-show="showTable10">
        <!-- v-if="dataInfo.family_and_domain && dataInfo.family_and_domain.structured_list && dataInfo.family_and_domain.structured_list.length" -->
        <div class="todo2">
          <!-- <div>

          </div> -->
          <!-- :style="dataInfo && dataInfo.protein_structure && dataInfo.protein_structure.structure_num ? `height: ${590 + CalculatedAltitude()}px` : `height: 480px` " -->
          
          <div style="height: 230px; " class="iframe-box">
            <!-- src="https://www.uniprot.org/uniprotkb/A0JNW5/entry#structure" -->
            <iframe
              ref="myIframe"
              id="myIframe"
              @load="iframeLoaded"
              :src="`https://www.uniprot.org/uniprotkb/${getunipro_entry()}/entry#structure`"
              style="width: 1305px;position: absolute;left: -350px;  top: -368px; height: 1000px;"
            ></iframe>
          </div>
          <div>
          
          </div>
          <div class="right-table2">
            <el-config-provider :locale="locale">
              <el-table :data="dataInfo.protein_structure.structured_list" 
                        ref="multipleTableRef"
                        height="230px">
                <el-table-column prop="source" label="Source" width="10%">
                 <template #default="scoped">
                    <p style="color: #333;">{{scoped.row.source}}</p>
                  </template>
                </el-table-column>

                <el-table-column prop="identifier" label="Identifier" width="10%">
                  <template #default="scoped">
                    <p style="color: #135287;cursor: pointer; font-size: 15px;" @click="goPage(scoped.row)">{{scoped.row.identifier}}</p>
                  </template>
                </el-table-column>


                <el-table-column prop="method" label="Method" width="9%">
                  <template #default="scoped">
                    <p style="color: #333;">{{scoped.row.source == 'AlphaFold' ? 'Prediction' : scoped.row.identifier }}</p>
                  </template>
                </el-table-column>

                <el-table-column prop="resolution" label="Resolution" width="11%">
                  <template #default="scoped">
                    <p style="color: #333;">{{scoped.row.resolution || '-'}}</p>
                  </template>
                </el-table-column>
                
                <el-table-column prop="chain" label="Chain" width="7%">
                  <template #default="scoped">
                    <p style="color: #333;">{{scoped.row.chain || '-'}}</p>
                  </template>
                </el-table-column>

                <el-table-column prop="positions" label="Positions" width="10%">
                  <template #default="scoped">
                    <p style="color: #333;">{{scoped.row.positions || '-'}}</p>
                  </template>
                </el-table-column>
              
              </el-table>
            </el-config-provider>
            
          </div>
          <!-- <div class="absolute-box1"></div> -->
          <!-- <div class="absolute-box2"></div> -->
          <div class="absolute-box3"></div>
          <div class="absolute-box4"></div>
          <!-- <div class="absolute-box5"></div> -->
          <!-- <div class="absolute-box6">
            choose to switch sources to replace model data
          </div>-->
          <!-- <div class="absolute-box7"></div>  -->
          <!-- <div class="absolute-box8" :style="`height: ${27 + CalculatedAltitude()}px`"></div>
          <div class="absolute-box9" :style="`height: ${27 + CalculatedAltitude()}px`"></div>
          <div class="absolute-box10" :style="`height: ${27 + CalculatedAltitude()}px`"></div> -->
        </div>

        <!-- <p style="font-weight: 500;font-size: 24px;margin: 20px;">Domian</p> -->

        <!-- <div class="domain-box">
          
          <div v-for="(item, index) in dataInfo.family_and_domain.domain" :key="index">
            <img :src="item.img" alt="">
          </div>
          <div class="line-box"></div>
        </div> -->

        
      </div>
    </div>

    <div class="content-box" ref="box5" id="box5" v-show="dataInfo.protein_interaction.protein_complex">
      <div class="title-box">
        Protein Interactions
        <el-icon class="icon-box" v-if="showTable5" @click="showTable5 = !showTable5"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable5 = !showTable5"><CaretTop /></el-icon>
      </div>

      <div class="box-content" v-show="showTable5">
        <p style="font-weight: 500;font-size: 16px;margin-top: 10px;color: rgb(112,34,48);" v-show="dataInfo.protein_interaction && dataInfo.protein_interaction.protein_complex && dataInfo.protein_interaction.protein_complex.length">Protein complex</p>
        <!-- <p style="margin-top: 5px;">{{dataInfo.protein_interaction.protein_complex}}</p> -->
        <p  v-for="(item, index) in dataInfo.protein_interaction.protein_complex" :key="index" style="margin-top: 10px;line-height: 22px;">
            <!-- {{item.value}}  -->
            <span v-html="item.value"></span>
            <span>
              <span v-show="showPMID2F(dataInfo.protein_interaction.protein_complex)">   &nbsp;&nbsp;(PMID:</span> <span style="color: #135287;cursor: pointer;" @click="windowOpen(`https://pubmed.ncbi.nlm.nih.gov/${item2.id}`)" v-show="item2.source == 'PubMed'" v-for="(item2, index2) in item.evidences" :key="index2">{{item2.id}}<span style="color: #000;" v-show="index2 + 1 != item.evidences.length">, </span></span><span v-show="showPMID2F(dataInfo.protein_interaction.protein_complex)">)</span>
            </span>
          </p>
        <p style="font-weight: 500;font-size: 16px;margin-top: 20px;color: rgb(112,34,48);">Protein-protein interaction</p>

        <div class="protein-Interactions">
          <div class="img-box2">
            <img style="cursor: pointer;"  @click="windowOpen(dataInfo.protein_interaction.img_url)" :src="dataInfo.protein_interaction.svg" alt="">
          </div>

          <div class="STRING-Database" v-show="!dataInfo.protein_interaction.content" style="">
            <p style="color: rgb(112,34,48);">STRING Database</p>
            <!-- <p>{{dataInfo.protein_interaction.content}}</p> -->
            <!-- 跳转地址还没给 -->
            <p style="font-size: 16px;line-height: 22px;margin-bottom: 30px;">The network on the left comes from <span style="color: #135287;cursor: pointer;" @click="windowOpen('https://cn.string-db.org')"> STRING</span>, a database of known and predicted protein interactions. Displayed here is the evidence view, where different line colors represent the types of evidence for the association.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box" ref="box6" id="box6">
      <div class="title-box">
        KEGG Pathways
        <el-icon class="icon-box" v-if="showTable6" @click="showTable6 = !showTable6"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable6 = !showTable6"><CaretTop /></el-icon>
      </div>

      <div class="box-content" v-show="showTable6">
        <p style="font-weight: 500;font-size: 16px;margin-top: 10px;">{{dataInfo.kegg_pathways.drgfCode}} <span> is possibly involved in the following metabolic pathways</span></p>

        <div class="Pathway-name" v-show="dataInfo.kegg_pathways && dataInfo.kegg_pathways.pathway_data && dataInfo.kegg_pathways.pathway_data.length">
          <p >Pathway ID</p>
          <p>Pathway Name</p>
        </div>
        <div class="KEGG-box">
          <div>
            <div v-for="(item, index) in dataInfo.kegg_pathways.pathway_data" :key="index" style="margin-bottom: 5px;">
              <p class="col1" style="color: #135287;" @click="windowOpen(item.pathway_url)">{{item.pathway_id}}</p>
              <p >{{item.pathway_name}}</p>
            </div>
          </div>
          <div v-show="dataInfo.kegg_pathways && dataInfo.kegg_pathways.pathway_data && dataInfo.kegg_pathways.pathway_data.length" style="font-weight: 500;line-height: 22px;font-size: 16px;margin-left: 140px !important;margin-top: -23px;">
            <!-- {{dataInfo.kegg_pathways.content}} -->
            <!-- The pathways on the left comes from , <span style="color: #135287;cursor: pointer;font-weight: 500;" @click="windowOpen(dataInfo.kegg_pathways.pathways)">KEGG</span> a database resource for understanding high-level functions and utilities of the biological system, such as the cell, the organism and the ecosystem, from molecular-level information, especially large-scale molecular datasets generated by genome sequencing and other high-throughput experimental technologies. -->
            The network on the left comes from <span style="color: #135287;font-size: 16px;cursor: pointer;font-weight: 500;" @click="windowOpen(dataInfo.kegg_pathways.pathways)">KEGG</span>, a database resource for understanding high-level functions and utilities of the biological system.
          </div>
        </div>
      </div>
    </div>
    <div class="content-box" ref="box7" id="box7" v-show="dataInfo.post_translational_modification && dataInfo.post_translational_modification.length"> 
      <div class="title-box">
        Post-translational modification (PTM)
        <el-icon class="icon-box" v-if="showTable7" @click="showTable7 = !showTable7"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable7 = !showTable7"><CaretTop /></el-icon>
      </div>

      <div class="box-content table-disease todo22" v-show="showTable7">
        <el-config-provider :locale="locale">
            <el-table :data="dataInfo.post_translational_modification" 
                    ref="multipleTableRef"
                    style="width: 100%"
                    border>
            <!-- <el-table-column width="5%" type="selection"/> -->
            <!-- <el-table-column prop="student_name" label="访问时间" width="10%"/> -->
            <el-table-column prop="site" label="Site" width="5%"/>
            <el-table-column prop="ptm_type"  label="PTM Type" width="6%"/>
            <!-- <el-table-column prop="source_all" label="Source" width="10%"/> -->
            <el-table-column prop="status" label="Source" width="10%">
              <template #default="scoped">
                <a style="color: #135287;" :href="scoped.row.source_all">{{scoped.row.source_txt}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="pmid" label="Description" width="10%"/>
            <!-- <el-table-column prop="status" label="状态" width="10%">
              <template #default="scoped">
                <p>{{scoped.row.status == 1 ? '启用' : '禁用'}}</p>
              </template>
            </el-table-column> -->
          </el-table>
        </el-config-provider>
        
      </div>
    </div>
    <div class="content-box" ref="box8" id="box8" v-show="dataInfo.mutation_and_disease && dataInfo.mutation_and_disease.disease_json && dataInfo.mutation_and_disease.disease_json.length">
      <div class="title-box">
        Mutation & Disease
        <el-icon class="icon-box" v-if="showTable8" @click="showTable8 = !showTable8"><CaretBottom /></el-icon>
        <el-icon class="icon-box" v-else @click="showTable8 = !showTable8"><CaretTop /></el-icon>
      </div>

      <div class="box-content table-disease todo22" v-show="showTable8">
        <el-config-provider :locale="locale">
          <el-table :data="dataInfo.mutation_and_disease.disease_json" 
                    ref="multipleTableRef"
                    >
            <el-table-column prop="type" label="Type" width="5%">
               <template #default="scoped">
                <p style="font-size: 15px;">{{scoped.row.type}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="positions" label="Positions(s)" width="6%">

               <template #default="scoped">
                <p style="font-size: 15px;">{{scoped.row.positions}}</p>
              </template>
            </el-table-column>

            <el-table-column prop="sequence" label="Sequence" width="6%">

               <template #default="scoped">
                <p style="font-size: 15px;">{{scoped.row.sequence}}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="description" label="DESCRIPTION" width="6%"/> -->
            <el-table-column prop="description" label="Description" width="10%">
              <template #default="scoped">
                <p style="font-size: 15px;">{{scoped.row.description}}：<span style=" font-size: 15px;color: #135287;cursor: pointer;font-size: 500;" @click="windowOpen(item.url)" v-for="(item, index) in scoped.row.featureCrossReferences" :key="index">{{item.id}}</span> </p>
              </template>
            </el-table-column>
          
          </el-table>
        </el-config-provider>
        
      </div>
    </div>
    <!-- <goTop class="go-top"></goTop> -->
  </div>
</template>

<script>
import {
  sel_search_details
} from '@/api/common'
import * as echarts from 'echarts';

import goTop from '../goTop.vue'

import en from 'element-plus/es/locale/lang/en'

export default {
  components: {
    goTop
  },
  data () {
    return {
      showPMID1: false,
      showPMID2: false,
      locale: en,

      showTable1: true,
      showTable2: true,
      showTable3: true,
      showTable4: true,
      showTable5: true,
      showTable6: true,
      showTable7: true,
      showTable8: true,
      showTable10: true,

      textStart: 1,
      textEnd: 1,

      chooseText: 1,
      loading: false,
      dataInfo: {
        general_information: {},
        protein_sequence: {
          list: [],
        },
        protein_function: {},
        expression_and_location: {},
        protein_structure: {
          structure_num: null
        },
        protein_interaction: {},
        kegg_pathways: [],
        post_translational_modification: [],
        mutation_and_disease: [],
        family_and_domain: {
          domain: []
        },
        complete_listIndex: '',
      },
      domainIndex: null,
      showExpressionLocation: true,
    }
  },
  mounted() {
    // this.loading = true
    // setTimeout(() => {
    //   window.scrollTo({
    //     top: 0,
    //   });
    //   this.loading = false
    // }, 2500)
    this.getsel_search_details()
    
  },
  methods: {
    showPMID2F(list) {

      if(list) {
        list.forEach((item) => {
          if(item.evidences) {
            item.evidences.forEach((item2) => {
              if(item2.id) {
                this.showPMID2 = true
              }
            })
          }
        })
      } else {
        this.showPMID1 = false
      }
      
      return this.showPMID2
      
    },
    showPMID1F(list) {
      console.log(list, 3333)
      if(list) {
        list.forEach((item) => {
          if(item.id && item.source == 'PubMed') {
            this.showPMID1 = true
          }
        })
      } else {
        this.showPMID1 = false
      }
      
      return this.showPMID1
      
    },
    goPage(row) {
      if(row.source == 'PDB') {
        window.open(`https://www.rcsb.org/structure/${row.identifier}`)
      } else {
        // https://alphafold.ebi.ac.uk/entry/P05067
        window.open(`https://alphafold.ebi.ac.uk/entry/${row.identifier}`)
      }
      console.log(row, 22222)
      // windowOpen(`https://www.rcsb.org/structure/${scoped.row.identifier}`)
    },
    showText2(item) {
      const bracketIndex = item.indexOf('(');
      if(bracketIndex == -1) {
        return item        
      } else {
        return `<span style="font-style: italic !important;">${item.substring(0, bracketIndex)}</span><span>${item.substring(bracketIndex)}</span>`
      }
    },
    getunipro_entry() {
      if(localStorage.getItem('unipro_entry')) {
        return JSON.parse(localStorage.getItem('unipro_entry')).toString()
      }
    },
    /**
     * 选择domain
     */
    chooseDomain(item, index) {
      this.domainIndex = index
      
      let list = item.split('-')
      console.log(list, 2222)
      if(list.length) {
        this.chooseTextF(Number(list[0]), Number(list[1]), null, true)
      }
      
    },
    /**
     * 前往tools
     */
    goTools(type) {
      // let list = []
      // let name1 = ''
      // let name2 = ''
      // this.results.list.forEach((item, index) => {
      //   this.multipleSelection.forEach((item2) => {
      //     if(item.id == item2) {
      //       list.push(item.unipro_entry)
      //     }
      //     if(index == 1) {
      //       name1 = item.unipro_entry
      //       name2 = item.protein_name
      //     }
      //   })
      // })
      this.$router.push({
        path: '/tools',
        query: {
          type: type,
          unipro_entry: this.dataInfo.general_information.unipro_entry,
          BLASTjob: `sp|${this.dataInfo.general_information.unipro_entry}|${this.dataInfo.general_information.protein_name}`
        }
      })
    },

    downLoadFaily() {
      // export_search_result_fast(this.multipleSelection).then((res) => {

      // })
      this.$axios({
        url: `${this.$global.downUrlLeft}/WZGrowth/HomeContent/export_search_result_fast`,
        method: "post",
        data: {
          list: [this.dataInfo.protein_sequence.p_id],
        },
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token,
        },
        responseType: 'blob'
      }).then((res) => {
        // 
        var blob = new Blob([res.data])
        var downloadElement = document.createElement('a')
        var href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        let time = Date.parse(new Date()) 
        downloadElement.download = `${time}.fasta`
        // downloadElement.download = ``
        // downloadElement.download = `${this.$route.query.time}-月结算单.xlsx` //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        this.$message({
          type: 'success',
          message: '下载成功'
        })
        // this.downLoading = false
      })
    },
    /**
     * 图表渲染
     */
    createcharts(xData, seriesData) {
      this.myChart = echarts.init(this.$refs.echarts1);
      // this.myChart = $echarts.init(this.$refs[`tabEachars${index}`][0])
      const option = {
        tooltip: {
          trigger: 'axis',
          
        },
        grid: {
            top: '6%',
            bottom: '10%', // 增加底部的空间
            left: '3%',
            right: '4%',
            containLabel: true
        },
        xAxis: {
          
          type: 'category',
          data: xData,
          axisLabel: {  
            interval:0,  
            rotate:45  // 表示倾斜的角度
          }  
        },
        yAxis: {
          name: 'nTPM',
          type: 'value',
          
        },
        
        series: [
          {
            data: seriesData,
            type: 'bar'
          }
        ]
      };
      this.myChart.setOption(option);
    },


    goRouter() {
      if(localStorage.getItem('unipro_entry')) {
        let id =  JSON.parse(localStorage.getItem('unipro_entry'))
        console.log(id, 2222)
        window.open(`https://www.uniprot.org/uniprotkb/${id}/entry`)
      }
    },
    chooseTextF(start, end, index, type) {
      // if(index == 1) {
      //   this.textStart = start
      //   this.textEnd = end + 1
      // } else if(index == 2) {
      //   this.textStart = this.dataInfo.protein_sequence.mature_form_start
      //   this.textEnd = this.dataInfo.protein_sequence.mature_form_end + 1
      // } else if(index == 3) {
      //   this.textStart = 0
      //   this.textEnd = this.dataInfo.protein_sequence.length + 1
      // }
      if(!type) {
        this.domainIndex = null
      }
      this.complete_listIndex = index
      this.textStart = start - 1
      this.textEnd = end + 1
      this.chooseText = index
    },

    
    /**
     * 
     */
    CalculatedAltitude() {
      if(this.dataInfo && this.dataInfo.protein_structure && this.dataInfo.protein_structure.structure_num) {
        return 27 * this.dataInfo.protein_structure.structure_num
      } else {
        return 0
      }
    },
    goUrl(item) {
      if(item.url) {
        window.open(item.url)
      }
      
    },

    windowOpen(url) {
      if(url) {
        window.open(url)
      }
    },

    goFamily(item) {
      this.$router.push({
        path: '/advancedSearchList',
        query: {
          family_id: item.id,
          type2: 1,
        }
      })
    },
    /**
     * Protein Sequence 显示黄色底色
     */
    showBackground(index1, index2) {
      let num1 = index1 * 10
      let num2 = index2 + 1
      let num = num1 + num2
      // console.log(num, 989)
      if( this.textStart < num && num < this.textEnd) {
        return 'background: yellow;'
      }

      
    },

    removeHtmlWrappers(html) {
      if (!html) return html;
      
      // 创建DOM解析器
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // 查找内容区域（针对Quill编辑器）
      const contentElement = doc.querySelector('div.ql-editor');
      
      if (contentElement) {
        return contentElement.innerHTML;
      }
      
      // 如果没有特定类，尝试获取body内容
      return doc.body ? doc.body.innerHTML : html;
    },
    /**
     * 获取详情
     */
    getsel_search_details() {
      sel_search_details({
        id: this.$route.query.id
      }).then((res) => {
        if(res.code == '0') { 
          this.$emit('noData', true)
          this.showNoda = true
        } 
        // protein_sequence
        let upDataList = {
          list0: true,
          list1: true,
          list2: true,
          list3: true,
          list4: true,
          list5: true,
          list6: true,
          list7: true,
          list8: true,
        }
        if(!res.data.mutation_and_disease.disease_json.length) {
          upDataList.list8 = false
        }
        if(!res.data.post_translational_modification.length) {
          upDataList.list7 = false
        }
        if(!res.data.protein_structure.structured_list.length) {
          upDataList.list4 = false
        }

        if(!res.data.expression_and_location.developmental_stage && !res.data.expression_and_location.expression_specificity && !res.data.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW && !res.data.expression_and_location.hpa_single_cell_type_specificity
            && !res.data.expression_and_location.tissue_specificity_rna
        ) {
          this.showExpressionLocation = false
          upDataList.list3 = false
        }
        console.log(upDataList,  22)
        console.log(res.data.expression_and_location, 33)

        
        this.$emit('upDataList', upDataList)

        

        if(res.data.family_and_domain && res.data.family_and_domain.domain) {
          res.data.family_and_domain.domain.forEach((item) => {
            if(item.start) {
              let list = item.start.split('-')
              item.start = Number(list[0])
              item.end = Number(list[1])
              item.length = Number(list[1]) - Number(list[0]) + 1

              // item.description = item.EGF-like

              res.data.protein_sequence.list.push(item)
            }
            
          })
        }

        // todo3333
        
        if(res.data && res.data.protein_sequence && res.data.protein_sequence.list) {
          res.data.protein_sequence.list.forEach((item) => {
            item.list = []
            for (let key in item.data) {
              if (item.data.hasOwnProperty(key)) {
                item.list.push(item.data[key])
              }
            }
          })
        }

        if(res.data && res.data.protein_function && res.data.protein_function.new_list) {
          res.data.protein_function.Aspect = []
          res.data.protein_function.Term = []

          res.data.protein_function.Goid = []

          res.data.protein_function.new_list.forEach((item) => {
            res.data.protein_function.Aspect.push(item.ASPECT)
            res.data.protein_function.Term.push({
              name: item.TERM,
              pubMed: item.pubMed
            })
            res.data.protein_function.Goid.push({
              name: item.goId,
              goUrl: item.goUrl
            })
          })
        }

        // const html = '<div>Hello <span>World</span></div>';
        // const result = removeHtmlWrappers(html, 'div');
        // console.log(result, 9999); // 输出: Hello <span>World</span>

        let ToDo22 = this.removeHtmlWrappers(res.data.protein_interaction.protein_complex[0].value)

        let todo23 = ToDo22.splice(-3,0,`<a href="www.baidu.com">asdsad</a>`)
        console.log(todo23, 22233)


        console.log(res.data.protein_interaction.protein_complex[0].value, 2222)

        this.dataInfo = res.data

        if(res.data && res.data.protein_sequence && res.data.protein_sequence.precursor_start && res.data.protein_sequence.precursor_end) {
           this.textStart = this.dataInfo.protein_sequence.precursor_start
          this.textEnd = this.dataInfo.protein_sequence.precursor_end
        }

        let xData = []
        let seriesData = []
        if(res.data && res.data.expression_and_location && res.data.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW) {
          res.data.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW.forEach((item) => {
            xData.push(item.label)
            seriesData.push({
              value: item.value,
              itemStyle: {
                color: item.color
              }
            })
          })
        }

        

        setTimeout(() => {
          this.createcharts(xData, seriesData)
        }, 100)

        setTimeout(() => {
          var contentBox = document.getElementsByClassName('ql-editor')
          for(var i=0; i<contentBox.length; i++) {
            contentBox[i].setAttribute("contenteditable", false);
          }
        }, 100)
        
      })
    },
    openUrl(item) {
      console.log(item,  3333)
      window.open(item.goUrl)
    },
    /**
     * 滚动
     */
    scrollToAnchor(anchor) {
      this.$nextTick(() => {
        const element = this.$refs[anchor];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    /**
     * ifram加载完成
     */
    iframeLoaded() {
      window.scrollTo({
        top: 0,
      });
    }
  },
}
</script>

<style scoped lang='scss'>
::v-deep(.todo22) {
  // border: 1px solid red !important;
  thead {
    .cell {
      color: #702330 !important;
      
    }
    
  }
  tbody {
    .cell {
      color: #000 !important;
      font-weight: 500 !important;
      font-size: 16px !important;
    }
  }
 
}
::v-deep(.ql-editor) {
  a {
    text-decoration: none;
    color: rgb(19, 82, 135);
  }
}
::v-deep(.ql-container.ql-snow) {
  border: none !important;
}
  .echarts-box {
    
    width: 100%;
    height: 453px;
    // border: 1px solid red;
  }
  ::v-deep(.el-table__expanded-cell) {
        background: #F5F7FA !important;
      }
  .table-box-1 {
    background: #F5F7FA !important;
  }
  .table-disease {
    ::v-deep(.el-table th.el-table__cell>.cell) {
      font-weight: 600;
      // text-align: center;
      font-size: 15px;
    }

    ::v-deep(.el-table--border::after) {
      color: #fff !important;
      width: 0px !important;
      height: 0px !important;
    }
    ::v-deep(.el-table--border .el-table__inner-wrapper::after) {
      color: #fff !important;
      width: 0px !important;
      height: 0px !important;
    }
    ::v-deep(.el-table__inner-wrapper::before) {
      color: #fff !important;
      width: 0px !important;
      height: 0px !important;
    }
    ::v-deep(.el-table--border .el-table__inner-wrapper::after) {
      color: #fff !important;
      width: 0px !important;
      height: 0px !important;
    }

    ::v-deep(.el-table__border-left-patch) {
      background: #fff;
    }

    
    
  }
  .right-table2 {

    ::v-deep(.ql-container.ql-snow) {
      border: none !important;
    }
    ::v-deep(.el-table thead tr th) {
      background: none !important;
      border: none !important;
    }

    ::v-deep(.el-table th.el-table__cell>.cell) {
      font-weight: 600;
      // text-align: center;
      font-size: 15px;
    }

    ::v-deep(.el-table__row) {
      border: none !important;
    }
    ::v-deep(.el-table) {
      border: none !important;
      tbody {
        border: none !important;
      }
      td {
        border: none !important;
      }
    }
  }
  .table-disease {
    ::v-deep(.el-table thead tr th) {
      background: none !important;
      border: none !important;
    }

    ::v-deep(.el-table__row) {
      border: none !important;
    }
    ::v-deep(.el-table) {
      border: none !important;
      tbody {
        border: none !important;
      }
      td {
        border: none !important;
      }
    }

  }
  .retract-text {
    // text-indent: 2em;
    margin-bottom: 5px;
    font-size: 16px;
    >p {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  .iframe-box {
    transform: scale(0.5);
  }
  .protein_sequence-list {
    // border: 1px solid red;
    // display: flex;
    // align-items: center;
    // justify-content: flex-start;
  }
  .img-box2 {
    margin-top: -20px;
    // border: 1px solid red;
    min-width: 500px !important;
    width: 400px !important;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    // border: 1px solid red;
    img {
      margin-left: -220px;
      width: 950px !important;
    }
  }
  .page-1 {
    position: relative;
    .go-top {
      position: absolute;
      right: -40px;
      z-index: 9999 !important;
      border: 1px solid red;
    }
    padding-bottom: 15px;
    p {
      font-size: 16px;
      
    }
    .href-p {
      cursor: pointer;
      color: #00AEFF;
    }
    
    .domain-box {
      margin-top: 20px;
      background: url('@/assets/images/Group9@2x.png');
      height: 114px;
      display: flex;
      align-items: center;

      justify-content: center;
      overflow: auto;
      position: relative;
      ::v-deep(.el-table) {
        --el-table-border: none !important;
      }
      
      .line-box {
        height: 8px;
        background: #C3C3C3;
        position: absolute;
        width: 100%;
        z-index: 0;
        
        >div {
          
        }
        >p {
          
          white-space: nowrap;
        }
      }
      img {
        position: relative;
        z-index: 1;
        width: auto;
        height: 110px; 
        margin: 0 10px;
        // border: 1px solid red;
      }
    }
    .choose-text {
      // color: rgb(112,34,48);
      color: #135287;
      cursor: pointer;
    }
    .content-box {
      position: relative;
      width: 1080px;
      // border: 1px solid red;
      background: #FFFFFF;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
      margin-top: 20px;
      .text-2 {
        display: flex;
        align-items: center;
        // >:nth-child(1) {
        //   font-size: 30px;
        // }
        margin-top: 20px;
        position: absolute;
        right: 32px;
        font-size: 16px;
        // background: #f5f5f5;
      }
      .title-box {
        height: 45px;
        font-weight: 500;
        font-size: 22px;
        border-bottom: 1px solid #DCDFE6;
        line-height: 45px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        background: #f5f5f5;
        .icon-box {
          width: 20px;
          color: #333;
          margin-left: 10px;
          cursor: pointer;

        }
      }
      .box-content {
        padding: 5px 20px;
        ::v-deep(.ql-editor) {
          padding: 0 !important;
        }
        .Pathway-name {
          display: flex;
          align-items: center;
          color: #702330;
          margin-top: 20px;
          p {
            font-weight: 500;
            font-size: 16px;
            width: 120px;
          }
        }
        .KEGG-box {
          display: flex;
          margin-top: 10px;
          align-items: flex-end;
          .col1 {
            width: 120px;
            cursor: pointer;
            white-space: nowrap;
          }
          :nth-child(1) {
            // margin-right: 20px;
            >div {
              display: flex;
              white-space: nowrap;
              :nth-child(1) {
                color: #135287;
                width: 120px;
                white-space: nowrap;
                // text-align: right;
                // margin-right: 20px;
              }
            }
          }
        }
        .protein-Interactions {
          margin-top: 20px;

          display: flex;
          align-items: flex-end;
          
          img {
            width: 100%;
          }
          >div {
            width: 100%;
            font-size: 16px;
            :nth-child(1) {
              font-weight: 500;
              font-size: 16px;
            }
          }
        }
        .line-box2 {
          display: flex;
          max-height: 300px;
          // align-content: flex-start;
          // border: 1px solid red;
          overflow: auto;
          >div {
            margin-right: 30px;
            
          }
          p {
            height: 25px;
            // padding: 8px 0;
            margin-top: 10px;
              font-size: 16px;
              font-weight: 500;
            }
        }
        .table-box {
          // max-height: 150px;
          // overflow: auto;
          .table-box222 {
            max-height: 122px;
            overflow: auto;
            >div {
              
              display: flex;
              margin: 10px 0;
              >:nth-child(1) {
                width: 100px;
                // border: 1px solid red;
                text-align: left;
                margin-left: 30px;
                margin-right: 20px;
              }
              >:nth-child(2) {
                margin-right: 20px;
              }
            }
          }
          >:nth-child(1) {
            display: flex;
            margin: 10px 0;
            >:nth-child(1) {
              width: 100px;
              // border: 1px solid red;
              text-align: left;
              margin-left: 30px;
              margin-right: 20px;
            }
            >:nth-child(2) {
              margin-right: 20px;
            }
          }
        }
        .line-list {
          display: flex;
          flex-wrap: wrap;
          font-family: Consolas, "Liberation Mono", Courier, monospace;
          >div {
            // border: 1px solid red;
            margin-left: 5px;
            width: 120px;
            // border: 1px solid red;
            text-align: center;
            // margin-right: 10px;
            margin-bottom: 10px;
            >:nth-child(1) {
              padding-right: 23px;
              text-align: right;
            }
            
            >p {
              text-align: left;
            }
          }
        }
        .line-box {
          margin: 15px 0 ;
          display: flex;
          align-items: center;
          font-size: 16px;
          img {
            max-width: 680px;
          }
          
          p {
            margin-right: 15px;
            font-weight: 500;
            min-width: 130px;
            font-size: 16px;
            color: #702330;
            white-space: nowrap;
            // width: 180px;
            // text-align: right;
          }
        }
      }
    } 
  }
  
  .todo2 {
    // border-radius: 8px;
    // border: 1px solid red;
    display: flex;
    // justify-content: center;
    
    // height: 880px !important;
    overflow: hidden !important;
    // width: 800px;
    position: relative;
    margin: 20px;

    margin-left: 10px;
    // border: 1px solid red;
    // .absolute-box1 {
    //   position: absolute;
    //   height: 39px;
    //   width: 244px;
    //   z-index: 999;
    //   border: 1px solid red;
    // }
    .right-table2 {
      width: 650px;
      height: 230px;
      margin-left: 400px;
      z-index: 1000;
      // position: absolute;
      background: #fff;
      // border: 1px solid red;
    }
    .absolute-box1 {
      position: absolute;
      height: 39px;
      width: 244px;
      z-index: 999;
      border: 1px solid #fff;
    }
    .absolute-box2 {
      position: absolute;
      height: 19px;
      width: 244px;
      z-index: 999;
      margin-top: 56px;
      // border: 1px solid red;
    }
    .absolute-box3 {
      position: absolute;
      height: 396px;
      width: 40px;
      z-index: 999;
      margin-left: 390px;
      background: #fff;
      
    }
    .absolute-box4 {
      position: absolute;
      height: 406px;
      width: 102px;
      z-index: 999;
      // border: 1px solid red;
      // background: rgb(240, 240,240);
    }
    .absolute-box5 {
      position: absolute;
      height: 406px;
      width: 198px;
      margin-left: 46px;
      z-index: 999;
      border: 1px solid red;
    }
    .absolute-box6 {
      position: absolute;
      height: 50px;
      width: 600px;
      margin-left: 46px;
      z-index: 999;
      margin-top: 503px;
      border: 1px solid red;
      background: #fff;
      line-height: 50px;
      font-size: 18px;
      font-weight: 500;
    }
    .absolute-box7 {
      position: absolute;
      height: 82px;
      width: 1200px;
      // margin-left: 46px;
      z-index: 999;
      margin-top: 480px;
      border: 1px solid red;
    }
    .absolute-box8 {
      position: absolute;
      height: 27px;
      width: 230px;
      // margin-left: 46px;
      z-index: 999;
      margin-top: 562px;
      right: 0;
      border: 1px solid red;
      // background: rgb(252,247,202);
    }
    .absolute-box9 {
      position: absolute;
      height: 27px;
      width: 1000px;
      // margin-left: 46px;
      z-index: 999;
      margin-top: 562px;
      left: 120px;
      border: 1px solid red;
    }
    .absolute-box10 {
      position: absolute;
      height: 27px;
      width: 45px;
      // margin-left: 46px;
      z-index: 999;
      margin-top: 562px;
      left: 0px;
      border: 1px solid red;
    }

    // >:nth-child(2) {
    //   position: relative;
    //   // width: 1000px;
    // }
    // >:nth-child(1) {
    //   // border: 1px solid red;
    //   background: #fff;
    //   width: 1;
    //   height: 100%;
    //   z-index: 999;
    // }
    // >:nth-child(3) {
    //   background: #fff;
    //   width: 0px;
    //   height: 100%;
    //   z-index: 999;
    // }
  }
  
  .line-box23 {
    display: flex;
    align-items: flex-start !important;
    >:nth-child(1) {
      margin-top: 2px;
    }
  }
  .change-value1 {
    display: flex;
    align-items: center;
    :nth-child(1) {
      margin-right: 5px;
    }
  }
  .change-value2 {
    text-align: center !important;
    display: flex;
    justify-content: center;
  }

.title-box2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .Download-btn {
    color: #135287 !important;
    background: #f9f9f9 !important;
  }
}
.right-middle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          >:nth-child(1) {
            display: flex;
            align-items: center;
            font-weight: 500;
            >div {
              display: flex;
              align-items: center;
              height: 36px;
              font-size: 18px !important;
              background: #F5F7FA;
              border-radius: 4px;
              border: 1px solid #EBEEF5;
              padding: 0 15px;
              margin-right: 20px;
              cursor: pointer;
            }
            img {
              margin-right: 6px;
              width: 14px;
            }
          }
        }

.STRING-Database {
  // border: 1px solid red;
  // margin-left: -30px;
  // width: ;
}
.table-disease {
  ::v-deep(.el-table .el-table__cell) {
    padding: 3px 0 !important
  }
}
</style>
