<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">退费驳回</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
            <div class="row newRow">
                <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">客户姓名</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="memName">
                    </div>
                </div>

                <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">审核人</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="shopowner">
                    </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="margin-top: 20px;">
					<div class="col-md-3 col-lg-3 text-right nopad SSwid20" style="width: 20%;">
						<p class="end-aline col-md-11 col-lg-11" >审核日期</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-4 col-lg-4 SSwid27" style="width: 28%;">
						<dPicker class="wd100" v-model="begCreateDate"></dPicker>
					</div>
					<div class="pull-left end-aline nopad">
						~
					</div>
					<div class="col-md-4 col-lg-4 SSwid27" style="width: 28%;">
						<dPicker class="wd100" v-model="endCreateDate"></dPicker>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'" style="margin-top: 20px;">
				       <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
				           <p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span
				           class="sign-left">:</span>
				       </div>
				       <div class="col-xs-7 col-sm-7 col-md-7 col-lg-8=7">
				           <store ref="store" @storeChange='storeChange'></store>
				       </div>
				</div>
            </div>

            <div class="row newRow">
                

                 <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="float: right;">
                    <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-2"
                            data-toggle="modal"
                            v-on:click="exportTable()">导出
                    </button>
                    <button type="button" class="btn btn-info pull-right m_r_10 jh-mr-2"
                            data-toggle="modal" v-on:click="reset()">重置
                    </button>
                    <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2"
                            data-toggle="modal"
                            v-on:click="getRefundRejectFind()">查询
                    </button>
                  </div>
            </div>

        </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>


        <div class="" id="datatable">
            <el-table  :data="tableData" style="width: 100%" @row-dblclick="selectRule" border>
                <el-table-column type="index" prop="edit" label="序号" width="60" align="center"></el-table-column>
				<el-table-column prop="memNum" label="客户序号" width="100" align="center"></el-table-column>
                <el-table-column prop="storeName" label="门店名称"  align="center"></el-table-column>
                <el-table-column prop="memName" label="退款人"  align="center"></el-table-column>
                <el-table-column prop="visitorName" label="咨询师"  align="center"></el-table-column>
                <el-table-column prop="empName" label="咨询助理"  align="center"></el-table-column>
                <el-table-column prop="proName" label="产品"  align="center"></el-table-column>
                <el-table-column prop="momey" label="退费金额"  align="center"></el-table-column>
                <el-table-column prop="refCount" label="退费课时"  align="center"></el-table-column>
                <el-table-column prop="sourceDate" label="退费时间" :formatter="resetDate"  align="center"></el-table-column>
                <el-table-column prop="Paymentmethod" label="交费方式"  align="center"></el-table-column>
                <el-table-column prop="buyTime" label="购买时间" :formatter="resetDate" align="center"></el-table-column>
                <el-table-column prop="auditState" label="审核状态" :formatter="resetAuditState" align="center"></el-table-column>
                <el-table-column prop="shopowner" label="店长" align="center"></el-table-column>
                <el-table-column prop="finance" label="财务" align="center"></el-table-column>
                <el-table-column prop="rejectTime" label="审核时间" :formatter="resetDate" align="center"></el-table-column>
                <el-table-column prop="rejectReason" label="驳回理由"  align="center"></el-table-column>
            </el-table>

            <div class="col-md-12 col-lg-12 tips">* 双击单行，可对当前数据进行修改 </div>

            <el-row class="second_interval">
                <el-col :span="24">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="current"
                        :page-sizes="[10,20,30,50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-col>
            </el-row>

        </div>

        <!-- 驳回弹窗 -->
        <div class="row row_edit">
            <div class="modal fade" id="refundContent">
                <div class="modal-dialog wd1000">
                    <refund ref='refund' @closeCurrentPage='feedBack()'></refund>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import {
        init
    } from '@/../static/js/common.js'
    import store from '../../common/Store.vue'
    import dPicker from 'vue2-datepicker'
    import rejection from '../../MP/SubRecharge/rejection.vue'
    import refund from '../../MP/SubRecharge/Refundmodiy.vue'
    export default {
        components: {
          store,
          dPicker,
          rejection,
          refund
        },
        data() {
            return {
                shopowner: '',
                memName: '',
                fixedHeader: false,
                storeId: this.storeId(),
                tableData: [],
                checkedValue:-1,

                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: 0, //数据的数量
                showSelect:true,
                begCreateDate:'',
                endCreateDate: '',
                addClass: false,
                selectDataFlag: false
            };
        },
        watch: {
            shopowner: 'changeData',
            memName: 'changeData',
            storeId: 'changeData',
            begCreateDate: 'changeData',
            endCreateDate: 'changeData'
        },

        methods: {
            changeData(newVal,oldVal){
                this.selectDataFlag = true
            },
            resetDate(row, column, cellValue, index){
                if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
                    return cellValue.substring(0,10)
                }
            },
            resetAuditState(row, column, cellValue, index){
                switch (cellValue) {
                     case 2:
                        return '未审核'
                        break;
                    case 3:
                       return '审核中'
                       break;
                    case 4:
                       return '审核通过'
                       break;
                    case 5:
                       return '审核未通过'
                       break;
                }
            },

            //门店ID
            storeChange: function (param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },

             dataOpen(){
                 if(this.showSelect) return
                 this.showSelect = true;
             },
             dataClose(){
                 this.showSelect = !this.showSelect
                 this.addClass = true;

                 setTimeout(()=>{
                     this.addClass = false;
                 },400)
             },
            //导出
            exportTable() {
                  this.exportTableToExcel('datatable','退费驳回表')
            },


           feedBack(data) {
                if (data == 'succ') {
                    this.current = 1
                    this.getRefundRejectFind()
                }
                $("#refundContent").modal('hide')
           },
            // check the adding and modifying rule of account
            selectRule(row) {
                this.$refs.refund.initData(row)
                $("#refundContent").modal('show')
            },

            //重置
            reset(){
                this.memName="";
                this.begCreateDate="";
                this.endCreateDate="";

            },

            //check the list of department
            getRefundRejectFind(page) {
                if (this.selectDataFlag){
                    this.current = 1
                }
                this.showSelect = false
                console.log('getRefundRejectFind 36699')
                if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
                var url = this.url + '/refundAuditBean/refundRejectFind'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        memName: this.memName,
                        storeId: this.storeId,
                        startTime: this.begCreateDate,
						endTime: this.endCreateDate,
                        shopowner: this.shopowner,
                        page: this.current,
                        pageSize: this.pageSize

                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.pageNum //当前页码
                        this.pageSize = res.retData.pageSize//一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        this.tableData = res.retData.list
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('请求失败处理')
                });
                this.selectDataFlag = false;
            },

            // 翻页
            handleCurrentChange(pageNum) {
                this.current = pageNum
                this.getRefundRejectFind()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.current = 1
                this.pageSize = pageSize
                this.getRefundRejectFind()
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
            init();
        },
        created() {
            this.getRefundRejectFind()
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
