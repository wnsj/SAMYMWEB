<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨询方向汇总</h1>
        </div>
        <div class="row newRow">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-if="accountType==true">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<store ref='store' @storeChange='storeChange'></store>
				</div>
			</div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            	<div class="col-md-5 col-lg-5 text-right nopad">
            		<p class="end-aline col-md-11 col-lg-11">姓名</p><span class="sign-left">:</span>
            	</div>
            	<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="visitorName">
            	</div>
            </div>
           <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
           	<div class="col-md-3 col-lg-3 text-right nopad">
           		<p class="end-aline col-md-11 col-lg-11">日期范围</p><span class="sign-left">:</span>
           	</div>
           	<div class="col-md-9 col-lg-9">
           		<dPicker class="wd100" v-model="dateArr" type="format" format="YYYY-MM-DD" range>
					<template v-slot:header="{ emit }">
						<div class="text-left">	</div>
					</template>
				</dPicker>
           	</div>
           </div>
            <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-30"
                    data-toggle="modal"
                    v-on:click="queryObjectList(1)">查询
            </button>
        </div>
        <div class="">
			<el-table ref="productTable" :data="objList" style="width: 100%" border>
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
        </div>
    </div>

</template>


<script>


	import dPicker from 'vue2-datepicker'
	import store from '../common/Store.vue'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        components: {
            Paging,
			dPicker,
			store,
        },
        data() {
            return {
                objList: [],
				dtList:[],
                fixedHeader: false,
				visitorName:'',
				dateArr:'',
				begDate:'',
				endDate:'',
				storeId: this.storeId(),
				accountType:this.accountType(),

                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.queryObjectList(page);
            },
			conLog(item){
				console.log(item[0])
			},
            storeChange(param) {
            	if (this.isBlank(param)) {
            		this.storeId = ""
            	} else {
            		this.storeId = param.storeId
            	}
            },
            //check the list of store
            queryObjectList(page) {
				if(this.dateArr.length > 0 && !this.isBlank(this.dateArr[0]) && !this.isBlank(this.dateArr[1]))	{
					this.begDate = this.moment(this.dateArr[0],'YYYY-MM-DD 00:00:00')
					this.endDate = this.moment(this.dateArr[1],'YYYY-MM-DD 23:59:59')
				}else{
					this.begDate=''
					this.endDate=''
				}
                var url = this.url + '/employeeAction/queryEmpByDt'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
						storeId: this.storeId,
						begDate:this.begDate,
						endDate:this.endDate,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
						this.dtList = res.retData.dtList
						this.objList=res.retData.empDtList
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    //console.log('商铺查询请求失败')
                });
            },
            handleScroll(e) {
                var self = this
                var etop = e.target.scrollTop
                var fHeaderwidth = $("#fHeader").width($(".datathead").width())
                var fHeaderheight = $("#fHeader").height($(".datathead").height())
                var theadheight = $(".datathead").height()
                var thlength = $(".datathead tr th").length
                for (var i = 0; i < thlength; i++) {
                    $("#fHeader div").eq(i).width(
                        $(".datathead tr th").eq(i).width()
                    )
                    $("#fHeader div").eq(i).height(
                        $(".datathead tr th").eq(i).height()
                    )
                }
                if (etop > 0) {
                    self.fixedHeader = true
                    $("#fHeader").css("top", etop)
                } else {
                    self.fixedHeader = false
                }
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
            init();
        },
        created() {

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
