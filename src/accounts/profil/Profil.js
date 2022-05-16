import * as React from "react";
import { Avatar } from "@material-ui/core";
import InfoIcon from "@mui/icons-material/Info";
import {
  Grid,
  Box,
  Container,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  TextField,
  Paper,
  Button,
  Tooltip,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import LayoutHome from "../layout/LayoutHome";

export default function Profil() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [id, setId] = React.useState("");
  const [emailContent, setEmailContent] = React.useState("");
  const [listUpdated, setLisUpdated] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    handleOnClickOpen();
  }, []);

  const handleOnClickOpen = async (userId) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/user/profilInfo/${userId}`,
      });
      const { _id, firstName, lastName, email, phoneNumber, password } =
        response.data;
      setId(_id);
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNumber(phoneNumber);
      setEmail(email);
      setPassword(password);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:8080/user/updateuser/${id}`,
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      });
      console.log("c bon");

      setLisUpdated(!listUpdated);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Your Account Has Been Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      }).then(function () {});
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: "Do You Realy Want To Delete Your Account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/user/deleteprofile/${id}`)
          .then((res) => {
            console.log(res.data);
            // setUsersCollection([res.data]);
            //setLisUpdated(!listUpdated);
            console.log("cbon");
            navigate("/");
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1000,
            });

            Toast.fire({
              icon: "success",
              title: "Your Account Has Been Deleted Successfully !",
            });
          })
          .catch(function (error) {
            console.log(error);
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1000,
            });

            Toast.fire({
              icon: "error",
              title: error,
            });
          });
      }
    });
  };
  return (
    <div
      style={{
        backgroundColor: "#eceff1",
        width: "100%",
        height: 657,
      }}
    >
      <LayoutHome />
      <Container
        width="sd"
        sx={{
          marginTop: 15,
          marginBottom: 5,
          marginLeft: 15,
        }}
      >
        <AppBar
          position="fixed"
          style={{ marginTop: 60, backgroundColor: "white" }}
        >
          <Toolbar>
            <IconButton style={{ marginLeft: 60 }}>
              <Avatar style={{ color: "#026aa4" }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              style={{ color: "#026aa4", marginLeft: 60 }}
            >
              Your profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper
          sx={{ padding: "2em 2em", boxShadow: 2 }}
          style={{ marginTop: -40, height: 320 }}
        >
          <Box component="form" sx={{ mt: 5 }} onSubmit={handleUpdateUser}>
            <Grid container spacing={3}>
              <Grid item xs={5} style={{ marginTop: -27 }}>
                <Typography>First Name :</Typography>
                <TextField
                  style={{ marginTop: -40, marginLeft: 120, width: 300 }}
                  name="firstName"
                  required
                  //fullWidth
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={15}>
                <Typography style={{ marginTop: -70, marginLeft: 550 }}>
                  Last Name :
                </Typography>

                <TextField
                  style={{ marginTop: -35, marginLeft: 700, width: 300 }}
                  required
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginTop: -5, marginLeft: 550 }}>
                  Phone Number :
                </Typography>

                <TextField
                  style={{ marginTop: -35, marginLeft: 700, width: 300 }}
                  required
                  //fullWidth
                  id="phonenumber"
                  //label="Phone Number"
                  name="phonenumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Tooltip title="The Phone Number Should Be Composed Of 8 Figures">
                  <InfoIcon style={{ marginTop: -50, marginLeft: 15 }} />
                </Tooltip>
              </Grid>

              <Typography style={{ marginTop: -40, marginLeft: 25 }}>
                Email :
              </Typography>

              <Grid item>
                <TextField
                  style={{ marginTop: -75, marginLeft: 45, width: 300 }}
                  required
                  //fullWidth
                  id="email"
                  //label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={20}>
                <Typography>Password :</Typography>

                <Tooltip title="The Password Should Be Composed Of At Least 5 characters">
                  <InfoIcon style={{ marginTop: -30, marginLeft: 440 }} />
                </Tooltip>

                <TextField
                  required
                  style={{ marginTop: -50, marginLeft: -345, width: 300 }}
                  //fullWidth
                  name="password"
                  //label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Link to="/ResetPassword" style={{ marginLeft: 220 }}>
                Forgot Your Password?
              </Link>
              <Grid item sm={5}>
                <Button
                  style={{ marginTop: -85, marginLeft: 220, width: 170 }}
                  type="submit"
                  variant="contained"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                >
                  Save And Update
                </Button>
              </Grid>
              <Grid item sm={5}>
                <Button
                  style={{ marginTop: -165, marginLeft: 800, width: 170 }}
                  type="reset"
                  variant="outlined"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <br />
        <Paper>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              style={{ backgroundColor: "#e53935", borderColor: "#e53935" }}
            >
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                >
                  Delete Account
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Once you delete your account, there is no going back. Please
                  be certain. <br />
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ marginTop: 10, marginLeft: -40 }}
                    onClick={handleDeleteUser}
                  >
                    Delete Account
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}
