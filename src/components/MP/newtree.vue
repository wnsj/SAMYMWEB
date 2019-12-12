<!-- the page of department management -->
<template>

	<div id="wraper" ref='wraper'>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">权限管理</h1>
		</div>
		<div id="tree">
			<dl v-bind:class="{noShow:bool1}">
				<dt  v-bind:class="{bg1:num==0,bg2:num!=0}">
					<i class="fa" @click="onShow(1)" v-bind:class="{'fa-minus-square':num==0,'fa-plus-square':num!=0}" aria-hidden="true"></i>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-square-o':num==0,'fa-square-o':num!=0}" aria-hidden="true"></span>
					<b>会员管理模块</b>
					<div style="clear:both"></div>	
				</dt>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==0,'fa-plus-square':num!=0}" aria-hidden="true"></span>
					会员汇总
				</dd>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==0,'fa-plus-square':num!=0}" aria-hidden="true"></span>
					会员基本信息
				</dd>
			</dl>
			<dl v-bind:class="{noShow:bool2}">
				<dt v-bind:class="{bg5:num==1,bg8:num!=1}">
					<i class="fa" @click="onShow(2)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></i>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-square-o':num!=1}" aria-hidden="true"></span>
					<b>消费管理模块</b>
				</dt>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>	
			</dl>
			<dl v-bind:class="{noShow:bool3}">
				<dt v-bind:class="{bg5:num==2,bg8:num!=2}">
					<i class="fa" @click="onShow(3)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></i>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-square-o':num!=1}" aria-hidden="true"></span>
					<b>基础设备</b>
				</dt>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>
				<dd>
					<span class="fa" @click="onShow(0)" v-bind:class="{'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true"></span>
					消费管理模块
				</dd>
			</dl>
		</div>
	</div>

</template>


<script>
	export default {
		components: {
		
		},
		data() {
			return {
				bool1:false,
				bool2:false,
				bool3:false,
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
			let tabH = (h-767)/3+400+'px';
			this.$refs.wraper.style="height:"+realH;
			this.$refs.showMainTab.style="max-height:"+tabH;
		},
		created() {
		 
		}
	}
</script>

<style>
	#tree{width:200px;border:1px solid #ccc;}
	#tree dl{ margin-bottom:0; height:50px;overflow:hidden; color:#795548;font-size:20px; background:#fff; }
	#tree dl.noShow{height:auto; }
	#tree dl dt{height:50px;overflow:hidden;}
	#tree dl dt i{display:block;width:18px;height:50px;text-align:left;line-height:50px; float:left; margin-right:8px;}
	#tree dl dt span{display:block;width:16px;height:50px;text-align:left;line-height:52px; float:left;margin-right:8px;}
	#tree dl dt b{display:block;width:130px;height:50px;text-align:left;line-height:50px; float:left;}
	#tree dl dd{height:50px;text-align:center;}
	#tree dl dd:hover{background:#f5f5f5;color:#603b2c;}
	
	.bg1{background:url(../../assets/img/sub_bg1.jpg)}
	.bg2{background:url(../../assets/img/sub_bg2.jpg)}
	.bg3{background:url(../../assets/img/sub_bg3.jpg)}
	.bg4{background:url(../../assets/img/sub_bg4.jpg)}
	.bg5{background:url(../../assets/img/sub_bg5.jpg)}
	.bg6{background:url(../../assets/img/sub_bg6.jpg)}
	.bg7{background:url(../../assets/img/sub_bg7.jpg)}
	.bg8{background:url(../../assets/img/sub_bg8.jpg)}
</style>
