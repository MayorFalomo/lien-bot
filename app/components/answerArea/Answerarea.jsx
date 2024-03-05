"use client";
import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { DownloadIcon } from "@chakra-ui/icons";
import InputBox from "../inputBox/InputBox";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
const AnswerArea = () => {
  return (
    <div className="h-[100vh] w-[100%] relative bg-red  ">
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
        // border="2px blue solid"
      >
        <Text fontSize="20px">Lien Bot </Text>
        <Tippy content="download as document" placement="bottom">
          <DownloadIcon border="1px hs" fontSize="20px" cursor="pointer" />
        </Tippy>
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
        // border="2px blue solid"
      >
        <InputBox />
        <Text fontSize="sm" textAlign="center">
          Consider cross checking your report{" "}
        </Text>
      </Container>
    </div>
  );
};

export default AnswerArea;
