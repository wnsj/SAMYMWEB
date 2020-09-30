<template>
  <div class="wraper">
    <div class="col-md-12 col-lg-12 main-title">
        <h1 class="titleCss">问卷调查汇总</h1>
    </div>
    <el-collapse-transition>
    <div class="top" v-show="showSelect">
        <el-form label-position="right" :inline="true" size="small" label-width="100px">
            <el-row>
                <el-col :span="8">
                	<el-form-item label="门店:">
                		<el-select @change="initPage" v-model="param.storeId" filterable clearable placeholder="请选择">
                			<el-option v-for="item in storeList" :key="item.storeId" :label="item.storeName" :value="item.storeId">
                			</el-option>
                		</el-select>
                	</el-form-item>
                </el-col>
                <el-col :span="8">
                	<el-form-item label="咨询师:">
                		<el-select @change="initPage" v-model="param.couId" filterable clearable placeholder="请选择">
                			<el-option v-for="item in couList" :key="item.empId" :label="item.empName" :value="item.empId">
                			</el-option>
                		</el-select>
                	</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="顾问:">
                        <el-select @change="initPage" v-model="param.conId" filterable clearable placeholder="请选择">
                            <el-option v-for="item in conList" :key="item.empId" :label="item.empName" :value="item.empId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                	<el-form-item label="问卷名称:">
                		<el-select @change="initPage" v-model="param.queId" filterable clearable placeholder="请选择">
                			<el-option v-for="item in queList" :key="item.id" :label="item.queName" :value="item.id">
                			</el-option>
                		</el-select>
                	</el-form-item>
                </el-col>

                <el-col :span="14" style="margin-left: -5%;">
                    <el-form-item label="消费时间:">
                        <el-date-picker
                        v-model="param.startDate"
                        :picker-options="pickerOptions0"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间">
                        </el-date-picker>
                        <span> - </span>
                        <el-date-picker
                        v-model="param.endDate"
                        :picker-options="pickerOptions1"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="2" >
                    <el-button type="primary" size="small" style="width: 85px" @click="getAvgScore">查询</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
    </el-collapse-transition>
    <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect"  @mouseenter="dataOpen">
        <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
    </div>

   <div class="col-md-12 col-lg-12">
       <el-table
           :header-cell-style="headerStyle"
           :data="tableData"
           :max-height="tableHeight"
           border
           @row-dblclick="QuesSumDialog"
           style="width: 100%">
           <el-table-column
             prop="storeName"
             label="门店">
           </el-table-column>
           <el-table-column
             prop="couName"
             label="咨询师">
           </el-table-column>
           <el-table-column
             prop="conName"
             label="顾问">
           </el-table-column>
           <el-table-column
             prop="queName"
             label="问卷名称">
           </el-table-column>
           <el-table-column
             prop="vsNum"
             label="人数">
           </el-table-column>
           <el-table-column
             prop="avgStore"
             label="门店平均分">
           </el-table-column>
           <el-table-column
             prop="avgCou"
             label="咨询师平均分">
           </el-table-column>
           <el-table-column
             prop="avgEmp"
             label="咨询顾问平均分">
           </el-table-column>
         </el-table>
         <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="param.pageNum"
            :page-sizes="[10,20,30,50]"
            :page-size="param.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalAmount" style="padding: 20px 0;">
         </el-pagination>
    </div>


    <el-dialog
      :visible.sync="dialogVisible"
      width="63%" class="quesum">
      <div slot="title" class="quesum-dialog">{{selectItem.queName}}</div>
      <div class="quesum-content">
          <div class="total-num">共计<span>{{selectItem.vsNum}}</span>人</div>
          <div class="quesum-box">
              <div class="quesum-item" v-for="(proDetails,index) in proDetailsList" :key="index" :class="{'active':proDetails.isSelected == true}">
                  <div class="quesum-item-head">
                      <p>{{proDetails.proSort}}.{{proDetails.proLabel}}</p>
                      <!-- :disabled="proDetails.answerBeanList.length==0" -->
                      <el-button

                        size="small"
                        class="pull-right"
                        :type="proDetails.isSelected == true ? 'info' : 'primary'"
                        @click="showItem(proDetails.isSelected,index)">
                        <span v-if="proDetails.isSelected == true">收起</span>
                        <span v-else>查看{{proDetails.num}}条内容</span>
                        <i class="el-icon--right" :class="proDetails.isSelected == true ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                     </el-button>
                  </div>
                  <ul>
                      <div class="numRate" v-if="proDetails.proType == 1">
                        <p><span>是：{{proDetails.yesRate}}</span> <span>个数：{{proDetails.yesNum}}</span></p>
                        <p><span>否：{{proDetails.noRate}}</span><span>个数：{{proDetails.noNum}}</span></p>
                      </div>
                      <div class="num numRate" v-if="proDetails.proType == 2">
                        <p><span>描述：{{proDetails.labelRate}}</span> <span>个数：{{proDetails.labelNum}}</span></p>
                      </div>

                      <li v-if="proDetails.proType == 2" v-for="(item,proIndex) in proDetails.answerBeanList" :key="proIndex">{{proIndex + 1}}.答案描述：{{item.describeAnswer}}</li>
                  </ul>
              </div>
          </div>
      </div>
    </el-dialog>


  </div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
                dialogVisible: false,
               headerStyle:{
                   color: '#323232'
               },
                tableHeight: innerHeight - 280,
				param: {
					pageNum: 1,
					pageSize: 10,
					vsId: '',
                    vsName: '',
					couId: '',
                    conId: '',
					queId: '',
					begScore:'',
					endScore:'',
                    begStoreScore: '',
                    endStoreScore: '',
                    begConScore: '',
                    endConScore: '',
					storeId: this.storeId(),
                    startDate: null,
                    endDate: null
				},
               pickerOptions0: {
                   disabledDate: (time) => {
                       if (this.param.endTime !== '' && this.param.endTime !== null) {
                           return time.getTime() > Date.now() || time.getTime() > this.param.endTime
                       } else {
                           return time.getTime() > Date.now()
                       }
                   }
               },
               pickerOptions1: {
                   disabledDate: (time) => {
                       return time.getTime() < this.param.startDate || time.getTime() > Date.now()
                   }
               },

				storeList: [],
				couList: [],
                conList: [],
				queList: [],
                tableData: [],
                totalAmount: 0,
                selectItem: [],
                proDetailsList: [],
                showSelect:true
			};
		},

		methods: {
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            showItem(isSelected,index){
              if (isSelected) {
                  this.proDetailsList[index].isSelected = false;
              } else {
                  this.proDetailsList[index].isSelected = true;
              }
            },

            QuesSumDialog(row){
              this.selectItem = row

              var url = this.url + '/problemBean/getProDetails'
              this.$ajax({
              	method: 'POST',
              	url: url,
              	headers: {
              		'Content-Type': this.contentType,
              		'Access-Token': this.accessToken
              	},

                data: {
                    couId: this.selectItem.couId,
                    conId: this.selectItem.conId,
                    queId: this.selectItem.queId,
                    storeId: this.selectItem.storeId,
                    startDate: this.param.startDate,
                    endDate: this.param.endDate
                },
              	dataType: 'json',
              }).then((response) => {
              	var res = response.data
              	if (res.retCode == '0000') {
              		console.log(res);
                    res.retData.forEach(function(item,index){
                        item.isSelected = false;
                        // if (item.answerBeanList.length !== 0 && item.answerBeanList !== null) {
                        //     item.answerBeanList = item.answerBeanList.filter((v)=>{
                        //         if (v.describeAnswer !== '') {
                        //             return v
                        //         }
                        //     })
                        // }
                    })
                    this.proDetailsList = res.retData;
                    this.dialogVisible = true;

              	} else {
              		alert(res.retMsg)
              	}

              }).catch((error) => {
              	console.log(error)
              });



            },

            initPage() {
                this.param.pageNum = 1
            },


            // 翻页
            handleCurrentChange(pageNum) {
            	this.param.pageNum = pageNum
                this.getAvgScore()
            },
            // 每页条数变化时触发
            handleSizeChange(pageSize) {
                this.param.pageNum = 1
            	this.param.pageSize = pageSize
                this.getAvgScore()
            },
            // 问卷调查统计分页查询
            getAvgScore() {
                this.showSelect = false;

            	// var url = 'http://172.16.4.134:8080/queVisitor/getAvgScore'
                var url = this.url + '/queVisitor/getAvgScore'
            	this.$ajax({
            		method: 'POST',
            		url: url,
            		headers: {
            			'Content-Type': this.contentType,
            			'Access-Token': this.accessToken
            		},

                    data: this.param,
            		dataType: 'json',
            	}).then((response) => {
            		var res = response.data
            		if (res.retCode == '0000') {
            			console.log(res);
                        this.tableData = res.retData.records;
                        this.totalAmount = res.retData.total;
                        // this.param.pageNum = res.retData.current;
            		} else {
            			alert(res.retMsg)
            		}

            	}).catch((error) => {
            		console.log('error')
            	});
            },



			// 获取门店
			getStore() {
				var url = this.url + '/storeAction/queryStore'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						isuse: '1'
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.storeList = res.retData
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					//console.log('岗位数据请求失败处理')
				});
			},

			getCou() {
				var url = this.url + '/employeeAction/getAllEmpByPosName'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						posName: "咨询师"
					},
					dataType: 'json',
				}).then(res => {
					this.couList = res.data.retData
				}).catch(error => {
					console.log(error);
				})
			},
            getCon() {
                var url = this.url + '/employeeAction/getAllEmpByPosName'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        posName: "咨询顾问"
                    },
                    dataType: 'json',
                }).then(res => {
                    this.conList = res.data.retData
                }).catch(error => {
                    console.log(error);
                })
            },
			getQue() {
				var url = this.url + '/questionnaireBean/getAllQue'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {},
					dataType: 'json',
				}).then(res => {
					this.queList = res.data.retData
				}).catch(error => {
					console.log(error);
				})
			},

		},
		created() {
			this.getStore()
			this.getCou()
            this.getCon()
			this.getQue()
		}

	}
</script>
<style>
.quesum .el-dialog{background-color: #f7f6fb;}
.quesum .quesum-dialog{font-size: 22px;color: #1f1f1f;font-weight: bold;}
.quesum .quesum-content{width: 100%;overflow: hidden;box-sizing: border-box;padding: 0 2%;}
.quesum .quesum-content .total-num{width: 100%;overflow: hidden;text-align: right;font-size: 13px;color: #585858;margin-bottom: 10px;}
.quesum .quesum-content .total-num span{color: #e62331;}
.quesum .quesum-content .quesum-box{width: 100%;overflow: hidden;text-align: left;}
.quesum .quesum-content .quesum-box .quesum-item{width: 100%;overflow: hidden;background-color: #fff;margin-bottom: 20px;border-radius: 0px 6px 6px 0px;}
.quesum .quesum-content .quesum-box .quesum-item .quesum-item-head{width: 100%;overflow: hidden;box-sizing: border-box;border-left: 2px solid #e9ae54;font-size: 13px;color: #585858;line-height: 32px;padding: 14px 2.5%;}
.quesum .quesum-content .quesum-box .quesum-item .quesum-item-head p{display: inline;}
.quesum .quesum-content .quesum-box .quesum-item .quesum-item-head .el-button{width: 120px;}
.quesum .quesum-content .quesum-box .quesum-item ul{width: 100%;overflow: hidden;box-sizing: border-box;padding: 20px 2.5%; display: none; }
.quesum .quesum-content .quesum-box .quesum-item ul li{width: 100%;overflow: hidden;border-bottom: 1px solid #e6e6e6;padding: 17px 0;font-size: 13px;color: #585858;}
/* .quesum .quesum-content .quesum-box .quesum-item ul li span{width: 20%;overflow: hidden;display: inline-block;float: left;} */
/* .quesum .quesum-content .quesum-box .quesum-item ul li p{width: 80%;overflow: hidden;display: inline-block;float: left;} */
.quesum .quesum-content .quesum-box .quesum-item.active{border-radius: 6px;}
.quesum .quesum-content .quesum-box .quesum-item.active .quesum-item-head{border-color:#fff;}
.quesum .quesum-content .quesum-box .quesum-item.active .quesum-item-head p{font-weight: bold;font-size: 16px;color: #191919; }
.quesum .quesum-content .quesum-box .quesum-item.active ul{display: block;}


.numRate{width: 100%;overflow: hidden;}
.numRate p{width: 100%;overflow: hidden;line-height: 20px;}
.numRate p span{width: 15%;overflow: hidden;display: inline-block;float: left;margin-right: 2%;}

</style>
