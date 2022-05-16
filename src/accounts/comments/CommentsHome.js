import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  DialogTitle,
  Dialog,
  DialogContent,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import LayoutHome from "../layout/LayoutHome";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios"; //pour l'envoie des requetes
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Paper, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";

const useStyles = makeStyles((theme) => ({
  commentNum: {
    color: "#026aa4",
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(8),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(4),
  },
  form: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    width: theme.spacing(90),
    height: theme.spacing(8),
    overflow: "auto",
    display: "block",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid black",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(0),
    fontSize: "20px",
    outline: 0,
  },
  name: {
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(3),
  },
  topic: {
    width: 150,
  },

  btnSubmit: {
    backgroundColor: "#000000",
    color: "#fff",
    height: "100%",
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(-70),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "20px",
    borderRadius: "30px",
    transition: "transform 0.5s",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#fff",
      transform: "translateY(-5px)",
    },
  },
  btnCancel: {
    backgroundColor: "#000000",
    color: "#fff",
    height: "100%",
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(-25),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "20px",
    borderRadius: "30px",
    transition: "transform 0.5s",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#fff",
      transform: "translateY(-5px)",
    },
  },
  responses: {
    marginLeft: theme.spacing(10),
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
    borderRadius: 5,
    //backgroundColor: "rgb(240 , 240 , 240)",
  },
  paper: {
    width: 900,

    marginLeft: theme.spacing(12),
    marginTop: theme.spacing(4),

    borderRadius: "15px",
    borderColor: "text.primary",
  },
  titlerep: {
    fontWeight: "bold",
  },
  Delete: {
    marginRight: theme.spacing(15),
  },

  Edit: {
    marginRight: theme.spacing(13),
  },
}));

const CommentsHome = () => {
  const classes = useStyles();
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [topic, setTopic] = React.useState("");
  const [content, setContent] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [commentCollection, setCommentCollection] = React.useState([]);
  const [createdAt, setCreatedAt] = React.useState(false);
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [choice, setChoice] = React.useState("");
  //const [filter1, setFilter1] = React.useState("");

  React.useEffect(() => {
    //console.log("aaa");
    axios
      .get("http://localhost:8080/comments/getcomment")
      .then((res) => {
        setCommentCollection(res.data.reverse());

        //console.log(setCount(count + 1));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isUpdated, content]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/comments/addcomment",
        data: {
          //donnees de la requete
          topic: topic,
          content: content,
          userId: userId,
          createdAt: createdAt,
        },
      });

      //setRole("");
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 1100,
      });

      Toast.fire({
        icon: "success",
        title: "Comment Added Successfully !",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    } finally {
      setIsUpdated(!isUpdated);
      setContent("");
      setTopic("");
    }
  }
  //console.log(data.createdAt.toString());
  const handleDeleteComment = (_id) => {
    Swal.fire({
      title: "Do You Realy Want To Delete This Comment ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8080/comments/deletecomment/${_id}`)
          .then((res) => {
            console.log(res.data);
            // setCommentCollection([res.data]);
            //console.log("c bon deleted");
            setIsUpdated(!isUpdated);

            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1100,
            });

            Toast.fire({
              icon: "success",
              title: "Comment Deleted Successfully !",
            });
          })
          .catch(function (error) {
            console.log(error);
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1100,
            });

            Toast.fire({
              icon: "error",
              title: error.response.data,
            });
          });
      }
    });
  };
  /*function perWeek() {
    var seventhDay = new Date();
    var seven = seventhDay.setDate(seventhDay.getDate() - 7);
    const filter1 = commentCollection.filter((data, i) => {
      return new Date(data.createdAt).getTime() >= seventhDay.getTime();
    });
  }
  //console.log("exp", seven);
  console.log("exp", filter1);*/

  var seventhDay = new Date();
  var seven = seventhDay.setDate(seventhDay.getDate() - 7);
  //console.log("exp", seven);
  var filter1 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= seventhDay.getTime();
  });
  console.log("exp", filter1);

  //setFilteredResults(filter);
  /////////////////////////////
  var thirteenthDay = new Date();
  thirteenthDay.setDate(thirteenthDay.getDate() - 30);
  //console.log(thirteenthDay.setDate(thirteenthDay.getDate() - 7));
  var filter2 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= thirteenthDay.getTime();
  });
  console.log(filter2, "hi");
  ///////////////////////////////
  var lastDayInYear = new Date();
  thirteenthDay.setDate(lastDayInYear.getDate() - 30);
  console.log(lastDayInYear.setDate(lastDayInYear.getDate() - 366));
  var filter3 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= lastDayInYear.getTime();
  });
  console.log(filter3, "hello");
  /////////////////////////////////////////

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    //console.log(searchValue);
    if (searchInput !== "") {
      const filteredData = commentCollection.filter((data, i) => {
        return Object.values(data, i)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      //console.log(filteredData);
      //console.log(commentCollection.userId.firstName);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(commentCollection);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeChoice = (event) => {
    setChoice(event.target.value);
  };
  //console.log(commentCollection);
  return (
    <div
      style={{
        marginTop: "100px",

        marginLeft: "110px",
      }}
    >
      <LayoutHome />
      <AppBar
        position="fixed"
        style={{ marginTop: 60, backgroundColor: "#eceff1" }}
      >
        <Toolbar>
          <IconButton style={{ color: "#026aa4", marginLeft: 60 }}>
            <EditIcon />
          </IconButton>
          <Typography variant="h6" className={classes.commentNum}>
            Comments Section : Feel Free !
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper
        //variant="outlined"
        sx={{
          padding: "2em 5em",

          //borderColor: "green",
          width: 1215,
        }}
        //style={{ borderColor: "#026aa4" }}
        //style={{ boxShadow: "red", color: "green", elevation: "24" }}
      >
        <div style={{ display: "flex" }}>
          <Avatar className={classes.large} />
          <Grid item xs={10}>
            <TextField
              name="topic"
              required
              id="topic"
              label="Click here to add a Topic"
              variant="outlined"
              style={{ width: 900 }}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Grid>
        </div>
        <div>
          <React.Fragment>
            <Box component="form" sx={{ mt: 2 }} spacing={5}>
              <Grid container spacing={3}>
                <Grid item xs={10} style={{ marginLeft: "80px" }}>
                  <TextField
                    required
                    label="Express your thoughts !"
                    variant="outlined"
                    multiline
                    rows={2.5}
                    style={{ width: 900 }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  sm={3}
                  className={classes.name}
                  style={{ marginLeft: "95px" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                    onSubmit={handleSubmit}
                  >
                    <SendIcon />
                    &nbsp;&nbsp; Post It
                  </Button>
                </Grid>
                <Grid item sm={3} style={{ marginLeft: "95px" }}>
                  <Button
                    type="reset"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
              <div style={{ marginTop: 50 }}>
                <SearchIcon
                  style={{
                    color: "#026aa4",
                    marginTop: 60,
                    marginLeft: 300,
                    fontSize: 35,
                  }}
                />
                <TextField
                  //  inputRef={inputElem}
                  id="outlined-basic"
                  label="Search Comment "
                  variant="outlined"
                  sx={{ mt: 1, mb: 2 }}
                  style={{
                    marginLeft: 15,
                    marginTop: 50,
                    width: 320,
                    color: "#026aa4",
                  }}
                  onChange={(e) => searchItems(e.target.value)}
                />
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 15 }}>
                      This search functionality filter comments basing on it's
                      "Topic", "Content" and the day in which was posted,
                      written as : "YYYY-MM-DD" ( for example : "2020-01-14")
                    </Typography>
                  }
                >
                  <InfoIcon
                    style={{ color: "#026aa4", marginLeft: 5, marginBottom: 5 }}
                  />
                </Tooltip>
                <FilterListIcon
                  style={{ marginLeft: 35, marginBottom: 5, color: "#026aa4" }}
                />
                <FormControl
                  variant="filled"
                  sx={{ m: 1 }}
                  style={{ marginLeft: 770, marginTop: -55, width: 180 }}
                >
                  <InputLabel htmlFor="grouped-native-select">
                    Choose Filter
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    label="Filter Comments"
                  >
                    <option label="None" value="None" />
                    <optgroup label="By Date">
                      <option value={1}>
                        {/*onClick={() => filter2()}*/} Per Week
                      </option>
                      <option Button value={2}>
                        Per Month
                      </option>
                    </optgroup>
                    <optgroup label="By User">
                      <option value={3}>For Each User</option>
                    </optgroup>
                  </Select>
                </FormControl>
                <Typography
                  style={{
                    marginTop: -60,
                    marginLeft: 110,
                    fontWeight: "bold",
                  }}
                >
                  Total Comments : {commentCollection.length}
                </Typography>
                {/*<input
                  value={filterParam}
                  onChange={(e) => setFilterParam(e.target.value)}
                ></input>*/}
              </div>
              <br />
              <br />
              {searchInput.length > 1
                ? filteredResults.map((data, i) => {
                    return (
                      <React.Fragment>
                        <Paper
                          className={classes.paper}
                          style={{
                            backgroundColor: "#deeaee",
                          }}
                        >
                          <Grid key={i} className={classes.responses}>
                            <ListItem fullwidth>
                              <ListItemAvatar>
                                <Avatar />
                              </ListItemAvatar>

                              <ListItemText
                                primary={
                                  <Typography className={classes.titlerep}>
                                    {data.userId.firstName}
                                    {data.userId.lastName}
                                  </Typography>
                                }
                                secondary={
                                  <Typography
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    Topic : {data.topic} <br />
                                    Content : {data.content}
                                  </Typography>
                                }
                              />
                              <Typography>
                                <AccessTimeIcon
                                  style={{
                                    width: 20,
                                    marginTop: -25,
                                    color: "#026aa4",
                                    marginLeft: 13,
                                  }}
                                />
                                <h6>
                                  <div
                                    style={{ marginLeft: 50, marginTop: -25 }}
                                  >
                                    {moment(data.createdAt).format(
                                      "MMMM D, Y, HH:mm"
                                    )}
                                  </div>
                                </h6>
                              </Typography>
                              <Button
                                icon
                                className={classes.Delete}
                                onClick={(e) =>
                                  handleDeleteComment(
                                    data._id
                                  ).setCommentCollection(data, i)
                                }
                              >
                                <DeleteIcon style={{ color: "#026aa4" }} />
                              </Button>
                            </ListItem>
                          </Grid>
                        </Paper>
                      </React.Fragment>
                    );
                  })
                : commentCollection.length > 0 &&
                  commentCollection.map((data, i) => (
                    <React.Fragment>
                      <Paper
                        className={classes.paper}
                        style={{
                          backgroundColor: "#deeaee",
                        }}
                      >
                        <Grid key={i} className={classes.responses}>
                          <ListItem fullwidth>
                            <ListItemAvatar>
                              <Avatar />
                            </ListItemAvatar>

                            <ListItemText
                              primary={
                                <Typography className={classes.titlerep}>
                                  {/*{data.userId.firstName}
                                  {data.userId.lastName}*/}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2" color="textPrimary">
                                  Topic : {data.topic} <br />
                                  Content : {data.content}
                                </Typography>
                              }
                            />
                            <Typography>
                              <AccessTimeIcon
                                style={{
                                  width: 20,
                                  marginTop: -25,
                                  color: "#026aa4",
                                  marginLeft: 13,
                                }}
                              />
                              <h6>
                                <div style={{ marginLeft: 50, marginTop: -25 }}>
                                  {moment(data.createdAt).format(
                                    "MMMM D, Y, HH:mm"
                                  )}
                                </div>
                              </h6>
                            </Typography>
                            <Button
                              icon
                              className={classes.Delete}
                              onClick={(e) =>
                                handleDeleteComment(
                                  data._id
                                ).setCommentCollection(data, i)
                              }
                            >
                              <DeleteIcon style={{ color: "#026aa4" }} />
                            </Button>
                          </ListItem>
                        </Grid>
                      </Paper>
                    </React.Fragment>
                  ))}
            </Box>
          </React.Fragment>
        </div>
      </Paper>
    </div>
  );
};

export default CommentsHome;
