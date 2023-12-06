export const headCells = [
  {
    id: 'id',
    label: 'ID',
    sortable: true
  },
  {
    id: 'name',
    label: 'Name',
    sortable: true
  },
  {
    id: 'coordinates',
    label: 'Coordinates',
    sortable: false,
    nestedCells: [
      {
        id: "coordinates.x",
        label: "x",
        sortable: true
      },
      {
        id: "coordinates.y",
        label: "y",
        sortable: true
      },
    ]
  },
  {
    id: 'creationDate',
    label: 'Creation Date',
    sortable: true,
    nestedCells: [
      {
        id: "creationDate.date",
        label: "Date",
        sortable: false
      },
      {
        id: "creationDate.time",
        label: "Time",
        sortable: false
      },
    ]
  },
  {
    id: 'height',
    label: 'Height',
    sortable: true,
  },
  {
    id: 'birthday',
    label: 'Birthday',
    sortable: true,
    nestedCells: [
      {
        id: "birthday.date",
        label: "Date",
        sortable: false
      },
      {
        id: "birthday.time",
        label: "Time",
        sortable: false
      },
    ]
  },
  {
    id: 'weight',
    label: 'Weight',
    sortable: true,
  },
  {
    id: 'nationality',
    label: 'Nationality',
    sortable: true,
  },
  {
    id: 'location',
    label: 'Location',
    sortable: false,
    nestedCells: [
      {
        id: "location.x",
        label: "x",
        sortable: true,
      },
      {
        id: "location.y",
        label: "y",
        sortable: true,
      },
      {
        id: "location.name",
        label: "Name",
        sortable: true,
      },
    ]
  },
  {
    id: 'hairColor',
    label: 'Hair color',
    sortable: true,
  },
];

export const createData = (
  id,
  name,
  coordinates,
  creationDate,
  height,
  birthday,
  weight,
  nationality,
  location,
  hairColor
) => {
  return {
    id,
    name,
    coordinates,
    creationDate,
    height,
    birthday,
    weight,
    nationality,
    location,
    hairColor
  };
}

export const getFilterDeps = (filters) => {
  return Object.values(filters).map(filter => filter.chosenValue);
}

export const getISOSDate = (date) => {
  return date.getFullYear() + '-' +
    ('0'+ (date.getMonth() + 1)).slice(-2) + '-' +
    ('0'+ date.getDate()).slice(-2);
}