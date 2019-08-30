<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="activeName-0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-card class="box-card">
      <!-- 表单 -->
      <el-form label-width="80px">
        <!-- 标签页 -->
        <el-tabs v-model="activeName" tab-position="left">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称">
              <el-input v-model="goodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="goodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="goodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="goodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                :options="cateList"
                change-on-select
                :props="cascadeProps"
                v-model="goodsForm.goods_cat"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
        <!-- 按钮 -->
        <el-button type="primary" @click="addGoods">主要按钮</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getAllCateList } from "@/api/cate-index";
export default {
  data() {
    return {
      cateList: [],
      cascadeProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      activeName:0,
      goodsForm:{
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      }
    };
  },
  methods: {
      addGoods(){
          console.log(this.goodsForm)
      }
  },
  mounted () {
      getAllCateList(3)
          .then(res=>{
              console.log(res)
              this.cateList = res.data.data
          })
      
  }
};
</script>

<style lang="less">
</style>