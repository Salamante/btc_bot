<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

defineProps<{ msg: string }>()

const socket = io('wss://ws-feed.exchange.coinbase.com')

onMounted(() => {
  socket.on("connect", () => {
    console.log(socket.id)
  })
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

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
