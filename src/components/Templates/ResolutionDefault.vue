<script setup>
// Components
import { ResolutionDownload } from '@/components/Resolution'
//Utils
import { formatNameToShort } from '@/utils'
import { formatDate, formatDateHour } from '@/utils/formatDate'
// Macros
const props = defineProps({
  resolution: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="flex mb-4">
    <div class="flex items-center flex-1">
      <img src="/images/logo.svg" alt="Logo" />
      <img src="/images/logo-text.svg" alt="Logo text" class="invert ml-2" />
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
                Контролирующий
              </template>

              <template v-else>
                <template v-if="item.is_responsible">
                  Исполнитель
                </template>

                <template v-else>
                  Соисполнитель
                </template>
              </template>
            </p>
          </li>
        </template>

        <li class="flex font-semibold">
          <p class="text-greyscale-500 mr-1">Срок исполнения:</p>
          <span>{{ props.resolution.deadline ? props.resolution.deadline : 'Без срока исполнений' }}</span>
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
      <p class="text-primary-900 mr-1">Рег. номер:</p>
      <span>{{ props.resolution.register_number }}</span>
    </li>
    <li class="flex font-semibold mb-1">
      <p class="text-primary-900 mr-1">Рег. дата:</p>
      <span>{{ formatDate(props.resolution.register_date) }}</span>
    </li>
    <li class="flex font-semibold">
      <p class="text-primary-900 mr-1">Дата. подписания:</p>
      <span>{{ props.resolution.receipt_date ? formatDateHour(props.resolution.receipt_date) : 'Еще не подписан' }}</span>
    </li>
  </ul>
</template>

<style scoped>

</style>
