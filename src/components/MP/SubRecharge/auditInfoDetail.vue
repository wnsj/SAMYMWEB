<template>
  <div class="modal-content">
  	<div class="modal-header">
  		<button type="button" aria-hidden="true" class="close" data-dismiss="modal" >×</button>
  		<h2 id="myModalLabel" class="modal-title">{{infoTit}}</h2>
  	</div>
  	<div class="modal-body  pos_r clearfix">
  		<div class="tab-pane fade in active martop " id="basic">
              <div class="row">
                  <div class="col-md-3 ">
                  	<label class="col-md-4 " >姓名</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7" style="border-bottom:1px  solid #555;margin-left: 5px;">{{param.memName}}</p>
                  </div>
                  <div class="col-md-3 ">
                  	<label class="col-md-4 " >姓名</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7" style="border-bottom:1px  solid #555;margin-left: 5px;">{{param.memName}}</p>
                  </div>
                  <div class="col-md-3 ">
                  	<label class="col-md-4 " >姓名</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7" style="border-bottom:1px  solid #555;margin-left: 5px;">{{param.memName}}</p>
                  </div>
                  <div class="col-md-3 ">
                  	<label class="col-md-4 " >姓名</label>
                      <span class="sign-left">:</span>
                  	<p class="col-md-7" style="border-bottom:1px  solid #555;margin-left: 5px;">{{param.memName}}</p>
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
               // flag: '',
               infoTit: '',
               param: {}
    		};
    	},
    	methods: {
    		initData(flag, param) {
                // this.flag = ''
                //this.infoTit = ''
                this.param = {}

                console.log(flag)
                console.log(param)
                // this.flag = flag
                this.param = param

                if (flag == 'purchase') {
                    this.infoTit = '产品购买审核'
                }

    		},

    	},
    	mounted() {

    	}

    }
</script>

<style>
</style>
