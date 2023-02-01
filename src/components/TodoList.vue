<template>
  <div class="flex flex-col items-center justify-center w-full mt-4">
    <ul class="w-full max-h-[360px] overflow-y-scroll scrollbar">
      <li
        v-for="todo in props.todos"
        :key="todo.id"
        class="flex items-center justify-between w-full px-4 py-2 mt-2 text-quaternary-400 hover:text-white transition-colors rounded-md"
      >
        <span
          class="cursor-pointer l-through"
          :class="{ completed: todo.finished }"
          @click="updateTodo(todo)"
        >{{ todo.text }}</span>
        <button
          class="hover:text-secondary-500 focus:outline-none focus:text-red-600 transition-colors"
          @click="deleteTodo(todo)"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
interface Todo {
  id: number;
  text: string;
  finished: boolean;
}

// Props from parent component
const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits(["onDeleted", "onUpdated"]);

// Emit events to parent component
const deleteTodo = (todo: Todo): void => emit("onDeleted", todo.id);
const updateTodo = (todo: Todo): void => emit("onUpdated", todo.id);
</script>

<style scoped>

/* Line through for todo text */
.l-through {
  position: relative;
}
.l-through::after {
  content: "";
  width: 0%;
  height: 2px;
  background: #3b82f6;
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1);
}
.l-through:hover::after {
  width: 100%;
}
.l-through.completed::after {
  width: 100%;
}

/* Customize scrollbar for todo list */
.scrollbar {
  scrollbar-color: #111 #000; /* Firefox */
  scrollbar-width: thin; /* Firefox */

  scrollbar-face-color: #111; /* IE 10+ */
  scrollbar-highlight-color: #000; /* IE 10+ */
}

.scrollbar::-webkit-scrollbar {
  width: 8px; /* Chrome, Safari, Opera */
}
.scrollbar::-webkit-scrollbar-track {
  background: #000; /* Chrome, Safari, Opera */
}
.scrollbar::-webkit-scrollbar-thumb {
  background: #111; /* Chrome, Safari, Opera */
}
</style>
