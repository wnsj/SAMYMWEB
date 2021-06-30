<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">员工管理</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-8=7">
                        <store ref="store" @storeChange='storeChange'></store>
                    </div>
                </div>
                <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">姓名</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="CusName">
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">手机号</p><span class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <input class="form-control" type="text" v-model="iphone">
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">发送状态</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <select class="form-control" v-model="state">
                            <option value="">--未选择--</option>
                            <option value="0">发送失败</option>
                            <option value="1">发送成功</option>
                        </select>
                    </div>
                </div>
                
            </div>
            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">发送模板</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <select class="form-control" v-model="smstemplate">
                            <option value="">--未选择--</option>
                            <option value="1">售后模板</option>
                            <option value="2">发送模板</option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="col-md-3 col-lg-3 text-right nopad SSwid20">
						<p class="end-aline col-md-11 col-lg-11">发送时间</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-4 col-lg-4 SSwid27">
						<dPicker class="wd100" v-model="begCreateDate"></dPicker>
					</div>
					<div class="pull-left end-aline nopad">
						~
					</div>
					<div class="col-md-4 col-lg-4 SSwid27">
						<dPicker class="wd100" v-model="endCreateDate"></dPicker>
					</div>
				</div>
                <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-2"
                        data-toggle="modal"
                        v-on:click="selectRule()" v-has="'SAMY:MP:Employee:Add'">发送短信
                </button>
                <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1"
                        data-toggle="modal"
                        v-on:click="checkData()">查询
                </button>
            </div>
        </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <el-table :data="tableData" border style="width: 100%" size="mini" :cell-style="{color: '#2c3e50'}" :header-cell-style="{color: '#2c3e50', background: '#efefef'}">
                        <el-table-column prop="storeName" label="门店" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="CusName" label="收件人姓名" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="phone" label="手机号" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="state" label="发送状态" align="center" min-width="80"></el-table-column>
                        <el-table-column prop="sendTime" label="发送时间" align="center" min-width="140"></el-table-column>
                        <el-table-column prop="smsTemplate" label="短信模板" align="center" min-width="80"></el-table-column>
                        <el-table-column prop="smsContent" label="发送内容" align="center" width="270">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="bottom" width="250">
                                {{ scope.row.smsContent }}
                                <div slot="reference" class="smscontent">
                                    {{ scope.row.smsContent }}
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sendName" label="发送人" align="center" min-width="80"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import store from '../../common/Store.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
            store,
            dPicker
			
		},
		data() {
			return {
                tableData: [
                    {
                        storeName: '世纪都会',
                        CusName: '王饱饱',
                        phone: '13654125897',
                        state: '发送成功',
                        sendTime: '2021-02-15 15:23:45',
                        smsTemplate: '售后模板',
                        smsContent: '王先生您好，我们非常重视您参与沙龙活动的感受，将于2021-3-15使用专线号码：123456与您联系，希望能够了解到我们做出哪些改进会给您带来更好的服务感受。',
                        sendName: '张助理',

                    }
                ],
                showSelect: true,
                addClass: false,
                storeId: '',         // 门店ID
                CusName: '',         // 姓名
                iphone: '',          // 手机号
                state: '',           // 发送状态
                smstemplate: '',     // 发送模板
                begCreateDate: '',   // 开始时间
				endCreateDate: '',   // 结束时间


            }
        },
        methods:{
            //modify the cotent of department
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            dataClose(){
                this.showSelect = !this.showSelect
                this.addClass = true;

                setTimeout(()=>{
                    this.addClass = false;
                },400)
            },
            // 门店下拉
            storeChange: function (param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            checkData(){
                this.showSelect = false
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
				var url = this.url + ''
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.tableData = res.retData.records

					}else{
						console.log('sdfas')
					}
				}).catch((error) => {
					//console.log('请求失败处理')
				});
            },
            selectRule(){
                this.$router.push({
					path: '../../MP/SmsManage/smsAdd'
				})
            }

        },
		created() {
			
		},
        mounted() {
            
		}
    }
</script>

<style scoped="scoped">
.smscontent{ white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
.SSwid20{width: 20%;}
.SSwid27{width: 27.8%;}
/* .newRow .col-lg-3, .newRow .col-md-3, .newRow .col-sm-3, .newRow .col-xs-3 {
    width: 20% !important;
} */

</style>
