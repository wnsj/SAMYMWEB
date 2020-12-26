<!-- add and modify consume -->
<template>
	<div class="modal-content1">
		<div class="modal-body  pos_r jh-mh-sc1">
			<div class="tab-pane fade in active martop" id="basic">
				<div class="tab-pane fade in active martop">
					<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
						<div class="col-md-6 clearfix">
							<h4 id="myModalLabel" class="modal-title jh-lh-39">基础信息：</h4>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label class="col-md-2 control-label text-right nopad end-aline">优惠券名称</label><span class="sign-left">:</span>
						<div class="col-md-7  ">
							<input type="text" class="form-control" v-model="couponName" maxlength="12" placeholder="最多输入12个字">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label class="col-md-2 control-label text-right nopad end-aline">优惠券类型</label><span class="sign-left">:</span>
						<div class="col-md-7  ">
							<select class="form-control" v-model="couponType" @click="man">
								<option value="">--请选择--</option>
								<option value="2">满减券</option>
								<option value="1">满折券</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label class="col-md-2 control-label text-right nopad end-aline">状态</label><span class="sign-left">:</span>
						<div class="col-md-7  ">
							<select class="form-control" v-model="state">
								<option value="">--请选择--</option>
								<option value="1">在用</option>
								<option value="2">停用</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jin">
						<b>*</b>
						<label class="col-md-2 control-label text-right nopad end-aline">金额</label><span class="sign-left">:</span>
						<div class="col-md-7  jin1">
							<input type="text" class="form-control" v-model="recude">
							<span>元</span>
						</div>

					</div>
					<div class="col-md-6 form-group clearfix zhe" style="float: right;">
						<b>*</b>
						<label class="col-md-2 control-label text-right nopad end-aline">折扣</label><span class="sign-left">:</span>
						<div class="col-md-7  zhe1">
							<input type="text" class="form-control" v-model="recude">
							<span>%</span>
						</div>

					</div>
					<div class="col-md-6 form-group clearfix shiyong">
						<b>*</b>
						<label class="col-md-2 control-label text-right nopad end-aline">使用门槛</label><span class="sign-left">:</span>
						<div class="col-md-7" v-model="isLimit">
							<div class="xianzhi wuxian"><input class="xian" type="radio" name="radioGroup1" v-model="isLimit" value="2" /><label
								 class="xian1">无限制</label></div>
							<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup1" v-model="isLimit" value="1" /><label
								 class="xian1">满</label></div>
							<div class="xianzhi2"><input type="text" placeholder="0" v-model="fullCondition"><span>元可用</span></div>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix"></div>
				</div>


				<div class="tab-pane fade in active martop">
					<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
						<div class="col-md-6 clearfix">
							<h4 id="myModalLabel" class="modal-title jh-lh-39">适用机制：</h4>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<b>*</b>
						<label class="col-md-1 control-label text-right nopad end-aline">有效期</label><span class="sign-left">:</span>
						<div class="col-md-8 shiyong shiyong1" v-model="isVaild">
							<div class="xianzhi"><input class="xian" type="radio" name="radioGroup3" value="1" v-model="isVaild" /><label
								 class="xian1">永久有效</label></div>
							<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup3" value="2" v-model="isVaild" /><label
								 class="xian1">日期范围：</label></div>
							<div class="xianzhi3">
								<el-date-picker v-model="begDate" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime"
								 placeholder="选择日期时间">
								</el-date-picker>
								<!-- <dPicker class="wd100" value-type="format" format="YYYY-MM-DD HH:mm:ss" v-model="begDate"></dPicker> -->
							</div>
							<div class="xianhzi15">~</div>
							<div class="xianzhi3">
								<el-date-picker v-model="endDate" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime"
								 placeholder="选择日期时间">
								</el-date-picker>
								<!-- <dPicker class="wd100" value-type="format" format="YYYY-MM-DD HH:mm:ss" v-model="endDate"></dPicker -->
							</div>
							<!-- <div class="xianzhi4"><input type="checkbox"><label class="xian1">自领取之日</label></div>
						<div class="xianzhi5"><input type="text" placeholder="0"><span>天内</span></div> -->
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<b>*</b>
						<label class="col-md-1 control-label text-right nopad end-aline">使用用户</label><span class="sign-left">:</span>
						<div class="col-md-8 shiyong shiyong1" v-model="userType">
							<div class="xianzhi"><input class="xian" type="radio" name="radioGroup4" v-model="userType" value="1" /><label
								 class="xian1">全体用户</label></div>
							<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup4" v-model="userType" value="2" /><label
								 class="xian1">新用户</label></div>
							<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup4" v-model="userType" value="3" /><label
								 class="xian1">指定用户</label></div>
							<div class="xianzhi3_1">
								<p style="cursor: pointer;" class="" v-on:click="seles" v-has="'SAMY:MP:Coupon:selectAdd'">选择用户</p>
							</div>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<b>*</b>
						<label class="col-md-1 control-label text-right nopad end-aline">选择产品</label><span class="sign-left">:</span>
						<div class="col-md-8 shiyong shiyong1" v-model="categoryType">
							<div class="xianzhi"><input class="xian" type="radio" name="radioGroup5" v-model="categoryType" value="1" /><label
								 class="xian1">全品类</label></div>
							<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup5" v-model="categoryType" value="2" /><label
								 class="xian1">指定分类</label></div>
							<div class="xianzhi3_1">
								<p style="cursor: pointer;" v-on:click="xus" v-has="'SAMY:MP:Coupon:select-type'">选择分类</p>
							</div>
							<div class="xianzhi1" style="margin-left:25px;"><input class="xian" type="radio" name="radioGroup5" value="3"
								 @click="radioClick($event,item)" /><label class="xian1">指定产品</label></div>
							<div class="xianzhi3_1">
								<p style="cursor: pointer;" v-on:click="ots()" v-has="'SAMY:MP:Coupon:select-type'">选择产品</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label class="col-md-3 control-label text-right nopad end-aline">每人限领/限用</label><span class="sign-left">:</span>
						<div class="col-md-7 shiyong shiyong1">
							<div class="xianzhi6"><input type="text" placeholder="0" v-model="limitGet"><span>张</span></div>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix"></div>
				</div>

				<div class="tab-pane fade in active martop">
					<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
						<div class="col-md-6 clearfix">
							<h4 id="myModalLabel" class="modal-title jh-lh-39">发放机制：</h4>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label class="col-md-2 control-label text-right nopad end-aline">总发行量</label><span class="sign-left">:</span>
						<div class="col-md-7 shiyong shiyong1">
							<div class="xianzhi6"><input type="text" placeholder="0" v-model="allCount"><span>张</span></div>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix"></div>
				</div>
				<div class="col-md-12 form-group clearfix">
					<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-25" v-on:click="addFee()" v-has="'SAMY:CouponManage'">确认</button>
					<button type="button" class="btn btn-warning pull-center m_r_10 jh-mr-35" @click="goOff()">取消</button>
				</div>
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
				userList: [],
				projectList: [],
				newprojectList: [],
				categoryList: [],
				couponName: '', //优惠券名称
				state: '', //状态
				proId: '',
				couponType: '', //优惠券类型
				fullCondition: '', //金额
				recude: '', //折扣
				operatorId: '',
				isLimit: '', //使用门槛
				isVaild: '', //有效期
				userType: '', //使用用户
				categoryType: '', //选择产品
				limitGet: '', //每人限领取
				allCount: '', //发放机制
				cash: {
					cashId: '',
					memNum: '',
					balance: '',
					select: '',
					btn: false,
				},
				clickItemObj: {
					itemId: 0,
					count: 0
				},
				title: '',
				isShow: true,
				consumeReceivable: '',
				isSelect: false,
				cashSelect: true,
				appShow: false,
				isArrearsShow: false,
				unfinishedProList: [],
				projectObj: {},
				begDate: '',
				endDate: '',
			};
		},
		methods: {
			man() {
				if (this.couponType == '') {
					$(".jin").show();
					$(".zhe").show();
					$(".wuxian").show();
				} else if (this.couponType == '1') {
					$(".jin").hide();
					$(".zhe").show();
					$(".wuxian").hide();
					$(".xianzhi2 span").css('right', '35px');
				} else if (this.couponType == '2') {
					$(".jin").show();
					$(".zhe").hide();
					$(".wuxian").show();
				}
			},
			//点击返回按钮跳转
			goOff() {
				this.$router.go(-1);
			},
			//点击选择用户按钮跳转
			seles() {
				this.$router.push({
					path: '../../MP/Coupon/selectAdd'
				})
			},
			//点击选择分类按钮跳转
			xus() {
				this.$router.push({
					path: '../../MP/Coupon/select-type'
				})
			},
			//点击选择产品按钮跳转
			ots() {
				this.$router.push({
					path: '../../MP/Coupon/select-chan',
				})

			},
			//the event of addtional button
			addFee() {
				var formData = new FormData();
				var projectList = localStorage.getItem('projectList');
				var userList = localStorage.getItem('userList');
				var categoryList = localStorage.getItem('categoryList');
				console.log(projectList)
				var stringResult = projectList.split(',');
				var stringResult1 = userList.split(',');
				var stringResult2 = categoryList.split(',');
				for (var i = 0; i < stringResult.length; i++) {
					formData.append('projectList', stringResult[i])
				}
				for (var i = 0; i < stringResult1.length; i++) {
					formData.append('userList', stringResult1[i])
				}
				for (var i = 0; i < stringResult2.length; i++) {
					formData.append('categoryList', stringResult2[i])
				}
				var url = this.url + '/couponController/addCoupon'
				formData.append('couponName', this.couponName)
				formData.append('operatorId', this.operatorId)
				formData.append('couponType', this.couponType)
				formData.append('startTime', this.begDate)
				formData.append('endTime', this.endDate)
				formData.append('state', this.state)
				formData.append('fullCondition', this.fullCondition)
				formData.append('recude', this.recude)
				formData.append('isLimit', this.isLimit)
				formData.append('isVaild', this.isVaild)
				formData.append('userType', this.userType)
				formData.append('categoryType', this.categoryType)
				formData.append('limitGet', this.limitGet)
				formData.append('allCount', this.allCount)
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: formData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$router.push({
							path: '../../MP/Coupon'
						})
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

		},

	}
</script>

<style scoped>
	::-webkit-input-placeholder {
		text-indent: 1em;
	}

	::-moz-placeholder {
		text-indent: 1em;
	}

	:-ms-input-placeholder {
		text-indent: 1em;
	}

	:-moz-placeholder {
		text-indent: 1em;
	}

	.shiyong {
		margin-top: 40px;
	}

	.shiyong1 {
		margin-top: 0;
	}

	.shiyong .xianzhi {
		float: left;
	}

	.shiyong .xianzhi1 {
		float: left;
		margin-left: 15px;
	}

	.shiyong .xianzhi4 {
		float: left;
		margin-left: 15px;
		margin-top: 5px;
	}

	.shiyong .xianzhi2 {
		float: left;
		width: 105px;
		margin-left: 10px;
		margin-top: 5px;
	}

	.shiyong .xianzhi5 {
		float: left;
		width: 105px;
		margin-left: 10px;
		margin-top: 5px;
	}

	.shiyong .xianzhi6 {
		float: left;
		width: 120px;
		margin-left: 10px;
		margin-top: 5px;
	}

	.shiyong .xianzhi3 {
		float: left;
		width: 195px;
	}

	.shiyong .xianzhi3 .el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 195px;
	}

	.xianhzi15 {
		margin-left: 8px;
		margin-right: 8px;
		float: left;
		margin-top: 10px;
	}

	.shiyong .xianzhi3_1 {
		float: left;
		width: 80px;
	}

	.shiyong .xianzhi3_1 p {
		margin-left: 10px;
		margin-top: 5px;
		border-radius: 5px;
		width: 80px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		color: #fff;
		background: rgba(72, 196, 65, 1);
	}

	.jin1 {
		position: relative;
	}

	.jin1 span {
		position: absolute;
		right: -2%;
		top: 30%;
	}

	.zhe1 {
		position: relative;
	}

	.zhe1 span {
		position: absolute;
		right: -2%;
		top: 30%;
	}

	.shiyong .xianzhi2 input {
		width: 100%;
		outline: none;
		border: 1px solid #DDDDDD;
		height: 25px;
		position: relative;
	}


	.shiyong .xianzhi2 span {
		position: absolute;
		right: -20px;
		top: 10px;
	}

	.shiyong .xianzhi5 input {
		width: 100%;
		outline: none;
		border: 1px solid #DDDDDD;
		height: 25px;
		position: relative;
	}

	.shiyong .xianzhi5 span {
		position: absolute;
		right: -15px;
		top: 10px;
	}

	.shiyong .xianzhi6 input {
		width: 100%;
		outline: none;
		border: 1px solid #DDDDDD;
		height: 25px;
		position: relative;
	}

	.shiyong .xianzhi6 span {
		position: absolute;
		right: 90px;
		top: 10px;
	}

	.shiyong .xian {
		margin-top: 10px;
	}

	.shiyong .xian1 {
		margin-left: 10px;
	}

	label.bui-radios-label {
		position: relative;
		line-height: 34px;
	}

	label.bui-radios-label input {
		position: absolute;
		opacity: 0;
		visibility: hidden;
	}

	label.bui-radios-label .bui-radios {
		display: inline-block;
		position: relative;
		width: 13px;
		height: 13px;
		background: #FFFFFF;
		border: 1px solid #979797;
		border-radius: 50%;
		vertical-align: -2px;
		box-sizing: content-box;
	}

	label.bui-radios-label input:checked+.bui-radios:after {
		position: absolute;
		content: "";
		width: 7px;
		height: 7px;
		background-color: #fff;
		border-radius: 50%;
		top: 3px;
		left: 3px;
	}

	label.bui-radios-label input:checked+.bui-radios {
		background: #00B066;
		border: 1px solid #00B066;
	}

	label.bui-radios-label input:disabled+.bui-radios {
		background-color: #e8e8e8;
		border: solid 1px #979797;
	}

	label.bui-radios-label input:disabled:checked+.bui-radios:after {
		background-color: #c1c1c1;
	}

	.modal-content1 {
		padding-top: 20px !important;
		padding: 100px;
		overflow: auto;
	}
</style>
