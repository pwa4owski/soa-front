import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {rows} from "../mocks/personsMock";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  filtersSelector,
  pageParamsSelector,
  personsListStatusSelector,
  personsSelector,
  sortFieldsSelector
} from "../store/slices/Persons/Persons.selectors";
import {
  clearPersonOnEdit,
  setPage,
  setPageSize
} from "../store/slices/Persons/Persons.slice";
import {
  getPersonById,
  getPersons
} from "../store/slices/Persons/Persons.thunks";
import {getFilterDeps} from "../utils/helpers/data-helpers";
import CreateUpdatePersonModal from "./CreateUpdatePersonModal";
import {statuses} from "../utils/constants/common";
import {Button, CircularProgress, Stack} from "@mui/material";
import {personModals} from "../store/slices/Persons/Persons.helpers";

export default function TablePerson() {
  const [openedModal, setOpenedModal] = useState(personModals.NONE)

  const {
    pageSize: rowsPerPage,
    pageNumber: page,
    totalElements
  } = useSelector(pageParamsSelector);
  const persons = useSelector(personsSelector);
  const filters = useSelector(filtersSelector);
  const sortFields = useSelector(sortFieldsSelector);
  const status = useSelector(personsListStatusSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersons())
  }, [...getFilterDeps(filters), sortFields, page, rowsPerPage])


  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage))
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)));
    dispatch(setPage(0))
  };

  const emptyRows = page > 0 ? Math.max(
    0,
    (1 + page) * rowsPerPage - rows.length
  ) : 0;

  const handleModalClose = () => setOpenedModal(personModals.NONE);

  const handleClickPerson = (id) => () => {
    dispatch(getPersonById(id));
    setOpenedModal(personModals.EDIT);
  }

  const handleOpenCreatePersonModal = () => {
    dispatch(clearPersonOnEdit());
    setOpenedModal(personModals.CREATE)
  }

  return (<Box sx={{width: '100%'}}>
    <CreateUpdatePersonModal isOpen={openedModal !== personModals.NONE}
                             onClose={handleModalClose}
                             isEditMode={openedModal === personModals.EDIT}
    />
    <Paper sx={{
      width: '100%',
      mb: 2
    }}>
      <EnhancedTableToolbar/>
      <TableContainer>
        <Table
          sx={{minWidth: 750}}
          aria-labelledby="table of all persons"
        >
          <EnhancedTableHead/>
          <TableBody>
            {status === statuses.FULFILLED && persons.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (<TableRow
                key={row.id}
                sx={{
                  cursor: 'pointer'
                }}
                onClick={handleClickPerson(row.id)}
              >
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                >
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left" sx={{
                  display: 'flex'
                }}>
                  <TableCell align="left" sx={{
                    width: 1 / 2,
                    p: 0,
                    borderBottom: 'none'
                  }}>{row.coordinates.x}</TableCell>
                  <TableCell align="left" sx={{
                    width: 1 / 2,
                    p: 0,
                    borderBottom: 'none'
                  }}>{row.coordinates.y}</TableCell>
                </TableCell>
                <TableCell>
                  <TableCell align="left" sx={{
                    width: 1 / 2,
                    p: '0 5px 0 0',
                    borderBottom: 'none'
                  }}>{new Date(row.creationDate).toLocaleDateString()}</TableCell>
                  <TableCell align="left" sx={{
                    width: 1 / 2,
                    p: '0 0 0 5px',
                    borderBottom: 'none'
                  }}>{new Date(row.creationDate).toLocaleTimeString()}</TableCell>
                </TableCell>
                <TableCell align="left">{row.height}</TableCell>
                <TableCell>
                  <TableCell align="left" sx={{
                    width: 1 / 2,
                    p: '0 5px 0 0',
                    borderBottom: 'none'
                  }}>{new Date(row.birthday).toLocaleDateString()}</TableCell>
                  <TableCell align="left" sx={{
                    width: 1 / 2,
                    p: '0 0 0 5px',
                    borderBottom: 'none'
                  }}>{new Date(row.birthday).toLocaleTimeString()}</TableCell>
                </TableCell>
                <TableCell align="left">{row.weight}</TableCell>
                <TableCell align="left">{row.nationality}</TableCell>
                <TableCell align="left" sx={{
                  display: 'flex',
                  width: '100%',
                }}>
                  <TableCell align="left" sx={{
                    width: 1 / 3,
                    p: 0,
                    borderBottom: 'none'
                  }}>{row.location.x}</TableCell>
                  <TableCell align="left" sx={{
                    width: 1 / 3,
                    p: 0,
                    borderBottom: 'none'
                  }}>{row.location.y}</TableCell>
                  <TableCell align="left" sx={{
                    width: 1 / 3,
                    p: 0,
                    borderBottom: 'none'
                  }}>{row.location.name}</TableCell>
                </TableCell>
                <TableCell align="left">{row.hairColor}</TableCell>
              </TableRow>);
            })}
            {emptyRows > 0 || status !== statuses.FULFILLED && (<TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={14}>
                {status === statuses.PENDING &&
                  <Stack direction="row" justifyContent='center'>
                    <CircularProgress/>
                  </Stack>
                }
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button variant='outlined'
              onClick={handleOpenCreatePersonModal}
              sx={{m: 1}}>
        Create new person
      </Button>
    </Paper>
  </Box>);
}