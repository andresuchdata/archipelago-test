<script setup lang="ts">
import '@fortawesome/fontawesome-free/css/all.css'
import { ref, onMounted, nextTick } from 'vue'
import { io } from 'socket.io-client'

import chatBg from './assets/chat-bg.jpg'
import { ChatMessage } from './types/chat'

import ChatCard from './components/ChatCard.vue'
import Login from './components/Login.vue'

const AVATAR_URL = import.meta.env.VITE_AVATAR_URL
const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST

// change the host to env variable
const socket = io(SOCKET_HOST)
const messages = ref<ChatMessage[]>([])
const newMessage = ref('')
const username = ref('')
const isUsernameSet = ref(false)
const channelName = ref("general")
const messageContainer = ref<HTMLElement | null>(null)

function setUsername(newName: string) {
  if (newName.trim()) {
    username.value = newName
    isUsernameSet.value = true
  }
}

function scrollToBottom() {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

function sendMessage() {
  if (newMessage.value.trim()) {
    const message: ChatMessage = {
      text: newMessage.value,
      sender: username.value || 'Anonymous',
      timestamp: new Date().toISOString(),
      avatar: `${AVATAR_URL}?seed=${username.value}`,
      isSelf: true
    } 
    
    socket.emit('chat-message', message)
    messages.value.push(message)
    newMessage.value = ''

    // To show latest message at the bottom
    nextTick(() => scrollToBottom())
  }
}

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to server:', socket.id)
  })

  socket.on('chat-message', (message) => {
    if (message.sender !== username.value) {
      message.avatar = `${AVATAR_URL}?seed=${message.sender}`
      message.isSelf = false
      messages.value.push(message)

      // To show latest message at the bottom
      nextTick(() => scrollToBottom())
    }

  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })
})
</script>

<template>
  <div class="min-h-screen bg-repeat flex sm:py-3 w-full">
    <div class="relative mx-auto w-full lg:w-[60%]">
      <!-- Username Input Page -->
      <template v-if="!isUsernameSet">
        <Login :username="username" @submit="setUsername"></Login>
      </template>

      <!-- Main Chat Page -->
      <div v-else class="relative bg-white/90 backdrop-blur-sm shadow-lg sm:rounded-2xl">
        <!-- Header -->
        <div class="divide divide-gray-600 bg-white p-3">
            <h1 class="text-2xl font-bold text-gray-900 text-left">#{{ channelName }}</h1>
        </div>

        <!-- Messages -->
        <div class="h-96 overflow-y-auto px-3 rounded-lg flex flex-col" 
              :style="{ backgroundImage: `url(${chatBg})`, backgroundRepeat: 'repeat' }"
              ref="messageContainer">
          <div class="flex-1"></div>
          <div class="py-4">
            <div v-for="(msg, index) in messages" 
                  :key="index" 
                  class="mb-4 flex"
                  :class="msg.isSelf ? 'justify-end' : 'justify-start'">
              <ChatCard :msg="msg"></ChatCard>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="flex space-x-3 bg-white p-3 rounded-lg shadow-md">
          <input
            v-model="newMessage" 
            @keyup.enter="sendMessage" 
            placeholder="Type a message..." 
            class="flex-1 px-3 py-2 border text-black bg-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button 
            @click="sendMessage"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                    shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>