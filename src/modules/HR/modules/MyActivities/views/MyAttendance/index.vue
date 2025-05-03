<script setup>
// core
import { ref } from 'vue';
// components
import HeaderToolbar from '../../components/MyAttendance/HeaderToolbar.vue';
import ActivityCard from '../../components/ActivityCard.vue';
import { AlarmBoldIcon, AlarmTurnOffBoldIcon, CalendarDateBoldIcon, CalendarSearchBoldIcon, CheckCircleBoldIcon, TreePalmIcon } from '@/components/Icons';
import CaledarTable from '../../components/MyAttendance/CaledarTable.vue';

const activityData = ref([
    {
        id: 1,
        icon: CalendarDateBoldIcon,
        iconClass: "bg-success-500 text-white",
        title: '23 д.',
        description: 'Рабочие дни',
        toolTipInfo: {
            value: "Количество рабочих дней в месяце."
        }
    },
    {
        id: 2,
        icon: AlarmBoldIcon,
        iconClass: "bg-primary-500 text-white",
        title: '23 д.',
        description: 'Рабочие часы',
        toolTipInfo: {
            value: "Общее количество часов, запланированных для работы."
        }
    },
    {
        id: 3,
        icon: TreePalmIcon,
        iconClass: "bg-critic-300 text-white",
        title: '23 д.',
        description: 'Выходные дни',
        toolTipInfo: {
            value: "Дни недели, когда работа не требуется."
        }
    },
    {
        id: 4,
        icon: CheckCircleBoldIcon,
        iconClass: "bg-primary-500 text-white",
        title: '23 д.',
        description: 'Отработанные часы',
        toolTipInfo: {
            value: "Количество фактически отработанных часов."
        }
    },
    {
        id: 5,
        icon: AlarmTurnOffBoldIcon,
        iconClass: "bg-warning-500 text-white",
        title: '23 д.',
        description: 'Часы отсутствий',
        toolTipInfo: {
            value: "Общее время отсутствия на рабочем месте."
        }
    },
    {
        id: 6,
        icon: CalendarSearchBoldIcon,
        iconClass: "bg-critic-300 text-white",
        title: '23 д.',
        description: 'Остаток часов',
        toolTipInfo: {
            value: "Разница между планом и фактически отработанными часами.",
            placement: "left"
        }
    }
])

</script>           
<template>
<div class="flex flex-col">
    <!-- header-toolbar -->
    <HeaderToolbar />
    <!-- activity cards -->
    <div class="flex items-center gap-2">
        <ActivityCard v-for="activity in activityData" :key="activity.id" :data="activity" />
    </div>
    <!-- components -->
    <router-view />
</div>
</template>