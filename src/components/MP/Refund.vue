<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">退费明细</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
        <div class="row newRow">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'">
                <div class="col-md-5 col-lg-5 text-right nopad">
                    <p class="end-aline col-md-11 col-lg-11">门店</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <store ref='store' @storeChange='storeChange'></store>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right nopad">
                    <p class="end-aline col-md-11 col-lg-11">姓名</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="visitorName">
                </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="col-md-3 col-lg-3 text-right jh-ad-1 wd205">
                    <p class="end-aline col-md-11 col-lg-11">日期范围</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-8 col-lg-8">
                    <dPicker class="wd100" v-model="dateArr" type="format" format="YYYY-MM-DD" range>
                        <template v-slot:header="{ emit }">
                            <div class="text-left"></div>
                        </template>
                    </dPicker>
                </div>
            </div>
        </div>
        <div class="row newRow">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                    <p class="end-aline col-md-11 col-lg-11 jh-pa-1">咨询师</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <select class="form-control" v-model="couId">
                        <option value="">--未选择--</option>
                        <option v-for="(item,index) in couList" :key="index" v-bind:value="item.empId">
                            {{item.empName}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                    <p class="end-aline col-md-11 col-lg-11 jh-pa-1">咨询顾问</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <select class="form-control" v-model="conId">
                        <option value="">--未选择--</option>
                        <option v-for="(item,index) in empList" :key="index" v-bind:value="item.empId">
                            {{item.empName}}
                        </option>
                    </select>
                </div>
            </div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
			        <p class="end-aline col-md-11 col-lg-11" >交费方式</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <PayStyle ref="payStyleRef" @payStyleChange="psStyle"></PayStyle>
			    </div>
			</div>
            <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-30"
                    data-toggle="modal"
                    v-on:click="queryObjectList(1)">查询
            </button>
        </div>
        </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="datatable">

                        <thead class="datathead">
                        <tr>
                            <th class="text-center">门店名称</th>
                            <th class="text-center">退款人</th>
                            <th class="text-center">咨询师</th>
                            <th class="text-center">咨询助理</th>
                            <th class="text-center">产品</th>
							<th class="text-center">实交金额</th>
                            <th class="text-center">实际剩余金额</th>
                            <th class="text-center">退费金额</th>
                            <th class="text-center">退费课时</th>
                            <th class="text-center">退费时间</th>
							<th class="text-center">交费方式</th>
							<th class="text-center">初访时间</th>
							<th class="text-center">购买时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in objList" :key="index">
                            <td class="text-center">{{item.storeName}}</td>
                            <td class="text-center">{{item.visitorName}}</td>
                            <td class="text-center">{{item.proEmpName}}</td>
                            <td class="text-center">{{item.empName}}</td>
                            <td class="text-center">{{item.proName}}</td>
							<td class="text-center">{{item.momey}}</td>
                            <td class="text-center">{{item.balance}}</td>
                            <td class="text-center">{{item.realRefund}}</td>
                            <td class="text-center">{{item.refCount}}</td>
                            <td class="text-center">{{item.createDate | dateFormatFilter('YYYY-MM-DD')}}</td>
							<td class="text-center">{{item.psName}}</td>
							<td class="text-center">{{item.visCreateDate | dateFormatFilter('YYYY-MM-DD')}}</td>
							<td class="text-center">{{item.piCreateDate | dateFormatFilter('YYYY-MM-DD')}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p class="tips" v-if="tipsFlag">* 有数据未完成审核流程，请尽快完成审核。避免影响汇总数据</p>
                <!--分页插件-->
                <div class="page">
                    <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                    <paging ref="paging" @change="pageChange"></paging>
                </div>
            </div>
        </div>

    </div>

</template>


<script>


    import dPicker from 'vue2-datepicker'
    import store from '../common/Store.vue'
    import Paging from '../common/paging'
    import cou from '../common/Employee.vue' //咨询师
    import con from '../common/Employee.vue'	//咨询顾问
    import {
        init
    } from '@/../static/js/common.js'
    import PayStyle from '../common/PayStyle.vue'
    export default {
        components: {
            Paging,
            dPicker,
            store,
            con,
            cou,
            PayStyle
        },
        data() {
            return {
                objList: [],
                fixedHeader: false,
                visitorName: '',
                dateArr: '',
                begDate: '',
                endDate: '',
                couId: '',
                conId: '',
                storeId: this.storeId(),
                accountType: this.accountType(),
                showSelect:true,
                empList: [],
                couList: [],

                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
				payType:'',
                addClass: false,
                tipsFlag: false
            };
        },
        watch:{
             '$store.getters.getAuditStatus'(val, oldVal){  //监听store
                 if (val == '1') {
                     this.tipsFlag = false
                 } else {
                     this.tipsFlag = true
                 }
             }
         },
        methods: {
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
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.queryObjectList(page);
            },

            storeChange(param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            psStyle(data) {
                this.payType = ''
                if (data != null) {
                    this.payType = data
                }
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

            //check the list of store
            queryObjectList(page) {
                this.showSelect = false
                if (this.dateArr.length > 0 && !this.isBlank(this.dateArr[0]) && !this.isBlank(this.dateArr[1])) {
                    this.begDate = this.moment(this.dateArr[0], 'YYYY-MM-DD 00:00:00')
                    this.endDate = this.moment(this.dateArr[1], 'YYYY-MM-DD 23:59:59')
                } else {
                    this.begDate = ''
                    this.endDate = ''
                }
                var url = this.url + '/refundAction/queryRefund'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: this.storeId,
                        counselor: this.couId,
                        empId: this.conId,
                        visitorName: this.visitorName,
                        begDate: this.begDate,
                        endDate: this.endDate,
						payType:this.payType=='0' ? '' : this.payType,

                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size//一页显示的数量
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.objList = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('商铺查询请求失败')
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
            this.getCou()
            this.getEmp()
            window.addEventListener('scroll', this.handleScroll, true);
            init();
        },
        created() {
            if (this.$store.state.allAuditStatus == '1') {
                this.tipsFlag = false
            } else {
                this.tipsFlag = true
            }
        }
    }
</script>

<style>
    #datatable {
        store: relative;
    }

    #fHeader {
        store: absolute;
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

    @media print {
        #fHeader {
            display: none
        }
    }
</style>
