<template>
    <div class="wraper">
               <div class="col-md-12 col-lg-12 main-title">
                   <h1 class="titleCss">权限管理</h1>
               </div>

        <div>
           <!-- <el-collapse-transition>-->
			<div class="rightBox margin-10"> 
			<el-col :md="6" :lg="5" :xl="4" class="jh-fr">
			    <el-button type="primary" @click="queryPermission"><i
			        class="el-icon-zoom-in"></i> 查询
			    </el-button>
			    <el-button type="warning" class=" jh-fr" @click="permissionDialog(1,0)" v-has="'SAMY:MP:NewRuleManager:Add'"><i
			        class="el-icon-circle-plus-outline"></i> 添加
			    </el-button>
			</el-col>
			
            <!-- <el-button type="primary" @click="queryPermission"><i class="el-icon-zoom-in"></i>查询</el-button>
            <el-button type="primary" @click="permissionDialog(1,0)"><i class="el-icon-circle-plus-outline"></i>添加 -->
            </el-button>
			</div>
            <!-- </el-collapse-transition> -->
           <!-- <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect"  @mouseenter="dataOpen">
                <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
            </div> -->
            <vxe-table border
                       resizable
                       :tree-config="{children: 'umsPermissionBeanList', accordion: true}"
                       :data="umsPermissionList.permissionData"
                       row-id="upId"
                       v-if="hackRest"
                       ref="permissionVxeTableRef"
					   max-height="650">
                <vxe-table-column field="upName" width="160" title="权限名" tree-node></vxe-table-column>
                <vxe-table-column>
                    <template v-slot="{ row }">
                        <vxe-button status="primary" @click.native="permissionDialog(1,row.upId)">添加</vxe-button>
                        <vxe-button status="warning" @click="permissionDialog(2,row.upId,row)">修改</vxe-button>
                        <vxe-button status="danger" @click="delPermission(row.upId)">删除</vxe-button>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </div>
        <!-- 对话框：新建权限 -->
        <el-dialog :title="title" width="40%" :visible.sync="permissionDialogFlag">
            <el-form label-width="100px">
                <el-form-item label="权限名">
                    <el-input v-model="permissionObj.upName"></el-input>
                </el-form-item>
                <el-form-item label="权限值">
                    <el-input placeholder="示例:SAMY:MP:Project:Query" v-model="permissionObj.upValue"></el-input>
                </el-form-item>
                <el-form-item label="URI">
                    <el-input placeholder="/MP/Project" v-model="permissionObj.upUri"></el-input>
                </el-form-item>
                <el-form-item label="上级">
                    <UmsPermission ref="addUmsPermissionRef" disabled="true" :permisUpId="permissionObj.parentId"
                                   v-if="umsPermissionflag"></UmsPermission>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch
                        v-model="permissionObj.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949" style="margin-left: -386px;">
                    </el-switch>
                </el-form-item>
                <el-form-item label="超管仅有">
                    <el-select v-model="permissionObj.specialRole" style="margin-left: -210px;">
                        <el-option value="0" label="否">否</el-option>
                        <el-option value="1" label="是">是</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input placeholder="请输入数字" v-model="permissionObj.sort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" @click="closeCurrPage">取 消</el-button>
                <el-button type="primary" @click="operatPermission">确 定</el-button>
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
                showSelect:true,
                hackRest: false,
                umsPermissionList: [],
                permissionDialogFlag: false,
                permissionObj: {
                    upId: 0,
                    upName: '',
                    parentId: 0,
                    upValue: '',
                    upUri: '',
                    status: true,
                    sort: 0,
                    specialRole: '0'
                },
                umsPermissionflag: false,
                title: '添加权限'
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
            // dataOpen(){
            //     if(this.showSelect) return
            //     this.showSelect = true;
            // },
            //查询权限
            queryPermission() {
                // this.showSelect = false
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
                    //console.log("请求失败处理");
                });
            },
            //权限弹窗初始化
            permissionDialog(operat, upId, permissionObj) {
                if (operat == 1) {
                    this.title = '添加权限'
                    this.permissionObj = {
                        upId: 0,
                        upName: '',
                        upValue: '',
                        upUri: '',
                        status: true,
                        sort: 0,
                        specialRole: '0',
                        parentId: upId
                    }
                } else {
                    this.title = '修改权限'
                    this.permissionObj = {
                        upId: permissionObj.upId,
                        upName: permissionObj.upName,
                        parentId: permissionObj.parentId,
                        upValue: permissionObj.upValue,
                        upUri: permissionObj.upUri,
                        status: permissionObj.status == 1 ? true : false,
                        sort: permissionObj.sort,
                        specialRole: permissionObj.specialRole,
                    }
                }


                //方法一：强制刷新组件，否则子组件不会刷新（缺点：子组件会多次请求接口）
                this.umsPermissionflag = false
                this.$nextTick(() => {
                    this.umsPermissionflag = true
                })
                //方法二：延时调用子组件方法setTimeout(()=>{this.$refs.addUmsPermissionRef.setUpId(upId)},0)
                //显示弹窗
                this.permissionDialogFlag = true
            },
            //添加修改权限
            operatPermission() {
                if (this.isBlank(this.permissionObj.upName)) {
                    alert("权限名为空!");
                    return
                }
                var param = {}
                Object.assign(param, this.permissionObj)
                param.status = param.status ? 1 : 0;
                var url = this.title == '添加权限' ? this.url + '/umsPermissionAction/addUmsPermission' : this.url + '/umsPermissionAction/updateUmsPermission'
                this.requestData(url, param).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        alert(responseData.retMsg);
                        this.closeCurrPage()
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    //console.log("请求失败处理");
                });
            },
            //关闭弹窗
            closeCurrPage() {
                this.permissionDialogFlag = false
                this.queryPermission()
            },
            //删除权限
            delPermission(upId) {
                if (!confirm("确定删除?删除后可能会导致结构改变请谨慎操作!")) return
                var url = this.url + '/umsPermissionAction/deleteUmsPermission'
                var param = {}
                param.upId = upId
                this.requestData(url, param).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        alert(responseData.retMsg);
                        this.closeCurrPage()
                    } else {
                        alert(responseData.retMsg);
                    }
                }, (error) => {
                    //console.log("请求失败处理");
                });
            }
        },
        created() {
            //this.queryPermission()
        }
    }
</script>

<style scoped>
	.rightBox{
		display: flex;
		justify-content: flex-end;
	}
</style>
