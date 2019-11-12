<template>
	<div class="g-center login-page container-fluid" @keyup.enter="login()" id="loincss">
		<div class="loincss01 row bg-logo">
			<!-- <h1 class="main-title">圣安收费管理系统</h1> -->
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style=" margin-top:30px; line-height: 34px;">
					账号：
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="margin-top:30px;">
					<input class="form-control" type="text" placeholder="请输入账号" v-model="accountName" style="width:100%" />
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style=" margin-top:30px; line-height: 34px;">
					密码：
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style=" margin-top:30px; ">
					<input class="form-control" placeholder="请输入密码" type="password" v-model="accountPwd" style="width:100%" />
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" margin-top:30px; margin-bottom:30px; ">
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-xs-offset-4">
					<button class="btn btn-primary" style="width:100%" @click="login()">{{btnText}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	/* @import '../assets/css/logincss.css'; */
</style>

<script>
	import axios from 'axios';
	import Cookies from 'js-cookie'
	var vm = null;
	export default {
		data() {
			return {
				accountName: '',
				accountPwd: '',
				accountData: {},
				btnText: '登录'
			};
		},
		methods: {
			login() {
				this.btnText = '登录中...';
				var url = this.url + "/accountAction/login";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						"accountNum": this.accountName,
						"accountPwd": this.accountPwd
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.accountData = response.data.retData;
						//后台写入cookie不成功，先由前端代替
						if(this.isUseSetCookie){
							//cookie存储大小为4k左右，进行cookie瘦身
							Cookies.set('accessToken', this.accountData.accessToken, { expires: this.accessTokenLife });
							Cookies.set('accountData', this.accountData.accountData, { expires: this.accountDataLife });
						}
						// alert("登录成功！"); //添加成功
						this.$parent.setRouter("/MainPage");
					} else {
						this.btnText = '登录';
						alert(response.data.retMsg);
					}
				}).catch((error) => {
						this.btnText = '登录';
						console.log("请求失败处理");
					}
				);
			},
			consoleLog() {
				console.log("accountData:" + this.accountInfo + "##" + this.$root.accessToken)
				console.log("Cookies:" + Cookies.get('accessToken'))
			}
		},
		created(){
			vm = this;
		}
	};
</script>
<style scoped>
	#app {
		display: table;
		width: 100%;
	}

	.main-title {
		text-align: center;
	}

	/* .des{text-align: center;color:#999;margin-bottom: 2em;} */
	.login-page {
		height: 100%;
		margin: 0 auto;
		position: relative;
		background: url(../../static/img/3-0.jpg) no-repeat;
		background-size: 100% 100%;
	}

	.loincss01 {
		position: relative;
		top: 50%;
		left:20%;
		margin: 0px auto;
		width: 20%;
		border-radius: 15px;
	}
	.bg-logo{
		background: rgba(255, 255, 255, 0.8)
	}
</style>
