<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">短信模板设置</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
            <div class="row newRow">
                <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">模板名称</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="temName">
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">使用状态</p><span
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
                        v-on:click="selectRule('1')" v-has="'SAMY:MP:Employee:Add'">添加模板
                </button>
                <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1"
                        data-toggle="modal"
                        v-on:click="checkTem(1)">查询
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
                            <th class="text-center">模板名称</th>
                            <th class="text-center">设置时间</th>
                            <th class="text-center">短信内容</th>
                            <th class="text-center">状态</th>
                            <th class="text-center" v-has="'SAMY:MP:Employee:Update'">修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableData" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.temName}}</td>
                            <td class="text-center">{{item.createDate | dateFormatFilter('YYYY-MM-DD')}}</td>
                            <td class="text-center">{{item.temCon}}</td>
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
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="templateadd">
                <div class="modal-dialog wd1000">
                    <templateadd ref='templateadd' @addTem='feedBack'></templateadd>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import templateadd from '../SmsManage/smsTemplateAdd.vue'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            templateadd,
        },
        data() {
            return {
                tableData: [],
                isuse: '1',
                temName: '',
                fixedHeader: false,

                showSelect:true,
                addClass: false
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.checkTem(page);
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
            addTem() {
                console.log('modify the cotent of department')
                this.$refs.templateadd.initData('add')
                $("#templateadd").modal('show')
            },
            //modify the cotent of department
            modifyTem(item) {
                console.log('modify the cotent of department')
                this.$refs.templateadd.initData('modify', item)
                $("#templateadd").modal('show')
            },

            //feedback from adding and modifying view
            feedBack() {
                this.checkTem(1)
                $("#templateadd").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {

                if (param == 1) {
                    this.$refs.templateadd.initData('add', '')
                    $("#templateadd").modal('show')
                } else if (param == 3) {
                    if (!this.has('SAMY:MP:Employee:Update')) {
                        alert("暂无权限!")
                        return
                    }
                    this.$refs.templateadd.initData('modify', item)
                    $("#templateadd").modal('show')
                }
            },
            //check the list of department
            checkTem(page) {
                this.showSelect = false
                this.tableData = [
                    {
                        temName: '模板名称',
                        createDate: '2021-05-25 00:00:00',
                        temCon: '短信内容',
                        isuse: true
                    }

                ]
                // var url = this.url + ''
                // this.$ajax({
                //     method: 'POST',
                //     url: url,
                //     headers: {
                //         'Content-Type': this.contentType,
                //         'Access-Token': this.accessToken
                //     },
                //     data: {
                //         temName: this.temName,
                //         isuse: this.isuse,

                //         page: page.toString(),
                //         pageSize: this.pageSize
                //     },
                //     dataType: 'json',
                // }).then((response) => {
                //     var res = response.data
                //     console.log(res)
                //     if (res.retCode == '0000') {
                //         this.pages = res.retData.pages //总页数
                //         this.current = res.retData.current //当前页码
                //         this.pageSize = res.retData.size//一页显示的数量  必须是奇数
                //         this.total = res.retData.total //数据的数量
                //         this.$refs.paging.setParam(this.pages, this.current, this.total)
                //         this.tableData = res.retData.records
                //     } else {
                //         alert(res.retMsg)
                //     }

                // }).catch((error) => {
                //     console.log('请求失败处理')
                // });
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
            // this.checkTem(1)
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
