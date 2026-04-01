<template lang="">
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
<script setup>
import { computed,  ref } from 'vue';




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
<style lang="">
  
</style>