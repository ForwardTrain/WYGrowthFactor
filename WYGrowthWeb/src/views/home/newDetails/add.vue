<template>
  <div  class="dataDetails-box" v-loading="loading" >


    <el-dialog
      v-model="dialogVisible"
      :title="'Funcition'"
      :center="true"
      top="3vh"
      width="730px">
      <div>
        
        <div>
          <p style="margin-bottom: 10px;">Funtion：</p>

          <div>
            <div class="activity-content" v-if="showEditor">
              <quill-editor content-type="html" 
                            enable
                            :options="editorOption" 
                            style="min-height: 500px;" 
                            ref="myQuillEditor"
                            :id="`quillEditors1${this.nowTime}`"
                            :content="diafunction[0].value" />
            </div>
          </div>


        </div>

        <div style="margin-top: 20px;">
          <div class="add-libe">
            <p>Pubmed：</p>

            <div class="add-btn" @click="showFunction = true">
              +
            </div>
          </div>

          <div class="PMID-line" v-show="showFunction">
            <div>
              <p>PMID：</p>
              <el-input v-model="input3" style="width: 180px" placeholder=" " />
            </div>

            <div>

              <el-button type="primary" @click="changeFunction()">
                确定
              </el-button>
              <el-button @click="closePMID">取消</el-button>
          
            </div>
            
            
          </div>


          

          <div class="list-box2">
            <div v-for="(item, index) in diafunction[0].evidences" :key="index">
              PMID: {{item.id}}
              <el-icon @click="deleteInput3(index)" class="close-btn"><Close /></el-icon>
            </div>
          </div>
        </div>

 

     
      </div>
      <template #footer>
        <span class="dialog-footer" v-if="title != '查看'">
          <el-button @click="closeDia()">取消</el-button>
          <el-button type="primary" @click="addDia">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog
      v-model="dialogVisible2"
      :title="'Induction'"
      :center="true"
      top="3vh"
      width="730px">
      <div>
        
        <div>
          <p style="margin-bottom: 10px;">Induction：</p>

          <div>
            <div class="activity-content" v-if="showEditor">
              <quill-editor content-type="html" 
                            enable
                            :options="editorOption" 
                            style="min-height: 500px;" 
                            ref="myQuillEditor"
                            :id="`quillEditors22${this.nowTime}`"
                            :content="diaInduction[0].value" />
            </div>
          </div>


        </div>

        <div style="margin-top: 20px;">
          <div class="add-libe">
            <p>Pubmed：</p>

            <div class="add-btn" @click="showInduction = true">
              +
            </div>
          </div>

          <div class="PMID-line" v-show="showInduction">
            <div>
              <p>PMID：</p>
              <el-input v-model="input22" style="width: 180px" placeholder=" " />
            </div>

            <div>

              <el-button type="primary" @click="changeInduction()">
                确定
              </el-button>
              <el-button @click="closePMID2">取消</el-button>
          
            </div>
            
            
          </div>


          

          <div class="list-box2">
            <div v-for="(item, index) in diaInduction[0].evidences" :key="index">
              PMID: {{item.id}}
              <el-icon @click="deleteInput32(index)" class="close-btn"><Close /></el-icon>
            </div>
          </div>
        </div>

 

     
      </div>
      <template #footer>
        <span class="dialog-footer" v-if="title != '查看'">
          <el-button @click="closeDia2()">取消</el-button>
          <el-button type="primary" @click="addDia2">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog
      v-model="dialogVisible3"
      :title="'Developmental Stage'"
      :center="true"
      top="3vh"
      width="730px">
      <div>
        
        <div>
          <p style="margin-bottom: 10px;">Developmental Stage：</p>

          <div>
            <div class="activity-content" v-if="showEditor">
              <quill-editor content-type="html" 
                            enable
                            :options="editorOption" 
                            style="min-height: 500px;" 
                            ref="myQuillEditor"
                            :id="`quillEditors33${this.nowTime}`"
                            :content="diaStage[0].value" />
            </div>
          </div>


        </div>

        <div style="margin-top: 20px;">
          <div class="add-libe">
            <p>Pubmed：</p>

            <div class="add-btn" @click="showStage = true">
              +
            </div>
          </div>

          <div class="PMID-line" v-show="showStage">
            <div>
              <p>PMID：</p>
              <el-input v-model="input33" style="width: 180px" placeholder=" " />
            </div>

            <div>

              <el-button type="primary" @click="changeStage()">
                确定
              </el-button>
              <el-button @click="closePMID3">取消</el-button>
          
            </div>
            
            
          </div>


          

          <div class="list-box2">
            <div v-for="(item, index) in diaStage[0].evidences" :key="index">
              PMID: {{item.id}}
              <el-icon @click="deleteInput33(index)" class="close-btn"><Close /></el-icon>
            </div>
          </div>
        </div>

 

     
      </div>
      <template #footer>
        <span class="dialog-footer" v-if="title != '查看'">
          <el-button @click="closeDia3()">取消</el-button>
          <el-button type="primary" @click="addDia3">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>




    <div class="top-box">
      <div class="scrollToAnchor-box">
        {{pageIndex}}
        <p @click="scrollToAnchor('Information', 1)" :style="thepageIndex == 1 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">General Information</p>
        <p @click="scrollToAnchor('Sequence', 2)" :style="thepageIndex == 2 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">Protein Sequence</p>
        <p @click="scrollToAnchor('Funtion', 3)" :style="thepageIndex == 3 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">Protein Funtion</p>
        <p @click="scrollToAnchor('Location', 4)" :style="thepageIndex == 4 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">Expression & Location</p>

        <p @click="scrollToAnchor('Ptm', 9)" :style="thepageIndex == 9 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">PTM</p>

        <p @click="scrollToAnchor('Structure', 5)" :style="thepageIndex == 5 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">Protein Structure</p>
        <p @click="scrollToAnchor('Interactions', 6)" :style="thepageIndex == 6 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">Protein Interactions</p>
        <p @click="scrollToAnchor('Pathways', 7)" :style="thepageIndex == 7 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">KEGG Pathways</p>
        <p @click="scrollToAnchor('Disease', 8)" :style="thepageIndex == 8 ? 'color: #2268FB; border-bottom: 2px solid #2268FB;' : ''">Mutation & Disease</p>
      </div>

      <div>
        <el-button type="primary" @click="addDetails()" v-if="!$route.query.look">保存</el-button>

      </div>
    </div>

    <div class="content-box"  >
      <div class="Module-box" id="Information">
        <div class="prompt-type">
          <div></div>
          <p>General Information</p>
        </div>


        <div>
          <div class="line2-box">
            <div>
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>DRGF ID:</p>
              <div>
                <el-input style="width: 280px" :disabled="true" v-model="detailsData.general_information.drgfCode" placeholder=" " />
              </div>
            </div>
            <div>
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>Protein Name:</p>
              <div>
                <el-input style="width: 280px" :disabled="$route.query.look" v-model="detailsData.general_information.protein_name" placeholder=" " />
              </div>
            </div>
            <div>
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>Organism:</p>
              <div>
                <el-input style="width: 280px" :disabled="$route.query.look" v-model="detailsData.general_information.organism" placeholder=" " />
              </div>
            </div>
          </div>
          <div class="line2-box">
            <div>
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>UniProt Entry:</p>
              <div>
                <el-input style="width: 280px" :disabled="$route.query.look" v-model="detailsData.general_information.unipro_entry" placeholder=" " />
              </div>
            </div>
            <div>
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>Protein Status:</p>
              <div>
                <el-input style="width: 280px" :disabled="$route.query.look" v-model="detailsData.general_information.protein_status" placeholder=" " />
              </div>
            </div>

            <div>
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>Gene Id:</p>
              <div>
                <el-input style="width: 280px" :disabled="$route.query.look" v-model="detailsData.general_information.gene_id" placeholder=" " />
              </div>
            </div>
          </div>



          <div class="line2-box" style="width: 500px;">
            <div style="width: 100%;">
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>Family:</p>
              <div style="width: 100%;">
                <el-select
                  v-model="detailsData.general_information.family_id"
                  filterable
                  placeholder=" "
                  style="width: 495px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
          </div>

          


          <div class="line2-box" style="width: 100%;">
            <div style="width: 100%;">
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>Gene Name(s):</p>
              <div style="width: 100%;">
                <el-input
                  v-model="detailsData.general_information.gene_names"
                  :autosize="{ minRows: 4, maxRows: 30 }"
                  type="textarea"
                  placeholder=" "
                  style="width: 100%;"
                  :disabled="$route.query.look"
                />
              </div>
            </div>
          </div>

          <div class="line2-box" style="width: 100%;">
            <div style="width: 100%;">
              <p style="margin-bottom: 10px;"><span style="color: red;">*</span>Also Known As:</p>
              <div style="width: 100%;">
                <el-input
                  v-model="detailsData.general_information.gene_also_known_as"
                  :autosize="{ minRows: 4, maxRows: 30 }"
                  type="textarea"
                  placeholder=" "
                  style="width: 100%;"
                  :disabled="$route.query.look"
                />
              </div>
            </div>
          </div>

          


          <div style="margin-top: 20px; width: 100%;" v-show="false">
            <div class="add-libe">
              <p><span style="color: red;">*</span>Gene Name/Id：</p>

              <div class="add-btn" @click="openInput()" v-show="!$route.query.look">
                +
              </div>
            </div>

            <div class="PMID-line" v-show="showPMID">
              <div>
                <p>Gene Name： </p>

                <el-input v-model="input1" style="width: 180px;margin-right: 20px;" placeholder=" " />
                <p>Gene Id： </p>
                <el-input v-model="input2" style="width: 180px;margin-left: 20px;" placeholder=" " />
              </div>

              <div>

                <el-button type="primary" @click="changeGeneName">
                  确定
                </el-button>
                <el-button @click="showPMID = false">取消</el-button>
            
              </div>
              
              
            </div>


            <div v-show="!showPMID" class="list-box2" v-if="detailsData.general_information.gene_id || detailsData.general_information.gene_name">
              <div>
                {{detailsData.general_information.gene_name}}\{{detailsData.general_information.gene_id}}

                <el-icon v-show="!$route.query.look" @click="deleteInput1()" class="close-btn"><Close /></el-icon>
              </div>
            </div>
          </div>
        </div>


      </div>


      <div class="Module-box" style="margin-top: 15px;" id="Sequence">
        <div class="prompt-type">
          <div></div>
          <p>Protein Sequence</p>
        </div>

        <p style="margin-top: 20px;margin-bottom: 10px;">CompleteFrom</p>

         <el-input
                  v-model="detailsData.protein_sequence.complete_form"
                  :autosize="{ minRows: 4, maxRows: 30 }"
                  type="textarea"
                  placeholder=" "
                  style="width: 100%;"
                  :disabled="$route.query.look"
                />
        <!-- <div v-if="$route.query.look" class="html-box">
          <div v-html="detailsData.protein_sequence.complete_form"></div>
        </div>

        <div v-else>
          <div class="activity-content" v-if="showEditor">
              <quill-editor content-type="html" 
                            enable
                            :options="editorOption" 
                            style="min-height: 500px;" 
                            ref="myQuillEditor"
                            :id="`quillEditors3${this.nowTime}`"
                            :content="detailsData.protein_sequence.complete_form" />
            </div>
        </div> -->

        <p style="margin-top: 20px;margin-bottom: 10px;">Processing</p>


        <el-table :data="detailsData.protein_sequence.list" 
                  style="width: 100%"
                  border>
          <el-table-column prop="type" label="Type" width="20%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.type}}</p>
                <el-input v-else v-model="scoped.row.type" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="start" label="Positions Start" width="10%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.start}}</p>
                <el-input v-else v-model="scoped.row.start" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="end" label="Positions End" width="10%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.end}}</p>
                <el-input v-else v-model="scoped.row.end" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="description" label="Descipion" width="30%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.description}}</p>
                <el-input v-else v-model="scoped.row.description" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column  width="5%" align="center" label=" " v-if="!$route.query.look">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="scoped.row.showChange = true" v-if="!scoped.row.showChange"><el-icon><EditPen /></el-icon></p>

                <p @click="scoped.row.showChange = false" v-else><el-icon><Checked /></el-icon></p>
                <p class="delete-p" @click="openDelete(detailsData.protein_sequence.list, scoped.$index)"><el-icon style="color: red;"><DeleteFilled /></el-icon></p>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-add"  @click="addRowList(detailsData.protein_sequence.list)" v-if="!$route.query.look">
          <p>+ Add Data</p>
        </div>
      </div>

      <div class="Module-box" style="margin-top: 15px;" id="Funtion">
        <div class="prompt-type">
          <div></div>
          <p>Protein Function</p>
        </div>


        <div class="btn-box2">
          <div style="margin-top: 20px;width: 100%;">
            <div class="add-libe">
              <p>Funtion：</p>

              <div class="add-btn" v-if="!detailsData.protein_function.function[0].value &&  !detailsData.protein_function.function[0].evidences.length" @click="dialogVisible = true" v-show="!$route.query.look">
                +
              </div>
            </div>

            <div class="PMID-line" v-show="showFunction" v-if="false">
              <div>
                <p>Funtion： </p>
                <el-input v-model="input3" style="width: 800px" placeholder=" " />
              </div>

              <div>

                <el-button type="primary" @click="changeFunction()">
                  确定
                </el-button>
                <el-button @click="showFunction = false;input3 = ''">取消</el-button>
            
              </div>
              
              
            </div>

            <div>
              <div v-html="detailsData.protein_function.function.length && detailsData.protein_function.function[0].value  ? detailsData.protein_function.function[0].value : ''">
              </div>
            </div>


            <div style="margin-top: 20px;" class="list-box2">
              <div v-for="(item, index) in detailsData.protein_function.function.length && detailsData.protein_function.function[0].evidences ? detailsData.protein_function.function[0].evidences : []" :key="index">
                PMID：{{item.id}}
                <!-- <el-icon @click="deleteInput3(index)" class="close-btn"  v-show="!$route.query.look"><Close /></el-icon> -->
              </div>
            </div>
          </div>


          <div class="btn-right-box" v-if="detailsData.protein_function.function.length && (detailsData.protein_function.function[0].value || detailsData.protein_function.function[0].evidences.length) ">
            <el-button class="margin-L" type="info" @click="editFuncition()">编辑</el-button>
            <el-button class="margin-L" type="info" @click="deleteFunition()">删除</el-button>
          </div>
        </div>


        

        

        <p style="margin-top: 20px;margin-bottom: 10px;">Go Terms</p>


        <el-table :data="detailsData.protein_function.new_list" 
                  style="width: 100%"
                  max-height="500px"
                  border>
          <el-table-column prop="ASPECT" label="Aspect" width="15%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.ASPECT}}</p>
                <el-input v-else v-model="scoped.row.ASPECT" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="TERM" label="Descipiton" width="20%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.TERM}}</p>
                <el-input v-else v-model="scoped.row.TERM" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="goId" label="Go ID" width="10%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.goId}}</p>
                <el-input v-else v-model="scoped.row.goId" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column  width="3%" align="center" label=" " v-if="!$route.query.look">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="scoped.row.showChange = true" v-if="!scoped.row.showChange"><el-icon><EditPen /></el-icon></p>
                <p @click="scoped.row.showChange = false" v-else><el-icon><Checked /></el-icon></p>

                <p class="delete-p" @click="openDelete(detailsData.protein_function.new_list, scoped.$index)"><el-icon style="color: red;"><DeleteFilled /></el-icon></p>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-add" @click="addRowList2(detailsData.protein_function.new_list)" v-if="!$route.query.look">
          <p>+ Add Data</p>
        </div>
      </div>


      <div class="Module-box" style="margin-top: 15px;" id="Location">
        <div class="prompt-type">
          <div></div>
          <p>Expression & Location</p>
        </div>



        <div class="btn-box2">
          <div style="margin-top: 20px;width: 100%;">
            <div class="add-libe">
              <p>Induction：</p>

              <div class="add-btn" v-if="!detailsData.expression_and_location.induction[0].value &&  !detailsData.expression_and_location.induction[0].evidences.length" @click="dialogVisible2 = true" v-show="!$route.query.look">
                +
              </div>
            </div>

            <div class="PMID-line"  v-if="false">
              <div>
                <p>Induction： </p>
                <el-input v-model="input3" style="width: 800px" placeholder=" " />
              </div>

              <div>

                <el-button type="primary" @click="changeFunction()">
                  确定
                </el-button>
                <el-button @click="showFunction = false;input3 = ''">取消</el-button>
            
              </div>
              
              
            </div>

            <div>
              <div v-html="detailsData.expression_and_location.induction.length && detailsData.expression_and_location.induction[0].value  ? detailsData.expression_and_location.induction[0].value : ''">
              </div>
            </div>


            <div style="margin-top: 20px;" class="list-box2">
              <div v-for="(item, index) in detailsData.expression_and_location.induction.length && detailsData.expression_and_location.induction[0].evidences ? detailsData.expression_and_location.induction[0].evidences : []" :key="index">
                PMID：{{item.id}}
                <!-- <el-icon @click="deleteInput3(index)" class="close-btn"  v-show="!$route.query.look"><Close /></el-icon> -->
              </div>
            </div>
          </div>


          <div class="btn-right-box" v-if="detailsData.expression_and_location.induction.length && (detailsData.expression_and_location.induction[0].value || detailsData.expression_and_location.induction[0].evidences.length) ">
            <el-button class="margin-L" type="info" @click="editFuncition2()">编辑</el-button>
            <el-button class="margin-L" type="info" @click="deleteFunition2()">删除</el-button>
          </div>
        </div>





        <div class="btn-box2">
          <div style="margin-top: 20px;width: 100%;">
            <div class="add-libe">
              <p>Developmental Stage：</p>

              <div class="add-btn" v-if="!detailsData.expression_and_location.developmental_stage[0].value &&  !detailsData.expression_and_location.developmental_stage[0].evidences.length" @click="dialogVisible3 = true" v-show="!$route.query.look">
                +
              </div>
            </div>

            <div class="PMID-line"  v-if="false">
              <div>
                <p>Developmental Stage： </p>
                <el-input v-model="input3" style="width: 800px" placeholder=" " />
              </div>

              <div>

                <el-button type="primary" @click="changeFunction()">
                  确定
                </el-button>
                <el-button @click="showFunction = false;input3 = ''">取消</el-button>
            
              </div>
              
              
            </div>

            <div>
              <div v-html="detailsData.expression_and_location.developmental_stage.length && detailsData.expression_and_location.developmental_stage[0].value  ? detailsData.expression_and_location.developmental_stage[0].value : ''">
              </div>
            </div>


            <div style="margin-top: 20px;" class="list-box2">
              <div v-for="(item, index) in detailsData.expression_and_location.developmental_stage.length && detailsData.expression_and_location.developmental_stage[0].evidences ? detailsData.expression_and_location.developmental_stage[0].evidences : []" :key="index">
                PMID：{{item.id}}
                <!-- <el-icon @click="deleteInput3(index)" class="close-btn"  v-show="!$route.query.look"><Close /></el-icon> -->
              </div>
            </div>
          </div>


          <div class="btn-right-box" v-if="detailsData.expression_and_location.developmental_stage.length && (detailsData.expression_and_location.developmental_stage[0].value || detailsData.expression_and_location.developmental_stage[0].evidences.length) ">
            <el-button class="margin-L" type="info" @click="editFuncition3()">编辑</el-button>
            <el-button class="margin-L" type="info" @click="deleteFunition3()">删除</el-button>
          </div>
        </div>




        <div class="line2-box">
          <div>
            <p style="margin-bottom: 10px;">HPA Code:</p>
            <div>
              <el-input style="width: 280px" :disabled="$route.query.look" v-model="detailsData.expression_and_location.hpa_code" placeholder=" " />
            </div>
          </div>
        </div>

        <div class="line2-box">

          


          <div>
            <p style="margin-bottom: 10px;">Tissue Specifcity:</p>
            <div>
              <el-input style="width: 280px" :disabled="$route.query.look" v-model="detailsData.expression_and_location.tissue_specificity_rna" placeholder=" " />
            </div>
          </div>
        </div>

        <div class="line2-box">
          <div>
            <p style="margin-bottom: 10px;">Expression Specificity:</p>
            <div style="width: 1000px; ">
              <!-- <el-input style="width: 280px" :disabled="$route.query.look"  v-model="detailsData.expression_and_location.expression_specificity" placeholder="proetacellulin" /> -->

            <el-input
                v-model="detailsData.expression_and_location.expression_specificity"
                :autosize="{ minRows: 4, maxRows: 30 }"
                type="textarea"
                placeholder=" "
                style="width: 100%;"
                :disabled="$route.query.look"
              />
            </div>
          </div>
        </div>

        

        <el-table :data="detailsData.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW" 
                  style="width: 100%; margin-top: 20px;"
                  max-height="500px"
                  border>
          <el-table-column prop="color" label="Color" width="15%">
            <template #default="scoped">
              <div >
                <p :style="`color: ${scoped.row.color}`" v-if="!scoped.row.showChange">{{scoped.row.color}}</p>
                <el-color-picker  v-else  v-model="scoped.row.color" />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="label" label="lable" width="20%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.label}}</p>
                <el-input v-else v-model="scoped.row.label" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="value" label="Value" width="10%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.value}}</p>
                <el-input v-else v-model="scoped.row.value" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column  width="3%" align="center" label=" " v-if="!$route.query.look">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="scoped.row.showChange = true" v-if="!scoped.row.showChange"><el-icon><EditPen /></el-icon></p>
                <p @click="scoped.row.showChange = false" v-else><el-icon><Checked /></el-icon></p>

                <p class="delete-p" @click="openDelete(detailsData.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW, scoped.$index)"><el-icon style="color: red;"><DeleteFilled /></el-icon></p>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-add" @click="addRowList3(detailsData.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW)" v-if="!$route.query.look">
          <p>+ Add Data</p>
        </div>
      </div>


      <div class="Module-box" style="margin-top: 15px;" id="Ptm">
        <div class="prompt-type">
          <div></div>
          <p>PTM</p>
        </div>

        <el-table :data="detailsData.post_translational_modification" 
                  style="width: 100%; margin-top: 20px;"
                  max-height="500px"
                  border>
          <el-table-column prop="Site" label="Site" width="10%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.site}}</p>
                <el-input v-else v-model="scoped.row.site" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="pmid" label="PYM Type" width="10%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.ptm_type}}</p>
                <el-input v-else v-model="scoped.row.ptm_type" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="value" label="Source" width="10%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.source_txt}}</p>
                <el-input v-else v-model="scoped.row.source_txt" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="pmid" label="Description" width="20%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.pmid}}</p>
                <el-input v-else v-model="scoped.row.pmid" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column  width="4%" align="center" label=" " v-if="!$route.query.look">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="scoped.row.showChange = true" v-if="!scoped.row.showChange"><el-icon><EditPen /></el-icon></p>
                <p @click="scoped.row.showChange = false" v-else><el-icon><Checked /></el-icon></p>

                <p class="delete-p" @click="openDelete(detailsData.post_translational_modification, scoped.$index)"><el-icon style="color: red;"><DeleteFilled /></el-icon></p>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-add" @click="addRowList6(detailsData.post_translational_modification)" v-if="!$route.query.look">
          <p>+ Add Data</p>
        </div>
      </div>


      <div class="Module-box" style="margin-top: 15px;" id="Structure">
        <div class="prompt-type">
          <div></div>
          <p>Protein Structure</p>
        </div>

        <el-table :data="detailsData.protein_structure.structured_list" 
                  style="width: 100%; margin-top: 20px;"
                  max-height="500px"
                  border>
          <el-table-column prop="source" label="Source" width="15%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.source}}</p>
                <el-input v-else v-model="scoped.row.source" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="label" label="Identifier" width="15%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.identifier}}</p>
                <el-input v-else v-model="scoped.row.identifier" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="value" label="Method" width="15%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.method}}</p>
                <el-input v-else v-model="scoped.row.method" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="value" label="Resolution" width="15%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.resolution}}</p>
                <el-input v-else v-model="scoped.row.resolution" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="chain" label="Chain" width="15%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.chain}}</p>
                <el-input v-else v-model="scoped.row.chain" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="chain" label="Positions" width="15%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.positions}}</p>
                <el-input v-else v-model="scoped.row.positions" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column  width="6%" align="center" label=" " v-if="!$route.query.look">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="scoped.row.showChange = true" v-if="!scoped.row.showChange"><el-icon><EditPen /></el-icon></p>
                <p @click="scoped.row.showChange = false" v-else><el-icon><Checked /></el-icon></p>

                <p class="delete-p" @click="openDelete(detailsData.protein_structure.structured_list, scoped.$index)"><el-icon style="color: red;"><DeleteFilled /></el-icon></p>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-add" @click="addRowList31(detailsData.protein_structure.structured_list)" v-if="!$route.query.look">
          <p>+ Add Data</p>
        </div>
      </div>


      <div class="Module-box" style="margin-top: 15px;" id="Interactions">
        <div class="prompt-type">
          <div></div>
          <p>Protein Interactions</p>
        </div>

        <p style="margin-top: 20px;margin-bottom: 10px;">Protein complex</p>



        <div v-if="$route.query.look" class="html-box">
          <div v-html="detailsData.protein_interaction.protein_complex[0].value"></div>
        </div>

        <div v-else>
          <div class="activity-content" v-if="showEditor">
              <quill-editor content-type="html" 
                            enable
                            :options="editorOption" 
                            style="min-height: 500px;" 
                            ref="myQuillEditor"
                            :id="`quillEditors4${this.nowTime}`"
                            :content="detailsData.protein_interaction.protein_complex[0].value" />
            </div>
        </div>


        <div style="margin-top: 20px;">
          <div class="add-libe">
            <p>Pubmed：</p>

            <div class="add-btn" @click="showPubmed = true" v-if="!$route.query.look">
              +
            </div>
          </div>
          


          <div class="PMID-line" v-show="showPubmed">
            <div>
              <p>Pubmed： </p>
              <el-input v-model="input4" style="width: 800px" placeholder=" " />
            </div>

            <div>

              <el-button type="primary" @click="changePubmed()">
                确定
              </el-button>
              <el-button @click="showPubmed = false;input4 = ''">取消</el-button>
          
            </div>
            
            
          </div>


          <div class="list-box2" >
            <div v-for="(item, index) in detailsData.protein_interaction.protein_complex[0].evidences" :key="index">
              {{item.id}}
              <el-icon @click="deleteInput4(index)" class="close-btn" v-if="!$route.query.look"><Close /></el-icon>
            </div>
          </div>
        </div>

        
        

        <p style="margin-top: 20px;margin-bottom: 10px;">Protein-protein interactions：</p>


        <div>
            <el-upload
            :headers="{
              Authorization: Authorization,
            }"
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            
            :disabled="$route.query.look"
            :on-change="onSuccess">
            <img v-if="detailsData.protein_interaction.svg" :src="detailsData.protein_interaction.svg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>








       
      </div>

      <div class="Module-box" style="margin-top: 15px;" id="Pathways">
        <div class="prompt-type">
          <div></div>
          <p>KEGG Pathways</p>
        </div>

        <p style="margin-top: 20px;margin-bottom: 10px;">Pathway Url</p>

        <el-input
            v-model="detailsData.kegg_pathways.pathways"
            :autosize="{ minRows: 1, maxRows: 20 }"
            type="textarea"
            placeholder=" "
            :disabled="$route.query.look"
          />


        <el-table :data="detailsData.kegg_pathways.pathway_data" 
                  style="width: 100%; margin-top: 20px;"
                  max-height="500px"
                  border>
          <el-table-column prop="pathway_id" label="Pathway ID" width="10%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.pathway_id}}</p>
                <el-input v-else v-model="scoped.row.pathway_id" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="pathway_name" label="Pathway Name" width="20%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.pathway_name}}</p>
                <el-input v-else v-model="scoped.row.pathway_name" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="pathway_url" label="Desciption" width="20%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.pathway_url}}</p>
                <el-input v-else v-model="scoped.row.pathway_url" placeholder=" " />
              </div>
            </template>
          </el-table-column>


          <el-table-column  width="4%" align="center" label=" " v-if="!$route.query.look">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="scoped.row.showChange = true" v-if="!scoped.row.showChange"><el-icon><EditPen /></el-icon></p>
                <p @click="scoped.row.showChange = false" v-else><el-icon><Checked /></el-icon></p>

                <p class="delete-p" @click="openDelete(detailsData.kegg_pathways.pathway_data, scoped.$index)"><el-icon style="color: red;"><DeleteFilled /></el-icon></p>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-add" @click="addRowList4(detailsData.kegg_pathways.pathway_data)" v-if="!$route.query.look">
          <p>+ Add Data</p>
        </div>
      </div>

      <div class="Module-box" style="margin-top: 15px;" id="Disease" >
        <div class="prompt-type">
          <div></div>
          <p>Mutation & Disease</p>
        </div>

        <el-table :data="detailsData.mutation_and_disease.disease_json" 
                  style="width: 100%; margin-top: 20px;"
                  max-height="500px"
                  border>
          <el-table-column prop="type" label="Type" width="10%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.type}}</p>
                <el-input v-else v-model="scoped.row.type" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="label" label="Positions" width="10%">
            <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.positions}}</p>
                <el-input v-else v-model="scoped.row.positions" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="value" label="Sequence" width="10%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.sequence}}</p>
                <el-input v-else v-model="scoped.row.sequence" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="value" label="Descipiton" width="20%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.description}}</p>
                <el-input v-else v-model="scoped.row.description" placeholder=" " />
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="value" label="IDs" width="30%">
             <template #default="scoped">
              <div >
                <p v-if="!scoped.row.showChange">{{scoped.row.featureCrossReferences[0] ? `${scoped.row.featureCrossReferences[0].id};${scoped.row.featureCrossReferences[0].url}` : ''}}</p>
                <div  v-else>
                  <el-input v-model="scoped.row.featureCrossReferences[0].id" placeholder=" " />
                  <el-input v-model="scoped.row.featureCrossReferences[0].url" placeholder=" " />
                </div>
              </div>
            </template>
          </el-table-column>


          <el-table-column  width="7%" align="center" label=" " v-if="!$route.query.look">
            <template #default="scoped">
              <div class="table-operation">
                <p @click="scoped.row.showChange = true" v-if="!scoped.row.showChange"><el-icon><EditPen /></el-icon></p>
                <p @click="scoped.row.showChange = false" v-else><el-icon><Checked /></el-icon></p>

                <p class="delete-p" @click="openDelete(detailsData.mutation_and_disease.disease_json, scoped.$index)"><el-icon style="color: red;"><DeleteFilled /></el-icon></p>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-add" @click="addRowList4(detailsData.mutation_and_disease.disease_json)" v-if="!$route.query.look">
          <p>+ Add Data</p>
        </div>
      </div>
    </div>


    
  </div>
</template>


<script>

import { 
  sel_search_details2,
  sel_qiniu_token,
  sel_search_details2updDate,
  HomeEditgetCode,
  sel_search_details_familys
} from '@/api/common'

let _this = null
import * as qiniu from 'qiniu-js'


const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
  [{ list: "ordered" }, { list: "bullet" }], //列表
  [{ script: "sub" }, { script: "super" }], // 上下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: ['16px', '12px', '14px', '18px', '22px',  '36px'] }], // 字体大小
  // [{ size: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '32px', '36px'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
  [{ font: [] }], //字体
  [{ align: [] }], //对齐方式
  ["clean"], //清除字体样式
  ['link', 'image', 'upload'], // 链接、图片、视频
  // ['sourceEditor']
]
export default {
  
  data () {
    return {
      options: [],
      
      dialogVisible3: false,
      showStage: false,
      input33: '',
      diaStage:  [{
        evidences: [],
        value: '',
      }],


      dialogVisible2: false,

      showInduction: false,
      diaInduction: [{
        evidences: [],
        value: '',
      }],

      input22: '',

      diafunction: [{
        evidences: [],
        value: '',
      }],

      dialogVisible: false,


      loading: false,
      thepageIndex: 1,
      showPMID: false,
      input2: '',


      showEditor: true,
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'upload': function () { // 添加工具方法
                document.querySelector('.avatar-uploader input').click()
              }
            }
          }, // 自定义工具栏，与上面定义的toolbarOptions 相对应
          // 新增下面
          // imageDrop: true, // 拖动加载图片组件。
          // imageResize: { //调整大小组件。
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar']
          // },
        },
        theme: "snow", //主题
        placeholder: " ",
      },

      nowTime: '',

      input1: '',
      input2: '',

      showFunction: false,
      input3: '',

      input4: '',
      showPubmed:false,

      qnToken: '',

      detailsData: {
        general_information: {
          also_known_as: '',
          drgfCode: '',
          gene_also_known_as:'',
          gene_id: '',
          gene_name:'',
          gene_names: '',
          gene_url: '',
          organism: '',
          protein_name:'',
          protein_status: '',
          unipro_entry: '',
        },
        protein_sequence: {
          complete_form: '',
          create_time: '',
          id: '',
          length: '',
          list: [],
          mature_form_length: '',
          modify_time: '',
          p_id: '',
          precursor_length: '',

        },
        protein_function: {
          create_time: '',
          function: [{
            evidences: [],
            value: '',
          }],
          function_pubmed_ids: '',
          gene_ontology_cellular_component:'',
          gene_ontology_molecular_function: '',
          id: '',
          modify_time:'',
          new_list:[],
          p_id: '',
        },
        expression_and_location: {
          expression_specificity:'',
          hpa_RNA_EXPRESSION_OVERVIEW: [],
          hpa_code: '',
          hpa_single_cell_type_specificity: '',
          hpa_url: '',
          induction: '',
          is_human: '',
          rna_max_value: '',
          tissue_specificity_rna: '',
          
          induction: [
            {
              evidences: [],
              value: '',
            }
          ],
          developmental_stage: [
            {
              evidences: [],
              value: '',
            }
          ]
        },
        protein_structure: {
          structured_list: []
        },
        mutation_and_disease: {
          disease_json: []
        },
        kegg_pathways: {
          pathways: '',
          pathway_data: []
        },
        protein_interaction: {
          img_url: '',
          ligand_receptor_interaction: '',	
          protein_complex: [{
            evidences: [],
            value: '',
          }],
          protein_protein_interaction: '',
          pubmed_ID:'',
          svg: '',
        },
        post_translational_modification: []
      },
    }
  },
  mounted() {
    _this = this
  
    this.Authorization = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token


    this.nowTime = Date.now()
    
    if(this.$route.query.id) {
      this.getsel_search_details2()
    } else {

      this.getHomeEditgetCode()
      setTimeout(() => {
        this.scrollToAnchor('Information', 1)
      }, 100)
    }

    this.getsel_qiniu_token()
  
    this.loading = true

    setTimeout(() => {
      this.loading = false
    }, 800)

    this.getsel_search_details_familys()

  },
  methods: {

    getsel_search_details_familys() {
      sel_search_details_familys({
        name: '',
      }).then((res) => {
        this.options = res.data.list
      })
    },
    addDia() {
      var someElement = document.getElementById(`quillEditors1${this.nowTime}`);
      var someElementToString = someElement.outerHTML;
      this.diafunction[0].value = someElementToString

      this.detailsData.protein_function.function = JSON.parse(JSON.stringify(this.diafunction))
      this.dialogVisible = false

    },

    addDia2() {
      var someElement = document.getElementById(`quillEditors22${this.nowTime}`);
      var someElementToString = someElement.outerHTML;
      this.diaInduction[0].value = someElementToString

      this.detailsData.expression_and_location.induction = JSON.parse(JSON.stringify(this.diaInduction))
      this.dialogVisible2 = false

    },

    addDia3() {
      var someElement = document.getElementById(`quillEditors33${this.nowTime}`);
      var someElementToString = someElement.outerHTML;
      this.diaStage[0].value = someElementToString
      this.detailsData.expression_and_location.developmental_stage = JSON.parse(JSON.stringify(this.diaStage))
      this.dialogVisible3 = false

    },
    closeDia() {
      this.diafunction = [{
        evidences: [],
        value: '',
      }],
      this.input3 = ''
      this.showFunction = false
      this.dialogVisible = false
    },

    closeDia2() {
      this.diaInduction = [{
        evidences: [],
        value: '',
      }],
      this.input22 = ''
      this.showInduction = false
      this.dialogVisible2 = false
    },

    closeDia3() {
      this.diaStage = [{
        evidences: [],
        value: '',
      }],
      this.input33 = ''
      this.showStage = false
      this.dialogVisible3 = false
    },

    getHomeEditgetCode() {
      HomeEditgetCode({}).then((res) => {
        this.detailsData.general_information.drgfCode = res.data.drgfId
      })
    },

    getsel_qiniu_token() {
      sel_qiniu_token({}).then((res) => {
        this.qnToken = res
      })
    },

    scrollToAnchor(anchorId, index) {
      this.thepageIndex = index
      const element = document.getElementById(anchorId);
      if (element) {
          // element.scrollIntoView({behavior: 'smooth'});

      element.scrollIntoView();}
    },
    /**
     * 保存
     */
    addDetails() {
      if(!this.detailsData.general_information.drgfCode || !this.detailsData.general_information.protein_name || !this.detailsData.general_information.organism ||
        !this.detailsData.general_information.unipro_entry || !this.detailsData.general_information.protein_status 
        || !this.detailsData.general_information.gene_id || !this.detailsData.general_information.gene_names || !this.detailsData.general_information.family_id
        || !this.detailsData.general_information.gene_also_known_as
      ) {
        this.$message({
          type: 'warning',
          message: '请完善数据'
        })
        return
      }
      if(this.$route.query.id) {
        this.detailsData.id = this.$route.query.id
      }

      // var someElement = document.getElementById(`quillEditors2${this.nowTime}`);
      // var someElementToString = someElement.outerHTML;

      // this.detailsData.general_information.gene_name = someElementToString



      // var someElement2 = document.getElementById(`quillEditors3${this.nowTime}`);
      // var someElementToString2 = someElement2.outerHTML;

      // this.detailsData.protein_sequence.complete_form = someElementToString2

       var someElement4 = document.getElementById(`quillEditors4${this.nowTime}`);
      var someElementToString4 = someElement4.outerHTML;
      this.detailsData.protein_interaction.protein_complex[0].value = someElementToString4


      sel_search_details2updDate(this.detailsData).then((res) => {
        if(res.code == 1) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.go(-1)
        }
      })
    },

    /**
     * 上传
     */
    onSuccess(index, uploadFile) {
      console.log(index, uploadFile, 3333)
      // return
      const observable =  qiniu.upload(uploadFile[0].raw, `${Date.now()}${uploadFile[0].name}`, this.qnToken)
      const observer = {
        next(res){
          
        },
        error(err){
          // ...
        },
        complete(res){
          setTimeout(() => {
              _this.detailsData.protein_interaction.svg = `http://fileotheryz.hzyzcloud.com/${res.key}`
            }, 100)
        }
      }
      observable.subscribe(observer) // 上传开始
    },

    openInput() {
      this.input1 = this.detailsData.general_information.gene_name
      this.input2 = this.detailsData.general_information.gene_id
      this.showPMID = true
    },

    changeGeneName() {
      this.detailsData.general_information.gene_name = this.input1
      this.detailsData.general_information.gene_id = this.input2
      this.showPMID = false
    },
    deleteInput1() {
      this.detailsData.general_information.gene_name = ''
      this.detailsData.general_information.gene_id = ''
    },
    openInput3() {
      this.input3 = this.detailsData.protein_function.function.value
      this.showFunction = true
    },

    changeFunction() {
      // this.detailsData.protein_function.function[0].evidences.push({
      //   id: this.input3
      // })
      this.diafunction[0].evidences.push({
        id: this.input3
      })
      this.input3 = ''
      this.showFunction = false
    },

    changeInduction() {
      this.diaInduction[0].evidences.push({
        id: this.input22
      })
      this.input22 = ''
      this.showInduction = false
    },
    changeStage() {
      this.diaStage[0].evidences.push({
        id: this.input33
      })
      this.input33 = ''
      this.showStage = false
    },
    changePubmed() {
       this.detailsData.protein_interaction.protein_complex[0].evidences.push({
        id: this.input4
      })
      this.input4 = ''
      this.showPubmed = false
    },
    deleteInput3(index) {
       this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.diafunction[0].evidences.splice(index, 1)
        // this.detailsData.protein_function.function[0].evidences.splice(index, 1)
      })
    },

    deleteInput32(index) {
       this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.diaInduction[0].evidences.splice(index, 1)
        // this.detailsData.protein_function.function[0].evidences.splice(index, 1)
      })
    },

    deleteInput33(index) {
       this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.diaStage[0].evidences.splice(index, 1)
        // this.detailsData.protein_function.function[0].evidences.splice(index, 1)
      })
    },


    editFuncition() {
      if(this.detailsData.protein_function.function.length && this.detailsData.protein_function.function[0].evidences) {
        this.diafunction[0].evidences = JSON.parse(JSON.stringify(this.detailsData.protein_function.function[0].evidences))
      } else {
        this.diafunction[0].evidences = []
      }
      this.diafunction[0].value = JSON.parse(JSON.stringify(this.detailsData.protein_function.function[0].value))
      this.dialogVisible = true
   
    },
    deleteFunition() {
      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.detailsData.protein_function.function[0].evidences = []
        this.detailsData.protein_function.function[0].value = ''
        // this.detailsData.protein_function.function[0] = [
        //   {
        //     evidences: [],
        //     value: '',
        //   }
        // ]
      })
    },


    editFuncition2() {
      if(this.detailsData.expression_and_location.induction.length && this.detailsData.expression_and_location.induction[0].evidences) {
        this.diaInduction[0].evidences = JSON.parse(JSON.stringify(this.detailsData.expression_and_location.induction[0].evidences))
      } else {
        this.diaInduction[0].evidences = []
      }
      this.diaInduction[0].value = JSON.parse(JSON.stringify(this.detailsData.expression_and_location.induction[0].value))
      this.dialogVisible2 = true
   
    },
    deleteFunition2() {
      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.diaInduction[0].evidences = []
        this.diaInduction[0].value = []
        this.detailsData.expression_and_location.induction[0].evidences = []
        this.detailsData.expression_and_location.induction[0].value = ''
        // this.detailsData.protein_function.function[0] = [
        //   {
        //     evidences: [],
        //     value: '',
        //   }
        // ]
      })
    },


    editFuncition3() {
      if(this.detailsData.expression_and_location.developmental_stage.length && this.detailsData.expression_and_location.developmental_stage[0].evidences) {
        this.diaStage[0].evidences = JSON.parse(JSON.stringify(this.detailsData.expression_and_location.developmental_stage[0].evidences))
      } else {
        this.diaStage[0].evidences = []
      }
      this.diaStage[0].value = JSON.parse(JSON.stringify(this.detailsData.expression_and_location.developmental_stage[0].value))
      this.dialogVisible3 = true
   
    },
    deleteFunition3() {
      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        console.log(111, 22222)
        this.diaStage[0].evidences = []
        this.diaStage[0].value = []
        this.detailsData.expression_and_location.developmental_stage[0].evidences = []
        this.detailsData.expression_and_location.developmental_stage[0].value = ''
        // this.detailsData.protein_function.function[0] = [
        //   {
        //     evidences: [],
        //     value: '',
        //   }
        // ]
      })
    },


    deleteInput4(index) {
       this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        this.detailsData.protein_interaction.protein_complex[0].evidences.splice(index, 1)
      })
    },

    


    openDelete(row, index) {
      this.$ElMessageBox.confirm(
        '确认删除此数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: '提示',
        }
      ).then(() => {
        row.splice(index, 1)
      })
    },
    /**
     * 添加列表
     */
    addRowList(list) {
      list.push({
        data: '',
        description: '',
        end: '',
        length: '',
        list: '',
        start: '',
        type: '',
        showChange: true,
      })
    },

    addRowList6(list) {
      console.log(list, 2222)
      list.push({
        create_time: '',
        id: '',
        p_id: '',
        pmid: '',
        ptm_enzyme: '',
        ptm_type: '',
        score_all: '',
        site: '',
        source_all: '',
        source_txt: '',
        description: '',
        showChange: true,
      })
    },

    addRowList2(list) {
      list.push({
          ASPECT: '',
          ASPECT_type: '',
          TERM: '',
          goId: '',
          goUrl: '',
          gop_evidence_type: '',
          showChange: true,
      })
    },

    addRowList3(list) {
      console.log(list, 2222)
       list.push({
            color: '',
            label: '',
            pos: '',
            tooltip: '',
            url: '',
            value: '',
          showChange: true,
      })
    },
    addRowList31(list) {
      list.push({
        chain: '',
        identifier: '',
        method: '',
        positions: '',
        resolution: '',
        source: '',
        showChange: true,
      })
    },
    addRowList4(list) {
      list.push({
        featureCrossReferences:[{
          id: '',
          url: '',
        }],
        id: '',
        positions: '',
        sequence: '',
        type: '',
        involvement_in_disease: '',
        modify_time: '',
        mutagenesis: '',
        p_id: '',
        showChange: true,
      })
    },

    addList2() {

      this.list2.push({
        name: this.input2,
      })
      this.input2 = ''
    },

    closePMID() {
      this.showPMID = false
    },


    addList2() {

      this.list2.push({
        name: this.input2,
      })
      this.input2 = ''
    },

    closePMID() {
      this.input2 = ''
      this.showPMID = false
    },

    closePMID2() {
      this.input22 = ''
      this.showInduction = false
    },

    closePMID3() {
      this.input33 = ''
      this.showStage = false
    },

    getsel_search_details2() {
      this.showEditor = false
      
      sel_search_details2({
        id: Number(this.$route.query.id)
      }).then((res) => {
        setTimeout(() => {
          this.scrollToAnchor('Information', 1)
        }, 500)
        if(res.code == 1) {
          if(!res.data.protein_interaction.protein_complex) {
            res.data.protein_interaction.protein_complex = [{
              evidences: [],
              value: '',
            }]
          }
          
          if(!res.data.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW) {
            res.data.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW = []
          }

          if(!res.data.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW) {
            res.data.expression_and_location.hpa_RNA_EXPRESSION_OVERVIEW = []
          }

          if(!res.data.protein_sequence.list) {
            res.data.protein_sequence.list = []
          }

          if(!res.data.kegg_pathways.pathway_data) {
            res.data.kegg_pathways.pathway_data = []
          }

          if(!res.data.protein_function.new_list) {
            res.data.protein_function.new_list = []
          }

          if(!res.data.post_translational_modification) {
            res.data.post_translational_modification = []
          }

          if(!res.data.expression_and_location.developmental_stage) {
            res.data.expression_and_location.developmental_stage = [
              {
              evidences: [],
              value: '',
            }
            ]
          }

          if(!res.data.expression_and_location.induction) {
            res.data.expression_and_location.induction = [
              {
              evidences: [],
              value: '',
            }
            ]
          }

          if(!res.data.protein_function.function) {
            res.data.protein_function.function = [
              {
              evidences: [],
              value: '',
            }
            ]
          }

         

          

          
          
          this.detailsData = res.data

          setTimeout(() => {
            this.showEditor = true
          }, 100)
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
::v-deep(.ql-editor) {
  p {
    font-size: 16px;
  }
  a {
    text-decoration: none;
    color: rgb(19, 82, 135);
  }
}
.btn-box2 {
  display: flex;
  align-items: flex-end;
  .btn-right-box {
    display: flex;
    align-items: center;
  }
}

.list-box2 {

      display: flex !important;
      flex-wrap: wrap;
      // border: 1px solid green;
      >div {
        // border: 1px solid red;
        .close-btn {
          margin-left: 12px;
          cursor: pointer;
        }
        display: flex;
        align-items: center;
        min-height: 30px;
        background: rgb(232, 239, 252);
        border-radius: 24px;
        padding: 0 15px;
        line-height: 30px;
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }


.scrollToAnchor-box {
  display: flex;
  >p {
    margin-right: 20px;
    cursor: pointer;
  }
}
  .dataDetails-box {
    background: #F6F7FB !important;
    .html-box {
      // border: 1px solid red;
      // white-space: nowrap;
      word-break:break-all; 
    }
    .top-box {
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border-radius: 8px;
    }
    .Module-box {
      background: #fff;
      border-radius: 8px;
      padding: 15px;
    }
    .content-box {
      // border: 1px solid red;
      height: calc(100vh - 210px);
      margin-top: 15px;
      overflow: auto;
      border-radius: 8px;
    }
    .line2-box {
      margin-top: 20px;
      display: flex;
      align-items: center;
      >div {
        margin-right: 40px;
      }
    }
    .changeType-box {
      display: flex;
      >div {
        background: rgb(224, 232, 246);
        padding: 8px 15px;
        margin-right: 20px;
        cursor: pointer;
        border-radius: 20px;
      }
    }
    .add-libe {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .PMID-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      >div {
        display: flex;
      align-items: center;
      }
    }
    .add-btn {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid rgb(233,246,247);
      background: rgb(233,246,247);
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(95, 181, 179);
      cursor: pointer;
      
    }
    .table-add {
      width: 120px;
      text-align: center;
      // line-height: 30px;
      // height: 30px;
      // background: rgb(222, 232, 248);
      margin: 0 auto;
      color: #DEE8F8;
      // color: rgb(70, 135, 225);
      cursor: pointer;

      width: 120px; /* 梯形的宽度 */
      height: 0; /* 初始高度为0 */
      border-top: 30px solid #DEE8F8; /* 底部边框形成梯形底部 */
      border-left: 25px solid transparent; /* 左边框设置为透明以形成梯形左侧 */
      border-right: 25px solid transparent; /* 右边框设置为透明以形成梯形右侧 */
      >p {
        margin-top: -23px;
        color: rgb(64, 116,  223);
      }
    }
    
  }
</style>
