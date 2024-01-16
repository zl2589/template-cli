<template>
  <div class="todolist">
    <h1>TODO</h1>
    <div class="panel">
      <task-box @add="addToDo"></task-box>
      <todo-item :list="list" @del="delToDo"></todo-item>
      <record-task :list="list" @clear="clear"></record-task>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

import TaskBox from "@/components/TaskBox";
import TodoItem from "@/components/TodoItem";
import Record from "@/components/Record";

export default defineComponent({
  name: "todo",
  components: {
    "task-box": TaskBox,
    "todo-item": TodoItem,
    "record-task": Record,
  },
  setup(props, context) {
    // let a = ref('') // ref定义单个数据
    // let b = reactive({}) // reactive定义对象数据
    let store = useStore();
    let list = computed(() => {
      return store.state.taskList;
    });
    let value = ref("");
    // 添加todo
    let addToDo = (val) => {
      value.value = val;
      //判断todo是否存在，不能重复添加
      let flag = true;
      list.value.map((item) => {
        if (item.title === value.value) {
          flag = false;
          alert("任务已存在");
        }
      });
      // 调用mutations 添加todo
      if (flag) {
        store.commit("addToDo", {
          title: value.value,
          complete: false,
        });
      }
    };
    // 删除todo
    let delToDo = (index) => {
      store.commit("delToDo", index);
    };
    // 清除已完成
    let clear = (arr) => {
      store.commit("clear", arr);
    };
    return {
      addToDo,
      list,
      value,
      delToDo,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
.todolist {
  width: 300px;
  margin: 0 auto;
  h1 {
    margin: 50px 0 60px;
    text-align: center;
    color: rgb(51, 144, 255);
  }
  & .panel {
    border: 2px solid rgb(51, 144, 255);
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
