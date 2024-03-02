<!-- 購物車個人資訊及送出頁 -->
<script>
export default {
  data() {
    return {
      products: JSON.parse(localStorage.getItem("checkShopping")) || [],
      total:
        JSON.parse(localStorage.getItem("checkShopping")).reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ) || 0,
      qty:
        JSON.parse(localStorage.getItem("checkShopping")).reduce(
          (acc, item) => acc + item.quantity,
          0
        ) || 0,
      formData: {
        name: "",
        phone: "",
        address: "",
        paymentMethod: "",
        email: "",
        shippingMethod: "",
      },
    };
  },
  mounted() {
  this.userCheck();
  },
  methods: {
    submitCart() {
      localStorage.setItem('user', JSON.stringify(this.formData));


      this.$router.push('/buysuccess');
    },
    userCheck(){
      if (localStorage.getItem('user')) {
        this.formData = JSON.parse(localStorage.getItem('user'));
      }
    }
  },
};
</script>
<template>
  <div class="w-full px-5">
    <div>
      <h1 class="mb-3 text-3xl font-bold">購買確認及填寫資訊</h1>
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
    <!-- 利用form表單讓購買客人填寫姓名、電話、地址、付款方式、電子信箱、運送方式 -->

    <form @submit.prevent="submitCart">
      <div class="mb-6 px-5">
        <label for="name" class="block mb-2 text-lg font-bold">姓名</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-6 px-5">
        <label for="phone" class="block mb-2 text-lg font-bold">電話</label>
        <input
          type="text"
          id="phone"
          v-model="formData.phone"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-6 px-5">
        <label for="address" class="block mb-2 text-lg font-bold">地址</label>
        <input
          type="text"
          id="address"
          v-model="formData.address"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-6 px-5">
        <label for="email" class="block mb-2 text-lg font-bold">電子信箱</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          required
        />
      </div>
      <div class="mb-6 px-5">
        <label for="paymentMethod" class="block mb-2 text-lg font-bold"
          >付款方式</label
        >
        <!-- 用input的radio -->
        <div class="flex gap-5">
          <div class="flex items-center">
            <input
              type="radio"
              id="paymentMethod1"
              value="信用卡"
              v-model="formData.paymentMethod"
              class="mr-2"
              required
            />
            <label for="paymentMethod1">信用卡</label>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                id="paymentMethod2"
                value="貨到付款"
                v-model="formData.paymentMethod"
                class="mr-2"
                required
              />
              <label for="paymentMethod2">貨到付款</label>
              </div>
              </div>
      </div>

      <div class="mb-6 px-5">
        <label for="shippingMethod" class="block mb-2 text-lg font-bold"
          >運送方式</label
        >
        <div class="flex gap-5">
          <div class="flex items-center">
            <input
              type="radio"
              id="shippingMethod1"
              value="宅配"
              v-model="formData.shippingMethod"
              class="mr-2"
              required
            />
            <label for="shippingMethod1">宅配</label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              id="shippingMethod2"
              value="超商取貨"
              v-model="formData.shippingMethod"
              class="mr-2"
              required
            />
            <label for="shippingMethod2">超商取貨</label>
          </div>
        </div>
      </div>
      <div class="flex justify-end flex-wrap mb-5">
        <h2 class="text-2xl font-bold w-full text-end">商品數量: {{ qty }}</h2>
        <h2 class="text-2xl font-bold w-full text-end">商品金額: ${{ total }}</h2>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex justify-center items-center bg-[#8c5046] text-white rounded-md  px-4 py-1 cursor-pointer "  @click="$router.go(-1)">
      <span>
      回上頁繼續加購
      </span>
      </div>
        <button
          type="submit"
          class="flex justify-center items-center bg-[#50468c] text-white rounded-md px-4 py-1 cursor-pointer "
        >
          <span>確認送出</span>
        </button>
      </div>
    </form>
  </div>
</template>
