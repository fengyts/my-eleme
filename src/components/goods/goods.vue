<!--  -->
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, $index) in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/javascript">
import BScroll from "better-scroll";
import shopcart from "../../components/shopcart/shopcart";

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: {},
      listHight: [], // 滚动高度
      scrollY: 0
    };
  },
  computed: {
    // 计算当前滚动索引位置
    currentIndex() {
      for (let i = 0; i < this.listHight.length; i++) {
        let height1 = this.listHight[i];
        let height2 = this.listHight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];

    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        // 调用滚动效果
        // 此处必须调用$nextTick方法，否则不会生效
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight(); // 计算滚动高度
        });
      }
    });
  },
  methods: {
    /** 滚动效果函数，使用better-scroll第三方插件实现 */
    _initScroll() {
      // this.$refs.menuWrapper的menuWrappe必须在DOM上定义ref="menuWrapper"
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      });

      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    /**计算food-list滚动高度 */
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHight.push(height);
      }
    },
    /**左侧菜单点击联动事件
     * @param: index-菜单索引
     * @param: event-当前点击事件
     */
    selectMenu(index, event) {
      if (!event._constructed) {
        // 防止pc端浏览器两次触发点击事件
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    }
  },
  components: {
    shopcart
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin';
.goods
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item
      display: table; // 垂直居中最好的布局
      width: 56px;
      height: 54px;
      padding: 0 12px;
      line-height: 14px;
      &.current
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text
          border-none();
      .icon
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease
          bg-image('decrease_3');
        &.discount
          bg-image('discount_3');
        &.guarantee
          bg-image('guarantee_3');
        &.invoice
          bg-image('invoice_3');
        &.special
          bg-image('special_3');
      .text
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
  .foods-wrapper
    flex: 1;
    .title
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    .food-item
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      &:last-child
        boder-none();
        margin-bottom: 0;
      .icon
        flex: 0 0 57px;
        margin-right: 10px;
      .content
        flex: 1;
        .name
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        .desc, .extra
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        .desc
          line-height: 12px;
          margin-bottom: 8px;
        .extra
          .count
            margin-right: 12px;
        .price
          font-weight: 700;
          line-height: 24px;
          .now
            maring-right: 8px;
            font-siz: 14px;
            color: rgn(240, 20, 20);
          .old
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
</style>
