<template>
    <div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="true" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="6">
                        <el-form-item label="门店">
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
                                   @click="getConMoney">查询
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
                    show-summary
                    sortable
                    style="width: 99%;margin-left:0.5%;margin-top: 20px"
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
                        label="首签消耗¥"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondCon"
                        label="复访消耗¥"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="other"
                        label="初访测评/单次/其他消耗¥"
                        min-width="95">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalCon"
                        label="总消耗金额¥"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioCon"
                        label="消耗比"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioRefund"
                        label="退费率"
                        min-width="100">
                    </el-table-column>
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
                        prop="firstVisit"
                        label="初访消耗时长"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondVisit"
                        label="复访消耗时长"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalVisit"
                        label="消耗总时长"
                        min-width="100">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="助理" name="2">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    :header-cell-style="headerStyle"
                    show-summary
                    sortable
                    style="width: 99%;margin-left:0.5%;margin-top: 20px"
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
                        label="首签消耗¥"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondCon"
                        label="复访消耗¥"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="other"
                        label="初访测评/单次/其他消耗¥"
                        min-width="95">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalCon"
                        label="总消耗金额¥"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioCon"
                        label="消耗比"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="radioRefund"
                        label="退费率"
                        min-width="100">
                    </el-table-column>
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
                        prop="firstVisit"
                        label="初访消耗时长"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="secondVisit"
                        label="复访消耗时长"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="totalVisit"
                        label="消耗总时长"
                        min-width="100">
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
                    storeId: '',
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
                tableHeight: 0
            };
        },
        methods: {

            // 表格表头样式
            headerStyle() {
                return 'text-align: center;color: black;'
            },
            // 表格样式
            cellStyle() {
                return 'text-align: center;height: 52px'
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
                        this.tableData = res.retData
                        if (this.tableData) {
                            if (this.tableData.length > 10) {
                                this.tableData.length = 10
                            }
                            this.tableHeight = this.tableData.length * 52
                        }
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            tabChange() {
                this.getConMoney().then(
                    this.param.storeId = '',
                    this.param.empName = '',
                    this.param.secondVisitEndTime = '',
                    this.param.secondVisitStartTime = ''
                )
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
