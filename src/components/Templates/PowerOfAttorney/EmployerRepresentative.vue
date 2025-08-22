<script setup>
// Components
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"
import { BaseCurator, BaseFooter } from "@/components/Templates/PowerOfAttorney/index"
import { calculateYearsAndMonths } from "../../../utils";
import { formatDate } from "@vueuse/shared";

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
  <div class="employer-representative-poa letter-template">
    <base-header-template/>

    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">ISHONCHNOMA</div>

      <div class="mt-4">
        Mazkur ishonchnoma orqali Toshkent shahri, Shahrisabz ko‘chasi, 3-uyda joylashgan “O‘zbekiston sanoat-qurilish
        banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank” АTB, keyingi o‘rinlarda - Bank) nomidan uning Ustavi
        asosida ish yurituvchi
        {{ props.curatorPosition }} {{ props.curatorFullName }}
        {{ props.emp?.position?.name }} {{ props.empFullName }}ga
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134, 135, 138, 139, 144-moddalariga asosan quyidagi vakolatlarni
        beradi:
      </div>

      <div>
        Bank Boshqaruvi Raisi nomidan “Ish beruvchining vakili” sifatida vazifalar taqsimotiga asosan o‘ziga
        biriktirilgan yo‘nalishlardagi Bosh bank va tarmoqlar xodimlari (departament direktorlari, ularning
        o‘rinbosarlari, bank tarmoqlari boshqaruvchilari (rahbarlari) va ularning o‘rinbosarlari bundan mustasno)
        (keyingi o‘rinlarda - xodimlar) bilan mehnat shartnomalarini, mehnat shartnomasiga doir qo‘shimcha kelishuvlarni
        imzolash;
      </div>

      <div>
        ishga qabul qilish to‘g‘risida, xodimni boshqa ishga o‘tkazish to‘g‘risida, mehnat shartnomasida nazarda
        tutilgan mehnat shartlarini o‘zgartirish haqida, mehnat shartnomasida shart qilib ko‘rsatilgan ish joyini
        o‘zgartirish to‘g‘risida, ish beruvchining boshqa joyga ko‘chishi munosabati bilan joyni o‘zgartirish haqida,
        xodimni boshqa ish beruvchiga vaqtincha xizmat safariga yuborish haqida, xodim bilan tuzilgan mehnat shartnomasi
        alohida asoslarga ko‘ra bekor qilinganda xodimni boshqa ishga o‘tkazish haqida, xodimlarni rag‘batlantirish va
        intizomiy jazo choralari qo‘llash to‘g‘risida, bir necha kasbda (lavozimda) ishlash, xizmat ko‘rsatish doirasini
        kengaytirish, ish hajmini ko‘paytirish, vaqtincha yo‘q bo‘lgan xodimning majburiyatlarini mehnat shartnomasida
        belgilangan ishdan ozod etilmagan holda bajarish haqida, shuningdek mehnat ta’tili va boshqa ta’tillar berish
        haqida, mahalliy xizmat safarlari, malaka oshirish va o’quv kurslariga yuborish bilan bog’liq bo‘lgan
        buyruqlarni imzolash.
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
