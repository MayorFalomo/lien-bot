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
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  // const [tok, setTok] = useState();

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) {
      getCurrentUser(tok);
    } else {
      router.push("/login");
    }
  }, []);

  // getCurrentUser takes in a parameter called token which we'll get from getCurrentUser which is th token response

  const getCurrentUser = async (token) => {
    const tok = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios({
          method: "POST",
          url: "https://apps.lien.bloombyte.dev/create_assistant",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          // Process the response data
          toast.success(`user login successful!`);
        } else {
          // Handle errors or unauthorized access
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
        toast.error(`user login failed!`);
      }
    } else {
      router.push("/login");
    }
  };

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
