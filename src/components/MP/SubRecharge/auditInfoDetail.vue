<template>
  <div class="modal-content">
  	<div class="modal-header">
  		<button type="button" aria-hidden="true" class="close" data-dismiss="modal" >×</button>
  		<h2 id="myModalLabel" class="modal-title">{{infoTit}}</h2>
  	</div>
  	<div class="modal-body  pos_r clearfix">
        <!-- 产品购买审核 -->
  		<div class="tab-pane fade in active martop " id="basic" v-if="flag == 'purchase'">
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >姓名</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.memName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >产品名称</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.proName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨询师</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.couName}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨询顾问</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.empName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >访问类型</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.visitType | formatVisit}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨客判定</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.vsName}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >续流状态</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.csName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >购买单价(¥/次)</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.price}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >购买课时(次)</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.totalCount}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >购买折扣(%)</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.discount}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >购买时间</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.createDate | dateFormatFilter("YYYY-MM-DD")}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >实交金额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.realCross}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >交费方式</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.psName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >操作人</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.operatorName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >是否全款</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.isArrears | formatIsArrears}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >联系方式</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.phone}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >折前总额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.totalCount * param.price}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >折后总额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.couponAmount!=null?param.couponAmount+param.receivable:param.receivable}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >定金金额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.cashMoney}}</p>
                  </div>
              </div>

  		</div>

        <!-- 消费审核 -->
        <div class="tab-pane fade in active martop " id="basic" v-if="flag == 'consumption'">
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >姓名</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.memName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >产品名称</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.proName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >单价</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.price}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                    <div class="col-md-4 nopad">
                        <label class="col-md-4 " >课时（小时）</label>
                          <span class="sign-left">:</span>
                        <p class="col-md-7 dtrowP">{{param.consumCount}}</p>
                    </div>
                    <div class="col-md-4 nopad">
                    	<label class="col-md-4 " >折扣(%)</label>
                        <span class="sign-left">:</span>
                    	<p class="col-md-7 dtrowP">{{param.discount}}</p>
                    </div>
                    <div class="col-md-4 nopad">
                    	<label class="col-md-4 " >实交金额</label>
                        <span class="sign-left">:</span>
                    	<p class="col-md-7 dtrowP">{{param.realCross}}</p>
                    </div>
              </div>

              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨询师</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.visitorName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨询顾问</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.empName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >访问类型</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.visitType | formatVisit}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨客判定</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.vsName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >续流状态</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.continName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >交费方式</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.psName}}</p>
                  </div>

              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >消费时间</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.createDate | dateFormatFilter("YYYY-MM-DD")}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >购买时间</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.buyTime | dateFormatFilter("YYYY-MM-DD")}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >手机号</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.phone}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >应收金额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.receivable}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >陪同人</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.accompany }}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >陪同人关系</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.companionship}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >开始时间</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.actualBegDate}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >结束时间</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.actualEndDate }}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >折前总额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.totalCount * param.price}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >折后总额</label>
                      <span class="sign-left">:</span>
                  	  <!-- <p class="col-md-7 dtrowP">{{param.totalCount * param.price * (param.discount / 100)}}</p> -->
                      <p class="col-md-7 dtrowP">{{param.proDiscount}}</p>
                  </div>
              </div>


        </div>

        <!-- 退费审核 -->
        <div class="tab-pane fade in active martop " id="basic" v-if="flag == 'refund'">
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >门店名称</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.storeName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >退款人</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.memName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨询师</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.visitorName}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >咨询助理</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.empName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >产品</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.proName}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >退费金额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.momey}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >退费课时</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.refCount}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >退费时间</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.createDate | dateFormatFilter("YYYY-MM-DD")}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >购买时间</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.buyTime | dateFormatFilter("YYYY-MM-DD")}}</p>
                  </div>
              </div>
              <div class="row dtrow">
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >手机号</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.phone}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >违约总额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.breakContract}}</p>
                  </div>
                  <div class="col-md-4 nopad">
                  	<label class="col-md-4 " >实退总额</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7 dtrowP">{{param.realRefund}}</p>
                  </div>
              </div>
        </div>


  	</div>
  </div>
</template>

<script>
    export default {
    	data() {
    		return {
               flag: '',
               infoTit: '',
               param: {}
    		};
    	},
        filters: {
        	formatVisit(val) {
                return val == 1 ? "初访":"复访"
        	},
            formatIsArrears(val) {
                return val == 1 ? "是":"否"
            }
        },
    	methods: {
    		initData(flag, param) {
                this.flag = ''
                this.infoTit = ''
                this.param = {}

                console.log(flag)
                console.log(param)
                this.flag = flag
                this.param = param

                if (this.flag == 'purchase') {
                    this.infoTit = '产品购买审核'
                } else if (this.flag == 'consumption') {
                    this.infoTit = '消费审核'
                } else if (this.flag == 'refund') {
                    this.infoTit = '退费审核'
                }

    		}

    	}

    }
</script>

<style>
.dtrow{line-height: 34px;font-size: 14px;margin-bottom: 10px;}
.dtrowP{border-bottom:1px solid #555;margin-left: 5px;height: 34px;line-height: 34px;}
</style>
