<template>
<el-form ref="postForm" :model="postForm">
  <sticky :class-name="'sub-navbar'">
    <el-button v-if="!isEdit" @click="showGuide" >显示帮助</el-button>
    <el-button v-loading="loading" @click="submitForm" type="success" style="margin-left: 10px">
      {{isEdit ? '编辑电子书':'新增电子书'}}
    </el-button>
  </sticky>
  <div class="detail-container">
    <el-row >
      <waring/>
      <el-col :span="24">
        <!--    表单控件的具体样式  -->
      </el-col>
    </el-row>
    <el-row>
      <el-col  :span="24">

      </el-col>
    </el-row>
  </div>
</el-form>

</template>

<script>
  import Sticky from '../../../components/Sticky/index'
  import Waring from "@/views/area/components/Warning";
    export default {
        name: "detail",
      components: {Waring, Sticky},
      comments:{
          Sticky
      }
      ,props:{
        isEdit: Boolean
      },
      data(){
          return {
            loading:false,
            postForm:{
              status:'draft'
            }
          }
      },
      methods:{
      submitForm(){
        this.loading=true
        setTimeout(()=>{
          this.loading=false
        },1000)
      },
        showGuide(){

        }
      }
    }
</script>

<style lang="css" scoped>
.detail-container{
  padding: 10px 50px 20px;

}
</style>
