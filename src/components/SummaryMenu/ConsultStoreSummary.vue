<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨询到店消费核算表</h1>
        </div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="true" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="6">
                        <el-form-item label="门店" v-if="accountType == true">
                            <el-select v-model="param.storeId" filterable clearable placeholder="请选择">
                                <el-option v-for="item in storeList"
                                           :key="item.storeId"
                                           :label="item.storeName"
                                           :value="item.storeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label='姓名:'>
                            <el-input v-model="param.empName" placeholder="姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="消费时间">
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
                </el-row>
                <el-row>
                    <el-col :push="8">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getConsultStore">查询
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
                    max-height="530"
                    style="width: 99%;margin-left:0.5%;"
                    border>
                    <el-table-column
                        align="center"
                        prop="empName"
                        label="姓名"
                        fixed="left"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstVisit"
                        label="初访"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondVisit"
                        label="复访"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="visitTotal"
                        label="访总量"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="fsRate"
                        label="初复比"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="loss"
                        label="流失"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="lossRate"
                        label="流失率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="returnVisit"
                        label="返访"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="returnVisitRate"
                        label="返访率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="single"
                        label="单次"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="singleRate"
                        label="单次率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="singleDrop"
                        label="单脱"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="singleDropRate"
                        label="单脱率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="isArrears"
                        label="欠费"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="isArrearsRate"
                        label="欠费率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="initial"
                        label="首签"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="initialRate"
                        label="首签率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="countersignature"
                        label="复签"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="couRate"
                        label="复签率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstVisitSignRate"
                        label="初访签约率(%)"
                        min-width="115">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="renewal"
                        label="续签"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="renewalRate"
                        label="续签率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="signTotal"
                        label="签约总人数"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="roomSaturatedRate"
                        label="房间饱和率(%)"
                        min-width="115">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="助理" name="2">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    :header-cell-style="headerStyle"
                    max-height="530"
                    style="width: 99%;margin-left:0.5%;"
                    border>
                    <el-table-column
                        align="center"
                        prop="empName"
                        label="姓名"
                        fixed="left"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstVisit"
                        label="初访"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondVisit"
                        label="复访"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="visitTotal"
                        label="访总量"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="fsRate"
                        label="初复比"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="loss"
                        label="流失"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="lossRate"
                        label="流失率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="returnVisit"
                        label="返访"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="returnVisitRate"
                        label="返访率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="single"
                        label="单次"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="singleRate"
                        label="单次率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="singleDrop"
                        label="单脱"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="singleDropRate"
                        label="单脱率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="isArrears"
                        label="欠费"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="isArrearsRate"
                        label="欠费率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="initial"
                        label="首签"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="initialRate"
                        label="首签率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="countersignature"
                        label="复签"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="couRate"
                        label="复签率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="firstVisitSignRate"
                        label="初访签约率(%)"
                        min-width="115">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="renewal"
                        label="续签"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="renewalRate"
                        label="续签率(%)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="signTotal"
                        label="签约总人数"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="roomSaturatedRate"
                        label="房间饱和率(%)"
                        min-width="115">
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
                accountType: this.accountType(),
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
            async getConsultStore() {
                var url = this.url + '/consumAction/getConsultStore'
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
                        if (null != res.retData){
                            this.tableData =  res.retData
                        } else {
                            this.tableData = [];
                        }
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            tabChange() {
                this.getConsultStore().then(
                    this.param.storeId = '',
                    this.param.empName = '',
                    this.param.secondVisitEndTime = '',
                    this.param.secondVisitStartTime = ''
                )
            },
            // getSummaries(params) {
            //     console.log('数据'  + params);
            //     debugger
            // }
        },
        created() {
            this.getStore()
            this.getConsultStore()
        }
    }
</script>

<style scoped>
    .el-table{
        overflow: auto;
    }
    .el-table__header-wrapper,
    .el-table__body-wrapper,
    .el-table__footer-wrapper{
        overflow:visible;
    }
    .el-table__body-wrapper{
        overflow-x:visible !important;
    }
    /* 这个是为了解决前面样式覆盖之后伪类带出来的竖线 */
    .el-table::after{
        position: relative;
    }
</style>
