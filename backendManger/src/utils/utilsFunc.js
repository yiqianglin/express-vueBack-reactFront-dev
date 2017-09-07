import axios from 'axios';
import qs from 'qs';


// 添加一个请求拦截器
axios.interceptors.request.use(config => {
	//在请求发送之前做一些事
	return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})


export class ApiError extends Error{
  constructor({
    ret = -1,       //包括状态ret
    data = null,      //后台返回数据
    status = null,  //响应头状态
    message = ''
  }) {
    super(message)
    this.ret = ret
    this.status = status
    this.data = data
  }
}

function checkStatus(response) {
  console.log(response)
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return Promise.resolve(response);
  }
  return Promise.reject(
    new ApiError({
      data: response.data,
      status: response.status,
      message: '访问错误'
    })
  );
}


// export default {
// 	post: function(url, data) {
//     console.log('utils post');
//     return axios({
//       method: 'post',
//       baseURL: 'http://localhost:3000/',
//       url,
//       data: qs.stringify(data),
//       timeout: 10000,
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       }
//     }).then(
//       (response) => {
//         return checkStatus(response);
//       }
//     ).catch(
//       (err) => {
//         console.log(err.msg, err.status, err.data);
//         return Promise.reject(err);
//       }
//     )
//   }
// }

export function post(url, data){
    console.log('utils post');
    return axios({
      method: 'post',
      baseURL: 'http://localhost:3000/',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        console.log('resolve response', response);
        return checkStatus(response);
      }, (response) => {
        console.log('reject response', response);
        return Promise.reject(
          new ApiError({
            data: response.data,
            status: response.status,
            message: '访问错误'
          })
        );
      }
    ).catch(
      (err) => {
        console.log(err.msg, err.status, err.data);
        return Promise.reject(err);
      }
    )
}