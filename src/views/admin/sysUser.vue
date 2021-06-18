<template>
    <div>
        <el-row>
            <el-card :body-style="{ padding: '200px' }">

              <div class="text item">
                <span>姓名：</span>
                <el-input v-model="input" style="text-align:left;width: 200px;" placeholder="请输入内容">

                </el-input>
              </div>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>

            </el-card>
      </el-row>
    </div>
</template>

<script>
  const sysUser = () => ({
    userName:null,
    realName:null,
    passWord:null,
    phone:null,
    age:null,
    error_msg:null,
    timestamp:null
  });
    export default {
        name: "sysUser",
        data(){
          return {
            input_width: 200,
          }
        }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: left;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
