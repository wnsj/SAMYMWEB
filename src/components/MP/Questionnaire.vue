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
                @row-dblclick="editQueClick"
                :data="tableData"
                :cell-style="cellStyle"
                max-height="530"
                :header-cell-style="headerStyle"
                style="width: 95%;margin-left: 3%;margin-top: 3%"
                border>
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
                    <el-button type="primary" size="small"
                               style="width: 85px"
                               >编辑
                    </el-button>

                </el-table-column>
            </el-table>

            <!-- 添加问题弹窗 -->
            <el-dialog title="问卷调查" :visible.sync="objParam.dialogVisible" width="40%">
                <!--				<el-card class="form-container" shadow="never">-->
                <el-form :model="objParam" label-position="right" label-width="110px" :inline="true" size="small">
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
                    <el-form-item v-for="(item,index) in objParam.problemBeanList" :key="item.proSort">
                        <el-card>
                            <!-- <span class="num-sort">{{index+1}}.</span> -->

                                    <el-form-item label="问题序号：">
                                        <el-input v-model="item.proSort"></el-input>
                                    </el-form-item>


                                    <el-form-item label="问题类型：">
                                        <el-select v-model="item.proType" clearable>
                                            <el-option v-for="item in proList"
                                                       :key="item.id"
                                                       :label="item.label"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="问题描述：" style="margin-right: 5%">
                                        <el-input v-model="item.proLabel" style="width: 99%;"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-button type="warning" @click="delProbem(index,$event)">删除此问题</el-button>
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
                    <el-button type="primary" @click="addProbem()" size="small">添加问题</el-button>

                    <el-button type="primary" @click="addQue()" size="small">提交</el-button>
                    <el-button @click="resetProbem()" type="warning" size="small">重置</el-button>
                </el-footer>
            </el-dialog>


            <el-dialog title="编辑问卷调查" :visible.sync="editState" width="40%">
                <el-form :model="editParam" label-position="right" label-width="110px" :inline="true" size="small">
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
                    <el-form-item v-for="(item,index) in editParam.problemBeanList" :key="item.id">
                        <el-card>
                            <!-- <span class="num-sort">{{index+1}}.</span> -->

                            <el-form-item label="问题序号：">
                                <el-input v-model="item.proSort"></el-input>
                            </el-form-item>


                            <el-form-item label="问题类型：">
                                <el-select v-model="item.proType" clearable>
                                    <el-option v-for="item in proList"
                                               :key="item.id"
                                               :label="item.label"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="问题描述：" style="margin-right: 5%">
                                        <el-input v-model="item.proLabel" style="width: 99%;"></el-input>
                                    </el-form-item>
                                </el-col>
<!--                                <el-col :span="11">-->
<!--                                    <el-button type="warning" @click="delProbem(index,$event)">删除此问题</el-button>-->
<!--                                </el-col>-->
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
<!--                    <el-button type="primary" @click="addProbem()" size="small">添加问题</el-button>-->

                    <el-button type="primary" @click="editQue()" size="small">提交</el-button>
<!--                    <el-button @click="resetProbem()" type="warning" size="small">重置</el-button>-->
                </el-footer>
            </el-dialog>


        </div>
    </div>
</template>

<script>
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
                proList: [{id: 0, label: "无选项"}, {id: 1, label: "二选一"}, {id: 2, label: "多选一"}],
                objParam: {
                    queName: '',
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
                editParam: {
                    problemNum: '',
                    queState: 1,
                    queName: '',
                    problemBeanList: []
                }
            };
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

            //弹窗
            addQueClick() {
                this.objParam.dialogVisible = true
            },

            //弹窗
            editQueClick(row, event, column) {
                this.editState = true
                this.editParam = row
            },
            // edits(item) {
            //     console.log('数据'+item);
            //     debugger
            // },
            //添加问题数据
            addProbem() {
                // var i = this.objParam.problemBeanList.length
                //             this.objProblem.proSort=i+1
                var obj = Object.assign({}, this.objProblem); //深拷贝

                this.objParam.problemBeanList.push(obj)
            },

            addEditProbem() {
                // var i = this.objParam.problemBeanList.length
                //             this.objProblem.proSort=i+1
                var obj = Object.assign({}, this.objProblem); //深拷贝

                this.editParam.problemBeanList.push(obj)
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
            delProbem(index, event) {
                // this.current = index;
                //       //获取点击对象
                //       var el = event.currentTarget;
                //       console.log(el);
                //       console.log(index)

                this.objParam.problemBeanList.splice(index, 1)

            },
            delEditProbem(index, event) {
                this.editParam.problemBeanList.splice(index, 1)

            },


            // 获取门店
            // getStore() {
            //     var url = this.url + '/storeAction/queryStore'
            //     this.$ajax({
            //         method: 'POST',
            //         url: url,
            //         headers: {
            //             'Content-Type': this.contentType,
            //             'Access-Token': this.accessToken
            //         },
            //         data: {
            //             isuse: '1'
            //         },
            //         dataType: 'json',
            //     }).then((response) => {
            //         var res = response.data
            //         if (res.retCode == '0000') {
            //             if (res.retData.length > 0) {
            //                 this.storeList = res.retData
            //             }
            //         } else {
            //             alert(res.retMsg)
            //         }
            //
            //     }).catch((error) => {
            //         //console.log('岗位数据请求失败处理')
            //     });
            // },

            // 获取初访咨询方向汇总数据
            async getQueByCondition() {


                // var url = this.url + '/questionnaireBean/getQueByCondition'
                var url = 'http://172.16.3.127:8082/questionnaireBean/getQueByCondition'
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
                // var queState = this.objParam.queState
                // if (queState == true) {
                //     queState = 1
                // } else {
                //     queState = 2
                // }

                // var url = this.url + '/questionnaireBean/addQue'
                var url = 'http://172.16.3.127:8082/questionnaireBean/addQue'

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
                    } else {
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            editQue() {
                var queState = this.editParam.queState
                if (queState == true) {
                    queState = 1
                } else {
                    queState = 2
                }

                // var url = this.url + '/questionnaireBean/addQue'
                var url = 'http://172.16.3.127:8082/questionnaireBean/patchQueById'

                let proNum = 0;
                if (this.editParam.problemBeanList) {
                    proNum = this.editParam.problemBeanList.length
                }
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
                        queState: queState,
                        problemNum: proNum,
                        problemBeanList: this.editParam.problemBeanList,

                    },
                    dataType: 'json',
                }).then((response) => {
                    console.log(response)
                    var res = response.data
                    if (res.retCode == '0000') {
                        // this.tableData = res.retData
                        alert('修改成功！')
                        this.editState = false
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            }

            // // 翻页
            // handleCurrentChange(pageNum) {
            //     this.param.current = pageNum
            //     this.getDiseaseType()
            // },
            // // 每页条数变化时触发
            // handleSizeChange(pageSize) {
            //     this.param.pageSize = pageSize
            //     this.getDiseaseType()
            // },
        },
        created() {
            this.getQueByCondition()
        }
    }
</script>

<style scoped>
    .qesitem {
        margin-bottom: 15px;
    }

    .qesitem .num-sort {
        position: absolute;
        left: -60px;
    }
</style>
