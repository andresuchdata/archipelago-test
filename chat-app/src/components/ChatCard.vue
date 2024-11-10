<script setup lang="ts">
import { ChatMessage } from '../types/chat'
import { formatTime } from '../utils/datetime'

defineProps<{ msg: ChatMessage }>()
</script>

<template>
  <!-- Other user's message -->
  <template v-if="!msg.isSelf">
    <img :src="msg.avatar" 
          class="w-8 h-8 rounded-full mr-2" 
          alt="avatar" />
    <div class="max-w-[70%]">
      <div class="bg-white rounded-lg shadow-md p-2">
        <div class="flex font-semibold text-indigo-600 text-sm mb-1">{{ msg.sender }}</div>
        <div class="text-gray-700 text-left">{{ msg.text }}</div>
        <div class="text-xs text-gray-500 mt-1 w-full text-right">
          {{ formatTime(msg.timestamp) }}
        </div>
      </div>
    </div>
  </template>

  <!-- Current user's message -->
  <template v-else>
    <div class="max-w-[70%]">
      <div class="bg-indigo-100 rounded-lg shadow-md p-2">
        <div class="text-gray-700 text-left">{{ msg.text }}</div>
        <div class="text-xs text-gray-500 mt-1 text-right">
          {{ formatTime(msg.timestamp) }}
        </div>
      </div>
    </div>
    <img :src="msg.avatar" class="w-8 h-8 rounded-full ml-2" alt="avatar" />
  </template>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
