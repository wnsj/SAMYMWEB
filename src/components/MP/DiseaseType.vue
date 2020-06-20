<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨询方向</h1>
        </div>
        <div class="row newRow" >
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                    <p class="end-aline col-md-11 col-lg-11 jh-pa-1">咨询类型</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <input class="form-control" type="text" v-model="dtName">
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                    <p class="end-aline col-md-11 col-lg-11 jh-pa-1">是否在用</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="isUse">
                        <option value="">全部</option>
                        <option value="1">在用</option>
                        <option value="0">停用</option>
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-1"
                    data-toggle="modal"
                    v-on:click="selectRule('1')" v-has="'SAMY:MP:Store:Add'">添加
            </button>
            <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1"
                    data-toggle="modal"
                    v-on:click="queryDtList()">查询
            </button>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable">

                        <thead class="datathead">
                        <tr>
                            <th class="text-center">方向ID</th>
                            <th class="text-center">咨询方向</th>
                            <th class="text-center">是否停用</th>
                            <th class="text-center">修改</th>
							 <!-- v-has="'SAMY:MP:Store:Update'" -->
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in objList" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.dtId}}</td>
                            <td class="text-center">{{item.dtName}}</td>
                            <td class="text-center">{{item.isUse==1 ? "在用" : "停用"}}</td>
                            <td class="text-center">
								 <!-- v-has="'SAMY:MP:Store:Update'" -->
                                <button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-12 col-lg-12 posAb">
                <p class="tips">* 双击单行，可对当前数据进行修改</p>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="dtContent">
                <div class="modal-dialog wd1000">
                    <SubDt ref='dt' @certainAction='feedBack'></SubDt>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import SubDt from '../MP/SubDt/SubDt.vue'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            SubDt,
        },
        data() {
            return {
                objList: [],
                isUse: '1',
                dtName: '',
                fixedHeader: false,
            };
        },
        methods: {
            
            //feedback from adding and modifying view
            feedBack() {
                this.queryDtList()
                $("#dtContent").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {
                if (param == "1") {
                    this.$refs.dt.initData('add')
                    $("#dtContent").modal('show')
                } else if (param == "3") {
//                     if (!this.has('SAMY:MP:Store:Update')) {
//                         alert("暂无权限!");
//                         return
//                     }
                    this.$refs.dt.initData('modify', item)
                    $("#dtContent").modal('show')
                }
            },
            //check the list of store
            queryDtList() {
                var url = this.url + '/diseaseType/queryDiseaseType'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        isUse: this.isUse,
						dtName:this.dtName,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.objList = res.retData
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('状态查询请求失败')
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
