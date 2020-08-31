<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">月度咨客状态统计表</h1>
        </div>
        <el-collapse-transition>
        <div class="top" v-show="showSelect">
            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">
                <el-row style="margin-top: 2%">
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
                            <el-select @change="initPage" v-model="param.isfirst" clearable placeholder="请选择">
                                <el-option v-for="item in vsJugList"
                                           :key="item.vsId"
                                           :label="item.vsName"
                                           :value="item.vsId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="续流状态:">
                            <el-select @change="initPage" v-model="param.continueState" clearable placeholder="请选择">
                                <el-option v-for="item in continueList"
                                           :key="item.vsId"
                                           :label="item.vsName"
                                           :value="item.vsId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="门店:" v-has="'SAMY:MP:STORE'">
                            <el-select @change="initPage" v-model="param.storeId" filterable clearable placeholder="请选择">
                                <el-option :key="0" label="未选择" value=0></el-option>
                                <el-option v-for="item in storeList"
                                           :key="item.storeId"
                                           :label="item.storeName"
                                           :value="item.storeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label='咨客姓名:'>
                            <el-input @change="initPage" v-model="param.memName" placeholder="咨客姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="初访时间:">
                            <el-date-picker
                                v-model="param.firstVisitStartTime"
                                :picker-options="pickerOptions0"
                                type="date"
                                @change="initPage"
                                placeholder="开始时间"
                                class="jh-fl wd285">
                            </el-date-picker>
                            <span class="jh-fl" style="margin-right: 2%"> - </span>
                            <el-date-picker
                                v-model="param.firstVisitEndTime"
                                :picker-options="pickerOptions1"
                                type="date"
                                @change="initPage"
                                placeholder="结束时间"
                                class="jh-fl wd285">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3"  class="jh-pr-28">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getMonthVsState"
                                   class="jh-fr">查询
                        </el-button>
                    </el-col>
                    <el-col :span="3" class="jh-pr-28">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="exportTableToExcel('vsMonth','月度咨客状态统计表')"
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
        <div>
            <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                max-height="530"
                id="vsMonth"
                show-summary
                sortable
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
                    prop="reMoney"
                    label="退款金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="visitType"
                    label="来访类型"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="visitState"
                    label="客户判定"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="continState"
                    label="续流状态"
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
                showSelect:true,
                param: {
                    current: 1,
                    pageSize: 10,
                    storeId: this.storeId(),
                    firstVisitStartTime: '',
                    firstVisitEndTime: '',
                    memName: '',
                    isfirst: '',
                    visitType: '',
                    continueState: ''
                },
                list: [{id: 1, name: "初访"}, {id: 2, name: "复访"}],
                storeList: [],
                tableData: [],
                vsJugList: [],
                continueList:[],
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


            //vsType:1初访，2复访；stateType：1客户判定，2续流状态
            getObj(vsType) {
                this.initPage()
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
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            // 获取初访咨询方向汇总数据
            async getMonthVsState() {
                this.showSelect = false
                var url = this.url + '/purchasedItemsAction/getMonthVsState'
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
                        if (res.retData) {
                            this.tableData = res.retData.records
                            this.totalAmount = res.retData.total
                        } else {
                            this.tableData = []
                            this.totalAmount = 0
                        }

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
                this.getMonthVsState()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.param.current = 1
                this.param.pageSize = pageSize
                this.getMonthVsState()
            },
            initPage() {
                this.param.current = 1
            },
        },
        created() {
            this.getStore()
            this.getObj()
            //this.getMonthVsState()
        }
    }
</script>

<style scoped>

</style>
