<script setup>
// Core
import { computed } from "vue"
// Enums
import { SIGNER_TYPES } from "@/enums"
// Utils
import { formatUserFullName } from "@/utils"
// Components
import QrcodeVue from "qrcode.vue"
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"
import { formatDate } from "../../../utils/formatDate";

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
  }
})

</script>

<template>
  <div class="for-legal-services-poa letter-template">
    <base-header-template />
    <div class="text-justify indent-8 text-sm">
      <div class="text-base font-semibold text-center mt-8">ISHONCHNOMA</div>
      <div class="mt-4">
        Мazkur ishonchnoma orqali Toshkent shahri, Shahrisabz ko‘chasi, 3-uyda joylashgan “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (keyingi o‘rinlarda – Bank) nomidan uning Ustavi asosida ish yurituvchi
        <span class="font-semibold">
          {{ props.curatorPosition }} {{ props.curatorFullName }}
          {{ props.empPositionFull }} {{ props.empFullName }}
        </span>ga
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134-144-moddalariga asosan quyidagi vakolatlarni beradi
      </div>
      <div>
        Bank va uning hududiy tarmoqlari faoliyatidan kelib chiqadigan sudlov ishlari boʼyicha Oʼzbekiston Respublikasining barcha sudlarida (iqtisodiy, fuqarolik, jinoyat, maʼmuriy, hakamlik) va barcha instansiyalarida, shuningdek Savdo-sanoat palatasi va uning hududiy boshqarmalarida, surishtiruv, tergov organlari, Majburiy ijro byurosi va uning hududiy boʼlimlari va boshqa davlat organlari va tashkilotlarida bankning ishonchli vakili sifatida ishtirok etish;
      </div>
      <div>
        Sudlarda bank nomidan barcha protsessual harakatlarni amalga oshirish, xususan da’vo ariza, ariza, iltimos va shikoyatni imzolash, sud hujjati ustidan apellyatsiya, kassatsiya, taftish shikoyatlarini hamda qarzdorga nisbatan to‘lovga qobiliyatsizlik to‘g‘risida ish qo‘zg‘atish haqidagi arizani imzolash, shuningdek sud hujjatini yangi ochilgan holatlar bo‘yicha qayta ko‘rib chiqish to‘g‘risidagi arizani imzolash, ishni hakamlik sudiga topshirish, da’vo (arz qilingan talab) predmetini yoki asosini o‘zgartirish, da’vo talablari miqdorini ko‘paytirish yoki kamaytirish, ijro hujjatini undiruvga taqdim etish, ijro hujjatini ijroga topshirish, sud hujjatining majburiy ijro etilishini talab qilish, undirilgan mol-mulkni yoki pulni olish, davlat ijrochisining xatti-harakatlari (harakat yoki harakatsizligi) ustidan shikoyat berish va uni rad qilish hamda ushbu ishonchnoma bilan yuklatilgan topshiriqlarni bajarish bilan bog’liq bo‘lgan boshqa zarur harakatlarni bajarish;
      </div>
      <div>
        Bank faoliyatidan kelib chiqadigan masalalar yuzasidan huquqni muhofaza qiluvchi organlarga tegishli tartibda ariza, shikoyat, takliflar hamda amaliy yordam ko‘rsatish to‘g’risidagi murojaatlarni imzolash;
      </div>
      <div>
        To‘lovga qobiliyatsizlik to‘g‘risidagi ishlar bo’yicha Bankning ishonchli vakili sifatida ishtirok etish, ko’rsatma va tushuntirishlar berish, kreditorlar yig’ilishida vakil sifatida ishtirok etish, shuningdek notarial idora (notarius)larda garov va ipoteka shartnomalarini hamda ularga kiritiladigan o’zgartirish va qo’shimchalarni Bank nomidan imzolash, shu bilan birga ijro xatlarini rasmiylashtirish uchun notariuslarga barcha zarur hujjatlarni taqdim etish va ijro xatlarini ulardan olish vakolatini beradi.
      </div>
      <div>
        {{ props.empPositionFull }} {{ props.empFullName }}ning ID pasport ma‘lumotlari:
        {{ props.empPassportDetails }}.
      </div>
      <div class="italic">
        Ushbu ishonchnomaning berilishi munosabati bilan 11.07.2024-yilda berilgan 04-07/153-sonli ishonchnoma o‘z kuchini yo‘qotadi.
        Mazkur ishonchnomaning amal qilish muddati u orqali berilgan vakolatlarni boshqa shaxsga o‘tkazish huquqisiz
        <span class="font-semibold">{{ formatDate(props.composeModel.start_date) }} dan {{ formatDate(props.composeModel.end_date) }} gacha</span> berildi.
        Ushbu ishonchnoma orqali ishonch bildiriluvchi shaxs boshqa lavozimga o’tkazilganda yoki mehnat shartnomasi bekor qilinganda o’z kuchini yo‘qotadi.
      </div>
    </div>

    <div class="mt-6 pb-2 px-4">
      <template v-for="item in props.curators" :key="item.id">
        <base-row class="mb-2 items-center">
          <base-col col-class="w-1/3">
            <span class="text-sm font-semibold block">{{ item.user ? item.user.position.name : item.position.name }}</span>
          </base-col>

          <base-col col-class="w-1/3">
            <qrcode-vue
              v-if="item.is_signed"
              :value="'Work Zone'"
              :size="50"
              level="L"
              render-as="svg"
            />
          </base-col>

          <base-col col-class="w-1/3">
            <span class="text-sm font-semibold block">{{ formatUserFullName(item) }}</span>
          </base-col>
        </base-row>
      </template>
    </div>

    <base-performer
      :compose-model="props.composeModel"
      :author="props.author"
    />
  </div>
</template>

<style scoped>

</style>
