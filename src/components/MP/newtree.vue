<!-- the page of department management -->
<template>
<div>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">权限</h1>
		</div>
		<v-tree :data="ruleData" checkable multiple @select="selectFn(ruleData)" @check="checkFn(ruleData)" show-line></v-tree>
	</div>
	<div>
		<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
		 v-on:click="ruleAction()">添加</button>
	</div>
</div>
</template>


<script>
	import Vue from 'vue'
	import {
		init
	} from '@/../static/js/common.js'
    //import css
    import 'vue-beauty/package/style/vue-beauty.min.css'
    //import components
    import vueBeauty from 'vue-beauty'
    Vue.use(vueBeauty)

    //OR
    import {alert} from 'vue-beauty'
	export default {
		components: {
		
		},
		data() {
			return {
				moduleList:[],
				ruleData: [],
// 					{
// 						title: '目录2',
// 						expanded: true,
// 						selected: true,
// 						children: [
// 							{
// 								title: '目录2——1',
// 								// expanded: true,
// 								checked: true,
// 								children: [
// 									{
// 										title: '目录2—1—1',
// 										// expanded: true,
// 										checked: true,
// 									}, 
// 									{
// 										title: '目录2—1—2',
// 										checked: false,
// 									},
// 									{
// 										title: '目录2—1—3',
// 										checked: true,
// 									}
// 								]
// 							}, 
// 							{
// 								title: '目录2——2',
// 								checked: false,
// 							},
// 							{
// 								title: '目录2——3',
// 								checked: true,
// 							}
// 						]
// 					}
				// ]
			};
		},
		methods: {
			selectFn(item){
				// console.log(JSON.stringify(item))
			},
			checkFn(item){
				console.log(JSON.stringify(item))
			},
			ruleAction(){
				var url = this.url + '/ruleAction/newAddRule'
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.ruleData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					alert(res.retMsg)
				}).catch((error) => {
					console.log('权限添加请求')
				});
			},
			getModule() {
			  var url = this.url + '/moduleAction/queryModule'
			  this.$ajax({
			  	method: 'POST',
			  	url: url,
			  	headers: {
			  		'Content-Type': this.contentType,
			  		'Access-Token': this.accessToken
			  	},
			  	data: {
				// isuse:'1'
			  	},
			  	dataType: 'json',
			  }).then((response) => {
			  	var res = response.data
			  	if (res.retCode == '0000') {
			  		if (res.retData.length > 0) {
			  			this.moduleList = res.retData
						this.structrueRule()
			  		}
			  	} else {
			  		alert(res.retMsg)
			  	}
			  
			  }).catch((error) => {
			  	console.log('岗位数据请求失败处理')
			  });
			},
			//构造权限数据
			structrueRule(){
				for(var i=0;i < this.moduleList.length;i++){
					var element = {
						title: '目录1',
						expanded: true,
						selected: true,
						moduleId:'',
						moduleGrade:'1',
						children: [
							{
								title: '添加',
								moduleGrade:'2',
								operateType:'1',
								checked: false,
							}, 
							{
								title: '修改',
								moduleGrade:'2',
								operateType:'3',
								checked: true,
							},
							{
								title: '删除',
								moduleGrade:'2',
								operateType:'2',
								checked: false,
							},
							{
								title: '查询',
								moduleGrade:'2',
								operateType:'4',
								disableCheckbox: true
							}
						]
					}
					var moduleElement = this.moduleList[i]
					element.moduleId = moduleElement.moduleId
					element.title=moduleElement.moduleName
					element.children[0].title=moduleElement.moduleName+"-"+"添加"
					element.children[0].title=moduleElement.moduleName+"-"+"修改"
					element.children[0].title=moduleElement.moduleName+"-"+"删除"
					element.children[0].title=moduleElement.moduleName+"-"+"查询"
					this.ruleData.push(element)
				}
				
			},
			
		},
		mounted () {
			window.addEventListener('scroll',this.handleScroll,true);
			init();
		},
		created() {
		 this.getModule()
		}
	}
</script>

<style>
	.ant-tree{
		text-align:left;
	}
</style>
