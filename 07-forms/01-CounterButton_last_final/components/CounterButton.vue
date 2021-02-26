<template>
  <button @click="count_ = count_ + 1">
    {{ count_ }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  data() {
    return {
      count_: this.count,
    };
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    count: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.count_ = newVal;
        }
      },
    },

    count_: {
      deep: true,
      handler(newVal) {
        this.$emit('increment', newVal);
      },
    },
  },
};
</script>

<style>

</style>
