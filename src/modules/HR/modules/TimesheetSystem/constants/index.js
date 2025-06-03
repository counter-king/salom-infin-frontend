import { AlarmBoldIcon, AlarmTurnOffBoldIcon, CalendarDateBoldIcon, CalendarSearchBoldIcon, CheckCircleBoldIcon, TreePalmIcon } from "@/components/Icons";
import { ref } from "vue";

export const activityData = ref([
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

export const LeaveTypes = {
    1:'labor-leave',
    2:'sick-leave',
    3:'without-content',
    4:'business-trip',
    5:'additional-day-off'
}