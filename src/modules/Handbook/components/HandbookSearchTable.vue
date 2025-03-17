<script setup>
// Core
import { ref } from 'vue'
import { vMaska } from 'maska'
// Components
import { StatusChip } from '@/components/Chips'
import { VerticalCard, VerticalCardItem } from '@/components/Card/Vertical'
import {UserWithDetail} from "@/components/Users";

//props
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      name: '',
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
        <span class="text-xs text-greyscale-500 mr-1">Департамент: </span>
        <span class="max-w-[425px] text-sm text-primary-500 truncate">
          <slot name="top-level" :value="item?.name">
            {{ item?.name ?? "-" }}
          </slot>
        </span>
      </div>

      <div class="flex items-center flex-1 font-semibold truncate py-[10px] px-4">
        <span class="text-xs text-greyscale-500 mr-1">Отдел:</span>

        <span class="max-w-[425px] text-sm text-primary-500 truncate">
          <slot name="department" :value="item?.name">
            {{ item?.name ?? "-" }}
          </slot>
        </span>
      </div>

      <div class="max-w-[150px] w-full py-[10px] px-4"></div>

      <div class="max-w-[225px] w-full flex items-center font-semibold py-[10px] px-4">
        <!-- <span class="text-xs text-greyscale-500 mr-1">Filial:</span>

        <span class="text-sm text-primary-500">Головной офис</span> -->
      </div>

      <div class="max-w-[225px] w-full py-[10px] px-4"></div>

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
            :image="item?.avatar?.url"
            :meta="item"
            shape="circle"
            detail-dialog
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

      <div
        class="max-w-[225px] w-full py-3 px-4 cursor-pointer"
        @click="
          modal = true;
          select = item
        "
      >
        <template v-if="item.mobile_number">
          <input
            type="text"
            :value="item.mobile_number"
            v-maska
            data-maska="+### ## ### ## ##"
            disabled
            class="w-full bg-transparent border-transparent outline-none text-sm font-medium text-greyscale-900"
          >
        </template>

        <template v-else>
          <span class="text-sm font-medium text-greyscale-900">Скрыт пользователем</span>
        </template>
      </div>
    </div>
  </div>

  <!-- Dialog -->
  <base-dialog
    v-model="modal"
    max-width="max-w-[477px]"
    header-classes="hidden"
    content-classes="!rounded-[20px] overflow-hidden p-0"
  >
    <template #header>
      <span></span>
      <div class="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-4px)] bg-primary-30 rounded-tl-2xl rounded-tr-2xl"></div>
    </template>

    <template #content>
      <button
        class="p-dialog-header-icon p-dialog-header-close p-link w-9 h-9 shadow-button bg-white absolute top-[14px] right-[14px] z-10 rounded-full"
        @click="modal = false"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="p-icon p-dialog-header-close-icon w-3 h-3"
        >
          <path d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z" fill="currentColor"></path>
        </svg>
      </button>

      <user-with-detail
        :image="select?.avatar?.url"
        :color="select.color"
        :label="select.full_name"
        :meta="select"
        class="!m-0"
      />
    </template>
  </base-dialog>
  <!-- /Dialog -->
</template>
