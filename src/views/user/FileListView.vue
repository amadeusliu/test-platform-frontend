<template>
  <h3>测试工具列表</h3>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="序号" width="80">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="文件名" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.fileName }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>

        <el-table-column label="简介" width="380">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.description }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>




    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="info" @click="handlePreview(scope.$index, scope.row)">查看使用指南</el-button>
        <el-button size="small" type="success" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
        <el-button
          v-show="showDelete"
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" >
import { onMounted } from "vue"
import {httpGet,httpPost} from '../../../public/static/js/network/http';
import { defineComponent } from 'vue'
import FileSaver from "file-saver"; 
import { ElMessage, ElMessageBox } from 'element-plus'
import contentDisposition from 'content-disposition'

export default defineComponent({//
  
  data() {
    return {
      message: 'Hello!',
      tableData: [],
      showDelete: true,
    }
  },
  computed:{
    test(){
      return "test";
    }

  },
  mounted() {
    this.refreshFileList();
    },

  methods: {
    refreshFileList(){
    let token =this.$store.state.token;
    httpGet("/file/getFileList",null).then(response => {
           this.tableData = JSON.parse(JSON.stringify(response)).data
           console.log(JSON.stringify(response))
           if(token == "admin"){
            this.showDelete=true;
            } else{
              this.showDelete = false;
              }
              })
    },

    handleDelete(index, row){
      let token = this.$store.state.token;
      if(token != 'admin'){
        ElMessage("非管理员!");
        return;
      }
      ElMessageBox.confirm(
    '确定要删除该测试工具?' + row.fileName,'确认',
    {
      confirmButtonText: '是的',
      cancelButtonText: '点错了',
      type: 'warning',
    }
    )
    .then(() => {
            httpGet("/file/delete/" + row.fileName,null).then(response => {
           console.log(JSON.stringify(response))       
          })
          this.refreshFileList();
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消',
      })
    })

    },

    base64ToBlob(base64Data, contentType) {
      contentType = contentType || '';
      var sliceSize = 512;
      var byteCharacters = atob(base64Data);
      var byteArrays = [];
 
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
 
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
 
        var byteArray = new Uint8Array(byteNumbers);
 
        byteArrays.push(byteArray);
        }
 
      var blob = new Blob(byteArrays, { type: contentType });
      return blob;

  //  application/octet-stream
  },


    handleDownload(index, row){
      console.log(row.fileName);
      //FileSaver.saveAs("http://localhost:9762/file/get/" + row.fileName, row.fileName);

        httpGet("/file/download/json/" + row.fileName,null).then(response => {
                      
        let responseData = response.data;
        
        let responseObject = JSON.parse(JSON.stringify(responseData));

        var blob = this.base64ToBlob(responseObject.body, 'application/octet-stream');
        FileSaver.saveAs(blob, row.fileName);
          })
      
    },

    handlePreview(index, row){
      console.log(row.fileName);
      httpGet("/file/getFileInstruction/" + row.fileName,null).then(response => {
        let responseData = response.data;
          ElMessageBox.alert(JSON.stringify(responseData),row.fileName)
          })
      
    }
    }
    })

</script>