<template>
  <TodoForm @on-added="addTodo" class="selection:bg-tertiary-500 selection:text-white">
    <TodoList :todos="(todos as Todo[])" @on-deleted="deleteTodo" @on-updated="updateTodo" />
  </TodoForm>
</template>
<script setup lang="ts">
import { getCurrentUser, useCollection, useFirestore } from 'vuefire';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';

const db = useFirestore();
const user = await getCurrentUser();
const todos = useCollection(collection(db, `/users/${user?.uid}/todos`));

/**
 * Add a todo object in array and save it, empty string handling is in child's emit
 * @param {string} todo - Title of todo object
*/
const addTodo = async (todo: string) => {
  await addDoc(collection(db, `/users/${user?.uid}/todos`), {
    title: todo,
    description: "",
    finished: false,
    createdAt: new Date(),
  });
};

/**
 * Update/modify todo information
 * @param {Todo} todo - Todo to update
 */
const updateTodo = async (todo: Todo) => {
  const todoRef = doc(db, `/users/${user?.uid}/todos`, todo.id);
  setDoc(todoRef, todo, { merge: true });
};

/**
 * Delete todo object from array and save it
 * @param {Todo} todo - Todo to delete
 */
const deleteTodo = async (todo: Todo) => {
  await deleteDoc(doc(db, `/users/${user?.uid}/todos`, todo.id));
};
</script>