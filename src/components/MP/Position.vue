<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">岗位管理</h1>
        </div>
        <el-collapse-transition>
            <div v-show="showSelect">
        <div class="row newRow">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad">
                    <p class="end-aline col-md-11 col-lg-11" >岗位名</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <input class="form-control" type="text" v-model="posName">
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad">
                    <p class="end-aline col-md-11 col-lg-11" >是否在用</p><span
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
            <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-30"
                    data-toggle="modal"
                    v-on:click="selectRule('1')" v-has="'SAMY:MP:Position:Add'">添加
            </button>
            <button type="button" class="btn btn-primary pull-right m_r_10 margin-right-15"
                    data-toggle="modal"
                    v-on:click="checkPosition(1)">查询
            </button>
        </div>
            </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect"  @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="datatable">

                        <thead class="datathead">
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">岗位名称</th>
                            <th class="text-center">是否停用</th>
                            <th class="text-center" v-has="'SAMY:MP:Position:Update'">修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in positionList" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.posId}}</td>
                            <td class="text-center">{{item.posName}}</td>
                            <td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
                            <td class="text-center" v-has="'SAMY:MP:Position:Update'">
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
            <div class="modal fade" id="positionContent">
                <div class="modal-dialog wd1000">
                    <SubPost ref='subPost' @certainAction='feedBack'></SubPost>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import SubPost from '../MP/SubPost/SubPost.vue'
    import {
        init
    } from '@/../static/js/common.js'
    import Paging from '../common/paging'

    export default {
        components: {
            SubPost,
            Paging
        },
        data() {
            return {
                positionList: [],
                isuse: '1',
                posName: '',
                fixedHeader: false,

                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
                showSelect:true,
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.checkPosition(page);
            },
            //feedback from adding and modifying view
            feedBack() {
                this.checkPosition(1)
                $("#positionContent").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {
                if (param == "1") {
                    this.$refs.subPost.initData('add')
                    $("#positionContent").modal('show')
                } else if (param == "3") {
                    if (!this.has('SAMY:MP:Position:Update')) {
                        alert("暂无权限!")
                        return
                    }
                    this.$refs.subPost.initData('modify', item)
                    $("#positionContent").modal('show')
                }
            },
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            //check the list of position
            checkPosition(page) {
                this.showSelect = false
                //console.log('checkPosition')
                var url = this.url + '/positionAction/queryPosition'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        posName: this.posName,
                        isuse: this.isuse,

                        accountId: this.accountId(),
                        moduleGrade: '2',
                        urlName: '/MP/Position',
                        operateType: '4',
                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size //一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.positionList = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('请求失败处理')
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
            //this.checkPosition(1)
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
