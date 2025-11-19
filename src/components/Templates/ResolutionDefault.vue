<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
// Components
import { ResolutionDownload } from '@/components/Resolution'
// Utils
import { formatNameToShort } from '@/utils'
import { formatDate, formatDateHour } from '@/utils/formatDate'
// Macros
const props = defineProps({
  resolution: {
    type: Object,
    default: () => {}
  }
})
// Reactive
const isHostVercel = ref(null)
// Hooks
onMounted(() => {
  isHostVercel.value = window.location.host === 'app.itco.uz' || window.location.host === 'new-side-project.vercel.app' || window.location.host.startsWith('localhost')
})
</script>

<template>
  <div class="flex mb-4">
    <div class="flex items-center flex-1">
      <img src="/images/infin-logo-dark.svg" class="max-w-[114px]" alt="Logo"/>
    </div>
  </div>

  <div class="border-t-[1px]"></div>

  <resolution-download :signed="props.resolution.signed" />

  <template v-if="props.resolution.assignees && props.resolution.assignees?.length">
    <div class="text-sm font-semibold text-primary-900 mt-6 mb-5">
      <ul class="mt-3">
        <template v-for="item in resolution.assignees">
          <li class="flex gap-1 font-semibold mb-2">
            <span>{{ formatNameToShort(item.user.full_name) }}</span>

            <span class="text-greyscale-500">-</span>

            <p class="text-greyscale-500 mr-1">
              <template v-if="item.is_controller">
                {{ t('controller') }}
              </template>

              <template v-else>
                <template v-if="item.is_responsible">
                  {{ t('executor') }}
                </template>

                <template v-else>
                  {{ t('co-executor') }}
                </template>
              </template>
            </p>
          </li>
        </template>

        <li v-if="props.resolution.deadline" class="flex font-semibold">
          <p class="text-greyscale-500 mr-1">{{ t('deadline') }}:</p>
          <span>{{ props.resolution.deadline }}</span>
        </li>
      </ul>

      <div class="text-center mt-5">
        <p v-html="props.resolution.content"></p>
      </div>
    </div>

    <div class="border-t-[1px]"></div>

    <div class="flex items-center my-4">
      <div class="flex-1 text-sm font-semibold">
        <h1 class="text-greyscale-500">{{ props.resolution.reviewer?.position?.name }}:</h1>
        <p class="text-primary-900">{{ formatNameToShort(props.resolution.reviewer?.full_name) }}</p>
      </div>

      <template v-if="props.resolution.signed">
        <div class="w-[50px] h-[50px]">
          <img src="/images/qr-code.svg" alt="Qr code" />
        </div>
      </template>
    </div>

    <div class="border-t-[1px]"></div>
  </template>

  <ul class="text-greyscale-500 text-sm mt-3">
    <li class="flex font-semibold mb-1">
      <p class="text-primary-900 mr-1">{{ t('reg-number') }}:</p>
      <span>{{ props.resolution.register_number }}</span>
    </li>
    <li class="flex font-semibold mb-1">
      <p class="text-primary-900 mr-1">{{ t('reg-date') }}:</p>
      <span>{{ formatDate(props.resolution.register_date) }}</span>
    </li>
    <li class="flex font-semibold">
      <p class="text-primary-900 mr-1">{{ t('sign-date') }}:</p>
      <span>{{ props.resolution.receipt_date ? formatDateHour(props.resolution.receipt_date) : 'Еще не подписан' }}</span>
    </li>
  </ul>
</template>

<style scoped>

</style>
