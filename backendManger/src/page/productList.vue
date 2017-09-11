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
		
		<el-dialog title="修改食品信息" v-model="editDialogIsShow">
		<el-form :model="selectProduct">
            <el-form-item label="食品名称" label-width="100px">
                    <el-input v-model="selectProduct.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="食品介绍" label-width="100px">
                    <el-input v-model="selectProduct.description"></el-input>
                </el-form-item>
                <el-form-item label="食品图片" label-width="100px">
                    <el-upload
                      drag
                      class="avatar-uploader"
                      :action="'/v1/addimg/food'"
                      :show-file-list="false"
                      :on-success="handleServiceAvatarScucess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="selectProduct.image_path" :src="baseImgPath + selectProduct.image_path" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
		</el-dialog>





	</div>
</template>

<script>
	import headTop from '../components/headTop';
	import { post } from '@/utils/utilsFunc';
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
				console.log(row)
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
  
</style>
