import { post } from '@/utils/utilsFunc'

/**
 * 启动一个新Session
 * @param auth
 * @return {Promise}
 */
export const getCarDBSession = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/start_session.sgi'
  const sucCommit = 'GET_START_SESSION_SUCCESS'
  const failCommit = 'GET_START_SESSION_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

export async function changeStock(){
  const url = 'product/showAll'
  const sucCommit = 'CHANGE_STOCK_SUCCESS'
  const failCommit = 'CHANGE_STOCK_FAIL'


}