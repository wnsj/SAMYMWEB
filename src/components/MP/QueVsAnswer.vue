<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨客问卷调查结果</h1>
        </div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="6">
                        <el-form-item label="咨客:">
                            <el-select v-model="param.vsId" filterable clearable placeholder="请选择">
                                <el-option v-for="item in queVisitorList"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="问卷:">
                            <el-select v-model="param.queId" filterable clearable placeholder="请选择">
                                <el-option v-for="item in queList"
                                           :key="item.id"
                                           :label="item.queName"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="咨询师:">
                            <el-select v-model="param.couId" filterable clearable placeholder="请选择">
                                <el-option v-for="item in couList"
                                           :key="item.empId"
                                           :label="item.empName"
                                           :value="item.empId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="门店:" v-if="accountType == true">
                            <el-select v-model="param.storeId" filterable clearable placeholder="请选择">
                                <el-option v-for="item in storeList"
                                           :key="item.storeId"
                                           :label="item.storeName"
                                           :value="item.storeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :pull="2">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getAnswerByCondition"
                                   class="jh-fr">查询
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
<!--            <el-dialog title="问卷调查" :visible.sync="dialogVisible" width="40%">-->
<!--                <el-card class="form-container" shadow="never">-->
<!--                    <el-form :model="select">-->
<!--                        <el-form-item label="问卷调查名称：" label-width="110px">-->
<!--                            <el-input v-model="select.queName"></el-input>-->
<!--                        </el-form-item>-->

<!--                        <el-form-item v-for="(item,index) in select.problemBeanList" :key="item.proSort">-->
<!--                            <el-card>-->
<!--                                <el-form-item label="问题序号：" label-width="110px">-->
<!--                                    <el-input v-model="item.proSort"></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="问题描述：" label-width="110px">-->
<!--                                    <el-input v-model="item.proLabel"></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="选项答案：" label-width="110px">-->
<!--                                    <el-input v-model="item.selectedAnswer"></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="描述答案：" label-width="110px">-->
<!--                                    <el-input v-model="item.describeAnswer"></el-input>-->
<!--                                </el-form-item>-->
<!--                            </el-card>-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
<!--                </el-card>-->
<!--            </el-dialog>-->

            <el-dialog title="问卷调查" :visible.sync="dialogVisible" width="40%">
                <!--				<el-card class="form-container" shadow="never">-->
                <el-form :model="select" label-position="right" label-width="110px" :inline="true" size="small">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="问卷调查名称：">
                                <el-input v-model="select.queName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item v-for="(item,index) in select.problemBeanList" :key="item.proSort">
                        <el-card>
                            <!-- <span class="num-sort">{{index+1}}.</span> -->

                            <el-form-item label="问题序号：">
                                <el-input v-model="item.proSort"></el-input>
                            </el-form-item>
                            <el-form-item label="问题描述：">
                                <el-input v-model="item.proLabel"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12" v-if="item.selectedAnswer">
                                    <el-form-item label="选项答案：">
                                        <el-input v-model="item.selectedAnswer"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" v-if="item.describeAnswer">
                                    <el-form-item label="描述答案：">
                                        <el-input v-model="item.describeAnswer"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>

        <div>
            <el-table
                :data="tableData"
                :cell-style="cellStyle"
                max-height="530"
                @row-dblclick="toDetails"
                :header-cell-style="headerStyle"
                style="width: 95%;margin-left: 3%;margin-top: 20px"
                border>
                <el-table-column
                    align="center"
                    prop="vsName"
                    label="咨客姓名"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="couName"
                    label="咨询师"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="phone"
                    label="联系方式"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="visitTime"
                    :formatter="dateFormat"
                    label="来访时间"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="queName"
                    label="问卷"
                    min-width="100">
                </el-table-column>
            </el-table>
            <el-row class="second_interval">
                <el-col :span="24">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="param.pageNum"
                        :page-sizes="[10,20,30,50]"
                        :page-size="param.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalAmount"
                    >
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import dateUtil from "../common/utils/dateUtil";

    export default {
        components: {},
        data() {
            return {
                param: {
                    pageNum: 1,
                    pageSize: 10,
                    vsId: '',
                    couId: '',
                    queId: '',
                    storeId: this.storeId()
                },
                select: {
                    queName: '',
                    queState: '',
                    problemBeanList: []
                },
                queVisitorList: [],
                storeList: [],
                couList: [],
                queList: [],
                tableData: [],
                totalAmount: 0,
                dialogVisible: false,
                accountType: this.accountType()
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
            // 获取咨客
            getQueVisitor() {
                var url = this.url + '/queVisitor/getAllQueVs'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {},
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        if (res.retData.length > 0) {
                            this.queVisitorList = res.retData
                        }
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },
            // 获取门店
            getStore() {
                var url = this.url + '/storeAction/queryStore'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        isuse: '1'
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.storeList = res.retData
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            getCou() {
                var url = this.url + '/employeeAction/getAllEmpByPosName'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        posName: "咨询师"
                    },
                    dataType: 'json',
                }).then(res => {
                    this.couList = res.data.retData
                }).catch(error => {
                    console.log(error);
                })
            },
            getQue() {
                var url = this.url + '/questionnaireBean/getAllQue'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {},
                    dataType: 'json',
                }).then(res => {
                    this.queList = res.data.retData
                }).catch(error => {
                    console.log(error);
                })
            },
            toDetails(row, column, event) {
                this.dialogVisible = true
                this.select.queName = row.queName
                var url = this.url + '/answerBean/getAnswerByQueId'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        vsId: row.vsId,
                        queId: row.queId
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.select.problemBeanList = res.retData
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },
            // 格式化时间
            dateFormat: function (row, column, cellValue, index) {
                return dateUtil.getFormateDateYMD(cellValue)
            },
            // 获取初访咨询方向汇总数据
            async getAnswerByCondition() {
                var url = this.url + '/answerBean/getAnswerByCondition'
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
                        this.tableData = res.retData.records
                        this.totalAmount = res.retData.total
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            // 翻页
            handleCurrentChange(pageNum) {
                this.param.pageNum = pageNum
                this.getAnswerByCondition()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.param.pageSize = pageSize
                this.getAnswerByCondition()
            },
        },
        created() {
            this.getQueVisitor()
            this.getStore()
            this.getCou()
            this.getQue()
            this.getAnswerByCondition()
        }
    }
</script>

<style scoped>

</style>
