<template>
  <div class="taskbox">
    <input
      type="text"
      placeholder="请输入任务名称"
      v-model="taskName"
      @keydown.enter="enter"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TaskBox",
  emits: ["add"],
  setup(props, context) {
    let taskName = ref("");
    let enter = () => {
      context.emit("add", taskName.value), (taskName.value = "");
    };
    return {
      taskName,
      enter,
    };
  },
});
</script>

<style scoped lang="scss">
.taskbox {
  width: 100%;
  margin-bottom: 20px;
  input {
    width: 98%;
    height: 30px;
    text-indent: 2px;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
}
</style>
