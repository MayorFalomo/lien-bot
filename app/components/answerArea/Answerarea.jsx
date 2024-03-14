"use client";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { DownloadIcon, EditIcon } from "@chakra-ui/icons";
import InputBox from "../inputBox/InputBox";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HamburgerIcon, MenuIcon } from "@chakra-ui/icons";
import "./Answer.css";
import Typewriter from "typewriter-effect";
const AnswerArea = (props) => {
  const [botAnswer, setBotAnswer] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [hideCursor, setHideCursor] = useState(false);

  const [chat, setChat] = React.useState([
    {
      bot: botAnswer,
      question: query,
    },
  ]);

  const breakpoints = {
    base: "0px",
    sm: "450px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  return (
    <div className="h-[100vh] max-h-full w-[100%] relative  ">
      <Box
        position="absolute"
        top="0"
        left="0"
        p="20px"
        w="100%"
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
        <Tippy content="download as document" placement="bottom">
          <Box
            border="1px grey solid"
            borderRadius="7px"
            className="py-[4px] px-[6px]"
          >
            <DownloadIcon fontSize="20px" cursor="pointer" />
          </Box>
        </Tippy>
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
        // border="2px blue solid"
      >
        {err && (
          <Text textAlign="center" color="red">
            Seems an err occurred
          </Text>
        )}
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
        />
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
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(`${con.bot}`)

              .changeDelay(0.02)

              .pauseFor(100)
              .start()
              .callFunction(() => {
                typewriter.stop();
                setHideCursor(false);
              });
          }}
        />
      ) : (
        <Text>{con.bot} </Text>
      )}
    </div>
  );
};
export default AnswerArea;
