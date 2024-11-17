<script setup>
// Core
import { ref, watchEffect } from "vue"
// Components
import { StatusChip } from "@/components/Chips"
import { VerticalCard, VerticalCardItem } from "@/components/Card/Vertical"
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      name: "",
    }),
  },
  topLevel: {
    type: String,
  },
})

const { item } = props

// Reactive
const modal = ref(false)
const select = ref({
  full_name: null,
  username: null,
  cisco: null,
  email: null,
  status: {
    name: null,
    code: null,
  },
  position: null,
})
</script>

<template>
  <div class="w-full">
    <div class="table-header flex border-b-[1.5px] border-greyscale-200">
      <div class="flex items-center flex-1 font-semibold truncate py-[10px] px-4">
        <span class="text-xs text-greyscale-500 mr-1">Департамент: 12</span>
        <span class="max-w-[425px] text-sm text-primary-500 truncate">
          <slot name="top-level" :value="item?.name">
            {{ item?.name }}
          </slot>
        </span>
      </div>

      <div class="flex items-center flex-1 font-semibold truncate py-[10px] px-4">
        <span class="text-xs text-greyscale-500 mr-1">Отдел:</span>

        <span class="max-w-[425px] text-sm text-primary-500 truncate">
          <slot name="department" :value="item?.name">
            {{ item?.name }}
          </slot>
        </span>
      </div>

      <div class="max-w-[150px] w-full py-[10px] px-4"></div>

      <div class="max-w-[225px] w-full flex items-center font-semibold py-[10px] px-4">
        <!-- <span class="text-xs text-greyscale-500 mr-1">Filial:</span>

        <span class="text-sm text-primary-500">Головной офис</span> -->
      </div>

      <div class="max-w-[225px] w-full py-[10px] px-4"></div>
    </div>

    <div class="flex border-b-[1.5px] border-greyscale-100">
      <div
        class="flex flex-1 py-3 px-4 cursor-pointer"
        @click="
          modal = true;
          select = item
        "
      >
        <div class="flex items-center gap-3">
          <base-avatar
            :label="item.full_name"
            :color="item.color ?? '#635AFF'"
            shape="circle"
            avatar-classes="w-6 h-6"
          />

          <span class="text-sm font-medium text-greyscale-900">{{ item.full_name }}</span>
        </div>
      </div>

      <div
        class="flex-1 py-3 px-4 cursor-pointer"
        @click="
          modal = true;
          select = item
        "
      >
        <span class="text-sm font-medium text-greyscale-900">{{ item.position?.name }}</span>
      </div>

      <div
        class="max-w-[150px] w-full py-3 px-4 cursor-pointer"
        @click="
          modal = true;
          select = item
        "
      >
        <!-- TODO: испавить потом -->

        <status-chip type="handbook" :status="item.status">
          {{ item.status?.name }}
        </status-chip>
      </div>

      <div
        class="max-w-[225px] w-full py-3 px-4 cursor-pointer"
        @click="
          modal = true;
          select = item
        "
      >
        <span class="text-sm font-medium text-greyscale-900">{{ item.cisco ?? "-" }}</span>
      </div>

      <div
        class="max-w-[225px] w-full py-3 px-4 cursor-pointer"
        @click="
          modal = true;
          select = item
        "
      >
        <span class="text-sm font-medium text-greyscale-900">{{ item.email ?? "-" }}</span>
      </div>
    </div>
  </div>

  <!-- Dialog -->
  <base-dialog
    v-model="modal"
    max-width="max-w-[540px]"
    header-classes="relative border-none rounded-tl-[20px] rounded-tr-[20px]"
    content-classes="overflow-visible pt-0 pb-6"
  >
    <template #header>
      <span></span>
      <div
        class="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-4px)] bg-primary-30 rounded-tl-2xl rounded-tr-2xl"
      ></div>
    </template>

    <template #content>
      <div>
        <div class="relative -mt-10 pl-4">
          <div class="flex justify-center items-center w-[90px] h-[90px] rounded-full bg-white">
            <base-avatar :label="select.full_name" :color="select.color ?? '#635AFF'" avatarClasses="w-20 h-20">
              <span class="text-3xl font-semibold text-white">{{ select.full_name[0] }}</span>
            </base-avatar>
          </div>

          <div class="mt-1">
            <div>
              <h1 class="text-greyscale-900 font-bold text-base mb-1">
                {{ select.full_name }}
              </h1>
              <span class="block text-xs font-medium text-greyscale-500">{{ select.position.name }}</span>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <vertical-card>
            <vertical-card-item title="Департамент" :description="props.topLevel" />

            <vertical-card-item title="Отдел" :description="item.de" />

            <!-- <vertical-card-item title="Filial" description="Головной офис" /> -->

            <vertical-card-item title="IP-телефона" :description="select.cisco" />

            <vertical-card-item title="Корп. почта" :description="select.email" />
          </vertical-card>
        </div>
      </div>
    </template>
  </base-dialog>
  <!-- /Dialog -->
</template>
