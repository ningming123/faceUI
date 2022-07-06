<template>
  <div>
    <el-dialog title="交易记录" :before-close="closeDialog" :visible.sync="dialogTableVisible" :append-to-body="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item style="width:400px" label="信用卡" prop="creditCardId">
          <el-select v-model="form.creditCardId" placeholder="请选择">
            <el-option
              v-for="item in this.cardList"
              :key="item.id"
              :label="item.cardOrg"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:400px" prop="consumeMoney"label="交易金额">
          <el-input v-model="form.consumeMoney"></el-input>
        </el-form-item>
        <el-form-item label="交易类型" prop="consumeType">
          <el-select v-model="form.consumeType" placeholder="请选择">
            <el-option label="消费" value="1"></el-option>
            <el-option label="还款" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易时间" prop="consumeDate">
          <el-date-picker type="datetime"  v-model="form.consumeDate" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">立即创建</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {save} from '@/api/consume/consumeCard.js'
  import {findList,view} from '@/api/credit/creditCard.js'
  export default {
    name:"consumeEdit",
    props:{
      isShow:{
        type:Boolean,
        default:false
      },
      consumeRecord:{
        type:Object,
        default:null
      }
    },
    data() {
      return {
        form: {
          id: null,
          creditCardId: null,
          creditCardNo: null,          //
          cardOrg: null,        //
          consumeMoney: null,  //
          consumeDate: '',  //
          consumeType: null,  //消费类型（1：消费、2：还款）
        },
        defaultForm: {
          id: null,
          creditCardId: null,
          creditCardNo: null,          //
          cardOrg: null,        //
          consumeMoney: null,  //
          consumeDate: null,  //
          consumeType: null,  //消费类型（1：消费、2：还款）
        },
        dialogTableVisible:this.isShow,
        cardList:[],
        creditCard :{
          id:null,
          creditCardNo: null,          //
          cardOrg:null,        //
          carType:null,  //
          billingDate:null,          //
          repaymentDate:null,    //
          totalQuota:null,    //
          surplusQuota:null,    //
        },
        isSave: true,
        rules:{
          consumeMoney:[{required:true,trigger:'blur',message:"请输入交易金额"}],
          creditCardId:[{required:true,trigger:'blur',message:"请输入信用卡"}],
          consumeType:[{required:true,trigger:'blur',message:"请输入交易类型"}],
        }
      }
    },
    methods: {
      // 弹出框关闭后触发
      closeDialog(){
        this.dialogTableVisible=false;
        this.$emit('closeDialogFather',this.dialogTableVisible);
      },
      async save(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isSave = true;
          } else {
            this.isSave = false;
          }
        })
          await view({id:this.form.creditCardId}).then(res => {
            if(res.code == '200' && res.data != null){
              let surplusQuota = res.data.surplusQuota;
              let totalQuota = res.data.totalQuota;
              let consumeType = this.form.consumeType;
              if(consumeType == '1' && surplusQuota - this.form.consumeMoney < 0){
                this.$message({
                  type: 'error',
                  message: '剩余额度不足'
                });
                this.isSave = false;
              }
              if(consumeType == '2' && surplusQuota + this.form.consumeMoney > totalQuota){
                this.$message({
                  type: 'warn',
                  message: '还款金额加上剩余额度超过总额度，无法作为溢缴款'
                });
                this.isSave = false;

              }
            }
          });
          if(this.isSave == false){
            return;
          }

        await save(this.form).then(res => {
          if(res.code == '200'){
            this.$message({
              type: 'success',
              message: '保存成功'
            });
            this.dialogTableVisible = false;
          }else{
            this.$message({
              type: 'error',
              message: '保存失败'
            });
          }
        });
        this.closeDialog();
        this.isSave = true;


      },
      getCardList(){
        findList(this.creditCard).then(response =>{
          this.cardList = response.data;
        });
      }
    },
    watch:{
      // 监听 addOrUpdateVisible 改变
      isShow(){
        this.dialogTableVisible = this.isShow
      },
      consumeRecord(){
        //不管新增、编辑，表单先置为空
        this.form = this.defaultForm;
        console.log(this.consumeRecord)
        console.log( "111")
        this.getCardList();
        if(this.consumeRecord != null){
          this.form = this.consumeRecord;

        }

      }
    }
  }
</script>
