<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px"
            :rules="rules" >
      <el-form-item label="商品名称" prop="name" >
        <el-input v-model="form.name" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="region">
        <el-select v-model="form.region" placeholder="请选择商品种类" style="width: 400px">
          <el-option   v-for="item in items"
                       :key="item.productCategoryId"
                       :label="item.productCategoryName"
                       :value="item.productCategoryId" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标题" >
        <el-input type="textarea" v-model="form.title" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="正常价格">
        <el-input-number v-model="form.normalPrice" @change="handleChange" :min="0" :step="100" :max="9999">
        </el-input-number>
      </el-form-item>
      <el-form-item label="促销价格">
        <el-input-number v-model="form.promotePrice" @change="handleChange" :min="0" :step="100" :max="9999">
        </el-input-number>
      </el-form-item>
      <el-form-item label="缩略图" prop="imgUrl">
        <el-upload
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-change="handleChangeImg"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
<!--        <el-upload ref="upfile"-->
<!--                   action="#"-->
<!--        :auto-upload="false"-->
<!--        :on-change="handleChangeImg"-->
<!--        :show-file-list="false"-->
<!--        :limit="4"-->
<!--        accept="image/jpg,image/png,image/jpeg">-->
<!--          <img v-if="form.imgUrl!=4" width="200" height="200"  :src="form.imgUrl">-->
<!--          <i v-else class="el-icon-plus avatar-uploader-ico"></i>-->
<!--        </el-upload>-->
      </el-form-item>
      <el-form-item style="margin-left: 100px">
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

  import {getGoodsCategoryList, insertGoods} from "@/api/goods";

    export default {
        name: "add",
      data() {
        return {
          items:[],
          fileList:[],
          form: {
            imgUrl:"",
            normalPrice:"",
            promotePrice:"",
            name: '',
            region: "",
            resource: '',
            title: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入商品名称', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择商品类别', trigger: 'change' }
            ],
            imgUrl: [
              { required: true, message: '请上传图片', trigger: 'change' }
            ],
          }
        }
      },
      mounted() {
       getGoodsCategoryList().then(response => {
         this.items=response.list
       })
      },
      methods: {
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var fd=new FormData();
              var img=this.fileList[0];

              fd.append("goods",JSON.stringify(this.form))
              fd.append("file",this.fileList[0].raw)
              insertGoods(fd).then(
                res=>{
                  if (res.code === 0) {
                    // 隐藏注册组件
                    this.$message({
                      showClose: true,
                      message: '创建成功！',
                      type: 'success'
                    }
                      )
                    this.$router.go(0);
                    // 弹出通知框提示注册成功信
                  } else {
                    // 弹出通知框提示注册失败信息
                    this.$router.go(0);
                  }
                }
              )
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        },
        handleChange(value) {
          console.log(value);
        },
        handleChangeImg(file,fileList) {
          this.fileList=fileList;
          console.log(file);
          this.form.imgUrl=URL.createObjectURL(file.raw);
        }
      }
    }
</script>

<style scoped>

</style>
