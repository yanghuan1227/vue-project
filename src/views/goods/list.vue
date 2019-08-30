<template>
  <div class="list">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="goodsobj.query"
        class="input-with-select"
        style="width:300px;margin-right:10px"
        @keydown.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" @click="$router.push({name: 'add'})">添加商品</el-button>
    </div>
    <!-- 表格展示区域 -->
    <el-table border :data="goodsList" style="width: 100%;margin-top:15px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="550"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"  width="180">
          <tempalte slot-scope='scope'>
              {{scope.row.add_time | timeFormat}}
          </tempalte>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="审核" placement="top">
            <el-button type="success" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsobj.pagenum"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="goodsobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getAllGoodsList } from '@/api/goods-index.js'
import { timeFormat } from '@/utils/myfilters'
export default {
  data () {
    return {
      goodsList: [],
      total: 0,
      goodsobj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  //   注册过滤器
  filters: {
    timeFormat
  },
  mounted () {
    this.init()
  },
  methods: {
    //   数据初始化
    async init () {
      let res = await getAllGoodsList(this.goodsobj)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
      } else if (res.data.meta.status === 401) {
        this.$message.warning(res.data.meta.msg)
      }
    },
    //   当切换sizes下拉列表时触发
    handleSizeChange (val) {
      this.goodsobj.pagesize = val
      this.init()
    },
    //   当切换当前页码时触发
    handleCurrentChange (val) {
      // 1.修改参数
      this.goodsobj.pagenum = val
      // 2.重新请求
      this.init()
    }
  }
}
</script>
<style scoped>
</style>
