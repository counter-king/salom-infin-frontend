<script setup>
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      name: '',
      users: []
    })
  }
})
</script>

<template>
  <table class="w-full !bg-white">
    <thead>
      <tr>
        <th width="500" class="font-semibold py-[10px] px-4 truncate">
          <span class="text-xs text-greyscale-500 mr-1">Департамент:</span>
          <span class="text-sm text-primary-500 truncate">{{ props.item.name }}</span>
        </th>

        <th width="500" class="font-semibold py-[10px] px-4 truncate">
          <span class="text-xs text-greyscale-500 mr-1">Отдел:</span>
          <!-- <span class="text-sm text-primary-500 truncate">{{ data.name }}</span> -->
        </th>

        <th width="225" class="font-semibold py-[10px] px-4">3</th>

        <th class="font-semibold py-[10px] px-4">
          <span class="text-xs text-greyscale-500 mr-1">Filial:</span>
          <!-- <span class="text-sm text-primary-500">{{ data.name }}</span> -->
        </th>

        <th width="225" class="font-semibold py-[10px] px-4">5</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="!props.item.users.length">
        <td colspan="5">
          <h1 class="text-sm font-medium text-greyscale-900 text-center">Здесь пока нет сотрудников</h1>
        </td>
      </tr>

      <template v-else>
        <tr v-for="user in props.item.users">
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <base-avatar
                :label="user.full_name"
                color="#635AFF"
                shape="circle"
                avatar-classes="w-6 h-6"
              />

              <span class="text-sm font-medium text-greyscale-900">{{ user.full_name }}</span>
            </div>
          </td>

          <td class="py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.position }}</span>
          </td>

          <td class="py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.status }}</span>
          </td>

          <td class="py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.cisco ?? '-' }}</span>
          </td>

          <td class="py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.email ?? '-' }}</span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
