<template>
    <select class="form-control" v-model="occId" v-on:change="objectChange()">
        <option value="0">--未选择--</option>
        <option v-for="(item,index) in objList" :key="index" v-bind:value="item.occId">
            {{item.occName}}
        </option>
    </select>
</template>

<script>
 
  export default {
    name: 'department',
    data() {
      return {
        occName: '',
        occId:'0',
        objList: [],
				obj:{
					occId:'',
					occName: '',
				},
      };
    },
    methods: {
      objectChange: function () {
        this.obj = this.exchangeObjName(this.occId)
        this.$emit('objectChange', this.obj)
      },
      setObj: function (occId) {
        this.occId = occId
      },
      //添加前缀的部门名字兑换原来的名字
      exchangeObjName: function (param) {
        var obj = {}
        for (var i = 0; i < this.objList.length; i++) {
          obj = this.objList[i];
          if (param == 0) {
              return null
          } else if (obj.occId == param) {
              return obj
          }
        }
      },
      getObj() {
        var url = this.url + '/occupation/queryOccupation'
        this.$ajax({
        	method: 'POST',
        	url: url,
        	headers: {
        		'Content-Type': this.contentType,
        		'Access-Token': this.accessToken
        	},
        	data: {},
        	dataType: 'json',
        }).then((response) => {
        	var res = response.data
        	if (res.retCode == '0000') {
        		if (res.retData.length > 0) {
        			this.objList = res.retData
        		}
        	} else {
        		alert(res.retMsg)
        	}
        
        }).catch((error) => {
        	console.log('状态数据请求失败处理')
        });
      },
    },
    created() {
      this.getObj()
    },
  }
</script>

<style>

</style>
