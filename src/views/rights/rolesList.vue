<template>
  <div class="rolesList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮添加 -->
    <el-button type="success">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="rolesList" border style="width: 100%;margin-top:15px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 这个内容在我们的项目中需要我们自己来生成 -->
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:15px;border-bottom:1px dashed #f00;"
          >
            <el-col :span="4">
              <el-tag
                closable
                :type="'success'"
                @close="delRight(scope.row,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:10px;">
                <el-col :span="4">
                  <el-tag
                    closable
                    :type="'info'"
                    @close="delRight(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    :type="'error'"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-right:5px;margin-bottom:5px"
                    @close="delRight(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length === 0">还没有任何的权限，先分配！！</el-col>
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
            <el-button type="success" icon="el-icon-share" @click="showGrantDialog(scope.row)"></el-button>
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
        ref="tree"
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="chkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllRoleList,
  delRightByRoleId,
  grantRoleById
} from "@/api/role-index.js";
import { getAllRightsList } from "@/api/right-index.js";
export default {
  data() {
    return {
      roleId: [],
      cnt: 0,
      defaultProps: {
        label: "authName",
        children: "children"
      },
      grantdialogTableVisible: false,
      rolesList: [],
      rightsList: [],
      //   当前角色所拥有的权限id
      chkedArr: []
    };
  },
  methods: {
    // async:标记这个函数中会有异步操作  和await一起使用
    // 实现角色授权
    async grantRole() {
      let arr = this.$refs.tree.getCheckedNodes();
      let temp = [];
      for (var i = 0; i < arr.length; i++) {
        temp.push(arr[i].id + "," + arr[i].pid);       
      }
      // 拼接数组元素在转换为数组
      temp = temp.join(',').split(',')
      // 在数组中去重
      temp = [...new Set(temp)]

      let res = await grantRoleById(this.roleId,temp.join(','))
        console.log(res)
        if(res.data.meta.status ===200){
          this.$message.success(res.data.meta.msg)
          this.grantdialogTableVisible = false
          this.init() 
        }else{
          this.$message.error(res.data.meta.msg)
        }
    },
    // 弹出角色权限对话框
    showGrantDialog(row) {
      // 这里进行数据的存储是为了后期角色授权时能够正确获取角色id
      this.roleId = row.id;
      // 1.让对话框显示
      this.grantdialogTableVisible = true;
      // 2.加载树形结构的数据  深拷贝
      this.rightsList = [...this.rightsList];
      this.chkedArr.length = 0;
      // 获取当前角色id，添加到chkedArr
      // 只需要获取最后一级   做一下判断
      row.children.forEach(first => {
        if (first.children.length > 0) {
          first.children.forEach(second => {
            if (second.children.length > 0) {
              second.children.forEach(third => {
                this.chkedArr.push(third.id);
              });
            }
          });
        }
      });
    },
    delRight(row, rightId) {
      console.log(row.id, rightId);
      delRightByRoleId(row.id, rightId)
        .then(res => {
          console.log(res);
          // 刷新,不要使用init，因为init会刷新整个表格，造成展开行合并
          //   this.init()
          // res.data.data就是实现当前权限删除操作后该角色还拥有的权限数据
          // 为了避免刷新整个表格，我们可以将这个数据重置当前角色的展开行数据
          // 展开行数据：scope.row.children
          if (this.cnt === 0) {
            this.$message.success("删除角色权限成功");
            this.cnt++;
          }
          row.children = res.data.data;
          row.children.forEach((v1, in1) => {
            // 遍历一级权限
            if (v1.children.length === 0) {
              // 说明这个一级权限下面没有二级权限
              this.delRight(row, v1.id);
            } else {
              v1.children.forEach((v2, in2) => {
                if (v2.children.length === 0) {
                  // 说明这个二级权限下面没有三级权限
                  this.delRight(row, v2.id);
                }
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    init() {
      // 角色列表
      getAllRoleList().then(res => {
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
<style lang="less" scoped>
</style>
