<template>
    <div>
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
                    <el-col :span="10">
                        <el-form-item label="时间">
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
                    <el-col :span="6" :offset="2">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getDiseaseType">查询
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>



        </div>

        <div>
            <el-table
                :data="tableData"
                :cell-style="cellStyle"
                max-height="530"
                :header-cell-style="headerStyle"
                style="width: 95%;margin-left: 3%;margin-top: 20px"
                border>
                <el-table-column
                    align="center"
                    prop="diseaseType"
                    label="咨询方向"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="peopleNum"
                    label="人数"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="peopleTotal"
                    label="总人数"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="ratio"
                    label="占比"
                    min-width="100">
                </el-table-column>
            </el-table>
<!--            <el-row class="second_interval">-->
<!--                <el-col :span="24">-->
<!--                    <el-pagination-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        @size-change="handleSizeChange"-->
<!--                        :current-page="param.current"-->
<!--                        :page-sizes="[10,20,30,50]"-->
<!--                        :page-size="param.pageSize"-->
<!--                        layout="total, sizes, prev, pager, next, jumper"-->
<!--                        :total="totalAmount"-->
<!--                    >-->
<!--                    </el-pagination>-->
<!--                </el-col>-->
<!--            </el-row>-->
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                param: {
                    // current: 1,
                    // pageSize: 10,
                    storeId: '',
                    firstVisitStartTime: '',
                    firstVisitEndTime: ''
                },
                storeList: [],
                tableData: [],
                // totalAmount: 0,
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
            headerStyle () {
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
                        if (res.retData.length > 0) {
                            this.storeList = res.retData
                        }
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            // 获取初访咨询方向汇总数据
            async getDiseaseType() {
                var url = this.url + '/consumAction/getDiseaseType'
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
            this.getStore()
            this.getDiseaseType()
        }
    }
</script>

<style scoped>

</style>
