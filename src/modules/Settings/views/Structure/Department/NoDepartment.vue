<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
   <div class="h-full rounded-2xl bg-white p-4 flex justify-center items-center">
      <div class="flex flex-col items-center" style="max-width: 350px">
         <div class="w-[48px] h-[48px]">
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none">
               <ellipse cx="24.5" cy="24" rx="23.5102" ry="24" fill="#F7F7F9"/>
               <path d="M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z" fill="#ADB7C2"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M24 19.25C24.4142 19.25 24.75 19.5858 24.75 20V23.6893L27.0303 25.9697C27.3232 26.2626 27.3232 26.7374 27.0303 27.0303C26.7374 27.3232 26.2626 27.3232 25.9697 27.0303L23.4697 24.5303C23.329 24.3897 23.25 24.1989 23.25 24V20C23.25 19.5858 23.5858 19.25 24 19.25Z" fill="white"/>
            </svg>
         </div>
         <p class="text-center text-greyscale-300 mt-3 mb-6">{{ t('text-department') }}</p>
         <router-link to="/settings/structure/departments" class="p-button p-component p-button-sm rounded-xl text-white text-sm border-transparent focus:border-primary-500">
           {{ t('departments') }}
         </router-link>
      </div>
   </div>
</template>
<style></style>
