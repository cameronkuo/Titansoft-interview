<script setup lang="ts">
import { ElAlert, ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import IconSprite from '@/components/IconSprite.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(false)
const errorMessage = ref('')

const formRef = ref<HTMLFormElement | null>(null)
const inputRefs = ref<HTMLInputElement[]>([])

const onInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  if (value.length > 1) {
    target.value = value[0]
  }
  if (value) {
    if (index < inputRefs.value.length) {
      inputRefs.value[index].focus()
    } else if (inputRefs.value.every(input => input.value)) {
      formRef.value?.requestSubmit()
    }
  } else {
    if (index > 1) {
      inputRefs.value[index - 2].focus()
    }
  }
}

const onKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    if (index > 1) {
      inputRefs.value[index - 2].focus()
    }
  } else if (event.key === 'ArrowRight') {
    if (index < inputRefs.value.length) {
      inputRefs.value[index].focus()
    }
  }
}

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const clipboardData = event.clipboardData
  const pastedData = clipboardData?.getData('text') ?? ''
  for (let i = 0; i < inputRefs.value.length; i++) {
    inputRefs.value[i].value = pastedData[i]
  }
  if (inputRefs.value.every(input => input.value)) {
    formRef.value?.requestSubmit()
  }
}

const submit = (e: Event) => {
  const data = new FormData(e.target as HTMLFormElement)
  const code = data.getAll('code').join('')
  loading.value = true
  authStore
    .login(code)
    .then(() => {
      errorMessage.value = ''
      ElMessage.success('Logged in successfully, redirecting...')
      setTimeout(() => {
        const redirect = route.query.redirect as string | undefined
        router.replace(redirect ?? { name: 'HomeView' })
      }, 3000)
    })
    .catch(error => {
      errorMessage.value = error.response?.data.message ?? 'Something went wrong'
    })
    .finally(() => (loading.value = false))
}

onMounted(() => {
  inputRefs.value[0].focus()
})
</script>

<template>
  <div class="mx-auto mt-[20vh] flex max-w-screen-sm flex-col items-center justify-center gap-5">
    <h1 class="text-center">Verify</h1>
    <p class="text-center">Enter the 4-digit code sent to you</p>
    <ElAlert v-if="errorMessage" :title="errorMessage" type="error" show-icon class="border border-red-500" />
    <form ref="formRef" @submit.prevent="submit">
      <div class="flex justify-center gap-2">
        <input
          v-for="i in 4"
          :key="i"
          ref="inputRefs"
          type="text"
          name="code"
          maxlength="1"
          required
          class="h-12 w-12 rounded border text-center"
          @input="onInput(i, $event)"
          @keydown="onKeyDown(i, $event)"
          @paste="onPaste"
        />
      </div>
      <button type="submit" class="mt-5 flex w-full items-center justify-center rounded border-none bg-blue-500 p-2 text-white">
        <template v-if="loading">
          <IconSprite id="loading" class="-ml-1 mr-3 h-5 w-5 animate-spin text-white" />
          <span>Loading...</span>
        </template>
        <span v-else>Submit</span>
      </button>
    </form>
  </div>
</template>
