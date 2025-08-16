import { defineStore } from 'pinia'

const headerList = [
  {
    header: 'Название теста',
    field: 'name',
    active: true
  },
  {
    header: 'Категория теста',
    field: 'description',
    active: true,
  },
  {
    header: 'Дата создания',
    field: 'created_date',
    active: true,
  },
  {
    header: 'Кто создал',
    field: 'created_by',
    active: true,
  },
  {
    header: 'Статус',
    field: 'status',
    active: true,
  },
  {
    header: 'Дедлайн',
    field: 'deadline',
    active: true,
  },
  {
    header: 'Выполнения',
    field: 'executions',
    active: true,
  },
  {
    header: 'Действия',
    field: 'actions',
    active: true,
  }
]

export const useTestConstructorStore = defineStore('test-construct', {
  state: () => ({
    headers: [...headerList],
    list: [],
    totalCount: 0
  }),
  actions: {
    getList(payload) {
      console.log(payload)
    },
    /*
    *
    * */
    resetHeaders() {
      this.headers = [...headerList]
    }
  }
})
