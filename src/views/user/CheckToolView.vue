<template>
<div>
  <h3>在线校验工具</h3>
                  <el-tabs v-model="activeName" type="card" class="eltabs" @tab-click="handleClick">
                    <template v-for="item in labelName">
                    <el-tab-pane v-if="true" :key="item.name" :label="item.title" :name="item.name">
                      <div v-if="item.isShow">
                        <component :is="item.content" />
                      </div>
                    </el-tab-pane>
                  </template>
                </el-tabs>
</div>

  
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import {httpGet,httpPost} from '../../../public/static/js/network/http';
import Base64View from './Base64View.vue'
import Md5View from './Md5View.vue'

export default {
  data() {
    return {

        input: '',
        labelName:[
           {
          title: 'Base64校验',
          name: 'first',
          content: Base64View,
          isShow: true,
        },
        {
          title: 'Md5校验',
          name: 'second',
          content: Md5View,
          isShow: false,
        },

        ]
    }
  },
  methods:{
    handleClick(val) {
      this.labelName = this.labelName.map(item => {
        if (item.name === val.props.name) {
          item.isShow = true;
        } else {
          item.isShow = false;
        }
        return item;
      });

  }
  }
}
</script>


