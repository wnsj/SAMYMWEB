<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">消耗金额核算表</h1>
        </div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="6"  class="jh-pr-28">
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
                    <el-col :span="6"  class="jh-pr-28">
                        <el-form-item label='姓名:'>
                            <el-input v-model="param.empName" placeholder="姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"  class="jh-pr-28">
                        <el-form-item label="消费时间:">
                            <el-date-picker
                                v-model="param.secondVisitStartTime"
                                :picker-options="pickerOptions0"
                                type="date"
                                placeholder="开始时间">
                            </el-date-picker>
                            <span  style="margin-right: 2%"> - </span>
                            <el-date-picker
                                v-model="param.secondVisitEndTime"
                                :picker-options="pickerOptions1"
                                type="date"
                                placeholder="结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" :offset="15">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getConMoney"
                                   class="jh-fr">查询
                        </el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="exportTable()"
                                   class="jh-fr">导出
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <el-tabs @tab-click="tabChange" type="card" style="width: 100%" v-model="param.jobType">
            <el-tab-pane label="咨询师" name="1">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    :header-cell-style="headerStyle"
                    id="costConMoney"
                    max-height="530"
                    style="width: 99%;margin-left:0.5%;"
                    border>
                    <el-table-column
                        align="center"
                        prop="empName"
                        label="姓名"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstCon"
                        label="首签消耗(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondCon"
                        label="复访消耗(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="other"
                        label="初访测评/单次/其他消耗(¥)"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalCon"
                        label="总消耗金额(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="fsPerson"
                        label="初访人均(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioCon"
                        label="消耗比(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioRefund"
                        label="退费率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="couRate"
                        label="咨询师饱和率(%)"
                        min-width="100">
                    </el-table-column>
<!--                    <el-table-column-->
<!--                        align="center"-->
<!--                        prop="re"-->
<!--                        label="退费"-->
<!--                        min-width="100">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        align="center"-->
<!--                        prop="total"-->
<!--                        label="总营业额"-->
<!--                        min-width="100">-->
<!--                    </el-table-column>-->
                    <el-table-column
                        align="center"
                        prop="singleTotal"
                        label="单次"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="first"
                        label="首次"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="evaluation"
                        label="测评消耗"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="waterOther"
                        label="流水其他"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="signCount"
                        label="签约汇总消耗"
                        min-width="110">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstVisit"
                        label="初访消耗时长"
                        min-width="110">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondVisit"
                        label="复访消耗时长"
                        min-width="110">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalVisit"
                        label="消耗总时长"
                        min-width="110">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="助理" name="2">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    :header-cell-style="headerStyle"
                    id="costEmpMoney"
                    max-height="530"
                    style="width: 99%;margin-left:0.5%;"
                    border>
                    <el-table-column
                        align="center"
                        prop="empName"
                        label="姓名"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstCon"
                        label="首签消耗(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondCon"
                        label="复访消耗(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="other"
                        label="初访测评/单次/其他消耗(¥)"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalCon"
                        label="总消耗金额(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="fsPerson"
                        label="初访人均(¥)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioCon"
                        label="消耗比(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioRefund"
                        label="退费率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="couRate"
                        label="咨询师饱和率(%)"
                        min-width="100">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                        align="center"-->
                    <!--                        prop="re"-->
                    <!--                        label="退费"-->
                    <!--                        min-width="100">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                        align="center"-->
                    <!--                        prop="total"-->
                    <!--                        label="总营业额"-->
                    <!--                        min-width="100">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                        align="center"
                        prop="singleTotal"
                        label="单次"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="first"
                        label="首次"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="evaluation"
                        label="测评消耗"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="waterOther"
                        label="流水其他"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="signCount"
                        label="签约汇总消耗"
                        min-width="110">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstVisit"
                        label="初访消耗时长"
                        min-width="110">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondVisit"
                        label="复访消耗时长"
                        min-width="110">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalVisit"
                        label="消耗总时长"
                        min-width="110">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import dateUtil from '../common/utils/dateUtil'

    export default {
        components: {},
        data() {
            return {
                param: {
                    storeId: this.storeId(),
                    secondVisitStartTime: '',
                    secondVisitEndTime: '',
                    empName: '',
                    jobType: "1"
                },
                storeList: [],
                tableId: '1',
                tableData: [],
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
                accountType:this.accountType(),
            };
        },
        methods: {

            // 表格表头样式
            headerStyle() {
                return 'text-align: center;color: black;'
            },
            // 表格样式
            cellStyle() {
                return 'text-align: center;'
            },
            exportTable() {
                if (this.tableId == '1') {

                    this.exportTableToExcel('costConMoney','消耗金额核算表_咨询师')
                } else {

                    this.exportTableToExcel('costEmpMoney','消耗金额核算表_助理')
                }
            },
            // 格式化时间
            dateFormat: function (row, column, cellValue, index) {
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


            // 获取初访咨询方向汇总数据
            async getConMoney() {
                var url = this.url + '/consumAction/getConMoney'
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
                        if (null != res.retData) {
                            this.tableData = res.retData
                        } else {
                            this.tableData = []
                        }

                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            tabChange(item) {
                this.getConMoney()
                if (item.name == 1) {
                    this.tableId = '1'
                } else {
                    this.tableId = '2'
                }
            }
        },
        created() {
            this.getStore()
            this.getConMoney()
        }
    }
</script>

<style scoped>

</style>
