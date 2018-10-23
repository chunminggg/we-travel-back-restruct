import AV from 'leancloud-storage';
var APP_ID = '9wNC9P5zyzuA7bSUCXmyNygr-gzGzoHsz';
var APP_KEY = 'SoJCNHa1SX2NpLNMkTVX3KfL';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
export const userLogin = (userName, password) => {
  return AV.User.logInWithMobilePhone(userName, password)
}
export const uploadFile = (file) => {
  let name = file.name,
    dataFile = new AV.File(name, file);
  return dataFile.save()
}

export const createNewProduct = (data) => {
  var Product = AV.Object.extend('Product');
  var product = new Product();
  product.set('startDate', data.startDate);
  product.set('name', data.name);
  product.set('describe', data.describe);
  product.set('type', data.type);
  product.set('place', data.place);
  product.set('onleyId', data.onleyId);
  product.set('price', data.price);
  product.set('imageArray', data.imageArray);
  product.set('detailContent', data.detailContent);
  product.set('isRecommend', data.isRecommend)
  product.set('isSpecialPrice', data.isSpecialPrice)
  product.set('isFreeTravel', data.isFreeTravel)
  product.set('isFollowTeam', data.isFollowTeam)
  product.set('tagArray', data.tagArray)
  product.set('dayItems', data.dayItems)
  product.set('calendarEvents', data.calendarEvents)
  product.set('isNewProduct', data.isNewProduct)
  product.set('fileArray', data.fileArray)
  return product.save()

}
export const getProductList = (params) => {
  var query = new AV.Query('Product');
  query.select(['place', 'name', 'startDate', 'type', 'endDate', 'onleyId', 'price', 'describe', 'imageArray', 'countNumber']);
  query.addDescending('countNumber')
  query.select(['isSort', 'isFreeTravel', 'isRecommend', 'isFollowTeam', 'isSpecialPrice', 'place', 'name', 'startDate', 'type', 'endDate', 'onleyId', 'price', 'describe', 'imageArray', 'countNumber']);
  query.addDescending('countNumber');
  query.addDescending('updatedAt')
  return query.find()
}
export const deleteProduct = (productId) => {
  var todo = AV.Object.createWithoutData('Product', productId);
  return todo.destroy()
}
export const getProductDetail = (productId) => {

  var query = new AV.Query('Product');
  return query.get(productId)
}
export const saveEditProduct = (data) =>{
  let Product = AV.Object.extend('Product');
  let product = AV.Object.createWithoutData('Product', data.id);
  product.set('startDate', data.startDate);
  product.set('name', data.name);
  product.set('describe', data.describe);
  product.set('type', data.type);
  product.set('place', data.place);
  product.set('onleyId', data.onleyId);
  product.set('price', data.price);
  product.set('imageArray', data.imageArray);
  product.set('detailContent', data.detailContent);
  product.set('isRecommend', data.isRecommend)
  product.set('isSpecialPrice', data.isSpecialPrice)
  product.set('isFreeTravel', data.isFreeTravel)
  product.set('isFollowTeam', data.isFollowTeam)
  product.set('tagArray', data.tagArray)
  product.set('dayItems', data.dayItems)
  product.set('calendarEvents', data.calendarEvents)
  product.set('isNewProduct', data.isNewProduct)
  product.set('fileArray', data.fileArray)
  return product.save()
}