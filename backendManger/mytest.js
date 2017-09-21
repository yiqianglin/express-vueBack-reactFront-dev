var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '4ccVyu4N2KTXRghwSRMtRHvBI-1xp5JDXzJYlZ5D';
qiniu.conf.SECRET_KEY = '-RPr3W8PjtbplcfYR1BRxDs7cLQ5LTFmNQgvu7x-';
console.log('---------------------------------');
//要上传的空间
var bucket_name = 'henixtest';
//上传到七牛后保存的文件名
// key = 'my-nodejs-logo.png';
//构建上传策略函数
function create_uptoken(bucket_name) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket_name);
    return putPolicy.token();
}
//生成上传 Token
var uptoken = create_uptoken(bucket_name);

console.log('uptoken =')
console.log(uptoken)