/*
 * @Description:
 * @Author: 志洪
 * @Date: 2020-03-18 22:46:48
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-20 15:08:17
 */
const currentAuth = ["admin"];
export { currentAuth };

// 获取权限
export function getCurrentAuthority() {
  return currentAuth;
}

// 做校验
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

// 判断登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
