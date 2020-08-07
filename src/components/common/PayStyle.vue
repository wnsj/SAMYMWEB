<template>
    <select class="form-control" v-model="psId" v-on:change="payStyleChange()">
        <option value="0">--未选择--</option>
        <option v-for="(item,index) in psList" :key="index" v-bind:value="item.psId">{{item.psName}}</option>
    </select>
</template>

<script>
    export default {
        data() {
            return {
                psId: '0',
                psList: []
            };
        },
        methods: {

            payStyleChange: function() {
                for (var i = 0; i < this.psList.length; i++) {
                    if(this.psId == '0'){
                        this.$emit('payStyleChange', null)
                        return
                    }else{
                        if (this.psList[i].psId === this.psId) {

                            this.$emit('payStyleChange', this.psList[i].psId)
                            return
                        }
                    }
                }
            },
            setPsId: function(psId) {
                this.psId = psId
                this.queryData()
            },
            async queryData() {
                var url = this.url + '/payStypeBean/getAllPayStyle'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {},
                    dataType:'json'
                }).then((response) => {
                    var res = response.data
                    if (res.retCode === '0000') {
                        this.psList = res.retData
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('数据请求失败处理'+ error)
                });
            },
        },
        created() {
            this.queryData()
        },
    }
</script>

<style scoped>

</style>
