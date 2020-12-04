<template>
  <div class="container">
    <Products />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Products from './components/Products.vue'
import { provideStore } from './store'

export default defineComponent({
  name: 'App',
  setup() {
    provideStore()
  },
  components: {Products}
});
</script>

<style scoped>
.container {
  margin: 2rem;
}
</style>