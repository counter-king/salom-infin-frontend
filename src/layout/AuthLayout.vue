<script setup>
// Components
import LanguageDropdown from '@/components/Toolbar/LanguageDropdown.vue'
</script>

<template>
  <div class="auth-layout h-screen flex flex-col">
    <header class="relative border-b border-greyscale-200 px-5 py-4">
      <div class="flex items-center justify-between max-w-[545px] w-full m-auto">
        <router-link :to="{ name: 'Login' }" class="flex items-center">
          <img src="/images/logo.svg" alt="Logo" />
          <img src="/images/logo-text-dark.svg" alt="Logo text" class="ml-2" />
        </router-link>

        <language-dropdown
          :has-overlay="false"
          selectable
        />
      </div>
    </header>

    <div class="auth-layout-view flex-1 flex items-center justify-center bg-greyscale-50">
      <div class="w-[545px] bg-white rounded-2xl p-8 mb-12">
        <!-- Auth layout -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
</style>
