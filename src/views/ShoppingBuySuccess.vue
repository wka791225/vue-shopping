<!-- 購物車個人資訊及送出頁 -->
<script>
export default {
  data() {
    return {
      products: JSON.parse(localStorage.getItem("checkShopping")) || [],
      total: JSON.parse(localStorage.getItem("checkShopping")).reduce((acc, item) => acc + item.price * item.quantity, 0) || 0,
      qty: JSON.parse(localStorage.getItem("checkShopping")).reduce((acc, item) => acc + item.quantity, 0 ) || 0,
      formData: JSON.parse(localStorage.getItem("user")) || [],
    };
  },
  mounted() {
    // 刪除 localStorage 中的checkShopping資料
    // 利用localStorage中的checkShopping資料與cart的資料比對，如果有相同的資料就刪除
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let checkShopping = JSON.parse(localStorage.getItem('checkShopping')) || [];
    let newCart = cart.filter((item) => {
      return !checkShopping.some((item2) => item.id === item2.id);
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.removeItem('checkShopping');
    this.$emit('cart-updated');
  },
};
</script>
<template>
  <div class="w-full px-5">
    <div>
      <h1 class="mb-3 text-3xl font-bold">完成購買
      </h1>
    </div>

    <div class="mb-6 px-5">
      <div class="grid-table">
        <div class="grid-thead lg:!hidden">
          <div
            class="grid-cols-4 grid border-y border-main-deep text-main-deep font-bold py-1 gap-x-3"
          >
            <div class="gird-th text-center">商品圖片</div>
            <div class="gird-th">商品名稱</div>

            <div class="gird-th text-center">價錢</div>
            <div class="gird-th text-center">數量</div>
          </div>
        </div>
        <div class="grid-tbody">
          <div
            v-for="item in products ?? []"
            :key="item.id"
            class="grid-tr grid-cols-4 grid py-1 border-b border-main-deep min-h-[80px] gap-x-3 md:gap-x-1 lg:first:border-t lg:!py-3"
          >
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
              class="gird-td flex justify-center items-center lg:flex-wrap lg:!justify-between lg:pt-6 lg:col-start-3 lg:row-start-2 md:!col-start-2 md:col-span-2 md:!pt-0"
            >
              <div
                class="card-btns-list flex-col lg:!flex-row lg:w-full lg:items-center"
              >
                {{ item.quantity }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顯示購買客人填寫的姓名、電話、地址、付款方式、電子信箱、運送方式 -->
    <div class="mb-6 px-5">
      <div class="grid-table">
        <div class="grid-thead lg:!hidden">
          <div
            class="grid-cols-6 grid border-y border-main-deep text-main-deep font-bold py-1 gap-x-3"
          >
            <div class="gird-th">姓名</div>
            <div class="gird-th">電話</div>
            <div class="gird-th">地址</div>
            <div class="gird-th">付款方式</div>
            <div class="gird-th">電子信箱</div>
            <div class="gird-th">運送方式</div>
          </div>
        </div>
        <div class="grid-tbody">
          <!-- {{ formData }} -->
          <div  class="grid-tr grid-cols-6 grid py-1 border-b border-main-deep min-h-[80px] gap-x-3 md:gap-x-1 lg:first:border-t lg:!py-3" >

            <div class="flex items-center">{{ formData.name }}</div>
            <div class="flex items-center">{{ formData.phone }}</div>
            <div class="flex items-center">{{ formData.address }}</div>
            <div class="flex items-center">{{ formData.paymentMethod }}</div>
            <div class="flex items-center">{{ formData.email }}</div>
            <div class="flex items-center">{{ formData.shippingMethod }}</div>
          </div>
        </div>
        </div>
        </div>
  </div>
  <RouterLink to="/shopping" class="flex justify-center items-center bg-[#50468c] text-white rounded-md  px-4 py-1 cursor-pointer md:p-0" @click="submitCart()">
    <span>
    回首頁
    </span>
    </RouterLink>
</template>
