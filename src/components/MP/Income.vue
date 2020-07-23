<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">收入情况表</h1>
        </div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="true" size="small" :model="param">
                <el-collapse-transition>
                    <div class="searchForm" v-show="showSelect">
                        <el-row>
                            <el-col :span="6">
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
                            <el-col :span="6">
                                <el-form-item label="咨客判定:">
                                    <el-select v-model="param.visitState" clearable placeholder="请选择">
                                        <el-option v-for="item in vsJugList"
                                                   :key="item.vsId"
                                                   :label="item.vsName"
                                                   :value="item.vsId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" style="margin-left: 3%">
                                <el-form-item label="续流状态:">
                                    <el-select v-model="param.continState" clearable placeholder="请选择">
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
                            <el-col :span="6">
                                <el-form-item label='咨客姓名:'>
                                    <el-input v-model="param.vsName" placeholder="咨客姓名" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" style="margin-left: 3%">
                                <el-form-item label="是否全款:">
                                    <el-select v-model="param.isArrears" filterable clearable placeholder="请选择">
                                        <el-option v-for="item in isArrearsList"
                                                   :key="item.id"
                                                   :label="item.name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
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
                            <el-col :span="11">
                                <el-form-item label="购买时间:">
                                    <el-date-picker
                                        v-model="param.startTime"
                                        :picker-options="pickerOptions0"
                                        type="date"
                                        placeholder="开始时间">
                                    </el-date-picker>
                                    <span> - </span>
                                    <el-date-picker
                                        v-model="param.endTime"
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
                                           @click="getWater">查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-transition>
                <div class="arrow-bottom" @click="showSelect = !showSelect">
                    <div style="position: absolute; margin-left: -6px;color: black" class="el-icon-arrow-down"></div>
                </div>
            </el-form>
        </div>

        <div>
            <el-table
                :data="tableData"
                border
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                max-height="590"
                style="width: 99%;margin-left:0.5%;margin-top: 10px"
            >
                <el-table-column
                    align="center"
                    prop="vsName"
                    label="姓名"
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
                    label="咨询顾问"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="price"
                    label="购买单价(￥/次)"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="totalCount"
                    label="购买课时(次)"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="discount"
                    label="购买折扣(%)"
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
                    prop="realCross"
                    label="实收金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="payType"
                    label="缴费方式"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="visitType"
                    label="访问类型"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="visitState"
                    label="咨客判定"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="continState"
                    label="续流状态"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="operatorName"
                    label="操作人"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="isArrears"
                    label="是否全款"
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
                    startTime: '',
                    endTime: '',
                    vsName: '',
                    visitState: '',
                    couId: '',
                    empId: '',
                    visitType: '',
                    continState: '',
                    isArrears: ''
                },
                showSelect: true,
                list: [{id: 1, name: "初访"}, {id: 2, name: "复访"}],
                isArrearsList: [{id: 1, name: "全款"}, {id: 0, name: "欠费"}],
                storeList: [],
                tableData: [],
                vsJugList: [],
                empList: [],
                couList: [],
                continueList: [],
                totalAmount: 0,
                pickerOptions0: {
                    disabledDate: (time) => {
                        if (this.param.endTime !== '' && this.param.endTime !== null) {
                            return time.getTime() > Date.now() || time.getTime() > this.param.endTime
                        } else {
                            return time.getTime() > Date.now()
                        }
                    }
                },
                pickerOptions1: {
                    disabledDate: (time) => {
                        return time.getTime() < this.param.startTime || time.getTime() > Date.now()
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
            // getSummaries(param) {
            //     const {columns, data} = param;
            //
            //     const sums = [];
            //         columns.forEach((column, index) => {
            //             if (index === 0) {
            //                 sums[index] = '合计';
            //                 return;
            //             }
            //             const values = data.map(item => Number(item[column.property]));
            //             if (index === 5) {
            //                 sums[5] = sums[5]
            //             } else if (index === 8) {
            //                 sums[8] = sums[8]
            //             } else {
            //                 if (!values.every(value => isNaN(value))) {
            //                     sums[index] = values.reduce((prev, curr) => {
            //                         const value = Number(curr);
            //                         if (!isNaN(value)) {
            //                             return prev + curr;
            //                         } else {
            //                             return prev;
            //                         }
            //                     }, 0);
            //                 }
            //             }
            //         });
            // },
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
                            this.vsJugList = res.retData.filter(item => item.stateType == 1)
                            this.continueList = res.retData.filter(item => item.stateType == 2)
                        }
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('状态数据请求失败处理')
                });
            },

            // 获取初访咨询方向汇总数据
            getWater() {
                this.showSelect = false
                this.getWaterByCondition()
            },
            async getWaterByCondition() {
                var url = this.url + '/consumAction/getWaterByCondition'
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
                this.getWaterByCondition()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.param.current = 1
                this.param.pageSize = pageSize
                this.getWaterByCondition()
            },
        },
        created() {
            this.getStore()
            this.getObj()
            this.getEmp()
            this.getCou()
            this.getWaterByCondition()
        }
    }
</script>

<style>
    .searchForm {
        background-color: white;
    / / margin-top: 40 px;
        padding-top: 30px;
        border-radius: 5px;
        padding-bottom: 22px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .arrow-bottom{
        content: "";
        display: block;
        border-width: 0px 15px 15px;
        border-style: none solid solid;
        border-color: transparent transparent #e3e3e3;
        -webkit-transform: rotate(-180deg);
        margin-left: 45%;
        z-index: 9999;
        width: 100px;
    }
</style>
