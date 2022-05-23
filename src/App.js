import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./accounts/container/Container";
import Dashboard from "./accounts/dashboard/Dashboard";
import CsvUploader from "./accounts/home/CsvUploader";
import UserJoinedFiles from "./accounts/uploadedFilesList/UserJoinedFiles";
import JoinProcess from "./accounts/uploadedFilesList/JoinProcess";
import UserSimpleFiles from "./accounts/uploadedFilesList/UserSimpleFiles";
import WarningHome from "./accounts/warning/WarningHome";
import RecomHome from "./accounts/recommendation/RecomHome";

import UsersList from "./accounts/clientsmanagement/UsersList";

import CommentsHome from "./accounts/comments/CommentsHome";
import SignIn from "./accounts/signin/SignIn";
import AddUser from "./accounts/clientsmanagement/AddUser";
import AddAdmin from "./accounts/clientsmanagement/AddAdmin";
import ResetPassword from "./accounts/password/ResetPassword";
import NewPassword from "./accounts/password/NewPassword";
import ChangePassword from "./accounts/profil/ChangePassword";

import Profil from "./accounts/profil/Profil";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/CsvUploader" element={<CsvUploader />}></Route>
          <Route
            exact
            path="/ChangePassword"
            element={<ChangePassword />}
          ></Route>

          <Route
            exact
            path="/UploadedSimpleFilesList"
            element={<UserSimpleFiles />}
          ></Route>
          <Route
            exact
            path="/JoinedFilesList"
            element={<UserJoinedFiles />}
          ></Route>
          <Route exact path="/JoinProcess" element={<JoinProcess />}></Route>
          <Route exact path="/Dashboard" element={<Dashboard />}></Route>
          <Route exact path="/" element={<Container />}></Route>
          <Route exact path="/Warning" element={<WarningHome />}></Route>
          <Route exact path="/Recommendation" element={<RecomHome />}></Route>
          <Route exact path="/Users" element={<UsersList />}></Route>

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
