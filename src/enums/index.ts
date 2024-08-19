export const CORRESPONDENT = {
  ALL: "all",
  LEGAL: "legal",
  PHYSICAL: "physical",
}
export const FILE_ACTIONS = {
  CREATED:  'created',    // Файл создан
  UPDATED:  'updated',    // Файл изменен
  UPLOADED: 'uploaded',  // Файл загружен
  DELETED:  'deleted',   // Файл удален
  FORWARD:  'forward',   // Документ перенаправлен
  DONE:     'done',      // Пользователь выполнил
}
export const JOURNAL = {
  INCOMING:         1, // Входящий
  INNER:            2, // Внутренние
  OUTGOING:         3, // Исходящие
  APPEALS:          4, // Обращение
  ORDERS_PROTOCOLS: 5, // Приказы и распоряжения
  APPLICATION:      7, // Заявления
}
export const JOURNAL_CODES = {
  INCOMING:         '100', // Входящий
  INNER:            '103', // Внутренние
  OUTGOING:         '101', // Исходящие
  APPEALS:          '105', // Обращение
  ORDERS_PROTOCOLS: '104', // Приказы и распоряжения
  APPLICATION:      '106', // Заявления
}
export const COMPOSE_DOCUMENT_TYPES = {
  NOTICE: '1',
  ORDER: '2',
  INNER: '3',
  APPLICATION: '5'
}
export const COMPOSE_DOCUMENT_SUB_TYPES = {
  LABOR_LEAVE: '1',
  BUSINESS_TRIP: '2',
  SERVICE_LETTER: '3',
  BUSINESS_TRIP_ORDER: '4',
  MATERIAL_SUPPORT: '5',
  EDUCATIONAL_LEAVE: '6',
  VACATION_OWN_EXPENSE: '7',
  CHILD_CARE_LEAVE: '8',
  APPLICATION: '27',
}
export const COLOR_TYPES = {
  PRIMARY: "primary",
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success"
}
export const SIZE_TYPES = {
  XL: "xl",
  LG: "lg",
  MD: "md",
  SM: "sm",
  XS: "xs"
}
export const PRIORITY_TYPES = {
  HIGH: 4,    // Высокий
  MIDDLE: 5,  // Средний
  LOW: 6      // Низкий
}
export const PRIORITY_COLORS = {
  HIGH: COLOR_TYPES.ERROR,        // Высокий
  MIDDLE: COLOR_TYPES.WARNING,    // Средний
  LOW: COLOR_TYPES.SUCCESS        // Низкий
}
export const STATUS_TYPES = {
  TODO: 8,
  IN_PROGRESS: 9,
  ON_HOLD: 10,
  FOR_SIGNATURE: 11,
  ON_REVIEW: 12,
  DONE: 13,
  CANCEL: 14,
}
export const STATUS_COLORS = {
  TODO: COLOR_TYPES.PRIMARY,            // TO DO
  IN_PROGRESS: COLOR_TYPES.WARNING,     // IN PROGRESS
  ON_HOLD: COLOR_TYPES.WARNING,         // ON HOLD
  FOR_SIGNATURE: COLOR_TYPES.WARNING,   // FOR SIGNATURE
  ON_REVIEW: COLOR_TYPES.WARNING,       // ON REVIEW
  DONE: COLOR_TYPES.SUCCESS,            // DONE
  CANCEL: COLOR_TYPES.ERROR,            // CANCEL
}
export const COMMENT_ACTIONS = {
  CREATE: 'create',
  EDIT: "edit",
  REPLY: "reply",
}
export const CONTENT_TYPES = {
  DOC_FLOW: 6,
  SEND_DOCUMENT: 30
}
export const RESOLUTION_TYPES = {
  ASSIGNMENT: "assignment",
  CONTROL: "control",
  FOR_NOTICE: "for_notice"
}
export const RESOLUTION_CREATE_TYPES = {
  REVIEW: "REVIEW",         // На рассмотрение
  ASSIGNMENT: "ASSIGNMENT"  // Входящий
}
export const PERFORMERS_TYPES = {
  CONTROL: "controller",       // Контролирующий
  RESPONSIBLE: "responsible",  // Ответ. исп.
  EXECUTOR: "executor"         // Исполнитель
}
export const ROLES = {
  CHAIRMAN: 'chairman',                            // Председатель
  FIRST_DEPUTY_CHAIRMAN: 'first_deputy_chairman',  // Первый заместитель председателя
  DEPUTY_CHAIRMAN: 'deputy_chairman'               // Заместитель председателя
}
export const METHODS = {
  GET :    "GET",
  POST:    "POST",
  PUT:     "PUT",
  DELETE:  "DELETE",
  HEAD:    "HEAD",
  OPTIONS: "OPTIONS",
  PATCH:   "PATCH"
}
export const API_LIST = {
  PROJECT_PERMISSIONS: "project-permissions"
}

export const TEMPLATE_OPTIONS = [
  {
    label: "today",
    active: false
  },
  {
    label: "yesterday",
    active: false
  },
  {
    label: "last-seven-days",
    active: false
  },
  {
    label: "last-two-weeks",
    active: false
  },
  {
    label: "this-month",
    active: false
  },
  {
    label: "last-month",
    active: false
  }
]

export const ROUTES_TYPE = [
  {
    label: "На машине",
    value: "by_car"
  },
  {
    label: "На автобусе",
    value: "by_bus"
  },
  {
    label: "На самолете",
    value: "by_plane"
  },
  {
    label: "На поезде",
    value: "by_train"
  }
]
export const SIGNER_TYPES = {
  BASIC_SIGNER: 'basic_signer',
  INVITED: 'invited',
  NEGOTIATOR: 'negotiator',
  SIGNER: 'signer'
}

