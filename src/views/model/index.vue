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
        prop="version"
        label="版本"
        width="110"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="upload_user"
        label="上传者"
        width="110"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column prop="intro" label="介绍"></el-table-column>
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
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "模型1",
          version: "0.1",
          upload_user: "k",
          intro: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          name: "模型2",
          version: "0.2",
          upload_user: "j",
          intro: "上海市普陀区金沙江路 1518 弄",
          children: [
            {
              id: 3,
              name: "模型3",
              version: "0.2.0",
              upload_user: "k",
              intro: "上海市普陀区金沙江路 1518 弄",
            },
          ],
        },
      ],
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      this.listLoading = false;
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
  },
};
</script>
