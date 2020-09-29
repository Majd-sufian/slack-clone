import React, { useState, useEffect } from "react";
import db from "../firebase";
import "../style/Sidebar.css";
import CreateIcon from "@material-ui/icons/Create";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SidebarOption from "./SidebarOption";
import SidebarOption1 from "./SidebarOption1";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";
import { useStateValue } from "../reducer/StateProvider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [less, setLess] = useState(false);

  useEffect(() => {
    db.collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        );
      });
  }, []);
  // console.log(less);

  return (
    <div className="sidebar">
      <div className="siderbar__header">
        <div className="sidebar__info">
          <h3>Clever Programmer</h3>
          <h5 className="header__user">
            <FiberManualRecordIcon />
            {user.username}
            {/* majd sufian */}
          </h5>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption1 Icon={InsertCommentIcon} title="Theads" stay={less} />
      <SidebarOption1
        Icon={InboxIcon}
        title="Mention & reactions"
        stay={less}
      />
      <SidebarOption1 Icon={DraftsIcon} title="Saved Items" stay={less} />
      <SidebarOption1 Icon={BookmarkIcon} title="Channel browser" stay={less} />
      <SidebarOption1
        Icon={PeopleAltIcon}
        title="People & user groups"
        stay={less}
      />
      <SidebarOption1 Icon={AppsIcon} title="Apps" stay={less} />
      <SidebarOption1 Icon={FileCopyIcon} title="File browser" stay={less} />
      <SidebarOption1
        Icon={less ? ExpandMoreIcon : ExpandLessIcon}
        title={less ? "Show More" : "Show less"}
        setLess={setLess}
        less={less}
      />
      <hr />
      <SidebarOption Icon={AddIcon} addChannel title="Add Channel" />
      {channels.map((channel) => (
        <SidebarOption id={channel.id} title={channel.name} />
      ))}
    </div>
  );
}

export default Sidebar;
