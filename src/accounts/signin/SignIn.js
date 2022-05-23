import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import axios from "axios"; //pour l'envoie des requetes
import Google from "../googlesignin/Google";
import { useNavigate, Link } from "react-router-dom";

//import SignUp from "../signup/SignUp";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const [redirect, setRedirect] = useState(true);
  async function handleSubmitSignin(e) {
    e.preventDefault();
    try {
      const response = await axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/user/signin",
        data: {
          //donnees de la requete
          email: email,
          password: password,
        },
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data}`;
      navigate("/Dashboard");
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: response.data,
      });
      console.log(response.data);
      setPassword("");
      setEmail("");
    } catch (error) {
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: `${error.response.data}`,
      });
    }
  }

  return (
    <div>
      <Container className="containersignin" maxWidth="xs">
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
        <Typography className="typography1" variant="h3">
          Welcome Back...
        </Typography>
        <br />
        <Box component="form" sx={{ mt: 0 }} onSubmit={handleSubmitSignin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="password"
                type="password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item sm={5}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item sm={5}>
              <Button
                type="reset"
                variant="outlined"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Cancel
              </Button>
              <br />

              <Typography className="typography2" variant="p">
                OR
              </Typography>
              <div>
                <Grid item sm={30} className="btngoogle">
                  <Google />
                </Grid>
                <div
                  style={{
                    marginTop: 30,
                    marginLeft: -56,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  <br />
                  <Button
                    component={Link}
                    to={"/ResetPassword"}
                    style={{ width: 220, marginLeft: -35 }}
                    variant="outlined"
                    color="success"
                  >
                    Forgot Your Password?
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default SignIn;
