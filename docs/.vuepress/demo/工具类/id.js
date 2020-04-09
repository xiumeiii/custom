export const getAge = (str) => {
  // 身份证以18位为例
  let age = 0
  let strBirthday = str.substr(6, 8).replace(/(.{4})(.{2})/, '$1/$2/')
  let birthDate = new Date(strBirthday)
  let nowDate = new Date()

  age = nowDate.getFullYear() - birthDate.getFullYear()

  if (nowDate.getMonth() < birthDate.getMonth() ||
    (nowDate.getMonth() === birthDate.getMonth() && nowDate.getDate() < birthDate.getDate())) {
    age--
  }
  return age
},