<script setup>
// Components
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"
import { BaseCurator, BaseFooter } from "@/components/Templates/PowerOfAttorney/index"
import { useRoute } from "vue-router"
import { COMPOSE_DOCUMENT_SUB_TYPES } from "@/enums"

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
  <div class="acting-filial-manager-poa letter-template">
    <base-header-template/>

    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">ISHONCHNOMA</div>
      <div class="text-base font-semibold text-center">(bir martalik vakolat berish to‘g‘risida)</div>

      <div class="mt-4">
        Ushbu ishonchnoma orqali “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank”
        ATB) (keyingi o‘rinlarda – Bank) nomidan uning Ustavi asosida ish yurituvchi
        {{ props.curatorPosition }} {{ props.curatorFullName }}
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134-144-moddalariga amal qilgan holda Bankning
        {{ props.emp?.company?.name }}
        {{ props.emp?.position?.name }}
        <span class="font-semibold">{{ props.empFullName }}</span>ga <span v-html="composeModel?.content"></span>
      </div>

      <div
        v-if="route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.POA_RETURN_ENFORCEMENT_DOCUMENT"
        class="italic"
      >
        Eslatma, ushbu ishonchnoma ijro hujjatini Majburiy ijro byurosi organlaridan vaqtinchalik qaytarib olish bilan
        bog‘liq harakatlar yakunlangunga qadar boshqa shaxsga o’tkazish huquqisiz amal qiladi va qarzdor tomonidan
        to‘lov grafigini buzish hollari aniqlangan taqdirda ijro hujjati qaytadan ijroga topshirilishi shart.
      </div>

      <div
        v-else
        class="italic"
      >
        Eslatma, ushbu ishonchnoma birinchi instansiya sudida taraflar o‘rtasida mediativ kelishuv tuzish yakunlanguniga
        qadar amal qiladi.
      </div>

      <div>
        <span class="font-semibold">Asos: </span> {{ composeModel?.short_description }}
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
