import * as React from "react";
import {
  List,
  TableCell,
  TableRow,
  TableBody,
  ListItemText,
  ListItem,
  Container,
  Pagination,
  Divider,
  Tabs,
  Tab,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableFooter,
  FormControlLabel,
  TextField,
  Stack,
} from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import { BsInfoLg } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import { GoSettings } from "react-icons/go";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LayoutHome from "../layout/LayoutHome";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function paginator(items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items || 1,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
  //console.log(total_pages, items.length, per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}
export default function WarningHome() {
  const [value, setValue] = React.useState(0);

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  const [searchInput, setSearchInput] = React.useState("");
  const [alertsCollection, setAlertsCollection] = React.useState([]);
  const [usersCollection, setUsersCollection] = React.useState([]);
  const [filteredResults, setFilteredResults] = React.useState([]);

  const [listUpdated, setLisUpdated] = React.useState(false);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    //console.log(searchValue);
    if (searchInput !== "") {
      const filteredData = usersCollection.filter((data, i) => {
        return Object.values(data, i)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(usersCollection);
    }
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/user/userslist")
      .then((res) => {
        //console.log(res.data);
        setUsersCollection(res.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const count = Math.ceil(usersCollection.length / 1);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(paginator(usersCollection, value, 1).page);
  };
  const [checked, setChecked] = React.useState(true);

  const handleChange2 = (event) => {
    setChecked(event.target.checked);
    if (checkedBox) {
      setCheckedBox("");
    }
    if (checkedBox2) {
      setCheckedBox2("");
    }
    setChecked(!checked);
  };
  const [checkedBox, setCheckedBox] = React.useState(true);

  const handleChangeBox = (event) => {
    setCheckedBox(event.target.checkedBox);
    if (checkedBox) {
      setText("");
    }
    setCheckedBox(!checkedBox);
  };
  const [checkedBox2, setCheckedBox2] = React.useState(true);

  const handleChangeBox2 = (event) => {
    setCheckedBox2(event.target.checkedBox2);
    if (checkedBox2) {
      setText2("");
    }
    setCheckedBox2(!checkedBox2);
  };
  const [text, setText] = React.useState("");
  const [text2, setText2] = React.useState("");
  return (
    <div>
      <LayoutHome />
      <Box style={{ marginLeft: 100, marginTop: 10 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange1}
            aria-label="basic tabs example"
          >
            <Tab
              label="Warnings"
              {...a11yProps(0)}
              component={Link}
              to="/Warning"
            />
            <Tab label="Settings" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Paper
            variant="outlined"
            style={{
              width: 220,
              height: 100,
              borderColor: "black",
              backgroundColor: "#e53935",
            }}
          >
            <CloseIcon
              style={{ color: "white", fontSize: 70, paddingTop: 10 }}
            />
            <Typography
              style={{
                color: "white",
                marginTop: -60,
                marginLeft: 180,
                fontSize: 25,
              }}
            >
              6
            </Typography>

            <Typography style={{ color: "white", marginLeft: 110 }}>
              Critical Alerts
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            style={{
              width: 220,
              height: 100,
              borderColor: "black",
              backgroundColor: "#ffa000",
              marginLeft: 280,
              marginTop: -100,
            }}
          >
            <WarningAmberIcon
              style={{ color: "white", fontSize: 70, paddingTop: 10 }}
            />
            <Typography
              style={{
                color: "white",
                marginTop: -60,
                marginLeft: 180,
                fontSize: 25,
              }}
            >
              6
            </Typography>

            <Typography style={{ color: "white", marginLeft: 102 }}>
              Warning Alerts
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            style={{
              width: 220,
              height: 100,
              borderColor: "black",
              backgroundColor: "#0288d1",
              marginLeft: 560,
              marginTop: -100,
            }}
          >
            <BsInfoLg
              style={{ color: "white", fontSize: 60, paddingTop: 17 }}
            />
            <Typography
              style={{
                color: "white",
                marginTop: -50,
                marginLeft: 180,
                fontSize: 25,
              }}
            >
              6
            </Typography>

            <Typography style={{ color: "white", marginLeft: 73 }}>
              Information Alerts
            </Typography>
          </Paper>
          <br />
          <TableContainer
            component={Paper}
            variant="outlined"
            style={{ borderColor: "#e53935" }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead
                style={{ backgroundColor: "#e53935", borderColor: "#e53935" }}
              >
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white", fontSize: 17 }}
                  >
                    Alerts Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableBody>
                  <FcSearch
                    style={{ fontSize: 25, marginLeft: 600, marginBottom: -30 }}
                  />
                  <TextField
                    //  inputRef={inputElem}
                    id="outlined-basic"
                    label="Search Alert "
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1, mb: 2 }}
                    style={{
                      marginLeft: 900,
                      marginTop: -10,
                      width: 250,
                      //height: 150,
                      color: "#026aa4",
                    }}
                    onChange={(e) => searchItems(e.target.value)}
                  />
                  <TableContainer
                    component={Paper}
                    style={{ width: 1160, marginLeft: 17 }}
                  >
                    <Table aria-label="custom pagination table">
                      <TableHead style={{ backgroundColor: "white" }}>
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold", color: "#026aa4" }}
                          >
                            Warning Name
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", color: "#026aa4" }}
                          >
                            Warning Level
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", color: "#026aa4" }}
                          >
                            Detected At
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", color: "#026aa4" }}
                          >
                            Action
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", color: "#026aa4" }}
                          >
                            More Details
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {searchInput.length > 1
                          ? filteredResults.map((data, i) => {
                              return (
                                <TableRow key={data._id}>
                                  <TableCell component="th" scope="row">
                                    {data._id}
                                  </TableCell>

                                  <TableCell component="th" scope="row">
                                    {data.lastName}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          : paginator(usersCollection, page, 2).data.map(
                              (data, i) => {
                                return (
                                  <TableRow key={data._id}>
                                    <TableCell component="th" scope="row">
                                      {data._id}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                      {data.lastName}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableBody>
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={paginator(usersCollection, page, 2).total_pages}
                    page={paginator(usersCollection, page, 2).page}
                    onChange={handleChange}
                    color="info"
                  />
                </div>
              </TableBody>
              <br />
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper
            style={{
              backgroundColor: "#eceff1",
              width: 1150,
              height: 480,
              marginLeft: 25,
            }}
          >
            <br />

            <Typography
              style={{
                color: "#026aa4",
                fontSize: 22,
                fontWeight: "bold",
                marginLeft: 400,
              }}
            >
              <GoSettings /> &nbsp;&nbsp; Warnings Control Panel
            </Typography>
            <br />
            <Stack direction="row">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Typography style={{ marginTop: 7 }}>
                Activate or desactivate :
              </Typography>
              &nbsp;&nbsp;&nbsp;
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={checked}
                    onChange={handleChange2}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="On"
              />
            </Stack>
            <Stack style={{ marginLeft: 140 }}>
              <Typography style={{ marginLeft: 150 }}>
                Warning Program :
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={checkedBox}
                    onChange={handleChangeBox}
                    disabled={!checked}
                  />
                }
                label="&nbsp;&nbsp;SMS"
                labelPlacement="end"
                style={{ marginLeft: 280 }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Phone Number "
                size="small"
                style={{ width: 250, marginLeft: 330, marginTop: -13 }}
                variant="outlined"
                disabled={!checkedBox}
                //value={text}
                //onChange={(e) => setText(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={checkedBox2}
                    onChange={handleChangeBox2}
                    disabled={!checked}
                  />
                }
                label="&nbsp;&nbsp;Email"
                labelPlacement="end"
                style={{ marginLeft: 280, marginTop: 13 }}
              />
              <TextField
                id="outlined-basic"
                label="Email Adress "
                size="small"
                variant="outlined"
                disabled={!checkedBox2}
                //value={text2}
                //onChange={(e) => setText2(e.target.value)}

                style={{ marginLeft: 330, marginTop: 13, width: 250 }}
              />
            </Stack>
            <br />
            <Typography>
              &nbsp;&nbsp;&nbsp;Reminder : Alerts are only sent if your data
              changes.
            </Typography>
            <br />
            <hr style={{ width: 1080, marginLeft: 30 }} />
            <br />

            <Typography style={{ color: "gray" }}>
              &nbsp;&nbsp;&nbsp; By default, you'll receivce notifications on
              the application in the notification center.
            </Typography>
          </Paper>
        </TabPanel>
      </Box>
    </div>
  );
}

/*import * as React from "react";
import PropTypes from "prop-types";
import LayoutHome from "../layout/LayoutHome";
import { useTheme } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tab,
  Tabs,
  Box,
  Typography,
  TableFooter,
  IconButton,
} from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function RecomHome() {
  const [value, setValue] = React.useState(0);
  const [usersCollection, setUsersCollection] = React.useState([]);
  const [listUpdated, setLisUpdated] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/user/userslist")
      .then((res) => {
        console.log(res.data);
        setUsersCollection(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - usersCollection.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ marginLeft: 100, marginTop: 100 }}>
      <LayoutHome />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? usersCollection.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : setUsersCollection
            ).map((data, i) => (
              <TableRow key={data._id}>
                <TableCell component="th" scope="row">
                  {data._id}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={usersCollection.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
*/
