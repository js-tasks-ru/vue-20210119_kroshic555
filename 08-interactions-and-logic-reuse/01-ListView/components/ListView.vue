<template>
  <div class="meetups-list">
    <template v-for="item in items_">
      <slot :meetup="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ListView',

  data() {
    return {
      items_: [],
    };
  },

  props: {
    items: Array,
  },

  watch: {
    items: {
      immediate: true,
      handler(newValue) {
        this.items_ = [...newValue];
      },
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
