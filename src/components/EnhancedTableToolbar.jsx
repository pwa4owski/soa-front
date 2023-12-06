import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FiltersPopover from "./FiltersPopover";

const EnhancedTableToolbar = () => {

  return (<Toolbar
    sx={{
      pl: {sm: 2},
      pr: {
        xs: 1,
        sm: 1
      },
    }}
  >
    <>
      <Typography
        sx={{flex: '1 1 100%'}}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Список Person
      </Typography>
      <FiltersPopover />
    </>
  </Toolbar>);
}

export default EnhancedTableToolbar;