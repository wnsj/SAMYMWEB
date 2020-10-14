<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">产品购买驳回</h1>
        </div>
        <el-collapse-transition>
            <div v-show="showSelect">
                <div class="row newRow">

                    <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                            <p class="end-aline col-md-11 col-lg-11 jh-pa-1">审核人</p><span
                            class="sign-left">:</span>
                        </div>
                        <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                            <input class="form-control" type="text" v-model="auditName">
                        </div>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'">
                        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                            <p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span
                            class="sign-left">:</span>
                        </div>
                        <div class="col-xs-7 col-sm-7 col-md-7 col-lg-8=7">
                            <store ref="store" @storeChange='storeChange'></store>
                        </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="col-md-3 col-lg-3 text-right nopad SSwid20">
                            <p class="end-aline col-md-11 col-lg-11">审核日期</p><span class="sign-left">:</span>
                        </div>
                        <div class="col-md-4 col-lg-4 SSwid27">
                            <dPicker class="wd100" v-model="auditBegTime"></dPicker>
                        </div>
                        <div class="pull-left end-aline nopad">
                            ~
                        </div>
                        <div class="col-md-4 col-lg-4 SSwid27">
                            <dPicker class="wd100" v-model="auditEndTime"></dPicker>
                        </div>
                    </div>

                </div>
                <div class="row newRow">

                    <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-2"
                            data-toggle="modal"
                            v-on:click="exportTable()">导出
                    </button>
                    <button type="button" class="btn btn-info pull-right m_r_10 jh-mr-2"
                            data-toggle="modal" v-on:click="reset()">重置
                    </button>
                    <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2"
                            data-toggle="modal"
                            v-on:click="getRejectPage(1)">查询
                    </button>
                </div>

            </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>


        <div class="" id="datatable">
            <el-table :data="tableData" style="width: 100%" @cell-dblclick="celledit" border>
                <el-table-column type="index" prop="edit" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="memName" label="姓名" width="100" align="center"></el-table-column>
                <el-table-column prop="proName" label="产品名称" width="100" align="center"></el-table-column>
                <el-table-column prop="couName" label="咨询师" width="100" align="center"></el-table-column>
                <el-table-column prop="empName" label="咨询顾问" width="100" align="center"></el-table-column>
                <el-table-column prop="visitType" :formatter="visitFormat" label="访问类型" width="100"
                                 align="center"></el-table-column>
                <el-table-column prop="vsName" label="咨客判定" width="100" align="center"></el-table-column>
                <el-table-column prop="csName" label="续流状态" width="100" align="center"></el-table-column>
                <el-table-column prop="price" label="购买单价（￥/次）" width="100" align="center"></el-table-column>
                <el-table-column prop="totalCount" label="购买课时（次）" width="100" align="center"></el-table-column>
                <el-table-column prop="discount" label="购买折扣（%）" width="100" align="center"></el-table-column>
                <el-table-column prop="createDate" :formatter="dateFormat" label="购买时间" width="100"
                                 align="center"></el-table-column>
                <el-table-column prop="startDate" :formatter="dateFormat" label="开始时间" width="100"
                                 align="center"></el-table-column>
                <el-table-column prop="endDate" :formatter="dateFormat" label="结束时间" width="100"
                                 align="center"></el-table-column>
                <el-table-column prop="realCross" label="实交金额" width="100" align="center"></el-table-column>
                <!--                 <el-table-column prop="Conamount" label="消耗金额" width="100" align="center"></el-table-column>-->
                <!--                 <el-table-column prop="Conclasshours" label="消耗课时" width="100" align="center"></el-table-column>-->
                <el-table-column prop="psName" label="交费方式" width="100" align="center"></el-table-column>
                <el-table-column prop="operatorName" label="操作人" width="100" align="center"></el-table-column>
                <el-table-column prop="isArrears" :formatter="arrearsFormat" label="是否全款" width="100"
                                 align="center"></el-table-column>
                <el-table-column prop="auditStateName" label="审核状态" width="100" align="center"></el-table-column>
                <el-table-column prop="shopOwnerName" label="店长" width="100" align="center"></el-table-column>
                <el-table-column prop="financeName" label="财务" width="100" align="center"></el-table-column>
                <el-table-column prop="rejectTime" :formatter="dateFormat" label="审核时间" width="100"
                                 align="center"></el-table-column>
                <el-table-column prop="rejectReason" label="备注" width="100" align="center"></el-table-column>
            </el-table>
            <el-row class="second_interval">
                <el-col :span="24">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="current"
                        :page-sizes="[10,20,30,50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    >
                    </el-pagination>
                </el-col>
            </el-row>
        </div>

        <!-- 驳回弹窗 -->
        <div class="row row_edit">
            <div class="modal fade" id="AuditPurContent">
                <div class="modal-dialog wd1000">
                    <recharge ref='auditPur' @addFee='feedBack()'></recharge>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import store from '../../common/Store.vue'
    import dPicker from 'vue2-datepicker'
    import recharge from '../../MP/SubRecharge/purchasecharge.vue'
    import dateUtil from "../../common/utils/dateUtil";

    export default {
        components: {
            store,
            dPicker,
            recharge,
        },
        data() {
            return {
                fixedHeader: false,
                storeId: this.storeId(),
                accountType: this.accountType(),
                tableData: [],
                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: 0, //数据的数量
                showSelect: true,
                auditName: '',                             // 选填 审核人名字
                auditBegTime: '',                       // 选填 审核开始时间
                auditEndTime: '',                      //  选填 审核结束时间
                auditState: '',                              //  选填 审核状态
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.getRejectPage(page);
            },
            //门店ID
            storeChange: function (param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },

            storeChange: function (param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            dataOpen() {
                if (this.showSelect) return
                this.showSelect = true;
            },
            //导出
            exportTable() {
                this.exportTableToExcel('datatable', '产品购买审核表')
            },
            //feedback department information
            positionChange: function (param) {
                if (this.isBlank(param)) {
                    this.posId = ""
                } else {
                    this.posId = param.posId
                }
            },
            feedBack() {
                this.getRejectPage(this.current)
                $("#AuditPurContent").modal('hide')
            },
            // check the adding and modifying rule of account
            celledit(row, column, cell, event) {
                $("#AuditPurContent").modal('show')
                this.$refs.auditPur.initAuditPur(row)
            },
            tabChange(item) {
                this.getConsultStore()

            },
            //重置
            reset() {
                this.auditName = ''
                this.auditBegTime = ''
                this.auditEndTime = ''
                this.getRejectPage(1)
            },
            // 翻页
            handleCurrentChange(pageNum) {
                this.current = pageNum
                this.getRejectPage()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.current = 1
                this.pageSize = pageSize
                this.getRejectPage()
            },

            //check the list of department
            getRejectPage(page) {
                this.showSelect = false

                if (!this.isBlank(this.auditBegTime)) {
                    this.auditBegTime = this.moment(this.auditBegTime, 'YYYY-MM-DD 00:00:00.000')
                }
                if (!this.isBlank(this.auditEndTime)) {
                    this.auditEndTime = this.moment(this.auditEndTime, 'YYYY-MM-DD 23:59:00.000')
                }
                var url = this.url + '/purchasedItemsAuditBean/getRejectPage'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: this.storeId,
                        auditName: this.auditName,
                        page: this.current,
                        pageSize: this.pageSize,
                        auditEndTime: this.auditEndTime,
                        auditBegTime: this.auditBegTime,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data

                    console.log(res)
                    if (res.retCode == '0000') {
                        this.tableData = res.retData.records
                        this.total = res.retData.total
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('请求失败处理')
                });
            },
            // 格式化时间
            dateFormat: function (row, column, cellValue, index) {
                return dateUtil.getFormateDateYMD(cellValue)
            },
            arrearsFormat: function (row, column, cellValue, index) {
                var dd;
                if (cellValue == 1) {
                    dd = '是'
                } else if (cellValue == 0) {
                    dd = '否'
                } else {
                    dd = '-'
                }
                return dd;
            },
            visitFormat: function (row, column, cellValue, index) {
                var ss;
                if (cellValue == 1) {
                    ss = '初访'
                } else if (cellValue == 2) {
                    ss = '复访'
                } else {
                    ss = '-'
                }
                return ss;
            },
            handleScroll(e) {
                var self = this
                var etop = e.target.scrollTop
                var fHeaderwidth = $("#fHeader").width($(".datathead").width())
                var fHeaderheight = $("#fHeader").height($(".datathead").height())
                var theadheight = $(".datathead").height()
                var thlength = $(".datathead tr th").length
                for (var i = 0; i < thlength; i++) {
                    $("#fHeader div").eq(i).width(
                        $(".datathead tr th").eq(i).width()
                    )
                    $("#fHeader div").eq(i).height(
                        $(".datathead tr th").eq(i).height()
                    )
                }
                if (etop > 0) {
                    self.fixedHeader = true
                    $("#fHeader").css("top", etop)
                } else {
                    self.fixedHeader = false
                }
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
        },
        created() {
        }
    }
</script>

<style>
    #datatable {
        position: relative;
    }

    #fHeader {
        position: absolute;
        top: 0;
        left: 0;
        background: #eeeeee;
        overflow: hidden;
    }

    #fHeader div.text-center {
        float: left;
        display: inline-block;
        padding: 8px;
        border: 1px solid #ddd;
        font-weight: bold;
    }

    input.editradio[type='radio'] {
        width: 20px;
        height: 20px;
        opacity: 0;
    }

    label.editlabel {
        position: absolute;
        left: 13px;
        bottom: 11px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #999;
        z-index: 99;
    }

    @media print {
        #fHeader {
            display: none
        }
    }
</style>
