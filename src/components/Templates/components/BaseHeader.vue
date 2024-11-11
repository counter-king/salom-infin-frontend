<script setup>
import { computed } from "vue"
import { hostName } from "@/utils"

const bankNameUz = computed(() => {
  switch (hostName()) {
    case 'vercel':
      return 'CHET EL KAPITALI ISHTROKIDAGI AKSIYADORLIK ТIJORAТ BANKI'
    case 'localhost':
      return 'BU YERDA BANKNING NOMI BO\'LADI'
    default:
      return '"O\'ZBEKISTON SANOAT-QURILISH BANKI" AKSIYADORLIK TIJORAT BANKI'
  }
})

const bankNameRu = computed(() => {
  switch (hostName()) {
    case 'vercel':
      return 'АКЦИОНЕРНО-КОММЕРЧЕСКИЙ БАНК С УЧАСТИЕМ ИНОСТРАННОГО КАПИТАЛА'
    case 'localhost':
        return 'ТАМ БУДЕТ НАЗВАНИЕ БАНКА'
    default:
      return 'АКЦИОНЕРНЫЙ КОММЕРЧЕСКИЙ БАНК "УЗБЕКСКИЙ ПРОМЫШЛЕННО-СТРОИТЕЛЬНЫЙ БАНК"'
  }
})

</script>

<template>
  <div class="mb-[10px]">
    <div class="flex">
      <img v-if="hostName() === 'localhost'" src="@/assets/img/workzone_logo.png" alt="Logo" class="w-[114px] h-full" />
      <img v-else-if="hostName() === 'vercel'" src="/images/hamkorbank_logo_for_letter.svg" alt="Logo" class="w-[160px] h-full" />
      <img v-else src="@/assets/img/sqb_logo.png" alt="Logo" class="w-[114px] h-full" />
      <div class="ml-2">
        <div class="text-[8px] font-bold">{{ bankNameUz }}</div>
        <div class="text-[8px] font-bold mt-[2px]">{{ bankNameRu }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
