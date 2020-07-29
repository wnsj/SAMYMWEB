<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">访客跟踪明细表</h1>
        </div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="12" class="jh-pr-28">
                        <el-form-item label="初访时间:">
                            <el-date-picker
                                v-model="param.firstVisitStartTime"
                                :picker-options="pickerOptions0"
                                type="date"
                                placeholder="开始时间">
                            </el-date-picker>
                            <span> - </span>
                            <el-date-picker
                                v-model="param.firstVisitEndTime"
                                :picker-options="pickerOptions1"
                                type="date"
                                placeholder="结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="访问类型:">
                            <el-select v-model="param.visitType" clearable placeholder="请选择"
                                       @change="getObj(param.visitType)">
                                <el-option v-for="item in list"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="咨客判定:">
                            <el-select v-model="param.isfirst" clearable placeholder="请选择">
                                <el-option v-for="item in vsJugList"
                                           :key="item.vsId"
                                           :label="item.vsName"
                                           :value="item.vsId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" class="jh-pr-28">
                        <el-form-item label="到访时间:">
                            <el-date-picker
                                v-model="param.secondVisitStartTime"
                                :picker-options="pickerOptions0"
                                type="date"
                                placeholder="开始时间">
                            </el-date-picker>
                            <span> - </span>
                            <el-date-picker
                                v-model="param.secondVisitEndTime"
                                :picker-options="pickerOptions1"
                                type="date"
                                placeholder="结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="门店:" v-if="accountType == true">
                            <el-select v-model="param.storeId" filterable clearable placeholder="请选择">
                                <el-option :key="0" label="未选择" value=0></el-option>
                                <el-option v-for="item in storeList"
                                           :key="item.storeId"
                                           :label="item.storeName"
                                           :value="item.storeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label='咨客姓名:'>
                            <el-input v-model="param.memName" placeholder="咨客姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="jh-pr-28">
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
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="咨询顾问:">
                            <el-select v-model="param.empId" filterable clearable placeholder="请选择">
                                <el-option v-for="item in empList"
                                           :key="item.empId"
                                           :label="item.empName"
                                           :value="item.empId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label='产品:'>
                            <el-input v-model="param.proName" placeholder="产品" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="续流状态:">
                            <el-select v-model="param.continueState" clearable placeholder="请选择">
                                <el-option v-for="item in continueList"
                                           :key="item.vsId"
                                           :label="item.vsName"
                                           :value="item.vsId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" :offset="15">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getAllConByCondition"
                                   class="jh-fr">查询
                        </el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="exportTableToExcel('visitorDe','访客跟踪明细表')"
                                   class="jh-fr">导出
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div>
            <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                max-height="530"
                id="visitorDe"
                style="margin-top: 20px"
                border>
                <el-table-column
                    align="center"
                    prop="firstTime"
                    label="初访时间"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="receiveTime"
                    label="到访时间"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="visitType"
                    label="访问类型"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="continState"
                    label="续流状态"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="storeName"
                    label="门店"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="memName"
                    label="咨客姓名"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="diseaseType"
                    label="咨询方向"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="diseaseProblem"
                    label="咨询问题"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="counselorName"
                    label="咨询师"
                    min-width="95">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="empName"
                    label="顾问"
                    min-width="95">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="phone"
                    label="联系方式"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="proName"
                    label="产品"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="isfirst"
                    label="客户判定"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="totalCount"
                    label="时长"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="realCross"
                    label="金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="reason"
                    label="原因"
                    show-overflow-tooltip
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="remark"
                    show-overflow-tooltip
                    label="跟进情况"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="followUpPerson"
                    label="跟进人"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="title"
                    label="类型"
                    min-width="95">
                </el-table-column>
            </el-table>
            <el-row class="second_interval">
                <el-col :span="24">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="param.current"
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
    export default {
        components: {},
        data() {
            return {
                param: {
                    current: 1,
                    pageSize: 10,
                    storeId: this.storeId(),
                    firstVisitStartTime: '',
                    firstVisitEndTime: '',
                    secondVisitStartTime: '',
                    secondVisitEndTime: '',
                    memName: '',
                    isfirst: '',
                    visitType: '',
                    couId: '',
                    empId: '',
                    proName: '',
                    continueState: ''
                },
                list: [{id: 1, name: "初访"}, {id: 2, name: "复访"}],
                storeList: [],
                tableData: [],
                empList: [],
                couList: [],
                totalAmount: 0,
                vsJugList: [],
                continueList: [],
                pickerOptions0: {
                    disabledDate: (time) => {
                        if (this.param.firstVisitEndTime !== '' && this.param.firstVisitEndTime !== null) {
                            return time.getTime() > Date.now() || time.getTime() > this.param.firstVisitEndTime
                        } else {
                            return time.getTime() > Date.now()
                        }
                    }
                },
                pickerOptions1: {
                    disabledDate: (time) => {
                        return time.getTime() < this.param.firstVisitStartTime || time.getTime() > Date.now()
                    }
                },
                accountType: this.accountType(),
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
            getEmp() {
                var url = this.url + '/employeeAction/getAllEmpByPosName'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        posName: "咨询顾问"
                    },
                    dataType: 'json',
                }).then(res => {
                    this.empList = res.data.retData
                }).catch(error => {
                    console.log(error);
                })
            },
            //vsType:1初访，2复访；stateType：1客户判定，2续流状态
            getObj(vsType) {
                //consolele.log('vsType:'+vsType)
                var url = this.url + '/visitState/queryVisitState'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        vsType: vsType,
                        isUse: '1'
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        if (res.retData.length > 0) {
                            this.vsJugList = res.retData.filter(item => item.stateType==1)
                            this.continueList = res.retData.filter(item => item.stateType==2)
                        }
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('状态数据请求失败处理')
                });
            },
            // 获取初访咨询方向汇总数据
            async getAllConByCondition() {
                var url = this.url + '/consumAction/getAllConByCondition'
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
                this.param.current = pageNum
                this.getAllConByCondition()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.param.current = 1
                this.param.pageSize = pageSize
                this.getAllConByCondition()
            },
        },
        created() {
            this.getStore()
            this.getCou()
            this.getEmp()
            this.getObj()
            this.getAllConByCondition()
        }
    }
</script>

<style scoped>

</style>
