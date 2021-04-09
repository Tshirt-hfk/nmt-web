<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="预处理模型">
        <el-select
          v-model="form.pre_model"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="pre_remoteMethod"
          :loading="pre_loading"
        >
          <el-option
            v-for="item in pre_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="翻译模型">
        <el-select
          v-model="form.trans_model" 
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="trans_remoteMethod"
          :loading="trans_loading"
        >
          <el-option
            v-for="item in trans_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { searchModel } from "@/api/model";
import { createExample } from "@/api/example";

export default {
  data() {
    return {
      pre_loading: true,
      trans_loading: true,
      pre_options: [],
      trans_options: [],
      form: {
        name: "",
        pre_model: null,
        trans_model: null,
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      createExample(this.form).then((response) => {
        this.$message(response.message);
        this.$router.push({ name: "example" })
      })
      this.$message("submit!");
    },

    pre_remoteMethod(query) {
      if (query !== "") {
        this.pre_loading = true;
        searchModel({
          query: query,
          kind: "pre",
        }).then((response) => {
          this.pre_options = response.data.items;
          this.pre_loading = false;
        });
      } else {
        this.pre_options = [];
      }
    },
    trans_remoteMethod(query) {
      if (query !== "") {
        this.trans_loading = true;
        searchModel({
          query: query,
          kind: "trans",
        }).then((response) => {
          this.trans_options = response.data.items;
          this.trans_loading = false;
        });
      } else {
        this.trans_options = [];
      }
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

