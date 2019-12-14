<!-- the page of department management -->
<template>

	<div id="wraper" ref='wraper'>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">权限</h1>
		</div>
		<div id="tree">
			<dl v-bind:class="{noShow:bool1}">
			</dl>
			<dl v-for="(item , index) in moduleList" :key='index' v-bind:class="{noShow:bool2}">
				<dt v-bind:class="{bg5:bool2,bg8:!bool2}">
					<i class="fa" @click="onShow(2)" v-bind:class="{'fa-minus-square':bool2,'fa-plus-square':!bool2}" aria-hidden="true"></i>
					<span>
						<input type="checkbox" id="checkbox4"/>
						<label for="checkbox4" class="fa fa-check-square-o" aria-hidden="true"></label>
            			<label for="checkbox4" class="fa fa-square-o" aria-hidden="true"></label>
					</span>
					<b>{{item.name}}</b>
				</dt>
				<dd class="bg4" v-for="(item1,index1) in item.subMList" :key='index'>
					<span>
						<input type="checkbox" id="checkbox5"/>
						<label for="checkbox5" class="fa fa-check-square-o" aria-hidden="true"></label>
            			<label for="checkbox5" class="fa fa-square-o" aria-hidden="true"></label>
					</span>
					<b>{{item1.name}}</b>
				</dd>
			</dl>
			<!-- <dl v-bind:class="{noShow:bool3}">
				<dt v-bind:class="{bg5:bool3,bg7:!bool3}">
					<i class="fa" @click="onShow(3)" v-bind:class="{'fa-minus-square':bool3,'fa-plus-square':!bool3}" aria-hidden="true"></i>
					<span>
						<input type="checkbox" id="checkbox6"/>
						<label for="checkbox6" class="fa fa-check-square-o" aria-hidden="true"></label>
            			<label for="checkbox6" class="fa fa-square-o" aria-hidden="true"></label>
					</span>
					<b>基础设备</b>
				</dt>
				<dd class="bg3">
					<span>
						<input type="checkbox" id="checkbox7"/>
						<label for="checkbox7" class="fa fa-check-square-o" aria-hidden="true"></label>
            			<label for="checkbox7" class="fa fa-square-o" aria-hidden="true"></label>
					</span>
					<b>消费管理</b>
				</dd>
				<dd class="bg4">
					<span>
						<input type="checkbox" id="checkbox8"/>
						<label for="checkbox8" class="fa fa-check-square-o" aria-hidden="true"></label>
            			<label for="checkbox8" class="fa fa-square-o" aria-hidden="true"></label>
					</span>
					<b>消费管理</b>
				</dd>
			</dl> -->
		</div>
	</div>

</template>


<script>
	export default {
		components: {
		
		},
		data() {
			return {
				moduleList:[
					{
						name:"目录1",
						subMList:[
							{
								name:'目录1——1'
							},
							{
								name:'目录1——2'
							},
							{
								name:'目录1——3'
							}
						],
					},
					{
						name:"目录1",
						subMList:[
							{
								name:'目录1——1'
							},
							{
								name:'目录1——2'
							},
							{
								name:'目录1——3'
							}
						],
					},
					{
						name:"目录1",
						subMList:[
							{
								name:'目录1——1'
							},
							{
								name:'目录1——2'
							},
							{
								name:'目录1——3'
							}
						],
					}
				],
				bool1:false,
				bool2:false,
				bool3:false
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
	#tree{width:200px; margin-top:50px;}
	#tree dl{ margin-bottom:0; height:50px;overflow:hidden; color:#795548;font-size:20px; background:#fff; }
	#tree dl.noShow{height:auto; }
	#tree dl dt{height:50px;overflow:hidden;}
	#tree dl dt i{display:block;width:18px;height:50px;text-align:left;line-height:50px; float:left; margin-right:8px;overflow:hidden;}
	#tree dl span{position:relative;display:block;width:16px;height:16px;padding:17px 0;float:left;margin-right:8px;}
	#tree dl span input{position:absolute; left:0;top:17px; margin-top:0;opacity:0; z-index:9;}
	#tree dl span label{position:absolute; left:0;top:16px;}
	#tree dl span label.fa-check-square-o{display:none;}
	#tree dl span input:checked + label.fa-check-square-o{display:block;}
	#tree dl dt b{display:block;width:130px;height:50px;text-align:left;line-height:50px; float:left;}
	#tree dl dd{height:50px;text-align:left; text-indent:26px; overflow:hidden;}
	#tree dl dd b{display:block;width:150px;height:50px;text-align:left;line-height:50px; float:left;font-weight:normal}
	
	.bg1{background:url(../../assets/img/sub_bg1.jpg)}
	.bg2{background:url(../../assets/img/sub_bg2.jpg)}
	.bg3{background:url(../../assets/img/sub_bg3.jpg)}
	.bg4{background:url(../../assets/img/sub_bg4.jpg)}
	.bg5{background:url(../../assets/img/sub_bg5.jpg)}
	.bg6{background:url(../../assets/img/sub_bg6.jpg)}
	.bg7{background:url(../../assets/img/sub_bg7.jpg)}
	.bg8{background:url(../../assets/img/sub_bg8.jpg)}
</style>
