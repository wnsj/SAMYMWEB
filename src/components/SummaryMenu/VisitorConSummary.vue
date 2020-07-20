<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">客户产品消耗统计表</h1>
        </div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="true" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="11" :pull="1">
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
                    <el-col :span="5" :pull="1">
                        <el-form-item label='咨客姓名:'>
                            <el-input v-model="param.memName" placeholder="咨客姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
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
                    <el-col :span="11" :pull="1">
                        <el-form-item label="购买时间:">
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
                    <el-col :span="5" :pull="1">
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
                    <el-col :span="5">
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
                </el-row>
                <el-row>
                    <el-col :span="24" :push="10">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getVsConsume">查询
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <p class="tips">* 蓝色字体为抵扣数据</p>
        <div>
            <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                show-summary
                sortable
                max-height="530"
                style="width: 99%;margin-left:0.5%;margin-top: 20px"
                border>
                <el-table-column
                    align="center"
                    prop="memName"
                    label="客户姓名"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="firstDate"
                    label="初访时间"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="proName"
                    label="产品名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="counselorName"
                    label="咨询师"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="empName"
                    label="咨询助理"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="actualCount"
                    label="签约时长"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="realCross"
                    label="签约金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="conTime"
                    label="消耗时长"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="conMoney"
                    label="消耗金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="reTime"
                    label="退款时长"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="reMoney"
                    label="退款金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="surTime"
                    label="剩余时长"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="surMoney"
                    label="剩余金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="createDate"
                    label="购买时间"
                    :formatter="dateFormat"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="endDate"
                    :formatter="dateFormat"
                    label="到期时间"
                    min-width="100">
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
    import dateUtil from '../common/utils/dateUtil'

    export default {
        components: {},
        data() {
            return {
                param: {
                    current: 1,
                    pageSize: 10,
                    storeId: this.storeId(),
                    couId: '',
                    empId: '',
                    firstVisitStartTime: '',
                    firstVisitEndTime: '',
                    secondVisitStartTime: '',
                    secondVisitEndTime: '',
                    memName: '',
                },
                storeList: [],
                empList: [],
                couList: [],
                posName: '',
                tableData: [],
                totalAmount: 0,
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
            cellStyle(row, column, rowIndex, columnIndex) {
                if (row.row.state == 2) {
                    return 'text-align: center;color:blue'
                }
                return 'text-align: center;'
            },
            // 格式化时间
            dateFormat: function (row, column, cellValue, index) {
                if (cellValue == '-') {
                    return '-'
                }
                return dateUtil.getFormateDateYMD(cellValue)
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
            // 获取初访咨询方向汇总数据
            async getVsConsume() {
                var url = this.url + '/purchasedItemsAction/getVsConsume'
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
                this.getVsConsume()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.param.current = 1
                this.param.pageSize = pageSize
                this.getVsConsume()
            },
        },
        created() {
            this.getStore()
            this.getCou()
            this.getEmp()
            this.getVsConsume()
        }
    }
</script>

<style scoped>

</style>
