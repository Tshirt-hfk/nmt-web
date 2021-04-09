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
        width="100"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="version"
        label="版本"
        width="80"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="upload_user"
        label="上传者"
        width="100"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="updated_date"
        label="上传日期"
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
import { getAllModel } from "@/api/model";

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
      getAllModel({kind: this.$route.name}).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
  },
};
</script>
