<template>
  <div class="home">
    <router-link to="/demo">demo</router-link>
    <router-link to="/todo">todolist</router-link>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  a {
    display: block;
    text-decoration: none;
    width: 150px;
    line-height: 50px;
    border: 1px solid #ddd;
    border-radius: 4px;
    letter-spacing: 2px;
    font-size: 18px;
    text-align: center;
  }
  a:hover {
    background-color: rgb(64, 133, 224);
    color: #fff;
    cursor: pointer;
  }
}
</style>
