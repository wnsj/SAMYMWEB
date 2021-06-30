<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">短信签名设置</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
            <div class="row newRow">
                <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">签名名称</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="signName">
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">使用状态</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <select class="form-control" v-model="state">
                            <option value="">全部</option>
                            <option value="1">在用</option>
                            <option value="0">停用</option>
                        </select>
                    </div>
                </div>
                <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-2"
                        data-toggle="modal"
                        v-on:click="selectRule('1')" v-has="'SAMY:MP:Employee:Add'">添加签名
                </button>
                <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1"
                        data-toggle="modal"
                        v-on:click="checkSign()">查询
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
                    <el-table :data="tableData" border style="width: 100%" size="mini" :cell-style="{color: '#2c3e50'}" :header-cell-style="{color: '#2c3e50', background: '#efefef'}">
                        <el-table-column prop="signName" label="签名名称" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="createDate" label="设置时间" align="center" min-width="140"></el-table-column>
                        <el-table-column prop="remark" label="备注" align="center" width="270">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="bottom" width="250">
                                {{ scope.row.remark }}
                                <div slot="reference" class="signcontent">
                                    {{ scope.row.remark }}
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="状态" align="center" min-width="80">
                            <template slot-scope="scope">
                                {{ scope.row.state == 1 ? "在用" : scope.row.state == 0 ? "停用" : ""}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" min-width="80">
                            <template slot-scope="scope">
                                <button type="button" class="btn btn-warning" v-on:click="selectRule('3',scope.row)">修改
                                </button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="signadd">
                <div class="modal-dialog">
                    <signatureadd ref='signadd' @addSign='feedBack'></signatureadd>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import signatureadd from '../SmsManage/smsSignatureAdd.vue'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            signatureadd,
        },
        data() {
            return {
                tableData: [],
                state: 1,              // 状态
                signName: '',           // 签名名称
                fixedHeader: false,
                showSelect:true,
                addClass: false
            };
        },
        methods: {
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
            //feedback from adding and modifying view
            feedBack() {
                this.checkSign()
                $("#signadd").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {
                if (param == 1) {
                    this.$refs.signadd.initData('add', '')
                    $("#signadd").modal('show')
                } else if (param == 3) {
                    this.$refs.signadd.initData('modify', item)
                    $("#signadd").modal('show')
                }
            },
            //查询
            checkSign() {
                this.showSelect = false
                this.tableData = [
                    {
                        id: 1,
                        signName: '米悦心理',
                        createDate: '2021-05-25 00:00:00',
                        remark: '米悦心理签名',
                        state: 1
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
                //         signName: this.signName,
                //         state: this.state,

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
            
        },
        mounted() {
            init();
        },
        created() {
            // this.checkSign()
        }
    }
</script>

<style scoped="scoped">
    #datatable {
        position: relative;
    }
    .signadd .modal-dialog{ width: 600px;}
    .signcontent{ white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
</style>
