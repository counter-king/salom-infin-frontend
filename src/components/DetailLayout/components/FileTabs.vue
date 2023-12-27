<script setup>
// Core
import { ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
// Utils
import { formatDate, formatDateHour } from '@/utils/formatDate'
// Composable
const { t } = useI18n()
// Components
import { FilePreview } from '@/components/Files'
// Utils
import { formatNameToShort } from '@/utils'
// Macros
const { resolution } = defineProps({
  resolution: {
    type: Object,
    default: () => {}
  }
})
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
        <div class="h-[650px] overflow-y-auto px-8 py-5">
          <div class="flex mb-4">
            <div class="flex items-center flex-1">
              <img src="/images/logo.svg" alt="Logo" />
              <img src="/images/logo-text.svg" alt="Logo text" class="invert ml-2" />
            </div>
          </div>

          <div class="border-t-[1px]"></div>

          <div
            class="flex items-center gap-2 border rounded-full p-[6px] mt-4"
            :class="[ resolution.signed ? 'bg-primary-100 border-primary-500' : 'bg-critic-100 border-critic-500' ]"
          >
            <base-icon
              :name="resolution.signed ? 'CheckCircleIcon' : 'TriangleDangerIcon'"
              class="text-critic-500 ml-2"
              :class="[ resolution.signed ? 'text-primary-500' : 'text-critic-500' ]"
            />

            <span
              class="flex-1 text-sm font-medium "
              :class="[ resolution.signed ? 'text-primary-500' : 'text-critic-500' ]"
            >
            {{ resolution.signed ? t('document-signed') : t('document-not-signed') }}
          </span>

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

          <div class="text-sm font-semibold text-primary-900 mt-6 mb-5">
            <ul class="mt-3">
              <template v-if="resolution.assignees && resolution.assignees.length">
                <template v-for="item in resolution.assignees">
                  <li class="flex gap-1 font-semibold mb-2">
                    <span>{{ formatNameToShort(item.user.full_name) }}</span>

                    <span class="text-greyscale-500">-</span>

                    <p class="text-greyscale-500 mr-1">
                      <template v-if="item.is_controller">
                        Контролирующий
                      </template>

                      <template v-else>
                        <template v-if="item.is_responsible">
                          Исполнитель
                        </template>

                        <template v-else>
                          Соисполнитель
                        </template>
                      </template>
                    </p>
                  </li>
                </template>
              </template>

              <li class="flex font-semibold">
                <p class="text-greyscale-500 mr-1">Срок исполнения:</p>
                <span>{{ resolution.deadline ? resolution.deadline : 'Без срока исполнений' }}</span>
              </li>
            </ul>

            <div class="text-center mt-5">
              <p v-html="resolution.content"></p>
            </div>
          </div>

          <div class="border-t-[1px]"></div>

          <div class="flex items-center my-4">
            <div class="flex-1 text-sm font-semibold">
              <h1 class="text-greyscale-500">{{ resolution.reviewer?.position?.name }}:</h1>
              <p class="text-primary-900">{{ formatNameToShort(resolution.reviewer?.full_name) }}</p>
            </div>

            <template v-if="resolution.signed">
              <div class="w-[50px] h-[50px]">
                <img src="/images/qr-code.svg" alt="Qr code" />
              </div>
            </template>
          </div>

          <div class="border-t-[1px]"></div>

          <ul class="text-greyscale-500 text-sm mt-3">
            <li class="flex font-semibold mb-1">
              <p class="text-primary-900 mr-1">Рег. номер:</p>
              <span>{{ resolution.register_number }}</span>
            </li>
            <li class="flex font-semibold mb-1">
              <p class="text-primary-900 mr-1">Рег. дата:</p>
              <span>{{ formatDate(resolution.register_date) }}</span>
            </li>
            <li class="flex font-semibold">
              <p class="text-primary-900 mr-1">Дата. подписания:</p>
              <span>{{ formatDateHour(resolution.receipt_date) }}</span>
            </li>
          </ul>
        </div>
      </template>

      <template #file="{ value }">
        <div class="h-[632px] mt-5">
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
