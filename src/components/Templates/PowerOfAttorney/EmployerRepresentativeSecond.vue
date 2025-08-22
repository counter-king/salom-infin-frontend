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
        Bank nomidan kredit, lizing, kafillik, omonat, garov va boshqa shartnomalarini bank manfaatlarini ko‘zlagan
        holda imzolash;
      </div>

      <div>
        Bank faoliyatidan kelib chiqadigan masalalar yuzasidan huquqni muhofaza qiluvchi organlarga tegishli tartibda
        ariza, shikoyat, takliflar hamda amaliy yordam ko‘rsatish to‘g’risidagi murojaatlarni imzolash;
      </div>

      <div>
        ariza, da’vo ariza, shikoyat va iltimosnomani imzolash, sud hujjati ustidan shikoyat qilish (apellyatsiya,
        kassatsiya, taftish va boshqa shikoyatlarni imzolash), sud hujjatini yangi ochilgan holatlar bo‘yicha qayta
        ko‘rib chiqish to‘g’risidagi arizani imzolash, ishni hakamlik sudiga topshirish, da’vo (arz qilingan talab)
        predmetini yoki asosini o‘zgartirish, da’vo talablari miqdorini ko‘paytirish yoki kamaytirish, kelishuv bitimi,
        mediatsiya tartib-taomilini amalga oshirish to‘g’risidagi kelishuv yoki mediativ kelishuvni tuzish va imzolash,
        ijro varaqasini undiruvga taqdim etish, sud hujjatining majburiy ijro etilishini talab qilish, undirilgan
        mol-mulkni yoki pulni olish, davlat ijrochisining xatti-harakatlari (harakat yoki harakatsizligi) ustidan
        shikoyat berish va uni rad qilish.
      </div>

      <div>
        Ishlab chiqarish zaruriyati tufayli ushbu ishonchnoma bilan berilgan kelishuv bitimi, mediatsiya
        tartib-taomilini amalga oshirish to‘g’risidagi kelishuv yoki mediativ kelishuvni tuzish va imzolash vakolati
        Bank xodimlariga Fuqarolik kodeksining 140-moddasi talablariga rioya qilingan holda berilishi mumkin.
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
