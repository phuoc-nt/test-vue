<script setup>
import { computed, nextTick, ref } from 'vue';

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

// phần 2 computed
const btcAmount = ref(0.0050198)
const btcPrice = ref(65000) // USD
const usdToVnd = ref(27000)

// computed: tổng tiền
const totalUSD = computed(() => {
  return btcAmount.value * btcPrice.value
})

const totalVND = computed(() => {
  return totalUSD.value * usdToVnd.value
})

const formattedVND = computed(() => {
  return totalVND.value.toLocaleString('vi-VN') + ' ₫'
})

// computed: format
const formattedTotal = computed(() => {
  return totalUSD.value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
})

// phần 3 Writable computed

const firstName = ref('Phuoc')
const lastName = ref('Nguyen')

// const fullName = computed(()=> {
//   return `${firstName.value} ${lastName.value}`
// })//[Vue warn] Write operation failed: computed value is readonly

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})

const updateFullName = () => {
  fullName.value = 'John Doe'
  console.log("first name:", firstName.value);
  console.log("last name:", lastName.value);
}


</script>
<!-- binding :id -->
<template>
  <div v-html="rawHtml"></div>
  <a v-bind:href="url" target="_blank">learn more </a>
  <button :id="btnId" :class="btnClass" :disabled="btnDisabled" @click="updateText">Click Me</button>
  <h1 id="title_1">{{ text }}</h1>
  <!-- phần 2 computed -->
  <div>
    <h2>BTC Calculator</h2>

    <div>
      <label>BTC:</label>
      <input type="number" v-model="btcAmount" />
    </div>

    <div>
      <label>Price (USD):</label>
      <input type="number" v-model="btcPrice" />
    </div>

        <div>
      <label>USD to VND:</label>
      <input type="number" v-model="usdToVnd" />
    </div>

    <hr />
    <p>Total: {{ totalUSD }}</p>
    <p>Formatted: {{ formattedTotal }}</p>
    <p>Total (VND): {{ formattedVND }}</p>
  </div>
  <!-- phần 3 Writable computed -->
  <div>
    <label>Full Name:</label>
    <input type="text" v-model="fullName" />
  </div>
  <button @click="updateFullName">Update Full Name</button>

</template>

<style scoped>
</style>
