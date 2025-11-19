<script setup>
// Core
import { ref, onMounted } from 'vue'
// Components
import LanguageDropdown from '@/components/Toolbar/LanguageDropdown.vue'
// Reactive
const isHostVercel = ref(null)
// Hooks
onMounted(() => {
  isHostVercel.value = window.location.host === 'app.itco.uz' || window.location.host === 'new-side-project.vercel.app' || window.location.host.startsWith('localhost')
})

</script>

<template>
  <div class="auth-layout h-screen flex flex-col">
    <header class="relative border-b border-greyscale-200 px-5 py-4">
      <div class="flex items-center justify-between max-w-[545px] w-full m-auto">
        <router-link :to="{ name: 'Login' }" class="flex items-center">
          <img src="/images/infin-logo-dark.svg" class="w-[220px]" alt="Logo"/>
        </router-link>

        <language-dropdown
          :has-overlay="false"
          selectable
        />
      </div>
    </header>

    <div class="auth-layout-view flex-1 flex items-center justify-center bg-greyscale-50">
      <div class="w-[545px] bg-white shadow-button rounded-2xl p-8 mb-12">
        <!-- Auth layout -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
</style>
