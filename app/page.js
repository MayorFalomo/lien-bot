"use client";
import Navbar from "./components/navbar/Navbar";
import AnswerArea from "./components/answerArea/Answerarea";
import "./globals.css";
import { useEffect, useState } from "react";
import MobileNav from "./components/navbar/MobileNav";
import { ToastContainer } from "react-toastify";
export default function Home() {
  const [navbarState, setNavbarState] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [size, setSize] = useState(false);
  const [clickedNavState, setClickedNavState] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 650) {
        setMobileNav(true);
      }
    }
  }, [mobileNav]);

  return (
    <main className={navbarState ? "activeBar" : "homeHeader"}>
      {mobileNav ? (
        ""
      ) : (
        <Navbar
          navbarState={navbarState}
          setNavbarState={setNavbarState}
          size={size}
          setSize={setSize}
        />
      )}
      {mobileNav && clickedNavState ? (
        <MobileNav
          mobileNav={mobileNav}
          setMobileNav={setMobileNav}
          setClickedNavState={setClickedNavState}
        />
      ) : (
        ""
      )}
      <AnswerArea
        setNavbarState={setNavbarState}
        size={size}
        setSize={setSize}
        navbarState={navbarState}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        setClickedNavState={setClickedNavState}
      />
      <ToastContainer />
    </main>
  );
}
