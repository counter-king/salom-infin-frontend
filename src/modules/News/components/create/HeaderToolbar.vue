<script setup>
// Core
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import BackButton from '@/components/Actions/BackButton.vue'
// stores
import { useNewsStore } from '../../stores'

const router = useRouter()
const route = useRoute()
const newsStore = useNewsStore()

const { t } = useI18n()

</script>
<template>
    <div class="flex gap-3 items-center">
      <back-button 
        :self="true" 
        @click="newsStore.restStore(); router.push({name:'NewsIndex'})"
      />
      <h2 class="text-xl font-semibold text-greyscale-900">{{t(!!route.params.id ? 'edit-news' : 'createNews') }}</h2>
    </div>
</template>
