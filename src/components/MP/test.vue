<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">商铺管理</h1>
		</div>
		
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div v-for="(item1,index1) in problemList">
					<div>
						<p>{{item1.problem}}</p>
					</div>
					<div v-for="(item2,index2) in item1.answer">
						<!-- 选择框 -->
						<p>{{item2.answerContent1}}</p>
						<p>{{item2.answerContent2}}</p>
					</div>
				</div>
			</div>

		</div>
		
	</div>

</template>


<script>
	import SubStore from '../MP/SubStore/SubStore.vue'
	export default {
		components: {
			SubStore,
		},
		data() {
			return {
				problemList: [{
						problem: '问题1？',
						answer: [{
								isSelect: '0',
								answerContent1: 'a',
								answerContent2: '',
							},
							{
								isSelect: '0',
								answerContent1: 'b',
								answerContent2: '',
							},
							{
								isSelect: '0',
								answerContent1: 'c',
								answerContent2: '',
							},
							{
								isSelect: '0',
								answerContent1: 'd',
								answerContent2: '空白',
							},
							{
								isSelect: '0',
								answerContent1: 'e',
								answerContent2: '空白',
							}
						]
					},
					{
						problem: '问题2？',
						answer: [{
								isSelect: '0',
								answerContent1: 'a',
								answerContent2: '',
							},
							{
								isSelect: '0',
								answerContent1: 'b',
								answerContent2: '',
							},
							{
								isSelect: '0',
								answerContent1: 'c',
								answerContent2: '',
							},
							{
								isSelect: '0',
								answerContent1: 'd',
								answerContent2: '空白',
							},
							{
								isSelect: '0',
								answerContent1: 'e',
								answerContent2: '空白',
							}
						]
					}
				]
			};
		},
		methods: {

			btnAction() {
				for(var i=0;i<this.problemList.length;i++){
					var answerList=this.problemList[i].answer
					for(var j = 1; j < answerList.length;j++){
						var answer = answerList[j]
						// 1、你的上半部分
						// 2、取值
						alert(answer.isSelect)
						alert(answer.answerContent1)
						alert(answer.answerContent2)
						// 3、你的post请求
					}
				}
			},


		},

	}
</script>

<style>

</style>
