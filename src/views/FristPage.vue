<template lang="html">
      <div v-html="rawHtml"></div>
  <a v-bind:href="url" target="_blank">learn more </a>
  <button :id="btnId" :class="btnClass" :disabled="btnDisabled" @click="updateText">Click Me</button>
  <h1 id="title_1">{{ text }}</h1>
    
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';

const rawHtml = `
  <div class="container">
    <p>Directives được tiền tố với v- để chỉ ra rằng chúng là các thuộc tính đặc biệt do Vue cung cấp</p>
    <p>
    "v-on:click="doSomething" có thể được rút gọn thành @click="doSomething"
    </p>
`;
const url = "https://vuejs-course.vercel.app/guide/essentials/template-syntax.html"
const btnId = 'my-button';
const btnClass = 'my-button-class';
const btnDisabled = ref(false);

const text= ref('Hello Vue 3!');

async function updateText() {
  text.value = text.value === 'Text updated!' ? 'Hello Vue 3!' : 'Text updated!'
  console.log(document.getElementById('title_1').innerText);// chua update

  // nextTick(() => {
  //   console.log(document.getElementById('title_1').innerText);// da update
  // });
  // hoặc
  await nextTick();
  console.log(document.getElementById('title_1').innerText);// da update
}

</script>
<style lang="">
  
</style>