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
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable">

                        <thead class="datathead">
                        <tr>
                            <th class="text-center">门店名称</th>
                            <th class="text-center">退款人</th>
                            <th class="text-center">咨询师</th>
                            <th class="text-center">产品</th>
                            <th class="text-center">退费课时</th>
							<th class="text-center">退费金额</th>
							<th class="text-center">时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in objList" :key="index">
                            <td class="text-center">{{item.storeName}}</td>
                            <td class="text-center">{{item.visitorName}}</td>
                            <td class="text-center">{{item.proEmpName}}</td>
							<td class="text-center">{{item.proName}}</td>
							<td class="text-center">{{item.refCount}}</td>
                            <td class="text-center">{{item.realRefund}}</td>
                            <td class="text-center">{{item.createDate | dateFormatFilter('YYYY-MM-DD')}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--分页插件-->
                <div class="page">
                    <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                    <paging ref="paging" @change="pageChange"></paging>
                </div>
            </div>
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
						visitorName:this.visitorName,
						begDate:this.begDate,
						endDate:this.endDate,

                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size//一页显示的数量
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.objList = res.retData.records
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
