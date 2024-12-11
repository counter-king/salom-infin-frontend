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
  <div class="acting-filial-manager-poa letter-template">
    <base-header-template />

    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">Bank xizmatlari markazini boshqarish uchun</div>
      <div class="text-base font-semibold text-center">ISHONCHNOMA</div>

      <div class="mt-4">
        Ushbu ishonchnoma orqali “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank” ATB) (keyingi o‘rinlarda – Bank) nomidan uning Ustavi asosida ish yurituvchi
        <span class="font-semibold">
          {{ props.curatorPosition }} {{ props.curatorFullName }}
        </span>
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134-144-moddalariga amal qilgan holda Bankning
        {{ props.emp?.company?.name }}
        (keyingi o‘rinlarda – “Markaz”)
        {{ props.emp?.position?.name }}
        <span class="font-semibold">{{ props.empFullName }}</span>
        (keyingi o‘rinlarda – Boshqaruvchi)ga Markazni quyidagi vakolatlar doirasida boshqarishga ishonch bildiradi:
      </div>

      <div>
        1. Bank nomidan Bank Ustavi, Bankka berilgan litsenziya va Markaz Nizomida ko‘zda tutilgan operatsiyalarni Bosh bank tomonidan Markaz uchun o‘rnatilgan limit va vakolatlar doirasida amalga oshirish hamda uni amalga oshirish bilan bog‘liq bo‘lgan hujjatlarni imzolash;
      </div>

      <div>
        2.	Markaz faoliyatidan kelib chiqadigan masalalarni hal etishda barcha davlat va jamoat organlari, boshqa muassasa, tashkilot va korxonalarda hamda jismoniy va yuridik shaxslar bilan munosabatda Bank manfaatlarini ko‘zlab ish yuritish;
      </div>

      <div>
        3.	Bank nomidan belgilangan tartibda bank hisobvarag‘i, omonat, kredit, garov (ipoteka), kafolat, kafillik shartnomalari, aksiyalar, obligatsiyalar va Bank tomonidan chiqariladigan qimmatli qog‘ozlarni tarqatish (sotish) bo‘yicha shartnomalarni va boshqa shartnomalarini (Mehnat munosabatlari bilan bog‘liq bo‘lgan shartnoma va kelishuvlar bundan mustasno), bank balansidagi ko‘char va ko‘chmas mulklarning oldi-sotdi shartnomalarini imzolash,  o‘zgartirish va bekor qilish (vakolatli kollegial organ qarori asosida) hamda shartnomalar ijrosini qabul qilish, notarial idora/notariuslarda Bank vakili sifatida qatnashish.
      </div>

      <div>
        Bunda Bankda garovda turgan mulklarni taqiqdan qisman yoki to‘liq chiqarish, garov mulkini boshqa mulk bilan almashtirish, garov mulki egasini o‘zgartirish <span class="font-semibold">taqiqlanadi</span>;
      </div>

      <div>
        4.	Markaz faoliyatidan kelib chiqadigan sudlov ishlari bo‘yicha barcha sud va huquqni muhofaza qiluvchi organlarda taraflarning barcha protsessual harakatlarini amalga oshirish huquqlari bilan Bankning huquq va manfaatlarini himoya qilish.
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
