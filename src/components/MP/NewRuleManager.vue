<template>
	<div class="hello">
		<el-container style="width: 100%; height: 100%; border: 1px solid #eee">

			<el-col :md="6" :lg="6" :xl="6" style="border-right:2px solid #e9e9e9;">
				<div class="roleBox">
					<el-header>角色列表</el-header>
					<div class="btns">
						<el-button type="primary" @click="dialogAddRole = true"><i class="el-icon-circle-plus-outline"></i> 新建</el-button>
						<el-button type="primary" @click="dialogUpdateRole = true"><i class="el-icon-circle-check"></i> 修改</el-button>
						<el-button type="danger" @click="dialogDelRole = true"><i class="el-icon-remove-outline"></i> 删除</el-button>
					</div>
					<vxe-table border ref="xTable1" :data="tableData" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent">
						<vxe-table-column type="checkbox" width="40"></vxe-table-column>
						<vxe-table-column field="roleName" width="80" title="角色名"></vxe-table-column>
						<vxe-table-column field="roleType" width="80" title="类型"></vxe-table-column>
						<vxe-table-column field="roleDesc" title="描述"></vxe-table-column>
					</vxe-table>

					<!-- 对话框：新建角色 -->
					<el-dialog title="新建角色" width="30%" :visible.sync="dialogAddRole">
						<el-form label-width="80px">
							<el-form-item label="角色名">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="类型">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogAddRole = false">取 消</el-button>
							<el-button type="primary" @click="dialogAddRole = false">确 定</el-button>
						</div>
					</el-dialog>
					<!-- 对话框：修改角色 -->
					<el-dialog title="修改角色" width="30%" :visible.sync="dialogUpdateRole">
						<el-form label-width="80px">
							<el-form-item label="角色名">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="类型">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogUpdateRole = false">取 消</el-button>
							<el-button type="primary" @click="dialogUpdateRole = false">确 定</el-button>
						</div>
					</el-dialog>
					<!-- 对话框：删除角色 -->
					<el-dialog title="删除角色" width="30%" :visible.sync="dialogDelRole">
						<span>确认删除角色？</span>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogDelRole = false">取 消</el-button>
							<el-button type="primary" @click="dialogDelRole = false">确 定</el-button>
						</div>
					</el-dialog>

				</div>
			</el-col>

			<el-col :md="18" :lg="18" :xl="18">
				<div class="limitsBox">
					<el-header class="bg-purple">权限设置</el-header>
					<div class="btns">
						<el-button type="primary"><i class="el-icon-folder-checked"></i> 保存</el-button>
						<el-button type="primary"><i class="el-icon-refresh-right"></i> 重置</el-button>
						<el-button type="primary"><i class="el-icon-circle-check"></i> 全选</el-button>
						<el-button type="danger"><i class="el-icon-remove-outline"></i> 全不选</el-button>
					</div>


					<vxe-table resizable :tree-config="{children: 'childrens'}" :data="tableData1.roleData" :checkbox-config="{labelField: 'roleName', highlight: true}"
					 @checkbox-change="selectChangeEvent">
						<vxe-table-column type="checkbox" title="权限名" width="280" tree-node></vxe-table-column>
						<vxe-table-column field="roleStatus" title="状态"></vxe-table-column>
						<vxe-table-column field="roleKey" title="关键字"></vxe-table-column>
						<vxe-table-column field="roleDesc" title="描述"></vxe-table-column>
					</vxe-table>
				</div>
			</el-col>


		</el-container>

	</div>
</template>

<script>
	import treeTable from "./../treeTable"
	export default {

		name: 'HelloWorld',
		data() {
			return {
				tableData1: {
					
					grade:'3',
					roleData:[{
							roleId: '1',
							roleName: '会员管理',
							roleStatus: '02',
							roleKey: '01',
							roleDesc: '基础设置11',
							childrens: [{
									roleName: '会员管理',
									roleStatus: '02',
									roleKey: '01',
									roleDesc: '基础设置11',
									childrens: [{
											roleName: '增加会员',
											roleStatus: '02',
											roleKey: '01',
											roleDesc: '高级设置11'
										},
										{
											roleName: '修改会员',
											roleStatus: '02',
											roleKey: '01',
											roleDesc: '高级设置11'
										}
									]
								},
								{
									roleName: '会员汇总',
									roleStatus: '02',
									roleKey: '01',
									roleDesc: '高级设置11',
									childrens: []
								}
							]
						},
						{
							roleId: '1',
							roleName: '购买课程',
							roleStatus: '02',
							roleKey: '01',
							roleDesc: '基础设置11',
							childrens: []
						},
					]
				},
				tableData: [{
					roleName: '店长',
					roleType: '普通',
					roleDesc: '投诉一下'
				}, {
					roleName: '咨询师',
					roleType: '普通',
					roleDesc: '只可查看工单'
				}, {
					roleName: '前台',
					roleType: '普通',
					roleDesc: '质检描述。。'
				}, {
					roleName: '咨询师助理',
					roleType: '普通',
					roleDesc: '超管，哈哈哈哈'
				}],
				multipleSelection: [],
				dialogAddRole: false,
				dialogUpdateRole: false,
				dialogDelRole: false,


			}
		},

		methods: {
			selectAllEvent({
				checked,
				records
			}) {
				console.log(checked ? '所有勾选事件' : '所有取消事件', records)

			},
			selectChangeEvent({
				checked,
				records
			}) {
				console.log(checked ? '勾选事件' : '取消事件', records)
				console.log(JSON.stringify(this.tableData1))
			},


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
