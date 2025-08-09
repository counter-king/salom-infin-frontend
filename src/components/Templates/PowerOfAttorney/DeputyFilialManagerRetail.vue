<script setup>
// Components
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"
import { BaseCurator, BaseFooter } from "@/components/Templates/PowerOfAttorney/index"
import { useRoute } from "vue-router";
import { COMPOSE_DOCUMENT_SUB_TYPES } from "../../../enums";

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

const route = useRoute()
</script>

<template>
  <div class="deputy-filial-manager-poa letter-template">
    <base-header-template/>

    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center">ISHONCHNOMA</div>

      <div class="mt-4">
        Ushbu ishonchnoma orqali “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank”
        ATB) (keyingi o‘rinlarda – Bank) nomidan uning Ustavi asosida ish yurituvchi
        <span class="font-semibold">
          {{ props.curatorPosition }} {{ props.curatorFullName }}
        </span>
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134-144-moddalariga amal qilgan holda Bankning
        {{ props.emp?.company?.name }}
        {{ props.emp?.position?.name }} (chakana xizmatlar bo'yicha)
        <span class="font-semibold">{{ props.empFullName }}</span>
        (keyingi o‘rinlarda – o‘rinbosar)ga quyidagi vakolatlarga ishonch bildiradi:
      </div>

      <div>
        {{ route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_DEPUTY_MANAGER_RETAIL ? 'Ofis': 'Markaz' }} tomonidan Bank nomidan belgilangan tartibda jismoniy shaxslarga chakana xizmatlar, jumladan bank
        hisobvarag‘i, omonat, kredit, garov (ipoteka), kafolat, kafillik shartnomalarini imzolash, vakolatli kollegial
        organ qarori asosida ularga o‘zgartirish va qo‘shimchalar kiritish, bekor qilish haqidagi kelishuvlarni
        imzolash, notarial idora/notariuslarda Bank vakili sifatida qatnashish.
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
