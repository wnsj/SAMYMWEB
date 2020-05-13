<template>
    <div class="wraper">
        <!--        <div class="col-md-12 col-lg-12 main-title">-->
        <!--            <h1 class="titleCss">权限管理</h1>-->
        <!--        </div>-->
        <div>
            <el-button type="primary" @click="queryPermission"><i class="el-icon-zoom-in"></i>查询</el-button>
            <el-button type="primary" @click="addPermissionDialog(0)"><i class="el-icon-circle-plus-outline"></i>添加
            </el-button>
            <vxe-table border
                       resizable
                       :tree-config="{children: 'umsPermissionBeanList', accordion: true}"
                       :data="umsPermissionList.permissionData"
                       row-id="upId"
                       v-if="hackRest"
                       ref="permissionVxeTableRef">
                <vxe-table-column field="upName" width="160" title="权限名" tree-node></vxe-table-column>
                <vxe-table-column>
                    <template v-slot="{ row }">
                        <vxe-button status="primary" @click="addPermissionDialog(row.upId)">添加</vxe-button>
                        <vxe-button status="warning" @click="dialogAddPermission = true">修改</vxe-button>
                        <vxe-button status="danger">删除</vxe-button>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </div>
        <!-- 对话框：新建权限 -->
        <el-dialog title="添加权限" width="30%" :visible.sync="dialogAddPermission" ref="dialogAddPermissionRef">
            <el-form label-width="80px">
                <el-form-item label="权限名">
                    <el-input v-model="addPermissionObj.upName"></el-input>
                </el-form-item>
                <el-form-item label="权限值">
                    <el-input placeholder="示例:SAMY:MP:Project:Query" v-model="addPermissionObj.upValue"></el-input>
                </el-form-item>
                <el-form-item label="URI">
                    <el-input placeholder="/MP/Project" v-model="addPermissionObj.upUri"></el-input>
                </el-form-item>
                <el-form-item label="上级">
                    <UmsPermission ref="addUmsPermissionRef" disabled="true" :permisUpId="parentId"></UmsPermission>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch
                        v-model="addPermissionObj.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input placeholder="请输入数字" v-model="addPermissionObj.sort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import UmsPermission from '@/components/common/UmsPermission.vue'

    export default {
        name: "UmsPermissionManage",
        components: {
            UmsPermission
        },
        data() {
            return {
                hackRest: false,
                umsPermissionList: [],
                dialogAddPermission: false,
                addPermissionObj: {
                    upId: 0,
                    upName: '',
                    parentId: 0,
                    upValue: '',
                    upUri: '',
                    status: 1,
                    sort: 0,
                    specialRole: 0
                },
                parentId: 0,
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
            //查询权限
            queryPermission() {
                //强制刷新组件
                this.hackRest = false
                this.$nextTick(() => {
                    this.hackRest = true
                })
                this.umsPermissionList = []
                var param = {}
                var url = this.url + '/umsPermissionAction/queryUmsPermissionByIdAndPower'
                param.accType = '1';
                param.urId = 1
                this.requestData(url, param).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        this.umsPermissionList = responseData.retData;
                        //强制刷新组件
                        this.hackRest = false
                        this.$nextTick(() => {
                            this.hackRest = true
                        })
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    console.log("请求失败处理");
                });
            },
            //添加权限弹窗初始化
            addPermissionDialog(upId) {
                this.addPermissionObj = {
                    upId: 0,
                    upName: '',
                    parentId: 0,
                    upValue: '',
                    upUri: '',
                    status: 1,
                    sort: 0,
                    specialRole: 0
                }

                // this.parentId = upId
                // this.addPermissionObj.parentId = upId
                this.dialogAddPermission = true
                this.$refs.addUmsPermissionRef.setUpId(upId)
            }
        },
        created() {
            this.queryPermission()
        }
    }
</script>

<style scoped>

</style>
