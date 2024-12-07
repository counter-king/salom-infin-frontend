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
    default: () => {}
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
    <base-header-template />

    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">Bank xizmatlari markazini boshqarish uchun</div>
      <div class="text-base font-semibold text-center">ISHONCHNOMA</div>

      <div class="mt-4">
        Ushbu ishonchnoma orqali “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank” ATB) (keyingi o‘rinlarda – Bank) nomidan uning Ustavi asosida ish yurituvchi
        <span class="font-semibold">
          {{ props.curatorPosition }} {{ props.curatorFullName }}
        </span>
        O‘zbekiston Respublikasi Fuqarolik kodeksining 47-138-moddalariga amal qilgan holda Bankning
        {{ props.emp?.company?.name }}
        (keyingi o‘rinlarda – “Markaz”)
        {{ props.emp?.position?.name }}
        <span class="font-semibold">{{ props.empFullName }}</span>
        (keyingi o‘rinlarda – o‘rinbosar)ga Markazni quyidagi vakolatlar doirasida boshqarishga ishonch bildiradi:
      </div>

      <div>
        Bank nomidan belgilangan tartibda kichik va o’rta biznes mijozlariga xizmatlarni ko’rsatishda, jumladan bank hisobvarag‘i, omonat, kredit, garov (ipoteka), kafolat, kafillik shartnomalarini imzolash,  o‘zgartirish va bekor qilish (vakolatli kollegial organ qarori asosida) hamda shartnomalar ijrosini qabul qilish, notarial idora/notariuslarda Bank vakili sifatida qatnashish.
      </div>

      <div>
        Bunda Bankda garovda turgan mulklarni taqiqdan qisman yoki to‘liq chiqarish, garov mulkini boshqa mulk bilan almashtirish, garov mulki egasini o‘zgartirish <span style="font-weight: bold">taqiqlanadi</span>.
      </div>

      <base-footer :compose-model="props.composeModel" :parent-document="props.parentDocument" />

      <base-curator :curators="props.curators" />

      <base-performer
        :compose-model="props.composeModel"
        :author="props.author"
      />

    </div>
  </div>
</template>

<style scoped>

</style>
