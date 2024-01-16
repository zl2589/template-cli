<template>
  <div class="todoitem">
    <div v-if="list.length > 0">
      <li v-for="(item, index) in list" :key="index">
        <a><input type="checkbox" v-model="item.complete" />{{ item.title }}</a>
        <button @click="del(index)">删除</button>
      </li>
    </div>
    <div v-else>暂无任务</div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TodoItem",
  props: {
    list: Array,
  },
  emits: ["del"], // 专门存放emit分发事件的属性名
  setup(props, context) {
    let del = (index) => {
      context.emit("del", index);
    };
    return {
      del,
    };
  },
});
</script>

<style lang="scss" scoped>
.todoitem {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  li {
    line-height: 35px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    input {
      font-size: 15px;
    }
    button {
      display: none;
    }
  }
  li:hover {
    background-color: #ddd;
    button {
      display: block;
    }
  }
}
</style>