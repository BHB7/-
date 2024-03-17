import request from '@/utils/request'

// 搜索商品
/**
 *
 * @param {categoryId:分类, goodsName:根据商品名字, page:页} obj
 * @returns
 */
export const getProduct = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
