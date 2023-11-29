<script setup>
// Core
import { ref, unref } from 'vue'
// Components
import { FilePreview } from '@/components/Files'
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Формат A4',
  },
  {
    label: 'Формат A5',
  },
  {
    label: 'Формат A6',
  }
])
const tabView = ref([
  {
    title: 'Фишка Doclines',
    slot: 'resolution',
  },
  {
    title: 'Фото Doclines Фото Doclines Фото Doclines Фото Doclines',
    slot: 'file',
    name: "CM00506.pdf",
    document: {
      id: 115508,
      name: "CM00506.pdf",
      url: "https://portal-drive.asakabank.uz/media/CM00506.pdf",
    },
  },
  {
    title: 'Фото Doclines 2',
    slot: 'file',
    name: "CM00506.pdf",
    document: {
      id: 115508,
      name: "CM00506.pdf",
      url: "https://portal-drive.asakabank.uz/media/CM21320.pdf",
    },
  },
  {
    title: 'Фото Doclines 3',
    slot: 'file',
    name: "CM00506.jpg",
    document: {
      id: 115508,
      name: "CM00506.jpg",
      url: "https://portal-drive.asakabank.uz/media/avatar_DHZyvvz.jpg",
    },
  },
  {
    title: 'Фото Doclines 4',
    slot: 'file',
    name: "CM00506.xlsx",
    document: {
      id: 115508,
      name: "CM00506.xlsx",
      url: "https://portal-drive.asakabank.uz/media/6_____ilova-Jarima_tHOhZmK_R0cJNfc.xlsx",
    },
  },
  {
    title: 'Фото Doclines 5',
    slot: 'file',
    name: "CM00506.pdf",
    document: {
      id: 115508,
      name: "CM00506.pdf",
      url: "https://portal-drive.asakabank.uz/media/CM00506.pdf",
    },
  },
])
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
</script>

<template>
  <div class="file-tabs-view">
    <base-tab-view
      :tab-view="tabView"
      scrollable
      segment
      truncate
      actions
      nav-container-class="m-5 mb-0"
    >
      <template #resolution="{ value }">
        <div class="h-[595px] overflow-y-auto px-8 py-5">
          <div class="flex mb-4">
            <div class="flex items-center flex-1">
              <img src="/images/logo.svg" alt="Logo" />
              <img src="/images/logo-text.svg" alt="Logo text" class="invert ml-2" />
            </div>

            <div class="text-right text-sm">
              <h1 class="text-primary-900 font-semibold mb-1">Xodimlarni boshqarish departamenti</h1>
              <p class="text-greyscale-500 font-medium">27.09.2023  № 18 - 1/74</p>
            </div>
          </div>

          <div class="border-t-[1px]"></div>

          <div class="flex items-center gap-2 bg-critic-100 border border-critic-500 rounded-full p-[6px] mt-4">
            <base-icon
              name="TriangleDangerIcon"
              class="text-critic-500 ml-2"
            />

            <span class="flex-1 text-sm font-medium text-critic-500">Документ еще не подписан</span>

            <base-button
              label="Загрузить фишку"
              size="small"
              rounded
              icon-right="AltArrowDownIcon"
              @click="toggle"
            />

            <base-menu
              ref="menuRef"
              id="overlay_menu"
              :items="items"
            />
          </div>

          <div class="flex items-center justify-between text-sm font-semibold mt-4 mb-5">
            <h1 class="text-greyscale-500">Boshqaruv Raisi:</h1>
            <h1 class="text-primary-900">K. D. Tulyaganovga</h1>
          </div>

          <h1 class="text-lg font-bold text-primary-900 text-center">BILDIRISHNOMA</h1>

          <div class="text-sm font-semibold text-primary-900 mt-6 mb-5">
            <div class="flex mb-2">
              <h1 class="text-greyscale-500 mr-1">Mazmuni:</h1>
              <p>Shtat birligi kiritish va nomzodni ishga qabul qilish masalasida</p>
            </div>

            <p class="indent-5">
              Departament ish faoliyatini samaradorligini oshirish maqsadida quyidagi nomzodni ishga qabul qilinishiga hamda xodimga zaruriy texnik jihozlar (kompyuter va telefon qurilmasi v.b.) bilan ta'minlanishiga ruxsat berishingizni so'rayman.
            </p>

            <ul class="mt-3">
              <li class="flex font-semibold mb-2">
                <p class="text-greyscale-500 mr-1">Nomzod:</p>
                <span>Вася Васин принят Батькович</span>
              </li>
              <li class="flex font-semibold mb-2">
                <p class="text-greyscale-500 mr-1">Taklif etilayotgan tashkiliy tuzilma:</p>
                <span>Kadrlar bo'yicha ish yuritish boshqarmasi</span>
              </li>
              <li class="flex font-semibold mb-2">
                <p class="text-greyscale-500 mr-1">Kiritilayotgan lavozim:</p>
                <span>Agent</span>
              </li>
              <li class="flex font-semibold mb-2">
                <p class="text-greyscale-500 mr-1">Ustama haqi miqdori:</p>
                <span>5 rag'batlantirish koeffitsiyenti</span>
              </li>
            </ul>
          </div>

          <div class="border-t-[1px]"></div>

          <div class="flex items-center my-4">
            <div class="flex-1 text-sm font-semibold">
              <h1 class="text-greyscale-500">Boshqarma boshlig’i:</h1>
              <p class="text-primary-900">N. R. Toshkenboyeva</p>
            </div>

            <div class="w-[50px] h-[50px]">
              <img src="/images/qr-code.svg" alt="Qr code" />
            </div>
          </div>

          <div class="border-t-[1px]"></div>

          <ul class="text-greyscale-500 text-sm mt-3">
            <li class="flex font-semibold mb-1">
              <p class="text-primary-900 mr-1">Рег. номер:</p>
              <span>014048</span>
            </li>
            <li class="flex font-semibold mb-1">
              <p class="text-primary-900 mr-1">Рег. дата:</p>
              <span>29.10.2023</span>
            </li>
            <li class="flex font-semibold">
              <p class="text-primary-900 mr-1">Дата. подписания:</p>
              <span>29.10.2023, 22:19</span>
            </li>
          </ul>
        </div>
      </template>

      <template #file="{ value }">
        <div class="h-[575px] mt-5">
          <template v-if="value">
            <file-preview :file="value" />
          </template>
        </div>
      </template>
    </base-tab-view>
  </div>
</template>

<style scoped>

</style>
