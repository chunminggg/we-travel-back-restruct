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
