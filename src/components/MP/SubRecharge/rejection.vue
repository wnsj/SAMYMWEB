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
						<div class="col-md-12">
							<textarea type="text" class="form-control" v-model="reason" maxlength="30"></textarea>
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
				reason:'',
			};
		},
		methods: {
			//取消
			 closeCurrentPage() {
				 
                this.$emit('closeCurrentPage')
			},
			//确认
			addFee() {
				if (this.isBlank(this.reason)) {
					alert("驳回理由不能为空")
					return
				}
			}
		},
		mounted() {
			
		}

	}
</script>

<style>

</style>
