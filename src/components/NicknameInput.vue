<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isValid = computed(() => {
  const len = props.modelValue.length
  return len >= 2 && len <= 12
})

const charCount = computed(() => props.modelValue.length)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  let val = target.value
  if (val.length > 12) {
    val = val.slice(0, 12)
  }
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex flex-col items-center gap-2 w-full max-w-xs">
    <div class="relative w-full group">
      <input
        type="text"
        :value="modelValue"
        maxlength="12"
        placeholder="输入你的昵称"
        class="w-full bg-transparent text-center text-lg font-body text-white placeholder-white/60 outline-none border-b-2 transition-colors duration-300 py-2 px-1"
        :class="[
          modelValue.length > 0
            ? isValid
              ? 'border-neon-cyan/70 focus:border-neon-cyan'
              : 'border-neon-pink/70 focus:border-neon-pink'
            : 'border-white/20 focus:border-neon-cyan/50'
        ]"
        @input="handleInput"
      />
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-neon transition-all duration-300"
        :class="modelValue.length > 0 ? 'w-full' : 'w-0 group-focus-within:w-full'"
      />
    </div>

    <div class="flex items-center gap-2 h-4">
      <Transition name="fade">
        <span
          v-if="modelValue.length > 0 && !isValid"
          class="text-xs text-neon-pink/80 font-body"
        >
          昵称需要 2-12 个字符
        </span>
      </Transition>
      <span
        v-if="modelValue.length > 0"
        class="text-xs font-body"
        :class="isValid ? 'text-neon-cyan/50' : 'text-neon-pink/50'"
      >
        {{ charCount }}/12
      </span>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
