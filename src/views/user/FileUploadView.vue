<template>
  <div>
    <h3>测试工具上传</h3>
     <el-input v-model="input" placeholder="请输入文件描述" label="hahah"/>
     <el-input
     v-model="textarea"
     :rows="5"
     type="textarea"
     placeholder="请输入软件用法"
     />
    <el-upload
    class="upload-demo"
    ref="uploadRef"
    name="file"
    action="http://localhost:9762/api/file/fileUpload"


    :limit="1"
    :before-upload="beforeUpload"
    :multiple="false"
 
    :auto-upload="false"
    :file-list="fileList">
  <el-button size="small" type="primary">选择文件</el-button>
  <div  class="el-upload__tip"></div>
  </el-upload>
  <el-button @click="submitUpload" type="primary">点击上传</el-button>

 </div>

  
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'
import {httpGet,httpPost} from '../../../public/static/js/network/http';
import {UploadInfo} from '../../interfaces/UploadInterface';
import { ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
const input = ref('')
const textarea = ref('')
const fileList = ref<UploadUserFile[]>()

const fileName = ref('fileName')


const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
   uploadRef.value!.submit();

  if(input.value.length == 0){
    ElMessage({
      message: "请输入文件描述",
      type: "error"
    })
    return;
  }

  console.log(fileName.value)

  
 
 
 
  let u: UploadInfo = {description: input.value, instruction: textarea.value, fileName: fileName.value};
  httpPost("/file/addFileUploadInfo", u,null);
  input.value = "";
  textarea.value = ""
     ElMessage({
    message: '文件上传成功.',
    type: 'success',
    duration: 6000,
    showClose: true
  })
}

const beforeUpload = (uploadFileName) => {
fileName.value = uploadFileName.name;

}


</script>


