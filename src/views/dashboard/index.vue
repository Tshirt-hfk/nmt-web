<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前用户: {{ name }}</div>
    <el-table
      :data="list"
      v-loading="listLoading"
      element-loading-text="加载中"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="user" label="用户" sortable width="180">
      </el-table-column>
      <el-table-column prop="operation" label="操作" :formatter="formatter">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAllRecord } from "@/api/record";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
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
      getAllRecord().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    formatter(row, column) {
      return row.user+"在"+row.date+row.operation;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 24px;
  }
  &-text {
    font-size: 24px;
    line-height: 32px;
  }
}
</style>
