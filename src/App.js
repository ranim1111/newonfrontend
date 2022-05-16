import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./accounts/container/Container";
import DashboardHome from "./accounts/home/DashboardHome";
import WarningHome from "./accounts/warning/WarningHome";
import RecomHome from "./accounts/recommendation/RecomHome";

import UsersList from "./accounts/clientsmanagement/UsersList";
import UserFiles from "./accounts/uploadedFilesList/UserFiles";
import CommentsHome from "./accounts/comments/CommentsHome";
import SignIn from "./accounts/signin/SignIn";
import AddUser from "./accounts/clientsmanagement/AddUser";
import AddAdmin from "./accounts/clientsmanagement/AddAdmin";
import ResetPassword from "./accounts/password/ResetPassword";
import NewPassword from "./accounts/password/NewPassword";
import Exp1 from "./accounts/essai/Exp1";
import Profil from "./accounts/profil/Profil";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/Dashboard" element={<DashboardHome />}></Route>
          <Route exact path="/" element={<Container />}></Route>
          <Route exact path="/Warning" element={<WarningHome />}></Route>
          <Route exact path="/Recommendation" element={<RecomHome />}></Route>
          <Route exact path="/Users" element={<UsersList />}></Route>
          <Route
            exact
            path="/UploadedFilesList"
            element={<UserFiles />}
          ></Route>
          <Route exact path="/Comments" element={<CommentsHome />}></Route>
          <Route exact path="/SignIn" element={<SignIn />}></Route>
          <Route exact path="/AddUser" element={<AddUser />}></Route>
          <Route exact path="/AddAdmin" element={<AddAdmin />}></Route>
          <Route exact path="/YourProfil" element={<Profil />}></Route>
          <Route
            exact
            path="/ResetPassword"
            element={<ResetPassword />}
          ></Route>
          <Route
            exact
            path="/ResetPassword/:token"
            element={<NewPassword />}
          ></Route>
          <Route exact path="/Exp1" element={<Exp1 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
