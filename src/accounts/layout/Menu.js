import React, { useState } from "react";
import { ListItem, ListItemIcon, List, Tooltip } from "@material-ui/core";
import Warning from "@material-ui/icons/Warning";
import RecommendIcon from "@mui/icons-material/Recommend";
import Logout from "./Logout";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { red, green, brown, blueGrey } from "@mui/material/colors";
import PieChartIcon from "@mui/icons-material/PieChart";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { BsPersonLinesFill } from "react-icons/bs";
import { FcComboChart } from "react-icons/fc";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
export default function Menu2() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen2(!open3);
  };

  return (
    <React.Fragment>
      <List>
        <Tooltip
          title={
            <Typography style={{ fontSize: 15 }}>Data And Charts</Typography>
          }
        >
          <ListItem
            button // component={Link} to={"/Dashboard"}
            onClick={handleClick}
          >
            <ListItemIcon>
              <FcComboChart
                style={{ color: "#009688", marginLeft: 1, fontSize: 27 }}
              />
              <Typography style={{ color: "black", marginLeft: 33 }}>
                Data And Charts
              </Typography>
            </ListItemIcon>

            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>Dashboards</Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/Dashboard"}
              >
                <ListItemIcon>
                  <PieChartIcon style={{ color: "#ffd740", fontSize: 27 }} />
                </ListItemIcon>
                <Typography> Dashboards</Typography>
              </ListItem>
            </Tooltip>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>Upload Files</Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/UploadedFilesList"}
              >
                <ListItemIcon>
                  <UploadFileIcon style={{ color: "green", fontSize: 27 }} />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Upload Files
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>
                  Uploaded Files List
                </Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/Dashboard"}
              >
                <ListItemIcon>
                  <FormatListBulletedIcon
                    style={{ color: "#ff6d00", fontSize: 27 }}
                  />
                </ListItemIcon>
                <Typography> Uploaded Files List</Typography>
              </ListItem>
            </Tooltip>
          </List>
        </Collapse>
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}>Warnings</Typography>}
        >
          <ListItem button component={Link} to={"/Warning"}>
            <ListItemIcon>
              <Warning style={{ color: "red", fontSize: 27 }} />
            </ListItemIcon>
            <Typography> Warnings</Typography>
          </ListItem>
        </Tooltip>
        <Tooltip
          title={
            <Typography style={{ fontSize: 15 }}>Recommendations</Typography>
          }
        >
          <ListItem button component={Link} to={"/Recommendation"}>
            <ListItemIcon>
              <RecommendIcon style={{ color: "#ff4081", fontSize: 27 }} />
            </ListItemIcon>
            <Typography>Recommendations</Typography>
          </ListItem>
        </Tooltip>
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}>Users</Typography>}
        >
          <ListItem button onClick={handleClick2}>
            <ListItemIcon>
              <PeopleIcon style={{ color: "#1a237e", fontSize: 27 }} />
            </ListItemIcon>
            <Typography> Users</Typography>
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>
                  Add Simple User
                </Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/AddUser"}
              >
                <ListItemIcon>
                  <PersonAddIcon style={{ color: "#448aff", fontSize: 27 }} />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Add Simple User
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>

            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>
                  Add Administrator
                </Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/AddAdmin"}
              >
                <ListItemIcon>
                  <AddModeratorIcon
                    style={{ color: "#588d9c", fontSize: 23 }}
                  />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Add Administrator
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>Users List</Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/Users"}
              >
                <ListItemIcon>
                  <BsPersonLinesFill
                    style={{
                      color: "#9e8bca",
                      fontSize: 23,
                      marginLeft: 2,
                    }}
                  />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Users List
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          </List>
        </Collapse>
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}>Comments</Typography>}
        >
          <ListItem button component={Link} to={"/Comments"}>
            <ListItemIcon>
              <AddCommentIcon style={{ color: "#db996c", fontSize: 27 }} />
            </ListItemIcon>
            <Typography> Comments</Typography>
          </ListItem>
        </Tooltip>
        <Divider />
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}>Your Profil</Typography>}
        >
          <ListItem button component={Link} to={"/YourProfil"}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                style={{ color: "#009688", fontSize: 27 }}
              />
            </ListItemIcon>
            <Typography title="Your Profil"> Your Profile</Typography>
          </ListItem>
        </Tooltip>
      </List>
      <Logout />
    </React.Fragment>
  );
}
