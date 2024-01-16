<template>
  <div>
    <child-component :parent-value="value"></child-component>
    <button @click="change">改变值</button>
  </div>
</template>

<script>
import ChildComponent from "./components/ChildComponent.vue";

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      value: "初始值",
      index: 1
    };
  },
  methods: {
    change() {
      this.value = ++this.index;
    }
  }
};
</script>
