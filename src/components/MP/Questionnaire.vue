<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">问卷调查管理</h1>
        </div>
        <div class="top">
            <!--            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">-->
            <!--                <el-row style="margin-top: 2%">-->
            <!--                    <el-col :span="6" class="jh-pr-28">-->
            <!--                        <el-form-item label="门店:" v-if="accountType == true">-->
            <!--                            <el-select v-model="param.storeId" filterable clearable placeholder="请选择">-->
            <!--                                <el-option :key="0" label="未选择" value=0></el-option>-->
            <!--                                <el-option v-for="item in storeList"-->
            <!--                                           :key="item.storeId"-->
            <!--                                           :label="item.storeName"-->
            <!--                                           :value="item.storeId">-->
            <!--                                </el-option>-->
            <!--                            </el-select>-->
            <!--                        </el-form-item>-->
            <!--                    </el-col>-->
            <!--                    <el-col :span="12" class="jh-pr-28">-->
            <!--                        <el-form-item label="时间:">-->
            <!--                            <el-date-picker-->
            <!--                                v-model="param.firstVisitStartTime"-->
            <!--                                :picker-options="pickerOptions0"-->
            <!--                                type="date"-->
            <!--                                placeholder="开始时间">-->
            <!--                            </el-date-picker>-->
            <!--                            <span> - </span>-->
            <!--                            <el-date-picker-->
            <!--                                v-model="param.firstVisitEndTime"-->
            <!--                                :picker-options="pickerOptions1"-->
            <!--                                type="date"-->
            <!--                                placeholder="结束时间">-->
            <!--                            </el-date-picker>-->
            <!--                        </el-form-item>-->
            <!--                    </el-col>-->
            <!--                    <el-col :span="3" class="jh-pr-28">-->
            <!--                        <el-button type="primary" size="small"-->
            <!--                                   style="width: 85px"-->
            <!--                                   @click="getDiseaseType"-->
            <!--                                   class="jh-fr">查询-->
            <!--                        </el-button>-->
            <!--                    </el-col>-->
            <!--                    <el-col :span="3">-->
            <!--                        <el-button type="primary" size="small"-->
            <!--                                   style="width: 85px"-->
            <!--                                   @click="exportTableToExcel('firstVd','初访咨询方向统计表')"-->
            <!--                                   class="jh-fr">导出-->
            <!--                        </el-button>-->
            <!--                    </el-col>-->
            <!--                </el-row>-->
            <!--            </el-form>-->
            <el-button type="primary" size="small"
                       style="width: 85px"
                       @click="getQueByCondition"
                       class="jh-fr">查询
            </el-button>
            <el-button type="warning" size="small"
                       style="width: 85px"
                       @click="addQueClick"
                       class="jh-fr">新增
            </el-button>
        </div>

        <div>
            <el-table
                :data="tableData"
                :cell-style="cellStyle"
                max-height="530"
                :header-cell-style="headerStyle"
                style="width: 95%;margin-left: 3%;margin-top: 3%"
                border>
                <el-table-column
                    align="center"
                    prop="id"
                    label="ID"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="queName"
                    label="名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="problemNum"
                    label="题数"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    min-width="100">
                    <template slot-scope="scope">
                      <!-- <el-link type="primary" @click="editQueClick(scope.row)">编辑</el-link> -->
                      <el-button type="warning" size="small"  @click="editQueClick(scope.row)">编辑</el-button>
                      <el-button type="warning" size="small"  @click="photoFunia(scope.row)">合成图片</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 合成图片弹窗 -->
            <el-dialog
              :visible.sync="photofuniaState"
              width="50%">
              <div slot="title" class="wj-title">合成图片</div>
              <div class="dialog-body">
                  <div class="share-img" ref="shareBox">
                      <img :src="imgUrl" alt="分享图">
                  </div>
                  <div class="creat-img" ref="creatBox">
                      <img src="../../assets/img/qrcode-bg.png" alt="分享背景图">
                      <div id="qrcode" class="qrcode"></div>
                  </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="photofuniaState = false">取 消</el-button>
                <el-button type="primary" @click="picDowns">下载图片</el-button>
              </div>
            </el-dialog>

            <!-- 添加问题弹窗 -->
            <el-dialog  :visible.sync="objParam.dialogVisible" width="50%">
                <div slot="title" class="wj-title">新增问卷调查</div>
                <!--				<el-card class="form-container" shadow="never">-->
                <el-form :model="objParam" label-position="right" label-width="110px" size="small">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="问卷调查名称：">
                                <el-input v-model="objParam.queName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否可用：">
                                <el-select v-model="objParam.queState">
                                    <el-option v-for="item in queStateList"
                                               :key="item.id"
                                               :label="item.label"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-checkbox-group v-model="objParam.scoreList">
                                <template v-for="item in scoreObj">
                                    <el-col :span="8" :key="item.id">
                                        <el-checkbox :key="item.id" :label="item.id"  >
                                            {{item.scoreName}}
                                        </el-checkbox>
                                    </el-col>
                                </template>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-form-item v-for="(item,index) in objParam.problemBeanList" :key="index" label-width="0px">
                        <el-card>
                            <!-- <span class="num-sort">{{index+1}}.</span> -->
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="问题序号：">
                                        <el-input v-model="item.proSort"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="问题类型：">
                                        <el-select v-model="item.proType" clearable>
                                            <el-option v-for="item in proList"
                                                       :key="item.id"
                                                       :label="item.label"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="danger" @click="delProbem(index,$event,1)">删除此问题</el-button>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="问题描述：" style="margin-right: 5%">
                                        <el-input v-model="item.proLabel" style="width: 99%;"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <!-- <el-select v-model="item.answer">
                                 <el-option :value="1">没有描述</el-option>
                               <el-option :value="2">有描述</el-option>
                             </el-select> -->
                        </el-card>
                    </el-form-item>
                </el-form>
                <!--				</el-card>-->
                <el-footer style="margin-top: 2%">
                    <el-button type="primary" @click="addProbem(1)" size="small">添加问题</el-button>

                    <el-button type="primary" @click="addQue()" size="small">提交</el-button>
                    <el-button @click="resetProbem()" type="warning" size="small">重置</el-button>
                </el-footer>
            </el-dialog>

            <!-- 编辑问卷调查 -->
            <el-dialog :visible.sync="editState" width="50%">
                <div slot="title" class="wj-title">编辑问卷调查</div>
                <el-form :model="editParam" label-position="right" label-width="110px" size="small">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="问卷调查名称：">
                                <el-input v-model="editParam.queName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否可用：">
                                <el-select v-model="editParam.queState" clearable>
                                    <el-option v-for="item in queStateList"
                                               :key="item.id"
                                               :label="item.label"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-checkbox-group v-model="editParam.scoreList">
                                <template v-for="item in scoreObj">
                                    <el-col :span="8" :key="item.id">
                                        <el-checkbox :key="item.id" :label="item.id"  >
                                            {{item.scoreName}}
                                        </el-checkbox>
                                    </el-col>
                                </template>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-form-item v-for="(item,index) in editParam.problemBeanList" :key="index" label-width="0px">
                        <el-card>
                            <!-- <span class="num-sort">{{index+1}}.</span> -->
                            <el-row>
                                <el-col :span="8">
                                        <el-form-item label="问题序号：">
                                        <el-input v-model="item.proSort"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="问题类型：">
                                        <el-select v-model="item.proType" clearable>
                                            <el-option v-for="item in proList"
                                                       :key="item.id"
                                                       :label="item.label"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="danger" @click="delProbem(index,$event,2)">删除此问题</el-button>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="问题描述：" style="margin-right: 5%">
                                        <el-input v-model="item.proLabel" style="width: 99%;"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <!-- <el-select v-model="item.answer">
                                 <el-option :value="1">没有描述</el-option>
                               <el-option :value="2">有描述</el-option>
                             </el-select> -->
                        </el-card>
                    </el-form-item>
                </el-form>
                <!--				</el-card>-->
                <el-footer style="margin-top: 2%">
                    <el-button type="primary" @click="addProbem(2)" size="small">添加问题</el-button>
                    <el-button type="primary" @click="editQue()" size="small">提交</el-button>
<!--                    <el-button @click="resetProbem()" type="warning" size="small">重置</el-button>-->
                </el-footer>
            </el-dialog>


        </div>
    </div>
</template>

<script>
    import { qrcanvas } from 'qrcanvas'
    import html2canvas from 'html2canvas'
    import imgShare from "../../assets/img/loading.gif";

    export default {
        components: {},
        data() {
            return {
                param: {
                    problemNum: '',
                    queState: 1,
                    queName: '',
                    problemBeanList: []
                },
                queStateList: [{id:1,label:"可用"},{id:2,label:"不可用"}],
                objProblem: {
                    proSort: '',
                    proLabel: '',
                    proType: '',
                    //answer:'',
                },
                problemBeanList: [],
                proList: [{id: 0, label: "无选项"}, {id: 1, label: "二选一"}],
                objParam: {
                    queName: '',
                    scoreList: [],
                    queState: 1,
                    dialogVisible: false,
                    problemBeanList: [
                        {
                            proSort: 1,
                            proLabel: '',
                            proType: '',
                            //answer:'',
                        }
                    ]
                },
                tableData: [],
                editState: false,
                photofuniaState: false,
                imgUrl: imgShare,
                editParam: '',
                pro:{
                    queId:'',
                    proSort: '',
                    proLabel: '',
                    proType: '',
                },
                scoreObj: [
                    {id:'1',scoreName:'咨询师评分'},
                    {id:'2',scoreName:'咨询顾问评分'},
                    {id:'3',scoreName:'店铺评分'}
                ]
            };
        },
        watch: {
          imgUrl (val, oldval) {
            // 监听到imgUrl有变化以后 说明新图片已经生成 隐藏DOM
            this.$refs.creatBox.style.display = 'none';

          }
        },
        methods: {
            // 表格表头样式
            headerStyle() {
                return 'text-align: center;color: black;'
            },
            // 表格行样式
            cellStyle() {
                return 'text-align: center;'
            },
            photoFunia(row){
                console.log(row)
                this.photofuniaState = true;
                this.imgUrl = imgShare;
                setTimeout(()=>{
                    this.createQrcode(row.id);
                },500)
                // var _this = this;
                // setTimeout(function(){
                //     _this.createQrcode();
                // },500)
            },
            createQrcode (qId) {

              let that = this
              that.$refs.creatBox.style.display = 'block'
              that.$nextTick(function () {
                  var quesUrl = 'http://vip.miyuexli.com/my_evaluation/index.html?titleID='+qId

                // 生成二维码
                var canvas1 = qrcanvas({
                  data: decodeURIComponent(quesUrl),
                  size: 168
                })
                document.getElementById('qrcode').innerHTML = ''
                document.getElementById('qrcode').appendChild(canvas1)

                html2canvas(that.$refs.creatBox).then(function (canvas) {
                  that.imgUrl = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
                })
              })
            },
            // base64转blob
            base64ToBlob (code) {
              let parts = code.split(';base64,')
              let contentType = parts[0].split(':')[1]
              let raw = window.atob(parts[1])
              let rawLength = raw.length

              let uInt8Array = new Uint8Array(rawLength)

              for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i)
              }
              return new Blob([uInt8Array], {type: contentType})
            },
            // 下载图片
            picDowns () {
              var alink = document.createElement('a')
              alink.href = this.imgUrl
              alink.download = this.randomString() // 图片名
              alink.click()
            },
            //随机字符串 做为图片名
            randomString() {
                 var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                 var string_length = 8;
                 var randomstring = '';
                 for (var i=0; i<string_length; i++) {
                  var rnum = Math.floor(Math.random() * chars.length);
                  randomstring += chars.substring(rnum,rnum+1);
                 }
                 return randomstring;
            },



            //弹窗
            addQueClick() {
                this.objParam.dialogVisible = true
            },
            //弹窗
            editQueClick(row) {
                this.getQueByCondition()
                this.editState = true
                this.editParam = row
            },
            cellClick(row, column, cell, event) {
                this.getQueByCondition()
                if (column.label == "操作") {
                    this.editState = true
                    this.editParam = row
                }
            },
            //添加问题数据
            addProbem(item) {
                if (item == 1) {
                    var obj = Object.assign({}, this.objProblem); //深拷贝
                    this.objParam.problemBeanList.push(obj)
                } else if (item == 2) {
                    this.pro.queId = this.editParam.id
                    var OBJ = Object.assign({},this.pro)
                    this.editParam.problemBeanList.push(OBJ)
                }
            },
            // 清空问题
            resetProbem() {
                var obj = {
                    queName: '',
                    queState: 1,
                    dialogVisible: true,
                    problemBeanList: [
                        {
                            proSort: 1,
                            proLabel: '',
                            proType: '',
                            //answer:'',
                        }
                    ]
                }
                this.objParam = obj;
            },
            //删除问题数据
            delProbem(index, event,item) {
                if (item == 1) {
                    this.objParam.problemBeanList.splice(index, 1)
                } else if(item == 2) {
                    this.editParam.problemBeanList.splice(index, 1)
                }
            },
            // 获取初访咨询方向汇总数据
            async getQueByCondition() {
                var url = this.url + '/questionnaireBean/getQueByCondition'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.param,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.tableData = res.retData
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },
            //添加问题
            addQue() {
                var url = this.url + '/questionnaireBean/addQue'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    // data: this.param,
                    data: {
                        queName: this.objParam.queName,
                        queState: this.objParam.queState,
                        scoreList: this.objParam.scoreList,
                        problemNum: this.objParam.problemBeanList.length,
                        problemBeanList: this.objParam.problemBeanList
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.tableData = res.retData
                        alert('提交成功！')
                        this.objParam.dialogVisible = false
                        this.getQueByCondition()
                    } else {
                    }
                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },
            editQue() {
                var url = this.url + '/questionnaireBean/patchQueById'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    // data: this.param,
                    data: {
                        id: this.editParam.id,
                        queName: this.editParam.queName,
                        queState: this.editParam.queState,
                        problemNum: this.editParam.problemBeanList.length,
                        scoreList: this.editParam.scoreList,
                        problemBeanList: this.editParam.problemBeanList,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        // this.tableData = res.retData
                        alert('修改成功！')
                        this.editState = false
                        this.getQueByCondition()
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    alert(response.data.retMsg)
                });
            }



        },
        created() {
            this.getQueByCondition()
        }
    }
</script>

<style scoped>
    .wj-title{font-weight: bold;font-size: 20px;}
    .jh-fr{margin-right: 35px;}
    .qesitem {
        margin-bottom: 15px;
    }
    .qesitem .num-sort {
        position: absolute;
        left: -60px;
    }

    .dialog-body{
        width: 100%;
        height: 590px;
        text-align: center;
    }
    .share-img{
       /* display: none; */
       text-align: center;
       vertical-align: middle;
        position: relative;
        z-index: 9;
    }
    .creat-img{
      display: none;
      width: 414px;
      height: 585px;
      z-index: 4;
      text-align: center;
      margin: 0 auto;
      /* position: relative;*/
      position: absolute;
      top: 90px;
      left: 50%;
      margin-left: -207px;

    }
    .creat-img  img{
      width: 100%;
      height: 100%;
      z-index: 3;
      display: block;
      margin: 0 auto;
    }
    .creat-img .qrcode{
      position: absolute;
      left: 128px;
      bottom: 113px;
     /* left: 50%;
      margin-left: -64px; */
      z-index: 5;
    }
</style>
