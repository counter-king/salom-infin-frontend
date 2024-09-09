<script setup>
// Non-reactive
const items = [
  {
    title: 'Руководитель группы',
    description: 'Мария Воробьёва',
    color: '#635AFF'
  },
  {
    title: 'Веб-дизайнер',
    description: 'Руслан Ковалёв',
    color: '#63BA3D'
  },
  {
    title: 'Владелец продукта',
    description: 'Аделия Кузьмина',
    color: '#FFC352'
  },
  {
    title: 'Разработчик интерфейса',
    description: 'Екатерина Семёнова',
    color: '#11A5ED'
  }
]
</script>

<template>
  <div class="my-team-view px-4">
    <div class="grid grid-cols-2 gap-x-6 gap-y-2">
      <template v-for="item in items">
        <div class="group col-span-1 flex gap-3 transition-colors hover:bg-primary-10 h-20 relative rounded-xl p-4 after:hover:bg-transparent after:content after:transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-greyscale-70">
          <base-avatar :color="item.color" :label=item.description avatar-classes="w-9 h-9" />

          <div class="flex-1">
            <h1 class="text-sm font-medium text-greyscale-500 mb-1">{{ item.title }}</h1>
            <p class="font-semibold text-greyscale-900">{{ item.description }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
