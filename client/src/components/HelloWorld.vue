<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import Candlestick from './charts/candlestick.vue'
import axios from 'axios'

defineProps<{ msg: string }>()

const socket = io('http://localhost:8081')

onMounted(() => {
  socket.on("connect", () => {
    console.log(socket.id)
  })
  socket.on('test', (msg) => {
    console.log(msg)
  })
})

const count = ref(0)
const sendReq = async () => {
  const result = await axios.get("http://localhost:8081/test")
  console.log("result is : ", result.data)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="sendReq">Click</button>
  <div style="width: 50%;">
    <Candlestick />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
