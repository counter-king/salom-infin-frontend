<script setup>
// Components
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"
import { BaseCurator, BaseFooter } from "@/components/Templates/PowerOfAttorney/index"
import { formatDate } from "@vueuse/shared";
import { calculateYearsAndMonths } from "../../../utils";

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
  <div class="eimzo-poa letter-template">
    <base-header-template/>

    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">Elektron raqamli imzo olish uchun</div>
      <div class="text-base font-semibold text-center">ISHONCHNOMA</div>

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
        <span class="font-semibold">{{ props.empFullName }}</span>ga
        Ofis tomonidan Bank nomidan Bank Ustavi, Bankka berilgan litsenziyada ko‘zda tutilgan operatsiyalarni Bank
        tomonidan o‘rnatilgan limit va vakolatlar doirasida amalga oshirish hamda uni amalga oshirish bilan bog‘liq
        bo‘lgan hujjatlarni imzolash, shuningdek elektron hujjatlarni imzolash va ushbu hujjatlarni imzolash uchun
        davlat xizmatlari markazidan yuridik shaxs uchun beriladigan elektron raqamli imzo olishga ishonch bildiradi.
      </div>

      <div class="italic indent-8">
        <span v-if="parentDocument && parentDocument.register_date && parentDocument.register_number">Ushbu ishonchnomaning berilishi munosabati bilan {{
            formatDate(parentDocument.register_date) }}-yilda berilgan {{ parentDocument.register_number }}-sonli ishonchnoma o‘z kuchini yo‘qotadi.</span>
        Mazkur ishonchnomaning amal qilish muddati u orqali berilgan vakolatlarni boshqa shaxsga o‘tkazish huquqisiz
        {{ calculateYearsAndMonths(composeModel.start_date, composeModel.end_date) }}ni tashkil etadi.
      </div>

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
