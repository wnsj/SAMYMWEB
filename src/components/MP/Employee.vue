<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">员工管理</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-8=7">
                        <store ref="store" @storeChange='storeChange'></store>
                    </div>
                </div>
                <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">姓名</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="empName">
                    </div>
                </div>
                <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">手机号</p><span class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="iphone">
                    </div>
                </div> -->
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">岗位</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <pos ref="pos" @positionChange='positionChange'></pos>
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">是否在用</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <select class="form-control" v-model="isuse">
                            <option value="">全部</option>
                            <option value="1">在用</option>
                            <option value="0">停用</option>
                        </select>
                    </div>
                </div>

            </div>
            <div class="row newRow">

                <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-2"
                        data-toggle="modal"
                        v-on:click="selectRule('1')" v-has="'SAMY:MP:Employee:Add'">添加员工
                </button>
                <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1"
                        data-toggle="modal"
                        v-on:click="checkEmp(1)">查询
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
                    <table class="table table-bordered table-hover jh-po-re" id="datatable">
                        <thead>
                        <tr>
                            <th class="text-center">门店</th>
                            <th class="text-center">岗位</th>
                            <!-- <th class="text-center">员工工号</th> -->
                            <th class="text-center">姓名</th>
                            <!-- <th class="text-center">手机号</th> -->
                            <th class="text-center">性别</th>
                            <th class="text-center">入职时间</th>
                            <th class="text-center">操作时间</th>
                            <th class="text-center">是否停用</th>
                            <th class="text-center" v-has="'SAMY:MP:Employee:Update'">修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in employeeList" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.storeName}}</td>
                            <td class="text-center">{{item.posName}}</td>
                            <!-- <td class="text-center">{{item.empId}}</td> -->
                            <td class="text-center">{{item.empName}}</td>
                            <!-- <td class="text-center">{{item.name}}</td> -->
                            <td class="text-center">{{item.sex=='1' ? '男':'女'}}</td>
                            <td class="text-center">{{item.createDate | dateFormatFilter('YYYY-MM-DD')}}</td>
                            <td class="text-center">{{item.modifyDate | dateFormatFilter('YYYY-MM-DD')}}</td>
                            <td class="text-center">{{item.isuse==true ? "在用" : "停用"}}</td>
                            <td class="text-center" v-has="'SAMY:MP:Employee:Update'">
                                <button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改
                                </button>
                            </td>
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
        <div class="row row_edit">
            <div class="modal fade" id="emp">
                <div class="modal-dialog wd1000">
                    <emp ref='emp' @addEmp='feedBack'></emp>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import emp from '../MP/SubEmp/SubEmp.vue'
    import store from '../common/Store.vue'
    import pos from '../common/Position.vue'
    import {
        init
    } from '@/../static/js/common.js'
    import Paging from '../common/paging'

    export default {
        components: {
            emp,
            pos,
            store,
            Paging,
        },
        data() {
            return {
                employeeList: [],
                isuse: '1',
                empName: '',
                iphone: '',
                fixedHeader: false,
                posId: '',
                storeId: this.storeId(),
                accountType: this.accountType(),

                //分页需要的数据
                pages: '', //总页数
                current: '1', //当前页码
                pageSize: '10', //一页显示的数量
                total: '', //数据的数量
                showSelect:true,
                addClass: false
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.checkEmp(page);
            },
            //modify the cotent of department
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

            storeChange: function (param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
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
                $("#emp").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {

                if (param == 1) {
                    this.$refs.emp.initData('add', '')
                    $("#emp").modal('show')
                } else if (param == 3) {
                    if (!this.has('SAMY:MP:Employee:Update')) {
                        alert("暂无权限!")
                        return
                    }
                    this.$refs.emp.initData('modify', item)
                    $("#emp").modal('show')
                }
            },
            //check the list of department
            checkEmp(page) {
                this.showSelect = false
                console.log('checkEmp')
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
                        pageSize: this.pageSize
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

    @media print {
        #fHeader {
            display: none
        }
    }
</style>
