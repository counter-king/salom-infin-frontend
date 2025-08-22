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
        Bank Boshqaruvi Raisi nomidan “Ish beruvchining vakili” sifatida xodimlar (departament direktori, o‘rinbosari
        hamda bank tarmoqlari rahbarlari va o‘rinbosarlari bundan mustasno) bilan mehnat shartnomasini imzolash va unga
        qo‘shimcha kelishuv imzolash, bunday hujjatlardan kelib chiqadigan munosabatlar bo‘yicha rasmiylashtiriladigan
        buyruqlarni imzolash;
      </div>

      <div>
        mehnat shartnomasida shart qilib ko‘rsatilgan ish joyini o‘zgartirish to‘g‘risida, ish beruvchining boshqa joyga
        ko‘chishi munosabati bilan joyini o‘zgartirish haqida, xodimni boshqa ish beruvchiga vaqtincha xizmat safariga
        yuborish haqida, xodim bilan tuzilgan mehnat shartnomasi alohida asoslarga ko‘ra bekor qilinganda xodimni boshqa
        ishga o‘tkazish haqida, xodimlarni rag‘batlantirish to‘g‘risida, bir necha kasbda (lavozimda) ishlash, xizmat
        ko‘rsatish doirasini kengaytirish, ish hajmini ko‘paytirish, vaqtincha yo‘q bo‘lgan xodimning majburiyatlarini
        mehnat shartnomasida belgilangan ishdan ozod etilmagan holda bajarish haqida, dam olish kunlari va
        ishlanmaydigan bayram kunlari ishga jalb etish to‘g‘risida, dam olish kunlaridagi yoki ishlanmaydigan bayram
        kunlaridagi ish uchun haq to‘lash va boshqa turdagi haq to‘lash to‘g‘risida; kompensatsiya to‘lovlari
        to‘g‘risida; kasbiy tayyorgarlik, qayta tayyorlash, malaka oshirish va stajirovka to‘g‘risida; shuningdek mehnat
        ta’tili va boshqa ta’tillar berish haqida, mahalliy xizmat safarlari, malaka oshirish va o’quv kurslariga
        yuborish bilan bog‘liq bo‘lgan buyruqlarni imzolash.
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
