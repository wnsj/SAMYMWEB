<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">角色管理</h1>
        </div>

        <div class="roleBox">

            <el-row style="margin: 15px 0;">
                <el-col :md="6" :lg="5" :xl="5">
                    <label>门店: </label>
                    <store style="width: 180px;height: 40px; display: inline;" ref='store' @storeChange='storeChange' v-if="accountType"></store>
                </el-col>
                <el-col :md="8" :lg="8" :xl="8">
                    <label>是否启用: </label>
                    <el-select v-model="urStatus">
                        <el-option value="1" label="启用">启用</el-option>
                        <el-option value="0" label="未启用">未启用</el-option>
                    </el-select>
                </el-col>
                <el-col :md="6" :lg="5" :xl="4" style="float: right;">
                    <el-button type="primary" @click="queryRole"><i
                        class="el-icon-zoom-in"></i> 查询
                    </el-button>
                    <el-button type="warning" @click="dialogAddRole = true,roleData = {}"><i
                        class="el-icon-circle-plus-outline"></i> 添加
                    </el-button>
                </el-col>
            </el-row>


            <vxe-table border ref="xTable1" :data="tableData" @checkbox-change="selectChangeEvent">
                <!--@checkbox-all="selectAllEvent"		<vxe-table-column type="checkbox" width="40"></vxe-table-column>-->
                <vxe-table-column field="urName" width="160" title="角色名"></vxe-table-column>
                <vxe-table-column field="urDesc" width="160" title="描述"></vxe-table-column>
                <vxe-table-column field="storeName" title="门店"></vxe-table-column>
                <vxe-table-column field="urStatus" title="状态" :formatter="formatterStatus"></vxe-table-column>
                <vxe-table-column>
                    <template v-slot="{ row }">
                        <vxe-button status="primary" @click="queryPermission(row)">查看权限</vxe-button>
                        <vxe-button status="warning" @click="initUpdateRole(row)">修改</vxe-button>
                    </template>
                </vxe-table-column>

            </vxe-table>

            <!-- 对话框：新建角色 -->
            <el-dialog title="新建角色" width="30%" :visible.sync="dialogAddRole">
                <el-form label-width="80px">
                    <el-form-item label="门店" v-if="accountType">
                        <addRoleStore @storeChange='addRoleStoreChange'></addRoleStore>
                    </el-form-item>
                    <el-form-item label="角色名">
                        <el-input v-model="roleData.urName"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="roleData.urDesc"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="warning" @click="dialogAddRole = false">取 消</el-button>
                    <el-button type="primary" @click="addRole">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 对话框：修改角色 -->
            <el-dialog title="修改角色" width="30%" :visible.sync="dialogUpdateRole">

            </el-dialog>
            <!-- 对话框：删除角色 -->
            <el-dialog title="删除角色" width="30%" :visible.sync="dialogDelRole">
                <span>确认删除角色？</span>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogDelRole = false">取 消</el-button>
                    <el-button status="primary" @click="dialogDelRole = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="row row_edit">
            <!--            添加修改角色的权限-->
            <div class="modal fade" id="permissionContent">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
                            <h4 id="myModalLabel" class="modal-title">修改角色权限</h4>
                        </div>
                        <div class="modal-body  pos_r">
                            <vxe-table resizable :tree-config="{children: 'umsPermissionBeanList'}"
                                       :data="umsPermissionList.permissionData"
                                       row-id="upId"
                                       :checkbox-config="{labelField: 'upName', highlight: true,checkRowKeys: umsPermissionList.checkRowKeysList}"
                                       @checkbox-change="selectChangeEvent"
                                       v-if="hackRest"
                                       ref="permissionVxeTableRef">
                                <vxe-table-column type="checkbox" title="权限名" width="280"
                                                  tree-node></vxe-table-column>
                                <!-- <vxe-table-column field="roleStatus" title="状态"></vxe-table-column>-->
                                <!-- <vxe-table-column field="roleKey" title="关键字"></vxe-table-column>-->
                                <!-- <vxe-table-column field="roleDesc" title="描述"></vxe-table-column>-->
                            </vxe-table>
                            <div class="btns" style="text-align: right;">
                                <el-button type="primary" @click="addUpdatePermission"><i class="el-icon-folder-checked"></i> 保存</el-button>
                                <!-- <el-button status="primary"><i class="el-icon-refresh-right"></i> 重置-->
                                <!-- </el-button>-->
                                <!-- <el-button status="primary"><i class="el-icon-circle-check"></i> 全选-->
                                <!-- </el-button>-->
                                <!-- <el-button type="danger"><i class="el-icon-remove-outline"></i> 全不选-->
                                <!-- </el-button>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--            修改角色-->
            <div class="modal fade" id="updateRoleContent">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
                            <h4 id="myModalLabel" class="modal-title">修改角色</h4>
                        </div>

                        <div class="modal-body  pos_r">
                            <div class="tab-pane fade in active martop">
                                <el-form label-width="80px" label-position="left">
                                    <el-form-item label="门店">
                                        <updateRoleStore ref="updateRoleStoreRef" disabled="true"></updateRoleStore>
                                    </el-form-item>
                                    <el-form-item label="角色名">
                                        <el-input v-model="updateRoleData.urName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="描述">
                                        <el-input v-model="updateRoleData.urDesc"></el-input>
                                    </el-form-item>
                                    <el-form-item label="启用">
                                        <el-select v-model="updateRoleData.urStatus" style="width: 100%;">
                                            <el-option value="1" label="启用">启用</el-option>
                                            <el-option value="0" label="未启用">未启用</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer" style="text-align: right;">
                                    <el-button type="warning" @click="closeCurrentPage">取 消</el-button>
                                    <el-button type="primary" @click="updateRole">确 定</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from '@/components/common/Store.vue'
    import addRoleStore from '@/components/common/Store.vue'
    import updateRoleStore from '@/components/common/Store.vue'
    import {
        init
    } from '@/../static/js/common.js'

    export default {
        name: 'HelloWorld',
        components: {store, addRoleStore, updateRoleStore},
        data() {
            return {
                roleData: {},
                tableData: [],
                multipleSelection: [],
                dialogAddRole: false,
                dialogUpdateRole: false,
                dialogDelRole: false,
                urStatus: '1',
                accountType: this.accountType(),
                stId: '',
                umsPermissionList: [],
                hackRest: true,
                urId: '',
                addRoleStoreId: '',
                updateRoleData: {
                    urI: null,
                    urName: null,
                    urDesc: null,
                    urStatus: null,
                    storeId: null,
                },
                updateRoleStoreFlag: true
            }
        },

        methods: {
            //公共请求方法,返回响应数据
            requestData(url, rquestParam) {
                return new Promise((resolve, reject) => {
                    axios({
                        method: "post",
                        url: url,
                        headers: {
                            "Content-Type": this.contentType,
                            "Access-Token": ''
                        },
                        data: rquestParam,
                        dataType: "json"
                    }).then((response) => {
                        resolve(response.data);
                    }).catch(
                        function (error) {
                            reject(error)
                        }
                    );
                });
            },
            selectAllEvent({checked, records}) {
                console.log(checked ? '所有勾选事件' : '所有取消事件', records)
            },
            selectChangeEvent({
                                  checked,
                                  records
                              }) {
                console.log(checked ? '勾选事件' : '取消事件', records)
                console.log(JSON.stringify(this.umsPermissionList))
            },
            printLog(item) {
                console.log("item:" + item)
                alert(item)
            },
            //查询角色
            queryRole() {
                var url = this.url + '/umsRoleAction/queryUmsRole'
                var param = {}
                if (this.isBlank(this.stId)) {
                    param.storeId = this.accountType ? '' : this.storeId();
                } else {
                    param.storeId = this.stId
                }

                param.accType = this.accountType ? '1' : '2';
                param.urStatus = this.urStatus;
                this.requestData(url, param).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        this.tableData = responseData.retData;
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    console.log("请求失败处理");
                });
            },
            //切换门店
            storeChange(param) {
                if (this.isBlank(param)) {
                    this.stId = ""
                } else {
                    this.stId = param.storeId
                }
            },
            //添加角色页门店切换
            addRoleStoreChange(param) {
                if (this.isBlank(param)) {
                    this.addRoleStoreId = ""
                } else {
                    this.addRoleStoreId = param.storeId
                }
            },
            //查询权限
            queryPermission(param) {
                //强制刷新组件
                this.hackRest = false
                this.$nextTick(() => {
                    this.hackRest = true
                })
                this.umsPermissionList = []
                var url = this.url + '/umsPermissionAction/queryUmsPermissionByIdAndPower'
                param.accType = this.accountType ? '1' : '2';
                this.requestData(url, param).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        this.umsPermissionList = responseData.retData;
                        $("#permissionContent").modal('show')
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    console.log("请求失败处理");
                });
            },
            //关闭弹窗
            closeCurrentPage() {
                $("#permissionContent").modal('hide')
                $("#updateRoleContent").modal("hide")
                this.roleData = {}
                this.dialogUpdateRole = false
                this.dialogAddRole = false;
                this.$refs.updateRoleStoreRef.setStore('')
                this.queryRole()
            },
            //添加修改权限
            addUpdatePermission() {
                //获取所有选中
                var param = []
                let selectRecords = this.$refs.permissionVxeTableRef.getCheckboxRecords()
                if (selectRecords.length > 0) {
                    param = selectRecords;
                } else {
                    if (this.isBlank(this.urId)) {
                        alert("角色id为空!")
                        return
                    }
                    param.push({
                        urId: this.urId
                    })
                }
                var url = this.url + '/umsPermissionAction/updateUmsPermissionRelation'
                this.requestData(url, param).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        alert(responseData.retMsg);
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    console.log("请求失败处理");
                });
                console.log(selectRecords)
            },
            //添加角色
            addRole() {
                if (this.isBlank(this.roleData.urName)) {
                    alert("角色名为空!")
                    return
                }
                if (!this.accountType) {
                    this.roleData.storeId = this.storeId()
                } else {
                    if (this.isBlank(this.addRoleStoreId)) {
                        this.roleData.storeId = this.storeId()
                    } else {
                        this.roleData.storeId = this.addRoleStoreId
                    }
                }
                this.roleData.urStatus = 1;
                this.roleData.accType = 2;
                var url = this.url + '/umsRoleAction/addUmsRole'
                this.requestData(url, this.roleData).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        alert(responseData.retMsg);
                        this.closeCurrentPage()
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    console.log("请求失败处理");
                });
            },
            //初始化修改角色数据
            initUpdateRole(param) {
                this.updateRoleData = {
                    urI: null,
                    urName: null,
                    urDesc: null,
                    urStatus: null,
                    storeId: null,
                }
                //this.dialogUpdateRole = true
                this.updateRoleData.urId = param.urId
                this.updateRoleData.urName = param.urName
                this.updateRoleData.urDesc = param.urDesc
                this.updateRoleData.urStatus = param.urStatus
                this.updateRoleData.storeId = param.storeId
                this.$refs.updateRoleStoreRef.setStore(param.storeId)
                $("#updateRoleContent").modal("show")
            },
            //修改角色
            updateRole() {
                if (this.isBlank(this.updateRoleData.urName)) {
                    alert("角色名为空!")
                    return
                }
                var url = this.url + '/umsRoleAction/updateUmsRole'
                this.requestData(url, this.updateRoleData).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        alert(responseData.retMsg);
                        this.closeCurrentPage()
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    console.log("请求失败处理");
                });
            },
            //格式化表格内容
            formatterStatus ({ cellValue }) {
                return cellValue == 1 ? '启用' : '未启用'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
        font-weight: bold;
    }

    .roleBox {
        width: 100%;
        height: 100%;
        /* border-right: 5px solid #999; */
    }

    .btns {
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 8px 0 8px 10px;
        border-bottom: 1px solid #e9e9e9;
    }

    .limitsBox .el-header {
        background: #d3dce6;
    }

    /* .el-form-item__label{width: 20%;} */


    .el-aside {
        color: #333;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
