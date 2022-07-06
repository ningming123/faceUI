<template>
<div>
  <div class="filter-container">
    <el-row>
      <el-input v-model="input" style="width:150px" placeholder="卡号" clearable></el-input>
      <el-input v-model="input" style="width:150px" placeholder="机构" clearable></el-input>
      <el-button type="primary" icon="el-icon-plus" @click="edit(null)">新增</el-button>
      <el-button type="success" icon="el-icon-search" @click="findList">查询</el-button>
    </el-row>
  </div>

  <el-table
    :data="creditDataList"
    border
    show-summary
    v-loading="tableLoading"
    style="width: 100%">
    <el-table-column align="center" label="序号" width="100%">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="creditCardNo" label="卡号"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.creditCardNo }}
      </template>
    </el-table-column>
    <el-table-column prop="cardOrg" label="机构" align="center" >
      <template slot-scope="scope">
        {{ scope.row.cardOrg }}
      </template>
    </el-table-column>
    <el-table-column prop="cardType" label="卡片类型" align="center" >
      <template slot-scope="scope">
        <el-tag type="success">{{ scope.row.cardType }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="billingDate" label="账单日"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.billingDate }}
      </template>
    </el-table-column>
    <el-table-column prop="repaymentDate" label="到期还款日"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.repaymentDate }}
      </template>
    </el-table-column>
    <el-table-column prop="surplusQuota" label="剩余还款天数"  align="center" >
      <template slot-scope="scope">
        <font color="red">{{ scope.row.remainDays }}</font>
      </template>
    </el-table-column>
    <el-table-column prop="totalQuota" label="总额度"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.totalQuota }}
      </template>
    </el-table-column>
    <el-table-column prop="consume" label="消费金额"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.consume }}
      </template>
    </el-table-column>
    <el-table-column prop="surplusQuota" label="剩余额度"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.surplusQuota }}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" >
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
      </template>
    </el-table-column>

  </el-table>
  <creditEdit @closeDialogFather="getSonCancel" :isShow="isShow" :creditCard="this.creditCard" ></creditEdit>
    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />-->
</div>

</template>
<script>
  import {findList,deleteById} from '@/api/credit/creditCard.js'
  import creditEdit from './creditEdit.vue'

  export default {
    name: "creditList",
    components:{
      creditEdit,
    },
    mounted(){
        this.findList();
    },
      data() {
        return {
          creditDataList: [],
          input:"",
          listQuery: JSON.parse(localStorage.getItem("pdfList")) || {
            // pageIndex: 1,
            // pageSize: 20,
            // name: '',
            creditCardNo:'',
            cardOrg:'',
            cardType:''
          },
          tableLoading:false,
          isShow:false,
          id: null,
          creditCard :{
            id:null,
            creditCardNo: null,          //
            cardOrg:null,        //
            cardType:null,  //
            billingDate:null,          //
            repaymentDate:null,    //
            totalQuota:null,    //
            surplusQuota:null,    //
          }
        }
      },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      //列表
      findList(){
        this.tableLoading = true;
        findList(this.listQuery).then(response =>{
          this.creditDataList = response.data;
        });
        this.tableLoading = false;
      },
      edit(row){
        this.isShow = true;
        this.creditCard = row;
      },
      view(id){

      },
      deleteById(id){
        this.$confirm(`确定要删除吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById({"id":id}).then(res => {
            if(res.code == '200'){
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            }else{
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            }
            this.findList()
          })
        })
      },
      getSonCancel(val){
        this.isShow=val
        this.findList();
      },
      getSummaries(param) {
        console.log(param)
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      }

    }
    }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .filter-container {
    background-color: #dce5ea;
    padding: 15px;
  }
  .contents_list {
    padding-top: 10px;
  }
</style>
