"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AppContext } from "./Helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContextProvider = ({ children }) => {
  const router = useRouter();

  const [botCreatedSuccess, setBotCreatedSuccess] = useState(false);
  const [token, setToken] = useState("");

  //First get the token from localStorage and pass it as a parameter to the getCurrentUser function

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const token = window.localStorage.getItem("token");
  //     setToken(token);
  //   }
  // }, [token]);

  useEffect(() => {
    // const token = window.localStorage.getItem("token");
    console.log(token, "I am token");

    // const tok = window.localStorage.getItem("token");
    getCurrentUser(token);
  }, [token]);

  // getCurrentUser takes in a parameter called token which we'll get from getCurrentUser which is th token response
  const getCurrentUser = async (token) => {
    if (token) {
      try {
        const response = await axios({
          method: "POST",
          url: "https://apps.lien.bloombyte.dev/create_assistant",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).catch((err) => console.log(err) && router.push("/login"));
        if (response.status === 200) {
          // Process the response data
          toast.success(`user login successful!`);
          setBotCreatedSuccess(true);
        } else {
          // Handle errors or unauthorized access
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
        toast.error(`user login failed!`);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  };

  const contextValue = {
    getCurrentUser,
    botCreatedSuccess,
    setToken,
  };

  return (
    <AppContext.Provider value={{ contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
