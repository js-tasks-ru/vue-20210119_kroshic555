import Vue from './vue.esm.browser.js';

const app = new Vue({
  template: `#app`,

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    increaseCounter() {
      this.counter++;
    },
  },
});

app.$mount('#app');
