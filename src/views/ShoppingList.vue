<script>
import jsonData from '@/assets/Json/MOCK_DATA.json';
import CountButton from '@/components/CountButton.vue';
export default {
  components: { CountButton },
  emits: ['cart-updated'],
  data: () => ({ products: jsonData.map(product => ({ ...product })), productRender: 1, search: '', sort: 'default', notice: '', noticeTimer: null }),
  computed: {
    filteredProducts() {
      const products = this.products.filter(product => `${product.name} ${product.description}`.toLowerCase().includes(this.search.toLowerCase()));
      if (this.sort === 'low') products.sort((a, b) => a.price - b.price);
      if (this.sort === 'high') products.sort((a, b) => b.price - a.price);
      return products;
    },
  },
  beforeUnmount() { clearTimeout(this.noticeTimer); },
  methods: {
    addCart(product) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === product.id);
      if (existing) existing.quantity += product.quantity;
      else cart.push({ ...product });
      localStorage.setItem('cart', JSON.stringify(cart));
      this.$emit('cart-updated');
      this.notice = `${product.name} 已加入購物袋`;
      clearTimeout(this.noticeTimer);
      this.noticeTimer = setTimeout(() => { this.notice = ''; }, 2600);
    },
  },
};
</script>

<template>
  <section class="catalog-hero">
    <div><p class="eyebrow">THE EVERYDAY COLLECTION</p><h1>讓日常，多一點<span>喜歡。</span></h1><p class="hero-copy">一點靈感，一些好物。<br>從這裡開始，找到屬於你的生活提案。</p><a class="hero-link" href="#collection">探索日常選物 <span>↗</span></a></div>
    <div class="hero-art" aria-hidden="true"><div class="art-orbit"></div><span class="art-label">A LITTLE<br>EVERYDAY<br>INSPIRATION.</span><div class="art-vase"></div><div class="art-stem"></div><div class="art-leaf leaf-one"></div><div class="art-leaf leaf-two"></div><div class="art-disc">m.</div><span class="art-caption">CURATED WITH CARE — VOL. 01</span></div>
  </section>
  <section id="collection" class="collection">
    <div class="collection-heading"><div><p class="eyebrow">FIND YOUR FAVORITES</p><h2>所有商品 <span>{{ products.length }}</span></h2></div><p>為生活留一點美好的空間。</p></div>
    <div class="catalog-toolbar"><label class="search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input v-model="search" type="search" placeholder="尋找喜歡的商品…" aria-label="搜尋商品"></label><div class="toolbar-actions"><select v-model="sort" aria-label="商品排序"><option value="default">預設排序</option><option value="low">價格：由低到高</option><option value="high">價格：由高到低</option></select><div class="view-switch"><button type="button" :class="{ active: productRender === 1 }" :aria-pressed="productRender === 1" aria-label="卡片顯示" @click="productRender = 1">▦</button><button type="button" :class="{ active: productRender === 2 }" :aria-pressed="productRender === 2" aria-label="列表顯示" @click="productRender = 2">☰</button></div></div></div>
    <div class="product-grid" :class="{ 'list-view': productRender === 2 }">
      <article v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image" :class="`tone-${(product.id - 1) % 4}`"><img :src="product.pic.trim()" :alt="product.name" loading="lazy" @error="$event.target.style.display = 'none'"><span class="product-index">NO. {{ String(product.id).padStart(2, '0') }}</span><span class="image-caption">EVERYDAY ESSENTIALS</span></div>
        <div class="product-details"><p class="product-category">日常精選 / COLLECTION</p><h3>{{ product.name }}</h3><p class="product-description" :title="product.description">{{ product.description }}</p><p class="product-price"><small>NT$</small> {{ product.price.toLocaleString('zh-TW') }}</p><div class="product-actions"><CountButton :origin-value="product.quantity" :min="1" @value-changed="value => product.quantity = value" /><button type="button" class="add-button" @click="addCart(product)">加入購物袋 <span>＋</span></button></div></div>
      </article>
    </div>
    <div v-if="!filteredProducts.length" class="empty-state"><h3>還沒有找到相符的商品</h3><p>換個關鍵字，再找找看。</p><button class="primary-button" @click="search = ''">查看所有商品</button></div>
    <p class="collection-end">{{ filteredProducts.length }} 件選物 · 每一件，都是生活的靈感</p>
  </section>
  <Transition name="toast"><div v-if="notice" class="cart-toast" role="status"><span>✓</span>{{ notice }}<RouterLink to="/Shoppingcar">查看購物袋 →</RouterLink></div></Transition>
</template>
