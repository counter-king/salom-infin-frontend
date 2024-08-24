<script setup>
// Components
import { ResolutionDownload } from '@/components/Resolution'
//Utils
import { formatNameToShort } from '@/utils'
import { formatDateHour } from '@/utils/formatDate'
// Macros
const props = defineProps({
  resolution: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="resolution-deputy-chairman-view">
    <h1 class="text-center text-sm font-semibold uppercase text-primary-dark">
      <span class="block">"O'ZBEKISTON SANOAT-QURILISH BANKI" ATB</span>
      <span class="block">{{ props.resolution?.reviewer?.position?.name }}</span>
    </h1>

    <div class="max-w-[400px] w-full h-1 bg-primary-dark mx-auto mt-3 mb-5"></div>

    <resolution-download :signed="props.resolution.signed" />

    <template v-if="props.resolution.assignees && props.resolution.assignees?.length">
      <div class="text-sm font-semibold text-primary-900 mt-10">
        <ul class="mt-3">
          <template v-for="item in resolution.assignees">
            <li class="flex gap-1 font-semibold mb-2">
              <span>{{ formatNameToShort(item.user?.full_name) }}</span>

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

        <div class="text-center my-14">
          <p v-html="props.resolution.content"></p>
        </div>
      </div>
    </template>

    <div class="flex items-center justify-between text-black font-semibold">
      <span>
        {{ props.resolution.receipt_date ? formatDateHour(props.resolution.receipt_date) : 'Еще не подписан' }}
      </span>

      <div class="w-[50px] h-[50px]">
        <template v-if="props.resolution.signed">
          <img src="/images/qr-code.svg" alt="Qr code" />
        </template>
      </div>

      <span>{{ formatNameToShort(props.resolution?.reviewer?.full_name) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
