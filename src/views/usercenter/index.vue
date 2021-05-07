<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          v-model="form.checkPassword"
          autocomplete="off"
        ></el-input>
        <el-button type="primary" @click="onSubmit('password', form.password)"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { modifyInfo } from "@/api/user";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      if (this.form.checkPassword !== "") {
        this.$refs.form.validateField("checkPassword");
        return callback();
      }
      return callback();
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        return callback(new Error("两次输入密码不一致!"));
      } else {
        return callback();
      }
    };

    return {
      form: {
        password: "",
        checkPassword: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    onSubmit(key, value) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {};
          data[key] = value;
          console.log(data);
          console.log(this.$store);
          modifyInfo(data).then((response) => {
            this.$message(response.message);
            this.form.password = "";
            this.form.checkPassword = "";
          });
        } else {
          this.$message.warning(`修改失败!`);
        }
      });
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 400px;
}
.el-button {
  margin-left: 30px;
}
.line {
  text-align: center;
}
</style>

