import {
  DEFAULT_LOADING_TIMEOUT,
  messageErrorLessThen500,
  messageErrorMoreThen500,
  PRIMARY_TIMEOUT
} from "../constants/common";
import {
  setNewError,
} from "../../store/slices/Errors/Errors.slice";

const createRequest = (method) => {
  return (url, data) => {
    return fetch(url, {
      method,
      body: data && JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const getJson = createRequest('GET');
export const postJson = createRequest('POST');
export const deleteJson = createRequest('DELETE');
export const putJson = createRequest('PUT');

export const getPageParamsFromRes = (res) => {
  return {
    totalPages: res.totalPages,
    totalElements: res.totalElements,
    pageNumber: res.pageNumber,
    pageSize: res.pageSize,
    last: res.last
  }
}

export const createPageableQuery = (pageParams, needAmpersand = false) => {
  const page = pageParams.pageNumber;
  return `${needAmpersand ? '&' : ''}page=${page}&size=${pageParams.pageSize}`;
}

export const createFiltersQueryStr = (filters, needAmpersand = false) => {
  const queryStr = Object.keys(filters).reduce((acc, field) => {
    if (filters[field].chosenValue) {
      let filterValue = filters[field].chosenValue;
      if (field === 'creationDate' || field === 'birthday') {
        filterValue = new Date(filters[field].chosenValue).toJSON();
      }
      const encodedStr = encodeURIComponent(
        `${field}[${filters[field].operation}]=${filterValue}`
      );
      acc += `filter=${encodedStr}&`
    }
    return acc;
  }, '')
  if (!queryStr) {
    return ''
  } else {
    const resulstQueryStr = queryStr.slice(0, -1)
    return `${needAmpersand ? '&' : ''}${resulstQueryStr}`
  }
}

export const createSortQueryStr = (sort, needAmpersand = false) => {
  const queryStr = Object.keys(sort).reduce((acc, field) => {
    if (sort[field].checked) {
      acc += `sort=${field}%2C${sort[field].order}&`
    }
    return acc;
  }, '')

  if (!queryStr) {
    return ''
  } else {
    const resulstQueryStr = queryStr.slice(0, -1)
    return `${needAmpersand ? '&' : ''}${resulstQueryStr}`
  }
}


export const apiDefault = async ({
  apiCall,
  url,
  data = null,
  dispatch
}) => {
  const timeout = setTimeout(() => {
    throw new Error('Превышено время ожидания ответа')
  }, PRIMARY_TIMEOUT)
  try {
    const res = await withTimeout(() => apiCall(url, data), DEFAULT_LOADING_TIMEOUT);
    fulfillResponse(
      res,
      {
        dispatch,
        timeout
      }
    )
    return await res.json();
  } catch (e) {
    return rejectError(
      e,
      {
        dispatch,
        timeout
      }
    )
  }
}

export const fulfillResponse = (res, {
  dispatch,
  timeout
}) => {
  clearTimeout(timeout)
  if (res.status >= 400) {
    const message = res.status >= 500 ?
        messageErrorMoreThen500 :
        messageErrorLessThen500

    res.json().then(data => {
      const alertMessage = Object.entries(data).reduce((acc, entry) => {
        return acc + `${entry[0]}: ${entry[1]}\n`
      }, `${message}\n`)
      alert(alertMessage);
    })
    return dispatch(setNewError({
      path: res.url,
      status: res.status,
      message
    }))
  }
}
export const rejectError = (e, {
  dispatch,
  timeout
}) => {
  clearTimeout(timeout)
  if (e.stack === 'TypeError: Failed to fetch') {
    dispatch(setNewError({
      message: 'Нет ответа от сервера'
    }))
  } else {
    dispatch(setNewError({
      message: e.message
    }))
  }

  return Promise.reject(e)
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const withTimeout = async (cb, timeout) => {
  await sleep(timeout)
  return cb();
}