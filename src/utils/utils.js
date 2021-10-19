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
