<template>
    <div>
       <el-table :data="tableData" style="width: 100%">
    <el-table-column label="序号" width="80">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="用户名" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>


    <el-table-column label="操作">
      <template #default="scope">

        <el-button
          v-show="showDelete"
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script lang="ts">

import { onMounted } from "vue"
import {httpGet,httpPost} from '../../../public/static/js/network/http';
import { defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'


export default {
  data() {
    return {
      tableData: [],
      showDelete: false,
    }
  },
  methods:{
    refrshUserList(){
        httpGet("/user/getUserList", null).then(response => {
           this.tableData = JSON.parse(JSON.stringify(response.data))
           console.log(JSON.stringify(response))
    
          })
          let token =this.$store.state.token;
          if(token == "admin"){
            this.showDelete = true;
            } else{
              this.showDelete = false;
              } 
    },

    handleDelete(index, row){
      let token =this.$store.state.token;
      if(token!= 'admin'){
        ElMessage("非管理员!");
        return;
      }
      ElMessageBox.confirm(
        '确定要删除该用户?'+row.username,
        '确认',
        {
          confirmButtonText: '是的',
          cancelButtonText: '点错了',
          type: 'warning',
          }
  )
    .then(() => {
      httpGet("/user/deleteUser/"+row.username,null).then(response => {
        console.log(JSON.stringify(response))     
          })

      this.refrshUserList()
      ElMessage({
        type: 'success',
        message: '删除用户成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除用户取消',
      })
    })

    },

  },
  mounted(){
    this.refrshUserList();
  }
}
</script>