<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">问卷调查管理</h1>
        </div>
        <div class="top">
            <!--            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">-->
            <!--                <el-row style="margin-top: 2%">-->
            <!--                    <el-col :span="6" class="jh-pr-28">-->
            <!--                        <el-form-item label="门店:" v-if="accountType == true">-->
            <!--                            <el-select v-model="param.storeId" filterable clearable placeholder="请选择">-->
            <!--                                <el-option :key="0" label="未选择" value=0></el-option>-->
            <!--                                <el-option v-for="item in storeList"-->
            <!--                                           :key="item.storeId"-->
            <!--                                           :label="item.storeName"-->
            <!--                                           :value="item.storeId">-->
            <!--                                </el-option>-->
            <!--                            </el-select>-->
            <!--                        </el-form-item>-->
            <!--                    </el-col>-->
            <!--                    <el-col :span="12" class="jh-pr-28">-->
            <!--                        <el-form-item label="时间:">-->
            <!--                            <el-date-picker-->
            <!--                                v-model="param.firstVisitStartTime"-->
            <!--                                :picker-options="pickerOptions0"-->
            <!--                                type="date"-->
            <!--                                placeholder="开始时间">-->
            <!--                            </el-date-picker>-->
            <!--                            <span> - </span>-->
            <!--                            <el-date-picker-->
            <!--                                v-model="param.firstVisitEndTime"-->
            <!--                                :picker-options="pickerOptions1"-->
            <!--                                type="date"-->
            <!--                                placeholder="结束时间">-->
            <!--                            </el-date-picker>-->
            <!--                        </el-form-item>-->
            <!--                    </el-col>-->
            <!--                    <el-col :span="3" class="jh-pr-28">-->
            <!--                        <el-button type="primary" size="small"-->
            <!--                                   style="width: 85px"-->
            <!--                                   @click="getDiseaseType"-->
            <!--                                   class="jh-fr">查询-->
            <!--                        </el-button>-->
            <!--                    </el-col>-->
            <!--                    <el-col :span="3">-->
            <!--                        <el-button type="primary" size="small"-->
            <!--                                   style="width: 85px"-->
            <!--                                   @click="exportTableToExcel('firstVd','初访咨询方向统计表')"-->
            <!--                                   class="jh-fr">导出-->
            <!--                        </el-button>-->
            <!--                    </el-col>-->
            <!--                </el-row>-->
            <!--            </el-form>-->
            <el-button type="primary" size="small"
                       style="width: 85px"
                       @click="getQueByCondition"
                       class="jh-fr">查询
            </el-button>
            <el-button type="warning" size="small"
                       style="width: 85px"
                       @click="addQueClick"
                       class="jh-fr">新增
            </el-button>
        </div>

        <div>
            <el-table
                :data="tableData"
                :cell-style="cellStyle"
                max-height="530"
                :header-cell-style="headerStyle"
                style="width: 95%;margin-left: 3%;margin-top: 3%"
                border>
                <el-table-column
                    align="center"
                    prop="queName"
                    label="名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="problemNum"
                    label="题数"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    min-width="100">
                    <el-button type="primary" size="small"
                               style="width: 85px"
                               class="jh-fr">查看
                    </el-button>
                    <el-button type="primary" size="small"
                               style="width: 85px"
                               class="jh-fr">启用
                    </el-button>
                </el-table-column>
            </el-table>
			
			<!-- 添加问题弹窗 -->
			<el-dialog title="问卷调查" :visible.sync="objParam.dialogVisible" width="40%">
				<el-card class="form-container" shadow="never">
				  <el-form :model="objParam" :rules="rules" ref="productAttrFrom" label-width="150px">
				    <el-form-item label="问卷调查名称：" prop="name">
				      <el-input v-model="objParam.queName"></el-input>
					  <el-button type="primary" @click="addProbem()">添加</el-button>
				    </el-form-item>
					<el-form-item v-for="item in objParam.problemBeanList" :key="item.proSort">
					  <el-input v-model="item.name"></el-input>
					  <el-select v-model="item.proType">
						 <el-option :value="0">否</el-option>
					    <el-option :value="1">是</el-option>
					  </el-select>
					  <el-select v-model="item.answer">
					  	<el-option :value="0">否</el-option>
					    <el-option :value="1">是</el-option>
					  </el-select>
					</el-form-item>
					<el-form-item>
					  <el-button type="primary" @click="onSubmit('productAttrFrom')">提交</el-button>
					  <el-button   @click="resetForm('productAttrFrom')">重置</el-button>
					</el-form-item>
				  </el-form>
				</el-card>
			</el-dialog>
			
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                param: {
                    problemNum: '',
                    queState: '',
                    queName: '',
                    problemBeanList: []
                },
				
				objProblem:{
					proSort:'',
					proLabel:'',
					proType:'',
					answer:'',
				},
				problemBeanList:[],
				objParam:{
					queName:'',
					dialogVisible:false,
					problemBeanList:[
						{
							proSort:1,
							proLabel:'',
							proType:'',
							answer:'',
						}
					]
				},
                tableData: [],
            };
        },
        methods: {

            // 表格表头样式
            headerStyle() {
                return 'text-align: center;color: black;'
            },
            // 表格行样式
            cellStyle() {
                return 'text-align: center;'
            },
			
			//弹窗
			addQueClick(){
				this.objParam.dialogVisible=true
			},
			//添加问题数据
			addProbem(){
				var i = this.objParam.problemBeanList.length
				this.objProblem.proSort=i+1
				this.objParam.problemBeanList.push(this.objProblem)
			},
            // 获取门店
            // getStore() {
            //     var url = this.url + '/storeAction/queryStore'
            //     this.$ajax({
            //         method: 'POST',
            //         url: url,
            //         headers: {
            //             'Content-Type': this.contentType,
            //             'Access-Token': this.accessToken
            //         },
            //         data: {
            //             isuse: '1'
            //         },
            //         dataType: 'json',
            //     }).then((response) => {
            //         var res = response.data
            //         if (res.retCode == '0000') {
            //             if (res.retData.length > 0) {
            //                 this.storeList = res.retData
            //             }
            //         } else {
            //             alert(res.retMsg)
            //         }
            //
            //     }).catch((error) => {
            //         //console.log('岗位数据请求失败处理')
            //     });
            // },

            // 获取初访咨询方向汇总数据
            async getQueByCondition() {
                var url = this.url + '/questionnaireBean/getQueByCondition'
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
                        this.tableData = res.retData
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            },

            addQue() {
                var url = this.url + '/questionnaireBean/addQue'
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
                        this.tableData = res.retData
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('岗位数据请求失败处理')
                });
            }
            // // 翻页
            // handleCurrentChange(pageNum) {
            //     this.param.current = pageNum
            //     this.getDiseaseType()
            // },
            // // 每页条数变化时触发
            // handleSizeChange(pageSize) {
            //     this.param.pageSize = pageSize
            //     this.getDiseaseType()
            // },
        },
        created() {
            this.getQueByCondition()
        }
    }
</script>

<style scoped>

</style>
