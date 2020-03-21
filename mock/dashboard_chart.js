/*
 * @Description:
 * @Author: 志洪
 * @Date: 2020-03-21 16:08:12
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-21 16:56:13
 */
function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [10, 40, 78, 10, 30, 48];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
