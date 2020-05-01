<!-- add and modify order -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 class="modal-title">{{title}}咨询室</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop">
                <form action="" class="clearfix">
                    <div class="col-md-8 form-group clearfix">
                        <label class="col-md-2 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">咨询室名</label>
                        <span class="sign-left">:</span>
                        <div class="col-md-6">
                            <input type="text" class="form-control" v-model="counseRoom.crName">
                        </div>
                        <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal" v-on:click="addOrder(title)">确认
                        </button>
                    </div>
                </form>
                <hr>
                <form action="" class="clearfix">
                    <div class="col-md-12 form-group clearfix">
                        <label style="padding:0;line-height:34px;">关联咨询师</label>
                        <table class="table table-bordered table-hover" id="datatable">
                            <thead class="datathead">
                            <tr>
                                <th class="text-center">咨询师</th>
                                <th class="text-center">
                                    <button type="button" class="btn btn-warning" @click="addConsultantRoomBtn">+
                                    </button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in counseRoom.consultantRoomBeanList" :key="index">
                                <td class="text-center" v-show="!isBlank(item.empName)">{{item.empName}}</td>
                                <td class="text-center" v-show="isBlank(item.empName)">
                                    <emp ref="counlorEmp" @employeeChange="counlorEmpChange" :pn="pn"></emp>
                                </td>
                                <td class="text-center">
                                    <button type="button" class="btn btn-warning" v-show="isBlank(item.empName)"
                                            @click="addConsultantRoom">确定
                                    </button>
                                    <button type="button" class="btn btn-warning" @click="deleteConsultantRoom(item)">删除
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import emp from '@/components/common/Employee.vue'
    import dPicker from 'vue2-datepicker'

    export default {
        components: {
            dPicker,
            emp
        },
        data() {
            return {
                title: '编辑',
                storeId: this.storeId(),
                crName: '',
                counseRoom: {},
                itemObj: {},
                pn: '咨询师'
            };
        },
        methods: {
            initData(param) {
                this.crId = param.crId
                this.queryCounseRoom()
                // this.$refs.counlorEmp.setPosName("咨询师")
                // this.$refs.counlorEmp.setEmp("")
            },
            //the event of addtional button
            addOrder(param) {
                if (this.isBlank(this.counseRoom.crName)) {
                    alert("咨询室名不能为空!")
                    return
                }

                var url = this.url + '/counseRoomAction/updateCounseRoom';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.counseRoom,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.queryCounseRoom()
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            queryCounseRoom() {
                var url = this.url + '/counseRoomAction/queryCounseRoom';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        crId: this.crId,
                        needEmp: 1
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        var retData = res.retData;
                        if (retData.length <= 0) {
                            alert("数据错误!")
                            return
                        }
                        this.counseRoom = retData[0]
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            closeCurrentPage() {
                this.$emit('addOrder')
            },
            addConsultantRoomBtn() {
                let consultantRoomBeanList = this.counseRoom.consultantRoomBeanList;
                if (consultantRoomBeanList.length > 0) {
                    let obj = consultantRoomBeanList[consultantRoomBeanList.length - 1]
                    if (this.isBlank(obj.conrId)) {
                        alert("请先保存数据后再进行添加!");
                        return
                    }
                }
                this.itemObj = {}
                consultantRoomBeanList.push(this.itemObj)
            },
            counlorEmpChange: function (param) {
                if (this.isBlank(param)) {
                    this.itemObj.accId = ""
                } else {
                    this.itemObj.accId = param.empId
                }
            },
            addConsultantRoom() {
                if (this.isBlank(this.itemObj.accId)) {
                    alert("请选择咨询师!")
                    return
                }
                this.itemObj.crId = this.crId
                var url = this.url + '/consultantRoomAction/addConsultantRoom';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.itemObj,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.queryCounseRoom()
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            deleteConsultantRoom(item) {
                var url = this.url + '/consultantRoomAction/deleteConsultantRoom';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: item,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.queryCounseRoom()
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            }
        },
        created() {

        },
        mounted() {
        }
    }
</script>

<style>
    .btnBg {
        background: #f5f5f5;
    }

    .btnBg label {
        margin-bottom: 0;
    }

    .btnBg input {
        margin-top: 10px;
    }
</style>
