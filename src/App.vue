<script setup>
import { ref } from 'vue';

const rawHtml = `
  <div class="container">
    <p>Directives được tiền tố với v- để chỉ ra rằng chúng là các thuộc tính đặc biệt do Vue cung cấp</p>
  </div>
`;
const url = "https://vuejs-course.vercel.app/guide/essentials/template-syntax.html"
const btnId = 'my-button';
const btnClass = 'my-button-class';
const btnDisabled = ref(false);

const text= ref('Hello Vue 3!');

function updateText() {
  //nếu tương tác trong script thì cần value còn template thì không cần value
  if(text.value === 'Text updated!') {
    text.value = 'Hello Vue 3!';
  }else{
    text.value = 'Text updated!';
  }
  
  // btnDisabled.value = true;
}
</script>
<!-- binding :id -->
<template>
  <div v-html="rawHtml"></div>
  <a v-bind:href="url" target="_blank">learn more </a>
  <button :id="btnId" :class="btnClass" :disabled="btnDisabled" @click="updateText">Click Me</button>
  <h1>{{ text }}</h1>
</template>

<style scoped>
</style>
