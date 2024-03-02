<!-- 商品列表頁面，利用卡片的形式陳列商品並顯示商品名稱、商品圖片、敘述、加入購物車按鈕及可以增加減少購買數量 -->
<script>
import jsonData from '@/assets/Json/MOCK_DATA.json';
import shoppingCar from '@/assets/Image/shoping-car.png';
import CountButton from '@/components/CountButton.vue';
import block from '@/assets/Image/mesh.png';
import blockGrey from '@/assets/Image/mesh-grey.png';
import list from '@/assets/Image/list.png';
import listGrey from '@/assets/Image/list-grey.png';
export default {
  components: {
    CountButton,
  },
  data() {
    return {
      products: jsonData,
      shoppingCar,
      productRender: 1,
      imgIcon: {
        block,
        blockGrey,
        list,
        listGrey,
      },
    };
  },
  methods: {
    addCart(product) {
      // 從 localStorage 中取得購物車的資料
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // 檢查該產品是否已在購物車中
      let existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // 如果產品已存在，更新其數量
        existingProduct.quantity += product.quantity;
      } else {
        // 如果產品不存在，將其加入購物車
        cart.push(product);
      }

      // 將更新後的購物車資料存回 localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // 發出一個事件，讓父組件知道購物車已經更新
      this.$emit('cart-updated');
    },
    /**
     * 減少數量函數
     * @param {string} practice - 操作類型，可以是 'reduce' 或 'add'
     * @param {object} item - 商品物件
     */
    decreaseQuantity(practice, item) {
      if (practice === 'reduce') {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          item.quantity = 1;
        }
      } else if (practice === 'add') {
        if (item.quantity < 99) {
          item.quantity += 1;
        } else {
          item.quantity = 99;
        }
      }
    },
    listRender(type) {
      this.productRender = type;
    },
  },
};
</script>
<template>
  <div class="w-full px-5">
    <div>
      <h1 class="mb-3 text-3xl font-bold">商品列表</h1>
      <div class="flex justify-end items-center">
        <img v-if="productRender === 1" class="mr-1" :src="imgIcon.block" alt="卡片顯示">
        <img v-else :src="imgIcon.blockGrey" class="mr-1" alt="卡片顯示" @click="listRender(1)">
        <img v-if="productRender === 2" class="mr-1" :src="imgIcon.list" alt="條列顯示">
        <img v-else :src="imgIcon.listGrey" class="mr-1" alt="條列顯示" @click="listRender(2)">
      </div>
    </div>
    <div v-if="productRender === 1"  class="flex gap-5 flex-wrap justify-center">
      <div
        class="w-1/6 border-[1px] rounded-lg flex flex-col"
        v-for="product in products"
        :key="product.id"
      >
        <img class="rounded-t-lg w-full" :src="product.pic" alt="商品圖片" />
     
        <div class="bg-slate-100  h-[250px] bg-opacity-30 pl-3 flex flex-col gap-3 pt-3">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p>價格: {{ product.price }}</p>
        </div>
          <div class="flex mb-5 gap-5">
              數量:
              <CountButton class="product-qty w-[150px] mb-3 lg:!mb-0 h-[35px] lg:mr-3" :origin-value="product.quantity" :min="1" @value-changed="(value) => product.quantity = value" />
          </div>
        <button
          type="button"
          class="flex justify-center items-center bg-[#50468c] text-white rounded-b-lg px-4 py-1 cursor-pointer md:p-0 "
          @click="addCart(product)"
        >
        <img :src="shoppingCar" alt="" srcset="">
          加入購物車
        </button>
      </div>
    </div>
    <div v-if="productRender === 2" class="mb-6 px-5">
          <div class="grid-table">
            <div class="grid-thead">
              <div class="grid-cols-6 grid border-y border-main-deep text-main-deep font-bold py-1 gap-x-3">
                <div class="gird-th text-center">商品圖片</div>
                <div class="gird-th">商品名稱</div>
                <div class="gird-th text-center">商品描述</div>
                <div class="gird-th text-center">價錢</div>
                <div class="gird-th opacity-0">操作</div>
              </div>
            </div>
            <div class="grid-tbody">
              <div v-for="(item) in products ?? []" :key="item.id" class="grid-tr grid-cols-6 grid py-1 border-b border-main-deep min-h-[80px] gap-x-3 md:gap-x-1 lg:first:border-t lg:!py-3">
                  <img  :src="item.pic" alt="商品圖示" class="w-[250px] h-full object-cover">
                  <div class="flex items-center">{{ item.name }}</div>
                  <div class="flex items-center">{{ item.description }}</div>
                  <div class="gird-td flex justify-center items-center">${{ item.price }}</div>
                  <div class="gird-td flex justify-center  items-center lg:flex-wrap lg:!justify-between lg:pt-6   md:!pt-0">
                    <div class="card-btns-list flex-col lg:!flex-row lg:w-full lg:items-center">
                      <CountButton class="product-qty w-[150px] mb-3 lg:!mb-0 h-[35px] lg:mr-3" :origin-value="item.quantity" :min="1" @value-changed="(value) => item.quantity = value" />
                      <div class="flex justify-center items-center bg-[#50468c] text-white rounded-full px-4 py-1 cursor-pointer md:p-0 w-[150px]" @click="addCart(item)">
                        <img :src="shoppingCar" class="mr-2 md:mr-0" alt="購物車圖示">
                        <span>
                        加入購物車
                        </span>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>
<!-- <style lang="scss" scoped>
 .grid-table {
    .grid-thead {
      .grid-tr {
        @apply grid border-y border-main-deep text-main-deep font-bold py-1 gap-x-3;
        grid-template-columns: 200px 3fr 1fr 1fr 200px 150px;
      }
    }
    .grid-tbody {
      .grid-tr {
        @apply grid py-1 border-b border-main-deep min-h-[80px] gap-x-3 md:gap-x-1;
        grid-template-columns: 200px 3fr 1fr 1fr 200px 150px;
        .scientific {
          @apply text-main-deep font-bold;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
</style> -->