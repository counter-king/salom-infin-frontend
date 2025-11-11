<script setup>
// Core
import { computed } from "vue"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Utils
import { formatDate } from "@/utils/formatDate"
import { formatUserFullName } from "@/utils"
// Enums
import { SIGNER_TYPES } from "@/enums"
// Components
import QrcodeVue from "qrcode.vue"
import { BaseDepartmentName, BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"

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
  }
})

// Composable
const SDStore = useSDStore()

// Computed
const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})

const notices = computed(() => {
  if (props.preview) {
    return props.composeModel?.__employees.map(item => ({
      empFullName: item.full_name,
      empDepName: item.top_level_department.name,
      empPositionName: item.position.name,
      destinations: props.composeModel.__companies,
      startDate: props.composeModel.start_date,
      endDate: props.composeModel.end_date
    }))
  }
  else {
    return props.composeModel?.notices?.map(item => ({
      empFullName: item.user.full_name,
      empDepName: item.user.top_level_department.name,
      empPositionName: item.user.position.name,
      destinations: item.destinations,
      startDate: item.start_date,
      endDate: item.end_date
    }))
  }
})

const curators = computed(() => {
  if (props.preview) {
    return [props.composeModel?.__curator]
  }
  const basicSigner = props.composeModel?.signers.find(item => item.type === SIGNER_TYPES.BASIC_SIGNER)
  return basicSigner ? [basicSigner] : [props.composeModel?.curator].filter(Boolean)
})

const signers = computed(() => {
  return props.preview ? props.composeModel?.__signers : props.composeModel?.signers.filter(item => item.type === SIGNER_TYPES.SIGNER)
})

</script>

<template>
  <div class="business-trip-decree-template-view letter-template">
    <base-header-template/>

    <base-department-name
      :dep-name="author?.top_level_department?.name"
    />

    <div class="flex flex-col text-sm font-medium mt-4">
      <span> № {{ props.composeModel?.register_number }}</span>
      <span>{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}</span>
    </div>

    <div class="flex w-full justify-center text-base font-bold my-5">
      FARMOYISH
    </div>

    <div v-if="SDStore.historyShow" class="text-justify" v-html="SDStore.historyContent"></div>
    <div v-else class="text-justify" v-html="props.composeModel?.content"></div>

    <div class="employees-table text-sm mt-4">
      <table class="w-full">
        <tr class="text-center">
          <td class="border-2 p-1">№</td>
          <td class="border-2 p-1">F.I.SH</td>
          <td class="border-2 p-1">Departament va lavozim</td>
          <td class="border-2 p-1">Yo'nalish</td>
          <td class="border-2 p-1">Xizmat sanasi</td>
        </tr>

        <tr
          v-if="notices && notices.length"
          v-for="(item, index) in notices"
          class="text-center"
        >
          <td class="border-2 p-1">{{ index + 1 }}</td>
          <td class="border-2 p-1">{{ item.empFullName }}</td>
          <td class="border-2 p-1">{{ item.empDepName }} <br> {{ item.empPositionName }}</td>
          <td class="border-2 p-1">
            <div class="flex flex-col gap-y-1">
              <span
                v-for="(destination, index) in item.destinations"
              >
                {{ destination.name }} <span v-if="index !== item.destinations.length - 1">,</span>
              </span>
            </div>
          </td>
          <td class="border-2 p-1 w-[100px]">{{ item.startDate }} <br> {{ item.endDate }} </td>
        </tr>
      </table>
    </div>

    <div class="indent-8 mt-2 text-sm text-justify">
      <div>xizmat safariga yuborilsin.</div>
      <div>
        Xizmat safarida bo‘lgan xodimga u yuborilgan Bank tarmog‘i/tashkilotdagi ish vaqti rejimi va dam olish vaqtlari tadbiq etilsin.
      </div>

      <div>
        Xizmat safariga yuborilgan xodim safardan qaytgandan so‘ng 3 ish kuni ichida xizmat safari natijalari to‘g‘risida xisobot topshirsin.
      </div>

      <div>
        Buxgalteriya hisobi va hisoboti departamenti tomonidan xizmat safari bilan bog‘liq xarajatlar uchun to‘lovlar belgilangan tartibda amalga oshirilsin.
      </div>

      <div v-if="composeModel?.trip_notice_register_number">
        <span class="font-semibold">Asos: </span>{{ composeModel?.trip_notice_register_number }}-sonli bildirishnnoma;
      </div>

      <div>
        Markaziy bank xodimlarini xizmat safariga yuborish to‘g‘risidagi Tartib;
      </div>

      <div>
        O‘zR MKning 287-moddasi;
      </div>

      <div>
        Vazirlar Mahkamasining 2022-yil 2-avgustdagi “O‘zbekiston Respublikasi hududida xizmat safarlari to‘g‘risidagi” 424-sonli Nizom.
      </div>
    </div>

    <div class="mt-6 pb-2 px-4">
      <template v-for="item in curators" :key="item.id">
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

      <template v-for="item in signers" :key="item.id">
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
      :author="author"
    />
  </div>
</template>

<style scoped>

</style>
