<template>
  <div>子组件接受的props：{{ parentValue }}</div>
</template>

<script>
export default {
  props: {
    parentValue: {
      type: String | Number,
      required: true
    }
  },
  watch: {
    // 监听父组件传递过来的prop
    parentValue(newVal, oldVal) {
      console.log("parentValue changed from", oldVal, "to", newVal);
      // 在这里可以进行相应的逻辑处理
    }
  }
};
</script>
