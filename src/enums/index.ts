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
  INCOMING:             1, // Входящий
  INNER:                2, // Внутренние
  OUTGOING:             3, // Исходящие
  APPEALS:              4, // Обращение
  ORDERS_PROTOCOLS:     5, // Приказы и распоряжения
  APPLICATION:          7, // Заявления
  POWER_OF_ATTORNEY:    19, // Заявления
}
export const JOURNAL_CODES = {
  INCOMING:               '100', // Входящий
  INNER:                  '103', // Внутренние
  OUTGOING:               '101', // Исходящие
  APPEALS:                '105', // Обращение
  ORDERS_PROTOCOLS:       '104', // Приказы и распоряжения
  APPLICATION:            '106', // Заявления
  PROTOCOL:               '107', // Протокол
  DECISION:               '108', // Указ
  POWER_OF_ATTORNEY:      '109', // Доверенность
}
export const USER_STATUS_CODES = {
  OTHERS:                        'PR', // Прочие
  AUDIT_COMMISSION:              'AT', // Ревизионная комиссия
  BANK_COUNCIL:                  'AK', // Совет банка
  INTERNS:                       'AS', // Стажеры
  SICK_LEAVES:                   'B',  // Больничные
  BUSINESS_TRIP:                 'K',  // Командировка
  TRANSFER_TO_ANOTHER_BRANCH:    'SF', // Перевод другой филиал
  SUSPENDED_NOT_STAFF:           'KO', // Отстраненные (не штат.)
  DISMISSED_NOT_STAFF:           'KP', // Уволенные (не штат.)
  WORKERS_NOT_STAFF:             'KA', // Рабочие (не штат.)
  FROM_THE_CONTENT:              'OS', // С содержания
  NO_CONTENT:                    'OB', // Без содержания
  LABOR_LEAVE:                   'OT', // Трудовой отп.
  MILITARY_SERVICE:              'I',  // Воинская служба
  ACADEMICIAN_VACATION:          'AO', // Академик отп.
  STUDY_LEAVE:                   'OU', // Ученический отп.
  DECREE_3:                      'OF', // Декрет_3
  DECREE_2:                      'OD', // Декрет_2
  SICK_LEAVE_DECREE:             'DB', // Декрет больничный
  SUSPENDED:                     'PO', // Отстранен
  DISMISSAL_TRANSFER_TO_BRANCH:  'PF', // Увол. (пер. филиалу)
  DISMISSED:                     'P',  // Уволенные
  PART_TIMERS:                   'AP', // Совместители
  WORKERS:                       'A',  // Рабочие
  REJECTED:                      'SO', // Отклонен
  ON_THE_STATEMENTS:             'SU', // На утверждения
  INTRODUCED:                    'SV', // Введен
  APPROVED:                      'SA'  // Утвержден
}
export const COMPOSE_DOCUMENT_TYPES = {
  NOTICE:                        '1', // Рапорт
  ORDER:                         '2', // Приказ
  INNER:                         '3', // Внутренний
  DECREE:                        '4', // Распоряжение
  APPLICATION:                   '5', // Заявление
  POWER_OF_ATTORNEY:             '8'  // Доверенность
}
export const COMPOSE_DOCUMENT_SUB_TYPES = {
  LABOR_LEAVE:                         '1', // Трудовой отпуск
  BUSINESS_TRIP:                       '2', // Командировочный рапорт
  SERVICE_LETTER:                      '3', // Служебное письмо
  BUSINESS_TRIP_ORDER:                 '4', // Командировочный приказ
  MATERIAL_SUPPORT:                    '5', // Материалка
  EDUCATIONAL_LEAVE:                   '6', // Учебный отпуск
  VACATION_OWN_EXPENSE:                '7', // Отпуск за свой счет
  CHILD_CARE_LEAVE:                    '8', // Отпуск по уходу за ребенком
  ORDINARY_NOTICE:                     '9', // Рапорт
  // BUSINESS_TRIP_DECREE_FOREIGN:     '10', // Командировочный распоряжение (зарубежный)
  ORDERS_BANK_MANAGEMENT:              '18', // Приказ правления банка
  APPLICATION:                         '27', // Заявление
  BUSINESS_TRIP_DECREE_LOCAL:          '28', // Командировочный распоряжение (локальный)
  BUSINESS_TRIP_ORDER_LOCAL:           '29', // Командировочный приказ (локальный)
  NOTICE_FOR_EMPLOYMENT:               '30', // Рапорт на приеме на работу
  ORDER_FOR_EMPLOYMENT:                '31', // Приказ на приеме на работу
  POA_FOR_LEGAL_SERVICES:              '32', // Для юридических услуг
  POA_ACTING_FILIAL_MANAGER:           '33', // Исполняющий обязанности управляющего ЦБУ (бизнес)
  POA_DEPUTY_FILIAL_MANAGER_BUSINESS:  '34', // Заместитель управляющего ЦБУ
  BUSINESS_TRIP_NOTICE_V2:             '35', // Командировка 2
  BUSINESS_TRIP_DECREE_V2:             '36', // Командировочная распоряжения
  EXTEND_BUSINESS_TRIP_NOTICE:         '37', // Продлить командировку
  EXTEND_BUSINESS_TRIP_DECREE:         '38', // Продлить командировку распоряжения
  EXPLANATION_LETTER:                  '39', // Пояснительное письмо
  BUSINESS_TRIP_NOTICE_FOREIGN:        '40', // Командировка (зарубежная)
  BUSINESS_TRIP_DECREE_FOREIGN:        '41', // Командировочная распоряжения (зарубежная)
  POA_SECOND_TYPE_BSC_MANAGER:         '42', // Управление ЦБУ типа 2
  POA_DEPUTY_FILIAL_MANAGER_RETAIL:    '43', // Исполняющий обязанности управляющего ЦБУ (розничная)
  POA_BSO_MANAGER:                     '44', // Управляющий ОБУ
  POA_BSO_DEPUTY_MANAGER_BUSINESS:     '45', // Заместитель управляющего ОБУ (бизнес)
  POA_BSO_DEPUTY_MANAGER_RETAIL:       '46', // Заместитель управляющего ОБУ (розничная)
  POA_BSO_CLIENT_MANAGER:              '47', // Клиент менеджер ОБУ
  POA_ELECTRON_DIGITAL_SIGNATURE:      '48', // Электронная цифровая подпись
  POA_OPERATIVE_GROUP_HEAD:            '49', // Руководитель оперативной группы
  POA_EMPLOYER_REPRESENTATIVE:         '50', // Представитель работодателя
  POA_RETURN_ENFORCEMENT_DOCUMENT:     '51', // Возврат исполнительного документа
  POA_MEDIATION_AGREEMENT:             '52', // Посредническое соглашение
  POA_BSC_CLIENT_MANAGER:              '53', // Клиент менеджер ЦБУ
  POA_BSC_ELECTRON_DIGITAL_SIGNATURE:  '54', // Электронная цифровая подпись (ЦБУ)
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

export const NEWS_STATUS_TYPES = {
  NEW: 1,
  BLOG: 2,
  ANNOUNCEMENT: 3,
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
export const TRIP_STATUSES = [
  {
    title_uz: "Boshlanmagan",
    title_ru: "Не начато",
    value: "not_started",
    active: false
  },
  {
    title_uz: "Xizmat safarida",
    title_ru: "В командировке",
    value: "on_trip",
    active: false
  },
  {
    title_uz: "Hisobot topshrish",
    title_ru: "Предоставление отчета",
    value: "reporting",
    active: false
  },
  {
    title_uz: "Yakunlangan",
    title_ru: "Закрыто",
    value: "closed",
    active: false
  }
]

