export const INTERACTION_ABS_COLUMNS = "INTERACTION_ABS_COLUMNS"
  
export const HEADERS = {
  EMPLOYEE: 'employee',
  POSITION: 'position',
  COMPANY: 'company',
  DEPARTMENT: 'department',
  DOCUMENT_TYPE: 'documentType',
  DOCUMENT_SUB_TYPE: 'documentSubType',
  OPERATION_TYPE: 'operationType',
  STATUS_ABS: 'statusAbs',
  HISTORY: 'history',
  TYPE: 'type',
  ACTIONS: 'actions',
  CREATE_DATE: 'createDate',
  REQUEST_ID: 'requestId',
} 

export const HEADERS_TITLE = {
  [HEADERS.EMPLOYEE]: 'employee',
  [HEADERS.POSITION]: 'position',
  [HEADERS.COMPANY]: 'branch',
  [HEADERS.DEPARTMENT]: 'department',
  [HEADERS.DOCUMENT_TYPE]: 'document-name',
  [HEADERS.DOCUMENT_SUB_TYPE]: 'document-type',
  [HEADERS.OPERATION_TYPE]: 'operation-type',
  [HEADERS.STATUS_ABS]: 'status-abs',
  [HEADERS.HISTORY]: 'history',
  [HEADERS.TYPE]: 'type',
  [HEADERS.ACTIONS]: 'actions',
  [HEADERS.CREATE_DATE]: 'created-date',
  [HEADERS.REQUEST_ID]: 'request-id'
}

export const STATUS_ABS = {
  SENT: "sent",
  FAILED: "failed",
  CREATE: "create",
  PROLONG: "prolong",
  CANCEL: "cancel"
}

export const STATUS_ABS_TITLE = {
  [STATUS_ABS.SENT]: 'sent',
  [STATUS_ABS.FAILED]: 'failed',
  [STATUS_ABS.CREATE]: 'create',
  [STATUS_ABS.PROLONG]: 'prolong',
  [STATUS_ABS.CANCEL]: 'cancel',
}

export const OPERATION_TYPE = {
  SENT: "sent",
  FAILED: "failed",
  CREATE: "create",
  PROLONG: "prolong",
  CANCEL: "cancel"
}

export const OPERATION_TYPE_TITLE = {
  [OPERATION_TYPE.SENT]: 'sent',
  [OPERATION_TYPE.FAILED]: 'failed',
  [OPERATION_TYPE.CREATE]: 'create',
  [OPERATION_TYPE.PROLONG]: 'prolong',
  [OPERATION_TYPE.CANCEL]: 'cancel',
}

export const TYPE = {
  ORDER: "order",
  TRIP: "trip",
  TRIP_EXTEND: "trip_extend",
  TRIP_CANCEL: "trip_cancel",
  TRIP_PROLONG: "trip_prolong",
}