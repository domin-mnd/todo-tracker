<template>
  <TodoForm @on-added="addTodo" class="selection:bg-tertiary-500">
    <TodoList :todos="todos" @on-deleted="deleteTodo" @on-updated="updateTodo" />
  </TodoForm>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
const TodoForm = defineAsyncComponent(() => import('./TodoForm.vue'));
const TodoList = defineAsyncComponent(() => import('./TodoList.vue'));

/** Todo object interface, is in localStorage */
interface Todo {
  /** Id of todo object */
  id: number;
  /** Text of todo object */
  text: string;
  /** Finished state of todo object */
  finished: boolean;
}

const todos = ref<Todo[]>(JSON.parse(localStorage.getItem("todo") || "[]"));

/** Add a todo object in array and save it, empty string handling is in child's emit
 * @param {string} todo - text of todo object
*/
const addTodo = (todo: string) => {
  todos.value = [...todos.value, {
    id: todos.value.length + 1,
    text: todo,
    finished: false,
  }];
  localStorage.setItem("todo", JSON.stringify(todos.value));
};

/** Update finished state
 * @param {number} id - id of todo object
 */
const updateTodo = (id: number) => {
  todos.value = todos.value.map((item) => {
    if (item.id === id) {
      item.finished = !item.finished;
    }
    return item;
  });
  localStorage.setItem("todo", JSON.stringify(todos.value));
};

/**
 * Delete todo object from array and save it
 * @param {number} id - id of todo object
 */
const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  localStorage.setItem("todo", JSON.stringify(todos.value));
};
</script>