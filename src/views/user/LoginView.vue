<template>
<h3>登录测试应用平台</h3>
  <el-input type="text" v-model="username" placeholder="请输入用户名" style="width:20%"/>
  <br>
  <el-input type="text" v-model="password" placeholder="请输入密码"  style="width:20%"/>
  <br>
  <el-button type="primary" @click="login">登录</el-button>
</template>

<script lang="ts">
import {httpGet,httpPost} from '../../../public/static/js/network/http';
import {TokenData} from '../../../src/interfaces/UserInterface';
import { ElMessage } from 'element-plus'



export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods:{
    login(): void{
        let loginInfo: object = {username:this.username,password:this.password};
        httpPost("/user/userLogin", loginInfo, null).then(response => {
          console.log(JSON.stringify(response))
          if(response.code === 500){
            ElMessage.error('登录失败了哦')
          }else{
            let dataObject = response.data;
            let responseUserString = JSON.stringify(dataObject);
            let responseObject = JSON.parse(responseUserString);

            this.$store.commit("setToken", responseObject.data);
            this.$router.push("main");
          }
        })
    },

  }
}
</script>

