<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script setup>
const url = ref('https://github.com/Konev37/vue3_vite');

function goto() {
  window.open(url.value)
}
</script>
