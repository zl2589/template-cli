<template>
  <div id="nav-menu">
    <h1>导航菜单</h1>
    <nav v-bind:class="active">
      <a href="#" class="home" @click="makeActive('home')">home</a>
      <a href="#" class="projects" @click="makeActive('projects')">projects</a>
      <a href="#" class="services" @click="makeActive('services')">services</a>
      <a href="#" class="contact" @click="makeActive('contact')">contact</a>
    </nav>
    <a>
      您选择了 <b>{{ active }} 菜单</b>
    </a>
  </div>
</template>

<script>
// 因为vue3向后兼容，所以可以直接使用vue2的方式
export default {
  data() {
    return { active: "home" };
  },
  methods: {
    makeActive: function(item) {
      this.active = item;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: inline-block;
  margin: 20px auto 20px;
  background-color: #5597b4;
}
nav a {
  display: inline-block;
  padding: 18px 30px;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  background-color: transparent;

  -webkit-transition: background-color 0.25s;
  -moz-transition: background-color 0.25s;
  transition: background-color 0.2s;
}
nav a:first-child {
  border-radius: 2px 0 0 2px;
}
nav a:last-child {
  border-radius: 0 2px 2px 0;
}
nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact {
  background-color: #e35885;
}

a {
  font-size: 22px;
  font-weight: bold;
  color: #7d9098;
}
a b {
  color: #ffffff;
  display: inline-block;
  padding: 5px 10px;
  background-color: #c4d7e0;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 18px;
}
</style>
