import {Button, MenuItem, TextField} from "@mui/material";
import {
  filterOperationTypes,
  operations
} from "../store/slices/Persons/Persons.helpers";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import {filterTypes} from "../utils/constants/common";


const FilterField = ({
  filter,
  name,
  label,
  filterType,
  handleChangeFilterSearchStr,
  handleChangeFilterOperation,
  handleClearFilterField
}) => {
  const textAdditionalProps = {...(filterType === filterTypes.DATE && {type: 'date'}),
    ...(filterType === filterTypes.SELECT && {select: true}),
    ...(filterType === filterTypes.NUMBER && {inputProps: {type: 'number'}})}

  return (
    <Box display='flex' alignItems='center'>
      {!filter.chosenValue ?
       <>
         <TextField
           select
           value={filter.operation}
           size='small'
           sx={{
             width: '70px'
           }}
           name={name}
           onChange={handleChangeFilterOperation}
         >
           {filterOperationTypes.map((option) => (
             <MenuItem key={option.id} value={option.id}>
               {option.label}
             </MenuItem>
           ))}
         </TextField>
         <TextField
           label={label}
           value={filter.searchStr}
           name={name}
           {...textAdditionalProps}
           onChange={handleChangeFilterSearchStr}
           InputLabelProps={{
             shrink: true
           }}
           size='small'
         /></> :
       <>
         <Typography sx={{
           p: 1
         }}>
           {label} {operations[filter.operation]} {filter.chosenValue}
         </Typography>
         <Button color='error' onClick={handleClearFilterField}>Удалить</Button>
       </>
      }
    </Box>
  )
}

export default FilterField;