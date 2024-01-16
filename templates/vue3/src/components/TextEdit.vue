<template>
  <div id="txt-edit" @click="hideTooltip">
    <div class="tooltip" v-on:click.stop v-show="show_tooltip">
      <input
        type="text"
        v-model="txt_content"
        placeholder="点我，并编辑内容。"
      />
    </div>
    <!-- 这是一个提示框 v-on:click.stop 是一个点击事件处理器，stop 修饰符用于阻止事件传递 -->
    <p @click.stop="toggleTooltip">点我编辑</p>
    <a>{{ txt_content }}</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_tooltip: false,
      txt_content: "",
    };
  },
  methods: {
    toggleTooltip: function() {
      this.show_tooltip = !this.show_tooltip;
    },
    hideTooltip: function() {
      this.show_tooltip = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#txt-edit {
  height: 300px;
  padding-top: 150px;
  position: relative;
}
.tooltip {
  background-color: #5c9bb7;
  box-shadow: 0 1px 1px #ccc;
  border-radius: 3px;
  width: 290px;
  margin: 0 auto;
  padding: 10px;
  position: absolute;
  left: 150px;
  margin-left: -145px;
  top: 80px;
}
.tooltip::after {
  content: "";
  border: 6px solid #5190ac;
  border-color: #5190ac transparent transparent;
  position: absolute;
  bottom: -12px;
  left: 50%;
  margin-left: -3px;
}
.tooltip input {
  width: 100%;
  line-height: 34px;
  border-radius: 3px;
  outline: none;
  font-family: inherit;
  color: #8d9395;
  font-weight: bold;
  border: none;
  text-align: center;
}
#txt-edit p {
  cursor: default;
}
#txt-edit p::before {
  content: "✎";
}
</style>
