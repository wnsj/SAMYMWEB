<template>
  <select class="form-control" v-model="modelId" v-on:change="modelChange()">
    <option value="0">--未选择--</option>
    <option v-for="(item,index) in modelList" :key="index" v-bind:value="item.modelId">
      {{item.modelName}}
    </option>
  </select>
</template>

<script>
 
  export default {
    name: 'department',
    data() {
      return {
        modelName: '',
        modelId: '0',
        modelList: [],
				modelObj:{
					modelId:'0',
					modelName: '',
				},
      };
    },
    methods: {
      //提交岗位名称和ID
      modelChange: function () {
				// console.log('岗位1：'+this.ModelObj.ModelId)
        this.modelObj = this.exchangeModelName(this.modelId)
				// console.log('岗位2：'+this.ModelObj.ModelId)
        this.$emit('modelChange', this.modelObj)
      },
      setModel: function (modelId) {
        this.modelId = modelId
				// console.log('设置岗位'+this.ModelId)
      },
      //添加前缀的部门名字兑换原来的名字
      exchangeModelName: function (param) {
        var model = {}
        for (var i = 0; i < this.modelList.length; i++) {
          model = this.modelList[i];
          if (model.modelId == param) {
            return model
          }
        }
      },
     
      async getModel() {
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
        			this.modelList = res.retData
        		}
        	} else {
        		alert(res.retMsg)
        	}
        
        }).catch((error) => {
        	console.log('岗位数据请求失败处理')
        });
      },

    },
    created() {
      this.getModel()
    },
  }
</script>

<style>

</style>
