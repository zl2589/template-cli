<template>
  <div class="record">
    <p>已完成{{ isComplete }} / 全部{{ list.length }}</p>
    <button v-if="isComplete > 0" @click="clear">清除已完成</button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "Record",
  props: {
    list: Array,
  },
  // 组件只分发事件，具体逻辑由父组件实现
  setup(props, context) {
    let isComplete = computed(() => {
      let arr = props.list.filter((item) => {
        // 数组过滤
        return item.complete;
      });
      return arr.length;
    });
    let clear = () => {
      let arr = props.list.filter((item) => {
        return !item.complete;
      });
      context.emit("clear", arr);
    };
    return {
      isComplete,
      clear,
    };
  },
});
</script>

<style scoped lang="scss">
.record {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    padding: 5px;
  }
}
</style>
