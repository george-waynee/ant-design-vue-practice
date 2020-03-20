<!--
 * @Description: 权限组件 函数式组件，相比于权限指令，更推荐权限组件，因为有些组件不是挂载到dom下面，可以更好的处理效果
 * @Author: 志洪
 * @Date: 2020-03-20 11:23:55
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-20 15:21:52
 -->
<script>
import { check } from "../utils/auth.js";
export default {
  functional: true,
  porps: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
<style lang="less" scoped></style>
