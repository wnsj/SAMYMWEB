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
						<p class="end-aline col-md-11 col-lg-11" >审核日期</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-4 col-lg-4 SSwid27">
						<dPicker class="wd100" v-model="begCreateDate"></dPicker>
					</div>
					<div class="pull-left end-aline nopad">
						~
					</div>
					<div class="col-md-4 col-lg-4 SSwid27">
						<dPicker class="wd100" v-model="endCreateDate"></dPicker>
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
                        v-on:click="getRejectPage()">查询
                </button>
            </div>

        </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>


        <div class="" id="datatable" >
            <el-table  :data="tableData" border style="width: 100%" @cell-dblclick="celledit">
                <el-table-column type="index" prop="edit" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="memName" label="姓名" align="center"></el-table-column>
                <el-table-column prop="proName" label="产品名称" align="center"></el-table-column>
                <el-table-column prop="couName" label="咨询师" align="center"></el-table-column>
                <el-table-column prop="empName" label="咨询顾问" align="center"></el-table-column>
                <el-table-column prop="Accesstype" label="访问类型" align="center"></el-table-column>
                <el-table-column prop="vsName" label="咨客判定" align="center"></el-table-column>
                <el-table-column prop="csName" label="续流状态" align="center"></el-table-column>
                <el-table-column prop="price" label="购买单价（￥/次）" width="160" align="center"></el-table-column>
                <el-table-column prop="totalCount" label="购买课时（次）" width="140" align="center"></el-table-column>
                <el-table-column prop="discount" label="购买折扣（%）" width="140" align="center"></el-table-column>
                <el-table-column prop="createDate" label="购买时间" :formatter="resetDate" width="100" align="center"></el-table-column>
                <el-table-column prop="startDate" label="开始时间" :formatter="resetDate" width="100" align="center"></el-table-column>
                <el-table-column prop="endDate" label="结束时间" :formatter="resetDate" width="100" align="center"></el-table-column>
                <el-table-column prop="realCross" label="实交金额" align="center"></el-table-column>
                <el-table-column prop="psName" label="交费方式" align="center"></el-table-column>
                <el-table-column prop="operatorName" label="操作人" align="center"></el-table-column>
                <el-table-column prop="isArrears" label="是否全款" :formatter="resetArrears" align="center"></el-table-column>
                <el-table-column prop="auditStateName" label="审核状态" align="center"></el-table-column>
                <el-table-column prop="shopOwnerName" label="审核人" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.shopOwnerName !== null">{{scope.row.shopOwnerName}}</span>
                        <span v-else>{{scope.row.financeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="rejectTime" label="审核时间" :formatter="resetDate" width="100" align="center"></el-table-column>
                <el-table-column prop="rejectReason" label="备注" align="center"></el-table-column>
            </el-table>
            <div class="col-md-12 col-lg-12 tips">* 双击单行，可对当前数据进行修改</div>

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
            <div class="modal fade" id="rechargeContent">
                <div class="modal-dialog wd1000">
                    <recharge ref='recharge' @closeCurrentPage='feedBack()'></recharge>
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
    import recharge from '../../MP/SubRecharge/purchasecharge.vue'
    export default {
        components: {
          store,
          dPicker,
         recharge
        },
        data() {
            return {
                employeeList: [],
                visitorList: [],
                auditName: '',
                storeId: this.storeId(),
                accountType: this.accountType(),
                tableData: [],
                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: 0, //数据的数量
                showSelect:true,
                begCreateDate:'',
                endCreateDate: '',
            };
        },
        methods: {
            resetDate(row, column, cellValue, index){
                if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
                    return cellValue.substring(0,10)
                }
            },
            resetArrears(row, column, cellValue, index){
               return cellValue == 1 ? "是":"否"
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
            //导出
            exportTable() {
                  this.exportTableToExcel('datatable','产品购买驳回表')
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
                $("#rechargeContent").modal('hide')
           },
            // check the adding and modifying rule of account
            celledit() {
                $("#rechargeContent").modal('show')
            },
             tabChange(item) {
                this.getConsultStore()

            },
            //重置
            reset(){
                this.auditName="";
                this.begCreateDate="";
                this.endCreateDate="";
                // this.storeId=this.storeId()
            },
             editorAction(item) {
                this.objectContent = item
            },

            //check the list of department
            getRejectPage() {
                this.showSelect = false
                console.log('getRejectPage')
                if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
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
                        current: this.current,
                        pageSize: this.pageSize,
                        auditName: this.auditName,
                        storeId: this.storeId,
                        auditBegTime: this.begCreateDate,
						auditEndTime: this.endCreateDate,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size//一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        // this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.tableData = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('请求失败处理')
                });
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
            this.getRejectPage()
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
