/*
 * @Description:权限制令
 * @Author: 志洪
 * @Date: 2020-03-20 11:59:12
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-20 14:56:06
 */

import { check } from "../utils/auth.js";

function install(Vue, option = {}) {
  Vue.directive(option.name || "auth", {
    instered(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };
