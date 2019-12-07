<!-- add and modify order -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}排班</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="order.appName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="order.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预约时间</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker v-model="order.appDate" v-on:change="dateAction('1')" style="width:100%;"></dPicker>
						</div>	
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix" style="padding-right:0;">
						<div class="col-md-6" style="padding:0;">
							<h4 id="myModalLabel" class="modal-title pull-left">排班时间</h4>
						</div>
						<div class="col-md-6" style="padding:0;">
							<div class="case" style="float:right;">
								<input type="checkbox" id="allCheckbox" />
								<label for="allCheckbox">全选</label>
							</div>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<div class="row schDate"><b v-for="value in allDate">{{value}}</b></div>
						<div class="row schDate" style="margin-bottom:10px;"><span  v-for="value in allWeek">{{value}}</span></div>
						<div class="row schDate" style="margin-bottom:4px;">
							<div class="case">
								<input type="checkbox" id="checkbox1" />
								<label for="checkbox1">上午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox2"/>
								<label for="checkbox2">上午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox3"/>
								<label for="checkbox3">上午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox4"/>
								<label for="checkbox4">上午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox5"/>
								<label for="checkbox5">上午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox6"/>
								<label for="checkbox6">上午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox7"/>
								<label for="checkbox7">上午</label>
							</div>
						</div>
						<div class="row schDate">
							<div class="case">
								<input type="checkbox" id="checkbox8"/>
								<label for="checkbox8">下午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox9"/>
								<label for="checkbox9">下午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox10"/>
								<label for="checkbox10">下午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox11"/>
								<label for="checkbox11">下午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox12"/>
								<label for="checkbox12">下午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox13"/>
								<label for="checkbox13">下午</label>
							</div>
							<div class="case">
								<input type="checkbox" id="checkbox14"/>
								<label for="checkbox14">下午</label>
							</div>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12" style="padding-right:0;">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:.7%;" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="addOrder(title)">确认</button>
						</div>
					</div>
				</form>
			</div>
	
		</div>
		
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	export default {
		components:{
			dPicker,
			emp,
		},
		data() {
			return {
				order:{
					memNum:'',
					appName:'',
					phone:'',
					visitType:'0',
					appDate:'',
					empId:'1',//操作人
					createDate:'',
					clerkEmpId:'',
					counlorEmpId:'',
					operatorId:'',
				},
				title:'新增',
				value6:null,
				allDate:[],
				allWeek:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
			};
		},
		methods:{
			// Initialization order’s content
			initData(param,order) {
				if(param=='add'){
					console.log('Initialization order’s content, which adds order')
					this.title='新增'
					this.order={
						memNum:'',
						appName:'',
						phone:'',
						visitType:'0',
						appDate:this.moment('','YYYY-MM-DD HH:mm:ss.000'),
						empId:'1',//操作人
						clerkEmpId:'',//文员
						counlorEmpId:'',//咨询师
						operatorId:this.accountId(),//操作人
					}
					// this.$refs.clerkEmp.setPosName('文员')
					this.$refs.counlorEmp.setPosName('咨询顾问')
					// this.$refs.clerkEmp.setEmp(this.order.clerkEmpId)
					this.$refs.counlorEmp.setEmp(this.order.counlorEmpId)
				}else if(param=='modify'){
					console.log('Initialization order’s content, which modifies order')
					this.title='修改'
					Object.assign(this.order,order)
					this.operatorId = this.accountId()
					// this.$refs.clerkEmp.setPosName('文员')
					this.$refs.counlorEmp.setPosName('咨询顾问')
					// this.$refs.clerkEmp.setEmp(this.order.clerkEmpId)
					this.$refs.counlorEmp.setEmp(this.order.counlorEmpId)
				}
			},
			//date formatting 
			dateAction(param){
				if(param=='1'){
					if(!this.isBlank(this.order.appDate)){
						this.order.appDate=this.moment(this.order.appDate,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.order.appDate=''
					}
				}else if(param=='2'){
					if(!this.isBlank(this.order.outHosp)){
						this.order.outHosp=this.moment(this.order.outHosp,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.order.outHosp=''
					}
				}
			},
			//feedback employee information
			clerkEmpChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.order.clerkEmpId = ""
				} else {
					this.order.clerkEmpId = param.empId
				}
				console.log('员工：' + this.order.empId)
			},
			//feedback employee information
			counlorEmpChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.order.counlorEmpId = ""
				} else {
					this.order.counlorEmpId = param.empId
				}
				console.log('员工：' + this.order.counlorEmpId)
			},
			
			//the event of addtional button
			addOrder(param){
				var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;
				if(this.isBlank(this.order.appName)){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.order.phone)){
					alert("手机号不能为空")
					return
				}else if(reg.test(this.order.phone)==false){
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				}
				
				if(this.isBlank(this.order.counlorEmpId)){
					alert('咨询顾问不能为空')
					return
				}
				if(!this.isBlank(this.order.appDate)){
					this.order.appDate=this.moment(this.order.appDate,'YYYY-MM-DD HH:mm:ss.000')
				}else{
					alert("预约时间不能为空")
					return
				}
				switch(param){
					case '新增':
						var url = this.url + '/appointmentAction/addAppointment';
						break;
					case '修改':
						var url = this.url + '/appointmentAction/updateAppointment'
						break;	
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.order,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addOrder')
						$("#orderContent").modal("hide");
					}
				}).catch((error) => {
					console.log('预约提交请求失败')
				});
			},
			closeCurrentPage(){
				$("#scheduleContent").modal("hide")
				console.log('关闭添加患者界面')
			},
			//Query member's information based on the memNum
			checkMemNum(param) {
				console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
				var url = this.url + '/memberAction/queryMember'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						console.log('查到了'+JSON.stringify(res))
						
						this.order.memNum=res.retData[0].memNum
						this.order.appName=res.retData[0].memName
						this.order.phone=res.retData[0].phone
					} else {
						console.log('没有查到会员信息，请添加会员后充值')
						this.consume.appName=''
						this.consume.phone=''
					}
							
				}).catch((error) => {
					console.log('会员查询请求失败')
				});
			},
			formatDate(date) {
				var myyear = date.getFullYear();
				var mymonth = date.getMonth() + 1;
				var myweekday = date.getDate();
				if (mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				if (myweekday < 10) {
					myweekday = "0" + myweekday;
				}
				return mymonth + "." + myweekday
			},
			// 获取指定日期的那一周的开始、结束日期
			getWeekStartAndEnd(val) {
				let now = '';
				if(val) {
					now = new Date(val); // 日期
				} else {
					now = new Date(); // 日期
				}
				let nowDayOfWeek = now.getDay(); // 本周的第几天
				let nowDay = now.getDate(); // 当前日
				let nowMonth = now.getMonth(); // 当前月
				let nowYear = now.getYear(); // 当前年
				let date = new Date()
				let fullYear = date.getFullYear();
				let weekStart = fullYear + '.' + this.getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
				let weekEnd = fullYear + '.' + this.getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
				let alldate = this.getAll(weekStart,weekEnd);
				let result = this.chinaDate(alldate);
				this.allDate = result
			},
			//日期转换
			chinaDate(array){
				var newArr = [];
				for(var i=0;i<array.length;i++){
					newArr[i] = array[i].replace('/','月')+'日'; 
				}
				return newArr;
			},
			// 获得某一周的开始日期
			getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
				let weekStartDate = new Date(nowYear, nowMonth, nowDay - (nowDayOfWeek-1))
				return this.formatDate(weekStartDate)
			},
			// 获得某一周的结束日期
			getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
				let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))
				return this.formatDate(weekEndDate)
			},
			// 计算续住的总日期列表
			getAll(begin, end) {
				let arr1= begin.split(".");
				let arr2= end.split(".");
				let arr1_= new Date();
				let arrTime = [];
				arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
				let arr2_= new Date();
				arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
				let unixDb = arr1_.getTime();
				let unixDe = arr2_.getTime();
				for (let k = unixDb; k <= unixDe;) {
					arrTime.push(this.datetimeparse(k, 'MM/DD'));
					k = k + 24 * 60 * 60 * 1000;
				}
				return arrTime;
			},
			
			// 时间格式处理
			datetimeparse (timestamp, format, prefix) {
				if (typeof timestamp =='string'){
					timestamp=Number(timestamp)
				};
				//转换时区
				let currentZoneTime = new Date (timestamp);
				let currentTimestamp = currentZoneTime.getTime ();
				let offsetZone = currentZoneTime.getTimezoneOffset () / 60;//如果offsetZone>0是西区，西区晚
				let offset = null;
				//客户端时间与服务器时间保持一致，固定北京时间东八区。
				offset = offsetZone + 8;
				currentTimestamp = currentTimestamp + offset * 3600 * 1000

				let newtimestamp = null;
				if (currentTimestamp) {
					if (currentTimestamp.toString ().length === 13) {
						newtimestamp = currentTimestamp.toString ()
					} else if (currentTimestamp.toString ().length === 10) {
						newtimestamp = currentTimestamp + '000'
					} else {
						newtimestamp = null
					}
				} else {
					newtimestamp = null
				}
				;
				let dateobj = newtimestamp ? new Date (parseInt (newtimestamp)) : new Date ()
				let YYYY = dateobj.getFullYear ()
				let MM = dateobj.getMonth () > 8 ? dateobj.getMonth () + 1 : '0' + (dateobj.getMonth () + 1)
				let DD = dateobj.getDate () > 9 ? dateobj.getDate () : '0' + dateobj.getDate ()
				let HH = dateobj.getHours () > 9 ? dateobj.getHours () : '0' + dateobj.getHours ()
				let mm = dateobj.getMinutes () > 9 ? dateobj.getMinutes () : '0' + dateobj.getMinutes ()
				let ss = dateobj.getSeconds () > 9 ? dateobj.getSeconds () : '0' + dateobj.getSeconds ()
				let output = '';
				let separator = '/'
				if (format) {
					separator = format.match (/-/) ? '-' : '/'
					output += format.match (/yy/i) ? YYYY : ''
					output += format.match (/MM/) ? (output.length ? separator : '') + MM : ''
					output += format.match (/dd/i) ? (output.length ? separator : '') + DD : ''
					output += format.match (/hh/i) ? (output.length ? ' ' : '') + HH : ''
					output += format.match (/mm/) ? (output.length ? ':' : '') + mm : ''
					output += format.match (/ss/i) ? (output.length ? ':' : '') + ss : ''
				} else {
					output += YYYY + separator + MM + separator + DD
				}
				output = prefix ? (prefix + output) : output

				return newtimestamp ? output : ''
			},
			addDate() {
				let nowDate = new Date();
				let date2 = new Date(nowDate);
				//date2.setDate(nowDate.getDate()+1)
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate(),
					weekday:date2.getDay()
				}
				let systemDate ="";
				if(date.weekday === 0){
					systemDate = date.year + '-'  + date.month + '-' + date.date;
				}else{
    				date2.setDate(nowDate.getDate()+7);
    				systemDate = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
				}
				return systemDate;
				
			}
				
		},
		mounted() {
			let today = this.addDate();
			this.getWeekStartAndEnd(today);
		}
		
	}
</script>

<style>
	.schDate{
		display:flex;
		justify-content: space-between
	}
	.schDate b{
		width:80px;
		line-height:34px;
	}
	.schDate span{
		width:80px;
		font-size:12px;
		color:#A9A9AC;
	}
	.case{
		position:relative;
		width:76px;
		height:34px;
		font-size:14px;
		line-height:34px;
		background:#F7F7F8;
		color:#999;
		overflow:hidden;
	}
	.case label{
		position:relative;
		display:block;
		width:100%;
		height:100%;
		margin-bottom: 0px;	
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently */
	}
	.case input{
		position:absolute;
		left:0;
		top:0;
		display:block;
		width:100%;
		height:100%;
		opacity:0;
		margin-top:0;
	}
	.case input:checked + label{
		box-sizing:border-box;
		border:#F2AD4E solid 1px;
		background:#FFF5EA;
		color:#EBCFA9;
	}
	.case input:checked + label:after{
		position:absolute;
		right:-15px;
		top:-15px;;
		display:block;
		width:30px;
		height:30px;
		background:#F2AD4E;
		border-radius:50%;
		font-size:12px;
		color:#fff;
		text-align:left;
		text-indent:5px;
		line-height:42px;
		overflow:hidden;
		content: '√';
		font-family:Verdana, Geneva, sans-serif;
		font-weight:normal;
	}
</style>

