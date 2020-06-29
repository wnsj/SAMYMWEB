<template>
    <div>
        <div class="top">
            <el-form label-position="right" label-width="100px" :inline="true" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="11" :pull="1">
                        <el-form-item label="初访时间">
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
                    <el-col :span="5">
                        <el-form-item label='咨客姓名:'>
                            <el-input v-model="param.memName" placeholder="咨客姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="11" :pull="1">
                        <el-form-item label="到访时间">
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

                    <el-col :span="8" :push="5">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="getVsConsume">查询
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div>
            <el-table
                :data="monthStatic"
                :span-method="objectSpanMethod"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                height="530"
                style="width: 99%;margin-left:0.5%;margin-top: 20px"
                border>
                <el-table-column
                    align="center"
                    prop="orderNum"
                    label="RR"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="type"
                    label="DD"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="genre"
                    label="KK"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="injuries"
                    label="HH"
                    min-width="100">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="memName"-->
                <!--                    label="客户姓名"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="firstDate"-->
                <!--                    label="初访时间"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="proName"-->
                <!--                    label="产品名称"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="counselorName"-->
                <!--                    label="咨询师"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="empName"-->
                <!--                    label="咨询助理"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="actualCount"-->
                <!--                    label="签约时长"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="realCross"-->
                <!--                    label="签约金额"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="conTime"-->
                <!--                    label="消耗时长"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="conMoney"-->
                <!--                    label="消耗金额"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="reTime"-->
                <!--                    label="退款时长"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="reMoney"-->
                <!--                    label="退款金额"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="surTime"-->
                <!--                    label="剩余时长"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="surMoney"-->
                <!--                    label="剩余金额"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="createDate"-->
                <!--                    label="购买时间"-->
                <!--                    :formatter="dateFormat"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                    align="center"-->
                <!--                    prop="endDate"-->
                <!--                    :formatter="dateFormat"-->
                <!--                    label="到期时间"-->
                <!--                    min-width="100">-->
                <!--                </el-table-column>-->
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
                    storeId: '',
                    firstVisitStartTime: '',
                    firstVisitEndTime: '',
                    secondVisitStartTime: '',
                    secondVisitEndTime: '',
                    memName: '',
                },
                storeList: [],
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
                monthStatic: [
                    {
                        orderNum: '1',
                        type: '事故灾难',
                        genre: '工业制造事故',
                        content: '12月1日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '2',
                        type: '事故灾难',
                        genre: '工业制造事故',
                        content: '12月2日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '3',
                        type: '事故灾难',
                        genre: '建筑施工事故',
                        content: '12月3日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '4',
                        type: '事故灾难',
                        genre: '建筑施工事故',
                        content: '12月4日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '5',
                        type: '事故灾难',
                        genre: '建筑施工事故',
                        content: '12月5日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '6',
                        type: '自然灾害',
                        genre: '森林火灾',
                        content: '12月6日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '7',
                        type: '自然灾害',
                        genre: '森林火灾',
                        content: '12月7日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '8',
                        type: '自然灾害',
                        genre: '森林火灾',
                        content: '12月7日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '9',
                        type: '自然灾害',
                        genre: '台风灾害',
                        content: '12月7日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人',
                        department: '南昌市应急局'
                    },
                    {
                        orderNum: '10',
                        type: '其他突发事件',
                        genre: '触电',
                        content: '12月8日中午12时30分许，南昌市进贤县江西松鹤医疗器械有限公司发生一起高处坠落事故，造成1人死亡。事故简单经过：该公司进行吊装作业时使用吊车（外租）吊生产设备至三楼，作业现场三楼窗户及以下墙体已拆除，剩余墙体离三楼地面只有20厘米左右，当吊车将设备吊到三楼窗口时，工人则用绳索将设备往里面拉，一名拉绳索人员（刘斌贤、男、身份证号码：36012419510401031x、进贤县李渡镇鉴良村委会池门口村人）不慎从三楼坠落，当场死亡。',
                        injuries: '死亡1人 受伤1人',
                        department: '南昌市应急局'
                    },
                ],
                spanArr: [],
                pos: 0
            };
        },
        methods: {
// 判断合并行 data传的是上面的数组
            getSpanArr(data) {
                let that = this
//页面展示的数据，不一定是全部的数据，所以每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
                that.spanArr = []
                that.pos = 0
//遍历数据
                data.forEach((item, index) => {
                    //判断是否是第一项
                    if (index === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                    } else {
                        //不是第一项时，就根据标识去存储
                        if (data[index].type === data[index - 1].type) {
                            // 查找到符合条件的数据时每次要把之前存储的数据+1
                            this.spanArr[this.pos] += 1
                            this.spanArr.push(0)
                        } else {
                            // 没有符合的数据时，要记住当前的index
                            this.spanArr.push(1)
                            this.pos = index
                        }
                    }
                })
                console.log(this.spanArr, this.pos)
            },
            // 表格合并
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                // 判断合并列 也就是上面表格的类型
                if (columnIndex === 1) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    };
                } else {
                    return false
                }

            },
            // 表格表头样式
            headerStyle() {
                return 'text-align: center;color: black;'
            },
            // 表格行样式
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
                this.param.pageSize = pageSize
                this.getVsConsume()
            },
        },
        created() {
            this.getStore()
            this.getVsConsume()
            this.getSpanArr(this.monthStatic)
        }
    }
</script>

<style scoped>

</style>
