<!-- add and modify Addingfees -->
<template>

	<div class="modal-content" id="printMe">
	<!--打印内容开始-->
		<div class="modal-header">
			<h4 id="myModalLabel" class="modal-title">收 据 <span style="float:right;  position:absolute; right:0; font-size: 14px;">NO.__________</span></h4>
			
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="">
							<div class="row">
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0;">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right" style="padding:0;line-height: 34px;">
										<p>住院号：</p>
									</div>
									<p class="col-xs-6 col-sm-6 col-md-6 col-lg-6 p text-center">{{patient.hospNum}}</p>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0;">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right" style="padding:0;line-height: 34px;">
										<p>姓名：</p>
									</div>
									<p class="col-xs-6 col-sm-6 col-md-6 col-lg-6 p text-center">{{patient.name}}</p>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0;">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right" style="padding:0;line-height: 34px;">
										<p>性别：</p>
									</div>
									<p class="col-xs-6 col-sm-6 col-md-6 col-lg-6 p text-center">{{patient.sex==1 ? '男' : '女'}}</p>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0;">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right" style="padding:0;line-height: 34px;">
										<p>年龄：</p>
									</div>
									<p class="col-xs-6 col-sm-6 col-md-6 col-lg-6 p text-center">{{patient.age}}</p>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0;">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right" style="padding:0;line-height: 34px;">
										<p>科室：</p>
									</div>
									<p class="col-xs-6 col-sm-6 col-md-6 col-lg-6 p text-center">{{patient.deptName}}</p>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0;">
									<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right" style="padding:0;line-height: 34px;">
										<p>收费时间：</p>
									</div>
									<p class="col-xs-6 col-sm-6 col-md-6 col-lg-6 p text-center">{{patient.hospTime  | dateFormatFilter('YYYY-MM-DD')}}</p>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0;">
									<div class="table-responsive">
										<table class="table table-bordered table-hover user-table" id="datatable">
											<thead>			
												<tr>
													<th class="text-center">收费项目</th>
													<th class="text-center">交费金额</th>
													<th class="text-center">起始日期</th>
													<th class="text-center">结束日期</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item,index) in paymentList" :key='index' class="text-center">
													<td>{{item.payserviceName}}</td>
													<td>{{item.actualpayment}}</td>
													<td>{{item.begtime}}</td>
													<td>{{item.endtime}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"  style="padding: 0;">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
							<p>合计：</p>
						</div>
						<p class="col-xs-8 col-sm-8 col-md-8 col-lg-8 p text-left">{{'¥ ' + calculateTotleCost()}}</p>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"  style="padding: 0; padding-bottom:1.5%">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
							<p>人民币大写：</p>
						</div>
						<p class="col-xs-8 col-sm-8 col-md-8 col-lg-8 p  text-left">{{number_chinese(calculateTotleCost())}}</p>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"  style="padding: 0;">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
							<p>收款人：</p>
						</div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="height: 34px;border-bottom:1px solid #000 ">
							
						</div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
							<p>交款人：</p>
						</div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="height: 34px;border-bottom:1px solid #000 ">
							
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="form-group-btn">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="doPrint()">打印</button>
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="closeCurrentPage()">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	<!--打印内容结束-->
	</div>

</template>

<script>
	
	export default {
		
		data() {
			return {
				patient:{},
				projectList:[],
				title:"222",
				paymentList:[],
				projectLength:0,
			};
		},
		methods:{
			initData(patient){
				this.receiptChargeInfo(patient)
				this.patient=patient
			},
			doPrint () {
				document.getElementById('form-group-btn').style.display="none"
				// 1.设置要打印的区域 div的className
				var newstr = document.getElementById('printMe').innerHTML
				// 2. 复制给body，并执行window.print打印功能
				document.body.innerHTML = newstr
				// 3. 还原：将旧的页面储存起来，当打印完成后返给给页面。
				var oldstr = document.body.innerHTML
				//去掉页眉页脚
				var hkey_path;
                hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
                try {
					var RegWsh = new ActiveXObject("WScript.Shell");
					RegWsh.RegWrite(hkey_path + "header", "");
					RegWsh.RegWrite(hkey_path + "footer", "");
                } catch (e) {
				}
				//
				window.print()
				document.body.innerHTML = oldstr
				// 4. 重新加载页面，以刷新数据
				window.location.reload()
			},
			number_chinese(num) {
                    var strOutput = "",
                        strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
                    num += "00";
                    var intPos = num.indexOf('.');  
                    if (intPos >= 0){
                        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
                    }
                    strUnit = strUnit.substr(strUnit.length - num.length);
                    for (var i=0; i < num.length; i++){
                        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
                    }
                    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")

            },
			//check the charge information of patient
			receiptChargeInfo(param) {
				// console.log('checkProject')
				var url = this.url + '/patientAction/queryPatientPaymentByIdTime'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						patientId: param.PATIENT_ID,
						paymenttime: this.moment(param.PAYMENTTIME,'YYYY-MM-DD HH:mm:ss.000'),
						isuse:'1',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.patient=res.retData
						if (res.retData.paymentList.length > 0) {
							this.paymentList=this.patient.paymentList
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//check the list of project
			checkProject() {
				console.log('checkProject')
				var url = this.url + '/payserviceAction/queryPayservice'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						name: this.name,
						isuse: '1',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.projectList = res.retData
						}
					} else {
						alert(res.retMsg)
					}
			
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			calculateTotleCost(){
				var totleCost=0
				for(var i=0; i < this.paymentList.length; i++)
				{
					totleCost = totleCost + this.paymentList[i].actualpayment
				}
				
				return totleCost
			},
			closeCurrentPage(){
				$("#receipt").modal("hide")
			},
		},
		created() {
		}
	}
</script>

<style>
.mx-calendar-icon{ height: auto}
.p{ padding: 0; height:34px; line-height: 34px; border-bottom: 1px solid #000}
</style>
