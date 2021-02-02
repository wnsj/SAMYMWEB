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
									<select class="form-control" v-model="couponType" @click="man()" disabled="disabled">
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
									<input type="number" class="form-control" v-model="recude" @blur="manjian()" disabled="disabled">
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
									<input type="number" class="form-control" v-model="recude" @blur="manjian3()" disabled="disabled">
									<span>%</span>
								</div>
								<span class="err-msg2">{{ errors[0] }}</span>
							</ValidationProvider>
						</div>
						<div class="col-md-6 form-group clearfix shiyong">
							<ValidationProvider mode="lazy" rules="required" v-slot="{ errors }">
								<b>*</b>
								<label class="col-md-2 control-label text-right nopad end-aline">使用门槛</label><span class="sign-left">:</span>
								<div class="col-md-7">
									<div class="xianzhi wuxian" style="display: block;"><input disabled="disabled" class="xian" type="radio" name="radioGroup1"
										 v-model="isLimit" value="2" /><label class="xian1">无限制</label></div>
									<div class="xianzhi1"><input class="xian" type="radio" disabled="disabled" name="radioGroup1" v-model="isLimit"
										 value="1" @blur="manjian4()" /><label class="xian1">满</label></div>
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
								<div class="col-md-8 shiyong shiyong1">
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
									<div class="xianzhi"><input class="xian" type="radio" name="radioGroup5" v-model="categoryType" value="1" @click="shangpin(1)" /><label
										 class="xian1">全品类</label></div>
									<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup5" v-model="categoryType" value="2" @click="shangpin(2)" /><label
										 class="xian1">指定分类</label></div>
									<div class="xianzhi3_1">
										<p style="cursor: pointer;" v-on:click="xus()" v-has="'SAMY:MP:Coupon:select-type'">选择分类</p>
									</div>
									<div class="xianzhi1" style="margin-left:25px;"><input class="xian" type="radio" v-model="categoryType" name="radioGroup5" @click="shangpin(3)"
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
						<button type="button" :disabled="isDisable" class="btn btn-primary pull-center m_r_10 jh-mr-25" v-on:click="updataFee()"
						 v-has="'SAMY:CouponManage'">确认</button>
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
				categoryList: [],
				couponName: '', //优惠券名称
				state: '', //状态
				couponType: '', //优惠券类型
				fullCondition: '', //金额
				recude: '', //折扣
				couponId: '',
				couId: '',
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
				dateArr: '',
				startTime: '',
				endTime: '',
				isDisable: false
			};
		},
		methods: {
			//点击返回按钮跳转
			goOff() {
				this.$router.push({
					path: '../../MP/Coupon'
				})
			},
			//点击选择用户按钮跳转
			seles() {
				this.couId = ''
				this.couId = this.$route.query.couId
				this.$router.push({
					path: '../../MP/Coupon/updataselectAdd',
					query:{
						couId:this.couId
					}
				})
				localStorage.setItem('projectList', this.projectList);
				localStorage.setItem('userList', this.userList);
				localStorage.setItem('categoryList', this.categoryList);
				localStorage.setItem('couponName', this.couponName);
				localStorage.setItem('couId', this.couId);
				localStorage.setItem('couponType', this.couponType);
				localStorage.setItem('startTime', this.startTime);
				localStorage.setItem('endTime', this.endTime);
				localStorage.setItem('state', this.state);
				localStorage.setItem('fullCondition', this.fullCondition);
				localStorage.setItem('recude', this.recude);
				localStorage.setItem('isLimit', this.isLimit);
				localStorage.setItem('isVaild', this.isVaild);
				localStorage.setItem('userType', this.userType);
				localStorage.setItem('categoryType', this.categoryType);
				localStorage.setItem('limitGet', this.limitGet);
				localStorage.setItem('allCount', this.allCount);
			},
			shangpin(num){
				this.categoryType = num;
				console.log(this.categoryType)
			},
			//点击选择分类按钮跳转
			xus() {
				this.couId = ''
				this.couId = this.$route.query.couId
				this.$router.push({
					path: '../../MP/Coupon/updataselect-type'
					
				})
				localStorage.setItem('projectList', this.projectList);
				localStorage.setItem('userList', this.userList);
				localStorage.setItem('categoryList', this.categoryList);
				localStorage.setItem('couponName', this.couponName);
				localStorage.setItem('couId', this.couId);
				localStorage.setItem('couponType', this.couponType);
				localStorage.setItem('startTime', this.startTime);
				localStorage.setItem('endTime', this.endTime);
				localStorage.setItem('state', this.state);
				localStorage.setItem('fullCondition', this.fullCondition);
				localStorage.setItem('recude', this.recude);
				localStorage.setItem('isLimit', this.isLimit);
				localStorage.setItem('isVaild', this.isVaild);
				localStorage.setItem('userType', this.userType);
				localStorage.setItem('categoryType', this.categoryType);
				localStorage.setItem('limitGet', this.limitGet);
				localStorage.setItem('allCount', this.allCount);
			},
			//点击选择产品按钮跳转
			ots() {
				this.couId = ''
				this.couId = this.$route.query.couId
				this.$router.push({
					path: '../../MP/Coupon/updataselect-chan',
					
				})
				localStorage.setItem('projectList', this.projectList);
				localStorage.setItem('userList', this.userList);
				localStorage.setItem('categoryList', this.categoryList);
				localStorage.setItem('couponName', this.couponName);
				localStorage.setItem('couId', this.couId);
				localStorage.setItem('couponType', this.couponType);
				localStorage.setItem('startTime', this.startTime);
				localStorage.setItem('endTime', this.endTime);
				localStorage.setItem('state', this.state);
				localStorage.setItem('fullCondition', this.fullCondition);
				localStorage.setItem('recude', this.recude);
				localStorage.setItem('isLimit', this.isLimit);
				localStorage.setItem('isVaild', this.isVaild);
				localStorage.setItem('userType', this.userType);
				localStorage.setItem('categoryType', this.categoryType);
				localStorage.setItem('limitGet', this.limitGet);
				localStorage.setItem('allCount', this.allCount);
			},
			//限制领取
			xianhzi() {
				if (!(/^\+?(0|[1-9][0-9]*)$/).test(this.limitGet)) {
					alert("输入的不是正整数或者0！")
					this.limitGet = ''
					return false
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
			//发行量
			faxing() {
				if (!(/^\+?(0|[1-9][0-9]*)$/).test(this.allCount)) {
					alert("输入的不是正整数/0！")
					this.allCount = ''
					return false
				}
			},
			//查询优惠券
			addFee(couponId) {
				var url = this.url + '/couponController/selectCouponById'
				var formData = new FormData();
				formData.append('couponId', couponId);
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': 'x-www-form-urlencoded',
						'Access-Token': this.accessToken
					},
					data: formData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.couId = res.retData.couId;   //优惠券ID
						this.couponName = res.retData.couponName; //优惠券名称
						this.state = res.retData.state; //状态
						this.startTime = res.retData.startTime;
						this.endTime = res.retData.endTime;
						this.couponType = res.retData.couponType; //优惠券类型
						this.fullCondition = res.retData.fullCondition; //金额
						this.recude = res.retData.recude; //折扣
						this.operatorId = res.retData.operatorId;
						this.isLimit = res.retData.isLimit; //使用门槛
						this.userList = res.retData.userList; //用户集合
						this.projectList = res.retData.productList; //产品集合
						this.categoryList = res.retData.categoryList; //分类集合
						this.isVaild = res.retData.isVaild; //有效期
						this.userType = res.retData.userType; //使用用户
						this.categoryType = res.retData.categoryType; //选择产品
						this.limitGet = res.retData.limitGet; //每人限领取
						this.couponId = res.retData.couponId;
						this.allCount = res.retData.allCount; //发放机制
						if(res.retData.userList==null){
							localStorage.setItem('userList', null);
						}else{
							localStorage.setItem('userList', res.retData.userList.toString());   //用户本地存储
						}
						if(res.retData.categoryList==null){
							localStorage.setItem('categoryList', null);
						}else{
							localStorage.setItem('categoryList', res.retData.categoryList.toString());   //分类本地存储
						}
						if(res.retData.productList==null){
							localStorage.setItem('productList', null);
						}else{
							localStorage.setItem('productList', res.retData.productList.toString());   //产品本地存储
						}
						if (this.couponType == '') {
							$(".jin").show();
							$(".zhe").show();
							$(".wuxian").show();
						}
						if (this.couponType == '1') {
							$(".jin").hide();
							$(".zhe").show();
							$(".xianzhi2 span").css('right', '35px');
							$(".wuxian").hide();
						}
						if (this.couponType == '2') {
							$(".jin").show();
							$(".zhe").hide();
							$(".wuxian").show();
						}
					} else {

					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//修改优惠券
			updataFee() {
				this.$refs.addArcForm.validate().then(success => {
					if (success) {
						if (this.isVaild == 2) {
							if (this.startTime == '' || this.startTime == null) {
								alert("请填写开始时间!");
								return false
							} else if (this.endTime == '' || this.endTime == null) {
								alert("请填写结束时间！");
								return false
							}
						}
						if (this.userType == 3) {
							if (this.userList == '' || this.userList == null) {
								alert("请勾选使用用户!");
								return false
							} else {

							}
						}
						if (this.categoryType == 2) {
							if (this.categoryList == '' || this.categoryList == null) {
								alert("请勾选分类!");
								return false
							} else {

							}
						}
						if (this.categoryType == 3) {
							if (this.projectList == '' || this.projectList == null) {
								alert("请勾选产品!");
								return false
							} else {

							}
						}
						var url = this.url + '/couponController/updateCoupon'
						this.UpdataScale(url)
					} else {
						this.$message.error('请填写完整！');
					}
				})
			},
			UpdataScale(url) {
				var formData = new FormData();
				if (this.userType == 1) {

				} else if (this.userType == 2) {

				} else if (this.userType == 3) {
					var userList = localStorage.getItem('userList');
					var stringResult1 = userList.split(',');
					for (var i = 0; i < stringResult1.length; i++) {
						formData.append('userList', stringResult1[i])
					}
				}

				if (this.categoryType == 1) {

				} else if (this.categoryType == 2) {
					var categoryList = localStorage.getItem('categoryList');
					var stringResult2 = categoryList.split(',');
					for (var i = 0; i < stringResult2.length; i++) {
						formData.append('categoryList', stringResult2[i])
					}
				} else if (this.categoryType == 3) {
					var projectList = localStorage.getItem('projectList');
					var stringResult = projectList.split(',');
					for (var i = 0; i < stringResult.length; i++) {
						formData.append('projectList', stringResult[i])
					}
				}
				if (this.isLimit == 1) {
					formData.append('fullCondition', this.fullCondition)
				} else {

				}
				if (this.isVaild == 2) {
					if (!this.isBlank(this.startTime)) {
						this.startTime = this.moment(this.startTime, "YYYY-MM-DD 00:00:00")
					}
					if (!this.isBlank(this.endTime)) {
						this.endTime = this.moment(this.endTime, "YYYY-MM-DD 23:59:59")
					}
					formData.append('startTime', this.startTime);
					formData.append('endTime', this.endTime);
				}
				//var couid = localStorage.getItem('couId');
				formData.append('couId', this.couId);
				formData.append('couponName', this.couponName);
				formData.append('state', this.state);
				formData.append('isVaild', this.isVaild);
				formData.append('userType', this.userType);
				formData.append('categoryType', this.categoryType);
				formData.append('limitGet', this.limitGet);
				formData.append('allCount', this.allCount);

				this.isDisable = true
				setTimeout(() => {
					this.isDisable = false
				}, 2000)

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': 'x-www-form-urlencoded',
						'Access-Token': this.accessToken
					},
					data: formData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.couponName = res.retData.couponName; //优惠券名称
						this.couId = res.retData.couId; //优惠券名称
						this.state = res.retData.state; //状态
						this.startTime = res.retData.startTime; //状态
						this.endTime = res.retData.endTime; //状态
						this.couponType = res.retData.couponType; //优惠券类型
						this.fullCondition = res.retData.fullCondition; //金额
						this.recude = res.retData.recude; //折扣
						this.isLimit = res.retData.isLimit; //使用门槛
						this.isVaild = res.retData.isVaild; //有效期
						this.userList = res.retData.userList; //用户集合
						this.projectList = res.retData.productList; //产品集合
						this.categoryList = res.retData.categoryList; //分类集合
						this.userType = res.retData.userType; //使用用户
						this.categoryType = res.retData.categoryType; //选择产品
						this.limitGet = res.retData.limitGet; //每人限领取
						this.allCount = res.retData.allCount; //发放机制
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
			getAditId() {
				this.couponId = ''
				this.couponId = this.$route.query.couId
				if (this.couponId != undefined && this.couponId != '') {
					this.addFee(this.couponId)

				}
			},
		},
		created() {
			this.getAditId();
		},
		mounted() {
			// this.getAditId();
			this.couId = '';
			this.couId = this.$route.query.couId;
			if (localStorage.getItem('couponName')) {
				this.couponName = localStorage.getItem('couponName');
				localStorage.removeItem('couponName');
			}
			if (localStorage.getItem('couId')) {
				this.couId = localStorage.getItem('couId');
				// localStorage.removeItem('operatorId');
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

	.xianhzi15 {
		margin-left: 8px;
		margin-right: 8px;
		float: left;
		margin-top: 10px;
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

	.shiyong .xianzhi3 .el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 195px;
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

	.shiyong .xianzhi2 input {
		width: 100%;
		text-align: center;
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
		text-align: center;
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
