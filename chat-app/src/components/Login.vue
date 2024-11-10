<script setup lang="ts">
import { onMounted, ref } from 'vue'

const currentUsername = ref('')

const props = defineProps<{ username: string }>()
defineEmits(['submit'])

onMounted(() => {
  if(props.username) {
    currentUsername.value = props.username
  }
})
</script>

<template>
  <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8">
    <div class="mx-auto">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Welcome to Simple Chat App</h1>
        <div class="max-w-md mx-auto">
          <input 
            v-model="currentUsername"
            placeholder="Enter your username" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          />
          <button
            :disabled="!currentUsername"
            :class="{ 'opacity-50 cursor-not-allowed': !currentUsername }"
            @click="$emit('submit', currentUsername)"
            class="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                    shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500"
          >
            Join Chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
