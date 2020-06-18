<!-- add and modify order -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 class="modal-title">{{title}}咨询室</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">咨询室名</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="crName">
                        </div>
                    </div>

                    <div class="col-md-12form-group clearfix">
                        <button type="button" class="btn btn-warning pull-right m_r_10 margin-right-15"
                                data-toggle="modal" v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" class="btn btn-primary pull-right m_r_10 margin-right-15"
                                data-toggle="modal" v-on:click="addOrder(title)">确认
                        </button>
                    </div>
                </form>
            </div>

        </div>

    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'

    export default {
        components: {
            dPicker
        },
        data() {
            return {
                title: '新增',
                storeId: this.storeId(),
                crName:''
            };
        },
        methods: {
            initData(param) {
                this.crName = ''
            },
            //the event of addtional button
            addOrder(param) {
                if (this.isBlank(this.crName)) {
                    alert("姓名不能为空")
                    return
                }

                var url = this.url + '/counseRoomAction/addCounseRoom';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: this.storeId,
                        crName: this.crName
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('addOrder')
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    //console.log('预约提交请求失败')
                });
            },
            closeCurrentPage() {
                this.$emit('addOrder')
            },
        },
        created() {

        },
        mounted() {
        }

    }
</script>

<style>
    .btnBg {
        background: #f5f5f5;
    }

    .btnBg label {
        margin-bottom: 0;
    }

    .btnBg input {
        margin-top: 10px;
    }
</style>
