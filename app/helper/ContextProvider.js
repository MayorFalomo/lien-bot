"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AppContext } from "./Helpers";
// import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContextProvider = ({ children }) => {
  const router = useRouter();
  const [activeId, setActiveId] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      const localStorageId = localStorage?.getItem("user");
      setActiveId(localStorageId);
    }
  }, []);

  // const localStorageId = localStorage.getItem("user");
  // const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const currentUser = activeId;

  // console.log(currentUser, "currentUser");

  // getCurrentUser takes in a parameter called Id which we'll get from currentUser which is cookies.user

  const getCurrentUser = async (token) => {
    toast("Login successful!");

    if (token) {
      try {
        const response = await axios({
          method: "POST",
          url: "http://217.160.156.197/create_assistant",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          // Process the response data
        } else {
          // Handle errors or unauthorized access
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //UseEffect to load cookies.user and just
  //   useEffect(() => {
  //     getCurrentUser(currentUser ? currentUser : "");
  //   }, [currentUser]);

  const contextValue = {
    user,
    setUser,
    getCurrentUser,
    id,
  };

  return (
    <AppContext.Provider value={{ contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
