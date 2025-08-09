<script setup>
// Components
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"
import { BaseCurator, BaseFooter } from "@/components/Templates/PowerOfAttorney/index"

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {
    },
    required: true
  },
  preview: {
    type: Boolean,
    default: false
  },
  curators: {
    type: [Object, Array],
    default: () => []
  },
  curatorPosition: {
    type: String,
    default: ''
  },
  curatorFullName: {
    type: String,
    default: ''
  },
  empPositionFull: {
    type: String,
    default: ''
  },
  empFullName: {
    type: String,
    default: ''
  },
  empPassportDetails: {
    type: String,
    default: ''
  },
  author: {
    type: Object,
    default: () => {
    }
  },
  parentDocument: {
    type: Object,
    default: null
  },
  emp: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="bso-client-manager-poa letter-template">
    <base-header-template/>

    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">ISHONCHNOMA</div>

      <div class="mt-4">
        Ushbu ishonchnoma orqali “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank”
        ATB) (keyingi o‘rinlarda – Bank) nomidan uning Ustavi asosida ish yurituvchi
        <span class="font-semibold">
          {{ props.curatorPosition }} {{ props.curatorFullName }}
        </span>
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134-144-moddalariga amal qilgan holda Bankning
        {{ props.emp?.company?.name }}
        (keyingi o‘rinlarda – Ofis)
        {{ props.emp?.position?.name }}
        <span class="font-semibold">{{ props.empFullName }}</span>
        (keyingi o‘rinlarda – menejer)ga quyidagi vakolatlarga ishonch bildiradi:
      </div>

      <div>
        Ofis tomonidan Bank nomidan jismoniy shaxslarga kreditlash xizmatlarini ko‘rsatish bilan bog‘liq bo‘lgan
        mikroqarz, ta’lim, iste’mol, overdraft (offlayn), avtokredit, kafillik, sug‘urta, ipoteka krediti shartnomalari
        hamda garov/ipoteka (notarial rasmiylashtirish talab qilinmaydigan) shartnomalarni imzolash vakolatini beradi.
      </div>

      <div>
        Bunda yuqorida qayd etilgan shartnomalardan tashqari boshqa turdagi shartnomalar (bitimlar) hamda Bankda garovda
        turgan mulklarni taqiqdan chiqarish, garov mulkini boshqa mulk bilan almashtirish, garov mulki egasini
        o‘zgartirish <span class="font-semibold">taqiqlanadi</span>.
      </div>

      <base-footer :compose-model="props.composeModel" :parent-document="props.parentDocument"/>

      <base-curator :curators="props.curators"/>

      <base-performer
        :compose-model="props.composeModel"
        :author="props.author"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
