import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../Components/Sidebar.style.css";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";
import db from "../Firebase";
import { useStateValue } from './StateProvider'

function Sidebar() {

  const [rooms,setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
   const unsubscribe= db.collection('rooms').onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
        id: doc.id,
        data:doc.data(),
      }))
      )
      
    )
    return()=>{
      unsubscribe();
    }
  },[] )

  return  (
    <div className="sidebar">
      <div className="sidebar-header">
        <IconButton>
          <Avatar src={user?.photoURL} />
        </IconButton>

        <div className="sidebar-headerRight">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="search-area">
          <SearchIcon />
          <input type="text" placeholder="Enter a name" />
        </div>
      </div>
      <div className="sidebar-chats">
        <SidebarChat addNewChat />
        {rooms.map( room=> (
          <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
