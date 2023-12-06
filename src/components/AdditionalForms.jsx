import {
  Button,
  FormControl,
  FormLabel,
  TableHead,
  TextField
} from "@mui/material";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useDispatch, useSelector} from "react-redux";
import {
  clearFoundPersonsWithWeightTable,
  setSearchWeight
} from "../store/slices/Persons/Persons.slice";
import {
  deletePersonsWithLocation,
  deletePersonsWithWeight,
  getPersonWithWeightLessThan,
  searchByHairColor,
  searchByNationalityAndHairColor
} from "../store/slices/Persons/Persons.thunks";
import {
  foundPersonsSelector, hairAndNationalityCountSelector, hairColorCountSelector,
  searchWeightSelector
} from "../store/slices/Persons/Persons.selectors";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {useState} from "react";

const AdditionalForms = () => {
  const foundPersons = useSelector(foundPersonsSelector);
  const searchWeight = useSelector(searchWeightSelector);
  const hairAndNationalityCount = useSelector(hairAndNationalityCountSelector);
  const hairColorCount = useSelector(hairColorCountSelector);

  const [weightToDelete, setWeightToDelete] = useState(null);
  const [locationToDelete, setLocationToDelete] = useState({
    x: 0,
    y: 0,
    name: ''
  })
  const [nationalityAndHairColor, setNationalityAndHairColor] = useState({
    nationality: '',
    hairColor: ''
  })
  const [hairColor, setHairColor] = useState('');

  const dispatch = useDispatch();
  const handleChangeWeight = (e) => {
    dispatch(setSearchWeight(e.target.value))
  }

  const handleSearchPersons = () => {
    dispatch(getPersonWithWeightLessThan())
  }

  const handleClearTable = () => {
    dispatch(clearFoundPersonsWithWeightTable())
  }

  const handleChangeWeightToDelete = (e) => {
    setWeightToDelete(e.target.value);
  }

  const handleDeletePersonsByWeight = () => {
    dispatch(deletePersonsWithWeight(weightToDelete));
  }

  const handleChangeLocationToDelete = (e) => {
    setLocationToDelete((prevState) => ({
      ...prevState,
     [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value    }))
  }

  const handleDeletePersonsByLocation = () => {
    dispatch(deletePersonsWithLocation(locationToDelete))
  }

  const handleChangeNationalityAndHairColor = (e) => {
    setNationalityAndHairColor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value    }))
  }

  const handleSearchByNationalityAndHairColor = () => {
    dispatch(searchByNationalityAndHairColor(nationalityAndHairColor));
  }

  const handleChangeHairColor = (e) => {
    setHairColor(e.target.value)
  }

  const handleSearchByHairColor = () => {
    dispatch(searchByHairColor(hairColor));
  }

  return (
    <Paper sx={{
      width: '100%',
      mb: 2
    }}>
      <FormControl sx={{
        p: 2,
      }}>
        <FormLabel>List of persons with weight less than</FormLabel>
        <TextField
          label={'Weight'}
          value={searchWeight}
          name={'weight'}
          inputProps={{
            type: 'number'
          }}
          onChange={handleChangeWeight}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <Box display='flex'>
          <Button variant='contained' sx={{
            m: 1
          }}
                  onClick={handleSearchPersons}
          >
            Найти
          </Button>
          <Button variant='outlined' sx={{
            m: 1
          }}
                  disabled={!(foundPersons.length > 0)}
                  onClick={handleClearTable}
          >
            Очистить
          </Button>
        </Box>
      </FormControl>
      {
        foundPersons.length > 0 && (
          <TableContainer sx={{
            width: '50%',
            minWidth: '500px'
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    variant='head'
                    padding={'normal'}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    variant='head'
                    padding={'normal'}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    variant='head'
                    padding={'normal'}
                  >
                    Weight
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foundPersons.map((row, index) => (
                  <TableRow key={row.name + index}>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
      <FormControl sx={{
        p: 2,
      }}>
        <FormLabel>Delete person with weight</FormLabel>
        <TextField
          label={'Weight'}
          value={weightToDelete}
          name={'weight'}
          inputProps={{
            type: 'number'
          }}
          onChange={handleChangeWeightToDelete}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <Box display='flex'>
          <Button variant='outlined' color='error' sx={{
            m: 1
          }}
                  disabled={!weightToDelete}
                  onClick={handleDeletePersonsByWeight}
          >
            Удалить
          </Button>
        </Box>
      </FormControl>
      <FormControl sx={{
        p: 2,
      }}>
        <FormLabel>Delete person with location</FormLabel>
        <TextField
          label={'X'}
          value={locationToDelete.x}
          name={'x'}
          inputProps={{
            type: 'number'
          }}
          onChange={handleChangeLocationToDelete}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <TextField
          label={'Y'}
          value={locationToDelete.y}
          name={'y'}
          inputProps={{
            type: 'number'
          }}
          onChange={handleChangeLocationToDelete}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <TextField
          label={'Name'}
          value={locationToDelete.name}
          name={'name'}
          onChange={handleChangeLocationToDelete}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <Box display='flex'>
          <Button variant='outlined' color='error' sx={{
            m: 1
          }}
                  disabled={!locationToDelete.x || !locationToDelete.y || !locationToDelete.name}
                  onClick={handleDeletePersonsByLocation}
          >
            Удалить
          </Button>
        </Box>
      </FormControl>
      <FormControl sx={{
        p: 2,
      }}>
        <FormLabel>Count of persons by hair color and nationality</FormLabel>
        <TextField
          label={'Nationality'}
          value={weightToDelete}
          name={'nationality'}
          onChange={handleChangeNationalityAndHairColor}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <TextField
          label={'Hair Color'}
          value={weightToDelete}
          name={'hairColor'}
          onChange={handleChangeNationalityAndHairColor}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <Box display='flex'>
          <Button variant='contained' sx={{
            m: 1
          }}
                  disabled={!nationalityAndHairColor.nationality || !nationalityAndHairColor.hairColor}
                  onClick={handleSearchByNationalityAndHairColor}
          >
            Найти
          </Button>
        </Box>
        {(hairAndNationalityCount || hairAndNationalityCount === 0) && (
          <p>
            Count: {hairAndNationalityCount}
          </p>
        )
        }
      </FormControl>
      <FormControl sx={{
        p: 2,
      }}>
        <FormLabel>Count of persons by hair</FormLabel>
        <TextField
          label={'Hair Color'}
          value={weightToDelete}
          name={'hairColor'}
          onChange={handleChangeHairColor}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            my: 2
          }}
          size='small'
        />
        <Box display='flex'>
          <Button variant='contained' sx={{
            m: 1
          }}
                  disabled={!hairColor}
                  onClick={handleSearchByHairColor}
          >
            Найти
          </Button>
        </Box>
        {(hairColorCount || hairColorCount === 0) && (
          <p>
            Count: {hairColorCount}
          </p>
        )
        }
      </FormControl>
    </Paper>
  )
}

export default AdditionalForms;