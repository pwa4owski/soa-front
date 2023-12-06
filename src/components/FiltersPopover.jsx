import * as React from 'react';
import Popover from '@mui/material/Popover';
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import {
  Badge,
  Button,
  FormGroup,
  FormLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {filtersSelector} from "../store/slices/Persons/Persons.selectors";
import {
  applyFilters, clearAllFilters, clearFilterField,
  setFilterOperation,
  setFilterSearchStr
} from "../store/slices/Persons/Persons.slice";
import {useMemo} from "react";
import {filterTypes} from "../utils/constants/common";
import FilterField from "./FilterField";

const FiltersPopover = () => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const filters = useSelector(filtersSelector);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filters-popover' : undefined;

  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).filter(filterField => filterField.chosenValue).length;
  }, [filters])

  const handleFilterValueChange = (event) => {
    dispatch(setFilterSearchStr({
      field: event.target.name,
      value: event.target.value
    }))
  }

  const handleFilterOperationChange = (event) => {
    dispatch(setFilterOperation({
      field: event.target.name,
      value: event.target.value
    }))
  }

  const handleApplyFilters = () => {
    dispatch(applyFilters());
  }

  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
  }

  const handleClearFilterField = (field) => () => {
    dispatch(clearFilterField(field));
  }

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={activeFiltersCount} color="error">
          <FilterListIcon/>
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box
          component="form"
          sx={{
            p: 1,
            '& .MuiInputBase-input': {
              width: '25ch'
            },
            '& .MuiTextField-root': {
              m: 1,
            }
          }}
          noValidate
          autoComplete="off"
        >
          <FormLabel sx={{
            fontWeight: '600'
          }}>Filters</FormLabel>
          <div>
            <FilterField
              filter={filters.id}
              name='id'
              label='ID'
              filterType={filterTypes.NUMBER}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('id')}
            />
            <FilterField
              filter={filters.name}
              name='name'
              label='Name'
              filterType={filterTypes.TEXT}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('name')}
            />
            <FilterField
              filter={filters.creationDate}
              name='creationDate'
              label='Creation Date'
              filterType={filterTypes.DATE}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('creationDate')}
            />
            <FilterField
              filter={filters.height}
              name='height'
              label='Height'
              filterType={filterTypes.NUMBER}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('height')}
            />
            <FilterField
              filter={filters.weight}
              name='weight'
              label='Weight'
              filterType={filterTypes.NUMBER}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('weight')}
            />
            <FilterField
              filter={filters.birthday}
              name='birthday'
              label='Birthday'
              filterType={filterTypes.DATE}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('birthday')}
            />
            <FilterField
              filter={filters.nationality}
              name='nationality'
              label='Nationality'
              filterType={filterTypes.TEXT}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('nationality')}
            />
            <FilterField
              filter={filters.hairColor}
              name='hairColor'
              label='Hair Color'
              filterType={filterTypes.TEXT}
              handleChangeFilterSearchStr={handleFilterValueChange}
              handleChangeFilterOperation={handleFilterOperationChange}
              handleClearFilterField={handleClearFilterField('hairColor')}
            />
            <FormGroup>
              <FormLabel sx={{fontSize: '14px'}}>Coordinates</FormLabel>
              <FilterField
                filter={filters['coordinates.x']}
                name='coordinates.x'
                label='X'
                filterType={filterTypes.NUMBER}
                handleChangeFilterSearchStr={handleFilterValueChange}
                handleChangeFilterOperation={handleFilterOperationChange}
                handleClearFilterField={handleClearFilterField('coordinates.x')}
              />
              <FilterField
                filter={filters['coordinates.y']}
                name='coordinates.y'
                label='Y'
                filterType={filterTypes.NUMBER}
                handleChangeFilterSearchStr={handleFilterValueChange}
                handleChangeFilterOperation={handleFilterOperationChange}
                handleClearFilterField={handleClearFilterField('coordinates.y')}
              />

            </FormGroup>
            <FormGroup>
              <FormLabel sx={{fontSize: '14px'}}>Location</FormLabel>
              <FilterField
                filter={filters['location.x']}
                name='location.x'
                label='X'
                filterType={filterTypes.NUMBER}
                handleChangeFilterSearchStr={handleFilterValueChange}
                handleChangeFilterOperation={handleFilterOperationChange}
                handleClearFilterField={handleClearFilterField('location.x')}
              />
              <FilterField
                filter={filters['location.y']}
                name='location.y'
                label='Y'
                filterType={filterTypes.NUMBER}
                handleChangeFilterSearchStr={handleFilterValueChange}
                handleChangeFilterOperation={handleFilterOperationChange}
                handleClearFilterField={handleClearFilterField('location.y')}
              />
              <FilterField
                filter={filters['location.name']}
                name='location.name'
                label='Name'
                filterType={filterTypes.TEXT}
                handleChangeFilterSearchStr={handleFilterValueChange}
                handleChangeFilterOperation={handleFilterOperationChange}
                handleClearFilterField={handleClearFilterField('location.name')}
              />
            </FormGroup>
          </div>
        </Box>
        <Box sx={{
          display: 'flex',
          m: 1,
          gap: 2,
          justifyContent: 'right'
        }}>
          <Button variant="outlined"
                  color='error'
                  onClick={handleClearAllFilters}>Очистить</Button>
          <Button variant="contained" sx={{
            boxShadow: 'none'
          }}
                  onClick={handleApplyFilters}
          >Применить</Button>
        </Box>
      </Popover>
    </div>
  );
}

export default FiltersPopover;