<script>
import { RouterView } from 'vue-router';
export default {
  components: { RouterView },
  data: () => ({ shoppingList: 0 }),
  methods: {
    updateCartLength() {
      this.shoppingList = JSON.parse(localStorage.getItem('cart'))?.length || 0;
    },
  },
  mounted() { this.updateCartLength(); },
};
</script>

<template>
  <div class="announcement">GOOD FINDS, EVERY DAY. <span>把喜歡的日常，帶回家。</span></div>
  <header class="site-header">
    <RouterLink class="brand" to="/shopping" aria-label="日常選物首頁"><span class="brand-mark">m.</span><span>日常選物<small> mellow market</small></span></RouterLink>
    <nav aria-label="主要導覽">
      <RouterLink class="nav-shop" to="/shopping">探索商品</RouterLink>
      <RouterLink class="cart-link" to="/Shoppingcar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg><span>購物袋</span><b>{{ shoppingList }}</b></RouterLink>
    </nav>
  </header>
  <main class="site-main"><RouterView @cart-updated="updateCartLength" /></main>
  <footer class="site-footer"><RouterLink class="brand" to="/shopping">mellow market<span class="footer-dot">✳</span></RouterLink><p>好好挑選，慢慢生活。</p><small>© {{ new Date().getFullYear() }} 日常選物</small></footer>
</template>
