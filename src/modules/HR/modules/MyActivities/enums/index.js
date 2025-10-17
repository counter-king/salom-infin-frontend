export const WEEK_DAYS_RU = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
]

export const WEEK_DAYS_UZ = [
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
  'Yankshanba'
]

export const STATUS = {
  PANDING: "pending",
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived", 
  DECLINED: "declined"
}


export const ATTENDANCE_TYPE = {
  WORK_DAY: "WORK_DAY",          // ish kuni
  LABOR_LEAVE: "LABOR_LEAVE",     // трудовой отпуск
  SICK_LEAVE: "SICK_LEAVE",       // больничный отпуск
  WITHOUT_PAY: "WITHOUT_PAY",     // без содержания
  BUSINESS_TRIP: "BUSINESS_TRIP", // командировка
  ADDITIONAL_DAY_OFF: "ADDITIONAL_DAY_OFF",  // дополнительный выходной,
  LATE: "LATE",
  NO_DATA: "NO_DATA"
}
export const ATTENDANCE_TYPE_TITLES = {
  [ATTENDANCE_TYPE.LABOR_LEAVE]: "labor-leave",
  [ATTENDANCE_TYPE.SICK_LEAVE]: "sick-leave",
  [ATTENDANCE_TYPE.WITHOUT_PAY]: "without-content",
  [ATTENDANCE_TYPE.BUSINESS_TRIP]: "business-trip",
  [ATTENDANCE_TYPE.ADDITIONAL_DAY_OFF]: "additional-day-off",
  [ATTENDANCE_TYPE.LATE]: "late",
  [ATTENDANCE_TYPE.WORK_DAY]: "work-day",
  [ATTENDANCE_TYPE.NO_DATA]: "no-data"
}