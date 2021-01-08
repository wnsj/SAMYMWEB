<!-- add and modify consume -->
<template>
	<div class="modal-content1">
		<div class="modal-body  pos_r jh-mh-sc1">
			<ValidationObserver tag="div" ref="addArcForm">
				<div class="tab-pane fade in active martop" id="basic">
					<div class="tab-pane fade in active martop">
						<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
							<div class="col-md-6 clearfix">
								<h4 id="myModalLabel" class="modal-title jh-lh-39">基础信息：</h4>
							</div>
						</div>
						<div class="col-md-6 form-group clearfix">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">优惠券名称</label><span class="sign-left">:</span>
								<div class="col-md-7">
									<input type="text" class="form-control" v-model="couponName" maxlength="12" placeholder="最多输入12个字">
								</div>
								<span class="err-msg1">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">优惠券类型</label><span class="sign-left">:</span>
								<div class="col-md-7">
									<select class="form-control" v-model="couponType" @click="man">
										<option value="2">满减券</option>
										<option value="1">满折券</option>
									</select>
								</div>
								<span class="err-msg">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">状态</label><span class="sign-left">:</span>
								<div class="col-md-7">
									<select class="form-control" v-model="state">
										<option value="1">在用</option>
										<option value="2">停用</option>
									</select>
								</div>
								<span class="err-msg">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix jin">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">金额</label><span class="sign-left">:</span>
								<div class="col-md-7  jin1">
									<input type="number" class="form-control" v-model="recude" @blur="manjian()">
									<span>元</span>
								</div>
								<span class="err-msg2">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix zhe" style="float: right;display: none;">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">折扣</label><span class="sign-left">:</span>
								<div class="col-md-7  zhe1">
									<input type="number" class="form-control" v-model="recude" @blur="manjian3()">
									<span>%</span>
								</div>
								<span class="err-msg2">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix shiyong">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">使用门槛</label><span class="sign-left">:</span>
								<div class="col-md-7" v-model="isLimit">
									<div class="xianzhi wuxian" style="display: block;"><input class="xian" type="radio" name="radioGroup1"
										 v-model="isLimit" value="2" /><label class="xian1">无限制</label></div>
									<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup1" v-model="isLimit" value="1" @blur="manjian4()" /><label
										 class="xian1">满</label></div>
									<div class="xianzhi2"><input type="text" placeholder="0" v-model="fullCondition" @blur="manjian1()"><span>元可用</span></div>
								</div>
								<span class="err-msg8">{{ errors[0] }}</span>
							</ValidationProvider>
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
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-1 control-label text-right nopad end-aline">有效期</label><span class="sign-left">:</span>
								<div class="col-md-8 shiyong shiyong1" v-model="isVaild">
									<div class="xianzhi"><input class="xian" type="radio" name="radioGroup3" value="1" @click="youxiao()" v-model="isVaild" /><label
										 class="xian1">永久有效</label></div>
									<div class="xianzhi1 data"><input class="xian" id="cats" type="radio" name="radioGroup3" value="2" v-model="isVaild" /><label
										 class="xian1">日期范围：</label></div>
									<div class="xianzhi3 start-time">
										<dPicker class="wd100" v-model="startTime"></dPicker>
									</div>
									<div class="xianhzi15 xie">~</div>
									<div class="xianzhi3 end-time">
										<dPicker class="wd100" v-model="endTime"></dPicker>
									</div>
									<!-- <div class="xianzhi4"><input type="checkbox"><label class="xian1">自领取之日</label></div>
						<div class="xianzhi5"><input type="text" placeholder="0"><span>天内</span></div> -->
								</div>
								<span class="err-msg3">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-12 form-group clearfix">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-1 control-label text-right nopad end-aline">使用用户</label><span class="sign-left">:</span>
								<div class="col-md-8 shiyong shiyong1">
									<div class="xianzhi"><input class="xian" type="radio" name="radioGroup4" v-model="userType" value="1" /><label
										 class="xian1">全体用户</label></div>
									<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup4" v-model="userType" value="2" /><label
										 class="xian1">新用户</label></div>
									<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup4" v-model="userType" value="3" /><label
										 class="xian1">指定用户</label></div>
									<div class="xianzhi3_1">
										<p style="cursor: pointer;" v-on:click="seles()" v-has="'SAMY:MP:Coupon:selectAdd'">选择用户</p>
									</div>
								</div>
								<span class="err-msg4">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-12 form-group clearfix">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-1 control-label text-right nopad end-aline">选择产品</label><span class="sign-left">:</span>
								<div class="col-md-8 shiyong shiyong1">
									<div class="xianzhi"><input class="xian" type="radio" name="radioGroup5" v-model="categoryType" value="1" /><label
										 class="xian1">全品类</label></div>
									<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup5" v-model="categoryType" value="2" /><label
										 class="xian1">指定分类</label></div>
									<div class="xianzhi3_1">
										<p style="cursor: pointer;" v-on:click="xus()" v-has="'SAMY:MP:Coupon:select-type'">选择分类</p>
									</div>
									<div class="xianzhi1" style="margin-left:25px;"><input class="xian" type="radio" v-model="categoryType" name="radioGroup5"
										 value="3" /><label class="xian1">指定产品</label></div>
									<div class="xianzhi3_1">
										<p style="cursor: pointer;" v-on:click="ots()" v-has="'SAMY:MP:Coupon:select-type'">选择产品</p>
									</div>
								</div>
								<span class="err-msg5">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-3 control-label text-right nopad end-aline">每人限领/限用</label><span class="sign-left">:</span>
								<div class="col-md-7 shiyong shiyong1">
									<div class="xianzhi6"><input type="number" id="num" placeholder="无限制填写0" v-model="limitGet" @change="xianhzi()"><span>张</span></div>
								</div>
								<span class="err-msg6">{{ errors[0] }}</span>
							</ValidationProvider>
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
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">总发行量</label><span class="sign-left">:</span>
								<div class="col-md-7 shiyong shiyong1">
									<div class="xianzhi6"><input type="number" placeholder="无限制填写0" v-model="allCount" @change="faxing()"><span>张</span></div>
								</div>
								<span class="err-msg7">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix"></div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-25" v-on:click="addFee()" v-has="'SAMY:CouponManage'">确认</button>
						<button type="button" class="btn btn-warning pull-center m_r_10 jh-mr-35" @click="goOff()" v-has="'SAMY:CouponManage'">取消</button>
					</div>
				</div>
			</ValidationObserver>
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
				operatorId: this.accountId(),
				newprojectList: [],
				categoryList: [],
				couponName: '', //优惠券名称
				state: '1', //状态
				proId: '',
				couponType: '2', //优惠券类型
				fullCondition: '', //金额
				recude: '', //折扣
				isLimit: '2', //使用门槛
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
				startTime: '',
				endTime: ''
			};
		},
		methods: {
			youxiao() {
				if (this.isVaild == '') {
					$(".data").hide();
					// document.getElementById("cats").disabled = true
					$(".xie").hide();
					$(".wd100").hide();
				} else {
					$(".data").show();
					// document.getElementById("cats").disabled = false
					$(".xie").show();
					$(".wd100").show();
				}
				if (this.isVaild == 1) {
					$(".data").hide();
					// document.getElementById("cats").disabled = true
					$(".xie").hide();
					$(".wd100").hide();
				} else {
					$(".data").show();
					// document.getElementById("cats").disabled = false
					$(".xie").show();
					$(".wd100").show();
				}

			},
			man() {
				if (this.couponType == '1') {
					$(".jin").hide();
					$(".zhe").show();
					$(".wuxian").hide();
					$(".xianzhi2 span").css('right', '35px');
				} else if (this.couponType == '2') {
					$(".jin").show();
					$(".zhe").hide();
					$(".wuxian").show();
					$(".xianzhi2 span").css('right', '-20px');
				}
			},
			//限制领取
			xianhzi() {
				if (!(/^\+?(0|[1-9][0-9]*)$/).test(this.limitGet)) {
					alert("输入的不是正整数/0！")
					this.limitGet = ''
					return false
				} else {

				}
			},
			//发行量
			faxing() {
				if (!(/^\+?(0|[1-9][0-9]*)$/).test(this.allCount)) {
					alert("输入的不是正整数/0！")
					this.allCount = ''
					return false
				} else {}
			},
			manjian() {
				if (this.couponType == '2' && this.isLimit == '2') {
					if (!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/).test(this.recude)) {
						alert("只能输入正数或者小数");
						this.recude = ''
						return false0
					}
					if (this.recude - 5 > 0) {
						alert("输入的金额数值不能大于5！")
						return false
					}
				}else if(!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/).test(this.recude)){
					alert("只能输入正数或者小数");
					return false
				}

			},
			manjian3() {
				if (!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/).test(this.recude)) {
					alert("只能输入正数或者小数");
					return false
				}
			
			
			},
			manjian4(){
				if(this.isLimit =='1'){
					if(this.fullCondition == ''){
						alert("请填写使用门槛满减/满折金额！");
						return false
					}
				}
			},
			manjian1() {
				if (this.isLimit == '1') {
					if (!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/).test(this.recude)) {
						alert("只能输入正数或者小数");
						return false
					}
				}

			},

			//点击返回按钮跳转
			goOff() {
				this.$router.push({
					path: '../../MP/Coupon'
				})
			},
			//点击选择用户按钮跳转
			seles() {
				this.$router.push({
					path: '../../MP/Coupon/selectAdd'
				})
				localStorage.setItem('projectList', this.projectList);
				localStorage.setItem('userList', this.userList);
				localStorage.setItem('categoryList', this.categoryList);
				localStorage.setItem('couponName', this.couponName)
				localStorage.setItem('operatorId', this.operatorId)
				localStorage.setItem('couponType', this.couponType)
				localStorage.setItem('startTime', this.startTime)
				localStorage.setItem('endTime', this.endTime)
				localStorage.setItem('state', this.state)
				localStorage.setItem('fullCondition', this.fullCondition)
				localStorage.setItem('recude', this.recude)
				localStorage.setItem('isLimit', this.isLimit)
				localStorage.setItem('isVaild', this.isVaild)
				localStorage.setItem('userType', this.userType)
				localStorage.setItem('categoryType', this.categoryType)
				localStorage.setItem('limitGet', this.limitGet)
				localStorage.setItem('allCount', this.allCount)
			},
			//点击选择分类按钮跳转
			xus() {
				this.$router.push({
					path: '../../MP/Coupon/select-type'
				})
				localStorage.setItem('projectList', this.projectList);
				localStorage.setItem('userList', this.userList);
				localStorage.setItem('categoryList', this.categoryList);
				localStorage.setItem('couponName', this.couponName)
				localStorage.setItem('operatorId', this.operatorId)
				localStorage.setItem('couponType', this.couponType)
				localStorage.setItem('startTime', this.startTime)
				localStorage.setItem('endTime', this.endTime)
				localStorage.setItem('state', this.state)
				localStorage.setItem('fullCondition', this.fullCondition)
				localStorage.setItem('recude', this.recude)
				localStorage.setItem('isLimit', this.isLimit)
				localStorage.setItem('isVaild', this.isVaild)
				localStorage.setItem('userType', this.userType)
				localStorage.setItem('categoryType', this.categoryType)
				localStorage.setItem('limitGet', this.limitGet)
				localStorage.setItem('allCount', this.allCount)
			},
			//点击选择产品按钮跳转
			ots() {
				this.$router.push({
					path: '../../MP/Coupon/select-chan',
				})
				localStorage.setItem('projectList', this.projectList);
				localStorage.setItem('userList', this.userList);
				localStorage.setItem('categoryList', this.categoryList);
				localStorage.setItem('couponName', this.couponName)
				localStorage.setItem('operatorId', this.operatorId)
				localStorage.setItem('couponType', this.couponType)
				localStorage.setItem('startTime', this.startTime)
				localStorage.setItem('endTime', this.endTime)
				localStorage.setItem('state', this.state)
				localStorage.setItem('fullCondition', this.fullCondition)
				localStorage.setItem('recude', this.recude)
				localStorage.setItem('isLimit', this.isLimit)
				localStorage.setItem('isVaild', this.isVaild)
				localStorage.setItem('userType', this.userType)
				localStorage.setItem('categoryType', this.categoryType)
				localStorage.setItem('limitGet', this.limitGet)
				localStorage.setItem('allCount', this.allCount)
			},
			//the event of addtional button

			addAddScale(url) {
				var formData = new FormData();
				if (this.userType == '1') {

				} else if (this.userType == '2') {

				} else if (this.userType == '3') {
					var userList = localStorage.getItem('userList');
					var stringResult1 = userList.split(',');
					
					for (var i = 0; i < stringResult1.length; i++) {
						formData.append('userList', stringResult1[i])
					}
					
				}

				if (this.categoryType == '1') {

				} else if (this.categoryType == '2') {
					var categoryList = localStorage.getItem('categoryList');
					var stringResult2 = categoryList.split(',');
					if (stringResult2 == '') {
						alert("请选择分类!");
						return false
					}
					for (var i = 0; i < stringResult2.length; i++) {
						formData.append('categoryList', stringResult2[i])
					}
					
				} else if (this.categoryType == '3') {
					var projectList = localStorage.getItem('projectList');
					var stringResult = projectList.split(',');
					if (stringResult == '') {
						alert("请选择产品!");
						return false
					}
					for (var i = 0; i < stringResult.length; i++) {
						formData.append('projectList', stringResult[i])
					}
					
				}
				if (this.isLimit == '1') {
					formData.append('fullCondition', this.fullCondition)
				} else {

				}
				if (!this.isBlank(this.startTime)) {
					this.startTime = this.moment(this.startTime, "YYYY-MM-DD 00:00:00")
				}
				if (!this.isBlank(this.endTime)) {
					this.endTime = this.moment(this.endTime, "YYYY-MM-DD 23:59:59")
				}
				formData.append('couponName', this.couponName)
				formData.append('operatorId', this.operatorId)
				formData.append('couponType', this.couponType)
				formData.append('startTime', this.startTime)
				formData.append('endTime', this.endTime)
				formData.append('state', this.state)
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
			addFee() {
				this.$refs.addArcForm.validate().then(success => {
					if (success) {
						if (this.isVaild == 2) {
							if (this.startTime == '') {
								alert("请填写开始时间!");
								return false
							} else if (this.endTime == '') {
								alert("请填写结束时间！");
								return false
							}
						}
						if (this.isLimit == '1') {
							if (this.fullCondition == '') {
								alert("请填写使用门槛满减/满折金额!");
								return false
							} 
						}
						if(this.userType ==3){
							if (this.userList  == '') {
								alert("请勾选用户!");
								return false
							}
						}
						if(this.categoryType ==2){
							if (this.categoryList  == '') {
								alert("请勾选分类!");
								return false
							}
						}
						if(this.categoryType ==3){
							if (this.projectList  == '') {
								alert("请勾选产品!");
								return false
							}
						}
						var url = this.url + '/couponController/addCoupon'
						this.addAddScale(url)
					} else {
						this.$message.error('请填写完整！');
					}
				})
			}
		},
		mounted() {
			if (localStorage.getItem('couponName')) {
				this.couponName = localStorage.getItem('couponName');
				localStorage.removeItem('couponName');
			}
			if (localStorage.getItem('operatorId')) {
				this.operatorId = localStorage.getItem('operatorId');
				localStorage.removeItem('operatorId');
			}
			if (localStorage.getItem('couponType')) {
				this.couponType = localStorage.getItem('couponType');
				localStorage.removeItem('couponType');
			}
			if (localStorage.getItem('startTime')) {
				this.startTime = localStorage.getItem('startTime');
				localStorage.removeItem('startTime');
			}
			if (localStorage.getItem('endTime')) {
				this.endTime = localStorage.getItem('endTime');
				localStorage.removeItem('endTime');
			}
			if (localStorage.getItem('state')) {
				this.state = localStorage.getItem('state');
				localStorage.removeItem('state');
			}
			if (localStorage.getItem('fullCondition')) {
				this.fullCondition = localStorage.getItem('fullCondition');
				localStorage.removeItem('fullCondition');
			}
			if (localStorage.getItem('recude')) {
				this.recude = localStorage.getItem('recude');
				localStorage.removeItem('recude');
			}
			if (localStorage.getItem('isLimit')) {
				this.isLimit = localStorage.getItem('isLimit');
				localStorage.removeItem('isLimit');
			}
			if (localStorage.getItem('isVaild')) {
				this.isVaild = localStorage.getItem('isVaild');
				localStorage.removeItem('isVaild');
			}
			if (localStorage.getItem('userType')) {
				this.userType = localStorage.getItem('userType');
				localStorage.removeItem('userType');
			}
			if (localStorage.getItem('categoryType')) {
				this.categoryType = localStorage.getItem('categoryType');
				localStorage.removeItem('categoryType');
			}
			if (localStorage.getItem('limitGet')) {
				this.limitGet = localStorage.getItem('limitGet');
				localStorage.removeItem('limitGet');
			}
			if (localStorage.getItem('allCount')) {
				this.allCount = localStorage.getItem('allCount');
				localStorage.removeItem('allCount');
			}
			if (localStorage.getItem('projectList')) {
				this.projectList = localStorage.getItem('projectList');
				// localStorage.removeItem('projectList');
			}
			if (localStorage.getItem('categoryList')) {
				this.categoryList = localStorage.getItem('categoryList');
				// localStorage.removeItem('categoryList');
			}
			if (localStorage.getItem('userList')) {
				this.userList = localStorage.getItem('userList');
				// localStorage.removeItem('userList');
			}
		}
	}
</script>

<style scoped>
	.err-msg {
		color: #FF0000;
	}

	.err-msg8 {
		position: absolute;
		left: 360px;
		top: 10px;
		color: #FF0000;
	}

	.err-msg1 {
		position: absolute;
		left: 355px;
		top: 10px;
		color: #FF0000;
	}

	.err-msg2 {
		position: absolute;
		left: 370px;
		top: 10px;
		color: #FF0000;
	}

	.err-msg3 {
		position: absolute;
		left: 544px;
		top: 10px;
		color: #FF0000;
	}

	.err-msg4 {
		position: absolute;
		left: 445px;
		top: 10px;
		color: #FF0000;
	}

	.err-msg5 {
		position: absolute;
		left: 540px;
		top: 10px;
		color: #FF0000;
	}

	.err-msg6 {
		position: absolute;
		left: 308px;
		top: 10px;
		color: #FF0000;
	}

	.err-msg7 {
		position: absolute;
		left: 275px;
		top: 10px;
		color: #FF0000;
	}

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
		width: 115px;
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
		text-indent: 1em;
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
