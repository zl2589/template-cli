<template>
  <div class="demo">
    <!-- 导航菜单 -->
    <nav-box></nav-box>
    <hr />
    <!-- 文本编辑 -->
    <text-edit></text-edit>
    <hr />

    <!-- 订单列表 -->
    <order-box></order-box>
    <hr />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

import Nav from "@/components/Nav";
import TextEdit from "@/components/TextEdit";
import Order from "@/components/Order";

export default defineComponent({
  name: "demo",
  components: {
    "nav-box": Nav,
    "text-edit": TextEdit,
    "order-box": Order,
  },
  setup(props, context) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.demo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
