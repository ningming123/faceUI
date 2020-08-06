<template>
    <div class="app-container">
      <div class="filter-container">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
      </el-upload>

      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>检测结果</span>
          </div>
          <div class="text item">
            <span>性   别：</span>
          </div>
          <div class="text item">
            <span>年   龄：</span>
          </div>
          <div class="text item">
            <span>脸   型：</span>
          </div>
          <div class="text item">
            <span>颜值打分：</span>
          </div>
          <div class="text item">
            <span>检测时间：</span>
          </div>
        </el-card>
      </div>
      <div  class="block">
        <el-button size="small" type="success">结果反馈</el-button>
      </div>
      <div class="block">
        <span class="demonstration">准确度</span>
        <el-rate
          v-model="value2"
          :colors="colors">
        </el-rate>
      </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fileList: [],
        value1: null,
        value2: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
<style scoped>
  .filter-container{background-color:#DCE5EA;padding:15px;}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1000px;
  }
</style>
