<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">区域管理</h1>
        </div>
        <el-collapse-transition>
            <div v-show="showSelect">
        <div class="row jh-mp-1">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                    <p class="end-aline col-md-11 col-lg-11 jh-pa-1">区域名称</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <input class="form-control" type="text">
                </div>
            </div>
            <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-30"
                    data-toggle="modal"
                    v-on:click="selectRule('1')" v-has="'SAMY:MP:Region:Add'">添加
            </button>
            <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1"
                    data-toggle="modal"
                    v-on:click="queryRegionList()">查询
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
                            <th class="text-center">区域ID</th>
                            <th class="text-center">区域名称</th>
                            <th class="text-center">修改</th>
							 <!-- v-has="'SAMY:MP:Store:Update'" -->
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in objList" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.reId}}</td>
                            <td class="text-center">{{item.reName}}</td>
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
            <div class="col-md-12 col-lg-12">
                <p class="tips">* 双击单行，可对当前数据进行修改</p>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="subRegionContent">
                <div class="modal-dialog wd1000">
                    <SubRegion ref='subRegion' @certainAction='feedBack'></SubRegion>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import SubRegion from '../MP/SubRegion/SubRegion.vue'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            SubRegion,
        },
        data() {
            return {
                showSelect:true,
                objList: [],
                isUse: '1',
                vsName: '',
                fixedHeader: false,
            };
        },
        methods: {

            //feedback from adding and modifying view
            feedBack() {
                this.queryRegionList()
                $("#subRegionContent").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {
                if (param == "1") {
                    this.$refs.subRegion.initData('add')
                    $("#subRegionContent").modal('show')
                } else if (param == "3") {
                    if (!this.has('SAMY:MP:Region:Update')) {
                        alert("暂无权限!");
                        return
                    }
                    this.$refs.subRegion.initData('modify', item)
                    $("#subRegionContent").modal('show')
                }
            },
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            //check the list of store
            queryRegionList() {
                this.showSelect = false
                var url = this.url + '/regionBean/queryRegion'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
						reName:this.reName,
						reLevel:'3',
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
                    //console.log('状态查询请求失败')
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
