<template>
    <div class="root">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 aside-logo">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 con-cen" style="height:100%;">
                <h2 class="pull-left" style="padding:10px 0; height:100%;">
                    <img style="width: 50px; height: 50px;" src="../assets/img/logo1.png"/> <strong
                    style=" display:inline-block;font-size: 35px; line-height:40px;">
                    圣安米悦</strong><br/>
                    <font style=" disply:block; font-size:26px;line-height:30px;">门 店 管 理 系 统</font>
                </h2>
            </div>
            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-right">
                <p style="color: #1b4fa3;">欢迎<span style="color: #d58512;"> {{accountName}} </span>来到，门店管理系统</p>

                <button class="btn btn-danger m_r_10" style="margin-top: 40px;" v-on:click="modPwd()">修改密码</button>
                <button class="btn btn-default m_r_10" style="margin-top: 40px;" v-on:click="loginOut()">退出</button>
            </div>
        </div>
        <div class="container-fluid clear-mp" id="Odiv">
            <div class="row clear-mp">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv" style="padding-top: 10px;">
                    <p style=" display:block; width:190px; height:50px;margin:0 auto; line-height:50px; font-size: 30px;font-weight: bold;color: #795548;text-align: left; margin-bottom:10px;">
                        功能列表</p>
                    <div id="aside-menu">
                        <dl v-bind:class="{h15:bool1}">
                            <dt @click="onShow(0)" v-bind:class="{'li-active':bool1}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool1,'fa-folder':!bool1}"
                                   aria-hidden="true">
                                    客户管理模块
                                </i>
                            </dt>
                            <!-- <dd @click="addCheck('MemberSummary')"
                                v-bind:class="{'li-active':onString=='MemberSummary'}">
                                <router-link to="/MP/MemberSummary"><i class="fa" aria-hidden="true">会员汇总</i>
                                </router-link>
                            </dd>
                            <dd @click="addCheck('Member')" v-bind:class="{'li-active':onString=='Member'}">
                                <router-link to="/MP/Member"><i class="fa" aria-hidden="true">会员管理</i></router-link>
                            </dd> -->
                            <dd @click="addCheck('Visitor')" v-bind:class="{'li-active':onString=='Visitor'}">
                                <router-link to="/MP/Visitor"><i class="fa" aria-hidden="true">客户管理</i></router-link>
                            </dd>
							<dd @click="addCheck('SettleSummary')"
							    v-bind:class="{'li-active':onString=='SettleSummary'}">
							    <router-link to="/MP/SettleSummary"><i class="fa" aria-hidden="true">消费管理</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('Charge')" v-bind:class="{'li-active':onString=='Charge'}">
							    <router-link to="/MP/Charge"><i class="fa" aria-hidden="true">已购产品管理</i></router-link>
							</dd>
							<dd @click="addCheck('Order')" v-bind:class="{'li-active':onString=='Order'}">
							    <router-link to="/MP/Order"><i class="fa" aria-hidden="true">预约管理</i></router-link>
							</dd>
							<dd @click="addCheck('CashDeposit')" v-bind:class="{'li-active':onString=='CashDeposit'}">
							    <router-link to="/MP/CashDeposit"><i class="fa" aria-hidden="true">定金管理</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('Refund')" v-bind:class="{'li-active':onString=='Refund'}">
							    <router-link to="/MP/Refund"><i class="fa" aria-hidden="true">退费管理</i>
							    </router-link>
							</dd>
                        </dl>
                        <!-- <dl v-bind:class="{h25:bool2}">
                            <dt @click="onShow(1)" v-bind:class="{'li-active':bool2}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool2,'fa-folder':!bool2}"
                                   aria-hidden="true">
                                    消费管理模块
                                </i>
                            </dt>
                            <dd @click="addCheck('ZxsSummary')" v-bind:class="{'li-active':onString=='ZxsSummary'}">
                                <router-link to="/MP/ZxsSummary"><i class="fa" aria-hidden="true">咨询师汇总</i>
                                </router-link>
                            </dd>
                        </dl> -->
                        <dl v-bind:class="{h40:bool3}">
                            <dt @click="onShow(2)" v-bind:class="{'li-active':bool3}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool3,'fa-folder':!bool3}"
                                   aria-hidden="true">
                                    基础设置
                                </i>
                            </dt>
							<dd @click="addCheck('Project')" v-bind:class="{'li-active':onString=='Project'}">
							    <router-link to="/MP/Project"><i class="fa" aria-hidden="true">产品管理</i></router-link>
							</dd>
                            <dd @click="addCheck('Employee')" v-bind:class="{'li-active':onString=='Employee'}">
                                <router-link to="/MP/Employee"><i class="fa" aria-hidden="true">员工管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('ScheduleEmp')" v-bind:class="{'li-active':onString=='ScheduleEmp'}">
                                <router-link to="/MP/ScheduleEmp"><i class="fa" aria-hidden="true">排班管理</i>
                                </router-link>
                            </dd>
                            <dd @click="addCheck('Position')" v-bind:class="{'li-active':onString=='Position'}">
                                <router-link to="/MP/Position"><i class="fa" aria-hidden="true">岗位管理</i></router-link>
                            </dd>
							<dd @click="addCheck('Occupation')" v-bind:class="{'li-active':onString=='Occupation'}">
							    <router-link to="/MP/Occupation"><i class="fa" aria-hidden="true">职业管理</i></router-link>
							</dd>
							<dd @click="addCheck('Education')" v-bind:class="{'li-active':onString=='Education'}">
							    <router-link to="/MP/Education"><i class="fa" aria-hidden="true">学历管理</i></router-link>
							</dd>
							<dd @click="addCheck('Region')" v-bind:class="{'li-active':onString=='Region'}">
							    <router-link to="/MP/Region"><i class="fa" aria-hidden="true">区域管理</i></router-link>
							</dd>
                            <dd @click="addCheck('Store')" v-bind:class="{'li-active':onString=='Store'}">
                                <router-link to="/MP/Store"><i class="fa" aria-hidden="true">门店管理</i></router-link>
                            </dd>
                            <!--                            <dd @click="addCheck('RuleManager')" v-bind:class="{'li-active':onString=='RuleManager'}">-->
                            <!--                                <router-link to="/MP/RuleManager"><i class="fa" aria-hidden="true">权限管理</i></router-link>-->
                            <!--                            </dd>-->
                            <!-- <dd @click="addCheck('Royalty')" v-bind:class="{'li-active':onString=='Royalty'}">
                                <router-link to="/MP/Royalty"><i class="fa" aria-hidden="true">提成规则管理</i></router-link>
                            </dd> -->
                            <dd @click="addCheck('VisitState')" v-bind:class="{'li-active':onString=='VisitState'}">
                                <router-link to="/MP/VisitState"><i class="fa" aria-hidden="true">状态管理</i></router-link>
                            </dd>
							<dd @click="addCheck('DiseaseType')" v-bind:class="{'li-active':onString=='DiseaseType'}">
							    <router-link to="/MP/DiseaseType"><i class="fa" aria-hidden="true">咨询方向</i></router-link>
							</dd>
                            <dd @click="addCheck('CounseRoomManage')"
                                v-bind:class="{'li-active':onString=='CounseRoomManage'}">
                                <router-link to="/MP/CounseRoomManage"><i class="fa" aria-hidden="true">咨询室管理</i>
                                </router-link>
                            </dd>

                            <dd @click="addCheck('NewRuleManager')"
                                v-bind:class="{'li-active':onString=='NewRuleManager'}">
                                <router-link to="/MP/NewRuleManager"><i class="fa" aria-hidden="true">角色管理</i>
                                </router-link>
                            </dd>
                            <dd @click="addCheck('CounseRoomTimeTotal')"
                                v-bind:class="{'li-active':onString=='CounseRoomTimeTotal'}">
                                <router-link to="/MP/CounseRoomTimeTotal"><i class="fa" aria-hidden="true">咨询室总览</i>
                                </router-link>
                            </dd>
                            <dd @click="addCheck('UmsPermissionManage')"
                                v-bind:class="{'li-active':onString=='UmsPermissionManage'}">
                                <router-link to="/MP/UmsPermissionManage"><i class="fa" aria-hidden="true">权限管理</i>
                                </router-link>
                            </dd>

                        </dl>
                        <dl v-bind:class="{h40:bool4}">
                            <dt @click="onShow(3)" v-bind:class="{'li-active':bool4}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool4,'fa-folder':!bool4}"
                                   aria-hidden="true">
                                    汇总报表
                                </i>
                            </dt>
							<dd @click="addCheck('EmpDtSummary')"
							    v-bind:class="{'li-active':onString=='EmpDtSummary'}">
							    <router-link to="/SummaryMenu/EmpDtSummary"><i class="fa" aria-hidden="true">初诊咨询方向统计表</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('ProSummary')"
							    v-bind:class="{'li-active':onString=='ProSummary'}">
							    <router-link to="/SummaryMenu/ProSummary"><i class="fa" aria-hidden="true">套餐产品消耗统计表</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('EmpConsumeSummary')"
							    v-bind:class="{'li-active':onString=='EmpConsumeSummary'}">
							    <router-link to="/SummaryMenu/EmpConsumeSummary"><i class="fa" aria-hidden="true">收入情况核算表</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('CostMoneySummary')"
							    v-bind:class="{'li-active':onString=='CostMoneySummary'}">
							    <router-link to="/SummaryMenu/CostMoneySummary"><i class="fa" aria-hidden="true">消耗金额核算表</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('VsMonthSummary')"
							    v-bind:class="{'li-active':onString=='VsMonthSummary'}">
							    <router-link to="/SummaryMenu/VsMonthSummary"><i class="fa" aria-hidden="true">月度咨客状态统计表</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('VisitorConSummary')"
							    v-bind:class="{'li-active':onString=='VisitorConSummary'}">
							    <router-link to="/SummaryMenu/VisitorConSummary"><i class="fa" aria-hidden="true">客户产品消耗统计表</i>
							    </router-link>
							</dd>
							<dd @click="addCheck('VisitorDeSummary')"
							    v-bind:class="{'li-active':onString=='VisitorDeSummary'}">
							    <router-link to="/SummaryMenu/VisitorDeSummary"><i class="fa" aria-hidden="true">访客跟踪明细表</i>
							    </router-link>
							</dd>
                            <dd @click="addCheck('FirstVdSummary')"
                                v-bind:class="{'li-active':onString=='FirstVdSummary'}">
                                <router-link to="/SummaryMenu/FirstVdSummary"><i class="fa" aria-hidden="true">初访咨询方向统计表</i>
                                </router-link>
                            </dd>

                            <dd @click="addCheck('ConsultStoreSummary')"
                                v-bind:class="{'li-active':onString=='ConsultStoreSummary'}">
                                <router-link to="/SummaryMenu/ConsultStoreSummary"><i class="fa" aria-hidden="true">咨询到店消费核算表</i>
                                </router-link>
                            </dd>


                            <!-- <dd @click="addCheck('CurrentSummary')"
                                v-bind:class="{'li-active':onString=='CurrentSummary'}">
                                <router-link to="/MP/CurrentSummary"><i class="fa" aria-hidden="true">月入汇总</i>
                                </router-link>
                            </dd> -->
                        </dl>
                        <!-- <dl v-bind:class="{h10:bool5}">
                            <dt @click="onShow(4)" v-bind:class="{'li-active':bool5}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool5,'fa-folder':!bool5}"
                                   aria-hidden="true">
                                    提成汇总
                                </i>
                            </dt>
                            <dd @click="addCheck('RoyaltySummary')"
                                v-bind:class="{'li-active':onString=='RoyaltySummary'}">
                                <router-link to="/MP/RoyaltySummary"><i class="fa" aria-hidden="true">提成汇总</i>
                                </router-link>
                            </dd>
                        </dl> -->

                        <!-- <dl>
                            <dt v-on:click="selectRule('newtree')" v-bind:class="{'li-active':onString == 'newtree'}">
                                <i class="fa fa-folder-open" aria-hidden="true">
                                    new权限
                                </i>
                            </dt>
                        </dl> -->
                    </div>
                </div>
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 embed-responsive embed-responsive-16by9"
                     style="overflow: inherit;">
                    <router-view/>
                </div>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="addFee">
                <div class="modal-dialog">
                    <SubRecharge ref="fee" @func="gainFun"></SubRecharge>
                </div>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="addRefund">
                <div class="modal-dialog">
                    <refund ref="refund"></refund>
                </div>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="addCustom">
                <div class="modal-dialog">
                    <custom ref="custom" @func2="gainFun2"></custom>
                </div>
            </div>
            <div class="modal fade" id="modifyPwd">
                <div class="modal-dialog">
                    <modPwd ref="modPwd" @certainAction="colseModPwd"></modPwd>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="module">
    import SubRecharge from '../components/MP/SubRecharge/SubRecharge.vue'
    import refund from '../components/MP/SubRecharge/Refund.vue'
    import custom from '../components/MP/SubRecharge/Custom.vue'
    import modPwd from './MP/SubPwd/ModifyPwd.vue'
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            SubRecharge,
            refund,
            custom,
            modPwd
        },
        data() {
            return {
                accountName: this.accountName(),
                itemList: [],
                bool1: true,
                bool2: false,
                bool3: false,
                bool4: false,
                bool5: false,
                onString: 'Visitor'
            }
        },
        methods: {
            chargeManager: function () {
                this.$refs.fee.initData();
                $("#addFee").modal("show");
            },
            refundAction() {
                this.$refs.refund.initData();
                $("#addRefund").modal("show");
            },
            customAction() {
                this.$refs.custom.initData();
                $("#addCustom").modal("show");
            },
            titleChange(param) {
                //console.log('param:' + param)
                this.title = param
            },
            onShow(index) {
                switch (index) {
                    case 0:
                        this.bool1 = !this.bool1;
                        this.bool2 = false;
                        this.bool3 = false;
                        this.bool4 = false;
                        this.bool5 = false;
                        break;
                    case 1:
                        this.bool1 = false;
                        this.bool2 = !this.bool2;
                        this.bool3 = false;
                        this.bool4 = false;
                        this.bool5 = false;
                        break;
                    case 2:
                        this.bool1 = false;
                        this.bool2 = false;
                        this.bool3 = !this.bool3;
                        this.bool4 = false;
                        this.bool5 = false;
                        break;
                    case 3:
                        this.bool1 = false;
                        this.bool2 = false;
                        this.bool3 = false;
                        this.bool4 = !this.bool4;
                        this.bool5 = false;
                        break;
                    case 4:
                        this.bool1 = false;
                        this.bool2 = false;
                        this.bool3 = false;
                        this.bool4 = false;
                        this.bool5 = !this.bool5;
                        break;
                }

            },
            addCheck(string) {
                this.onString = string;
                //console.log(string)
            },
            gainFun(data) {
                this.onString = data;
                this.bool2 = true;
            },
            gainFun2(data) {
                this.onString = data;
                this.bool2 = true;
            },
            //用户退出
            loginOut() {
                if (confirm("确定退出?") == false) {
                    return;
                } else {
                    //删除cookie
                    Cookies.remove("accountData");
                    Cookies.remove("accessToken");
                    Cookies.remove("empData");
                    Cookies.remove("upUriList");
                    Cookies.remove("upValueList");
                    this.$parent.setRouter("/login");
                }
            },
            modPwd() {
                var accData = this.getAccData();
                if (accData == false) {
                    alert("账户信息获取失败，请重新登录!");
                    return
                }
                $("#modifyPwd").modal('show')
                this.$refs.modPwd.initData(accData)
            },
            colseModPwd() {
                $("#modifyPwd").modal('hide')
                //删除cookie
                Cookies.remove("accountData");
                Cookies.remove("accessToken");
                Cookies.remove("empData");
                Cookies.remove("upUriList");
                Cookies.remove("upValueList");
                this.$parent.setRouter("/login");
            }
        },
        mounted() {
            init();
        },
        created() {
            this.$parent.setRouter("/MainPage");
        }
    }
</script>

<style>

    #aside-menu {
        border-top: 1px solid #ccc;
        height: 705px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    #aside-menu::-webkit-scrollbar {
        display: none;
    }

    #aside-menu dl {
        margin-bottom: 0;
        height: 50px;
        overflow: hidden;
        color: #795548;
        font-size: 20px;
        background: #f1f1f1;
        transition: height .5s
    }

    #aside-menu dl.noShow {
        color: #f2ad4e
    }

    #aside-menu dl.h10 {
        height: 150px;
    }

    #aside-menu dl.h15 {
        height: 350px;
    }

    #aside-menu dl.h25 {
        height: 300px;
    }

    #aside-menu dl.h40 {
        height: 750px;
    }

    #aside-menu dl dt {
        height: 50px;
        text-align: center;
        background: #e6e6e6;
        border-bottom: 1px solid #ccc;
    }

    #aside-menu dl dd {
        height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }

    #aside-menu dl dd:hover {
        background: #f5f5f5;
        color: #603b2c;
    }

    #aside-menu dl i {
        position: relative;
        display: inline-block;
        width: 200px;
        height: 50px;
        text-align: left;
        line-height: 50px;
    }
    #aside-menu dl dt i {
        text-indent: 25px;
    }
    #aside-menu dl dd i {
        text-indent: 10px;
    }
    #aside-menu dl i:before {
        position: absolute;
        left: -25px;
        display: block;
    }

    #aside-menu dl dd.li-active {
        background: #fff
    }

    .li-active i {
        color: #f2ad4e;
    }

    .root {
        width: 100%;
        overflow-x: hidden;
    }

    a {
        color: #795548 !important;
    }

    a:hover {
        color: #795548 !important;
    }
</style>
<host>

</host>
