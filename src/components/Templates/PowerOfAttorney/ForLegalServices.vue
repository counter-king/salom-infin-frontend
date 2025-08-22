<script setup>
// Components
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"
import { BaseFooter, BaseCurator } from "@/components/Templates/PowerOfAttorney/index"

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
  }
})

</script>

<template>
  <div class="for-legal-services-poa letter-template">
    <base-header-template />
    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">ISHONCHNOMA</div>

      <div class="mt-4">
        Мazkur ishonchnoma orqali Toshkent shahri, Shahrisabz ko‘chasi, 3-uyda joylashgan “O‘zbekiston sanoat-qurilish
        banki” aksiyadorlik tijorat banki (keyingi o‘rinlarda – Bank) nomidan
        2024-yil 18-noyabrdagi 04-07/250-sonli ishonchnoma asosida ish yurituvchi
        {{ props.curatorPosition }} {{ props.curatorFullName }}
        <span class="font-semibold">
          {{ props.empPositionFull }} {{ props.empFullName }}
        </span>ga
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134, 135, 138, 139 va 144-moddalariga asosan quyidagi
        vakolatlarni beradi:
      </div>

      <div>
        Bank va uning tarmoqlari faoliyatidan kelib chiqqan sudlov ishlari bo‘yicha O‘zbekiston Respublikasining
        iqtisodiy, fuqarolik, jinoyat, maʼmuriy, hakamlik va boshqa sudlarining barcha instansiyalarida, shuningdek
        Savdo-sanoat palatasi va uning hududiy boshqarmalarida, Majburiy ijro byurosi va uning hududiy bo‘limlari,
        surishtiruv, tergov organlari, boshqa davlat organlari va tashkilotlarida Bankning ishonchli vakili sifatida
        ishtirok etish;
      </div>

      <div>
        ijro xatlarini rasmiylashtirish uchun notariuslarga barcha zarur hujjatlarni taqdim etish va ijro xatlarini
        ulardan olish;
      </div>

      <div>
        sudlarda Bank nomidan barcha protsessual harakatlarni amalga oshirish, xususan da’vo ariza, ariza, iltimos va
        shikoyatni imzolash, sud hujjati ustidan apellyatsiya, kassatsiya, taftish va boshqa shikoyatlarni hamda
        qarzdorga nisbatan to‘lovga qobiliyatsizlik to‘g‘risida ish qo‘zg‘atish haqidagi arizani imzolash, shuningdek
        sud hujjatini yangi ochilgan holatlar bo‘yicha qayta ko‘rib chiqish to‘g‘risidagi arizani imzolash, ishni
        hakamlik sudiga topshirish, da’vo (arz qilingan talab) predmetini yoki asosini o‘zgartirish, da’vo talablari
        miqdorini ko‘paytirish yoki kamaytirish, ijro hujjatini undiruvga taqdim etish, ijro hujjatini tegishli davlat
        organiga, tashkilotga yoki uning mansabdor shaxsiga ijrosini ta’minlash uchun topshirish, sud hujjatining
        majburiy ijro etilishini talab qilish, davlat ijrochisining xatti-harakatlari (harakat yoki harakatsizligi)
        ustidan shikoyat berish va uni rad qilish;
      </div>

      <div>
        Bank faoliyatidan kelib chiqqan masalalar yuzasidan huquqni muhofaza qiluvchi organlarga tegishli tartibda
        ariza, shikoyat, taklif hamda amaliy yordam ko‘rsatish to‘g’risidagi murojaatlarni imzolash.
      </div>

<!--      <div>-->
<!--        {{ props.empPositionFull }} {{ props.empFullName }}ning ID pasport ma‘lumotlari:-->
<!--        {{ props.empPassportDetails }}.-->
<!--      </div>-->

      <base-footer :compose-model="props.composeModel" :parent-document="props.parentDocument" />
    </div>

    <base-curator :curators="props.curators" />

    <base-performer
      :compose-model="props.composeModel"
      :author="props.author"
    />
  </div>
</template>

<style scoped>

</style>
