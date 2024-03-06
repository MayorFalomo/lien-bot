"use client";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { DownloadIcon, EditIcon } from "@chakra-ui/icons";
import InputBox from "../inputBox/InputBox";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HamburgerIcon, MenuIcon } from "@chakra-ui/icons";

const AnswerArea = (props) => {
  return (
    <div className="h-[100vh] w-[100%] relative  ">
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
        <span
          onClick={() => props.setMobileNav(true)}
          className="hidden max-[650px]:flex ma cursor-pointer"
        >
          {<HamburgerIcon />}{" "}
        </span>

        <Flex alignItems="center" gap="10px">
          {/* {props.navbarState ? (
            <HamburgerIcon cursor="pointer" fontSize="20px" />
          ) : (
            ""
          )} */}
          <Text fontSize="20px">Lien Bot </Text>
        </Flex>
        <Tippy content="download as document" placement="bottom">
          <Box border="1px grey solid" borderRadius="7px" className="p-[6px]">
            <DownloadIcon fontSize="22px" cursor="pointer" />
          </Box>
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
      {/* {props.size ? (
        <Box
          position="absolute"
          zIndex="99"
          top="50%"
          left="0px"
          cursor="pointer"
          onClick={() => props.setSize(!props.size)}
        >
          {props.navbarState ? (
            <ChevronRightIcon className="text-[28px]" cursor="pointer" />
          ) : (
            <ChevronLeftIcon className="text-[28px]" cursor="pointer" />
          )}
        </Box>
      ) : (
        <Box
          position="absolute"
          zIndex="99"
          top="50%"
          left="0px"
          cursor="pointer"
          onClick={() => props.setNavbarState(!props.navbarState)}
        >
          {props.navbarState ? (
            <ChevronRightIcon className="text-[28px]" cursor="pointer" />
          ) : (
            <ChevronLeftIcon className="text-[28px]" cursor="pointer" />
          )}
        </Box>
      )} */}
    </div>
  );
};

export default AnswerArea;
