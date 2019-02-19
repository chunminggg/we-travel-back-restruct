import AV from 'leancloud-storage'
var APP_ID = '9wNC9P5zyzuA7bSUCXmyNygr-gzGzoHsz';
var APP_KEY = 'SoJCNHa1SX2NpLNMkTVX3KfL';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
export const addTheme = (name) => {
  const Product = AV.Object.extend('Type')
  let product = new Product()
  product.set('name', name)
  return product.save()
}
export const getTheme = () => {
  let theme = new AV.Query('Type')
  return theme.find()
}
export const deleteTheme = (id) => {
  let item = AV.Object.createWithoutData('Type', id)
  return item.destroy()
}
export const editTheme = (name, id, targetId) => {
  let item = AV.Object.createWithoutData('Type', id)
  item.set('name', name)
  let targetTheme = AV.Object.createWithoutData('Type', targetId)
  item.set('targetType', targetTheme)
  return item.save()
}
export const addDestination = (name, id) => {
  const Product = AV.Object.extend('Destination')
  let product = new Product()
  product.set('name', name)
  let targetTheme = AV.Object.createWithoutData('Type', id)
  product.set('targetType', targetTheme)
  return product.save()
}
export const getDestination = () => {
  let theme = new AV.Query('Destination')
  return theme.find()
}
export const deleteDestination = (id) => {
  let item = AV.Object.createWithoutData('Destination', id)
  return item.destroy()
}
export const editDestination = (name, id) => {
  let item = AV.Object.createWithoutData('Destination', id)
  item.set('name', name)
  return item.save()
}
export const userLogin = (userName, password) => {
  return AV.User.logInWithMobilePhone(userName, password)
}
export const deleteUser = (id) => {
  let item = AV.Object.createWithoutData('_User', id)
  return item.destroy()
}
export const getUsers = (params, pageIndex) => {
  let users = new AV.Query('UserCopy');
  users.startsWith('name', params.name);
  users.startsWith('mobilePhoneNumber', params.phone);
  const promise1 = users.count();
  const promise2 = users.limit(10).skip((pageIndex - 1) * 10).find()
  return Promise.all([promise1, promise2])
}
export const changeUserType = (id, flag) => {
  let item = AV.Object.createWithoutData('UserCopy', id)
  item.set('ifSeller', flag)
  return item.save()
}
export const getOrders = (params, pageIndex) => {
  let orders = new AV.Query('Order');
  if (params.id) {
    orders.equalTo('objectId', params.id);
  }
  orders.startsWith('phoneNumber', params.phone);
  const promise1 = orders.count();
  const promise2 = orders.limit(10).skip((pageIndex - 1) * 10).include(['targetProduct']).find()
  return Promise.all([promise1, promise2])
}
export const handleOrder = (id) => {
  let item = AV.Object.createWithoutData('Order', id)
  item.set('ifHandle', true)
  return item.save()
}
export const uploadFile = (file) => {
  let name = file.name,
    dataFile = new AV.File(name, file)
  return dataFile.save()
}

export const createNewProduct = (data) => {
  var Product = AV.Object.extend('Product')
  var product = new Product()
  product.set('startDate', data.startDate)
  product.set('name', data.name)
  product.set('describe', data.describe)
  product.set('type', data.type)
  product.set('place', data.place)
  product.set('onleyId', data.onleyId)
  product.set('price', data.price)
  product.set('imageArray', data.imageArray)
  product.set('detailContent', data.detailContent)
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
  var query = new AV.Query('Product')
  query.select(['place', 'name', 'startDate', 'type', 'endDate', 'onleyId', 'price', 'describe', 'imageArray', 'countNumber'])
  query.addDescending('countNumber')
  query.select(['isSort', 'isFreeTravel', 'isRecommend', 'isFollowTeam', 'isSpecialPrice', 'place', 'name', 'startDate', 'type', 'endDate', 'onleyId', 'price', 'describe', 'imageArray', 'countNumber'])
  query.addDescending('countNumber')
  query.addDescending('updatedAt')
  query.contains('type', params.themeSelected)
  return query.find()
}
export const deleteProduct = (productId) => {
  var todo = AV.Object.createWithoutData('Product', productId)
  return todo.destroy()
}
export const getProductDetail = (productId) => {
  var query = new AV.Query('Product')
  return query.get(productId)
}
export const saveEditProduct = (data) => {
  let Product = AV.Object.extend('Product')
  let product = AV.Object.createWithoutData('Product', data.id)
  product.set('startDate', data.startDate)
  product.set('name', data.name)
  product.set('describe', data.describe)
  product.set('type', data.type)
  product.set('place', data.place)
  product.set('onleyId', data.onleyId)
  product.set('price', data.price)
  product.set('imageArray', data.imageArray)
  product.set('detailContent', data.detailContent)
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
