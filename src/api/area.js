import request from '@/utils/request'



export function getAreaList(query) {
return request (
  {
    url:'/area/getarealist',
    method: 'get',
    params: { query }
  }
)
}
export function deleteAreaById(param) {
  return request (
    {
      url:'/area/deletearea',
      method: 'get',
      params: { param }
    }
  )
}
