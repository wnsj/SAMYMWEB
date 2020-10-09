<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">退费统计</h1>
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
                        <input class="form-control" type="text" v-model="empName">
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
                 <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">审核状态</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <select name="" id="" class="form-control">
                            <option value="0">未选择</option>
                            <option value="1">通过</option>
                            <option value="2">未通过</option>
                        </select>
                    </div>
            </div>
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
            
        </div>
        </el-collapse-transition>
         <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover jh-po-re" id="datatable">
                        <thead>
                        <tr>
                            <th class="text-center">序号</th>
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
                            <th class="text-center">出访时间</th>
                            <th class="text-center">购买时间</th>
                            <th class="text-center">审核状态</th>
                            <th class="text-center">审核人</th>
                            <th class="text-center">审核时间</th>
                            <th class="text-center">备注</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th class="text-center">1</th>
                            <th class="text-center">aaa</th>
                            <th class="text-center">啊啊啊</th>
                             <th class="text-center">咨询师</th>
                            <th class="text-center">咨询助理</th>
                            <th class="text-center">产品</th>
                            <th class="text-center">实交金额</th>
                            <th class="text-center">实际剩余金额</th>
                            <th class="text-center">退费金额</th>
                            <th class="text-center">退费课时</th>
                            <th class="text-center">退费时间</th>
                            <th class="text-center">交费方式</th>
                            <th class="text-center">出访时间</th>
                            <th class="text-center">购买时间</th>
                            <th class="text-center">审核状态</th>
                            <th class="text-center">审核人</th>
                            <th class="text-center">审核时间</th>
                            <th class="text-center">备注</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
				<p class="tips">* 双击单行，可对当前数据进行修改</p>
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
  
    import {
        init
    } from '@/../static/js/common.js'
    import store from '../../common/Store.vue'
    import dPicker from 'vue2-datepicker'
    import Paging from '../../common/paging'

    export default {
        components: {
          store,
          dPicker,
          Paging,
         
        },
        data() {
            return {
                employeeList: [],
                visitorList: [],
                isuse: '1',
                empName: '',
                iphone: '',
                fixedHeader: false,
                posId: '',
                storeId: this.storeId(),
                accountType: this.accountType(),
                name:'',
                tableData: [],
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
            };
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
                  this.exportTableToExcel('datatable','产品购买审核表')
            },
            //feedback department information
            positionChange: function (param) {
                if (this.isBlank(param)) {
                    this.posId = ""
                } else {
                    this.posId = param.posId
                }
            },
           
             tabChange(item) {
                this.getConsultStore()
                
            },
            //重置
            reset(){
                this.empName="";
                this.begCreateDate="";
                this.endCreateDate="";
                
            },
             editorAction(item) {
                this.objectContent = item
            },
            
            //check the list of department
            checkEmp(page) {
                this.showSelect = false
                console.log('checkEmp')
                if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
                var url = this.url + '/employeeAction/queryEmp'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        posId: this.posId,
                        storeId: this.storeId,
                        empName: this.empName,
                        isuse: this.isuse,

                        page: page.toString(),
                        pageSize: this.pageSize,
                        actualBegDate: this.begCreateDate,
						actualEndDate: this.endCreateDate,
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
                        this.employeeList = res.retData.records
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
            //this.checkEmp(1)
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
