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
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";
import { Link } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import LayoutHome from "../layout/LayoutHome";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  //const [oldpassword, setOldPassword] = React.useState("");

  const handleChangePass = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8080/user/comparePassword/${userId}`,
        data: {
          password: password,
        },
      });
      //console.log("c bon");

      console.log(response.data);
      setPassword("");
    } catch (error) {
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    }
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
            <IconButton style={{ marginLeft: 40 }}>
              <LockResetIcon style={{ color: "#026aa4", fontSize: 40 }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              style={{ color: "#026aa4", marginLeft: 60 }}
            >
              Change Your Password
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          sx={{ padding: "2em 2em", boxShadow: 2 }}
          style={{ marginTop: -3 }}
        >
          <Box component="form" sx={{ mt: 5 }} onSubmit={handleChangePass}>
            <Grid container spacing={3}>
              <Grid item xs={20}>
                <Typography style={{ marginLeft: 200 }}>
                  Old password :
                </Typography>

                <TextField
                  required
                  style={{ marginTop: -50, marginLeft: 450, width: 300 }}
                  //fullWidth
                  name="password"
                  //label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <br />
              <Grid item xs={20}>
                <Typography style={{ marginLeft: 200 }}>
                  New Password :
                </Typography>

                <TextField
                  //required
                  style={{ marginTop: -50, marginLeft: 450, width: 300 }}
                  //fullWidth
                  name="password"
                  //label="Password"
                  type="password"

                  //value={passwordUser}
                  //onChange={(e) => setPasswordUser(e.target.value)}
                />
              </Grid>
              <br />
              <Grid item xs={20}>
                <Typography style={{ marginLeft: 200 }}>
                  {" "}
                  Re-Enter New Password :
                </Typography>

                <TextField
                  //required
                  style={{ marginTop: -50, marginLeft: 450, width: 300 }}
                  //fullWidth
                  name="password"
                  //label="Password"
                  type="password"

                  //value={passwordUser}
                  //onChange={(e) => setPasswordUser(e.target.value)}
                />
              </Grid>

              <Grid item sm={5}>
                <Button
                  style={{ marginTop: 20, marginLeft: 500, width: 250 }}
                  type="submit"
                  variant="contained"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                >
                  Change The Password
                </Button>
              </Grid>

              <Grid item sm={5}>
                <Button
                  component={Link}
                  to={"/ResetPassword"}
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                >
                  Forgot Your Password ?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
