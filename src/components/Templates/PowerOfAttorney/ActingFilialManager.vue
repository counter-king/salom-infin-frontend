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
        Ushbu ishonchnoma orqali “O‘zbekiston sanoat-qurilish banki” aksiyadorlik tijorat banki (“O‘zsanoatqurilishbank”
        ATB) (keyingi o‘rinlarda – Bank) nomidan 2024-yil 18-noyabrdagi
        04-07/250-sonli ishonchnoma asosida ish yurituvchi
        {{ props.curatorPosition }} {{ props.curatorFullName }}
        O‘zbekiston Respublikasi Fuqarolik kodeksining 134, 135, 138, 139 va 144-moddalariga amal qilgan holda Bankning
        {{ props.emp?.company?.name }}
        (keyingi o‘rinlarda – “Markaz”)
        {{ props.emp?.position?.name }}
        <span class="font-semibold">{{ props.empFullName }}</span>
        (keyingi o‘rinlarda – Boshqaruvchi)ga Markazni quyidagi vakolatlar doirasida boshqarishga ishonch bildiradi:
      </div>

      <div>
        1. Markaz tomonidan Bank nomidan Bank Ustavi, Bank litsenziyasi, Markaz Nizomida ko‘zda tutilgan operatsiyalarni
        Bank tomonidan Markaz uchun o‘rnatilgan limit va vakolatlar doirasida amalga oshirish hamda uni amalga oshirish
        bilan bog‘liq bo‘lgan hujjatlarni imzolash;
      </div>

      <div>
        2. Markaz faoliyatidan kelib chiqadigan masalalarni hal etishda barcha davlat va jamoat organlari, boshqa
        muassasa, tashkilot va korxonalar, jismoniy va yuridik shaxslar bilan munosabatlarda Bank manfaatlarini ko‘zlab
        ish yuritish;
      </div>

      <div>
        3. Bank nomidan belgilangan tartibda Markaz tomonidan bank hisobvarag‘i, omonat, kredit, garov (ipoteka),
        kafolat, kafillik shartnomalari, aksiyalar, obligatsiyalar va Bank tomonidan chiqariladigan qimmatli qog‘ozlarni
        tarqatish (sotish) bo‘yicha, Bank balansidagi ko‘char va ko‘chmas mulklarning oldi-sotdi shartnomalarini va
        boshqa shartnomalarni (mehnat munosabatlari bilan bog‘liq bo‘lgan shartnoma va kelishuvlar bundan mustasno)
        imzolash, vakolatli kollegial organ qarori asosida ularga tegishli o‘zgartirish va qo‘shimchalar kiritish, bekor
        qilish haqidagi kelishuvlarni imzolash, shuningdek Bank nomidan Markaz faoliyatiga taalluqli shartnomalar
        ijrosini qabul qilish, notarial idora/notariuslarda Bank vakili sifatida qatnashish.
      </div>

      <div>
        Bunda Bankda garovda turgan mulklarni taqiqdan chiqarish, garov mulkini boshqa mulk bilan almashtirish, garov mulki egasini o‘zgartirish <span class="font-semibold">taqiqlanadi</span>;
      </div>

      <div>
        4. Markaz faoliyatidan kelib chiqqan sudlov ishlari bo‘yicha barcha sud va huquqni muhofaza qiluvchi organlarda
        taraflarning barcha protsessual harakatlarini amalga oshirish huquqi bilan Bankning huquq va manfaatlarini
        himoya qilish va vakil sifatida ishtirok etish.
      </div>

      <div>
        5. Boshqaruvchi Markaz faoliyatidan kelib chiqqan sud ishlari bo‘yicha Bank nomidan ariza, da’vo ariza,
        shikoyatni imzolash, shu jumladan sud hujjati ustidan apellyatsiya, kassatsiya, taftish shikoyatlarini imzolash
        hamda sud hujjatini yangi ochilgan holatlar bo‘yicha qayta ko‘rib chiqish to‘g‘risidagi arizani imzolash, ishni
        hakamlik sudiga topshirish, da’vo (arz qilingan talab) predmetini yoki asosini o‘zgartirish, da’vo talablari
        miqdorini ko‘paytirish yoki kamaytirish, ijro hujjatini ijro hujjatini tegishli davlat organiga, tashkilotga
        yoki uning mansabdor shaxsiga ijrosini ta’minlash uchun topshirish, sud hujjatining majburiy ijro etilishini
        talab qilish, davlat ijrochisining xatti-harakatlari (harakat yoki harakatsizligi) ustidan shikoyat berish va
        uni rad qilish, undirilgan mol-mulkni yoki pulni olish huquqiga ega bo‘ladi.
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
