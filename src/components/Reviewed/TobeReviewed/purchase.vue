<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">产品购买审核</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect" class="selectBox">
            <div class="row newRow">

                <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">姓名</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="memName">
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
						<p class="end-aline col-md-11 col-lg-11" >产品购买日期</p><span class="sign-left">:</span>
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


        </div>
        </el-collapse-transition>

        <div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>

        <div class="row newRow">
            <button type="button" class="btn btn-success pull-left m_r_10 jh-mr-2" data-toggle="modal" style="margin-left:2.5%" v-on:click="btnAction('1')">通过
            </button>
            <button type="button" class="btn btn-danger pull-left m_r_10" data-toggle="modal" v-on:click="btnAction('2')"> 驳回
            </button>
            
            <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-2"
                    data-toggle="modal"
                    v-on:click="exportTable()">导出
            </button>
            <button type="button" class="btn btn-info pull-right m_r_10 jh-mr-2"
                    data-toggle="modal" v-on:click="reset()">重置
            </button>
            <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2"
                    data-toggle="modal"
                    v-on:click="checkEmp(1)">查询
            </button>
        </div>

        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover jh-po-re" id="datatable">
                        <thead>
                            <tr>
                                <th class="text-center">编辑</th>
                                <th class="text-center">姓名</th>
                                <th class="text-center">产品名称</th>
                                <th class="text-center">咨询师</th>
                                <th class="text-center">咨询顾问</th>
                                <th class="text-center">访问类型</th>
                                <th class="text-center">咨客判定</th>
                                <th class="text-center">续流状态</th>
                                <th class="text-center">购买单价(¥/次)</th>
                                <th class="text-center">购买课时(次)</th>
                                <th class="text-center">购买折扣(%)</th>
                                <th class="text-center">购买时间</th>
<!--                                <th class="text-center">开始时间</th>-->
<!--                                <th class="text-center">结束时间</th>-->
                                <th class="text-center">实交金额</th>
                                <th class="text-center">交费方式</th>
                                <th class="text-center">操作人</th>
                                <th class="text-center">是否全款</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in productAuditList" :key="index">
                                <!-- <td class="text-center editradio-box">
                                    <input :id="'edit'" class="editradio" type="radio" name="单选框" :value="1" v-model="checkedValue" />
                                    <label  class="editlabel" :for="'edit'"></label>
                                </td> -->
                                <td class="text-center editradio-box">
                                    <input :id="'edit'+(index+1)" class="editradio" type="radio" name="复选框" :value="index"
                                           v-model="checkedValue"/>
                                    <label :for="'edit'+(index+1)" class="editlabel"></label>

                                </td>
                                <td class="text-center">{{item.memName}}</td>
                                <td class="text-center">{{item.proName}}</td>
                                <td class="text-center">{{item.couName}}</td>
                                <td class="text-center">{{item.empName}}</td>
                                <td class="text-center">{{item.visitType | formatVisit}}</td>
                                <td class="text-center">{{item.vsName}}</td>
                                <td class="text-center">{{item.csName}}</td>
                                <td class="text-center">{{item.price}}</td>
                                <td class="text-center">{{item.totalCount}}</td>
                                <td class="text-center">{{item.discount}}</td>
                                <td class="text-center">{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
<!--                                <td class="text-center">{{item.startDate | dateFormatFilter("YYYY-MM-DD")}}</td>-->
<!--                                <td class="text-center">{{item.endDate | dateFormatFilter("YYYY-MM-DD")}}</td>-->
                                <td class="text-center">{{item.realCross}}</td>
                                <td class="text-center">{{item.psName}}</td>
                                <td class="text-center">{{item.operatorName}}</td>
                                <td class="text-center">{{item.isArrears | formatIsArrears}}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>
				<!-- <p class="tips">* 双击单行，可对当前数据进行修改</p> -->
                <!--分页插件-->
                <div class="page">
                    <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                    <paging ref="paging" @change="pageChange"></paging>
                </div>
            </div>
        </div>

        <!-- 驳回弹窗 -->
        <div class="row row_edit">
            <div class="modal fade" id="rejectionContent">
                <div class="modal-dialog wd600">
                    <rejection ref='rejection' @closeCurrentPage='feedBack()'></rejection>
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
    import Paging from '../../common/paging'
    import rejection from '../../MP/SubRecharge/rejection.vue'
    export default {
        components: {
          store,
          dPicker,
          Paging,
          rejection,
        },
        data() {
            return {
                employeeList: [],
                productAuditList: [],
                empName: '',
                iphone: '',
                fixedHeader: false,
                posId: '',
                storeId: this.storeId(),
                accountType: this.accountType(),
                memName:'',
                checkedValue:-1,
                objectContent: {},
                //分页需要的数据
                pages: '', //总页数
                current: '1', //当前页码
                pageSize: '10', //一页显示的数量
                total: '', //数据的数量
                showSelect:true,
                begCreateDate:'',
                endCreateDate: '',
                operatorId: this.accountId(),
                addClass: false

            };
        },
        filters: {
        	formatVisit(val) {
                return val == 1 ? "初访":"复访"
        	},
            formatIsArrears(val) {
                return val == 1 ? "是":"否"
            }
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.checkEmp(page);
            },
            //门店ID
            storeChange: function (param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            
            //modify the cotent of department
            dataClose(){
                this.showSelect = !this.showSelect
                this.addClass = true;

                setTimeout(()=>{
                    this.addClass = false;
                },400)
                // var _this = this;
                // setTimeout(function(){
                //     _this.addClass = false;
                // },400)
            },
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },


            addEmp() {
                console.log('modify the cotent of department')
                this.$refs.emp.initData('add')
                $("#emp").modal('show')
            },
            //modify the cotent of department
            modifyEmp(item) {
                console.log('modify the cotent of department')
                this.$refs.emp.initData('modify', item)
                $("#emp").modal('show')
            },



            //导出
            exportTable() {
                  this.exportTableToExcel('datatable','消费审核表')
            },
            //feedback department information
            positionChange: function (param) {
                if (this.isBlank(param)) {
                    this.posId = ""
                } else {
                    this.posId = param.posId
                }
            },
            //feedback from adding and modifying view
            feedBack() {
                this.checkEmp(1)
                $("#rejectionContent").modal('hide')
            },
           
            //重置
            reset(){
                this.memName="";
                this.begCreateDate="";
                this.endCreateDate="";
                // this.storeId=this.storeId()
            },
             editorAction(item) {
                this.objectContent = item
            },
            btnAction(index) {

                if (this.checkedValue > -1) {
                    this.objectContent = this.productAuditList[this.checkedValue]
                } else {
                    // alert("请选择咨客后再操作!");
                    this.$alert('请选择咨客后再操作', '提示', {
                      confirmButtonText: '确定',
                      type: 'warning',
                      callback: action => {
                        
                      }
                    });
                    return
                }
                switch (index) {
                    //通过
                     case '1':
                        //console.log(this.objectContent)
                        this.productApproval();
                        
                        break;
                    //驳回
                    case '2':
                        // this.$refs.rejection.initData(this.objectContent.piId, this.objectContent.operatorId)
                        this.$refs.rejection.initData('product', this.objectContent)
                        $("#rejectionContent").modal('show');
                        
                        break;
                };
                
            },
           
            productApproval(){
                var url = this.url + '/purchasedItemsAuditBean/adopt'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        piId: this.objectContent.piId,					//必填 账目id
                        operatorId: this.operatorId			//必填 操作人（数据录入人，店长，财务，补录人）
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {

                        this.$alert(res.retMsg, '提示', {
                          confirmButtonText: '确定',
                          type: 'success',
                          callback: action => {
                              this.checkEmp(1);
                          }
                        })

                    } else {

                        //alert(res.retMsg)
                        this.$alert(res.retMsg, '提示', {
                          confirmButtonText: '确定',
                          type: 'error',
                          callback: action => {}
                        })

                    }

                }).catch((error) => {
                    console.log('请求失败处理')
                });
                
                
            },


            //check the list of department
            checkEmp(page) {
                this.showSelect = false
                // this.dataClose()

                console.log('checkEmp')
                if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
                var url = this.url + '/purchasedItemsAuditBean/getAuditPage'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        current: page.toString(),
                        pageSize: this.pageSize,
                        operatorId: this.operatorId,
                        memName: this.memName,
                        storeId: this.storeId,
                        begTime: this.begCreateDate,
						endTime: this.endCreateDate
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
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.productAuditList = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('请求失败处理')
                });
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
            this.checkEmp(1);
            
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
    #newsnumber{padding:0 5px; background-color: red; color: #fff; border-radius: 50%; margin-left: -15px;margin-top: -10px;}
</style>
