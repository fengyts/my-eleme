<!--  -->
<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart($event)">
        <!-- <span class="inner icon-remove_circle_outline"></span> -->
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)" ref="addCart"></div>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        // 防止pc端重复点击
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1); // Vue的set方法用于数据发生变化时监听DOM
        this.food.count = 1;
      } else {
        this.food.count++;
      }
      // 添加购物车绑定事件
      // this.$dispatch('cart-add', event.target); // vue 1.0
      this.$emit('cart-add', event.target); // vue2 通过$emit来触发自定义事件
    },
    decreaseCart(event) {
      if (!event._constructed) {
        // 防止pc端重复点击
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.cartcontrol
  font-size: 0;
  .cart-decrease
    display: inline-block;
    padding: 6px;
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  .cart-count
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  .cart-add
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
</style>
