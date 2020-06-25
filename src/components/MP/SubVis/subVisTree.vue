<!-- add and modify visitor -->
<template>
	<div class="tree-content">
		<div class="tree-header">
			<span>{{visitor.visitorName}}</span>
			<button type="button" class="btn btn-warning treeBtn" @click="addreason">添加原因/备注</button>
			<button type="button" aria-hidden="true" class="close jh-mr-30 jh-mt-22" v-on:click="closeCurrentPage()">×</button>
		</div>
		<div class="tree-body">
			<div class="tree-main">
				<div class="line"><span></span></div>
				<div class="tree-item" v-for="(item,index) in infoData" :key="index">
					<h1 v-if="item.bool">{{item.createTime}}</h1>
					<div class="tree-type clearfix">
						<div class="tree-type-left">
							<label :for="'tree'+(index+1)">
								<input :id="'tree'+(index+1)" class="tree-radio" type="radio" name="tree" :value="index" v-model="checkedValue" />
								<span></span>
								<i></i>
								{{item.title}}
							</label>
						</div>
						<div class="tree-type-right">
							<ul>
								<li>产品</li>
								<li>课时</li>
								<li>访问类型</li>
								<li>客户判定</li>
								<li>续流状态</li>
								<li>咨询师</li>
								<li>助理</li>
								<li>跟进人</li>
							</ul>
							<ul class="treeCon">
								<li>{{item.proName}}</li>
								<li>{{item.totalCount}}</li>
								<li>{{item.visitType}}</li>
								<li>{{item.isfirst}}</li>
								<li>{{item.continState}}</li>
								<li>{{item.counselorName}}</li>
								<li>{{item.empName}}</li>
								<li>{{item.followUpPerson}}</li>
							</ul>
							<p class="clearfix"><b>原因：</b><span>{{item.reason}}</span></p>
							<p class="clearfix"><b>备注：</b><span>{{item.remark}}</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="treeson" id="treeson">
			<treeson ref='treeson' @certainAction='feedBack6'></treeson>
		</div>
	</div>
</template>

<script>
	import treeson from './TreeReason.vue'
	export default {
		components: {
			treeson,
		},
		data() {
			return {
				visitor: {
					visitorName: '',
				},
				checkedValue: 0,
				infoData:[],
				
			};
		},
		methods: {
			// Initialization visitor’s content
			initData(visitorContent) {
				this.visitor = {
					visitorName: '',
				}
				Object.assign(this.visitor, visitorContent);
				this.certainAction();
				
			},
			certainAction() {
				var url = this.url + '/consumAction/getDetailsByVisitor';
				var json={
					'memNum':this.visitor.visId
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: json,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.arrangeData (res.retData)
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
	
				});
			},
			feedBack6() {
				this.certainAction()
			},
			closeCurrentPage() {
				$("#subVisTree").hide();
			},
			arrangeData (redata){
				var oData = redata;
				oData.forEach((data,index,arrs)=>{
					if(index ===0){
						data['bool'] = true;
					}
					arrs.forEach((arr,num)=>{	
						if(index>num){
							if(data['createTime'] === arr['createTime']){
								data['bool'] = false;
								return ;
							}else{
								data['bool'] = true;
								return ;
							}
						}	
					})			
				})
				this.infoData = oData;	
			},
			addreason(){
				this.$refs.treeson.initData(this.visitor.visitorName,this.infoData[this.checkedValue])
				$("#treeson").css({'display':'flex'});
			}

		},
		mounted(){
		
		}
	}
</script>

<style>
	.tree-content{
		position: relative;
		width:100%;
		height: 100%;
		overflow: hidden;
	}
	.tree-header{
		position:absolute;
		top: 0;
		left: 0;
		width: 100%;
		height:60px;
		z-index: 1;
		background: #fff;
	}
	.tree-header span{
		float: left;
		margin-left: 90px;
		font-size: 24px;
		line-height: 60px;
		color: #000;
	}
	.tree-header .treeBtn{
		float: left;
		margin-left: 15px;
		margin-top: 13px;
	}
	.tree-body{
		width:105%;
		height:100%;
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y:scroll;
	}
	.tree-main{
		position: relative;
		width:100%;
		height:auto;
		padding-bottom:50px ;
	}
	.tree-body .line{
		position:absolute;
		left: 90px;
		top: 0;
		width: 1px;
		height: 100%;
		background: #c9dedb;
		box-sizing: border-box;	
	}
	.tree-body .line span{
		display: block;
		width: 100%;
		height:10px;
		background: #fff;
	}
	.tree-body .tree-item h1{
		position: relative;
		height:30px;
		line-height: 30px;
		text-align: left;
		text-indent: 105px;
		font-size: 20px;
		margin-top: 60px;
	}
	.tree-body .tree-item h1:after{
		position:absolute;
		left:85px;
		top:0;
		bottom: 0;
		margin: auto 0;
		display:block;
		content: ' ';
		width:11px;
		height:11px;
		background:#4b8aeb;
		border-radius:50%;
	}
	.tree-body .tree-item .tree-type{
		margin-top: 15px;
	}
	.tree-body .tree-item .tree-type .tree-type-left{
		position: relative;
		float: left;
		width:90px;
		height:24px;
	}
	.tree-body .tree-item .tree-type .tree-type-left .tree-radio{
		position: absolute;
		left:15px;
		top:2px;
		display: block;
		width: 20px;
		height: 20px;
		opacity: 0;
	}
	.tree-body .tree-item .tree-type .tree-type-left span{
		position: absolute;
		left:15px;
		top:4px;
		display: block;
		width: 16px;
		height: 16px;
		box-sizing: border-box;
		border:1px solid #979797;
		border-radius: 50%;
	}
	.tree-body .tree-item .tree-type .tree-type-left input:checked + span{
		background: #3c86f1;
		border: none;
	}
	.tree-body .tree-item .tree-type .tree-type-left input:checked + span:after{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 8px;
		height: 8px;
		margin: auto;
		display: block;
		content: '';
		background: #fff;
		border-radius: 50%;
		
	}
	.tree-body .tree-item .tree-type .tree-type-left label{
		display: block;
		width: 100%;
		height: 100%;
		font-size: 16px;
		line-height: 24px;
		text-indent: 40px;
		text-align: left;
		user-select: none;
		font-weight: bold;
	}
	/* .tree-body .tree-item .tree-type .tree-type-left label.tree-orange{
		color: #f0ad4e;
	}
	.tree-body .tree-item .tree-type .tree-type-left label.tree-green{
		color: #5cb85c;
	}
	.tree-body .tree-item .tree-type .tree-type-left label.tree-red{
		color:#f00
	} */
	.tree-body .tree-item .tree-type .tree-type-left i{
		position: absolute;
		right: -5px;
		top: 7px;
		display: block;
		width:9px;
		height: 9px;
		border: 1px solid #c9dedb;
		background: #fff;
		border-radius: 50%;
	}
	.tree-body .tree-item .tree-type .tree-type-right{	
		float: left;	
	}
	.tree-body .tree-item .tree-type .tree-type-right ul{	
		height:24px;
		margin-left: 15px;
		margin-bottom: 1px;	
	}
	.tree-body .tree-item .tree-type .tree-type-right ul li{
		background: #f2f2f2;
		float: left;
		width: 68px;
		height:24px;
		font-size: 12px;
		color: #000;
		margin-left: 1px;
		line-height: 24px;
		text-align: center;
		padding: 0 2px;
		font-weight: bold;
	}
	.tree-body .tree-item .tree-type .tree-type-right ul.treeCon li{
		color:#666;
		font-weight: normal;
	}
	.tree-body .tree-item .tree-type .tree-type-right p{
		display: block;
		width:552px;
		background: #f2f2f2;
		margin-bottom: 1px;
		margin-left: 15px;
		text-align: left;
		line-height: 24px;
		padding: 0 4px;
	}
	.tree-body .tree-item .tree-type .tree-type-right p b{
		display: inline-block;
		width:7%;
		float:left;
	}
	.tree-body .tree-item .tree-type .tree-type-right p span{
		display: inline-block;
		width:93%;
		text-align: justify;
		float:left;
		color: #666;
	}
	.treeson{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		width:100%;
		height:100%;
		background: rgba(0, 0, 0, .4);
		display: none;
		justify-content: center;
		align-items: center;
	}
</style>
