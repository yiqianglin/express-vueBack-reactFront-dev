class Product {
  constructor(
    {
      productId = '',
      productName = '',
      productDesc = '',
      needScore = 0,
      stock = 0,
      createTime = '',
      updateTime = '',
      productPic = ''
    }
  ){
    this.productId = productId;
    this.productName = productName;
    this.productDesc = productDesc;
    this.needScore = needScore;
    this.stock = stock;
    this.createTime = createTime;
    this.updateTime = updateTime;
    this.productPic = productPic;
  }
}

export default Product;

