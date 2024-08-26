<script setup>
// Components
import { InfoCircleBoldIcon, QuestionCircleIcon, CopyIcon } from '@/components/Icons'
// Macros
const emit = defineEmits(['emit:up'])
// Non-reactive
const items = [
  {
    key: 'last_name',
    description: 'Фамилия'
  },
  {
    key: 'first_name',
    description: 'Имя'
  },
  {
    key: 'father_name',
    description: 'Отчество'
  },
  {
    key: 'department',
    description: 'Департамент'
  },
  {
    key: 'division',
    description: 'Отдел'
  },
  {
    key: 'position',
    description: 'Позиция'
  }
]
</script>

<template>
  <div class="keyword-view bg-primary-10 border border-primary-100 rounded-xl">
    <div class="flex items-center gap-2 h-12 border-b border-primary-100 py-3 px-4">
      <base-iconify :icon="InfoCircleBoldIcon" class="text-primary-500" />

      <span class="flex-1 text-sm font-medium text-greyscale-900">Ключевые слова:</span>

      <div
        v-tooltip.left="{
          value: `<h4 class='text-xs text-white -my-1'>Текст объяснение зачем нужны ключевые слова</h4>`,
          escape: true,
          autoHide: false
        }"
      >
        <base-iconify
          :icon="QuestionCircleIcon"
          class="cursor-pointer text-greyscale-400 hover:text-primary-500"
        />
      </div>
    </div>

    <div class="py-3 px-4">
      <ul class="space-y-3">
        <template v-for="item in items">
          <li class="flex items-center text-sm font-medium text-greyscale-900">
            <div class="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>

            <div class="flex-1">
              <span class="uppercase font-semibold mr-1">({{ item.key }})</span> - {{ item.description }}
            </div>

            <div
              v-tooltip.top="{
                value: `<h4 class='text-xs text-white -my-1'>Скопировать</h4>`,
                escape: true,
                autoHide: false
              }"
            >
              <base-iconify
                :icon="CopyIcon"
                class="!w-4 !h-4 cursor-pointer text-greyscale-400 hover:text-primary-500"
                @click="emit('emit:up', item.key)"
              />
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
