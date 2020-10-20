<template>
    <div class="root">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 aside-logo">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 con-cen" style="height:100%;">
                <h2 class="pull-left" style="padding-top:3px; height:100%;">
                    <img style="width: 50px; height: 50px;display: block;float: left;" src="../assets/img/logo1.png"/>
                    <div style="float: left;margin-left: 10px;">
                        <strong style=" display:block;font-size: 24px; line-height:26px;">圣安米悦</strong>
                        <p style="font-size:16px;line-height:16px;margin-top: 5px;">门 店 管 理 系 统</p>
                    </div>
                </h2>
            </div>

            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-right showName">{{$route.meta.showName}}</div>

            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right pull-right">

                <p style="color: #1b4fa3;">欢迎<span style="color: #d58512;"> {{accountName}} </span>来到，门店管理系统</p>

                <el-badge :value="approveNum" class="item" style="margin-top: 10px;">
                    <el-button type="info"
                        icon="el-icon-message"
                        circle
                        v-has="'SAMY:MSG'"
                        @click="blocknews()"
                        size="small">
                   </el-button>
                  <!-- <el-button v-has="'SAMY:MSG'" @click="blocknews()" size="small" style="margin-top:5px;">消息列表</el-button> -->
                </el-badge>

                <!-- <button @click="add()"> ADD  </button> -->


                <!-- <button v-has="'SAMY:MSG'" @click="blocknews()" class="btn btn-warning m_r_10" style="margin-right:20px; margin-top:5px">消息列表</button> -->
                <el-drawer :visible.sync="drawer" :direction="direction"  :before-close="handleClose01" >
                <p v-show="role == 2" class="newlist">购买申请-待审核<span id="purNot">{{Review.purNotReviewNum == null ? 0:Review.purNotReviewNum }}<i>条</i> </span></p>
                <p v-show="role == 2" class="newlist">消费申请-待审核<span id="conNot"> {{Review.conNotReviewNum == null ? 0:Review.conNotReviewNum}}<i>条</i> </span></p>
                <p v-show="role == 2" class="newlist">退费申请-待审核<span id="reNot">{{Review.reNotReviewNum == null ? 0:Review.reNotReviewNum}}<i>条</i> </span></p>
<!--                <hr v-show="role == 11">-->
                 <p v-show="role == 11" class="newlist">购买申请-待审核<span id="purUnder">{{Review.purUnderReviewNum == null ? 0:Review.purUnderReviewNum}}<i>条</i> </span></p>
                <p v-show="role == 11" class="newlist">消费申请-待审核<span id="conUnder"> {{Review.conUnderReviewNum == null ? 0:Review.conUnderReviewNum}}<i>条</i> </span></p>
                <p v-show="role == 11" class="newlist">退费申请-待审核<span id="reUnder">{{Review.reUnderReviewNum == null ? 0:Review.reUnderReviewNum}}<i>条</i> </span></p>
<!--                <hr v-show="role == 11">-->
                <p v-show="role != 2 && role != 11" class="newlist">购买驳回-待处理<span id="purFailed">{{Review.purFailedNum == null ? 0:Review.purFailedNum}}<i>条</i> </span></p>
                <p v-show="role != 2 && role != 11" class="newlist">消费驳回-待处理<span id="conFailed" >{{Review.conFailedNum == null ? 0:Review.conFailedNum}}<i>条</i> </span></p>
                <p v-show="role != 2 && role != 11" class="newlist">退费驳回-待处理<span id="reFailed">{{Review.reFailedNum == null ? 0:Review.reFailedNum}}<i>条</i> </span></p>

                </el-drawer>
                <button class="btn btn-danger m_r_10" style="margin-top:5px; margin-right:20px;margin-left:20px" v-on:click="modPwd()">修改密码</button>
                <button class="btn btn-default m_r_10" style="margin-top:5px;" v-on:click="loginOut()">退出</button>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 pull-right" style="margin-top:10px">

                <!-- <img style="width: 30px; height: 30px;display: block;float: left;" src="../assets/img/touming.png"/>
                <span style="float: left;" id="newsnumber">123</span> -->


            </div>
        </div>
        <div class="container-fluid clear-mp" id="Odiv">
            <div class="row clear-mp">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv">

                    <div id="aside-menu">
                        <el-row>
                            <el-col :span="24">
                                <el-menu
                                   :default-active="$route.path"
                                    class="el-menu-vertical-demo"
                                    @open="handleOpen"
                                    @close="handleClose"
                                    unique-opened
                                    background-color="rgb(230, 230, 230)"
                                    text-color="#333"
                                    active-text-color="#ffd04b"
                                    :default-openeds="openeds"
                                    router>
                                    <el-submenu index="1">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>客户管理</span>
                                        </template>
                                        <el-menu-item index="/MP/Visitor">客户管理</el-menu-item>
                                    </el-submenu>

                                    <el-submenu index="2">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>订单管理</span>
                                        </template>
                                        <el-menu-item index="/MP/SettleSummary">消费管理</el-menu-item>
                                        <el-menu-item index="/MP/Charge">已购产品管理</el-menu-item>
                                        <el-menu-item index="/MP/Order">预约管理</el-menu-item>
                                        <el-menu-item index="/MP/CashDeposit">定金管理</el-menu-item>
                                        <el-menu-item index="/MP/Refund">退费管理</el-menu-item>
                                        <el-menu-item index="/MP/Income">收入记录明细</el-menu-item>
                                    </el-submenu>

                                    <el-submenu index="3" class="menu-item-pd">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>订单审核管理</span>
                                        </template>
                                        <el-submenu index="3-1">
                                            <template slot="title">
                                                <i class="el-icon-folder-remove"></i>
                                                <span>待审核</span>
                                            </template>
                                            <el-menu-item index="/Reviewed/TobeReviewed/purchase">产品购买审核</el-menu-item>
                                            <el-menu-item index="/Reviewed/TobeReviewed/consumption">消费审核</el-menu-item>
                                            <el-menu-item index="/Reviewed/TobeReviewed/Refund">退费审核</el-menu-item>
                                        </el-submenu>
                                        <el-submenu index="3-2">
                                            <template slot="title">
                                                <i class="el-icon-folder-remove"></i>
                                                <span>审核驳回</span>
                                            </template>
                                           <el-menu-item index="/Reviewed/Reject/purchase">产品购买驳回</el-menu-item>
                                            <el-menu-item index="/Reviewed/Reject/consumption">消费驳回</el-menu-item>
                                            <el-menu-item index="/Reviewed/Reject/Refund">退费驳回</el-menu-item>
                                        </el-submenu>
                                        <el-submenu index="3-3">
                                            <template slot="title">
                                                <i class="el-icon-folder-remove"></i>
                                                <span>审核列表统计</span>
                                            </template>
                                             <el-menu-item index="/Reviewed/Statistics/purchase">产品购买统计</el-menu-item>
                                            <el-menu-item index="/Reviewed/Statistics/consumption">消费统计</el-menu-item>
                                            <el-menu-item index="/Reviewed/Statistics/Refund">退费统计</el-menu-item>
                                        </el-submenu>
                                    </el-submenu>


                                    <el-submenu index="4">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>门店管理</span>
                                        </template>
                                        <el-menu-item index="/MP/Employee">员工管理</el-menu-item>
                                        <el-menu-item index="/MP/Position">岗位管理</el-menu-item>
                                        <el-menu-item index="/MP/ScheduleEmp">排班管理</el-menu-item>
                                        <el-menu-item index="/MP/Project">产品管理</el-menu-item>
                                        <el-menu-item index="/MP/CounseRoomManage">咨询室管理</el-menu-item>
                                        <el-menu-item index="/MP/CounseRoomTimeTotal">咨询室总览</el-menu-item>
                                    </el-submenu>

                                    <el-submenu index="5">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>基础设置</span>
                                        </template>
                                        <el-menu-item index="/MP/Occupation">职业管理</el-menu-item>
                                        <el-menu-item index="/MP/Education">学历管理</el-menu-item>
                                        <el-menu-item index="/MP/Region">区域管理</el-menu-item>
                                        <el-menu-item index="/MP/VisitState">状态管理</el-menu-item>
                                        <el-menu-item index="/MP/DiseaseType">咨询方向</el-menu-item>
                                    </el-submenu>

                                    <el-submenu index="6">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>权限管理</span>
                                        </template>
                                        <el-menu-item index="/MP/NewRuleManager">角色设置</el-menu-item>
                                        <el-menu-item index="/MP/UmsPermissionManage">权限设置</el-menu-item>
                                    </el-submenu>

                                    <el-submenu index="7" class="menu-item-pd">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>报表管理</span>
                                        </template>
                                        <el-submenu index="7-1">
                                            <template slot="title">
                                                <i class="el-icon-folder-remove"></i>
                                                <span>财务核算表</span>
                                            </template>
                                            <el-menu-item index="/SummaryMenu/ConsultStoreSummary">到店消费核算</el-menu-item>
                                            <el-menu-item index="/SummaryMenu/EmpConsumeSummary">收入情况核算</el-menu-item>
                                            <el-menu-item index="/SummaryMenu/CostMoneySummary">消耗金额核算</el-menu-item>
                                        </el-submenu>
                                        <el-submenu index="7-2">
                                            <template slot="title">
                                                <i class="el-icon-folder-remove"></i>
                                                <span>客户分析表</span>
                                            </template>
                                            <el-menu-item index="/SummaryMenu/ProSummary">套餐产品消耗</el-menu-item>
                                            <el-menu-item index="/SummaryMenu/VsMonthSummary">月度咨客状态</el-menu-item>
                                            <el-menu-item index="/SummaryMenu/VisitorConSummary">客户产品消耗</el-menu-item>
                                            <el-menu-item index="/SummaryMenu/VisitorDeSummary">访客跟踪明细</el-menu-item>
                                        </el-submenu>
                                        <el-submenu index="7-3">
                                            <template slot="title">
                                                <i class="el-icon-folder-remove"></i>
                                                <span>咨询方向分析表</span>
                                            </template>
                                            <el-menu-item index="/SummaryMenu/FirstVdSummary">初访咨询方向</el-menu-item>
                                            <el-menu-item index="/SummaryMenu/EmpDtSummary">初诊咨询方向</el-menu-item>
                                        </el-submenu>
                                    </el-submenu>

                                    <el-submenu index="8">
                                        <template slot="title">
                                            <i class="el-icon-folder-add"></i>
                                            <span>问卷调查管理</span>
                                        </template>
                                        <el-menu-item index="/MP/Questionnaire">问卷调查管理</el-menu-item>
                                        <el-menu-item index="/MP/QueVsAnswer">问卷调查结果</el-menu-item>
                                        <el-menu-item index="/MP/QuestionnaireSummary">问卷调查汇总</el-menu-item>
                                    </el-submenu>
                                </el-menu>
                            </el-col>
                        </el-row>
                    </div>

                </div>
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10" id="contentDiv"
                     style="padding: 0; overflow-x: hidden;overflow-y: auto;">
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
            modPwd,

        },
        data() {
            return {
                accountName: this.accountName(),
                itemList: [],
                onString: 'Visitor',
                openeds: ['1'],
                 drawer: false,
                role: '',
                storeId: this.storeId(),  //门店ID
                direction: 'rtl',
                Review:{},
                approveNum: 0,
                msgCount: this.$store.getters.getMsgCount
             //   postID:this.accountPosId(), //角色ID

            }
        },
        watch:{
             '$store.getters.getMsgCount'(val, oldVal){//监听store
                 // console.log("msgCount: "+val, oldVal);
                   this.newsnews();
             }
         },
        methods: {
            //点击消息列表
            blocknews(){
                this.drawer = true;
                this.newsnews();
               // alert(this.postID);
            },




            handleClose01(done) {
                this.drawer = false;
                // this.$confirm('确认关闭？')
                // .then(_ => {
                //     done();
                // })
                // .catch(_ => {});
            },
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

            gainFun(data) {
                this.onString = data;
                this.bool2 = true;
            },
            gainFun2(data) {
                this.onString = data;
                this.bool2 = true;
            },


            getApproveNum(){
                // role != 2 && role != 11
                if (this.role == 2) {
                   this.approveNum = this.Review.purNotReviewNum + this.Review.conNotReviewNum + this.Review.reNotReviewNum
                } else if (this.role == 11) {
                    this.approveNum = this.Review.purUnderReviewNum + this.Review.conUnderReviewNum + this.Review.reNotReviewNum
                } else {
                    this.approveNum = this.Review.purFailedNum + this.Review.conFailedNum + this.Review.reFailedNum
                }
            },

             //查询消息
            newsnews(){
                //alert(11)
                 var url = this.url + '/purchasedItemsAuditBean/getAuditMsg';
                 this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: this.storeId,			//门店ID
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {

                        // this.$alert(res.retMsg, '提示', {
                        //   confirmButtonText: '确定',
                        //   type: 'success',
                        //   callback: action => {

                        //   }
                        // })
                        //purNotReviewNum=res.retData.purNotReviewNum
                        this.Review = res.retData;
                        this.getApproveNum()
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
            },
            // add(){
            //     this.$store.commit('addCount',1)

            // }

        },
        mounted() {
            init();
        },
        created() {
            this.role = this.roleId()
            this.$parent.setRouter("/MainPage");
            this.newsnews();

            this.msgCount = this.$store.state.msgCount;
            setInterval(()=>{
                this.newsnews();
            },600000)

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

    #aside-menu .el-submenu .el-menu-item {
        background: #F1F1F1 !important;
        padding-left: 56px !important;
    }

    #aside-menu .menu-item-pd .el-menu-item {
        padding-left: 75px !important;
    }

    #aside-menu .el-submenu .el-menu-item:hover {
        background: #fff !important;
    }

    #aside-menu li {
        font-size: 18px;
    }

    #aside-menu li a {
        color: #333;
        display: block;
    }

    #aside-menu li a.router-link-active {
        color: #f2ad4e;
        text-decoration: none;
    }

    #aside-menu li a:hover {
        color: #f2ad4e !important;
    }


    #aside-menu li div.el-submenu__title {
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
    .showName{
        font-size: 30px;
        color: #fff;
        font-weight: bold;
        line-height: 55px;
    }
    .el-drawer{ width: 15% !important;}
    .newlist{ text-align: left; font-size: 16px; line-height: 40px; width: 85%; margin: 0 auto; }
    .newlist span{ display: block; float: right;  border-radius: 50%; color:red; text-align: center;  font-size: 16px;font-weight: bold; }
    .newlist span i{ font-weight: normal; font-style: normal; color: #333;}
    hr{ border: 1px solid #dddddd;}
</style>
<host>

</host>
