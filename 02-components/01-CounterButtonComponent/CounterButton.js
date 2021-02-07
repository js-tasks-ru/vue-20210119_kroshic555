export const CounterButton = {
  template: `
    <button
      type="button"
      :count="count"
      @click="increment(count)">
    {{ count }}
    </button>
  `,

  model: {
    prop: "count",
    event: "increment"
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    increment(value) {
      this.$emit("increment", value + 1);
    },
  },

};
