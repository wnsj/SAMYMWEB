<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">{{oTitle}}驳回</h2>
		</div>
		<div class="modal-body  pos_r clearfix">
			<div class="tab-pane fade in active martop " id="basic">
                <div class="col-md-12 form-group clearfix">
                    <label for="cyname" class="col-md-12 control-label text-left nopad">请输入驳回理由，30字以内，必填！</label>
                    <div class="col-md-12" style="padding:0">
                        <textarea type="text" class="form-control" v-model="param.rejectReason" maxlength="30"></textarea>
                    </div>
                </div>

                <div class="col-md-12 form-group clearfix">
                    <button type="button" class="btn btn-warning pull-right margin-right-15" data-toggle="modal"
                     v-on:click="closeCurrentPage()">取消
                    </button>
                    <button type="button" class="btn btn-primary pull-right margin-right-15" data-toggle="modal"
                     v-on:click="addFee()">确认
                    </button>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
                param: {
                    rejectReason: '',
                    // operatorId: '',
                    operatorId: this.accountId()
                },
                oFlag: '',
                oTitle: ''
			};
		},
		methods: {
            initData(flag,param) {
                this.param = { 
                    rejectReason: '',
                    operatorId: this.accountId()
                };
                this.oFlag = flag;
                console.log(param)


                if (flag == 'product') {
                    this.oTitle = '产品购买'
                    this.param.piId = param.piId;

                } else if (flag == 'consumption') {
                    this.oTitle = '消费'
                    this.param.piId = param.piId;
                    this.param.cId = param.cid;
                    // this.param.createDate = param.createDate;
                    if (!this.isBlank(param.createDate)) {
                    	this.param.createDate = this.moment(param.createDate, 'YYYY-MM-DD 00:00:00.000')
                    }

                } else if (flag == 'refund') {
                    this.oTitle = '退费'
                    this.param.piId = param.piId;
                    this.param.refundId = param.refundId;
                    // this.param.createDate = param.createDate;
                    this.param.rejectReason = param.rejectReason;

                    if (!this.isBlank(param.createDate)) {
                    	this.param.createDate = this.moment(param.createDate, 'YYYY-MM-DD 00:00:00.000')
                    }
                }

            },

			//取消
			 closeCurrentPage() {
                $("#rejectionContent").modal("hide");
			},
			//确认
			addFee(){
                if (this.isBlank(this.param.rejectReason)) {
                    this.$alert('驳回理由不能为空', '提示', {
                      confirmButtonText: '确定',
                      type: 'error',
                      callback: action => {}
                    });
					return
				}

                var postUrl = '';
                if (this.oFlag == 'product') {
                    postUrl = this.url + '/purchasedItemsAuditBean/reject'
                } else if (this.oFlag == 'consumption') {
                    postUrl = this.url + '/consumAuditBean/consumReject'
                } else if (this.oFlag == 'refund') {
                    postUrl = this.url + '/refundAuditBean/refundReject'
                }
                //console.log(postUrl)
                this.certainAction(postUrl);
                 this.checkEmp(1);   
            },

            certainAction(url) {
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
                    console.log(res)
                    if (res.retCode == '0000') {

                        this.$alert(res.retMsg, '提示', {
                          confirmButtonText: '确定',
                          type: 'success',
                          callback: action => {}
                        })
                        this.closeCurrentPage()

                    } else {
                        this.$alert(res.retMsg, '提示', {
                          confirmButtonText: '确定',
                          type: 'error',
                          callback: action => {}
                        })

                    }

                }).catch((error) => {
                    console.log('请求失败处理')
                });

			}

		},


	}
</script>

<style>

</style>
