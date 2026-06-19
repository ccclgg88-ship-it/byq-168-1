<script setup lang="ts">
import { ref, watch } from 'vue'
import { AlertCircle } from 'lucide-vue-next'

const props = defineProps<{
  message: string
  visible: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const show = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.visible,
  (val) => {
    if (val) {
      show.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        show.value = false
        emit('update:visible', false)
      }, 3000)
    }
  }
)
</script>

<template>
  <Transition name="toast">
    <div
      v-if="show"
      class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/90 backdrop-blur-md shadow-lg shadow-red-500/20"
    >
      <AlertCircle :size="18" class="text-white/90 shrink-0" />
      <span class="text-sm text-white font-body">{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.4s ease;
}
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
