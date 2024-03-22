"use client";
import { Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import InputBox from "../inputBox/InputBox";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import "./Answer.css";
import Typewriter from "typewriter-effect";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { useAppContext } from "@/app/helper/Helpers";

const AnswerArea = (props) => {
  const { contextValue } = useAppContext();
  const [botAnswer, setBotAnswer] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = useState(false);
  const [tryAgain, setTryAgain] = React.useState(false);

  const [hideCursor, setHideCursor] = useState(false);

  const [chat, setChat] = React.useState([
    {
      bot: botAnswer,
      question: query,
    },
  ]);

  return (
    <div className="h-[100%] w-[100%] relative  ">
      <Box
        position="absolute"
        className="top-[0] max-sm:top-[40px] "
        left="0"
        // zIndex="1"
        p="20px"
        m="0"
        w="100%"
        maxH="100%"
        bg="#fff"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <span
          onClick={() => props.setMobileNav(true)}
          className="hidden max-[650px]:flex ma cursor-pointer"
        >
          {<HamburgerIcon />}{" "}
        </span>

        <Flex alignItems="center" gap="10px">
          <Text fontSize="20px">Lien Bot </Text>
        </Flex>
        {/* <Flex alignItems="center" gap="20px"> */}
        {/* <Tippy content="download as document" placement="bottom">
            <Box
              border="1px grey solid"
              borderRadius="7px"
              className="py-[4px] px-[6px]"
            >
              <DownloadIcon fontSize="20px" cursor="pointer" />
            </Box>
          </Tippy> */}
        <Tippy content="logout" placement="bottom">
          <Link href="/login">
            <Box
              border="1px grey solid"
              borderRadius="7px"
              className="py-[4px] px-[6px]"
            >
              <Icon as={MdLogout} fontSize="20px" cursor="pointer" />
            </Box>
          </Link>
        </Tippy>
        {/* </Flex> */}
      </Box>
      <Box
        mt="100px"
        h="600px"
        maxH="65%"
        overflow="auto"
        className="max-[600px]:overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] "
      >
        {chat.map((con, index) => {
          return (
            <Box
              className="max-w-[700px] max-lg:w-[70%] max-nav:w-[95%] "
              m="auto"
              key={index}
            >
              <ChatArea
                con={con}
                loader={loader}
                chatIndex={index}
                chat={chat}
                hideCursor={hideCursor}
                setHideCursor={setHideCursor}
              />
            </Box>
          );
        })}
      </Box>
      <Container
        w="100%"
        minW="100%"
        p="20px"
        mb="10px"
        className="absolute left-0 right-0 bottom-0 w-[100%] "
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="10px"
        padding="0"
      >
        {tryAgain && (
          <Text textAlign="center" color="red">
            Try again
          </Text>
        )}
        {err && (
          <Text textAlign="center" color="red">
            Seems an err occurred
          </Text>
        )}
        {contextValue.botCreatedSuccess ? (
          <InputBox
            botAnswer={botAnswer}
            setBotAnswer={setBotAnswer}
            setQuery={setQuery}
            query={query}
            chat={chat}
            setChat={setChat}
            loader={loader}
            setLoader={setLoader}
            setErr={setErr}
            setHideCursor={setHideCursor}
            setTryAgain={setTryAgain}
          />
        ) : (
          <div className="flex justify-center m-auto" role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        <Text fontSize="sm" textAlign="center">
          Consider cross checking your report{" "}
        </Text>
      </Container>
      <Box
        position="absolute"
        zIndex="99"
        top="50%"
        left="0px"
        cursor="pointer"
        onClick={() => props.setNavbarState(!props.navbarState)}
        className="max-[650px]:hidden"
      >
        {props.navbarState ? (
          <ChevronRightIcon
            onClick={() => props.setNavbarState(false)}
            className="text-[28px]"
            cursor="pointer"
          />
        ) : (
          <ChevronLeftIcon
            onClick={() => props.setNavbarState(true)}
            className="text-[28px]"
            cursor="pointer"
          />
        )}
      </Box>
    </div>
  );
};

const ChatArea = ({
  con,
  loader,
  chatIndex,
  chat,
  hideCursor,
  setHideCursor,
}) => {
  const ref = useRef(null);
  const isLast = chatIndex == chat.length - 1;

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [con]);

  return (
    <div ref={ref} className="">
      <div className="flex flex-end m-[auto]">
        {con.question ? (
          <p
            onClick={() => console.log(chatIndex)}
            className="p-2 my-3 rounded-[15px] m-auto bg-[#6841EA] text-[#fff] text-[18px] flex justify-end text-right w-[100%]"
          >
            {" "}
            {con.question}
          </p>
        ) : (
          ""
        )}
      </div>

      {loader && isLast ? (
        <span className="loader"></span>
      ) : isLast ? (
        // <Typewriter
        //   onInit={(typewriter) => {
        //     typewriter
        //       .typeString(`${con.bot}`)
        //       .changeDelay(100000)

        //       .pauseFor(100)
        //       .start()
        //       .callFunction(() => {
        //         typewriter.stop();
        //         setHideCursor(false);
        //       });
        //   }}
        // />
        <Text>{con.bot} </Text>
      ) : (
        <Text>{con.bot} </Text>
      )}
    </div>
  );
};
export default AnswerArea;
