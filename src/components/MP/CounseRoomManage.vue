<!-- the page of department management -->
<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨询室管理</h1>
        </div>
        <div class="row" style="margin-top: 40px;">

            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true" style=" margin-top: 15px;">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <store ref='store' @storeChange='storeChange'></store>
                </div>
            </div>

        </div>
        <div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:2.5%;"
                    data-toggle="modal"
                    @click="selectRule('1')">添加咨询室
            </button>
            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                    data-toggle="modal"
                    @click="checkOrderList(1)">查询
            </button>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable">
                        <thead class="datathead">
                        <tr>
                            <th class="text-center">咨询室</th>
                            <th class="text-center">门店</th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in orderList" :key="index">
                            <td class="text-center">{{item.memNum}}</td>
                            <td class="text-center">{{item.appName}}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-warning">修改</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--分页插件-->
                <div class="page">
                    <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                    <paging ref="paging" @change="pageChange"></paging>
                </div>
            </div>
            <div class="col-md-12 col-lg-12 posAb">
                <p class="tips">* 双击单行，可对当前数据进行修改</p>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="orderContent">
                <div class="modal-dialog">
                    <!-- <SubOrder ref='order' @addOrder='feedBack'></SubOrder> -->
                    <UpdateSubOrder ref="UpdateSubOrderRef" @addOrder='feedBack'></UpdateSubOrder>
                </div>
            </div>
            <div class="modal fade" id="addAppointContent">
                <div class="modal-dialog">
                    <AddSubOrder ref="AddSubOrderRef" @addOrder='feedBack'></AddSubOrder>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import store from '../common/Store.vue'
    import SubOrder from '../MP/SubOrder/SubOrder.vue'
    import AddSubOrder from '../MP/SubOrder/AddSubOrder.vue'
    import UpdateSubOrder from '../MP/SubOrder/UpdateSubOrder.vue'
    import emp from '@/components/common/Employee.vue'
    import dPicker from 'vue2-datepicker'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            SubOrder,
            dPicker,
            Paging,
            store,
            AddSubOrder,
            UpdateSubOrder,
            emp
        },
        data() {
            return {
                storeId: this.storeId(),
                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.checkOrderList(page);
            },
            selectRule(param, item) {
                var url = this.url + '/ruleAction/queryRule'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        posId: this.accountPosId(),
                        moduleGrade: '2',
                        urlName: '/MP/CounseRoomManage',
                        operateType: param,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        if (res.retData == '0010') {
                            if (param == 1) {
                                this.$refs.AddSubOrderRef.initData()
                                $("#addAppointContent").modal('show')
                            } else if (param == 3) {
                                this.$refs.UpdateSubOrderRef.initData(item)
                                $("#orderContent").modal('show')
                            }
                        } else {
                            alert('您没有此权限，请联系管理员！！')
                        }
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('预约相关提交请求失败')
                });
            },
            storeChange(param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            //feedback from adding and modifying view
            feedBack() {
                this.checkOrderList(1)
                $("#orderContent").modal('hide')
                $("#addAppointContent").modal('hide')
            },
            //check the list of orderContent
            checkOrderList(page) {
                var url = this.url + '/appointmentAction/queryAppointment'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: this.storeId,
                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    //console.log(JSON.stringify(res))
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size //一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.orderList = res.retData.records
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
            },
            counlorEmpChange: function (param) {
                if (this.isBlank(param)) {
                    this.empId = ""
                } else {
                    this.empId = param.empId
                }
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
            init();
        },
        created() {
            this.checkOrderList(1)
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

    @media print {
        #fHeader {
            display: none
        }
    }

    .trueDate {
        background: #6CA1BF;
        color: #fff;
    }

    .onOffState {
        background: #D9524E;
        color: #fff;
    }

    .onOffArrival {
        background: #5CB95C;
        color: #fff;
    }
</style>
