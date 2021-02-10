import request from "@/utils/request";

export function insertGoods(data) {
  return request (
    {
      url:'/goods/insertGoods',
      method: 'post',
      data
    }
  )
}
export function getGoodsCategoryList() {
  return request (
    {
      url:'/goods/getGoodsCategoryList',
      method: 'get',
    }
  )
}
