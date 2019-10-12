<template>
  <select class="form-control" v-model="objId" v-on:change="objChange()">
    <option value="0">--未选择--</option>
    <option v-for="(item,index) in objList" :key="index" v-bind:value="item.mitypeid">
      {{item.mitypename}}
    </option>
  </select>
</template>

<script>
 
  export default {
    data() {
      return {
        objName: '',
        objId: '0',
        objList: [],
				obj:{},
      };
    },
    methods: {
      //提交部门名称和ID
      objChange: function () {
				
        this.obj = this.exchangeObjName(this.objId)
        this.$emit('objChange', this.obj)
      },
      setObjId: function (objId) {
        this.objId = objId
      },
      //添加前缀的部门名字兑换原来的名字
      exchangeObjName: function (param) {
        var dp = {}
        for (var i = 0; i < this.objList.length; i++) {
          dp = this.objList[i];
          if (dp.mitypeid == param) {
            return dp
          }
        }
      },
     
      async getObjList() {
        var url = this.url + '/medicinsurtypeAction/queryMedicinsurtype'
        this.$ajax({
        	method: 'POST',
        	url: url,
        	headers: {
        		'Content-Type': this.contentType,
        		'Access-Token': this.accessToken
        	},
        	data: {
						isuse:'1'
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
        	console.log('请求失败处理')
        });
      },

    },
    created() {
      this.getObjList()
    },
  }
</script>

<style>

</style>
