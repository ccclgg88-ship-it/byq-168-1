<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Sparkles, RotateCcw, Share2 } from 'lucide-vue-next'

const router = useRouter()

const avatarUrl = ref('')
const nickname = ref('')
const showContent = ref(false)

const PERSONALITY_TYPES = [
  {
    type: '脑洞探索者',
    color: 'from-neon-cyan to-violet-400',
    tags: ['创意无限', '好奇心强', '思维跳跃', '热爱新奇'],
    desc: '你的大脑像是一个永不熄灭的创意工厂，总有各种奇思妙想源源不断地涌现。你对世界充满好奇，喜欢探索未知领域，总能发现别人忽略的细节和乐趣。',
  },
  {
    type: '社交能量站',
    color: 'from-neon-pink to-orange-400',
    tags: ['天生社牛', '热情开朗', '感染力强', '气氛担当'],
    desc: '你是天生的社交达人，走到哪里都能迅速融入。你的热情和开朗像磁石一样吸引着周围的人，是朋友圈子里永远的气氛组组长。',
  },
  {
    type: '逻辑思考家',
    color: 'from-amber-400 to-emerald-400',
    tags: ['理性至上', '条理清晰', '追求完美', '深度思考'],
    desc: '你拥有超强的逻辑思维能力，做任何事都讲求条理和效率。面对问题时总能冷静分析，找到最优解，是朋友们信赖的智囊。',
  },
  {
    type: '佛系生活家',
    color: 'from-emerald-400 to-teal-400',
    tags: ['随遇而安', '内心平和', '享受当下', '知足常乐'],
    desc: '你拥有一颗平和的心，总能在喧嚣中找到自己的节奏。不焦虑不内卷，享受生活的小确幸，是朋友圈里最让人羡慕的松弛感天花板。',
  },
  {
    type: '暖心治愈师',
    color: 'from-pink-400 to-rose-400',
    tags: ['温柔体贴', '共情力强', '善解人意', '暖心担当'],
    desc: '你天生拥有敏锐的共情能力，总能第一时间察觉到身边人的情绪变化。你的温柔和体贴，是朋友们最坚实的情感依靠。',
  },
  {
    type: '行动派达人',
    color: 'from-orange-400 to-amber-400',
    tags: ['说干就干', '行动力强', '目标明确', '绝不拖延'],
    desc: '你是天生的行动派，想到就做，绝不拖沓。目标感极强的执行力让你总能比别人更快到达想去的地方，活成自己想要的样子。',
  },
]

const result = ref(PERSONALITY_TYPES[0])

onMounted(() => {
  let avatar = ''
  let nick = ''
  
  try {
    const savedAvatar = localStorage.getItem('quiz_avatar')
    const savedNickname = localStorage.getItem('quiz_nickname')
    if (savedAvatar) avatar = savedAvatar
    if (savedNickname) nick = savedNickname
  } catch (e) {
    console.error('读取 localStorage 失败', e)
  }
  
  if (!avatar || !nick) {
    const params = new URLSearchParams(window.location.search)
    if (!avatar && params.get('avatar')) avatar = params.get('avatar') || ''
    if (!nick && params.get('nickname')) nick = params.get('nickname') || ''
  }
  
  avatarUrl.value = avatar
  nickname.value = nick
  
  const seed = nick.length + avatar.length
  result.value = PERSONALITY_TYPES[seed % PERSONALITY_TYPES.length]
  
  setTimeout(() => {
    showContent.value = true
  }, 100)
})

function handleRestart() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-deep-bg bg-noise flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none" />

    <div class="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
      <Transition name="fade-up" appear>
        <header class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-2">
            <Sparkles :size="24" class="text-neon-cyan" />
            <h2 class="text-lg font-body text-white/70">测评结果</h2>
            <Sparkles :size="24" class="text-neon-pink" />
          </div>
        </header>
      </Transition>

      <Transition name="fade-up" appear>
        <div
          class="w-full rounded-3xl bg-surface/50 backdrop-blur-md border border-white/10 overflow-hidden"
          :class="{ 'opacity-0 translate-y-4': !showContent, 'opacity-100 translate-y-0': showContent }"
          style="transition: all 0.6s ease-out"
        >
          <div class="flex flex-col items-center gap-4 p-6 pb-8">
            <div class="relative">
              <div class="w-24 h-24 rounded-full border-3 overflow-hidden ring-4 ring-neon-cyan/30 shadow-[0_0_30px_rgba(0,245,212,0.3)]">
                <img v-if="avatarUrl" :src="avatarUrl" alt="头像" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full bg-surface-light flex items-center justify-center">
                  <span class="text-3xl">👤</span>
                </div>
              </div>
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-neon text-deep-bg text-xs font-bold font-body whitespace-nowrap">
                {{ nickname || '神秘访客' }}
              </div>
            </div>

            <div class="pt-4 flex flex-col items-center gap-2">
              <h1
                class="text-3xl md:text-4xl font-display bg-clip-text text-transparent bg-gradient-to-r"
                :class="result.color"
                style="background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
              >
                {{ result.type }}
              </h1>
              <p class="text-sm text-white/50 font-body">你的人格关键词</p>
            </div>

            <div class="flex flex-wrap justify-center gap-2 pt-2">
              <span
                v-for="(tag, i) in result.tags"
                :key="i"
                class="px-3 py-1 rounded-full text-xs font-body border"
                :class="i % 2 === 0 ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30' : 'bg-neon-pink/10 text-neon-pink border-neon-pink/30'"
              >
                {{ tag }}
              </span>
            </div>

            <div class="pt-4 w-full">
              <p class="text-sm text-white/60 font-body leading-relaxed text-center">
                {{ result.desc }}
              </p>
            </div>
          </div>

          <div class="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div class="flex items-center justify-around py-4">
            <div class="flex flex-col items-center gap-1">
              <span class="text-2xl font-display text-neon-cyan">98%</span>
              <span class="text-xs text-white/40 font-body">准确率</span>
            </div>
            <div class="w-px h-10 bg-white/10" />
            <div class="flex flex-col items-center gap-1">
              <span class="text-2xl font-display text-neon-pink">5星</span>
              <span class="text-xs text-white/40 font-body">人格稀有度</span>
            </div>
            <div class="w-px h-10 bg-white/10" />
            <div class="flex flex-col items-center gap-1">
              <span class="text-2xl font-display text-violet-400">INFP</span>
              <span class="text-xs text-white/40 font-body">人格代码</span>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="fade-up" appear>
        <div class="flex gap-4 pt-2">
          <button
            class="flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 bg-gradient-neon text-deep-bg hover:shadow-[0_0_25px_rgba(0,245,212,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            @click="handleRestart"
          >
            <RotateCcw :size="16" />
            再测一次
          </button>
          <button
            class="flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 border border-white/20 text-white/70 hover:border-neon-cyan/50 hover:text-neon-cyan cursor-pointer"
          >
            <Share2 :size="16" />
            分享结果
          </button>
        </div>
      </Transition>

      <p class="text-xs text-white/30 font-body pt-2">
        仅供娱乐，结果随机生成
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
