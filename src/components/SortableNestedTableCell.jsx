import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import {useDispatch, useSelector} from "react-redux";
import {checkSortField} from "../store/slices/Persons/Persons.slice";
import {sortFieldsSelector} from "../store/slices/Persons/Persons.selectors";

const SortableNestedTableCell = ({
  headCell,
  padding = 'normal',
  sortable
}) => {
  const sort = useSelector(sortFieldsSelector);

  const dispatch = useDispatch();

  const isSortActive = sort[headCell.id]?.checked;
  const sortDirection = sort[headCell.id]?.order;
  const headCellSortDirection = headCell.sortable ?
                                sortDirection :
                                false;
  const isDateCell = headCell.id.includes('creationDate') || headCell.id.includes(
    'birthday');

  const handleSortLabelClick = () => {
    dispatch(checkSortField(headCell.id));
  }

  return (
    <TableCell
      align={'left'}
      sortDirection={headCellSortDirection}
      sx={{
        whiteSpace: 'nowrap',
        ...(padding === 'none' && {
          borderBottom: 'none'
        })
      }}
      variant='head'
      padding={padding}
    >
      {!headCell.nestedCells ? (

                               <TableCell variant='head'
                                          colSpan={headCell.nestedCells?.length || 1}
                                          align='left'
                                          sx={{
                                            borderBottom: 'none',
                                            p: 0,
                                            ...(isDateCell && {
                                              minWidth: 80
                                            })
                                          }}>
                                 {headCell.sortable ?
                                  <TableSortLabel
                                    active={isSortActive}
                                    colSpan={headCell.nestedCells?.length || 1}
                                    direction={isSortActive ? sort[headCell.id].order : 'asc'}
                                    onClick={handleSortLabelClick}
                                  >
                                    {headCell.label}
                                  </TableSortLabel> :
                                  headCell.label}
                               </TableCell>
                             ) :
       <>
         <TableRow>
           <TableCell variant='head'
                      colSpan={headCell.nestedCells.length}
                      align='left'
                      sx={{
                        p: '0 0 16px 0',
                      }}>
             {headCell.sortable ?
              <TableSortLabel
                active={isSortActive}
                direction={isSortActive ? sort[headCell.id].order : 'asc'}
                onClick={handleSortLabelClick}
              >
                {headCell.label}
              </TableSortLabel> :
              headCell.label}
           </TableCell>
         </TableRow>
         {headCell.nestedCells.map(nestedHeadCell => (
           <SortableNestedTableCell headCell={nestedHeadCell}
                                    padding='none'
                                    key={nestedHeadCell.id}
                                    sortable={nestedHeadCell.sortable}
           />
         ))}
       </>
      }
    </TableCell>
  )
}

export default SortableNestedTableCell;