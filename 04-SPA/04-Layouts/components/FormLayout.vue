<template>
  <div class="page page_meetup-forms container">
    <div class="header">
      <h1>
        {{ title }}
      </h1>
    </div>
    <div clas="form-check">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',

  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.page.page_meetup-forms {
  padding: 70px 0;
}
.header {
  padding: 44px 0 32px;
}
</style>
