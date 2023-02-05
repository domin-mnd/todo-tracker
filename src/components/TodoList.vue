<template>
  <div class="flex flex-col items-center justify-center w-full mt-4">
    <ul class="w-full max-h-[360px] overflow-y-scroll scrollbar" ref="list">
      <li
        v-for="
          dateTodo in dateTodos.sort(
            (a: DateTodo, b: DateTodo) =>
              // Sort by date in descending order
              new Date(a.date).getTime() - new Date(b.date).getTime()
          ).reverse()
        "
        :key="dateTodo.date"
        class="mt-2"
      >
        <span class="text-quaternary-500 text-sm">
          {{ dateTodo.date }}
        </span>
        <li
          v-for="todo in dateTodo.todos.sort((a: Todo, b: Todo) => a.createdAt.seconds - b.createdAt.seconds)"
          :key="todo.id"
          class="flex justify-between w-full px-4 py-2 mt-2 text-quaternary-400 hover:text-white transition-colors rounded-md toolbar-container"
        >
          <span
            class="cursor-pointer l-through"
            :class="{ completed: todo.finished }"
            :title="todo.description"
            @click="
              () => {
                todo.finished = !todo.finished;
                updateTodo(todo);
              }
            "
          >
            {{ todo.title }}
          </span>
          <div class="flex items-center opacity-0 transition-opacity max-md:opacity-100 toolbar">
            <button
              class="hover:text-tertiary-500 focus:outline-none focus:text-red-600 transition-colors"
              @click="
                () => {
                  modalOpened = true;
                  modalData = todo;
                }
              "
            >
              <Pen class="p-[3px] mr-2" />
            </button>
            <button
              class="hover:text-secondary-500 focus:outline-none focus:text-red-600 transition-colors"
              @click="deleteTodo(todo)"
            >
              <X />
            </button>
          </div>
        </li>
      </li>
    </ul>
  </div>
  <Modal :opened="modalOpened" @on-close="() => (modalOpened = false)">
    <template #header>Edit Todo</template>
    <input
      type="text"
      v-model="modalData.title"
      class="px-4 py-2 mb-2 w-full border rounded-md focus:outline-none focus:border-blue-500 bg-black text-white placeholder-quaternary-600 border-quaternary-900 focus:border-quaternary-500 transition-colors"
      placeholder="Name your todo..."
    />
    <textarea
      style="resize: none"
      v-model="modalData.description"
      class="px-4 py-2 mb-2 h-full w-full border rounded-md focus:outline-none focus:border-blue-500 bg-black text-white placeholder-quaternary-600 border-quaternary-900 focus:border-quaternary-500 transition-colors"
      placeholder="Your todo description is a great place to write down your thoughts..."
    />
    <Button
      @click="
        () => {
          // Update the todo & close modal
          updateTodo(modalData);
          modalOpened = false;
        }
      "
    >
      Save
    </Button>
  </Modal>
</template>
<script setup lang="ts">
import X from "./svg/X.vue";
import Pen from "./svg/Pencil.vue";
import Modal from "./elements/Modal.vue";
import Button from "./elements/Button.vue";
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import { computed, ref } from "vue";

// Props from parent component
// Using global type definition won't work
const props = defineProps<{
  todos: Todo[];
}>();

// Modal references
const modalOpened = ref(false);
const modalData = ref({} as Todo);

// Format by date
const dateTodos = computed(() => {
  const response: DateTodo[] = [];

  props.todos.forEach((todo: Todo) => {
    const date = new Date(todo.createdAt.seconds * 1000).toDateString();
    const index = response.findIndex((item) => item.date === date);

    if (index === -1) {
      response.push({
        date,
        todos: [todo],
      });
    } else {
      response[index].todos.push(todo);
    }
  });

  return response;
});

const emit = defineEmits(["onDeleted", "onUpdated"]);

// Emit events to parent component
const deleteTodo = (todo: Todo): void => emit("onDeleted", todo);
const updateTodo = (todo: Todo): void => emit("onUpdated", todo);

const [list] = useAutoAnimate();
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

/* Toolbar with edit & delete icons to show on todo hover, will always be showed if on mobile */
.toolbar-container:hover .toolbar {
  opacity: 1;
}
</style>
