export const PRIMARY_TIMEOUT = 150000;
export const DEFAULT_LOADING_TIMEOUT = 1000;

export const globalUrl = 'http://localhost:8080/demography-1.0/api';
export const personsUrl = 'persons';
export const nationalityUrl = 'nationality';
export const hairColorUrl = 'hairColor';

export const statuses = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

export const filterTypes = {
  TEXT: 'text',
  SELECT: 'select',
  NUMBER: 'number',
  DATE: 'date'
}

export const messageErrorMoreThen500 = 'Server Error:  Сервер недоступен';
export const messageErrorLessThen500 = 'Client Error:  Неудачный запрос на сервер';