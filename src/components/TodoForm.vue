<template>
  <div class="flex flex-col items-center justify-center h-screen bg-black">
    <div class="w-1/3 max-lg:w-full max-md:p-4 max-w-2xl">
      <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
          <h1 class="text-quaternary-300 text-4xl font-bold text-gray-800">
            Todo App
          </h1>
          <p class="text-quaternary-400">Add your todos below</p>
        </div>
        <div class="flex items-center justify-center w-full mt-4">
          <input
            type="text"
            v-model="todo"
            class="px-4 py-2 grow border rounded-md focus:outline-none focus:border-blue-500 bg-black text-white placeholder-quaternary-600 border-quaternary-900 focus:border-quaternary-500 transition-colors"
            placeholder="Today is a great day to..."
          />
          <Button
            @click="addTodo"
            class="ml-2 grow-0"
          >
            Add Todo
          </Button>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "./elements/Button.vue";
import { onMounted, ref } from "vue";

// Todo value in input bar
const todo = ref();

const emit = defineEmits(["onAdded"]);

// Emit event to parent component
const addTodo = () => {
  if (!todo.value) return;
  emit("onAdded", todo.value);
  todo.value = "";
};

// Add todo on enter key press
onMounted(() => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });
});
</script>
