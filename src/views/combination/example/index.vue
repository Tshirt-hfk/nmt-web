<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        label="名称"
        width="110"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="author_name"
        label="创建者"
        width="110"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="created_date"
        label="创建日期"
        width="140"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="pre_model"
        label="预处理模型"
        width="140"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="trans_model"
        label="翻译模型"
        width="140"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column prop="desc" label="介绍"></el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllExample } from "@/api/example";

export default {
  data() {
    return {
      list: [],
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getAllExample().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
  },
};
</script>
