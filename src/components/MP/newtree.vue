<!-- the page of department management -->
<template>

	<div id="wraper" ref='wraper'>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">权限</h1>
		</div>
		<v-tree :data="treeData" checkable multiple @select="selectFn" @check="checkFn" show-line></v-tree>
	</div>

</template>


<script>
	import Vue from 'vue'
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
				treeData: [
					{
						title: '目录1',
						expanded: true,
						selected: true,
						children: [
							{
								title: '目录1——1',
								expanded: true,
								children: [{
									title: 'leaf',
									disableCheckbox: true
								}, {
									title: 'leaf',
								}]
							}, 
							{
								title: '目录1——2',
								checked: true,
								children: [{
									title: "<span style='color: #08c'>sss</span>"
								}]
							},
							{
								title: '目录1——3',
								checked: true,
								children: [{
									title: "<span style='color: #08c'>sss</span>"
								}]
							}
						]
					},
					{
						title: '目录1',
						expanded: true,
						selected: true,
						children: [
							{
								title: '目录1——1',
								expanded: true,
								children: [{
									title: 'leaf',
									disableCheckbox: true
								}, {
									title: 'leaf',
								}]
							}, 
							{
								title: '目录1——2',
								checked: true,
								children: [{
									title: "<span style='color: #08c'>sss</span>"
								}]
							},
							{
								title: '目录1——3',
								checked: true,
								children: [{
									title: "<span style='color: #08c'>sss</span>"
								}]
							}
						]
					},
					{
						title: '目录1',
						expanded: true,
						selected: true,
						children: [
							{
								title: '目录1——1',
								expanded: true,
								children: [{
									title: 'leaf',
									disableCheckbox: true
								}, {
									title: 'leaf',
								}]
							}, 
							{
								title: '目录1——2',
								checked: true,
								children: [{
									title: "<span style='color: #08c'>sss</span>"
								}]
							},
							{
								title: '目录1——3',
								checked: true,
								children: [{
									title: "<span style='color: #08c'>sss</span>"
								}]
							}
						]
					}
				]
			};
		},
		methods: {
			onShow(num){
				if(num==1){
					this.bool1 = !this.bool1;
				}else if(num==2){
					this.bool2 = !this.bool2;
				}else if(num==3){
					this.bool3 = !this.bool3;
				}
			}
			
		},
		mounted () {
			window.addEventListener('scroll',this.handleScroll,true);
			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
			let realH = (h-767)*2/3+580+'px';
			this.$refs.wraper.style="height:"+realH;
		},
		created() {
		 
		}
	}
</script>

<style>
	.ant-tree{
		text-align:left;
	}
</style>
