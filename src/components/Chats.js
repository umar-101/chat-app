import React, { useRef, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "images/jpeg" });
  };

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "81d6350f-7d69-44b3-b896-f6c26f4ae799",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "PRIVATE-KEY": "af882fe2-912d-49c6-b50e-401a95018b4b",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";
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
        projectID="81d6350f-7d69-44b3-b896-f6c26f4ae799"
        userName={user.email}
        userSecret={user.uid}
      ></ChatEngine>
    </div>
  );
};

export default Chats;
