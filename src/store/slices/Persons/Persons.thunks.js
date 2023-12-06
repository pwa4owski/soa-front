import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  apiDefault,
  createFiltersQueryStr,
  createPageableQuery,
  createSortQueryStr,
  deleteJson,
  getJson,
  getPageParamsFromRes,
  postJson,
  putJson,
} from "../../../utils/helpers/network-helpers";
import {globalUrl, hairColorUrl, nationalityUrl, personsUrl} from "../../../utils/constants/common";
import {setPageParams} from "./Persons.slice";

export const getPersons = createAsyncThunk('persons/getPersons', async (_, {
  dispatch,
  getState
}) => {
  const pageParams = getState().persons.pageParams;
  const filters = getState().persons.filters;
  const sortFields = getState().persons.sortFields;

  const pageReqStr = createPageableQuery(pageParams, false);
  const filtersReqStr = createFiltersQueryStr(filters, true);
  const sortReqStr = createSortQueryStr(sortFields, true);

  try {
    const res = await apiDefault({
      apiCall: getJson,
      url: `${globalUrl}/${personsUrl}?${pageReqStr}${filtersReqStr}${sortReqStr}`,
      dispatch
    })

    const newPageParams = getPageParamsFromRes(res);

    dispatch(setPageParams(newPageParams));

    return res.content;
  } catch (e) {
    console.error('Error was caught during fetching Persons')
    return Promise.reject();
  }
})

export const getPersonById = createAsyncThunk(
  'persons/getPersonById',
  async (id, {
    dispatch,
  }) => {
    try {
      return await apiDefault({
        apiCall: getJson,
        url: `${globalUrl}/${personsUrl}/${id}`,
        dispatch
      })

    } catch (e) {
      console.error(`Error was caught during fetching person with id: ${id}`)
      return Promise.reject();
    }
  }
)

export const savePerson = createAsyncThunk('persons/savePerson', async (id, {
  dispatch,
  getState
}) => {
  const updatedPerson = getState().persons.personOnEdit;

  try {
    await apiDefault({
      apiCall: putJson,
      url: `${globalUrl}/${personsUrl}/${id}`,
      data: updatedPerson,
      dispatch
    })
    dispatch(getPersons());
  } catch (e) {
    console.error('Error was caught during saving persons update')
    return Promise.reject();
  }
})

export const deletePerson = createAsyncThunk(
  'persons/deletePerson',
  async (id, {
    dispatch,
  }) => {
    try {
      await apiDefault({
        apiCall: deleteJson,
        url: `${globalUrl}/${personsUrl}/${id}`,
        dispatch
      })
      dispatch(getPersons());
    } catch (e) {
      console.error(`Error was caught during deleting person with id: ${id}`)
      return Promise.reject();
    }
  }
)

export const createPerson = createAsyncThunk('persons/savePerson', async (_, {
  dispatch,
  getState
}) => {
  const newPerson = getState().persons.personOnEdit;
  try {
    await apiDefault({
      apiCall: postJson,
      url: `${globalUrl}/${personsUrl}`,
      data: newPerson,
      dispatch
    })
    dispatch(getPersons());
  } catch (e) {
    console.error('Error was caught during creating new person')
    return Promise.reject();
  }
})

export const getPersonWithWeightLessThan = createAsyncThunk(
  'persons/getPersonWithWeightLessThan',
  async (_, {
    dispatch,
    getState
  }) => {
    const searchWeight = getState().persons.personsWithWeightLessThan.searchValue;

    try {
      return await apiDefault({
        apiCall: getJson,
        url: `${globalUrl}/${personsUrl}/weight-less/${searchWeight}`,
        dispatch
      });
    } catch (e) {
      console.error(`Error was caught during fetching persons with weight less than ${searchWeight}`)
      return Promise.reject();
    }
  }
)

export const deletePersonsWithWeight = createAsyncThunk(
  'persons/deletePersonsWithWeight',
  async (weight, {
    dispatch,
    getState,
  }) => {
    const foundPersons = getState().persons.personsWithWeightLessThan.foundPersons;

    try {
      await apiDefault({
        apiCall: deleteJson,
        url: `${globalUrl}/${personsUrl}/weight/${weight}`,
        dispatch
      })

      dispatch(getPersons())
      if (foundPersons.length > 0) {
        dispatch(getPersonWithWeightLessThan())
      }
    } catch (e) {
      console.error(`Error was caught during deleting persons with weight ${weight}`)
      return Promise.reject();
    }
  }
)

export const deletePersonsWithLocation = createAsyncThunk(
  'persons/deletePersonsWithLocation',
  async (location, {
    dispatch,
    getState,
  }) => {
    const foundPersons = getState().persons.personsWithWeightLessThan.foundPersons;
    try {
      await apiDefault({
        apiCall: putJson,
        url: `${globalUrl}/${personsUrl}/location`,
        data: location,
        dispatch
      })
      dispatch(getPersons())
      if (foundPersons.length > 0) {
        dispatch(getPersonWithWeightLessThan())
      }
    } catch (e) {
      console.error(`Error was caught during deleting persons with location x: ${location.x}, y: ${location.y}, name: ${location.name}`)
      return Promise.reject();
    }
  }
)

export const searchByNationalityAndHairColor = createAsyncThunk(
  'persons/searchByNationalityAndHairColor',
  async ({
    nationality,
    hairColor
  }, {
    dispatch,
  }) => {
    try {
      const res = await apiDefault({
        apiCall: getJson,
        url: `${globalUrl}/${nationalityUrl}/${nationality}/${hairColorUrl}/${hairColor}`,
        dispatch
      })

      return res.count;
    } catch (e) {
      console.error(`Error was caught during getting persons count with nationality: ${nationality}, hairColor: ${hairColor}`)
      return Promise.reject();
    }
  }
)

export const searchByHairColor = createAsyncThunk(
  'persons/searchByHairColor',
  async (hairColor, {
    dispatch,
  }) => {
    try {
      const res = await apiDefault({
        apiCall: getJson,
        url: `${globalUrl}/${hairColorUrl}/${hairColor}`,
        dispatch
      })

      return res.count;
    } catch (e) {
      console.error(`Error was caught during getting persons count with hairColor: ${hairColor}`)
      return Promise.reject();
    }
  }
)
