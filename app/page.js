"use client";
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import AnswerArea from "./components/answerArea/Answerarea";
import "./globals.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MobileNav from "./components/navbar/MobileNav";
export default function Home() {
  const [navbarState, setNavbarState] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [size, setSize] = useState(false);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // window.addEventListener("resize", () => {
  //     if (window.innerWidth <= 650) {
  //       setNavbarState(true);
  //       setSize(true);
  //     } else {
  //       setNavbarState(false);
  //     }
  //     // });
  //   }
  // }, [navbarState]);
  console.log(mobileNav, "innerwidth");
  return (
    <main className={navbarState ? "activeBar" : "homeHeader"}>
      <Navbar
        navbarState={navbarState}
        setNavbarState={setNavbarState}
        size={size}
        setSize={setSize}
      />
      {mobileNav && (
        <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
      )}
      <AnswerArea
        setNavbarState={setNavbarState}
        size={size}
        setSize={setSize}
        navbarState={navbarState}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
      />
    </main>
  );
}
