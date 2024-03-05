"use client";
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import AnswerArea from "./components/answerArea/Answerarea";
import "./globals.css";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Home() {
  const [navbarState, setNavbarState] = useState(false);

  return (
    <main className={navbarState ? "activeBar" : "homeHeader"}>
      <Navbar navbarState={navbarState} setNavbarState={setNavbarState} />
      <AnswerArea />
    </main>
  );
}
