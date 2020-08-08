<template>
    <div class="app-container">
      <div class="filter-container">
        <el-upload
          class="avatar-uploader"
          action="/api/face/upload"
          :auto-upload="true"
          name="uploadFile"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过10M</div>
        </el-upload>
      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>检测结果</span>
          </div>
          <div class="text item">
            <span>性   别：</span>
            <span>{{facedetct.gender}}</span>
          </div>
          <div class="text item">
            <span>年   龄：</span>
            <span>{{facedetct.age}}</span>
          </div>
          <div class="text item">
            <span>脸  型：</span>
            <span>{{facedetct.face_shape}}</span>
          </div>
          <div class="text item">
            <span>颜值打分：</span>
            <span>{{facedetct.beauty}}</span>
          </div>
          <div class="text item">
            <span>检测是否成功：</span>
            <span>{{facedetct.error_msg}}</span>
          </div>
          <div class="text item">
            <span>检测时间：</span>
            <span>{{facedetct.timestamp}}</span>
          </div>
        </el-card>
      </div>
      <div  class="block">
        <el-button size="small" type="success">结果反馈</el-button>
        <el-button size="small" type="warning" @click="refreshPage">刷新页面</el-button>
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
  // import {list} from '../../api/detect/detect.js'
  const faceDetectModel = () => ({
    gender:null,
    face_shape:null,
    emotion:null,
    beauty:null,
    age:null,
    error_msg:null,
    timestamp:null
  });
  export default {
    data() {
      return {
        facedetct:faceDetectModel(),
        fileList: [],
        value1: null,
        value2: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      };
    },
    methods: {

      beforeAvatarUpload(file) {
        var isImage=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = isImage === 'jpg' || isImage === 'png' || isImage === 'jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!extension) {
          this.$message.error("上传文件只能是 jpg/jpeg/png 格式!");
          return ;
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 10MB!");
          return ;
        }
        return extension && isLt2M;
      },
      //上传完成后自动执行
      handleAvatarSuccess (res, file, fileList) {
        this.$message({
          message: res.msg
        });
        this.handleFilter(res);
      },
      handleFilter(res){
          this.facedetct.gender = res.data.gender;
          this.facedetct.face_shape = res.data.face_shape;
          this.facedetct.age = res.data.age;
          this.facedetct.timestamp = res.data.timestamp;
          this.facedetct.beauty = res.data.beauty;
          this.facedetct.emotion = res.data.emotion;
          this.facedetct.error_msg = res.data.error_msg;
      },
      refreshPage(){
        this.$router.go(0)
      }
    }
  }
</script>
<style scoped>
  .filter-container{background-color:#DCE5EA;padding:20px;}
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
    width: 1200px;
  }
</style>
