<!-- 商品列表頁面，利用卡片的形式陳列商品並顯示商品名稱、商品圖片、敘述、加入購物車按鈕及可以增加減少購買數量 -->
<script>
import CountButton from "@/components/CountButton.vue";
export default {
  components: {
    CountButton,
  },
  data() {
    return {
      products: JSON.parse(localStorage.getItem("cart")) || [],
      total: 0,
      qty: 0,
    };
  },
mounted() {
  // 刪除 localStorage 中的checkShopping資料
  localStorage.removeItem('checkShopping');
},

  methods: {
    checkProduct(item) {
      let cart = JSON.parse(localStorage.getItem('checkShopping')) || [];

    if (item.check) {
      // 如果 checkbox 是勾選的，把商品加入到 localStorage
      cart.push(item);
    } else {
      // 如果 checkbox 不是勾選的，從 localStorage 中移除商品
      cart = cart.filter(cartItem => cartItem.id !== item.id);
    }
    if(cart.length !== 0){
      this.total =  cart.reduce((acc, item) => acc + item.price * item.quantity, 0) ;
      this.qty =  cart.reduce((acc, item) => acc +  item.quantity, 0) ;
    }else{
      this.total = 0;
      this.qty = 0;
    }
    localStorage.setItem('checkShopping', JSON.stringify(cart));
    },
    submitCart(){
      // 取得 localStorage 中的勾選起來的資料，如果沒有則不送出
      const cart = JSON.parse(localStorage.getItem('checkShopping')) || [];
      if (cart.length === 0) {
        alert('請選擇商品');
        return;
      }
      // 送出購物車
      alert('送出購物車');
      // 跳轉頁面到Shoppingcheck
      this.$router.push('/Shoppingcheck');
    }
  },

};
</script>
<template>
  <div class="w-full px-5">
    <div>
      <h1 class="mb-3 text-3xl font-bold">購物車確認</h1>
    </div>

    <div class="mb-6 px-5">
      <div class="grid-table">
        <div class="grid-thead lg:!hidden">
          <div
            class="grid-cols-6 grid border-y border-main-deep text-main-deep font-bold py-1 gap-x-3"
          >
            <div class="gird-th text-center"></div>
            <div class="gird-th text-center">商品圖片</div>
            <div class="gird-th">商品名稱</div>

            <div class="gird-th text-center">價錢</div>
            <div class="gird-th opacity-0">操作</div>
          </div>
        </div>
        <div class="grid-tbody">
          <div
            v-for="item in products ?? []"
            :key="item.id"
            class="grid-tr grid-cols-6 grid py-1 border-b border-main-deep min-h-[80px] gap-x-3 md:gap-x-1 lg:first:border-t lg:!py-3"
          >
            <div class="flex justify-center">
              <input v-model="item.check" type="checkbox" class="w-5" name="" id="" @change="checkProduct(item)" />
            </div>
            <div class="flex justify-center">

              <img
                :src="item.pic"
                alt="商品圖示"
                class="w-[100px] h-full object-cover"
              />
            </div>

            <div class="flex items-center">{{ item.name }}</div>

            <div class="gird-td flex justify-center items-center">
              ${{ item.price }}
            </div>
            <div
              class="gird-td flex justify-center items-center lg:flex-wrap lg:!justify-between lg:pt-6   md:!pt-0"
            >
              <div
                class="card-btns-list flex-col lg:!flex-row lg:w-full lg:items-center"
              >
                <CountButton
                  class="product-qty w-[150px] mb-3 lg:!mb-0 h-[35px] lg:mr-3"
                  :origin-value="item.quantity"
                  :min="1"
                  @value-changed="(value) => (item.quantity = value)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end flex-wrap">
      <h2 class="text-2xl text-end font-bold w-full">商品數量: {{ qty }}</h2>
      <h2 class="text-2xl text-end font-bold w-full">商品總金額: ${{ total }}</h2>
    </div>
    
    <div class="flex justify-between gap-4">
      <div class="flex justify-center items-center bg-[#8c5046] text-white rounded-md  px-4 py-1 cursor-pointer "  @click="$router.go(-1)">
      <span>
      回上頁繼續購買
      </span>
      </div>
      <div class="flex justify-center items-center bg-[#50468c] text-white rounded-md  px-4 py-1 cursor-pointer " @click="submitCart()">
      <span>
      確認購買
      </span>
      </div>
      </div>
  </div>
</template>
