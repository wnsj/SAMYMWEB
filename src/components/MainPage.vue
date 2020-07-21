<template>
    <div class="root">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 aside-logo">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 con-cen" style="height:100%;">
                <h2 class="pull-left" style="padding-top:3px; height:100%;">
                    <img style="width: 50px; height: 50px;display: block;float: left;" src="../assets/img/logo1.png"/>
                    <div style="float: left;margin-left: 10px;">
                        <strong  style=" display:block;font-size: 24px; line-height:26px;">圣安米悦</strong>
                        <p style="font-size:16px;line-height:16px;margin-top: 5px;">门 店 管 理 系 统</p>
                    </div>

                </h2>
            </div>
            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-right">
                <p style="color: #1b4fa3;">欢迎<span style="color: #d58512;"> {{accountName}} </span>来到，门店管理系统</p>

                <button class="btn btn-danger m_r_10" style="margin-top:5px;" v-on:click="modPwd()">修改密码</button>
                <button class="btn btn-default m_r_10" style="margin-top:5px;" v-on:click="loginOut()">退出</button>
            </div>
        </div>
        <div class="container-fluid clear-mp" id="Odiv">
            <div class="row clear-mp">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv" >
                    <!-- <p style=" width:100%; height:50px; line-height:50px; font-size: 30px;font-weight: bold;color: #795548;text-align: left;box-sizing: border-box; padding-left:50px;">
                        功能列表</p> -->
                    <div id="aside-menu">
                        <el-row>
                            <el-col :span="24">
                            <el-menu
                                  default-active="2"
                                  class="el-menu-vertical-demo"
                                  @open="handleOpen"
                                  @close="handleClose"
                                  background-color="rgb(230, 230, 230)"
                                  text-color="#333"
                                  active-text-color="#ffd04b">
                                  <el-submenu index="1">
                                    <template slot="title">
                                      <i class="el-icon-folder-add"></i>
                                      <span>客户管理</span>
                                    </template>
                                      <el-menu-item index="1-1"><router-link to="/MP/Visitor">客户管理</router-link></el-menu-item>
                                  </el-submenu>

                                  <el-submenu index="2">
                                    <template slot="title">
                                      <i class="el-icon-folder-add"></i>
                                      <span>订单管理</span>
                                    </template>
                                      <el-menu-item index="2-1"><router-link to="/MP/SettleSummary">消费管理</router-link></el-menu-item>
                                      <el-menu-item index="2-2"><router-link to="/MP/Charge">已购产品管理</router-link></el-menu-item>
                                      <el-menu-item index="2-3"><router-link to="/MP/Order">预约管理</router-link></el-menu-item>
                                      <el-menu-item index="2-4"><router-link to="/MP/CashDeposit">定金管理</router-link></el-menu-item>
                                      <el-menu-item index="2-5"><router-link to="/MP/Refund">退费管理</router-link></el-menu-item>
                                      <el-menu-item index="2-6"><router-link to="/MP/Income">收入记录明细</router-link></el-menu-item>
                                  </el-submenu>

                                  <el-submenu index="3">
                                    <template slot="title">
                                      <i class="el-icon-folder-add"></i>
                                      <span>门店管理</span>
                                    </template>
                                      <el-menu-item index="3-1"><router-link to="/MP/Employee">员工管理</router-link></el-menu-item>
                                      <el-menu-item index="3-2"><router-link to="/MP/Position">岗位管理</router-link></el-menu-item>
                                      <el-menu-item index="3-3"><router-link to="/MP/ScheduleEmp">排班管理</router-link></el-menu-item>
                                      <el-menu-item index="3-4"><router-link to="/MP/Project">产品管理</router-link></el-menu-item>
                                      <el-menu-item index="3-5"><router-link to="/MP/CounseRoomManage">咨询室管理</router-link></el-menu-item>
                                      <el-menu-item index="3-6"><router-link to="/MP/CounseRoomTimeTotal">咨询室总览</router-link></el-menu-item>
                                  </el-submenu>

                                  <el-submenu index="4">
                                    <template slot="title">
                                      <i class="el-icon-folder-add"></i>
                                      <span>基础设置</span>
                                    </template>
                                      <el-menu-item index="4-1"><router-link to="/MP/Occupation">职业管理</router-link></el-menu-item>
                                      <el-menu-item index="4-2"><router-link to="/MP/Education">学历管理</router-link></el-menu-item>
                                      <el-menu-item index="4-3"><router-link to="/MP/Region">区域管理</router-link></el-menu-item>
                                      <el-menu-item index="4-4"><router-link to="/MP/VisitState">状态管理</router-link></el-menu-item>
                                      <el-menu-item index="4-5"><router-link to="/MP/DiseaseType">咨询方向</router-link></el-menu-item>
                                  </el-submenu>

                                  <el-submenu index="5">
                                    <template slot="title">
                                      <i class="el-icon-folder-add"></i>
                                      <span>权限管理</span>
                                    </template>
                                      <el-menu-item index="5-1"><router-link to="/MP/NewRuleManager">角色设置</router-link></el-menu-item>
                                      <el-menu-item index="5-2"><router-link to="/MP/UmsPermissionManage">权限设置</router-link></el-menu-item>
                                  </el-submenu>


                                  <el-submenu index="6" class="menu-item-pd">
                                    <template slot="title">
                                      <i class="el-icon-folder-add"></i>
                                      <span>报表管理</span>
                                    </template>
                                    <el-submenu index="6-1">
                                      <template slot="title">
                                          <i class="el-icon-folder-remove"></i>
                                          <span>财务核算表</span>
                                      </template>
                                      <el-menu-item index="6-1-1"><router-link to="/SummaryMenu/ConsultStoreSummary">到店消费核算</router-link></el-menu-item>
                                      <el-menu-item index="6-1-2"><router-link to="/SummaryMenu/EmpConsumeSummary">收入情况核算</router-link></el-menu-item>
                                      <el-menu-item index="6-1-3"><router-link to="/SummaryMenu/CostMoneySummary">消耗金额核算</router-link></el-menu-item>
                                    </el-submenu>
                                    <el-submenu index="6-2">
                                      <template slot="title">
                                          <i class="el-icon-folder-remove"></i>
                                          <span>客户分析表</span>
                                       </template>
                                      <el-menu-item index="6-2-1"><router-link to="/SummaryMenu/ProSummary">套餐产品消耗</router-link></el-menu-item>
                                      <el-menu-item index="6-2-2"><router-link to="/SummaryMenu/VsMonthSummary">月度咨客状态</router-link></el-menu-item>
                                      <el-menu-item index="6-2-3"><router-link to="/SummaryMenu/VisitorConSummary">客户产品消耗</router-link></el-menu-item>
                                      <el-menu-item index="6-2-4"><router-link to="/SummaryMenu/VisitorDeSummary">访客跟踪明细</router-link></el-menu-item>
                                    </el-submenu>
                                    <el-submenu index="6-3">
                                      <template slot="title">
                                          <i class="el-icon-folder-remove"></i>
                                          <span>咨询方向分析表</span>
                                       </template>
                                      <el-menu-item index="6-3-1"><router-link to="/SummaryMenu/FirstVdSummary">初访咨询方向</router-link></el-menu-item>
                                      <el-menu-item index="6-3-2"><router-link to="/SummaryMenu/EmpDtSummary">初诊咨询方向</router-link></el-menu-item>
                                    </el-submenu>

                                  </el-submenu>

                                </el-menu>
                                </el-col>
                        </el-row>
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
                // bool1: true,
                // bool2: false,
                // bool3: false,
                // bool4: false,
                // bool5: false,
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

            handleOpen(key, keyPath) {
                console.log(key, keyPath);
              },
              handleClose(key, keyPath) {
                console.log(key, keyPath);
              },
            // onShow(index) {
            //     switch (index) {
            //         case 0:
            //             this.bool1 = !this.bool1;
            //             this.bool2 = false;
            //             this.bool3 = false;
            //             this.bool4 = false;
            //             this.bool5 = false;
            //             break;
            //         case 1:
            //             this.bool1 = false;
            //             this.bool2 = !this.bool2;
            //             this.bool3 = false;
            //             this.bool4 = false;
            //             this.bool5 = false;
            //             break;
            //         case 2:
            //             this.bool1 = false;
            //             this.bool2 = false;
            //             this.bool3 = !this.bool3;
            //             this.bool4 = false;
            //             this.bool5 = false;
            //             break;
            //         case 3:
            //             this.bool1 = false;
            //             this.bool2 = false;
            //             this.bool3 = false;
            //             this.bool4 = !this.bool4;
            //             this.bool5 = false;
            //             break;
            //         case 4:
            //             this.bool1 = false;
            //             this.bool2 = false;
            //             this.bool3 = false;
            //             this.bool4 = false;
            //             this.bool5 = !this.bool5;
            //             break;
            //     }

            // },
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
        /* border-top: 1px solid #ccc; */
        height: 705px;
        overflow-y: auto;
        overflow-x: hidden;
        text-align: left;
    }

    #aside-menu::-webkit-scrollbar {
        display: none;
    }
    #aside-menu .el-submenu .el-menu-item{
        background: #F1F1F1!important;
        padding-left: 56px!important;
    }
    #aside-menu .menu-item-pd .el-menu-item{
        padding-left: 75px!important;
    }
    #aside-menu .el-submenu .el-menu-item:hover{
         background: #fff!important;
    }
    #aside-menu li{
        font-size: 18px;
     }

    #aside-menu li a {
         color: #333;
         display: block;
     }
    #aside-menu li a.router-link-active{
         color: #f2ad4e;
         text-decoration: none;
     }

    #aside-menu li a:hover {
         color: #f2ad4e!important;
     }


   #aside-menu li div.el-submenu__title{
               font-size: 18px;
        /* color: #F04134; */
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


</style>
<host>

</host>
