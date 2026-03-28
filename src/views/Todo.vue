<template lang="html">
  <div>
    <input type="text" v-model="newTodo" placeholder="Add a new todo" />
    <button @click="addTodo">Add</button>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
        <button @click="removeTodo(index)">Remove</button>
      </li>
    </ul>
    <!-- đối số .stop .prevent -->
    <form @submit.prevent="handleSubmit">
      <input v-model="name" />
      <input type="submit">
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const newTodo = ref('');

const name = ref('');
console.log(newTodo.value);
const todos = ref([]);
function addTodo() {
  if (newTodo.value.trim() !== '') {
    todos.value.push(newTodo.value.trim());
    newTodo.value = '';
  }
}
function removeTodo(index) {
  todos.value.splice(index, 1);
}
function handleSubmit() {
  alert(`Submitted name: ${name.value}`);
}
</script>
