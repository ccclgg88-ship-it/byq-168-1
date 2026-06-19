<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const TAG_POOL = [
  { text: '脑洞大师', color: 'text-neon-cyan' },
  { text: '社交牛人', color: 'text-neon-pink' },
  { text: '文艺青年', color: 'text-violet-400' },
  { text: '逻辑王者', color: 'text-amber-400' },
  { text: '佛系选手', color: 'text-emerald-400' },
  { text: '夜猫子', color: 'text-blue-400' },
  { text: '细节控', color: 'text-rose-400' },
  { text: '创意鬼才', color: 'text-cyan-300' },
  { text: '气氛组', color: 'text-orange-400' },
  { text: '暖心担当', color: 'text-pink-300' },
  { text: '行动派', color: 'text-lime-400' },
  { text: '颜控本控', color: 'text-fuchsia-400' },
  { text: '吃瓜达人', color: 'text-yellow-300' },
  { text: '养生专家', color: 'text-teal-300' },
  { text: '快乐水', color: 'text-sky-300' },
  { text: '宅家选手', color: 'text-indigo-300' },
]

const tagFloatClasses = Array.from({ length: 10 }, (_, i) => `tag-float-${i + 1}`)
const shuffledTags = ref<Array<{ text: string; color: string; floatClass: string; size: string; opacity: string }>>([])

function shuffleTags() {
  const shuffled = [...TAG_POOL].sort(() => Math.random() - 0.5)
  shuffledTags.value = shuffled.slice(0, 12).map((tag, i) => ({
    ...tag,
    floatClass: tagFloatClasses[i % tagFloatClasses.length],
    size: ['text-sm', 'text-base', 'text-lg', 'text-xl'][Math.floor(Math.random() * 4)],
    opacity: ['opacity-70', 'opacity-80', 'opacity-90', 'opacity-100'][Math.floor(Math.random() * 4)],
  }))
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      shuffleTags()
    }
  },
  { immediate: true }
)
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-deep-bg/95 backdrop-blur-sm"
    >
      <div class="relative w-full h-full max-w-2xl max-h-[500px] flex flex-wrap items-center justify-center gap-4 px-8">
        <div
          v-for="(tag, index) in shuffledTags"
          :key="index"
          class="animate-float-tag font-display select-none pointer-events-none"
          :class="[tag.floatClass, tag.color, tag.size, tag.opacity]"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          {{ tag.text }}
        </div>
      </div>

      <div class="absolute bottom-12 flex flex-col items-center gap-3">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span class="w-2 h-2 rounded-full bg-neon-pink animate-pulse" style="animation-delay: 0.3s" />
          <span class="w-2 h-2 rounded-full bg-violet-400 animate-pulse" style="animation-delay: 0.6s" />
        </div>
        <p class="text-sm text-white/50 font-body">AI 正在解析你的人格密码...</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-enter-active {
  transition: opacity 0.4s ease;
}
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
