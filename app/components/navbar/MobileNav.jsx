"use client";
import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import { CloseIcon } from "@chakra-ui/icons";

const MobileNav = (props) => {
  return (
    <AnimatePresence key={props.mobileNav ? "exit" : "stay"} mode="wait">
      <motion.div
        initial={{
          width: "0%",
          position: "fixed",
          zIndex: 9,
          left: "-50vw",
          top: 0,
          transition: { ease: "easeOut", duration: 1 },
        }}
        animate={{
          width: "60%",
          position: "fixed",
          zIndex: 9,
          left: "0",
          top: 0,
        }}
        exit={{
          width: "0%",
          position: "fixed",
          zIndex: 9,
          left: "-50vw",
          top: 0,
          transition: { ease: "easeOut", duration: 1 },
        }}
        className={props.mobileNav ? "activeNav" : "inActiveNav"}
      >
        <Container
          position="relative"
          p="0"
          m="0"
          height="100vh"
          bg="#FAFAFA"
          overflow="auto"
        >
          {props.mobileNav && (
            <span
              onClick={() => props.setMobileNav(false)}
              className="absolute right-[-40px] top-6 z-50 border-2 border-grey-600 p-2 rounded-[8px] cursor-pointer"
            >
              {<CloseIcon />}{" "}
            </span>
          )}
          <Flex
            position="absolute"
            left="0"
            top="0"
            zIndex="999"
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            gap="8px"
            p="20px"
            display={props.size ? "none" : "flex"}
          >
            <HStack alignItems="center" spacing="7px">
              <Avatar size={"sm"} src="./logos.png" />
              <Text>New chat </Text>
            </HStack>
            <Tippy content="New chat" placement="bottom">
              <span className="cursor-pointer">
                <EditIcon fontSize="20px" />
              </span>
            </Tippy>
          </Flex>
          <Box m="0" p="0" height="90%" overflow="auto" w="100%">
            {/* This would be where the previous questions you asked would be */}
          </Box>
          <Box
            position="absolute"
            left="0"
            bottom="0px"
            zIndex="999"
            p="20px"
            display={props.size ? "none" : "flex"}
            justifyContent="flex-start"
            alignItems="center"
            gap="10px"
            w="100%"
            className="cursor-pointer hover:bg-#fff"
          >
            <Image
              borderRadius="full"
              boxSize="60px"
              objectFit="cover"
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
            <Text fontSize="md">Harry Potter </Text>
          </Box>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileNav;
