<template>
<div>
  <div class="filter-container">
    <el-row>
      <el-input v-model="input" style="width:150px" placeholder="卡号" clearable></el-input>
      <el-input v-model="input" style="width:150px" placeholder="机构" clearable></el-input>
      <el-button type="primary"  icon="el-icon-plus" @click="edit(null)">新增</el-button>
      <el-button type="success" icon="el-icon-search" @click="findList">查询</el-button>
    </el-row>
  </div>

  <el-table
    :data="consumeRecordList"
    border
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

    <el-table-column prop="consumeMoney" label="交易金额"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.consumeMoney }}
      </template>
    </el-table-column>
    <el-table-column prop="consumeDate" label="交易日期"  align="center" >
      <template slot-scope="scope">
        {{ scope.row.consumeDate }}
      </template>
    </el-table-column>
    <el-table-column prop="consumeType" label="交易类型"  align="center" >
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.consumeType == '1'">消费</el-tag>
        <el-tag type="danger" v-if="scope.row.consumeType == '2'">还款</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" >
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row)"></el-button>
      </template>
    </el-table-column>

  </el-table>
  <div>
    <pagination  style="text-align: right" v-show="total>0" :total="total" :page.sync="listQuery.pageNumber" :limit.sync="listQuery.pageSize" @pagination="findList" />
  </div>
  <consumeEdit @closeDialogFather="getSonCancel" :isShow="isShow" :consumeRecord="this.consumeRecord" ></consumeEdit>

</div>

</template>
<script>
  import {findList,deleteById} from '@/api/consume/consumeCard.js'
  import consumeEdit from './consumeEdit.vue'
  import Pagination from '@/components/Pagination/'

  export default {
    name: "consumeList",
    components:{
      Pagination,
      consumeEdit,
    },
    mounted(){
        this.findList();
    },
      data() {
        return {
          consumeRecordList: [],
          input:"",
          listQuery: JSON.parse(localStorage.getItem("pdfList")) || {
            pageNumber: 1,
            pageSize: 10,
            name: '',
            creditCardNo:'',
            cardOrg:'',
          },
          total: 0,
          tableLoading:false,
          isShow:false,
          id: null,
          consumeRecord :{
            id: null,
            creditCardId: null,
            creditCardNo: null,          //
            cardOrg: null,        //
            consumeMoney: null,  //
            consumeDate: null,  //
            consumeType: null,  //消费类型（1：消费、2：还款）
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
          // this.listQuery.pageNumber= response.data.pageNum;
          this.total= response.data.total;
          this.consumeRecordList = response.data.list;
        });
        this.tableLoading = false;
      },
      edit(row){
        this.isShow = true;
        this.consumeRecord = row;
      },
      view(id){

      },
      deleteById(row){
        this.$confirm(`确定要删除吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(row).then(res => {
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
