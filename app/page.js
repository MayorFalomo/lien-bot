import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import AnswerArea from "./components/answerArea/Answerarea";
import "./globals.css";
export default function Home() {
  return (
    <main className="homeHeader">
      <Navbar />
      <AnswerArea />
    </main>
  );
}
