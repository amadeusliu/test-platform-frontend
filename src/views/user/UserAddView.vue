<template>
    <div>
      <h3>请输入用户信息</h3>
            <el-input
    v-model="username"
    placeholder="请输入用户名"
  />

        <el-input
    v-model="password"
    placeholder="请输入密码"
  />

  <el-button @click="addUser" type="primary">添加用户</el-button>
    </div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';
import {httpGet,httpPost} from '../../../public/static/js/network/http';
import {UserDetail} from '../../interfaces/UserInterface';


export default {
  data() {
    return {
      username:'',
      password: ''

    }
  },
  methods:{

    addUser(){
      console.log(this.username);
      let u: UserDetail = {username: this.username,password: this.password};
      httpPost("/user/addUser", u,null);
      ElMessage({
        message: '用户添加成功.',
        type: 'success',
        duration: 6000,
        showClose: true
  })
  }
}

  
}
</script>