<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">收入情况核算表</h1>
        </div>
        <el-collapse-transition>
        <div class="top" v-show="showSelect">
            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="门店:"v-has="'SAMY:MP:STORE'">
                                <el-select v-model="param.storeId" filterable clearable placeholder="请选择">
                                    <el-option :key="0" label="未选择" value=''></el-option>
                                    <el-option v-for="item in storeList"
                                               :key="item.storeId"
                                               :label="item.storeName"
                                               :value="item.storeId">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28" v-show="showName">
                        <el-form-item label='姓名:'>
                            <el-input v-model="param.empName" placeholder="姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="jh-pr-28">
                        <el-form-item label="消费时间:">
                            <el-date-picker
                                v-model="param.begDate"
                                :picker-options="pickerOptions0"
                                type="date"
                                placeholder="开始时间">
                            </el-date-picker>
                            <span style="margin-right: 2%"> - </span>
                            <el-date-picker
                                v-model="param.endDate"
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
                                   @click="getData(tableId)"
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
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect"  @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        <el-tabs @tab-click="tabChange" type="card" style="width: 100%" v-model="param.jobType">
            <el-tab-pane label="咨询师" name="1">
                <el-table ref="productTable" :data="objList" id="empCon" :height="tableHeight"  style="width: 100%" show-summary border
                          :summary-method="getSummaries">

                    <el-table-column label="名字" width="100" align="center" prop="empName" fixed></el-table-column>
                    <el-table-column label="岗位" width="100" align="center" prop="posName"></el-table-column>

                    <el-table-column label="初访金额" width="100" align="center" prop="firstVisit"></el-table-column>
                    <el-table-column label="复访金额" width="100" align="center" prop="secondVisit"></el-table-column>
                    <el-table-column label="返访金额" width="100" align="center" prop="reverseVisit"></el-table-column>
                    <el-table-column label="退费金额" width="100" align="center" prop="realRefund"></el-table-column>

                    <el-table-column label="总金额" width="100" align="center" prop="totleCount"></el-table-column>
                    <el-table-column label="流水收入金额" width="120" align="center" prop="flowTotleCount"></el-table-column>

                    <el-table-column label="首签金额" width="100" align="center" prop="piInitialSign"></el-table-column>
                    <el-table-column label="首签率￥(%)" width="100" align="center" prop="initialRate"></el-table-column>
                    <el-table-column label="复签金额" width="100" align="center" prop="piRepeatSign"></el-table-column>
                    <el-table-column label="复签率￥(%)" width="100" align="center" prop="repeatRate"></el-table-column>
                    <el-table-column label="续签金额" width="100" align="center" prop="piContinuSign"></el-table-column>
                    <el-table-column label="续签率￥(%)" width="100" align="center" prop="continuRate"></el-table-column>

                    <el-table-column label="签约总金额" width="100" align="center" prop="totleCountSign"></el-table-column>
                    <el-table-column label="总营业额" width="100" align="center" prop="totleIncome"></el-table-column>
                    <el-table-column label="签约率￥(%)" width="100" align="center" prop="signRate"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="咨询顾问" name="2">
                <el-table ref="productTable" :data="objList" id="emp" :height="tableHeight" style="width: 100%" show-summary border fixed
                          :summary-method="getSummaries">

                    <el-table-column label="名字" width="100" align="center" prop="empName"></el-table-column>
                    <el-table-column label="岗位" width="100" align="center" prop="posName"></el-table-column>

                    <el-table-column label="初访金额" width="100" align="center" prop="firstVisit"></el-table-column>
                    <el-table-column label="复访金额" width="100" align="center" prop="secondVisit"></el-table-column>
                    <el-table-column label="返访金额" width="100" align="center" prop="piReverseVisit"></el-table-column>
                    <el-table-column label="退费金额" width="100" align="center" prop="realRefund"></el-table-column>

                    <el-table-column label="总金额" width="100" align="center" prop="totleCount"></el-table-column>
                    <el-table-column label="流水收入金额" width="120" align="center" prop="flowTotleCount"></el-table-column>

                    <el-table-column label="首签金额" width="100" align="center" prop="piInitialSign"></el-table-column>
                    <el-table-column label="首签率￥(%)" width="100" align="center" prop="initialRate"></el-table-column>
                    <el-table-column label="复签金额" width="100" align="center" prop="piRepeatSign"></el-table-column>
                    <el-table-column label="复签率￥(%)" width="100" align="center" prop="repeatRate"></el-table-column>
                    <el-table-column label="续签金额" width="100" align="center" prop="piContinuSign"></el-table-column>
                    <el-table-column label="续签率￥(%)" width="100" align="center" prop="continuRate"></el-table-column>

                    <el-table-column label="签约总金额" width="100" align="center" prop="totleCountSign"></el-table-column>
                    <el-table-column label="总营业额" width="100" align="center" prop="totleIncome"></el-table-column>
                    <el-table-column label="签约率￥(%)" width="100" align="center" prop="signRate"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="收银日报表" name="3">
                <el-table
                    max-height="530"
                    ref="productTable"
                    :data="incomeByPayType"
                    :height="tableHeight"
                    style="width: 100%"
                    show-summary border
                    id="dayMoney">
                    <el-table-column
                        align="center"
                        prop="createDate"
                        label="日期"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="payType1"
                        label="现金"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="payType2"
                        label="POS"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="payType4"
                        label="二维码"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="payType3"
                        label="团购"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="payType5"
                        label="小程序"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="payType6"
                        label="转账"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="payCount"
                        label="当日总营业款"
                        min-width="120">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>


<script>
    import dPicker from 'vue2-datepicker'
    import store from '../common/Store.vue'
    import pos from '../common/Position.vue'
    import Paging from '../common/paging'

    export default {
        components: {
            Paging,
            dPicker,
            store,
            pos,
        },
        data() {
            return {
                showSelect:true,
                tableHeight: innerHeight - 300,
                param: {
                    storeId: this.storeId(),
                    begDate: '',
                    endDate: '',
                    empName: '',
                    jobType: "1"
                },
                storeList: [],
                showName: true,
                // storeName: this.storeName,
                storeList: [],
                objList: [],
                incomeByPayType: [],
                tableId: '1',
                objSum: [],
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
                        return time.getTime() < this.param.begDate || time.getTime() > Date.now()
                    }
                },
                accountType: this.accountType(),
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.queryObjectList(page);
            },
            conLog(item) {
                console.log(item[0])
            },
            // storeChange(param) {
            //     this.param.storeId = ''
            //     this.param.storeId = param.storeId
            // },
            tabChange(item) {
                if (item.name == 1) {
                    this.tableId = '1'
                    this.showName = true
                    this.queryObjectList()
                } else if (item.name == 2){
                    this.tableId = '2'
                    this.showName = true
                    this.queryObjectList()
                } else if (item.name == 3){
                    this.tableId = '3'
                    this.showName = false
                    this.getIncomeByPayType()
                }
            },
            exportTable() {
                if (this.tableId == '1') {
                    this.exportTableToExcel('empCon', '收入情况核算表_咨询师')
                } else if (this.tableId == '2'){
                    this.exportTableToExcel('emp', '收入情况核算表_助理')
                } else {
                    // console.log('门店'+this.storeName);
                    this.exportTableToExcel('dayMoney','收银日报表')
                }
            },
            //check the list of store
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
            queryObjectList() {
                if (!this.isBlank(this.param.begDate)) {
                    this.param.begDate = this.moment(this.param.begDate, 'YYYY-MM-DD 00:00:00')
                }
                if (!this.isBlank(this.param.endDate)) {
                    this.param.endDate = this.moment(this.param.endDate, 'YYYY-MM-DD 23:59:59')
                }
                var url = this.url + '/employeeAction/queryCouAndConIncome'
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
                        console.log('========================================res.retData===============================')
                        console.log(res.retData)
                        this.objList = res.retData
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('商铺查询请求失败')
                });
            },
            getSummaries(param) {
                const {
                    columns,
                    data
                } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (index === 9) {
                        sums[9] = (sums[8] * 100 / sums[2]).toFixed(2)
                    } else if (index === 11) {
                        sums[11] = (sums[10] * 100 / sums[2]).toFixed(2)
                    } else if (index === 13) {
                        sums[13] = (sums[12] * 100 / sums[2]).toFixed(2)
                    } else if (index === 16) {
                        sums[16] = ((sums[8] + sums[10] + sums[12]) * 100 / (sums[2] + sums[3] + sums[7])).toFixed(2)
                    } else {
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        }
                    }

                });
                console.log('======================sums===========================')
                console.log(sums)
                return sums;
            },
            getIncomeByPayType() {
                if (!this.isBlank(this.param.begDate)) {
                    this.param.begDate = this.moment(this.param.begDate, 'YYYY-MM-DD 00:00:00')
                }
                if (!this.isBlank(this.param.endDate)) {
                    this.param.endDate = this.moment(this.param.endDate, 'YYYY-MM-DD 23:59:59')
                }
                var url = this.url + '/purchasedItemsAction/incomeByPayType'
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
                        this.incomeByPayType = res.retData
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('商铺查询请求失败')
                });
            },
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            getData(item) {
                 this.showSelect = false
                if (item != '3') {
                    this.queryObjectList()
                } else {
                    this.getIncomeByPayType()
                }
            }
        },
        created() {
            this.getStore()
            this.queryObjectList()
        }
    }
</script>

<style>

    /* .el-table{
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
    .el-table::after{
        position: relative;
    } */
</style>
