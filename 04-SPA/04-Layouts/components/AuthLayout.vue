<template>
  <div class="page page_onboarding">
    <div class="header">
      <h1>
        {{ title }}
      </h1>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',

  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
.header {
  padding: 44px 0 32px;
  text-align: center;
}
</style>
