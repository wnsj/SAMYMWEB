<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 class="modal-title">患者缴费</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop">

				<div class="form-group clearfix">
					<label for="cyname" class="col-md-2 control-label text-right nopad">姓名：</label>
					<div class="col-md-5">
						<input type="text" class="form-control" v-model="charge.name" placeholder="">
					</div>
				</div>
				<div class="form-group clearfix">
					<label for="sex" class="col-md-2 control-label text-right nopad">性别：</label>
					<div class="col-md-5">
						<input type="text" class="form-control" v-model="charge.sex" placeholder="">
					</div>
				</div>
				<div class="form-group clearfix">

					<label class="col-md-2 control-label text-right nopad">出生年月：</label>
					<dPicker v-model="charge.birth" v-on:change="dateAction('0')"></dPicker>

				</div>
				<div class="form-group clearfix">
					<label for="gh" class="col-md-2 control-label text-right nopad">工号：</label>
					<div class="col-md-5">
						<input type="text" class="form-control" v-model="charge.jobNum" placeholder="">
					</div>
				</div>
				<div class="form-group clearfix">
					<label for="erpzh" class="col-md-2 control-label text-right nopad">ERP账号：</label>
					<div class="col-md-5">
						<input type="text" class="form-control" v-model="charge.erpaaccount" placeholder="">
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-2 control-label text-right nopad">部门：</label>
					<div class="col-md-5">
						<department @departChange='departChange'></department>
					</div>
				</div>

				<div class="form-group clearfix">
					<label class="col-md-2 control-label text-right nopad">入院日期：</label>
					<dPicker v-model="charge.entryDate" v-on:change="dateAction('1')"></dPicker>

				</div>
				<div class="form-group clearfix">
					<label class="col-md-2 control-label text-right nopad">出院日期：</label>
					<dPicker v-model="charge.outDate" v-on:change="dateAction('2')"></dPicker>

				</div>

				<div class="form-group clearfix">
					<label class="col-md-2 control-label text-right nopad">状态：</label>
					<div class="col-md-5 input-group date form_date">
						<select class="form-control" v-model="charge.state" disabled="true">
							<option value="1">是</option>
							<option value="2">否</option>
						</select>
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-2 control-label text-right nopad">备注：</label>
					<div class="col-md-5">
						<textarea class="form-control" rows="3" v-model="charge.remark"></textarea>
					</div>
				</div>

			</div>

		</div>

	</div>
</template>

<script>
	import department from '../../common/Department.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			department,
			dPicker,
		},
		data() {
			return {
				charge: {},
				state: '1',
			};
		},
		methods: {
			//feedback department information
			departChange: function(param) {
				console.log('返回科室的全部信息')
			},
		},
	}
</script>

<style>

</style>
