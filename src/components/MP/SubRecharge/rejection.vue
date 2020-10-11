<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">驳回</h2>
		</div>
		<div class="modal-body  pos_r clearfix">
			<div class="tab-pane fade in active martop " id="basic">

					<div class="col-md-12 form-group clearfix">
						<label for="cyname" class="col-md-12 control-label text-left nopad">请输入驳回理由，30字以内，必填！</label>
						<div class="col-md-12" style="padding:0">
							<textarea type="text" class="form-control" v-model="rejectReason" maxlength="30"></textarea>
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
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	import project from '../../common/Project.vue'
	import axios from "axios";

	export default {
		components: {

		},
		data() {
			return {
                piId: '',
                operatorId: '',
				rejectReason: ''
			};
		},
		methods: {
            initData(oPiId,oOeratorId) {
                this.reset();
                this.piId = oPiId;
                this.operatorId = oOeratorId;
                // console.log(oPiId,oOeratorId)
            },

            reset(){
              this.piId = '';
              this.operatorId = '';
              this.rejectReason = '';
            },

			//取消
			 closeCurrentPage() {
                this.reset();
                $("#rejectionContent").modal("hide");
			},
			//确认
			addFee() {
				if (this.isBlank(this.rejectReason)) {
					//alert("驳回理由不能为空")
                    this.$alert('驳回理由不能为空', '提示', {
                      confirmButtonText: '确定',
                      type: 'error',
                      callback: action => {}
                    });
					return
				}

                var url = this.url + '/purchasedItemsAuditBean/reject'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        piId: this.piId,
                        operatorId: this.operatorId,
                        rejectReason: this.rejectReason
                    },
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

                        //alert(res.retMsg)
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
		mounted() {

		}

	}
</script>

<style>

</style>
