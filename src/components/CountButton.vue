<script>
import add from '@/assets/Image/add.png';
import minus from '@/assets/Image/line.png';

export default {
  props: {
    originValue: {
      type: Number,
      required: false,
      default: 1,
    },
    min: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  emits: ['valueChanged'],
  data() {
    return {
      image: {
        add,
        minus,
      },
      value: this.originValue,
    };
  },
  watch: {
    originValue: {
      handler(originValue) {
        this.value = originValue;
      },
    },
    value: {
      handler(value) {
        this.$emit('valueChanged', value);
      },
    },
  },
  methods: {
    // 減數值
    minusNum() {
      const { value, min } = this;
      if (value === min) return;
      if (value < min) {
        this.value = min;
      } else {
        this.value--;
      }
    },
    // 加數值
    addNum() {

      this.value++;

    },
    // 手打數值
    typeNum() {
      const { value, min } = this;

      if (value < min) {
        this.value = min;
      }
    },
  },
};
</script>

<template>
  <section class="count-btn">
    <div class="pill">
      <div class="border border-main-grey border-1 rounded-l-full w-[30px] h-[35px] text-xl float-left cursor-pointer flex justify-center items-center" @click="minusNum()">
        <img :src="image.minus" alt="減">
      </div>
      <div class="border border-main-grey border-x-0 border-y-1 grow h-[35px] flex justify-center items-center text-xl">
        <input v-model="value" type="number" :min="min" class="h-[30px] w-[50px] border-0 p-0 text-center md:w-[40px]" @change="typeNum()">
      </div>
      <div class="border border-main-grey border-1 rounded-r-full w-[30px] h-[35px] text-xl float-right cursor-pointer flex justify-center items-center" @click="addNum()">
        <img :src="image.add" alt="加">
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.count-btn {
  @apply flex;
  .pill {
    @apply flex grow;
  }
  img {
    @apply select-none;
  }
}
</style>