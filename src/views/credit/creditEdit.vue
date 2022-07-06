<template>
  <div>
    <el-dialog title="信用卡管理" :before-close="closeDialog" :visible.sync="dialogTableVisible" :append-to-body="true">
      <el-form ref="form" :rules="rules":model="form" label-width="80px">
        <el-form-item style="width:400px" prop="creditCardNo" label="卡片帐号" >
          <el-input v-model="form.creditCardNo"></el-input>
        </el-form-item>
        <el-form-item style="width:400px" prop="totalQuota" label="额度" >
          <el-input v-model="form.totalQuota" > </el-input>
        </el-form-item>
        <el-form-item label="卡片机构">
          <el-select v-model="form.cardOrg" placeholder="请选择活动区域">
            <el-option label="招商银行" value="招商银行"></el-option>
            <el-option label="建设银行" value="建设银行"></el-option>
            <el-option label="北京银行" value="北京银行"></el-option>
            <el-option label="中信银行" value="中信银行"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:400px" prop="billingDate" label="账单日">
          <el-input v-model="form.billingDate" ></el-input>
        </el-form-item>
        <el-form-item style="width:400px" prop="repaymentDate" label="还款日">
          <el-input v-model="form.repaymentDate"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.cardType">
            <el-radio label="信用卡"></el-radio>
            <el-radio label="花呗"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save('form')">立即创建</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {save,view} from '@/api/credit/creditCard.js'
  export default {
    name:"creditEdit",
    props:{
      isShow:{
        type:Boolean,
        default:false
      },
      creditCard:{
        type:Object,
        default:null
      }
    },
    data() {
      return {
        form: {
          id:null,
          creditCardNo: null,          //
          cardOrg:null,        //
          cardType:null,  //
          billingDate:null,          //
          repaymentDate:null,    //
          totalQuota:null,    //
          surplusQuota:null,    //
        },
        defaultForm: {
          id:null,
          creditCardNo: null,          //
          cardOrg:null,        //
          cardType:null,  //
          billingDate:null,          //
          repaymentDate:null,    //
          totalQuota:null,    //
          surplusQuota:null,    //
        },
        dialogTableVisible:this.isShow,
        rules:{
          billingDate:[{required:true,trigger:'blur',message:"请输入账单日"}],
          repaymentDate:[{required:true,trigger:'blur',message:"请输入还款日"}],
          repaymentDate:[{required:true,trigger:'blur',message:"请输入还款日"}],
          creditCardNo:[{required:true,trigger:'blur',message:"请输入卡片帐号"}],
          totalQuota:[{required:true,trigger:'blur',message:"请输入额度"}],

        }
      }
    },
    methods: {
      // 弹出框关闭后触发
      closeDialog(){
        this.dialogTableVisible=false;
        this.$emit('closeDialogFather',this.dialogTableVisible);
      },
      save(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            save(this.form).then(res => {
              if (res.code == '200') {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                this.dialogTableVisible = false;
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                });
              }
            });
            this.closeDialog();
          }
        })
      }
    },
    watch:{
      // 监听 addOrUpdateVisible 改变
      isShow(){
        this.dialogTableVisible = this.isShow
      },
      creditCard(){
        //不管新增、编辑，表单先置为空
        this.form = this.defaultForm;
        if(this.creditCard != null){
          this.form = this.creditCard;

        }

      }
    }
  }
</script>
