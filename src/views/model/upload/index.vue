<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="模型名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="模型版本" prop="version">
        <el-input v-model="form.version" />
      </el-form-item>
      <el-form-item label="模型类型" prop="kind">
        <el-select v-model="form.kind" placeholder="请选择模型类型">
          <el-option label="翻译模型" value="trans" />
          <el-option label="预处理模型" value="pre" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="模型" prop="path">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="customize"
          :multiple="false"
          :limit="1"
          :http-request="upload"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传压缩文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadModel, addModel, existModel } from "@/api/model";

export default {
  data() {
    var checkVersion = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入模型版本"));
      }
      let values = value.split(".");
      for (var i in values) {
        if (!/^\d+$/.test(values[i])) {
          return callback(new Error("请输入正确格式的模型版本（例如：3.2.11）"));
        }
      }
      existModel({
        name: this.form.name,
        version: value
      }).then((response) => {   
        if(response?.data?.isExisted){
          return callback(new Error("模型"+this.form.name+"-V"+value+"已存在"));
        }
        return callback();
      })
      
    };
    return {
      form: {
        name: "",
        version: "",
        kind: "",
        desc: "",
        path: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入模型名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        version: [{ validator: checkVersion, trigger: "blur" }],
        kind: [
          { required: true, message: "请选择模型类型", trigger: "change" },
        ],
        desc: [
          { required: true, message: "请输入模型描述", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        path: [
          { required: true, message: "请选择上传的模型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    upload(uploader) {
      const _file = uploader.file;

      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("file", _file);

      uploadModel(formData, uploader).then((response) => {
        this.form.path = response.data.file_path;
        uploader.onSuccess();
      });
    },
    handleRemove() {
      this.$refs.upload.abort(); //取消上传
      this.form.file = "";
    },
    handleExceed() {
      this.$message.warning(`当前限制上传 1 个文件!`);
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          addModel(this.form).then((response) => {
            this.$message(response.message);
            this.$router.push({ name: this.form.kind });
          });
        } else {
          return false;
        }
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

