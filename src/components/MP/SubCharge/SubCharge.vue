<!-- add and modify FWRoyalty -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 id="myModalLabel" class="modal-title">修改结束时间</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="dialogInutBox clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">姓名</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="param.memName" placeholder=""
                                   disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">产品名</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="param.proName" placeholder=""
                                   disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <b>*</b>
                        <label class="col-md-3 control-label text-right nopad end-aline">结束时间</label><span
                        class="sign-left">:</span>
                        <dPicker class="col-md-8 subcd-h65" v-model="param.endDate"
                                 v-on:click="dateAction()"></dPicker>
                    </div>
                </div>
                <div class="dialogBtnBox form-group clearfix">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-35"
                                data-toggle="modal"
                                v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-25"
                                data-toggle="modal"
                                v-on:click="certainAction()">确认
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'

    export default {
        components: {
            dPicker,
        },
        data() {
            return {
                param: {
                    piId: '',
                    memName: '',
                    proName: '',
                    endDate: ''
                },

            };
        },
        methods: {
            // Initialization FWRoyalty’s content
            initData(param) {
                // console.log(JSON.stringify(cash))
                $('#SubCharge').modal({backdrop: 'static', keyboard: false});
                Object.assign(this.param, param)
            },
            dateAction() {
                if (this.isBlank(this.param.endDate)) {
                    this.param.endDate = this.moment(this.param.endDate, "YYYY-MM-DD 00:00:00.000")
                }
            },


            certainAction() {

                if (!this.isBlank(this.param.endDate)) {
                    this.param.endDate = this.moment(this.param.endDate, 'YYYY-MM-DD 00:00:00.000')
                } else {
                    alert("结束时间不能为空")
                    return
                }
                var url = this.url + '/purchasedItemsAction/updatePurchasedItems'

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.param,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('certainAction')
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('会员相关操作失败')
                });
            },
            closeCurrentPage() {
                $("#SubCharge").modal("hide")
            },
        },
        mounted() {

        },

    }
</script>

<style>
    .subcd-h65 {
        width: 67%;
    }

    .pos-tr {
        top: 0;
        right: 20px;
        line-height: 34px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
