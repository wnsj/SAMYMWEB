<template>
    <select class="form-control" v-model="reId" v-on:change="objectChange()">
        <option value="0">--未选择--</option>
        <option v-for="(item,index) in objList" :key="index" v-bind:value="item.reId">
            {{item.reName}}
        </option>
    </select>
</template>

<script>
 
  export default {
    name: 'department',
    data() {
      return {
        reName: '',
        reId:'0',
        objList: [],
				obj:{
					reId:'',
					reName: '',
				},
      };
    },
    methods: {
      objectChange: function () {
        this.obj = this.exchangeObjName(this.reId)
        this.$emit('objectChange', this.obj)
      },
      setObj: function (reId) {
        this.reId = reId
      },
      //添加前缀的部门名字兑换原来的名字
      exchangeObjName: function (param) {
        var obj = {}
        for (var i = 0; i < this.objList.length; i++) {
          obj = this.objList[i];
          if (param == 0) {
              return null
          } else if (obj.reId == param) {
              return obj
          }
        }
      },
      getObj() {
        var url = this.url + '/regionBean/queryRegion'
        this.$ajax({
        	method: 'POST',
        	url: url,
        	headers: {
        		'Content-Type': this.contentType,
        		'Access-Token': this.accessToken
        	},
        	data: {
				reLevel:'3',
        	},
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
