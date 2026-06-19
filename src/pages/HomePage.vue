<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AvatarUpload from '@/components/AvatarUpload.vue'
import NicknameInput from '@/components/NicknameInput.vue'
import TagCloudLoading from '@/components/TagCloudLoading.vue'
import ToastMessage from '@/components/ToastMessage.vue'
import { Sparkles } from 'lucide-vue-next'

const router = useRouter()

const avatarUrl = ref('')
const nickname = ref('')
const isLoading = ref(false)
const fileSizeOverLimit = ref(false)
const toastMessage = ref('')
const toastVisible = ref(false)

const isNicknameValid = computed(() => {
  const len = nickname.value.length
  return len >= 2 && len <= 12
})

const canStart = computed(() => {
  return avatarUrl.value && isNicknameValid.value
})

function showToast(msg: string) {
  toastMessage.value = msg
  toastVisible.value = true
}

function handleAvatarError(msg: string) {
  showToast(msg)
}

function handleStart() {
  if (!canStart.value) return
  isLoading.value = true
  
  try {
    localStorage.setItem('quiz_avatar', avatarUrl.value)
    localStorage.setItem('quiz_nickname', nickname.value)
  } catch (e) {
    console.error('存储数据失败', e)
  }
  
  setTimeout(() => {
    router.push({
      path: '/result',
    })
  }, 3000)
}
</script>

<template>
  <div class="min-h-screen bg-deep-bg bg-noise flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none" />

    <div class="relative z-10 flex flex-col items-center gap-8 w-full max-w-md">
      <header class="flex flex-col items-center gap-3 animate-fade-in-up">
        <div class="flex items-center gap-2">
          <Sparkles :size="28" class="text-neon-cyan" />
          <h1 class="text-3xl md:text-4xl font-display text-gradient-neon">
            AI 人格测评
          </h1>
          <Sparkles :size="28" class="text-neon-pink" />
        </div>
        <p class="text-sm text-white/85 font-body">
          拖一张头像 · 敲一个昵称 · 开始测评
        </p>
      </header>

      <div
        class="flex flex-col items-center gap-7 w-full animate-fade-in-up"
        style="animation-delay: 0.15s"
      >
        <AvatarUpload
          v-model="avatarUrl"
          v-model:file-size-over-limit="fileSizeOverLimit"
          @error="handleAvatarError"
        />

        <NicknameInput v-model="nickname" />
      </div>

      <div
        class="animate-fade-in-up"
        style="animation-delay: 0.3s"
      >
        <button
          :disabled="!canStart"
          class="relative px-10 py-3 rounded-full font-body text-base font-medium transition-all duration-300"
          :class="[
            canStart
              ? 'bg-gradient-neon text-deep-bg hover:shadow-[0_0_30px_rgba(0,245,212,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
              : 'bg-surface-light/50 text-white/50 cursor-not-allowed'
          ]"
          @click="handleStart"
        >
          <span v-if="canStart" class="relative z-10">开始测评</span>
          <span v-else>开始测评</span>
        </button>
      </div>

      <p
        class="text-xs text-white/60 font-body animate-fade-in-up"
        style="animation-delay: 0.45s"
      >
        零门槛 · 即刻开始
      </p>
    </div>

    <TagCloudLoading :visible="isLoading" />

    <ToastMessage
      :message="toastMessage"
      :visible="toastVisible"
      @update:visible="toastVisible = $event"
    />
  </div>
</template>
