<template>
    <div>
        <el-input v-model="originalString" placeholder="请输入源字符串" />
         <el-input v-model="encodedString" placeholder="请输入要校验的Md5字符串" />
         <el-button type="primary" @click="checkMd5">Md5校验</el-button>
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import {httpGet,httpPost} from '../../../public/static/js/network/http';


export default {
  data() {
    return {
        originalString: '',
        encodedString: '',

    }
  },
  methods:{
    checkMd5(){
        httpGet("/format/getMd5/" + this.originalString,null).then(response => {     
           let responseString: string = JSON.stringify(response);
           let responseObject = JSON.parse(responseString);
           if(this.encodedString === responseObject.data){

            ElMessage("Md5校验通过")
           } else {
            ElMessage("Md5校验失败")
           }
           
                    
          })
        
    }
  
  }
}
</script>