<template>
	<div class="fillcontain">
		<el-table
	    :data="tableData"
	    style="width: 100%"
	    class="product-form">
	    <el-table-column type="expand">
	      <template scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
				<el-form-item label="商品ID" width=50>
					<span>{{ props.row.productId }}</span>
				</el-form-item>
				<el-form-item label="商品名称">
					<span>{{ props.row.productName }}</span>
				</el-form-item>
				<el-form-item label="商品描述">
					<span>{{ props.row.productDesc }}</span>
				</el-form-item>
				<el-form-item label="所需积分">
					<span>{{ props.row.needScore }}</span>
				</el-form-item>
				<el-form-item label="库存">
					<span>{{ props.row.stock }}</span>
				</el-form-item>
				<el-form-item label="商品图片">
					<span>{{ props.row.productPic }}</span>
				</el-form-item>
	        </el-form>
	      </template>
	    </el-table-column>
<!-- 	    <el-table-column
	      label="商品 ID"
	      prop="productId">
	    </el-table-column>
	    <el-table-column
	      label="商品名称"
	      prop="productName">
	    </el-table-column>
	    <el-table-column
	      label="所需积分"
	      prop="needScore">
	    </el-table-column>
	    <el-table-column
	      label="库存"
	      prop="stock">
	    </el-table-column>
	    <el-table-column
	      label="图片"
	      prop="productPic">
	    </el-table-column> -->
	    <!--可以使用v-for来去掉繁琐html，写成数据可配类型-->
	    <el-table-column 
        v-for="col in cols"
        :prop="col.prop" :label="col.label" >
      </el-table-column>

		<el-table-column label="商品图片预览" label-class-name="center" class-name="center">
			<template scope="scope">
				<img class="product-pic-td" v-bind:src="scope.row.productPic" alt="">
			</template>
		</el-table-column>
		<el-table-column
	      label="操作"
	      width="100">
	      <template scope="scope">
	        <el-button @click="handleEdit(scope.row)" type="text" size="small">查看</el-button>
	        <el-button type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
		
		<el-dialog title="修改食品信息" v-model="editDialogIsShow" class="edit-dialog">
			<span slot="title"><span class="slot_title">这是另一个title slot</span></span>
			<el-form :model="selectProduct">
            	<el-form-item label="食品名称" label-width="100px">
                    <el-input v-model="selectProduct.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="食品介绍" label-width="100px">
                    <el-input v-model="selectProduct.description"></el-input>
                </el-form-item>
                <el-form-item label="食品图片" label-width="100px">
<el-upload
  action="http://upload.qiniu.com/"
  list-type="picture-card"
	:show-file-list='false'
	:on-progress="handleProgress"
	:on-success="handleSuccess"
	:on-error="handleError"
	:before-upload="beforeUpload"
	:data='uploadData.form'
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog v-model="uploadData.dialogVisible" size="tiny">
  <img width="100%" :src="uploadData.dialogImageUrl" alt="">
</el-dialog>
                </el-form-item>
            </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editDialogIsShow = false">取 消</el-button>
				<el-button type="primary" @click="">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import headTop from '../components/headTop';
	import { post } from '@/utils/utilsFunc';
	import qiniu from 'qiniu-js';
	import config from '@/config/qiniuConfig';
	console.log(config);
	export default {
		data(){
			return {
				tableData: null,
				cols: [
					{ label: '商品ID', prop: 'productId'},
					{ label: '商品名称', prop: 'productName'},
					{ label: '商品描述', prop: 'productDesc'},
					{ label: '所需积分', prop: 'needScore'},
					{ label: '库存', prop: 'stock'},
					// { label: '商品图片', prop: 'productPic'}
				],
				editDialogIsShow: false,
				selectProduct: {},
				uploadData: {
		            form: {
		                token: config.uptoken,
		                key: null
		            },
		            showUploadList: true,
		            fileName: '',
		            fileSize: '',
		            loaded: '',
		            percent: '',
		            result: '',
		            dialogImageUrl: '',
        			dialogVisible: false
				}
			}
		},
		mounted(){
			this.initData();
		},
		methods: {
			initData(){
				post('product/showAll', null)
				.then(response => {
					this.tableData = JSON.parse(response.data.result);
				})
			},
			handleEdit(row){
				console.log(row);
				this.editDialogIsShow = true;
			},
	        beforeUpload (file) {
	            this.uploadData.fileName = file.name
	            this.uploadData.form.key = file.name
	            console.log(this.uploadData.form);
	        },
	        handleProgress (event, file, fileList) {
	            this.uploadData.loaded = (event.loaded / 1000000).toFixed(2)
	            this.uploadData.fileSize = (event.total / 1000000).toFixed(2)
	            this.uploadData.percent = (event.loaded / event.total * 100).toFixed(2)
	            console.log(this.uploadData.percent)
	        },
	        handleSuccess (response, file, fileList) {
	            this.uploadData.result = '上传成功'
	        },
	        handleError (error, response, file) {
	            this.uploadData.result = error.toString()
	        },
		      handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePictureCardPreview(file) {
		      	console.log(file.url);
		        this.uploadData.dialogImageUrl = file.url;
		        this.uploadData.dialogVisible = true;
		      }
		}
	}
</script>

<style lang="less">
	@import '../style/mixin';
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }


  .product-form{
  	.product-pic-td{
	  	width: 50px;
	  	display: block;
	  	margin: 0 auto;
	  }
	  .center{
	  	text-align: center;
	  }
  }

  .edit-dialog{
  	min-width: 900px;
  }

  .upload-demo{
  	display: block;
  	width: 100%;
  	.el-upload{
  		width: 100%;
  		max-width: 600px;
  	}
  	.el-upload-dragger{
  		width: 100%;
  	}
  }
  
</style>
