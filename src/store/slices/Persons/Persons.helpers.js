import {statuses} from "../../../utils/constants/common";

export const initialPageParams = {
  totalPages: 0,
  totalElements: 0,
  pageNumber: 0,
  pageSize: 5,
  last: true,
}

export const initialFilterField = {
  searchStr: '',
  chosenValue: '',
  operation: 'eq',
  checked: false
}

export const initialSortField = {
  order: 'asc',
  checked: false
}

export const initialSortFields = {
  id: initialSortField,
  name: initialSortField,
  'coordinates.x': initialSortField,
  'coordinates.y': initialSortField,
  creationDate: initialSortField,
  birthday: initialSortField,
  height: initialSortField,
  weight: initialSortField,
  nationality: initialSortField,
  'location.x': initialSortField,
  'location.y': initialSortField,
  'location.name': initialSortField,
  hairColor: initialSortField,
}

export const initialFilter = {
  id: initialFilterField,
  name: initialFilterField,
  'coordinates.x': initialFilterField,
  'coordinates.y': initialFilterField,
  creationDate: initialFilterField,
  birthday: initialFilterField,
  height: initialFilterField,
  weight: initialFilterField,
  nationality: initialFilterField,
  'location.x': initialFilterField,
  'location.y': initialFilterField,
  'location.name': initialFilterField,
  hairColor: initialFilterField,
}

export const emptyPerson = {
  id: '',
  name: '',
  coordinates: {
    x: '',
    y: ''
  },
  height: '',
  birthday: '',
  weight: '',
  nationality: '',
  location: {
    x: '',
    y: '',
    name: ''
  },
  hairColor: ''
}

export const initialPersonsWithWeightLessThan = {
  searchValue: '',
  foundPersons: []
}

export const personsInitialState = {
  entities: [],
  personOnEdit: emptyPerson,
  singlePersonStatus: statuses.IDLE,
  personsWithWeightLessThan: initialPersonsWithWeightLessThan,
  personsWithNationalityAndHairColor: null,
  personsWithHairColor: null,
  sortFields: initialSortFields,
  filters: initialFilter,
  pageParams: initialPageParams,
  status: statuses.IDLE
}

export const changeSortField = (field) => {
  const newField = {
    ...field,
  }
  if (newField.checked) {
    if (newField.order === 'asc') {
      newField.order = 'desc'
    } else {
      newField.order = 'asc'
      newField.checked = false;
    }
  } else {
    newField.checked = true;
  }
  return newField;
}

export const operations = {
  eq: '=',
  ne: '!=',
  gt: '>',
  lt: '<',
  lte: '<=',
  gte: '>='
}

export const filterOperationTypes = [
  {
    id: 'eq',
    label: operations.eq
  },
  {
    id: 'ne',
    label: operations.ne
  },
  {
    id: 'gt',
    label: operations.gt
  },
  {
    id: 'lt',
    label: operations.lt
  },
  {
    id: 'lte',
    label: operations.lte
  },
  {
    id: 'gte',
    label: operations.gte
  },
]

export const personModals = {
  NONE: 'none',
  EDIT: 'edit',
  CREATE: 'create'
}
