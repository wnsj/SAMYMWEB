<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">初诊咨询方向统计表</h1>
        </div>
        <el-collapse-transition>
        <div class="top" v-show="showSelect">
            <el-form label-position="right" label-width="100px" :inline="false" size="small" :model="param">
                <el-row style="margin-top: 2%">
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label="门店:" v-has="'SAMY:MP:STORE'">
                            <store ref='store' @storeChange='storeChange'></store>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="jh-pr-28">
                        <el-form-item label='姓名:'>
                            <el-input v-model="param.empName" placeholder="姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="jh-pr-28">
                        <el-form-item label="消费时间:">
                            <el-date-picker v-model="param.begDate" :picker-options="pickerOptions0" type="date"
                                            placeholder="开始时间">
                            </el-date-picker>
                            <span> - </span>
                            <el-date-picker v-model="param.endDate" :picker-options="pickerOptions1" type="date"
                                            placeholder="结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" :offset="15">
                        <el-button type="primary"
                                   size="small"
                                   style="width: 85px"
                                   @click="queryObjectList"
                                   class="jh-fr">查询
                        </el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" size="small"
                                   style="width: 85px"
                                   @click="exportTable()"
                                   class="jh-fr">导出
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect"  @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        <el-tabs @tab-click="tabChange" type="card" style="width: 100%" v-model="param.posName">
            <el-tab-pane label="咨询师" name="咨询师">
                <el-table ref="productTable" id="conDt" :data="objList" style="width: 100%" :height="tableHeight" border fixed>
                    <el-table-column label="名字" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.empName}}</template>
                    </el-table-column>
                    <el-table-column label="岗位" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.posName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(item, index) in dtList" :key="index" :label="item.dtName" align="center">
                        <template slot-scope="scope">{{scope.row.dtCountList[index].dtCount}}</template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="咨询顾问" name="咨询顾问">
                <el-table ref="productTable" id="empDt" :data="objList" style="width: 100%" :height="tableHeight" border fixed>
                    <el-table-column label="名字" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.empName}}</template>
                    </el-table-column>
                    <el-table-column label="岗位" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.posName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(item, index) in dtList" :key="index" :label="item.dtName" align="center">
                        <template slot-scope="scope">{{scope.row.dtCountList[index].dtCount}}</template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>


<script>
    import dPicker from 'vue2-datepicker'
    import store from '../common/Store.vue'
    import pos from '../common/Position.vue'
    import Paging from '../common/paging'

    export default {
        components: {
            Paging,
            dPicker,
            store,
            pos,
        },
        data() {
            return {
                showSelect:true,
                tableHeight: innerHeight - 300,
                param: {
                    storeId: this.storeId(),
                    begDate: '',
                    endDate: '',
                    posName: '咨询师',
                    empName: '',
                },
                storeList: [],
                objList: [],
                tableId: '1',
                dtList: [],
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
                        return time.getTime() < this.param.begDate || time.getTime() > Date.now()
                    }
                },
                accountType: this.accountType(),
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.queryObjectList(page);
            },
            conLog(item) {
                console.log(item[0])
            },
            storeChange(param) {
                if (this.isBlank(param)) {
                    this.param.storeId = ""
                } else {
                    this.param.storeId = param.storeId
                }
            },
            tabChange(item) {
                this.queryObjectList()
                this.param.storeId = ''
                this.param.empName = ''
                this.param.endDate = ''
                this.param.begDate = ''
                if (item.name == '咨询师') {
                    this.tableId = '1'
                } else {
                    this.tableId = '2'
                }
            },
            exportTable() {
                if (this.tableId == '1') {

                    this.exportTableToExcel('conDt', '初诊咨询方向统计表_咨询师')
                } else {

                    this.exportTableToExcel('empDt', '初诊咨询方向统计表_助理')
                }
            },
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            //check the list of store
            queryObjectList(page) {
                this.showSelect = false
                if (!this.isBlank(this.param.begDate)) {
                    this.param.begDate = this.moment(this.param.begDate, 'YYYY-MM-DD 00:00:00')
                }
                if (!this.isBlank(this.param.endDate)) {
                    this.param.endDate = this.moment(this.param.endDate, 'YYYY-MM-DD 23:59:59')
                }
                var url = this.url + '/employeeAction/queryEmpByDt'
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
                        this.dtList = res.retData.dtList
                        this.objList = res.retData.empDtList
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('商铺查询请求失败')
                });
            },
        },
        created() {
            //this.queryObjectList()
        }
    }
</script>

<style>
    #datatable {
        store: relative;
    }

    #fHeader {
        store: absolute;
        top: 0;
        left: 0;
        background: #eeeeee;
        overflow: hidden;
    }

    #fHeader div.text-center {
        float: left;
        display: inline-block;
        padding: 8px;
        border: 1px solid #ddd;
        font-weight: bold;
    }

    @media print {
        #fHeader {
            display: none
        }
    }
</style>
