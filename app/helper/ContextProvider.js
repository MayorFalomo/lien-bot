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

  //getCurrentUser takes in a parameter called Id which we'll get from currentUser which is cookies.user

  //   const getCurrentUser = async (id) => {
  //     if (id) {
  //       try {
  //         // console.log(id, "This is id");
  //         await axios
  //           .get(`https://`)
  //           .then((res) => {
  //             // console.log(res.data, "This is res.data");
  //             // setUser(res.data);
  //             router.push("/");
  //             // toast.success("login successful");
  //             // toast.success(`Merry Christmas ${res.data?.username} `);
  //           })
  //           .catch((err) => {
  //             console.log(err && router.push("/signup"));
  //           });
  //         // console.log(res, "This is res");
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   };

  //UseEffect to load cookies.user and just
  //   useEffect(() => {
  //     getCurrentUser(currentUser ? currentUser : "");
  //   }, [currentUser]);

  const contextValue = {
    user,
    setUser,
    // getCurrentUser,
  };

  return (
    <AppContext.Provider value={{ contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
