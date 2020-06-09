<!-- add and modify position -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}产品</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">产品名称</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.proName" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">咨询师</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <emp ref='emp' @employeeChange='empChange'></emp>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">总价</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.totalPrice" placeholder="">
                            <span class="pos-ab pos-tr">¥</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">优惠后总价</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.discouAmount" placeholder="">
                            <span class="pos-ab pos-tr">¥</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">单价</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.price" placeholder="">
                            <span class="pos-ab pos-tr">¥</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">课时</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.frequency">
                            <span class="pos-ab pos-tr">H</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">优惠比例</label><span class="sign-left">:</span>
                        <div class="col-md-8 pos-re">
                            <input type="text" class="form-control" v-model="project.discount" placeholder="">
                            <span class="pos-ab pos-tr">%</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">是否停用</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.state">
                                <option value="1">在用</option>
                                <option value="0">停用</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">是否可退款</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.isRefund">
                                <option value="0">否</option>
                                <option value="1">是</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">到期时间</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.endDay">
                            <span class="pos-ab pos-tr">天</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">咨询师等级</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.empLevel">
                                <option value="1">资深级</option>
                                <option value="2">专家级</option>
                                <option value="3">高级</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">产品类型</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.proType">
                                <option value="0">普通</option>
                                <option value="1">月卡</option>
                                <option value="2">季卡</option>
                                <option value="3">半年卡</option>
                                <option value="4">年卡</option>
                                <option value="5">测评</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12 form-group clearfix">
                        <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal"
                                v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal"
                                v-on:click="certainAction()">确认
                        </button>
                    </div>
                </form>
            </div>

        </div>

    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'
    import emp from '../../common/Employee.vue'

    export default {
        components: {
            dPicker,
            emp,
        },
        data() {
            return {
                project: {
                    proName: '',
                    empId: '',
                    state: '1',
                    price: '',
                    frequency: '',
                    discount: '',
                    proType: '0',
                    isRefund: '1',
                    totalPrice: 0,
                    discouAmount: 0,
                    endDay: 0,
                    empLevel: 1
                },
                title: '',
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, project) {
                if (param == 'add') {
                    console.log('Initialization project’s content, which adds project')
                    this.title = '新增'
                    this.project = {
                        proName: '',
                        empId: '',
                        state: '1',
                        price: '',
                        proType: '1',
                        frequency: '',
                        discount: '',
                        isRefund: '1',
                        totalPrice: 0,
                        discouAmount: 0,
                        endDay: 0,
                        storeId: this.storeId(),
                        empLevel: 1,
                        proType:0
                    }
                    this.$refs.emp.setPosName("咨询师")
                    this.$refs.emp.setEmp("")
                } else if (param == 'modify') {
                    console.log('Initialization project’s content, which modifies project')
                    this.title = '修改'
                    Object.assign(this.project, project)
                    this.$refs.emp.setPosName("咨询师")
                    if (this.isBlank(this.project.empId)) this.project.empId = ''
                    this.$refs.emp.setEmp(this.project.empId)
                }
            },

            empChange(param) {
                if (this.isBlank(param)) {
                    this.project.empId = ""
                } else {
                    this.project.empId = param.empId
                }
            },
            //the event of addtional button
            certainAction() {
                console.log('the event of addtional button')

                if (this.isBlank(this.project.proName)) {
                    alert("产品名称不能为空!")
                    return
                }
                if (this.isBlank(this.project.empId)) {
                    alert("咨询师不能为空!")
                    return
                    //this.project.empId = null
                }
                if (this.isBlank(this.project.price) || this.project.price < 0) {
                    alert("课时单价不能为空!")
                    return
                }
                if (this.isBlank(this.project.frequency)) {
                    alert("课时不能为空!")
                    return
                }
                // if (this.isBlank(this.project.discount)) {
                //     alert("折扣不能为空")
                //     return
                // }
                // if(this.project.proType == 0 && this.isBlank(this.project.empId)){
                //     alert("普通产品必须关联咨询师!")
                //     return;
                // }
                switch (this.title) {
                    case '新增':
                        var url = this.url + '/projects/addProjectName'
                        break;
                    case '修改':
                        var url = this.url + '/projects/updateProjectName'
                        break;
                }

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.project,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('certainAction')
                    }
                }).catch((error) => {
                    console.log('产品信息请提交失败')
                });
            },
            closeCurrentPage() {
                $("#projectContent").modal("hide")
                console.log('关闭添加产品界面')
            },
        }

    }
</script>

<style>

</style>
