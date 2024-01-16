<template>
  <div id="order">
    <form>
      <h1>Service</h1>
      <ul>
        <li
          v-for="service in services"
          :key="service.name"
          :class="{ active: service.active }"
          @click="toggleActive(service)"
        >
          {{ service.name }}<span>{{ currency(service.price) }}</span>
          <!-- {{ service.name }}<span>{{service.price |  currency }}</span> -->
        </li>
      </ul>
      <div class="total">
        Total: <span>{{ currency(total()) }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
export default {
  name: "order",
  data() {
    return {
      services: [
        {
          name: "Web Development",
          price: 300,
          active: false,
        },
        {
          name: "Design",
          price: 400,
          active: false,
        },
        {
          name: "Integration",
          price: 250,
          active: false,
        },
        {
          name: "Training",
          price: 220,
          active: false,
        },
      ],
    };
  },
  setup(props, context) {
    const currency = computed(() => {
      return (value) => "$" + parseFloat(value).toFixed(2); //toFixed(num) 小数的位数
    });
    return {
      currency,
    };
  },
  methods: {
    toggleActive(service) {
      service.active = !service.active;
    },
    total() {
      var total = 0;
      this.services.forEach(function(service) {
        if (service.active) total += service.price;
      });
      return total;
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  background-color: #61a1bc;
  border-radius: 2px;
  width: 400px;
  padding: 35px 60px;
  margin: 50px auto;
}
#order form h1 {
  color: #fff;
  font-size: 64px;
  font-family: "Cookie", cursive;
  font-weight: normal;
  line-height: 1;
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
}
form ul {
  list-style: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 20px 0 15px;
}
form ul li {
  padding: 20px 30px;
  background-color: #b6acaf;
  margin-bottom: 8px;
  cursor: pointer;
}
form ul li.active {
  background-color: #8ec16d;
}
form ul li span {
  float: right;
}
.total {
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  padding: 15px 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  color: #fff;
}
.total span {
  float: right;
}
</style>
