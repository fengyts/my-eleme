<!--  -->
<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <!-- 选择商品数量 -->
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      // 选择的商品
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    /** 配送描述计算 */
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`; //es6新语法: ``里面可以通过${}传入参数然后返回为字符串
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    /**计算属性：判断配送费用 */
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl';
.shopcart
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content
    display: flex;
    background: #14172d;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left
      flex: 1;
      .logo-wrapper
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.highlight
            background: rgb(0, 160, 220);
          .icon-shopping_cart
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight
              color: #fff;
        .num
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
      .price
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        line-height: 24px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        &.highlight
          color: #fff;
      .desc
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
    .content-right
      flex: 0 0 105px;
      width: 105px;
      .pay
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #2b333b;
        &.not-enough
          background: #2b333b;
        &.enough
          background: #00b43c;
          color: #fff;
</style>
