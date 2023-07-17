<template>
  <h2>测试应用平台</h2>
  <label>{{loggedUser}}</label>
  <el-button @click="logout">退出登录</el-button>
      <div class="user">



  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-sub-menu index="1">
      <template #title>测试</template>
      <el-menu-item index="fileUpload">测试工具上传</el-menu-item>
      <el-menu-item index="fileList">测试工具列表</el-menu-item>
      <el-menu-item index="checkTool">在线校验工具</el-menu-item>
    </el-sub-menu>
        <el-sub-menu index="2">
      <template #title>用户管理</template>
      <el-menu-item index="userAdd">用户添加</el-menu-item>
      <el-menu-item index="userList">用户列表</el-menu-item>
    </el-sub-menu>
  </el-menu>

    <br>
      <router-view></router-view>
    </div>

  
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import {httpGet,httpPost} from '../../../public/static/js/network/http';

export default {
  data() {
    return {
        activeIndex:3,
        username: '',
        password: '',
        loggedUser:''
    }
  },

  mounted(){
    this.loggedUser = this.$store.state.token;

  },

  methods:{
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("setToken",null);

      this.$router.push("/login");
    },

    handleSelect(index: string): void{
        if(index === "fileUpload"){//cancle if else and user router info

          this.$router.push("/main/fileUpload");
        }else if(index === "fileList"){
          this.$router.push("/main/fileList");

        }
        else if(index === "checkTool") {
          this.$router.push("/main/checkTool");
        } 

        else if(index === "userList") {
          this.$router.push("/main/userList");
        } 

        else if(index === "userAdd") {
          this.$router.push("/main/userAdd");
        } 
        else {
          this.$router.push("/main/other");
        }
    }

  }
}
</script>


