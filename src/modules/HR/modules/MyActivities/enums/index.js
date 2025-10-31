
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

export const KIND = {
  LATE: "late",
  EARLY_LEAVE: "early_leave",
  ABSENT: "absent",
  MISSED_CHECKIN: "missed_checkin",
  MISSED_CHECKOUT: "missed_checkout",
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

export const CHECK_IN_STATUS = {
  CAME_ON_TIME: "came-on-time",
  EXCUSED: "excused",
  NO_ENTRY_MARKED: "no-entry-marked",
  LATE_ARRIVAL: "late-arrival",
  NOT_CAME: "not-came"
}

export const CHECK_OUT_STATUS = {
  EARLY_DEPARTURE: "early-departure",
  EXCUSED: "excused",
  NORMAL_EXIT: "normal-exit",
  NO_EXIT_MARKED: "no-exit-marked",
  NOT_CAME: "not-came"
}

export const ATTENDANCE_EXCEPTION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected"
}
