/**
 * ==== 类型判断 ====
 * @param {*} val
 * @param {String} type
 * @return {Boolean|String}
 */
export const isTypeOf = (val, type) => {
  const dt = Object.prototype.toString
    .call(val)
    .match(/[\w]+(?=\]$)/)[0]
    .toLowerCase();
  return type ? type === dt : dt;
};

/**
 * ==== 获取文件后缀名 ==== TODO未验证
 * @param {String} filename
 * @return {String}
 */

export const getExt = (filename) => {
  if (typeof filename === 'string') {
    return filename.split('.').pop().toLowerCase();
  } else {
    throw new Error('filename must be a string type');
  }
};
/**
 * ==== 延迟时间 ==== TODO未验证
 * @param {Number} ms
 * @return {String}
 */

export const waitTime = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * ==== 生成随机ID ==== TODO未验证
 * @param {*} length 生成指定位数
 * @param {*} scope  生成规则
 * @return {String}
 */
export const createUuid = (
  length = 8,
  scope = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
) => {
  let result = '';
  for (let i = length; i > 0; i--) {
    result += scope[Math.floor(Math.random() * scope.length)];
  }
  return result;
};

/**
 * ==== 对象转换为FormData ==== TODO未验证
 * 上传文件时我们要新建一个FormData对象，然后有多少个参数就append多少次，使用该函数可以简化逻
 * @param {Object} object
 */
export const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => formData.append(`${key}[${i}]`, subValue));
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
};

/**
 * ==== 保留小数 ==== TODO未验证
 * @param {Number} num
 * @param {Number} no 默认保留2位
 */
export const cutNumber = (num, no) => {
  if (typeof num !== 'number') {
    num = Number(num);
  }
  return Number(num.toFixed(no));
};
