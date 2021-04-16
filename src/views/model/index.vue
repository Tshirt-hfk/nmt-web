<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      element-loading-text="加载中"
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
            @click.native.prevent="
              downloadData(
                scope.row,
              )
            "
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
import { getAllModel, downloadModel } from "@/api/model";

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
      getAllModel({ kind: this.$route.name }).then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    downloadData(item) {
      downloadModel({ id: item.id }).then((file) => {
        const blob = new Blob([file]);
        const fileName = item.name + "-V" + item.version + "." + item.path.split(".").pop();
        const link = document.createElement("a");
        link.download = fileName;
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      });
    },
  },
};
</script>
