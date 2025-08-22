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
  <div class="deputy-filial-manager-poa letter-template">
    <base-header-template/>

    <div class="text-justify indent-8 text-sm mt-4">
      <div class="text-base font-semibold text-center">2-toifali bank xizmatlari markazini boshqarish uchun</div>
      <div class="text-base font-semibold text-center">ISHONCHNOMA</div>

      <div class="mt-4">
        Ushbu ishonchnoma orqali “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank”
        ATB) (keyingi o‘rinlarda – Bank) nomidan 2024-yil 18-noyabrdagi
        04-07/250-sonli ishonchnoma asosida ish yurituvchi
        {{ props.curatorPosition }} {{ props.curatorFullName }}
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134, 135, 138, 139 va 144-moddalariga amal qilgan holda Bankning
        {{ props.emp?.company?.name }}
        (keyingi o‘rinlarda – “Markaz”)
        {{ props.emp?.position?.name }}
        <span class="font-semibold">{{ props.empFullName }}</span>
        (keyingi o‘rinlarda – rahbar)ga Markazni quyidagi vakolatlar doirasida boshqarishga ishonch bildiradi:
      </div>

      <div>
        1. Markaz tomonidan Bank nomidan Bank Ustavi, Bank litsenziyasi, Markaz Nizomida ko‘zda tutilgan operatsiyalarni
        Bank tomonidan Markaz uchun o‘rnatilgan limit va vakolatlar doirasida o‘rnatilgan tartibda amalga oshirish hamda
        uni amalga oshirish bilan bog‘liq bo‘lgan hujjatlarni imzolash, xususan jismoniy shaxslarga chakana xizmatlar va
        kichik va o’rta biznes mijozlariga xizmatlar ko’rsatish, jumladan bank hisobvarag‘i, omonat, kredit, garov
        (ipoteka), kafolat, kafillik, sug‘urta shartnomalarini imzolash, vakolatli kollegial organ qaroriga asosan
        ularga o‘zgartirish va qo‘shimchalar kiritish, bekor haqidagi kelishuvlarni imzolash;
      </div>

      <div>
        2. Bank nomidan Markaz faoliyatiga taalluqli shartnomalar ijrosini qabul qilish, notarial idora/notariuslarda
        Bank vakili sifatida qatnashish.
      </div>

      <div>
        Bunda Bankda garovda turgan mulklarni taqiqdan chiqarish, garov mulkini boshqa mulk bilan
        almashtirish, garov mulki egasini o‘zgartirish <span style="font-weight: bold">taqiqlanadi.</span>.
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
