<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨客问卷调查结果</h1>
        </div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="咨客:">
                            <el-select v-model="param.vsId" filterable clearable placeholder="请选择">
                                <el-option :key="0" label="未选择" value=0></el-option>
                                <el-option v-for="item in queVisitorList"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" class="jh-pr-28">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getAnswerByCondition"
                                   class="jh-fr">查询
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
                id="firstVd"
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
                    vsId: ''
                },
                queVisitorList: [],
                tableData: [],
                totalAmount: 0,
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
                    data: {

                    },
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
            this.getAnswerByCondition()
        }
    }
</script>

<style scoped>

</style>
