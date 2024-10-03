<script setup>
// Core
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
// Composable
const router = useRouter()
// Reactive
const loading = ref(true)
</script>

<template>
  <div class="not-singed-show-view h-full">
    <template v-if="!loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        title="asdasdadaadadadds"
        self
        @emit:back-button="() => router.push({ name: 'AgreementNotSigned' })"
      >
        <template #content>
          asdaads
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
