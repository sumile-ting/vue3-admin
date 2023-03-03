<template>
  <div class="login-container">
    <div class="login-box">
      <el-form :model="userInfo">
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" clearable />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="userInfo.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import { ElMessage } from 'element-plus'
import Md5 from 'js-md5'
import { useUserStore } from '@/stores/user'
import {useRouter} from 'vue-router'
const router = useRouter()
const userInfo = reactive({
  username: "admin",
  password: "Spang1234?!",
  tenantId: '000000',
  grant_type: 'password',
  scope: 'all',
});
const { proxy } = getCurrentInstance();
const {setUserInfo} = useUserStore()
const onSubmit = () => {
  const params = {
    ...userInfo,
    password: Md5(userInfo.password)
  }

  proxy.$post(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-auth/oauth/token`, params, null, {
		headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Tenant-Id': '000000'
    }			
	}).then((res) => {
    setUserInfo(res.data)
    router.push({path: '/'})
  }, res => {
    ElMessage({
      message: res.response.data.error_description || '未知错误',
      type: "error"
    });
  })
};

</script>

<style scoped>
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
}
.login-box {
  width: 430px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
}
</style>
