<template>
    <div>
        <el-input v-model="originalString" placeholder="请输入源字符串" />
         <el-input v-model="encodedString" placeholder="请输入要校验的Base64字符串" />
         <el-button type="primary" @click="checkBase64">Base64校验</el-button>
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
    checkBase64(){
        httpGet("/format/getBase64/" + this.originalString,null).then(response => {

           //alert(JSON.stringify(response))
           
           let responseString: string =JSON.stringify(response);
           let responseObject  = JSON.parse(responseString);
           if(this.encodedString === responseObject.object){
            ElMessage("Base64 校验通过")
           } else {
            ElMessage("Base64 校验失败")
           }
                     
          })
        
    }


  
  }
}
</script>