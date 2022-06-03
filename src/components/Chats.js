import React from "react";

import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ChatEngine } from "react-chat-engine";

const Chats = () => {
  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">Chatty</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh -66px)"
        projectId="81d6350f-7d69-44b3-b896-f6c26f4ae799"
        userName="."
        userSecret="."
      ></ChatEngine>
    </div>
  );
};

export default Chats;
