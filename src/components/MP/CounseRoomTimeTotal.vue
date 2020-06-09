<!-- the page of department management -->
<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨询室总览</h1>
        </div>
        <div class="row" style="margin-top: 40px;padding-bottom:1.5%;">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style=" margin-top: 15px;">
                <div class="col-md-3 col-lg-3 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">时间</p>
                    <span class="sign-left">:</span>
                </div>
                <div class="col-md-6 col-lg-6">
                    <dPicker type="date" value-type="format" format="YYYY-MM-DD" v-model="appDate"></dPicker>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style=" margin-top: 15px;" v-show="retActType">
                <div class="col-md-3 col-lg-3 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p>
                    <span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <store ref='store' @storeChange='storeChange'></store>
                </div>
            </div>
      
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
                            <th class="text-center" id="lineTd">
                                <span style="float:left;margin-top:22px;">咨询室</span>
                                <span style="float:right;margin-top:0;">时间</span>
                            </th>
                            <th class="text-center" v-for="(item,index) in timeArr" :key="index">
                                {{timeArr[index]}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in orderList" :key="index">
                            <td class="text-center">{{item.crName}}</td>
                            <td class="text-center" v-for="(itm,inx) in timeArr" :key="inx">
                                <span>{{prtData(1,item,inx)}}</span>
                                <span>{{prtData(2,item,inx)}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--分页插件-->
                <div class="page">
                    <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                    <!--                    <paging ref="paging" @change="pageChange"></paging>-->
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import store from '../common/Store.vue'
    import emp from '@/components/common/Employee.vue'
    import addCounseRoom from '../MP/SubCounseRoom/addCounseRoom'
    import updateCounseRoom from '../MP/SubCounseRoom/updateCounseRoom'
    import dPicker from 'vue2-datepicker'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            dPicker,
            Paging,
            store,
            emp,
            addCounseRoom,
            updateCounseRoom
        },
        data() {
            return {
                stId: '',
                orderList: [],
                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
                appDate: this.moment('', 'YYYY-MM-DD'),
                timeArr: [
                    '08:00-08:30',
                    '08:30-09:00',
                    '09:00-09:30',
                    '09:30-10:00',
                    '10:00-10:30',
                    '10:30-11:00',
                    '11:00-11:30',
                    '11:30-12:00',
                    '13:00-13:30',
                    '13:30-14:00',
                    '14:00-14:30',
                    '14:30-15:00',
                    '15:00-15:30',
                    '15:30-16:00',
                    '16:00-16:30',
                    '16:30-17:00',
                    '17:00-17:30',
                    '17:30-18:00',
                    '18:00-18:30',
                    '18:30-19:00',
                    '19:00-19:30',
                    '19:30-20:00',
                ]
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
                        res.retData = '0010'
                        if (res.retData == '0010') {
                            if (param == 1) {
                                this.$refs.addCounseRoomRef.initData()
                                $("#addCounseRoomContent").modal('show')
                            } else if (param == 3) {
                                this.$refs.updateCounseRoomRef.initData(item)
                                $("#updateCounseRoomContent").modal('show')
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
                    this.stId = ""
                } else {
                    this.stId = param.storeId
                }
            },
            //check the list of orderContent
            checkOrderList(page) {
                var sId = ''
                if (this.accountType() == false) {
                    sId = this.storeId()
                } else {
                    sId = this.stId
                }
                if (this.isBlank(this.appDate)) {
                    alert("时间不能为空!")
                    return
                }
                var url = this.url + '/appointmentAction/queryConsRoomTotal'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: sId,
                        appDate: this.appDate,
                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    //console.log(JSON.stringify(res))
                    if (res.retCode == '0000') {
                        // this.pages = res.retData.pages //总页数
                        // this.current = res.retData.current //当前页码
                        // this.pageSize = res.retData.size //一页显示的数量  必须是奇数
                        // this.total = res.retData.total //数据的数量
                        // this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.orderList = res.retData
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
            retActType() {
                return this.accountType();
            },
            prtData(flag, item, index) {
                if (flag == 1) {
                    let appParam = 'appName'.concat(index + 1);
                    return item[appParam];
                } else {
                    let empParam = 'empName'.concat(index + 1);
                    return item[empParam];
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

    #lineTd {
        background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=) no-repeat 100% center;
        width: 85px!important;
        height: 55px;
        display: inline-block;
        border: none;
    }
</style>
