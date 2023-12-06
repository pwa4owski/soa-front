import {TableRow, TableHead} from "@mui/material";
import {headCells} from "../utils/helpers/data-helpers"
import SortableNestedTableCell from "./SortableNestedTableCell";

const EnhancedTableHead = () => {

  return (<TableHead>
    <TableRow>
      {headCells.map((headCell) => (
          <SortableNestedTableCell
            headCell={headCell}
            key={headCell.id}
            sortable={headCell.sortable}
          />
        )
      )}
    </TableRow>
  </TableHead>);
}

export default EnhancedTableHead;
