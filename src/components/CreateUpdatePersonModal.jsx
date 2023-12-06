import {
  Button,
  CircularProgress,
  FormControl, FormGroup, FormLabel,
  Modal,
  Stack,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  personOnEditSelector,
  singlePersonStatusSelector
} from "../store/slices/Persons/Persons.selectors";
import {getISOSDate} from "../utils/helpers/data-helpers";
import {statuses} from "../utils/constants/common";
import {changePersonOnEdit} from "../store/slices/Persons/Persons.slice";
import {
  createPerson,
  deletePerson,
  savePerson
} from "../store/slices/Persons/Persons.thunks";
import {useMemo} from "react";

const CreateUpdatePersonModal = ({
  isOpen,
  onClose,
  isEditMode
}) => {
  const dispatch = useDispatch();

  const personOnEdit = useSelector(personOnEditSelector);
  const singlePersonStatus = useSelector(singlePersonStatusSelector);

  const areEmptyFields = useMemo(() => {
    return Object.values(personOnEdit).some(field => {
      if (typeof field === 'object') {
        return Object.values(field).some(nestedField => !nestedField)
      } else {
        return !field;
      }
    })
  }, [personOnEdit])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minHeight: 200,
    maxHeight: 4 / 5,
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    '& .MuiTextField-root': {
      m: 1
    }
  };

  const handleChangeValue = (event) => {
    const splitedFieldName = event.target.name.split('.');
    dispatch(changePersonOnEdit({
      value: event.target.value.trim(),
      field: splitedFieldName[0],
      ...(splitedFieldName.length > 1 && {nestedField: splitedFieldName[1]})
    }))
  }

  const handleSavePerson = () => {
    dispatch(savePerson(personOnEdit.id));
    onClose();
  }


  const handleDeletePerson = () => {
    dispatch(deletePerson(personOnEdit.id));
    onClose();
  }

  const handleCreatePerson = () => {
    dispatch(createPerson());
    onClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={style}>
        {singlePersonStatus === statuses.PENDING &&
          <Stack direction="row"
                 justifyContent='center'
                 height='168px'
                 alignItems='center'>
            <CircularProgress/>
          </Stack>
        }
        {singlePersonStatus !== statuses.PENDING && (
          <>
            <Typography variant="h6" component="h2">
              Person View
            </Typography>
            <FormControl sx={{
              display: 'flex'
            }}>
              <TextField
                required={!isEditMode}
                label={'ID'}
                value={personOnEdit.id}
                name={'id'}
                inputProps={{
                  type: 'number'
                }}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
                size='small'
              />
              <TextField
                required={!isEditMode}
                label={'Name'}
                value={personOnEdit.name}
                name={'name'}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
                size='small'
              />
              <TextField
                required={!isEditMode}
                label={'Height'}
                value={personOnEdit.height}
                name={'height'}
                inputProps={{
                  type: 'number'
                }}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
                size='small'
              />
              <TextField
                required={!isEditMode}
                label={'Birthday'}
                value={getISOSDate(new Date(personOnEdit.birthday))}
                name={'birthday'}
                type='date'
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
                size='small'
              />
              <TextField
                required={!isEditMode}
                label={'Weight'}
                value={personOnEdit.weight}
                name={'weight'}
                inputProps={{
                  type: 'number'
                }}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
                size='small'
              />
              <TextField
                required={!isEditMode}
                label={'Nationality'}
                value={personOnEdit.nationality}
                name={'nationality'}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
                size='small'
              />
              <TextField
                required={!isEditMode}
                label={'Hair Color'}
                value={personOnEdit.hairColor}
                name={'hairColor'}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
                size='small'
              />
              <FormGroup>
                <FormLabel sx={{fontSize: '14px'}}>Coordinates</FormLabel>
                <TextField
                  required={!isEditMode}
                  label={'X'}
                  value={personOnEdit.coordinates.x}
                  name={'coordinates.x'}
                  inputProps={{
                    type: 'number'
                  }}
                  onChange={handleChangeValue}
                  InputLabelProps={{
                    shrink: true
                  }}
                  size='small'
                />
                <TextField
                  required={!isEditMode}
                  label={'Y'}
                  value={personOnEdit.coordinates.y}
                  name={'coordinates.y'}
                  inputProps={{
                    type: 'number'
                  }}
                  onChange={handleChangeValue}
                  InputLabelProps={{
                    shrink: true
                  }}
                  size='small'
                />
              </FormGroup>
              <FormGroup>
                <FormLabel sx={{fontSize: '14px'}}>Location</FormLabel>
                <TextField
                  required={!isEditMode}
                  label={'X'}
                  value={personOnEdit.location.x}
                  name={'location.x'}
                  inputProps={{
                    type: 'number'
                  }}
                  onChange={handleChangeValue}
                  InputLabelProps={{
                    shrink: true
                  }}
                  size='small'
                />
                <TextField
                  required={!isEditMode}
                  label={'Y'}
                  value={personOnEdit.location.y}
                  name={'location.y'}
                  inputProps={{
                    type: 'number'
                  }}
                  onChange={handleChangeValue}
                  InputLabelProps={{
                    shrink: true
                  }}
                  size='small'
                />
                <TextField
                  required={!isEditMode}
                  label={'Name'}
                  value={personOnEdit.location.name}
                  name={'location.name'}
                  onChange={handleChangeValue}
                  InputLabelProps={{
                    shrink: true
                  }}
                  size='small'
                />
              </FormGroup>
              <Box sx={{
                display: 'flex',
                m: 1,
                gap: 2,
                justifyContent: 'right'
              }}>
                {isEditMode ?
                 <>
                   <Button variant="outlined"
                           color='error'
                           onClick={handleDeletePerson}>Удалить</Button>
                   <Button variant="contained" sx={{
                     boxShadow: 'none'
                   }}
                           onClick={handleSavePerson}
                   >Сохранить</Button>
                 </> :
                 <Button variant="contained" sx={{
                   boxShadow: 'none'
                 }}
                         onClick={handleCreatePerson}
                         disabled={areEmptyFields}
                 >Сохранить</Button>
                }
              </Box>
            </FormControl>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default CreateUpdatePersonModal;