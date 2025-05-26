export const HEADERS = {
  EMPLOYEE: 'employee',
  POSITION: 'position',
  BRANCH: 'branch',
  DEPARTMENT: 'department',
  DOCUMENT_TYPE: 'documentType',
  DOCUMENT_SUB_TYPE: 'documentSubType',
  OPERATION_TYPE: 'operationType',
  STATUS_ABS: 'statusAbs',
  HISTORY: 'history',
  ACTIONS: 'actions'
} 

export const HEADERS_TITLE = {
  [HEADERS.EMPLOYEE]: 'employee',
  [HEADERS.POSITION]: 'position',
  [HEADERS.BRANCH]: 'branch',
  [HEADERS.DEPARTMENT]: 'department',
  [HEADERS.DOCUMENT_TYPE]: 'document-name',
  [HEADERS.DOCUMENT_SUB_TYPE]: 'document-type',
  [HEADERS.OPERATION_TYPE]: 'operation-type',
  [HEADERS.STATUS_ABS]: 'status-abs',
  [HEADERS.HISTORY]: 'history',
  [HEADERS.ACTIONS]: 'actions'
}

export const STATUS_ABS = {
  SUCCESS: "1",
  ERROR: "2"
}

export const STATUS_ABS_TITLE = {
  [STATUS_ABS.SUCCESS]: 'success',
  [STATUS_ABS.ERROR]: 'error'
}

export const OPERATION_TYPE = {
  CREATE: "1",
  CANCEL: "2",
  EXTEND: "3"
}

export const OPERATION_TYPE_TITLE = {
  [OPERATION_TYPE.CREATE]: 'create',
  [OPERATION_TYPE.CANCEL]: 'cancel',
  [OPERATION_TYPE.EXTEND]: 'extension'
}