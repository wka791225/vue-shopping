<script>
export default {
  props: { originValue: { type: Number, default: 1 }, min: { type: Number, default: 1 } },
  emits: ['valueChanged'],
  methods: {
    update(value) {
      const number = Number(value);
      this.$emit('valueChanged', Number.isFinite(number) ? Math.max(this.min, Math.min(99, Math.floor(number))) : this.min);
      this.$forceUpdate();
    },
  },
};
</script>
<template>
  <div class="quantity-control">
    <button type="button" aria-label="減少數量" :disabled="originValue <= min" @click="update(originValue - 1)">−</button>
    <input :value="originValue" type="number" :min="min" max="99" aria-label="商品數量" @change="update($event.target.value); $event.target.value = Math.max(min, Math.min(99, Math.floor(Number($event.target.value) || min)))">
    <button type="button" aria-label="增加數量" :disabled="originValue >= 99" @click="update(originValue + 1)">+</button>
  </div>
</template>
