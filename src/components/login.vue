<template>
    <div class="g-center login-page container-fluid" @keyup.enter="login()" id="loincss">
        <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div class="col-md-3 col-lg-3 text-right" style="padding: 0; line-height: 34px;">
                <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">备案号</p><span class="sign-left">:</span>
            </div>
            <div class="col-md-5 col-lg-5"  style="margin-top: 5px;"><a href="http://beian.miit.gov.cn/">津ICP备17007687号-6</a></div>
        </div> -->
        <div class="beian"><a href="http://beian.miit.gov.cn/" target="_blank">津ICP备17007687号-6</a></div>


        <div class="loincss01 row bg-logo" style="width:400px; padding:0 40px;">
            <!-- <h1 class="main-title">圣安收费管理系统</h1> -->
            <div style="width:100%;margin-top:30px;">
                <input class="form-control boBo" type="text" placeholder="账号" v-model="accountName"
                       style="width:100%; background-color:transparent;"/>
            </div>
            <div style="width:100%;margin-top:30px;">
                <input class="form-control boBo" placeholder="密码" type="password" v-model="accountPwd"
                       style="width:100%; background-color:transparent;"/>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" margin-top:30px; margin-bottom:30px; ">
                <button class="btn btn-primary" style="width:100%" @click="login()">{{btnText}}</button>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="modifyPwd">
                <div class="modal-dialog">
                    <modPwd ref="modPwd" @certainAction="modifyPwdBack"></modPwd>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    /* @import '../assets/css/logincss.css'; */
</style>

<script>
    import axios from 'axios';
    import Cookies from 'js-cookie'
    import modPwd from './MP/SubPwd/ModifyPwd.vue'

    var vm = null;
    export default {
        components: {
            modPwd,
        },
        data() {
            return {
                accountName: '',
                accountPwd: '',
                accountData: {},
                btnText: '登录',
                cip: '',
            };
        },
        methods: {
            modifyPwdBack() {
                this.btnText = '登录';
                this.accountPwd = ''
                //删除cookie
                Cookies.remove("accountData");
                Cookies.remove("accessToken");
                Cookies.remove("empData");
                Cookies.remove("upUriList");
                // Cookies.remove("upValueList");
                sessionStorage.removeItem("upValueList");
                this.$parent.setRouter("/login");
                $("#modifyPwd").modal('hide')
            },
            login() {
                this.btnText = '登录中...';
                // 孙云龙添加
                sessionStorage.setItem("user",JSON.stringify(this.accountName))
                // end
                var url = this.url + "/accountAction/login";
                axios({
                    method: "post",
                    url: url,
                    headers: {
                        "Content-Type": this.contentType,
                        "Access-Token": this.accessToken
                    },
                    data: {
                        "accountNum": this.accountName,
                        "accountPwd": this.accountPwd,
                        // "ipaddress": returnCitySN.cip,
                    },
                    dataType: "json"
                }).then((response) => {
                    if (response.data.retCode == '0000') {
                        this.accountData = response.data.retData;
                        //后台写入cookie不成功，先由前端代替
                        if (this.isUseSetCookie) {
                            //cookie存储大小为4k左右，进行cookie瘦身
                            Cookies.set('accessToken', this.accountData.accessToken, "30MIN");
                            Cookies.set('accountData', this.accountData.accountData, "30MIN");
                            Cookies.set('empData', this.accountData.empData, "30MIN");
                            Cookies.set('upUriList', this.accountData.upUriList, "30MIN");
                            // Cookies.set('upValueList', this.accountData.upValueList, "30MIN");
                            sessionStorage.setItem("upValueList",JSON.stringify(this.accountData.upValueList));
                        }
                        if (this.accountPwd == '123456') {
                            $("#modifyPwd").modal('show')
                            this.$refs.modPwd.initData(this.accountData.accountData)
                        } else {
                            this.$parent.setRouter("/MainPage");
                        }
                    } else {
                        this.btnText = '登录';
                        alert(response.data.retMsg);
                    }
                }).catch((error) => {
                    this.btnText = '登录';
                    //console.log("请求失败处理");
                });
            },
            consoleLog() {
                //console.log("accountData:" + this.accountInfo + "##" + this.$root.accessToken)
                //console.log("Cookies:" + Cookies.get('accessToken'))
            }
        },
        created() {
            vm = this;
        }
    };
</script>
<style scoped>
    #app {
        display: table;
        width: 100%;
    }

    .main-title {
        text-align: center;
    }

    /* .des{text-align: center;color:#999;margin-bottom: 2em;} */
    .login-page {
        height: 100%;
        margin: 0 auto;
        position: relative;
        background: url(../../static/img/3-0.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .loincss01 {
        position: relative;
        top: 50%;
        left: 20%;
        margin: 0px auto;
        width: 20%;
        border-radius: 15px;
    }

    .bg-logo {
        background: rgba(255, 255, 255, 0.8)
    }

    .boBo {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: #999 solid 1px;
        border-radius: 0;
        box-shadow: none;
    }

    .beian {
        text-align: center;
        position: relative;
        font-size: 16px;
        left: 0;
        width: 100%;
        top: 85%;
    }

    .beian a {
        color: #FFFFFF !important;
        font-size: 24px;
    }
</style>
