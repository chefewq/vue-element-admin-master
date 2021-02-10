<template>
<div class="app-container">
  <div class="filter-container">
    <el-input v-model="listQuery.title" placeholder="地区名"
              style="width: 200px" class="filter-item" clearable
              @keyup.enter.native="handleFilter"
              @clear="handleFilter"
              @blur="handleFilter"/>
    <el-button v-waves type="primary" icon="el-icon-search" class="filter-item" style="margin-left: 10px" @click="handleFilter">
      查询</el-button>
  </div>
  <el-table v-loading="loading" :key="tableKey"  :data="list"
            border fit highlight-current-row
           style="width: 100%"
           sort-change="sortChange"  v-if:="">
    <el-table-column label="id" prop="id" sortable align="center" width="100px">
      <template slot-scope="{row:{areaId}}"><span>{{areaId}}</span></template>
    </el-table-column>
    <el-table-column label="地区名称" prop="name"  align="center" width="160px">
      <template slot-scope="{row:{areaName}}"><span>{{areaName}}</span></template>
    </el-table-column>
    <el-table-column label="优先级" prop="priority"  align="center" width="100px">
      <template slot-scope="{row:{priority}}"><span>{{priority}}</span></template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createTime" align="center" width="230px">
      <template slot-scope="{row:{createTime}}"><span>{{createTime}}</span></template>
    </el-table-column>
    <el-table-column label="更新时间" prop="lastEditTime" align="center" width="230px" sortable>
      <template slot-scope="{row:{lastEditTime}}"><span>{{lastEditTime}}</span></template>
    </el-table-column>
    <el-table-column label="操作" prop="" align="center" width="300px" >
    <template slot-scope="{row}">
      <el-button type="danger" icon="el-icon-delete" @click="hadleDelete(row)">删除</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(row)">修改</el-button>
    </template>
    </el-table-column>
  </el-table>
  <pagination :total="listQuery.size"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"></pagination>
</div>
</template>

<script>
  import waves from "@/directive/waves/waves";
  import Pagination from "@/components/Pagination/index";
  import {deleteAreaById, getAreaList} from "@/api/area";
    export default {
        name: "List",
      components: {Pagination},
      directives:{ waves},
      data(){
          return{
            tableList:[],
            list:[],
            loading:true,
            listQuery:{
              title:'',
              page: 10,
              limit: 20,
              size:0,
            },
            tableKey:0,

          }
      },
      mounted() {

             getAreaList(this.listQuery).then(response => {
               this.list=response.data.list
             this.loading=false
             console.log(this.list)
        })
      },
      methods:{
        handleFilter(){
           this.loading=true
           getAreaList(this.listQuery).then(response => {
             this.list= response.data.list
            this.loading=false
          })
        },
        sortChange(){
        },
        hadleDelete(row){
          this.$confirm('此项操作将永久删除该地区，是否继续？','提示',{
            confirmButtonText: '确定',
            cancelButtonText:'取消',
            type: "warning"
          }).then(()=>{
            deleteAreaById(row.areaId)
            this.$router.go(0);
          })
        },
        handleUpdate(row){
          this.loading=true


        }
      }
    }
</script>

<style scoped>

</style>
