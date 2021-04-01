<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="模型名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="模型类型">
        <el-select v-model="form.kind" placeholder="请选择模型类型">
          <el-option label="翻译模型" value="trans" />
          <el-option label="预处理模型" value="pre" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="模型">
        <!-- <el-upload
          class="upload-demo"
          action="customize"
          :limit="1"
          :http-request="upload"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传压缩文件</div>
        </el-upload> -->
        
        <el-upload
          :http-request="chunkedUpload"
          :ref="chunkedUpload"
          :action="uploadUrl"
          :data="uploadData"
          :on-error="onError"
          :before-remove="beforeRemove"
          name="file"
        >
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { chunkedUpload } from "@/utils/chunked-upload";

import { uploadModel, addModel } from "@/api/model";

export default {
  data() {
    return {
      form: {
        name: "",
        kind: "",
        desc: "",
        file: "",
      },
    };
  },
  methods: {
    upload(params) {
      const _file = params.file;

      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("file", _file);

      uploadModel(formData).then((response) => {
        this.form.file = response.data.file_path;
      });
    },
    handleRemove() {
      this.form.file = "";
    },
    handleExceed() {
      this.$message.warning(`当前限制上传 1 个文件!`);
    },
    onSubmit() {
      addModel(this.form).then((response) => {
        this.$message(response.message);
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

