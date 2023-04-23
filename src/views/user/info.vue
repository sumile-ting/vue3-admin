<!-- 个人信息 -->
<template>
  <sumile-page-layout :showFooter="false">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane label="个人信息" name="first">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
            >
              <img
                v-if="ruleForm.avatar"
                :src="ruleForm.avatar"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="ruleForm.realName" />
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
            <el-button @click="clear">清空</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form
          ref="passwordFormRef"
          :model="passwordForm"
          :rules="passwordRules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input v-model="passwordForm.oldPassword" type="password"/>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordForm.newPassword" type="password"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword1">
            <el-input v-model="passwordForm.newPassword1" type="password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdatePassword(passwordFormRef)">提交</el-button>
            <el-button @click="clearPassword(passwordFormRef)">清空</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </sumile-page-layout>
</template>

<script setup>
import { ref, reactive, toRefs, getCurrentInstance } from "vue";
import axios from "@/api/axios.js";
const { proxy } = getCurrentInstance();
const activeName = ref("first");
const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
  realName: "",
});
const rules = reactive({
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
});
const handleClick = (tab, event) => {
  if (activeName.value === "first") {
    proxy.$get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-auth/oauth/user-info`).then((res) => {
      Object.assign(ruleForm, res.data.data);
    });
  }
};
/**
 * 提交个人信息
 */
const onSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
/**
 * 清空个人信息
 */
const clear = () => {
  Object.assign(ruleForm, {
    name: "",
    realName: "",
    email: "",
    phone: " ",
    avatar: " ",
  });
};
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  newPassword1: ''
})
const passwordRules = reactive({
  oldPassword: [
    { required: true, message: "请输入原密码", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
  ],
  newPassword1: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
  ],
})
const passwordFormRef = ref()
/**
 * 提交修改密码
 */
const onUpdatePassword = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
/**
 * 清空修改密码
 * @param {*} formEl 
 */
const clearPassword = (formEl) => {
  if (!formEl) return
  Object.assign(passwordForm, {
    oldPassword: '',
    newPassword: '',
    newPassword1: ''
  })
  formEl.resetFields()
}
handleClick();
</script>

<style scoped>
.sumile-basic-card:deep(>.el-card__body) {
  padding-top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon,
.avatar-uploader .avatar {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
 