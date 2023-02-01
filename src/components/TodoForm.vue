<template>
  <div class="flex flex-col items-center justify-center h-screen bg-black">
    <div class="w-1/3 max-md:w-full max-md:p-4">
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
            class="px-4 py-2 grow border rounded-md focus:outline-none focus:border-blue-500 bg-black text-white placeholder-quaternary-600 border-quaternary-900 focus:border-quaternary-500 transition-colors"
            placeholder="Today is a great day to..."
            v-model="todo"
          />
          <button
            class="px-4 py-2 ml-2 grow-0 text-quaternary-400 border-t-[1px] border-t-black rounded-md hover:border-t-quaternary-500 hover:bg-quaternary-700 hover:text-white focus:outline-none transition-colors"
            @click="addTodo"
          >
            Add Todo
          </button>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

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
