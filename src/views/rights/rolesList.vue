<template>
  <div class="rolesList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮 -->
    <el-button type="success" round>成功按钮</el-button>
    <!-- 表格 -->
    <el-table :data="rolesList" border style="width: 100%;margin-top:15px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 这个内容在我们的项目中需要自己来生成 -->
          <el-row v-for="first in scope.row.children" :key="first.id">
            <el-col :span="4">
              <el-tag
                closable
                :type="'success'"
                @close="delRight(scope.row,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:10px"> 
                <el-col :span="4">
                  <el-tag
                    closable
                    :type="'info'"
                    @close="delRight(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    v-for="third in second.children"
                    :key="third.id"
                     style="margin-right:5px;margin-bottom:5px"
                    closable
                    :type="'error'"
                    @close="delRight(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length === 0">还没有任何权限，请先分配！</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色授权" placement="top">
            <el-button type="success" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限对话框 -->
    <el-dialog title="权限分配" :visible.sync="grantdialogTableVisible">
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        :default-expand-all='true'
        :default-checked-keys="chkedArr"
        :props="defaultProps"
      ></el-tree>
    </el-dialog>
  </div>
</template>

<script>
import { getAllRolesList, delRightByRoleId } from "@/api/role-index";
import { getAllRightsList } from "@/api/right-index";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "authName"
      },
      grantdialogTableVisible: true,
      rolesList: [],
      rightsList: [],
      // 当前角色所拥有的权限id
      chkedArr: []
    };
  },
  methods: {
    delRight(row, rightId) {
      console.log(row.id, rightId);
      delRightByRoleId(row.id, rightId)
        .then(res => {
          console.log(res);
          row.children = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    init() {
      // 角色列表
      getAllRolesList().then(res => {
        console.log(res);
        if (res.data.meta.status === 200) {
          this.rolesList = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.init();
    getAllRightsList("tree").then(res => {
      console.log(res);
      this.rightsList = res.data.data;
    });
  }
};
</script>

<style lang="less">
</style>