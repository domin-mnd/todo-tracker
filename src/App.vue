<template>
  <main ref="parent">
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue';
const [parent] = useAutoAnimate();
</script>