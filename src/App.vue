<template>
  <Todo />
</template>
<script setup lang="ts">
// Asynchronous component
import { defineAsyncComponent } from 'vue';
const Todo = defineAsyncComponent(() => import('./components/Todo.vue'));
</script>