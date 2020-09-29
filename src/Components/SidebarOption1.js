import React from "react";
import "../style/SidebarOption1.css";

function SidebarOption({ Icon, title, setLess, less, stay }) {
  return (
    <div
      className={stay ? "siderbarOptionNone" : "siderbarOption"}
      onClick={setLess ? () => setLess(!less) : ""}
    >
      {Icon && <Icon className="sidebarOption__icons" />}
      {Icon ? (
        <h3 className="sidebarOption__channel">{title}</h3>
      ) : (
        <h3 className="sidebarOption__hash"># {title}</h3>
      )}
    </div>
  );
}

export default SidebarOption;

// 1- get the rooms from db
// 2- find the room with the new name
// 3- get its id
// 4- put in the push history
