<script setup lang="ts">
import { ref, computed } from 'vue'
import { Upload, ImagePlus } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
  fileSizeOverLimit: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:fileSizeOverLimit': [value: boolean]
  'error': [message: string]
}>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 2 * 1024 * 1024

const avatarUrl = computed(() => props.modelValue)

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

function handleClick() {
  fileInput.value?.click()
}

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) processFile(file)
  target.value = ''
}

function processFile(file: File) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    emit('error', '请上传图片格式文件（PNG、JPG、GIF、WebP、SVG）')
    return
  }

  if (file.size > MAX_SIZE) {
    emit('update:fileSizeOverLimit', true)
  } else {
    emit('update:fileSizeOverLimit', false)
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    emit('update:modelValue', result)
  }
  reader.onerror = () => {
    emit('error', '图片读取失败，请重试')
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div
      class="relative w-32 h-32 rounded-full cursor-pointer transition-all duration-300 group"
      :class="[
        isDragging
          ? 'border-glow-cyan border-2 border-neon-cyan scale-105'
          : avatarUrl
            ? 'border-2 border-neon-cyan/40 hover:border-neon-cyan/70'
            : 'border-2 border-dashed border-surface-light hover:border-neon-cyan/50'
      ]"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="handleClick"
    >
      <div
        v-if="avatarUrl"
        class="w-full h-full rounded-full overflow-hidden"
      >
        <img
          :src="avatarUrl"
          alt="头像预览"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-deep-bg/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ImagePlus :size="28" class="text-neon-cyan" />
        </div>
      </div>

      <div
        v-else
        class="w-full h-full rounded-full flex flex-col items-center justify-center gap-2 bg-surface/60"
      >
        <Upload :size="28" class="text-neon-cyan/60 group-hover:text-neon-cyan transition-colors" />
        <span class="text-xs text-white/80 group-hover:text-neon-cyan transition-colors font-body">
          拖拽或点击
        </span>
      </div>

      <input
        ref="fileInput"
        type="file"
        :accept="ACCEPTED_TYPES.join(',')"
        class="hidden"
        @change="handleFileChange"
      />
    </div>

    <Transition name="fade">
      <p
        v-if="fileSizeOverLimit"
        class="text-xs text-amber-400 font-body animate-fade-in-up"
      >
        图片超过 2MB，建议压缩后上传
      </p>
      <p v-else-if="!avatarUrl" class="text-xs text-white/70 font-body">
        支持 PNG / JPG / GIF / WebP
      </p>
    </Transition>
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
